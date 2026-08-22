"""
corpus.json -> backend/data/{passages.f32, passages.json, entries.json}

Reuses .cache/passages_np.f32 when it matches, since the evaluation harness has
usually already embedded exactly this text — re-running the model to produce
identical vectors wastes four minutes.

  python3 -m backend.build_index
"""
import asyncio
import json
import pathlib

import numpy as np

from backend.config import EMBED_DIM
from backend.embed import Embedder
from backend.lexical import LexicalIndex
from backend.store import DATA

ROOT = pathlib.Path(__file__).parent.parent
CORPUS = ROOT / "public" / "corpus.json"
REUSE = ROOT / ".cache" / "passages_np.f32"


async def main() -> None:
    entries = json.loads(CORPUS.read_text())["entries"]

    meta, texts = [], []
    for e in entries:
        for i, p in enumerate(e["passages"]):
            meta.append(
                {
                    "entry_id": e["id"],
                    "passage_idx": i,
                    "doc_id": p.get("docId", f"{e['id']}_{i}"),
                    "gold": bool(p.get("gold")),
                    "text": p["text"],
                }
            )
            texts.append(p["text"])

    DATA.mkdir(parents=True, exist_ok=True)
    print(f"{len(entries):,} entries, {len(texts):,} passages")

    vectors = None
    if REUSE.exists():
        cached = np.fromfile(REUSE, dtype=np.float32)
        if cached.size == len(texts) * EMBED_DIM:
            vectors = cached.reshape(-1, EMBED_DIM)
            print(f"reusing {REUSE.relative_to(ROOT)} ({vectors.shape[0]:,} vectors)")

    if vectors is None:
        emb = Embedder()
        try:
            out = np.zeros((len(texts), EMBED_DIM), dtype=np.float32)
            B = 128
            for i in range(0, len(texts), B):
                out[i : i + B] = await emb.passages(texts[i : i + B])
                print(f"\r  embedding {min(i + B, len(texts)):,}/{len(texts):,}", end="", flush=True)
            print()
            vectors = out
        finally:
            await emb.close()

    # Re-normalise defensively; a cached file may predate a change here.
    vectors = vectors / np.linalg.norm(vectors, axis=1, keepdims=True).clip(min=1e-9)

    vectors.astype(np.float32).tofile(DATA / "passages.f32")
    (DATA / "passages.json").write_text(json.dumps(meta, ensure_ascii=False))
    # Entries without passage text — the answers and native strings only.
    slim = [
        {k: e[k] for k in ("id", "type", "engQuery", "engAnswer", "native")}
        for e in entries
    ]
    (DATA / "entries.json").write_text(json.dumps(slim, ensure_ascii=False))

    print("building lexical index…")
    lex = LexicalIndex()
    lex.build(texts)
    lex.save()
    print(f"  {len(lex.postings):,} terms")

    mb = (DATA / "passages.f32").stat().st_size / 2**20
    print(f"wrote {vectors.shape[0]:,} x {EMBED_DIM} vectors ({mb:.0f} MB) -> {DATA.relative_to(ROOT)}")


if __name__ == "__main__":
    asyncio.run(main())
