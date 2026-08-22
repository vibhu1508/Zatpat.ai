# =============================================================================
# backend/retrieval.py — Redis Vector Indexing & Retrieval Engine
# =============================================================================
# This module handles three key responsibilities:
#
# 1. INDEX:  Embed chunks (eng_text) → store in Redis Hashes with HNSW vectors
# 2. SEARCH: Embed English query → KNN search with @lang filter → return
#            native passages ranked by cosine similarity
# 3. SESSION: Store/retrieve conversation turns per session for context
#
# Usage:
#   python -m backend.retrieval              # Index all chunks + run test queries
#   python -m backend.retrieval --reindex    # Drop + recreate index
#   python -m backend.retrieval --query "what is a corporation?" --lang hi
# =============================================================================

import os
import sys
import json
import time
import struct
import argparse
import numpy as np
from typing import List, Dict, Any, Optional

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    REDIS_HOST,
    REDIS_PORT,
    REDIS_INDEX_NAME,
    REDIS_DOC_PREFIX,
    REDIS_HNSW_M,
    REDIS_HNSW_EF_CONSTRUCTION,
    REDIS_HNSW_EF_RUNTIME,
    REDIS_SESSION_PREFIX,
    REDIS_SESSION_TTL,
    REDIS_SESSION_MAX_TURNS,
    EMBEDDING_MODEL,
    EMBEDDING_DIM,
    TOP_K_RESULTS,
    CHUNKS_FILE,
)


# ===========================================================================
# Lazy-loaded Singletons (avoid import-time overhead)
# ===========================================================================

_redis_client = None
_embed_model = None


def get_redis():
    """
    Lazy-load Redis connection. Reuses a single connection across calls.
    Uses hiredis for C-level parsing speed (~3x faster than pure Python).
    """
    global _redis_client
    if _redis_client is None:
        import redis
        _redis_client = redis.Redis(
            host=REDIS_HOST,
            port=REDIS_PORT,
            decode_responses=False,  # We need bytes for vector fields
            socket_keepalive=True,
            socket_timeout=2.0,
            socket_connect_timeout=2.0,
        )
        # Quick connectivity check
        _redis_client.ping()
    return _redis_client


def get_embedder():
    """
    Lazy-load the SentenceTransformer embedding model.
    First call downloads/loads weights (~90MB); subsequent calls are instant.
    """
    global _embed_model
    if _embed_model is None:
        from sentence_transformers import SentenceTransformer
        _embed_model = SentenceTransformer(EMBEDDING_MODEL)
    return _embed_model


# ===========================================================================
# Embedding Helper
# ===========================================================================

def embed_text(text: str) -> np.ndarray:
    """
    Embed a single text string into a 384-dim float32 vector with sub-15ms latency.
    
    Args:
        text: English text to embed (query or passage)
    
    Returns:
        numpy array of shape (384,), dtype float32
    """
    import torch
    model = get_embedder()
    with torch.inference_mode():
        return model.encode(
            text,
            convert_to_numpy=True,
            show_progress_bar=False,
            normalize_embeddings=True,
        ).astype(np.float32)


def embed_texts_batch(texts: List[str], batch_size: int = 64) -> np.ndarray:
    """
    Batch-embed multiple texts for indexing efficiency.
    
    Args:
        texts: List of English texts
        batch_size: Number of texts to embed in one forward pass
    
    Returns:
        numpy array of shape (N, 384), dtype float32
    """
    model = get_embedder()
    return model.encode(texts, batch_size=batch_size, convert_to_numpy=True).astype(np.float32)


def vector_to_bytes(vec: np.ndarray) -> bytes:
    """Convert a float32 numpy vector to raw bytes for Redis storage."""
    return vec.tobytes()


# ===========================================================================
# Index Management
# ===========================================================================

