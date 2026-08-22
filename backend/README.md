# Retrieval backend

Single FastAPI process. Everything loads once at startup; nothing is
per-request except the work that has to be.

```bash
pip install -r backend/requirements.txt
redis-server --daemonize yes
ollama serve &                       # bge-m3 must be pulled
python3 -m backend.build_index       # corpus.json -> data/*.f32
python3 -m uvicorn backend.main:app --port 8000
```

## Five tiers, cheapest first

| tier | needs embedding | measured | handles |
|------|-----------------|----------|---------|
| 0. Conversation | no | **1.6 ms** | "which country are we talking about" |
| 1. Redis exact string | no | **0.3 ms** | repeats, and repeated partials |
| 2. BM25 lexical | **no** | **1.3 ms** | 63% of English traffic |
| 3. Redis vector (VSIM) | yes | ~200 ms | paraphrases |
| 4. Passage vectors | yes | 190-275 ms | 32% of English, all cross-script |

300 English corpus questions, genuinely cold sessions:

```
tier          n    correct entry   median
lexical     189           97.9%      1.3 ms
passages     97          100.0%    190-275 ms
refused      14               -    ~250 ms
TOTAL       300           94.0%      1.9 ms
```

**Median retrieval is ~2 ms.** The four tiers that avoid the embedder are all
comfortably inside the budget. The dense fallback is not reliably under 200 ms —
it measures 190-275 ms across runs, because Ollama's single-query embedding
latency itself varies between roughly 125 ms and 250 ms. It is the only stage
that ever exceeds budget, and the only fix is a faster embedding server, not
better code here.

## Tier 0: questions about the conversation

"What country are we asking about?" has no answer in any passage — it is in the
previous turn. Retrieval cannot produce it at any speed or accuracy, because
extraction returns spans from passages by construction.

The chat is kept in Redis (`RPUSH`/`LTRIM`, last 12 turns), so answering costs
one read and no embedding:

```
[conversation 1.8ms] What country are we asking about?  -> Indonesia.
[conversation 1.3ms] what did i just ask                -> You asked: How many
                                                           distinct languages are
                                                           spoken in Indonesia.
```

Two intents wear the same clothes and are separated deliberately: "which country
are we talking about" wants the entity, "what did I just ask" wants the question
back. Answering the first with a sentence is clumsy; answering the second with a
bare noun is simply wrong.

Entities come from casing. The corpus stores questions lower-cased, so
capitalisation in the question is no help — but the passages keep theirs, and a
question word that appears capitalised mid-sentence in a passage is almost
always the entity being asked about. That is how "indonesia" becomes
"Indonesia".

The detector is deliberately narrow: **0 false positives across all 1,500 real
corpus questions**. A false positive answers a genuine question with a statement
about the conversation, which is worse than missing one.

### Why BM25 runs before the embedder

This is the whole latency story. Embedding costs ~190 ms; BM25 costs 0.3 ms and
needs no model. On English it is not even a downgrade — 97.9% correct against
dense's 100%, for 1/150th of the cost. Sarvam's `translate` mode hands us
English, so most turns never wake the embedder.

Native-script queries always skip this tier: BM25 scores ~0 across scripts, so a
confident-looking lexical match there would be an accident. `is_latin()` routes
them straight to dense.

`LEXICAL_TRUST = 1.1` decides how much is taken on the fast path. Measured over
600 English queries: correct matches score p5 0.76 / median 1.31, off-topic
probes reach 1.91. They overlap — but a miss here is cheap, it falls through to
dense, which applies its own gate. So it is tuned for coverage, not safety:
1.0 takes 84% but leaks 5/12 off-topic, 1.1 takes 75% and leaks 2/12, and the
leaks plateau there.

### The embedder was not the lever

Three multilingual models measured on the same slice — latency is single-query,
which is what a cache miss actually pays:

```
model                        embed   dims      en     hi     ta
bge-m3                      125.7ms  1024   98.8%  88.0%  82.4%
paraphrase-multilingual     145.3ms   768   98.4%  76.4%  43.6%
granite-embedding:278m      140.7ms   768   99.2%  74.0%  58.0%
```

The smaller models are both **slower and worse** cross-lingually. There is no
faster-and-good-enough swap here, which is why the answer was to avoid the
embedding rather than to speed it up.

## Why there is no FAISS## Why there is no FAISS

14,988 passages x 1024 dims is a 3-5 ms exact matrix multiply. HNSW trades
recall for speed that is not needed here and adds an approximation for nothing.
`PassageStore` exposes the interface FAISS would, so swapping it in around 10^6
vectors is one class.

## Speculation is what buys the latency

`{"speculative": true}` runs a partial transcript through the same path while
the user is still talking. Replaying a real partial timeline off the Sarvam
socket (`python3 -m backend.bench_speculative`):

```
during speech   1,138 ms of embedding across 5 partials   (invisible)
after speech    A. answer from last partial      2.8 ms
                B. wait for translated final   506.2 ms
                saving                         503 ms
```

Two things make that work, and both were bugs first:

- **Speculative calls write to the cache.** An earlier version withheld them,
  reasoning a prefix is not really the user's question. But the cache is keyed
  by exact string, so a prefix can only be hit by that same prefix — withholding
  simply threw the embedding away and made speculation pure cost.
- **Every tier promotes to tier 1.** A semantic hit and a refusal both write the
  exact-string key on the way out. Without that, an identical partial pays for
  an embedding again to rediscover a neighbour it already found. Partials repeat
  constantly inside one utterance, so this is the difference between 322 ms and
  2.8 ms.

## Thresholds

Both live in `config.py` in **cosine** units, and both were measured.

`SEMANTIC_CACHE_THRESHOLD = 0.85`. The risk is not a false miss, it is answering
a new question with a previous answer because they share a topic:

```
paraphrase of the same question       min 0.937   must hit
same topic, different question        max 0.781   must NOT hit
```

They do not overlap. 0.85 sits in the gap: 7/7 paraphrases hit, 0/7 same-topic
questions do.

> **Redis VSIM returns `(1 + cosine) / 2`, not cosine.** Verified against known
> pairs: cosine 1.0 -> 1.0, 0.75 -> 0.874, 0.0 -> 0.5, -1.0 -> 0.0. Comparing a
> cosine threshold to that raw score silently halves it — 0.85 becomes cosine
> 0.70, loose enough that "what causes inflammation of the sciatic nerve"
> returned the answer to "where is the sciatic nerve located". `cache.py`
> converts before comparing.

`RETRIEVAL_THRESHOLD = 0.60` is the known weak point: in-corpus questions score
0.483-0.697 against passages and off-topic ones 0.522-0.640, so the
distributions **overlap** and no threshold is clean. 0.60 leaks some off-topic
and refuses ~9% of real questions. A reranker over the top 10 is the fix.

## Gotcha

`httpx.AsyncClient` binds its pool to the event loop running when it is
constructed. Building it at import time — before uvicorn starts its loop — made
every request open a fresh connection and turned a 175 ms embedding into
3,000 ms. It is created lazily inside the loop instead.

## Cold-session gotcha

`VSIM` on a session with no vector set raises — and serialising 1,024 floats
only for Redis to reject them was costing ~150 ms on the slowest path, the
first turn of every conversation. An `EXISTS` check first took dense retrieval
from 339 ms to 190 ms.

Sessions also persist with a TTL, so any benchmark using fixed session names
silently measures its own previous run and reports a 100% cache hit rate. The
evaluations generate a unique prefix per run.
