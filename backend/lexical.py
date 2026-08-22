"""
BM25 over the passages, as a tier that runs BEFORE any embedding.

The point is latency asymmetry. Dense retrieval costs ~200 ms because of the
embedding; BM25 costs single-digit milliseconds and needs no model at all. And
on English queries it is not a downgrade — measured on this corpus, lexical
entry@1 is 99.9% against dense's 97.0%.

Sarvam's translate mode hands us English, so the common case can be answered
without ever calling the embedder. Dense stays for what lexical genuinely
cannot do: cross-script queries, where BM25 scores ~0.

Implementation is an inverted index with numpy postings — scoring only touches
documents that contain a query term, so cost scales with the query, not the
corpus.
"""
from __future__ import annotations

import json
import math
import re
import pathlib

import numpy as np

from backend.store import DATA

K1, B = 1.4, 0.72

STOP = set(
    "a an the of in on at to for from by with is are was were be been being do does did what "
    "which who whom whose when where why how and or but if then than that this these those it "
    "its as into about over under can could should would may might will shall have has had i "
    "you he she they we me him her them my your his their our".split()
)
_TOKEN = re.compile(r"[^\W\d_]+|\d+", re.UNICODE)


def tokenize(text: str) -> list[str]:
    out = []
    for w in _TOKEN.findall(text.lower()):
        if len(w) > 1 and w not in STOP:
            # Light suffix stripping, matching the frontend retriever.
            if len(w) > 4 and w.endswith("ies"):
                w = w[:-3] + "y"
            elif len(w) > 3 and w.endswith("s") and not w.endswith("ss"):
                w = w[:-1]
            elif len(w) > 5 and w.endswith("ing"):
                w = w[:-3]
            elif len(w) > 4 and w.endswith("ed"):
                w = w[:-2]
            out.append(w)
    return out


class LexicalIndex:
    def __init__(self) -> None:
        self.postings: dict[str, tuple[np.ndarray, np.ndarray]] = {}
        self.idf: dict[str, float] = {}
        self.doc_len = np.zeros(0, dtype=np.float32)
        self.avg_len = 1.0
        self.n_docs = 0

    def build(self, texts: list[str]) -> None:
        self.n_docs = len(texts)
        self.doc_len = np.zeros(self.n_docs, dtype=np.float32)
        raw: dict[str, dict[int, int]] = {}
        for i, t in enumerate(texts):
            toks = tokenize(t)
            self.doc_len[i] = len(toks)
            for tok in toks:
                raw.setdefault(tok, {}).setdefault(i, 0)
                raw[tok][i] += 1
        self.avg_len = float(self.doc_len.mean()) or 1.0
        for term, docs in raw.items():
            ids = np.fromiter(docs.keys(), dtype=np.int32, count=len(docs))
            tfs = np.fromiter(docs.values(), dtype=np.float32, count=len(docs))
            order = np.argsort(ids)
            self.postings[term] = (ids[order], tfs[order])
            self.idf[term] = math.log(1 + (self.n_docs - len(docs) + 0.5) / (len(docs) + 0.5))

    def save(self) -> None:
        np.save(DATA / "lex_doclen.npy", self.doc_len)
        # One flat blob rather than 60k small files.
        terms, offsets, ids, tfs = [], [], [], []
        pos = 0
        for term, (i, f) in self.postings.items():
            terms.append(term)
            offsets.append([pos, len(i)])
            ids.append(i)
            tfs.append(f)
            pos += len(i)
        np.save(DATA / "lex_ids.npy", np.concatenate(ids))
        np.save(DATA / "lex_tfs.npy", np.concatenate(tfs))
        (DATA / "lex_terms.json").write_text(
            json.dumps({"terms": terms, "offsets": offsets, "idf": [self.idf[t] for t in terms],
                        "avg_len": self.avg_len, "n_docs": self.n_docs})
        )

    def load(self) -> None:
        meta = json.loads((DATA / "lex_terms.json").read_text())
        ids = np.load(DATA / "lex_ids.npy")
        tfs = np.load(DATA / "lex_tfs.npy")
        self.doc_len = np.load(DATA / "lex_doclen.npy")
        self.avg_len = meta["avg_len"]
        self.n_docs = meta["n_docs"]
        for term, (off, ln), idf in zip(meta["terms"], meta["offsets"], meta["idf"]):
            self.postings[term] = (ids[off : off + ln], tfs[off : off + ln])
            self.idf[term] = idf

    def search(self, query: str, k: int) -> tuple[list[tuple[int, float]], float]:
        """Top-k (doc_id, score) plus the query's total IDF mass for normalising."""
        terms = list(dict.fromkeys(tokenize(query)))
        if not terms:
            return [], 0.0
        scores = np.zeros(self.n_docs, dtype=np.float32)
        idf_mass = 0.0
        for t in terms:
            idf = self.idf.get(t)
            if idf is None:
                # Unknown terms still count against confidence: a query full of
                # words the corpus has never seen must not look well explained.
                idf_mass += max(self.idf.values()) if self.idf else 1.0
                continue
            idf_mass += idf
            ids, tfs = self.postings[t]
            denom = tfs + K1 * (1 - B + B * self.doc_len[ids] / self.avg_len)
            np.add.at(scores, ids, idf * (tfs * (K1 + 1)) / denom)

        top = np.argpartition(-scores, min(k, self.n_docs - 1))[:k]
        top = top[np.argsort(-scores[top])]
        return [(int(i), float(scores[i])) for i in top if scores[i] > 0], max(idf_mass, 1e-6)
