"""
Which embedding model fits a 200 ms retrieval budget without losing accuracy?

Latency alone is the wrong question — a fast model that cannot retrieve
cross-lingually is useless here. This measures both on the same corpus slice:
single-query latency (what the request path actually pays) and cross-lingual
entry@1 (native query -> English passage).
"""
import asyncio, json, pathlib, statistics as st, sys, time
import numpy as np, httpx

ROOT = pathlib.Path(__file__).parent.parent
MODELS = sys.argv[1:] or ["bge-m3", "paraphrase-multilingual", "granite-embedding:278m"]
N_ENTRIES = 250          # keeps each model to ~1-2 min
LANGS = ["hi", "ta"]     # best and worst performers from the earlier sweep

entries = json.loads((ROOT / "public" / "corpus.json").read_text())["entries"][:N_ENTRIES]
passages, owner = [], []
for e in entries:
    for p in e["passages"]:
        passages.append(p["text"])
        owner.append(e["id"])


async def embed(client, model, texts):
    r = await client.post("/api/embed", json={"model": model, "input": texts})
    r.raise_for_status()
    v = np.asarray(r.json()["embeddings"], dtype=np.float32)
    return v / np.linalg.norm(v, axis=1, keepdims=True).clip(min=1e-9)


async def run(model):
    async with httpx.AsyncClient(base_url="http://127.0.0.1:11434", timeout=120.0) as c:
        await embed(c, model, ["warm"])

        # single-query latency — exactly what a cache miss pays
        lat = []
        for _ in range(12):
            t = time.perf_counter()
            await embed(c, model, ["where is the sciatic nerve located"])
            lat.append((time.perf_counter() - t) * 1000)

        P = np.zeros((len(passages), (await embed(c, model, ["d"])).shape[1]), dtype=np.float32)
        for i in range(0, len(passages), 128):
            P[i : i + 128] = await embed(c, model, passages[i : i + 128])

        recall = {}
        for lang in LANGS:
            qs = [e["native"][lang]["query"] for e in entries]
            Q = np.zeros((len(qs), P.shape[1]), dtype=np.float32)
            for i in range(0, len(qs), 128):
                Q[i : i + 128] = await embed(c, model, qs[i : i + 128])
            top = (Q @ P.T).argmax(axis=1)
            recall[lang] = sum(owner[t] == e["id"] for t, e in zip(top, entries)) / len(entries)

        # English baseline
        qs = [e["engQuery"] for e in entries]
        Q = np.zeros((len(qs), P.shape[1]), dtype=np.float32)
        for i in range(0, len(qs), 128):
            Q[i : i + 128] = await embed(c, model, qs[i : i + 128])
        recall["en"] = sum(owner[t] == e["id"] for t, e in zip((Q @ P.T).argmax(axis=1), entries)) / len(entries)

        return st.median(lat), P.shape[1], recall


async def main():
    print(f"{len(entries)} entries, {len(passages):,} passages\n")
    print(f"{'model':<28} {'embed':>8} {'dims':>6}   {'en':>6} {'hi':>6} {'ta':>6}   budget")
    for m in MODELS:
        try:
            lat, dim, rec = await run(m)
        except Exception as e:
            print(f"{m:<28} FAILED: {str(e)[:44]}")
            continue
        # retrieval budget = embed + ~5 ms search
        fits = "OK" if lat + 5 < 200 else f"over by {lat + 5 - 200:.0f}"
        print(f"{m:<28} {lat:7.1f}ms {dim:>6}   "
              f"{rec['en']*100:5.1f}% {rec['hi']*100:5.1f}% {rec['ta']*100:5.1f}%   {fits}")


asyncio.run(main())
