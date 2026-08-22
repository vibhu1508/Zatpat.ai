"""
Zatpat.ai retrieval backend — single process, everything loaded once.

Request path, cheapest tier first:

  1. Redis exact match      no embedding      ~1 ms
  2. Redis vector match     needs embedding   ~embed + 2 ms
  3. Passage vector search  needs embedding   ~embed + 5 ms

Only tier 1 avoids the embedding, which is why it is the only genuinely instant
path. Tiers 2 and 3 both pay for the query vector, so a cache miss costs roughly
the same either way — the semantic cache saves the *search*, not the embedding.

Every response carries per-stage timings. That is not decoration: it is how the
latency budget stays honest, and it is what the console's latency panel reads.
"""
from __future__ import annotations

import asyncio
import re
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.cache import SessionCache
from backend.config import LEXICAL_TRUST, RETRIEVAL_THRESHOLD, TOP_K
from backend.conversation import answer_meta, is_meta
from backend.embed import Embedder
from backend.lexical import LexicalIndex
from backend.store import PassageStore, sentences

embedder = Embedder()
store = PassageStore()
lexical = LexicalIndex()
cache = SessionCache()

# Devanagari, Tamil and friends. BM25 cannot match a native-script query against
# English passages — it scores ~0 — so those must always go to the embedder
# rather than risk a confident-looking lexical accident.
_LATIN = re.compile(r"[A-Za-z]")


def is_latin(text: str) -> bool:
    letters = [c for c in text if c.isalpha()]
    if not letters:
        return False
    return sum(bool(_LATIN.match(c)) for c in letters) / len(letters) > 0.6


class Timer:
    """Per-stage wall clock, in milliseconds, in the order stages ran."""

    def __init__(self) -> None:
        self._t0 = time.perf_counter()
        self._last = self._t0
        self.stages: dict[str, float] = {}

    def mark(self, name: str) -> None:
        now = time.perf_counter()
        self.stages[name] = round((now - self._last) * 1000, 2)
        self._last = now

    @property
    def total_ms(self) -> float:
        return round((time.perf_counter() - self._t0) * 1000, 2)


@asynccontextmanager
async def lifespan(_: FastAPI):
    # Load once. Cold start is seconds; every request after this reuses it.
    t0 = time.perf_counter()
    store.load()
    lexical.load()
    await cache.connect()
    await embedder.warm()
    print(f"ready: {store.size:,} passages, {len(lexical.postings):,} terms, redis up, model warm "
          f"({(time.perf_counter() - t0) * 1000:.0f} ms)")
    yield
    await embedder.close()
    await cache.close()


