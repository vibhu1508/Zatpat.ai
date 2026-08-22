"""Meta-question handling: does it answer them, and does it leave real ones alone?"""
import json, pathlib, statistics as st, time, urllib.request, uuid
from backend.conversation import is_meta

ROOT = pathlib.Path(__file__).parent.parent
entries = json.loads((ROOT / "public" / "corpus.json").read_text())["entries"]

def ask(q, s):
    r = urllib.request.Request("http://127.0.0.1:8000/ask",
        data=json.dumps({"query": q, "session": s}).encode(),
        headers={"Content-Type": "application/json"})
    t = time.perf_counter()
    return json.load(urllib.request.urlopen(r)), (time.perf_counter() - t) * 1000

S = "meta" + uuid.uuid4().hex[:6]
ask("How many languages are spoken in Indonesia?", S)

print("meta questions, after asking about Indonesia:")
lat = []
for q in ["What country are we asking about?", "Which country are we talking about here?",
          "what did i just ask", "what is the topic", "so what are we discussing"]:
    r, w = ask(q, S); lat.append(w)
    print(f"  [{r['source']:<12} {w:5.1f}ms] {q:<40} -> {r['answer'][:56]}")
print(f"\n  median {st.median(lat):.1f} ms")

# false positives: real corpus questions must NOT be treated as meta
fp = [e["engQuery"] for e in entries if is_meta(e["engQuery"])]
print(f"\nfalse positives over {len(entries)} real corpus questions: {len(fp)}")
for q in fp[:5]:
    print(f"  {q}")
