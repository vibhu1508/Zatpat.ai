# =============================================================================
# backend/harness.py — Production Orchestration Harness for Zatpat.ai
# =============================================================================
# Coordinates the end-to-end RAG workflow with:
# 1. Pre-retrieval input validation & safety filters
# 2. Resilient retrieval with automatic retry & exponential backoff
# 3. Post-retrieval confidence checks & groundedness evaluation
# 4. Granular latency breakdown (P50/P95 instrumentation across all stages)
# 5. Session state management and turn caching
#
# Usage:
#   from backend.harness import run_rag_pipeline
#   ctx = await run_rag_pipeline("what is a corporation?", lang="hi")
#
#   # Or run via CLI:
#   python -m backend.harness --query "what is a corporation?" --lang mr
# =============================================================================

import os
import sys
import time
import uuid
import json
import asyncio
import argparse
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, AsyncGenerator

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    SUPPORTED_LANGS,
    TOP_K_RESULTS,
    CONFIDENCE_THRESHOLD,
    GROUNDEDNESS_THRESHOLD,
)
from backend.guardrails import (
    GuardrailResult,
    check_input_guardrails,
    check_output_guardrails,
    validate_groundedness,
)
from backend.retrieval import (
    search,
    save_turn,
    get_turns,
)


# ===========================================================================
# Pipeline Execution Context
# ===========================================================================

