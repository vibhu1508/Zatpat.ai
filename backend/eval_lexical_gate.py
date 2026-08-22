"""Where to trust BM25 enough to skip the embedding entirely."""
import json, pathlib, statistics as st
from backend.lexical import LexicalIndex
from backend.store import DATA

ROOT = pathlib.Path(__file__).parent.parent
entries = json.loads((ROOT / "public" / "corpus.json").read_text())["entries"]
meta = json.loads((DATA / "passages.json").read_text())
lex = LexicalIndex(); lex.load()

def strength(q):
    hits, mass = lex.search(q, 1)
    return (hits[0][1] / mass, meta[hits[0][0]]["entry_id"]) if hits else (0.0, None)

good, wrong = [], 0
for e in entries[:600]:
    s, owner = strength(e["engQuery"])
    if owner == e["id"]:
        good.append(s)
    else:
        wrong += 1

# Native-script queries: BM25 cannot match these at all and must NOT be trusted.
native = [strength(e["native"]["hi"]["query"])[0] for e in entries[:200]]
off = [strength(q)[0] for q in [
    "what is the weather in mumbai today","play some music","book me a flight to singapore",
    "call my mother please","what is my bank account balance","set an alarm for seven am",
    "order a pizza to my house","turn off the living room lights","what is on my calendar",
    "send a message to the team","how much did i spend last month","cancel my subscription"]]

q = lambda a, p: sorted(a)[int(len(a) * p)] if a else 0
print(f"english in-corpus (correct entry)  n={len(good)}  p5 {q(good,0.05):.2f}  median {q(good,0.5):.2f}")
print(f"english in-corpus (wrong entry)    n={wrong}")
print(f"native-script queries              max {max(native):.2f}  median {q(native,0.5):.2f}")
print(f"off-topic                          max {max(off):.2f}  median {q(off,0.5):.2f}")
print("\nfloor   english trusted   native leaked   off-topic leaked")
for t in [0.8, 0.9, 1.0, 1.1, 1.2, 1.3]:
    print(f"  {t:.1f}   {sum(1 for x in good if x>=t)/len(good)*100:6.1f}%"
          f"          {sum(1 for x in native if x>=t):>3}/{len(native)}"
          f"          {sum(1 for x in off if x>=t):>2}/{len(off)}")
