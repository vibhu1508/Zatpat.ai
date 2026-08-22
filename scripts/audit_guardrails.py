"""
Empirical audit of backend/guardrails.py against the real 1,500-query corpus.

The logic is re-implemented standalone (config.py is not in this repo) with the
thresholds named in the module docstring: MIN_QUERY_WORDS=1, MAX=200,
CONFIDENCE_THRESHOLD=0.45, GROUNDEDNESS_THRESHOLD=0.30.

The question is not whether the code runs — it is what it does to real queries.
"""
import json, re, string, pathlib

corpus = json.loads(pathlib.Path("public/corpus.json").read_text())["entries"]

# ── verbatim from the module ────────────────────────────────────────
EMAIL_REGEX = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b")
PHONE_REGEX = re.compile(r"(\+?91[\-\s]?)?[6789]\d{9}|\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b")
CREDIT_CARD_REGEX = re.compile(r"\b(?:\d[ -]*?){13,19}\b")
INJECTION_REGEX = re.compile(
    r"\b(ignore\s+(all\s+)?previous\s+instructions|system\s+prompt|reveal\s+secret|developer\s+mode|jailbreak)\b",
    re.IGNORECASE)
SAFETY_KEYWORDS = {
    "hack", "exploit", "ddos", "malware", "virus", "trojan",
    "ransomware", "keylogger", "bypass security", "sql injection",
    "bomb", "weapon", "poison", "cyanide", "terrorist", "suicide",
}
NO_ANSWER_PATTERNS = {"no answer present", "no answer present."}

def blocked_by_safety(q):
    if INJECTION_REGEX.search(q): return "injection"
    if EMAIL_REGEX.search(q): return "email"
    if PHONE_REGEX.search(q): return "phone"
    if CREDIT_CARD_REGEX.search(q):
        if len(re.sub(r"\D", "", q)) in (13, 15, 16, 19): return "credit_card"
    ql = q.lower()
    for b in SAFETY_KEYWORDS:
        if re.search(r"\b" + re.escape(b) + r"\b", ql): return f"keyword:{b}"
    return None

# ── 1. false positives on legitimate corpus questions ───────────────
hits = {}
for e in corpus:
    r = blocked_by_safety(e["engQuery"])
    if r: hits.setdefault(r, []).append(e["engQuery"])

total_blocked = sum(len(v) for v in hits.values())
print(f"1. INPUT SAFETY on {len(corpus)} legitimate corpus questions")
print(f"   wrongly blocked: {total_blocked} ({total_blocked/len(corpus)*100:.1f}%)\n")
for reason, qs in sorted(hits.items(), key=lambda x: -len(x[1])):
    print(f"   {reason:<22} {len(qs):>3}   e.g. {qs[0][:58]!r}")

# ── 2. does the corpus contain unanswerable records? ────────────────
noans = [e for e in corpus if any(p in (e["engAnswer"] or "").strip().lower() for p in NO_ANSWER_PATTERNS)]
print(f"\n2. NO-ANSWER DETECTION")
print(f"   corpus records whose answer is 'No Answer Present': {len(noans)} of {len(corpus)}")
if noans: print(f"   -> this guard is load-bearing. e.g. {noans[0]['engQuery'][:56]!r}")
else: print("   -> this guard never fires on the current corpus (build already drops them)")

# ── 3. groundedness: does it actually catch a hallucination? ────────
STOPWORDS = {"a","an","the","and","or","but","in","on","at","to","for","of","with","by","from",
             "is","are","was","were","be","been","being","have","has","had","it","its","this",
             "that","these","those","as"}
def toks(t):
    tr = str.maketrans("", "", string.punctuation + "।॥,.-_!?'\"()[]{}")
    return {x for x in t.translate(tr).lower().split() if len(x) > 1 and x not in STOPWORDS}

def groundedness(gen, ctx):
    g = toks(gen)
    if not g: return 1.0
    c = toks(ctx)
    n = 0
    for gt in g:
        if gt in c: n += 1
        elif len(gt) >= 3 and any(ct.startswith(gt[:3]) or gt.startswith(ct[:3]) for ct in c if len(ct) >= 3): n += 1
        elif gt in ctx.lower(): n += 1
    return n / len(g)

import random
random.seed(0)
real, fake = [], []
for e in corpus[:400]:
    ctx = " ".join(p["text"] for p in e["passages"])
    real.append(groundedness(e["engAnswer"], ctx))
    other = random.choice(corpus)
    while other["id"] == e["id"]: other = random.choice(corpus)
    fake.append(groundedness(other["engAnswer"], ctx))   # a real hallucination stand-in

q = lambda a, p: sorted(a)[int(len(a) * p)]
print(f"\n3. GROUNDEDNESS (threshold 0.30)")
print(f"   correct answer vs its own context   median {q(real,0.5):.2f}  p5 {q(real,0.05):.2f}")
print(f"   WRONG answer vs unrelated context   median {q(fake,0.5):.2f}  p95 {q(fake,0.95):.2f}")
caught = sum(1 for x in fake if x < 0.30)
lost = sum(1 for x in real if x < 0.30)
print(f"   hallucinations caught: {caught}/{len(fake)} ({caught/len(fake)*100:.1f}%)")
print(f"   correct answers wrongly flagged: {lost}/{len(real)} ({lost/len(real)*100:.1f}%)")
