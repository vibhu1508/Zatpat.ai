"""
MSMARCO-XI validation parquet -> public/corpus.json

The dataset stores one row per (query, language), and repeats the same English
passages in every language file. So the English side is read once from the
primary language and only native queries and answers are pulled from the rest —
reading passages four times would cost four times the memory for identical text.

`is_selected` marks which of a query's ten passages actually answers it. That is
the relevance label the retrieval eval scores against, and it is what makes this
a benchmark rather than a sample.

  python3 scripts/build-corpus.py --queries 1500 --data <dir>
"""
import argparse
import json
import pathlib
import pyarrow.parquet as pq

LANGS = ["hin", "mar", "san", "tam"]
# The corpus keys on two-letter codes; the files use three.
SHORT = {"hin": "hi", "mar": "mr", "san": "sa", "tam": "ta"}
PRIMARY = "hin"

ap = argparse.ArgumentParser()
ap.add_argument("--queries", type=int, default=1500)
ap.add_argument("--data", required=True)
ap.add_argument("--out", default="public/corpus.json")
args = ap.parse_args()

data = pathlib.Path(args.data)


def clean(q: str) -> str:
    """Source queries carry stray leading punctuation ('. what is…', '+where…')."""
    i = 0
    while i < len(q) and not q[i].isalnum():
        i += 1
    return q[i:].strip()


# ── English side + passages, from the primary language only ──────────
print(f"reading {PRIMARY} (English passages + queries)…")
entries: dict[int, dict] = {}
pf = pq.ParquetFile(data / f"{PRIMARY}val.parquet")
cols = ["query_id", "query_type", "Eng_Query", "Eng_Answer", "passages", "query", "Answer"]

for batch in pf.iter_batches(batch_size=2000, columns=cols):
    for r in batch.to_pylist():
        if len(entries) >= args.queries:
            break
        qid = r["query_id"]
        if qid in entries:
            continue
        p = r["passages"] or {}
        eng = p.get("English_passages") or []
        sel = p.get("is_selected") or []
        # A query with no marked passage has no ground truth to score against.
        if not eng or not any(sel):
            continue
        entries[qid] = {
            "id": qid,
            "type": r["query_type"],
            "engQuery": clean(r["Eng_Query"] or ""),
            "engAnswer": r["Eng_Answer"] or "",
            "passages": [
                {"text": t, "idx": i, "docId": f"{qid}_{i}", "gold": bool(sel[i] if i < len(sel) else 0)}
                for i, t in enumerate(eng)
            ],
            "native": {SHORT[PRIMARY]: {"query": r["query"], "answer": r["Answer"] or ""}},
        }
    if len(entries) >= args.queries:
        break

print(f"  {len(entries)} queries with a gold passage")

# ── native queries and answers from the other three ──────────────────
for lang in LANGS:
    if lang == PRIMARY:
        continue
    print(f"reading {lang} (native query + answer)…")
    want = set(entries)
    found = 0
    pf = pq.ParquetFile(data / f"{lang}val.parquet")
    for batch in pf.iter_batches(batch_size=4000, columns=["query_id", "query", "Answer"]):
        for r in batch.to_pylist():
            qid = r["query_id"]
            if qid in want:
                entries[qid]["native"][SHORT[lang]] = {"query": r["query"], "answer": r["Answer"] or ""}
                want.discard(qid)
                found += 1
        if not want:
            break
    print(f"  matched {found}/{len(entries)}")

# Only keep queries that exist in all four languages.
complete = [e for e in entries.values() if len(e["native"]) == len(LANGS)]
complete.sort(key=lambda e: e["id"])

out = pathlib.Path(args.out)
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps({"entries": complete}, ensure_ascii=False))

passages = sum(len(e["passages"]) for e in complete)
gold = sum(sum(1 for p in e["passages"] if p["gold"]) for e in complete)
print()
print(f"queries    {len(complete):,}")
print(f"passages   {passages:,}  ({gold:,} gold)")
print(f"languages  {', '.join(SHORT[l] for l in LANGS)} + en")
print(f"size       {out.stat().st_size / 2**20:.1f} MB -> {out}")
