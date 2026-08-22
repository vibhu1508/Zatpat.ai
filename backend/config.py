"""
Tunable constants. Every threshold here was measured, not guessed — the comment
on each says what the measurement was, so re-tuning starts from evidence.
"""
import os

# ── models ──────────────────────────────────────────────────────────
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434")
EMBED_MODEL = os.getenv("EMBED_MODEL", "bge-m3")
EMBED_DIM = 1024

# Ollama unloads an idle model after ~5 minutes by default. The next request
# then pays for a full reload — measured at 3,197 ms against a warm 190 ms.
# A voice assistant is idle between turns by definition, so this must be pinned.
# Ollama accepts a number of seconds or a duration string ("1h"). -1 means
# never unload; passing it as a *string* is rejected with a 400, so it is
# coerced to a number whenever it looks like one.
def _keep_alive(raw: str) -> "int | str":
    try:
        return int(raw)
    except ValueError:
        return raw


EMBED_KEEP_ALIVE = _keep_alive(os.getenv("EMBED_KEEP_ALIVE", "-1"))

# BGE-M3 is trained without E5's "query:"/"passage:" prefixes. Measured: adding
# them costs ~6 points of cross-lingual recall.
EMBED_PREFIX_QUERY = ""
EMBED_PREFIX_PASSAGE = ""

# ── redis ───────────────────────────────────────────────────────────
REDIS_URL = os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0")
CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", 60 * 60 * 6))

# ── thresholds ──────────────────────────────────────────────────────

# Semantic cache hit, in COSINE units (the code converts Redis's (1+cos)/2).
#
# The dangerous case is not a false miss, it is answering a new question with a
# previous answer because both are about the same topic. Measured:
#
#   paraphrase of the same question      min 0.937  median 0.954   must hit
#   same topic, different question       max 0.781  median 0.741   must NOT hit
#
# They do not overlap, and 0.85 sits in the gap: 7/7 paraphrases hit, 0/7 of
# the same-topic questions do.
SEMANTIC_CACHE_THRESHOLD = float(os.getenv("SEMANTIC_CACHE_THRESHOLD", 0.85))

# Passage retrieval confidence. Measured: in-corpus questions score 0.483 min /
# 0.697 median against passages; off-topic 0.522-0.640. The distributions
# OVERLAP, so no threshold is clean — 0.60 leaks 3 of 12 off-topic probes while
# refusing 9% of real questions. This is the known weak point and the reason a
# reranker is the next thing worth building.
RETRIEVAL_THRESHOLD = float(os.getenv("RETRIEVAL_THRESHOLD", 0.60))

# Trust BM25 enough to skip the embedding entirely.
#
# Measured on 600 English queries: correct matches score p5 0.76 / median 1.31;
# off-topic probes reach 1.91. They overlap, but a miss here is cheap — it falls
# through to dense retrieval, which applies its own gate. So this is tuned for
# how much of the common case it can take, not for safety on its own.
#
#   floor   english trusted   off-topic leaked
#    1.0        84.0%              5/12
#    1.1        75.5%              2/12    <- leaks plateau here
#    1.3        51.4%              2/12
LEXICAL_TRUST = float(os.getenv("LEXICAL_TRUST", 1.1))

# How many turns of chat to keep per session. Enough to resolve a follow-up
# without letting a long conversation grow without bound.
TURN_HISTORY = 12

TOP_K = 5