app = FastAPI(title="Zatpat retrieval", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


class AskRequest(BaseModel):
    query: str = Field(min_length=1, max_length=2000)
    session: str = "default"
    lang: str = "en"
    # Speculative calls run on partial transcripts while the user is still
    # talking. The whole point is that the vector and the search ARE kept, so
    # the same text costs nothing when it arrives for real.
    speculative: bool = False


class AskResponse(BaseModel):
    answer: str
    source: str            # conversation | exact_cache | lexical | semantic_cache | passages | refused
    entry_id: int | None
    score: float
    passages: list[dict]
    timings: dict[str, float]
    total_ms: float
    cache_similarity: float | None = None


def compose(query: str, hits: list[dict]) -> tuple[str, dict]:
    """
    Pick the sentence from the top passage that best answers *this* question.

    Extractive on purpose: the answer is verbatim from a retrieved passage, so
    it is grounded by construction and there is nothing for a hallucination
    check to verify. That deletes a 40-80 ms NLI stage rather than optimising it.
    """
    top = hits[0]
    entry = store.entries.get(top["entry_id"], {})

    pool = [s for h in hits if h["entry_id"] == top["entry_id"] for s in sentences(h["text"])]
    if not pool:
        return entry.get("engAnswer", top["text"][:300]), top

    q_terms = {w for w in query.lower().split() if len(w) > 2}
    best, best_score = pool[0], -1.0
    for s in pool:
        s_terms = {w.strip(".,;:()") for w in s.lower().split()}
        overlap = len(q_terms & s_terms) / max(1, len(q_terms))
        # Prefer a sentence that answers the question without being a paragraph.
        score = overlap - 0.0008 * len(s)
        if score > best_score:
            best, best_score = s, score
    return best, top


@app.post("/ask", response_model=AskResponse)
async def ask(req: AskRequest) -> AskResponse:
    t = Timer()

    # ── tier 0: questions about the conversation ────────────────────
    #
    # "What country are we asking about?" has no answer in any passage — it is
    # in the previous turn. One Redis read, no embedding, no retrieval.
    if is_meta(req.query):
        turns = await cache.get_turns(req.session)
        topic = next((x for x in reversed(turns) if x.get("entry_id") is not None), None)
        t.mark("conversation")
        if topic:
            entry = store.entries.get(topic["entry_id"], {})
            passages = [
                m["text"] for m in store.meta if m["entry_id"] == topic["entry_id"]
            ][:4]
            return AskResponse(
                answer=answer_meta(req.query, entry.get("engQuery", ""), passages),
                source="conversation", entry_id=topic["entry_id"], score=1.0,
                passages=[], timings=t.stages, total_ms=t.total_ms,
            )
        return AskResponse(
            answer="", source="refused", entry_id=None, score=0.0,
            passages=[], timings=t.stages, total_ms=t.total_ms,
        )

    # ── tier 1: exact string, no embedding ──────────────────────────
    hit = await cache.get_exact(req.session, req.query)
    t.mark("cache_exact")
    if hit:
        refused = hit.pop("refused", False)
        return AskResponse(
            **hit, timings=t.stages, total_ms=t.total_ms,
            source="refused" if refused else "exact_cache",
        )

    # ── tier 2: BM25, still no embedding ────────────────────────────
    #
    # This is the whole latency story. Embedding costs ~200 ms; BM25 costs
    # ~0.3 ms and, on English, is *more* accurate here (entry@1 99.9% vs 97.0%).
    # Sarvam's translate mode hands us English, so most turns can be answered
    # without ever waking the embedder. When it is not confident we simply fall
    # through and pay for the vector.
    if is_latin(req.query):
        lex_hits, idf_mass = await asyncio.to_thread(lexical.search, req.query, TOP_K)
        if lex_hits and lex_hits[0][1] / idf_mass >= LEXICAL_TRUST:
            hits = [{**store.meta[i], "score": s} for i, s in lex_hits]
            answer, top = compose(req.query, hits)
            t.mark("lexical")
            payload = {
                "answer": answer,
                "entry_id": top["entry_id"],
                "score": round(lex_hits[0][1] / idf_mass, 4),
                "passages": [
                    {k: h[k] for k in ("entry_id", "doc_id", "score", "gold")} for h in hits
                ],
            }
            # Cached without a vector: the exact tier does not need one, and
            # paying 200 ms purely to populate the semantic tier would undo the
            # saving this branch exists for.
            await cache.put_exact(req.session, req.query, payload)
            if not req.speculative:
                await cache.push_turn(req.session, {"q": req.query, "entry_id": top["entry_id"]})
            return AskResponse(
                **payload, timings=t.stages, total_ms=t.total_ms, source="lexical"
            )
    t.mark("lexical")

    # ── everything below needs the query vector ─────────────────────
    qv = await embedder.query(req.query)
    t.mark("embed")

    # ── tier 2: semantic cache ──────────────────────────────────────
    sim = await cache.get_similar(req.session, qv)
    t.mark("cache_vector")
    if sim:
        payload, score = sim
        payload = {k: v for k, v in payload.items() if k != "refused"}
        # Promote to the exact tier. Without this the same string keeps paying
        # for an embedding to rediscover a neighbour it already found — which
        # matters most for partial transcripts, where the identical prefix
        # arrives many times inside one utterance.
        await cache.put(req.session, req.query, qv, payload)
        return AskResponse(
            **payload, timings=t.stages, total_ms=t.total_ms,
            source="semantic_cache", cache_similarity=round(score, 4),
        )

    # ── tier 3: passage vectors ─────────────────────────────────────
    # Sync CPU work: off the event loop so it cannot stall concurrent requests.
    hits = await asyncio.to_thread(store.search, qv, TOP_K)
    t.mark("search")

    if not hits or hits[0]["score"] < RETRIEVAL_THRESHOLD:
        # Cache refusals too. Early partials are mostly one or two words and
        # get refused every time; re-embedding them on each repeat is the
        # single most wasteful thing this service could do.
        refusal = {
            "answer": "",
            "entry_id": None,
            "score": round(hits[0]["score"], 4) if hits else 0.0,
            "passages": [],
            "refused": True,
        }
        await cache.put(req.session, req.query, qv, refusal)
        t.mark("compose")
        return AskResponse(
            **{k: v for k, v in refusal.items() if k != "refused"},
            source="refused", timings=t.stages, total_ms=t.total_ms,
        )

    answer, top = compose(req.query, hits)
    t.mark("compose")

    payload = {
        "answer": answer,
        "entry_id": top["entry_id"],
        "score": round(top["score"], 4),
        "passages": [{k: h[k] for k in ("entry_id", "doc_id", "score", "gold")} for h in hits],
    }
    # Speculative turns write to the cache too — that is the point of them.
    # An earlier version skipped this, reasoning that a prefix is not really the
    # user's question. But the cache is keyed by exact string, so a prefix can
    # only ever be hit by that same prefix; withholding it simply threw the
    # embedding away and made speculation cost work without saving any.
    await cache.put(req.session, req.query, qv, payload)
    # Speculative calls are prefixes of a sentence still being spoken; they must
    # warm the cache but must never become a conversational turn.
    if not req.speculative:
        await cache.push_turn(req.session, {"q": req.query, "entry_id": top["entry_id"]})
    t.mark("cache_write")

    return AskResponse(**payload, timings=t.stages, total_ms=t.total_ms, source="passages")


@app.post("/session/{session}/clear")
async def clear(session: str) -> dict:
    return {"cleared": await cache.clear(session)}


@app.get("/health")
async def health() -> dict:
    return {"passages": store.size, "entries": len(store.entries)}
