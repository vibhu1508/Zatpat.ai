# =============================================================================
# backend/server.py — FastAPI Real-Time Voice & Text RAG Server
# =============================================================================
# Production ASGI web server exposing REST endpoints and a Full-Duplex
# WebSocket gateway for the Zatpat.ai multilingual RAG pipeline.
#
# Protocols:
# 1. WebSocket (/ws/chat):
#    - Client -> Server: Binary audio frames (16kHz PCM/WAV) or JSON text query
#    - Server -> Client: Real-time event stream (STT transcript -> retrieval ->
#                        token stream -> latency telemetry -> done)
# 2. REST Endpoints:
#    - GET  /health          -> Service health & dependency statuses
#    - GET  /api/strategies  -> Active chunking strategy metadata
#    - GET  /api/guardrails  -> Active guardrail configuration
#    - GET  /api/languages   -> Supported language list
#    - POST /api/query       -> Synchronous REST query endpoint
#
# Run:
#   uvicorn backend.server:app --host 0.0.0.0 --port 8000 --reload
# =============================================================================

import os
import sys
import time
import json
import uuid
import asyncio
from contextlib import asynccontextmanager
from typing import Dict, Any, Optional, List
from pydantic import BaseModel

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    REDIS_INDEX_NAME,
    SUPPORTED_LANGS,
    LANG_NAMES,
    CONFIDENCE_THRESHOLD,
    GROUNDEDNESS_THRESHOLD,
    MAX_QUERY_WORDS,
    MIN_QUERY_WORDS,
    CHUNK_STRATEGY_THRESHOLDS,
    BLOCKED_TOPICS,
    OLLAMA_MODEL,
    EMBEDDING_MODEL,
)
from backend.retrieval import get_redis, get_embedder, embed_text
from backend.guardrails import validate_groundedness
from backend.harness import run_rag_pipeline, record_final_turn
from backend.generation import generate_stream, generate_answer
from backend.stt import transcribe_audio, STTResult