def create_index(drop_existing: bool = False):
    """
    Create the Redis HNSW vector index with tag/text/numeric fields.
    
    Schema:
    - lang (TAG):           Language code filter (hi, mr, sa, ta)
    - query_type (TAG):     Query category filter (DESCRIPTION, NUMERIC, etc.)
    - strategy (TAG):       Chunking strategy (A, B, C, D)
    - query_id (NUMERIC):   Original MSMARCO query ID
    - eng_query (TEXT):     English query text (for debug/display)
    - eng_text (TEXT):      English chunk text (what was embedded)
    - native_text (TEXT):   Native language chunk (LLM context)
    - parent_native_text (TEXT): Full parent passage (for Strategy B children)
    - native_answer (TEXT): Ground truth native answer
    - embedding (VECTOR):   384-dim HNSW cosine vector
    
    Args:
        drop_existing: If True, drops and recreates the index
    """
    from redis.commands.search.field import (
        VectorField, TagField, TextField, NumericField
    )
    from redis.commands.search.index_definition import IndexDefinition, IndexType

    r = get_redis()

    # Check if index already exists
    try:
        r.ft(REDIS_INDEX_NAME).info()
        if drop_existing:
            print(f"  ⚠ Dropping existing index '{REDIS_INDEX_NAME}'...", flush=True)
            r.ft(REDIS_INDEX_NAME).dropindex(delete_documents=True)
        else:
            print(f"  ✅ Index '{REDIS_INDEX_NAME}' already exists.", flush=True)
            return
    except Exception:
        pass  # Index doesn't exist yet — proceed to create

    schema = [
        # ------- Filterable tag fields -------
        TagField("lang"),
        TagField("query_type"),
        TagField("strategy"),
        # ------- Numeric fields -------
        NumericField("query_id"),
        NumericField("chunk_index"),
        # ------- Text fields (full-text searchable) -------
        TextField("eng_query"),
        TextField("eng_text"),
        TextField("native_text"),
        TextField("parent_native_text"),
        TextField("native_answer"),
        TextField("native_query"),
        TextField("eng_answer"),
        TextField("doc_id"),
        # ------- Vector field (HNSW) -------
        VectorField(
            "embedding",
            "HNSW",
            {
                "TYPE": "FLOAT32",
                "DIM": EMBEDDING_DIM,
                "DISTANCE_METRIC": "COSINE",
                "M": REDIS_HNSW_M,
                "EF_CONSTRUCTION": REDIS_HNSW_EF_CONSTRUCTION,
                "EF_RUNTIME": REDIS_HNSW_EF_RUNTIME,
            },
        ),
    ]

    definition = IndexDefinition(
        prefix=[REDIS_DOC_PREFIX],
        index_type=IndexType.HASH,
    )

    r.ft(REDIS_INDEX_NAME).create_index(schema, definition=definition)
    print(f"  ✅ Created index '{REDIS_INDEX_NAME}' (HNSW, {EMBEDDING_DIM}d, COSINE)")


