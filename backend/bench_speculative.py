"""
The decisive test: does speculating on partial transcripts move the embedding
out of the critical path?

Replays the partial timeline measured off the real Sarvam socket — partials
arriving through the utterance, the last one 5 ms before speech ends, and the
translated final only 200-400 ms after. Each partial is sent with
speculative=true, which embeds and searches but never writes an answer back.

What matters is the ONE number at the end: what is still left to do when the
speaker stops talking.
"""
import json, time, urllib.request

API = "http://127.0.0.1:8000"
S = "spec"

def post(path, body):
    req = urllib.request.Request(API + path, data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json"})
    t = time.perf_counter()
    with urllib.request.urlopen(req) as r:
        return json.load(r), (time.perf_counter() - t) * 1000

# Real partial timeline, ms relative to end of speech (measured on the wire).
TIMELINE = [
    (-1613, "कॅरिबियन"),
    (-1087, "कॅरिबियन भागात"),
    (-599,  "कॅरिबियन भागात डिसेंबर"),
    (-69,   "कॅरिबियन भागात डिसेंबर महिन्यात सरासरी"),
    (-5,    "कॅरिबियन भागात डिसेंबर महिन्यात सरासरी तापमान"),
]
FINAL_EN = "average temperature in the caribbean region in december"
FINAL_DELAY_MS = 250   # measured 167-472

post(f"/session/{S}/clear", {})

print("── speculative: embed + search WHILE the user is still speaking ──")
spec_total = 0.0
for at, partial in TIMELINE:
    r, wall = post("/ask", {"query": partial, "session": S, "speculative": True})
    spec_total += wall
    print(f"  t={at:>6} ms   {wall:6.1f} ms   \"{partial[:38]}\"  -> {r['source']}")

print(f"\n  speculative work done during speech: {spec_total:.0f} ms across {len(TIMELINE)} calls")
print("  (invisible — the user is still talking)\n")

print("── what remains AFTER speech ends ──")
# A) answer straight from the last partial, already computed
r, wall_a = post("/ask", {"query": TIMELINE[-1][1], "session": S})
print(f"  A. answer from last partial        {wall_a:6.1f} ms   ({r['source']})")

# B) wait for the translated English final, then answer
r, wall_b = post("/ask", {"query": FINAL_EN, "session": S})
print(f"  B. wait for final, then answer     {wall_b + FINAL_DELAY_MS:6.1f} ms   "
      f"({FINAL_DELAY_MS} ms Sarvam + {wall_b:.0f} ms us)  ({r['source']})")
print(f"     -> \"{r['answer'][:72]}\"")

print(f"\n  saving: {(wall_b + FINAL_DELAY_MS) - wall_a:.0f} ms")