# ===========================================================================
# Lifespan Warmup Manager
# ===========================================================================

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Pre-warm connections and models on server boot."""
    print("\n" + "=" * 60)
    print("  🚀 Starting Zatpat.ai RAG Server...")
    print("=" * 60)
    
    # 1. Warm up Redis connection
    try:
        r = get_redis()
        r.ping()
        print("  ✔ Redis Stack: Connected (idx:msmarco_passages ready)")
    except Exception as e:
        print(f"  ⚠ Redis Connection Warning: {e}")

    # 2. Pre-warm Sentence Transformer Embedder into RAM
    try:
        get_embedder()
        embed_text("warmup")
        print("  ✔ Embedding Model: Loaded into RAM (all-MiniLM-L6-v2)")
    except Exception as e:
        print(f"  ⚠ Embedder Warmup Warning: {e}")

    # 3. Pre-warm Sarvam STT HTTP/2 connection pool
    try:
        from backend.stt import get_stt_http_client
        get_stt_http_client()
        print("  ✔ Sarvam STT: HTTP/2 Connection Pool Active")
    except Exception as e:
        print(f"  ⚠ STT Warmup Warning: {e}")

    print("=" * 60)
    print("  ⚡ Server Ready for Sub-200ms Voice & Text Queries")
    print("=" * 60 + "\n")
    yield
    print("\n  🛑 Shutting down Zatpat.ai Server...")


# ===========================================================================
# FastAPI App Initialization
# ===========================================================================

app = FastAPI(
    title="Zatpat.ai Voice & Text RAG Backend",
    description="Sub-200ms Multilingual Voice-Ready RAG Pipeline with Redis Vector Search, Ollama llama3.2:1b streaming, and Sarvam AI STT.",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for modern web frontends / mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===========================================================================
# Request & Response Models
# ===========================================================================

class QueryRequest(BaseModel):
    query: str
    lang: str = "hi"
    session_id: Optional[str] = None
    top_k: int = 5


class QueryResponse(BaseModel):
    session_id: str
    query: str
    lang: str
    status: str
    full_answer: str
    top_score: float
    groundedness_score: float
    is_grounded: bool
    retrieved_passages: List[Dict[str, Any]]
    timings_ms: Dict[str, float]


FRONTEND_HTML = os.path.join(PROJECT_ROOT, "frontend", "voice_test.html")


# ===========================================================================
# Web UI Routes
# ===========================================================================

@app.get("/", include_in_schema=False)
@app.get("/voice", include_in_schema=False)
async def serve_voice_ui():
    """Serves the real-time browser voice testing interface."""
    if os.path.exists(FRONTEND_HTML):
        return FileResponse(FRONTEND_HTML, media_type="text/html")
    return {"message": "Zatpat.ai API is running. Visit /docs for Swagger."}


# ===========================================================================
# REST API Endpoints
# ===========================================================================

@app.get("/health")
async def health_check():
    """Returns overall health, Redis connectivity, and index statistics."""
    redis_status = "error"
    doc_count = 0
    ollama_status = "ready"

    try:
        r = get_redis()
        info = r.ft(REDIS_INDEX_NAME).info()
        num_docs = info.get("num_docs") or info.get(b"num_docs") or 0
        doc_count = int(num_docs.decode() if isinstance(num_docs, bytes) else num_docs)
        redis_status = "connected"
    except Exception as e:
        redis_status = f"disconnected: {str(e)}"

    return {
        "status": "ok" if redis_status == "connected" else "degraded",
        "redis": redis_status,
        "indexed_chunks": doc_count,
        "ollama_model": OLLAMA_MODEL,
        "embedding_model": EMBEDDING_MODEL,
        "supported_languages": SUPPORTED_LANGS + ["en"],
        "timestamp": time.time(),
    }


@app.get("/api/strategies")
async def get_strategies():
    """Returns metadata for all 4 chunking strategies for the UI inspector."""
    return {
        "strategies": [
            {
                "id": "A",
                "name": "Metadata-Aware Selective",
                "description": "Full is_selected passage as a cohesive semantic unit with metadata tags.",
                "threshold": f"< {CHUNK_STRATEGY_THRESHOLDS['parent_child_min_tokens']} tokens",
                "use_case": "Standard factoid queries (ENTITY, PERSON, LOCATION)",
            },
            {
                "id": "B",
                "name": "Parent-Child Hierarchical",
                "description": "Sentence-level child chunks for high-precision embedding + full parent passage payload for LLM context.",
                "threshold": f"> {CHUNK_STRATEGY_THRESHOLDS['parent_child_min_tokens']} tokens OR DESCRIPTION query",
                "use_case": "Descriptive and multi-sentence context questions",
            },
            {
                "id": "C",
                "name": "Script-Aware Sliding Window",
                "description": f"Overlapping windows of {CHUNK_STRATEGY_THRESHOLDS['window_size']} tokens with {int(CHUNK_STRATEGY_THRESHOLDS['window_overlap']*100)}% overlap snapped to Indic sentence delimiters (।, ॥).",
                "threshold": f"> {CHUNK_STRATEGY_THRESHOLDS['sliding_window_min_tokens']} tokens",
                "use_case": "Long narrative documents",
            },
            {
                "id": "D",
                "name": "Query-Type Adaptive Micro-Chunking",
                "description": "Factoid-optimized micro spans prioritizing numbers and proper noun entities.",
                "threshold": f"< {CHUNK_STRATEGY_THRESHOLDS['micro_chunk_max_tokens']} tokens for NUMERIC/ENTITY",
                "use_case": "High-precision numerical values, stats, and names",
            },
        ],
        "router": "select_strategy(passage_len, query_type)",
    }


@app.get("/api/guardrails")
async def get_guardrails():
    """Returns active guardrail thresholds & safety rules."""
    return {
        "input_guardrails": {
            "supported_languages": SUPPORTED_LANGS + ["en"],
            "min_query_words": MIN_QUERY_WORDS,
            "max_query_words": MAX_QUERY_WORDS,
            "pii_filtering": ["email", "phone_number", "credit_card"],
            "prompt_injection_protection": True,
            "blocked_topics_count": len(BLOCKED_TOPICS),
            "blocked_topics_sample": BLOCKED_TOPICS[:5],
        },
        "output_guardrails": {
            "confidence_threshold": CONFIDENCE_THRESHOLD,
            "groundedness_threshold": GROUNDEDNESS_THRESHOLD,
            "no_answer_detection": True,
        },
    }


@app.get("/api/languages")
async def get_languages():
    """Returns list of supported languages."""
    return {
        "languages": [
            {"code": code, "name": LANG_NAMES.get(code, code), "indic": code != "en"}
            for code in SUPPORTED_LANGS + ["en"]
        ]
    }


@app.post("/api/query", response_model=QueryResponse)
async def query_endpoint(req: QueryRequest):
    """Synchronous REST query endpoint with full RAG execution."""
    session_id = req.session_id or str(uuid.uuid4())
    
    # 1. Run pipeline harness
    ctx = await run_rag_pipeline(
        query=req.query,
        lang=req.lang,
        session_id=session_id,
        top_k=req.top_k,
    )

    if ctx.status in ("blocked", "abstained"):
        return QueryResponse(
            session_id=session_id,
            query=req.query,
            lang=req.lang,
            status=ctx.status,
            full_answer=ctx.abstain_message or "",
            top_score=ctx.top_score,
            groundedness_score=1.0,
            is_grounded=True,
            retrieved_passages=[],
            timings_ms=ctx.timings,
        )

    # 2. Generate answer
    gen_result = await generate_answer(
        passages=ctx.retrieved_passages,
        lang=ctx.lang,
        english_query=ctx.english_query,
        conversation_history=ctx.conversation_history,
    )

    # Record turn
    record_final_turn(session_id, req.query, gen_result["full_answer"], lang=req.lang)

    timings = dict(ctx.timings)
    timings["ttft_ms"] = gen_result["ttft_ms"]
    timings["llm_generation_ms"] = gen_result["total_generation_ms"]

    return QueryResponse(
        session_id=session_id,
        query=req.query,
        lang=req.lang,
        status="success",
        full_answer=gen_result["full_answer"],
        top_score=ctx.top_score,
        groundedness_score=gen_result["groundedness_score"],
        is_grounded=gen_result["is_grounded"],
        retrieved_passages=ctx.retrieved_passages,
        timings_ms=timings,
    )


# ===========================================================================
# Full-Duplex WebSocket Endpoint (/ws/chat)
# ===========================================================================

@app.websocket("/ws/chat")
async def websocket_chat_endpoint(websocket: WebSocket):
    """
    Full-Duplex Real-Time Voice & Text RAG WebSocket Endpoint.
    
    Message Protocol:
    - Client sends:
      - Binary Frame: Raw 16kHz audio bytes (WAV/PCM)
      - Text Frame: JSON `{"query": "...", "lang": "mr", "session_id": "..."}`
    
    - Server streams:
      1. `{"type": "stt", "detected_lang": "...", "english_query": "...", "native_query": "..."}`
      2. `{"type": "retrieval", "top_score": ..., "strategy": "...", "passages": [...]}`
      3. `{"type": "token", "text": "..."}` (real-time stream)
      4. `{"type": "telemetry", "timings": {...}}`
      5. `{"type": "done", "full_answer": "...", "grounded": true}`
    """
    await websocket.accept()
    session_id = str(uuid.uuid4())

    try:
        while True:
            # Receive next message (can be bytes or text)
            message = await websocket.receive()

            t_pipeline_start = time.perf_counter()
            timings = {}

            query_text = ""
            lang = "hi"
            english_query = ""

            # ---------------------------------------------------------------
            # Case A: Binary Audio Frame (Voice Input)
            # ---------------------------------------------------------------
            if "bytes" in message and message["bytes"]:
                audio_bytes = message["bytes"]
                
                t0 = time.perf_counter()
                stt_res = await transcribe_audio(
                    audio_bytes,
                    mock_fallback=True,
                    fallback_lang="mr",
                    fallback_query="what is a corporation?",
                )
                timings["stt_ms"] = round((time.perf_counter() - t0) * 1000, 2)

                lang = stt_res.detected_lang
                english_query = stt_res.english_transcript
                query_text = stt_res.native_transcript or english_query

                # Send STT result event to client
                await websocket.send_text(json.dumps({
                    "type": "stt",
                    "detected_lang": lang,
                    "english_query": english_query,
                    "native_query": query_text,
                    "stt_latency_ms": timings["stt_ms"],
                    "is_mock": stt_res.is_mock,
                }))

            # ---------------------------------------------------------------
            # Case B: Text JSON Frame (Text Input)
            # ---------------------------------------------------------------
            elif "text" in message and message["text"]:
                try:
                    payload = json.loads(message["text"])
                    query_text = payload.get("query", "")
                    lang = payload.get("lang", "hi")
                    english_query = payload.get("english_query", query_text)
                    if payload.get("session_id"):
                        session_id = payload["session_id"]
                except Exception:
                    query_text = message["text"].strip()
                    lang = "hi"
                    english_query = query_text

            if not query_text:
                continue

            # ---------------------------------------------------------------
            # Step 1: Run Harness (Input Guardrail + Retrieval + Output Guardrail)
            # ---------------------------------------------------------------
            ctx = await run_rag_pipeline(
                query=query_text,
                lang=lang,
                session_id=session_id,
                english_query=english_query,
            )

            # Merge harness timings
            timings.update(ctx.timings)

            # If input was blocked by guardrails or confidence abstained:
            if ctx.status in ("blocked", "abstained"):
                await websocket.send_text(json.dumps({
                    "type": "blocked" if ctx.status == "blocked" else "abstained",
                    "status": ctx.status,
                    "reason": ctx.error,
                    "message": ctx.abstain_message,
                    "timings": timings,
                }))
                continue

            # Send retrieval context event to client
            top_passage = ctx.retrieved_passages[0] if ctx.retrieved_passages else {}
            await websocket.send_text(json.dumps({
                "type": "retrieval",
                "top_score": ctx.top_score,
                "strategy": top_passage.get("strategy", "A"),
                "query_type": top_passage.get("query_type", "DESCRIPTION"),
                "passages_count": len(ctx.retrieved_passages),
                "top_passage_sample": top_passage.get("native_text", "")[:120],
                "retrieval_ms": timings.get("retrieval_ms", 0.0),
            }))

            # ---------------------------------------------------------------
            # Step 2: Stream LLM Generation Tokens
            # ---------------------------------------------------------------
            full_answer_parts = []
            stream_meta = None

            async for chunk in generate_stream(
                passages=ctx.retrieved_passages,
                lang=ctx.lang,
                english_query=ctx.english_query,
                conversation_history=ctx.conversation_history,
            ):
                if chunk["type"] == "token":
                    full_answer_parts.append(chunk["text"])
                    await websocket.send_text(json.dumps({
                        "type": "token",
                        "text": chunk["text"],
                    }))
                elif chunk["type"] in ("done", "error"):
                    stream_meta = chunk

            full_answer = "".join(full_answer_parts).strip()
            timings["ttft_ms"] = stream_meta.get("ttft_ms", 0.0) if stream_meta else 0.0
            timings["llm_generation_ms"] = stream_meta.get("total_generation_ms", 0.0) if stream_meta else 0.0

            # ---------------------------------------------------------------
            # Step 3: Groundedness Verification & Turn Logging
            # ---------------------------------------------------------------
            t0 = time.perf_counter()
            context_text = top_passage.get("parent_native_text") or top_passage.get("native_text") or ""
            ground_check = validate_groundedness(full_answer, context_text, lang=ctx.lang)
            timings["groundedness_ms"] = round((time.perf_counter() - t0) * 1000, 2)

            record_final_turn(session_id, query_text, full_answer, lang=ctx.lang)

            timings["total_pipeline_ms"] = round((time.perf_counter() - t_pipeline_start) * 1000, 2)

            # Send Telemetry & Completion Frames
            await websocket.send_text(json.dumps({
                "type": "telemetry",
                "timings": timings,
                "tokens_per_sec": stream_meta.get("tokens_per_sec", 0.0) if stream_meta else 0.0,
            }))

            await websocket.send_text(json.dumps({
                "type": "done",
                "session_id": session_id,
                "full_answer": full_answer,
                "is_grounded": ground_check.passed,
                "groundedness_score": ground_check.metadata.get("overlap_ratio", 1.0),
                "total_ms": timings["total_pipeline_ms"],
            }))

    except WebSocketDisconnect:
        pass
    except Exception as e:
        try:
            await websocket.send_text(json.dumps({
                "type": "error",
                "error": str(e),
            }))
        except Exception:
            pass


# ===========================================================================
# Direct CLI Entry Point
# ===========================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.server:app", host="0.0.0.0", port=8000, reload=True)