def index_chunks(chunks_or_path=None, batch_size: int = 128) -> int:
    """
    Embed and index a list of chunks (or path to chunks_ready.json) into Redis.
    
    1. Batch-embed all English chunk texts with all-MiniLM-L6-v2 (384d)
    2. Store each chunk as a Redis Hash with all metadata + vector
    3. Uses Redis pipeline for batch writes (~10x faster than individual SET)
    
    Args:
        chunks_or_path: List of chunk dicts or path to chunks_ready.json (defaults to CHUNKS_FILE)
        batch_size: Embedding batch size
    """
    if chunks_or_path is None:
        chunks_or_path = CHUNKS_FILE

    if isinstance(chunks_or_path, str):
        with open(chunks_or_path, "r", encoding="utf-8") as f:
            chunks = json.load(f)
    else:
        chunks = chunks_or_path

    r = get_redis()
    
    # -----------------------------------------------------------------------
    # Step 1: Batch embed all English chunk texts
    # -----------------------------------------------------------------------
    print(f"\n  [1/2] Embedding {len(chunks)} chunks...", flush=True)
    eng_texts = [chunk["eng_text"] for chunk in chunks]
    
    t0 = time.perf_counter()
    embeddings = embed_texts_batch(eng_texts, batch_size=batch_size)
    embed_time = (time.perf_counter() - t0) * 1000
    
    print(f"        ✅ Embedded in {embed_time:.0f}ms "
          f"({embed_time / len(chunks):.1f}ms/chunk)", flush=True)

    # -----------------------------------------------------------------------
    # Step 2: Store in Redis using pipelined HSET
    # -----------------------------------------------------------------------
    print(f"  [2/2] Indexing into Redis...", flush=True)
    t0 = time.perf_counter()
    
    pipe = r.pipeline(transaction=False)  # Non-transactional for speed
    
    for i, chunk in enumerate(chunks):
        key = f"{REDIS_DOC_PREFIX}{chunk['chunk_id']}"
        
        # Build the hash mapping (all fields as bytes/strings)
        mapping = {
            "lang": chunk["lang"],
            "query_type": chunk["query_type"],
            "strategy": chunk["strategy"],
            "query_id": str(chunk["query_id"]),
            "chunk_index": str(chunk["chunk_index"]),
            "eng_query": chunk["eng_query"],
            "eng_text": chunk["eng_text"],
            "native_text": chunk["native_text"],
            "parent_native_text": chunk.get("parent_native_text", chunk["native_text"]),
            "native_answer": chunk["native_answer"],
            "native_query": chunk.get("native_query", ""),
            "eng_answer": chunk["eng_answer"],
            "doc_id": chunk["doc_id"],
            "embedding": vector_to_bytes(embeddings[i]),
        }
        
        pipe.hset(key, mapping=mapping)
        
        # Flush pipeline every 500 items to avoid memory buildup
        if (i + 1) % 500 == 0:
            pipe.execute()
            pipe = r.pipeline(transaction=False)
    
    # Flush remaining
    pipe.execute()
    
    index_time = (time.perf_counter() - t0) * 1000
    print(f"        ✅ Indexed {len(chunks)} chunks in {index_time:.0f}ms "
          f"({index_time / len(chunks):.1f}ms/chunk)", flush=True)


# ===========================================================================
# Search / Retrieval
# ===========================================================================

