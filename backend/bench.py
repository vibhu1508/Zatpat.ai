"""Measure each cache tier end to end against the running API."""
import json, statistics as st, sys, time, urllib.request

API = "http://127.0.0.1:8000"

def post(path, body):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    t = time.perf_counter()
    with urllib.request.urlopen(req) as r:
        return json.load(r), (time.perf_counter() - t) * 1000

S = "bench"
post(f"/session/{S}/clear", {})

Q = "where is the sciatic nerve located"
PARA = "whereabouts in the body is the sciatic nerve"
NEW = "what causes inflammation of the sciatic nerve"

print("tier                 wall   embed  search  stages")
def row(label, r, wall):
    s = r["timings"]
    print(f"{label:<20} {wall:6.1f}  {s.get('embed',0):6.1f}  "
          f"{s.get('search',0):6.1f}  {json.dumps(s)}")

# tier 3 first — cold, populates the cache
r, w = post("/ask", {"query": Q, "session": S}); row("3 passages (miss)", r, w)
print(f"    -> {r['source']}  score {r['score']}  \"{r['answer'][:64]}\"")

# tier 1 — same string again
r, w = post("/ask", {"query": Q, "session": S}); row("1 exact cache", r, w)
print(f"    -> {r['source']}")

# tier 2 — paraphrase of a cached query
r, w = post("/ask", {"query": PARA, "session": S}); row("2 semantic cache", r, w)
print(f"    -> {r['source']}  similarity {r.get('cache_similarity')}")

# tier 3 again — genuinely new question
r, w = post("/ask", {"query": NEW, "session": S}); row("3 passages (new)", r, w)
print(f"    -> {r['source']}  score {r['score']}  \"{r['answer'][:64]}\"")

# repeat each tier for a stable median
print("\nmedian of 10 runs each:")
for label, q in (("exact cache", Q), ("semantic cache", PARA)):
    ws = [post("/ask", {"query": q, "session": S})[1] for _ in range(10)]
    print(f"  {label:<16} {st.median(ws):6.1f} ms")
ws = []
for i in range(10):
    ws.append(post("/ask", {"query": f"what is the function of organ number {i}", "session": S})[1])
print(f"  {'passage search':<16} {st.median(ws):6.1f} ms")
