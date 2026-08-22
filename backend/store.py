"""
Passage vector store.

Deliberately NOT FAISS. At 14,988 passages a brute-force matrix multiply is
exact and takes a few milliseconds — an ANN index would trade recall for speed
we do not need. FAISS/HNSW earns its place around 10^6 vectors; below that it is
a dependency and an approximation for nothing. The interface here is the one
FAISS would expose, so swapping it in later is a single class.
"""
from __future__ import annotations

import json
import pathlib
import re

import numpy as np

from backend.config import EMBED_DIM

DATA = pathlib.Path(__file__).parent / "data"


class PassageStore:
    def __init__(self) -> None:
        self.vectors: np.ndarray = np.zeros((0, EMBED_DIM), dtype=np.float32)
        self.meta: list[dict] = []
        self.entries: dict[int, dict] = {}

    def load(self) -> None:
        self.vectors = np.fromfile(DATA / "passages.f32", dtype=np.float32).reshape(-1, EMBED_DIM)
        self.meta = json.loads((DATA / "passages.json").read_text())
        self.entries = {e["id"]: e for e in json.loads((DATA / "entries.json").read_text())}
        if len(self.meta) != self.vectors.shape[0]:
            raise RuntimeError(
                f"index mismatch: {len(self.meta)} passages vs {self.vectors.shape[0]} vectors — rebuild it"
            )

    @property
    def size(self) -> int:
        return self.vectors.shape[0]

    def search(self, qv: np.ndarray, k: int) -> list[dict]:
        """Exact cosine over every passage. Vectors are pre-normalised."""
        scores = self.vectors @ qv
        # argpartition beats a full sort: we only need the top k of ~15k.
        idx = np.argpartition(-scores, min(k, len(scores) - 1))[:k]
        idx = idx[np.argsort(-scores[idx])]
        out = []
        for i in idx:
            m = self.meta[int(i)]
            out.append({**m, "score": float(scores[i])})
        return out


_SENT = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9])")


def sentences(text: str, lo: int = 40, hi: int = 320) -> list[str]:
    return [s.strip() for s in _SENT.split(text) if lo <= len(s.strip()) <= hi]