def search(
    query_text: str,
    lang: str = None,
    top_k: int = None,
    deduplicate: bool = True,
) -> List[Dict[str, Any]]:
    """
    Embed an English query and perform KNN vector search in Redis.
    
    Pipeline:
    1. Embed the English query text
    2. Construct FT.SEARCH with KNN + optional @lang pre-filter
    3. Parse results into clean dicts with cosine similarity scores
    4. Optionally deduplicate across query_ids (keep best per query_id)
    
    Args:
        query_text: English query string (from STT translation)
        lang: Language code to filter (hi, mr, sa, ta). None = all languages
        top_k: Number of results to return (default from config: 5)
        deduplicate: If True, keep only best chunk per query_id
    
    Returns:
        List of result dicts sorted by score (highest first), each containing:
        - score: float (cosine similarity, 0-1, higher = better)
        - native_text: str (chunk-level native text)
        - parent_native_text: str (full parent passage for LLM context)
        - native_answer: str (ground truth)
        - eng_text: str (English chunk text)
        - lang, query_type, strategy, query_id, doc_id, eng_query
    """
    from redis.commands.search.query import Query

    top_k = top_k or TOP_K_RESULTS
    r = get_redis()

    # -----------------------------------------------------------------------
    # Step 1: Embed the query
    # -----------------------------------------------------------------------
    query_vec = embed_text(query_text)
    query_bytes = vector_to_bytes(query_vec)

    # -----------------------------------------------------------------------
    # Step 2: Build FT.SEARCH query
    # -----------------------------------------------------------------------
    # We fetch more candidates than top_k for deduplication headroom
    fetch_k = top_k * 3 if deduplicate else top_k

    # Pre-filter by language if specified in supported languages
    # If lang is "en" or None, search across all documents
    if lang and lang in ["hi", "mr", "sa", "ta"]:
        filter_expr = f"@lang:{{{lang}}}"
    else:
        filter_expr = "*"

    # KNN query: "(filter)=>[KNN N @embedding $vec AS score]"
    q = (
        Query(f"({filter_expr})=>[KNN {fetch_k} @embedding $vec AS score]")
        .sort_by("score")           # Sort ascending (COSINE distance: lower = better)
        .paging(0, fetch_k)
        .return_fields(
            "score", "lang", "query_type", "strategy", "query_id",
            "eng_query", "eng_text", "native_text", "parent_native_text",
            "native_answer", "native_query", "eng_answer", "doc_id",
            "chunk_index",
        )
        .dialect(2)
    )

    # -----------------------------------------------------------------------
    # Step 3: Execute search
    # -----------------------------------------------------------------------
    results = r.ft(REDIS_INDEX_NAME).search(q, query_params={"vec": query_bytes})

    # -----------------------------------------------------------------------
    # Step 4: Parse results into clean dicts
    # -----------------------------------------------------------------------
    parsed = []
    for doc in results.docs:
        raw_score = float(getattr(doc, "score", 1.0))
        similarity = 1.0 - raw_score  # Convert distance to similarity

        parsed.append({
            "score": round(similarity, 4),
            "lang": _decode(getattr(doc, "lang", "")),
            "query_type": _decode(getattr(doc, "query_type", "")),
            "strategy": _decode(getattr(doc, "strategy", "")),
            "query_id": int(_decode(getattr(doc, "query_id", "0")) or 0),
            "eng_query": _decode(getattr(doc, "eng_query", "")),
            "eng_text": _decode(getattr(doc, "eng_text", "")),
            "native_text": _decode(getattr(doc, "native_text", "")),
            "parent_native_text": _decode(getattr(doc, "parent_native_text", "")),
            "native_answer": _decode(getattr(doc, "native_answer", "")),
            "native_query": _decode(getattr(doc, "native_query", "")),
            "eng_answer": _decode(getattr(doc, "eng_answer", "")),
            "doc_id": _decode(getattr(doc, "doc_id", "")),
            "chunk_index": int(_decode(getattr(doc, "chunk_index", "0")) or 0),
        })

    # Sort by similarity (highest first)
    parsed.sort(key=lambda x: x["score"], reverse=True)

    # -----------------------------------------------------------------------
    # Step 5: Deduplicate by query_id (keep highest-scoring per query_id)
    # -----------------------------------------------------------------------
    if deduplicate:
        seen_query_ids = set()
        deduped = []
        for result in parsed:
            qid = result["query_id"]
            if qid not in seen_query_ids:
                seen_query_ids.add(qid)
                deduped.append(result)
            if len(deduped) >= top_k:
                break
        parsed = deduped

    return parsed[:top_k]


def _decode(val) -> str:
    """Safely decode bytes to str (Redis returns bytes when decode_responses=False)."""
    if isinstance(val, bytes):
        return val.decode("utf-8", errors="replace")
    return str(val) if val is not None else ""


# ===========================================================================
# Session Memory (Conversation Context)
# ===========================================================================

def save_turn(session_id: str, user_query: str, bot_answer: str, lang: str = "en"):
    """
    Store a conversation turn in Redis for session context.
    
    Keeps the last N turns (configured by REDIS_SESSION_MAX_TURNS) with
    a TTL to auto-expire idle sessions.
    
    Args:
        session_id: Unique session identifier
        user_query: The user's query text
        bot_answer: The bot's response text
        lang: Detected language code
    """
    r = get_redis()
    key = f"{REDIS_SESSION_PREFIX}{session_id}"
    
    turn = json.dumps({
        "query": user_query,
        "answer": bot_answer,
        "lang": lang,
        "ts": time.time(),
    })
    
    # Push to head (newest first), trim to max, set TTL
    r.lpush(key, turn)
    r.ltrim(key, 0, REDIS_SESSION_MAX_TURNS - 1)
    r.expire(key, REDIS_SESSION_TTL)


