"""
The semantic cache's real risk is not false misses — it is answering a NEW
question with a PREVIOUS answer because the two are about the same topic.

Paraphrases ("same question, different words") must hit.
Same-topic-different-question ("what causes it" vs "where is it") must NOT.
If those two distributions overlap, no threshold is safe.
"""
import asyncio, itertools, statistics as st
import numpy as np
from backend.embed import Embedder

PARAPHRASE = [
    ["where is the sciatic nerve located", "whereabouts in the body is the sciatic nerve",
     "location of the sciatic nerve", "where in the body is the sciatic nerve found"],
    ["how many languages are spoken in indonesia", "number of languages in indonesia",
     "how many indonesian languages are there"],
    ["what is a radical neck", "define radical neck", "what does radical neck mean"],
]
SAME_TOPIC_DIFFERENT_Q = [
    ["where is the sciatic nerve located", "what causes inflammation of the sciatic nerve",
     "how do you treat sciatic nerve pain", "what is the blood supply of the sciatic nerve"],
    ["how many languages are spoken in indonesia", "what is the capital of indonesia",
     "what is the population of indonesia"],
    ["what is a radical neck", "how long does radical neck surgery take",
     "what are the risks of radical neck dissection"],
]

async def main():
    emb = Embedder()
    try:
        async def sims(groups):
            out = []
            for g in groups:
                v = await emb.passages(g)
                out += [float(v[0] @ v[i]) for i in range(1, len(v))]
            return out
        para = await sims(PARAPHRASE)
        topic = await sims(SAME_TOPIC_DIFFERENT_Q)
    finally:
        await emb.close()

    q = lambda a, p: sorted(a)[int(len(a) * p)]
    print(f"paraphrase (MUST hit)          min {min(para):.3f}  median {q(para,0.5):.3f}")
    print(f"same topic, different question max {max(topic):.3f}  median {q(topic,0.5):.3f}")
    print(f"                               overlap: {'YES' if max(topic) >= min(para) else 'no'}")
    print("\nthreshold      paraphrases hit   wrong-answer hits")
    for t in [0.85, 0.90, 0.92, 0.94, 0.95, 0.96, 0.97]:
        print(f"  {t:.2f}          {sum(1 for x in para if x>=t):>2}/{len(para)}"
              f"              {sum(1 for x in topic if x>=t):>2}/{len(topic)}")

asyncio.run(main())