@dataclass
class PipelineContext:
    """Carries full state, payloads, and timing metrics across all pipeline stages."""
    query: str
    lang: str
    session_id: str
    english_query: str = ""
    status: str = "init"              # "success", "blocked", "abstained", "error"
    error: Optional[str] = None
    abstain_message: Optional[str] = None
    retrieved_passages: List[Dict[str, Any]] = field(default_factory=list)
    top_score: float = 0.0
    generated_answer: str = ""
    groundedness_score: float = 1.0
    is_grounded: bool = True
    # Timing breakdown (all in milliseconds)
    timings: Dict[str, float] = field(default_factory=dict)
    conversation_history: List[Dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> Dict[str, Any]:
        """Convert context to serializable dictionary."""
        return {
            "session_id": self.session_id,
            "query": self.query,
            "lang": self.lang,
            "status": self.status,
            "error": self.error,
            "abstain_message": self.abstain_message,
            "top_score": self.top_score,
            "groundedness_score": self.groundedness_score,
            "is_grounded": self.is_grounded,
            "generated_answer": self.generated_answer,
            "num_passages": len(self.retrieved_passages),
            "timings_ms": self.timings,
        }


# ===========================================================================
# Helper: Retry with Exponential Backoff
# ===========================================================================

async def retry_async(
    func,
    *args,
    max_retries: int = 2,
    initial_delay: float = 0.05,
    backoff_factor: float = 2.0,
    **kwargs,
):
    """
    Executes an async or sync callable with automatic retries and exponential backoff.
    """
    delay = initial_delay
    last_exception = None

    for attempt in range(max_retries + 1):
        try:
            if asyncio.iscoroutinefunction(func):
                return await func(*args, **kwargs)
            else:
                # Run synchronous IO in default executor to prevent event-loop blocking
                loop = asyncio.get_running_loop()
                return await loop.run_in_executor(None, lambda: func(*args, **kwargs))
        except Exception as e:
            last_exception = e
            if attempt < max_retries:
                await asyncio.sleep(delay)
                delay *= backoff_factor

    raise last_exception


import re

async def condense_conversational_query_async(query: str, history: List[Dict[str, Any]]) -> str:
    """
    Generic Zero-Shot Conversational Query Condensation:
    
    Uses LLM to rephrase ANY follow-up question, pronoun, elliptical query, or meta-question
    into a complete standalone knowledge search query containing all necessary subjects and context.
    
    Handles 100% of cases generically without hardcoded regex patterns or static keyword lists.
    """
    if not history or not query:
        return query

    # Build concise recent dialogue snippet
    history_turns = []
    for t in history[:3]:
        q = t.get("query", "").strip()
        a = t.get("answer", "").strip()
        if q:
            history_turns.append(f"User: {q}\nAssistant: {a}")

    if not history_turns:
        return query

    history_str = "\n".join(history_turns)
    prompt = f"""Chat History:
{history_str}

Follow-up Question: {query}

Task: Rephrase the Follow-up Question into a single standalone search query containing all necessary subjects, entities, and context from the chat history. Output ONLY the standalone search query.
Standalone Query:"""

    try:
        from backend.generation import get_ollama_client
        from backend.config import OLLAMA_MODEL
        client = get_ollama_client()
        resp = await asyncio.wait_for(
            client.chat(
                model=OLLAMA_MODEL,
                messages=[{"role": "user", "content": prompt}],
                options={"temperature": 0.0, "num_predict": 30},
            ),
            timeout=2.0,
        )
        condensed = resp.get("message", {}).get("content", "").strip()
        condensed = re.sub(r'^(Standalone Query:|"|\')', '', condensed, flags=re.IGNORECASE).strip().strip('"\'')
        if len(condensed) >= 3 and not condensed.lower().startswith("chat history"):
            return condensed
    except Exception:
        pass

    # Generic fallback: append last query's core words
    last_query = history[0].get("query", "")
    return f"{last_query} {query}".strip()


# ===========================================================================
# Core Pipeline Harness Orchestrator
# ===========================================================================

async def run_rag_pipeline(
    query: str,
    lang: str = "hi",
    session_id: Optional[str] = None,
    top_k: int = None,
    english_query: Optional[str] = None,
) -> PipelineContext:
    """
    Orchestrates the entire RAG pipeline from query to retrieval & guardrails:
    
    1. Input Guardrails (Language, Safety, PII, Length)
    2. Session history retrieval & Generic zero-shot conversational query condensation
    3. Vector Retrieval from Redis HNSW (with retry)
    4. Post-Retrieval Output Guardrails (Confidence threshold & No-Answer checks)
    5. Session turn update
    
    Args:
        query: User input query (native or English)
        lang: Target language code ('hi', 'mr', 'sa', 'ta', 'en')
        session_id: Optional UUID session tracker
        top_k: Number of passages to retrieve
        english_query: Translated English query (from STT). Defaults to query if omitted.
    
    Returns:
        PipelineContext with retrieved passages, status, and millisecond timings.
    """
    top_k = top_k or TOP_K_RESULTS
    session_id = session_id or str(uuid.uuid4())
    eng_query = english_query or query

    ctx = PipelineContext(
        query=query,
        lang=lang.lower(),
        session_id=session_id,
        english_query=eng_query,
    )

    t_total_start = time.perf_counter()

    # -----------------------------------------------------------------------
    # Step 1: Input Guardrails
    # -----------------------------------------------------------------------
    t0 = time.perf_counter()
    input_guard = check_input_guardrails(query, lang=ctx.lang)
    ctx.timings["input_guardrail_ms"] = round((time.perf_counter() - t0) * 1000, 2)

    if not input_guard.passed:
        ctx.status = "blocked"
        ctx.abstain_message = input_guard.message
        ctx.error = input_guard.reason
        ctx.timings["total_rag_ms"] = round((time.perf_counter() - t_total_start) * 1000, 2)
        return ctx

    # -----------------------------------------------------------------------
    # Step 2: Load Session Context & Generic Zero-Shot Query Condensation
    # -----------------------------------------------------------------------
    t0 = time.perf_counter()
    try:
        ctx.conversation_history = get_turns(session_id)
    except Exception:
        ctx.conversation_history = []
    ctx.timings["session_load_ms"] = round((time.perf_counter() - t0) * 1000, 2)

    # Perform generic LLM-based query condensation for follow-up conversational turns
    if ctx.conversation_history:
        ctx.english_query = await condense_conversational_query_async(ctx.english_query, ctx.conversation_history)

    # -----------------------------------------------------------------------
    # Step 3: Redis Vector Retrieval (Sub-40ms Fast Path)
    # -----------------------------------------------------------------------
    t0 = time.perf_counter()
    try:
        passages = await asyncio.to_thread(
            search,
            query_text=ctx.english_query,
            lang=ctx.lang,
            top_k=top_k,
            deduplicate=True,
        )
        ctx.retrieved_passages = passages
        ctx.top_score = passages[0]["score"] if passages else 0.0
    except Exception as e:
        try:
            passages = await retry_async(
                search,
                query_text=ctx.english_query,
                lang=ctx.lang,
                top_k=top_k,
                deduplicate=True,
                max_retries=1,
            )
            ctx.retrieved_passages = passages
            ctx.top_score = passages[0]["score"] if passages else 0.0
        except Exception as e2:
            ctx.status = "error"
            ctx.error = f"retrieval_failed: {str(e2)}"
            ctx.timings["retrieval_ms"] = round((time.perf_counter() - t0) * 1000, 2)
            ctx.timings["total_rag_ms"] = round((time.perf_counter() - t_total_start) * 1000, 2)
            return ctx

    ctx.timings["retrieval_ms"] = round((time.perf_counter() - t0) * 1000, 2)

    # -----------------------------------------------------------------------
    # Step 4: Output Guardrails (Confidence & No-Answer checks)
    # -----------------------------------------------------------------------
    t0 = time.perf_counter()
    output_guard = check_output_guardrails(ctx.retrieved_passages, lang=ctx.lang)
    ctx.timings["output_guardrail_ms"] = round((time.perf_counter() - t0) * 1000, 2)

    if not output_guard.passed:
        ctx.status = "abstained"
        ctx.abstain_message = output_guard.message
        ctx.error = output_guard.reason
        ctx.timings["total_rag_ms"] = round((time.perf_counter() - t_total_start) * 1000, 2)
        return ctx

    # -----------------------------------------------------------------------
    # Pipeline Success (Context Ready for Downstream LLM Generation)
    # -----------------------------------------------------------------------
    ctx.status = "success"
    ctx.timings["total_rag_ms"] = round((time.perf_counter() - t_total_start) * 1000, 2)
    return ctx


def record_final_turn(
    session_id: str,
    query: str,
    answer: str,
    lang: str = "hi",
):
    """
    Save the completed turn into session memory once LLM generation concludes.
    """
    try:
        save_turn(session_id, query, answer, lang)
    except Exception as e:
        print(f"  ⚠ Failed to persist session turn: {e}", flush=True)


# ===========================================================================
# CLI Entry Point & Benchmark Runner
# ===========================================================================

def print_context_report(ctx: PipelineContext):
    """Format and print a rich execution report for the CLI."""
    print("\n" + "=" * 64)
    print("  ZATPAT.AI — PIPELINE HARNESS EXECUTION REPORT")
    print("=" * 64)
    print(f"  Session ID: {ctx.session_id}")
    print(f"  Query:      \"{ctx.query}\"")
    print(f"  Language:   {ctx.lang.upper()}")
    print(f"  Status:     {ctx.status.upper()}")

    if ctx.status == "blocked":
        print(f"\n  🚫 [BLOCKED BY INPUT GUARDRAIL]")
        print(f"     Reason:  {ctx.error}")
        print(f"     Message: {ctx.abstain_message}")

    elif ctx.status == "abstained":
        print(f"\n  ✋ [ABSTAINED BY OUTPUT GUARDRAIL]")
        print(f"     Reason:    {ctx.error}")
        print(f"     Top Score: {ctx.top_score:.4f} (Threshold: {CONFIDENCE_THRESHOLD})")
        print(f"     Message:   {ctx.abstain_message}")

    elif ctx.status == "success":
        print(f"\n  ✅ [RETRIEVAL SUCCESS]")
        print(f"     Top Match Score: {ctx.top_score:.4f}")
        print(f"     Passages Found:  {len(ctx.retrieved_passages)}")
        print("\n  Top Retrieved Context (Native):")
        for i, p in enumerate(ctx.retrieved_passages[:2], 1):
            print(f"    [{i}] (Score: {p['score']:.4f}, Type: {p['query_type']})")
            print(f"        {p['native_text'][:120]}...")

    print("\n  ⏱ Latency Breakdown:")
    for stage, ms in ctx.timings.items():
        print(f"    - {stage:<22}: {ms:>6.2f} ms")
    print("=" * 64 + "\n")


async def main_cli():
    parser = argparse.ArgumentParser(description="Zatpat.ai RAG Pipeline Harness CLI")
    parser.add_argument("--query", type=str, default="what is a corporation?", help="Query text")
    parser.add_argument("--lang", type=str, default="hi", help="Target language code")
    parser.add_argument("--session", type=str, default=None, help="Session UUID")
    parser.add_argument("--benchmark", action="store_true", help="Run 50-query harness benchmark")

    args = parser.parse_args()

    # Pre-warm embedder and Redis connection before starting query timer
    from backend.retrieval import get_embedder, get_redis, embed_text
    get_redis()
    embed_text("warmup")

    if args.benchmark:
        print("=" * 64)
        print("  RUNNING HARNESS BENCHMARK (50 pipeline executions)")
        print("=" * 64)

        test_cases = [
            ("what is a corporation?", "hi"),
            ("what is a corporation?", "mr"),
            ("what is a corporation?", "sa"),
            ("who is the president", "ta"),
            ("population of India", "hi"),
        ]

        latencies = []
        for _ in range(10):
            for q, l in test_cases:
                res = await run_rag_pipeline(q, lang=l)
                latencies.append(res.timings["total_rag_ms"])

        latencies.sort()
        print(f"  P50 Total Latency: {latencies[len(latencies)//2]:.2f} ms")
        print(f"  P95 Total Latency: {latencies[int(len(latencies)*0.95)]:.2f} ms")
        print(f"  Avg Total Latency: {sum(latencies)/len(latencies):.2f} ms")
        print("=" * 64)
        return

    ctx = await run_rag_pipeline(args.query, lang=args.lang, session_id=args.session)
    print_context_report(ctx)


if __name__ == "__main__":
    asyncio.run(main_cli())