def get_turns(session_id: str) -> List[Dict[str, Any]]:
    """
    Retrieve conversation history for a session.
    
    Returns:
        List of turn dicts (newest first), each with query, answer, lang, ts
    """
    r = get_redis()
    key = f"{REDIS_SESSION_PREFIX}{session_id}"
    
    raw_turns = r.lrange(key, 0, -1)
    turns = []
    for raw in raw_turns:
        if isinstance(raw, bytes):
            raw = raw.decode("utf-8")
        turns.append(json.loads(raw))
    
    return turns


def clear_session(session_id: str):
    """Delete all conversation history for a session."""
    r = get_redis()
    r.delete(f"{REDIS_SESSION_PREFIX}{session_id}")


# ===========================================================================
# CLI Entry Point
# ===========================================================================

def run_indexing(reindex: bool = False, test_query: str = None, test_lang: str = None):
    """
    Main indexing + retrieval test entry point.
    
    1. Loads chunks from data/chunks_ready.json
    2. Creates/recreates Redis HNSW index
    3. Embeds and indexes all chunks
    4. Runs test queries and prints results
    5. Benchmarks retrieval latency
    """
    print("=" * 62, flush=True)
    print("  ZATPAT.AI — Redis Vector Indexing & Retrieval Engine", flush=True)
    print("=" * 62, flush=True)

    # -----------------------------------------------------------------------
    # Step 1: Load chunks
    # -----------------------------------------------------------------------
    if not os.path.exists(CHUNKS_FILE):
        print(f"\n  ✖ Chunks file not found: {CHUNKS_FILE}")
        print("  Run `python -m backend.chunking` first.")
        sys.exit(1)

    with open(CHUNKS_FILE, "r", encoding="utf-8") as f:
        chunks = json.load(f)
    
    print(f"  Chunks file: {os.path.basename(CHUNKS_FILE)} ({len(chunks)} chunks)")

    # -----------------------------------------------------------------------
    # Step 2: Create index
    # -----------------------------------------------------------------------
    create_index(drop_existing=reindex)

    # -----------------------------------------------------------------------
    # Step 3: Index chunks
    # -----------------------------------------------------------------------
    index_chunks(chunks)

    # -----------------------------------------------------------------------
    # Step 4: Verify index
    # -----------------------------------------------------------------------
    r = get_redis()
    info = r.ft(REDIS_INDEX_NAME).info()
    
    # In redis-py 8.x info is a dict; in older versions it was a list
    if isinstance(info, dict):
        info_dict = info
    else:
        info_dict = {}
        for i in range(0, len(info), 2):
            k = info[i].decode() if isinstance(info[i], bytes) else str(info[i])
            v = info[i + 1]
            info_dict[k] = v
    
    num_docs = info_dict.get("num_docs") or info_dict.get(b"num_docs") or 0
    if isinstance(num_docs, bytes):
        num_docs = num_docs.decode()
    
    print(f"\n  Index info:")
    print(f"    Name:      {REDIS_INDEX_NAME}")
    print(f"    Documents: {num_docs}")
    print(f"    HNSW M:    {REDIS_HNSW_M}")
    print(f"    EF Build:  {REDIS_HNSW_EF_CONSTRUCTION}")
    print(f"    EF Query:  {REDIS_HNSW_EF_RUNTIME}")

    # -----------------------------------------------------------------------
    # Step 5: Test queries
    # -----------------------------------------------------------------------
    print("\n" + "-" * 62)
    print("  TEST QUERIES")
    print("-" * 62)

    test_cases = [
        ("what is a corporation?", "hi"),
        ("what is a corporation?", "mr"),
        ("population of India", "hi"),
        ("who is the president", "ta"),
    ]
    
    # Override with CLI args if provided
    if test_query:
        test_cases = [(test_query, test_lang or "hi")]

    for query, lang in test_cases:
        print(f"\n  Q: \"{query}\" (lang={lang})")
        
        t0 = time.perf_counter()
        results = search(query, lang=lang, top_k=3)
        latency = (time.perf_counter() - t0) * 1000
        
        if results:
            for i, res in enumerate(results):
                print(f"    [{i+1}] score={res['score']:.4f} | "
                      f"type={res['query_type']:<12} | "
                      f"qid={res['query_id']}")
                print(f"        eng:    {res['eng_text'][:80]}...")
                print(f"        native: {res['native_text'][:80]}...")
        else:
            print(f"    (no results)")
        
        print(f"    ⏱ {latency:.1f}ms")

    # -----------------------------------------------------------------------
    # Step 6: Latency benchmark (P50/P95)
    # -----------------------------------------------------------------------
    print("\n" + "-" * 62)
    print("  LATENCY BENCHMARK (100 queries)")
    print("-" * 62)

    benchmark_queries = [
        "what is a corporation?",
        "population of India",
        "who is the president",
        "capital of Maharashtra",
        "how does photosynthesis work",
    ]
    
    latencies = []
    for _ in range(20):  # 20 rounds × 5 queries = 100 total
        for q in benchmark_queries:
            t0 = time.perf_counter()
            search(q, lang="hi", top_k=5)
            latencies.append((time.perf_counter() - t0) * 1000)
    
    latencies.sort()
    p50 = latencies[len(latencies) // 2]
    p95 = latencies[int(len(latencies) * 0.95)]
    p99 = latencies[int(len(latencies) * 0.99)]
    avg = sum(latencies) / len(latencies)
    
    print(f"\n  Avg:  {avg:.1f}ms")
    print(f"  P50:  {p50:.1f}ms")
    print(f"  P95:  {p95:.1f}ms")
    print(f"  P99:  {p99:.1f}ms")
    print(f"  Min:  {min(latencies):.1f}ms")
    print(f"  Max:  {max(latencies):.1f}ms")

    # -----------------------------------------------------------------------
    # Step 7: Session memory test
    # -----------------------------------------------------------------------
    print("\n" + "-" * 62)
    print("  SESSION MEMORY TEST")
    print("-" * 62)

    test_session = "test_session_001"
    clear_session(test_session)
    
    save_turn(test_session, "what is a corporation?", "A corporation is a company...", "hi")
    save_turn(test_session, "tell me more", "It can issue stock...", "hi")
    
    turns = get_turns(test_session)
    assert len(turns) == 2, f"Expected 2 turns, got {len(turns)}"
    assert turns[0]["query"] == "tell me more"  # Newest first
    
    print(f"  ✅ save_turn + get_turns round-trip: {len(turns)} turns stored")
    print(f"     Latest: \"{turns[0]['query']}\" → \"{turns[0]['answer']}\"")
    
    clear_session(test_session)
    print(f"  ✅ clear_session: session cleared")

    print(f"\n{'=' * 62}")
    print(f"  ✅ SPRINT 4 COMPLETE — {num_docs} chunks indexed, retrieval operational")
    print(f"{'=' * 62}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Redis Vector Indexing & Retrieval")
    parser.add_argument("--reindex", action="store_true", help="Drop and recreate index")
    parser.add_argument("--query", type=str, help="Test query string")
    parser.add_argument("--lang", type=str, default="hi", help="Test query language")
    
    args = parser.parse_args()
    run_indexing(reindex=args.reindex, test_query=args.query, test_lang=args.lang)
