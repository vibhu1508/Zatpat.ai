"""Accuracy of the live API, per tier. Fast is worthless if it is wrong."""
import json, statistics as st, time, urllib.request, pathlib, collections, uuid

# Sessions persist in Redis with a TTL, so a fixed name silently serves the
# previous run's answers and reports a cache hit rate of 100%.
RUN = uuid.uuid4().hex[:8]
API = "http://127.0.0.1:8000"
ROOT = pathlib.Path(__file__).parent.parent
entries = json.loads((ROOT / "public" / "corpus.json").read_text())["entries"]

def post(p, b):
    r = urllib.request.Request(API + p, data=json.dumps(b).encode(), headers={"Content-Type": "application/json"})
    t = time.perf_counter()
    with urllib.request.urlopen(r) as x: return json.load(x), (time.perf_counter() - t) * 1000

N = 300
src = collections.Counter(); right = collections.Counter(); lat = collections.defaultdict(list)
for i, e in enumerate(entries[:N]):
    # fresh session per query so nothing is served from a previous answer
    r, w = post("/ask", {"query": e["engQuery"], "session": f"acc{RUN}{i}"})
    src[r["source"]] += 1
    lat[r["source"]].append(w)
    if r["entry_id"] == e["id"]: right[r["source"]] += 1

print(f"english corpus questions, cold session, n={N}\n")
print(f"{'tier':<14} {'n':>4} {'correct entry':>14} {'median ms':>10}")
for s in src:
    print(f"{s:<14} {src[s]:>4} {right[s]/src[s]*100:13.1f}% {st.median(lat[s]):9.1f}")
tot = sum(right.values())
print(f"{'TOTAL':<14} {N:>4} {tot/N*100:13.1f}% {st.median([x for v in lat.values() for x in v]):9.1f}")

# native-script, which must go dense
M = 40
src2 = collections.Counter(); right2 = 0; lat2 = []
for i, e in enumerate(entries[:M]):
    r, w = post("/ask", {"query": e["native"]["hi"]["query"], "session": f"nat{RUN}{i}"})
    src2[r["source"]] += 1; lat2.append(w)
    if r["entry_id"] == e["id"]: right2 += 1
print(f"\nhindi corpus questions, cold session, n={M}")
print(f"  tiers used: {dict(src2)}")
print(f"  correct entry {right2/M*100:.1f}%   median {st.median(lat2):.0f} ms")
