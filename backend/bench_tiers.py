"""Every tier, measured end to end, against the retrieval budget."""
import json, statistics as st, time, urllib.request
API, S = "http://127.0.0.1:8000", "tiers"

def post(p, b):
    r = urllib.request.Request(API + p, data=json.dumps(b).encode(), headers={"Content-Type": "application/json"})
    t = time.perf_counter()
    with urllib.request.urlopen(r) as x: return json.load(x), (time.perf_counter() - t) * 1000

post(f"/session/{S}/clear", {})
EN  = "where is the sciatic nerve located"
EN2 = "average temperature in the caribbean region in december"
HI  = "कॅरिबियन भागात डिसेंबर महिन्यात सरासरी तापमान"

cases = [
    ("english -> lexical (cold)", EN,  {}),
    ("english -> exact cache",    EN,  {}),
    ("english -> lexical (new)",  EN2, {}),
    ("native  -> dense",          HI,  {}),
    ("native  -> exact cache",    HI,  {}),
]
print(f"{'case':<28} {'total':>8}  {'source':<15} stages")
for label, q, extra in cases:
    r, w = post("/ask", {"query": q, "session": S, **extra})
    print(f"{label:<28} {w:7.1f}ms  {r['source']:<15} {json.dumps(r['timings'])}")

print("\nmedian of 12 runs:")
for label, q in [("english (lexical/cache)", EN2), ("native (dense/cache)", HI)]:
    ws = [post("/ask", {"query": q, "session": S})[1] for _ in range(12)]
    print(f"  {label:<24} {st.median(ws):6.1f} ms")

# cold lexical each time — new session per call, so no cache at all
ws, srcs = [], []
for i in range(12):
    post(f"/session/cold{i}/clear", {})
    r, w = post("/ask", {"query": EN2, "session": f"cold{i}"})
    ws.append(w); srcs.append(r["source"])
print(f"  {'english, no cache':<24} {st.median(ws):6.1f} ms   ({srcs[0]})")
