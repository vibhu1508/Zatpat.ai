# =============================================================================
# backend/generation.py — LLM Generation Engine with Ollama Streaming
# =============================================================================
# Implements precise, grounded, language-faithful answer extraction using local
# Ollama llama3.2:1b on Apple Silicon.
#
# Core Directives:
# 1. Native-Language Strictness: Output ONLY in the requested language
#    (Hindi, Marathi, Sanskrit, Tamil, or English).
# 2. Concise Answer Extraction: Extract ONLY the direct relevant answer sentence
#    or phrase, rather than dumping the whole context passage.
# 3. High-Speed Streaming: Async token streaming yielding TTFT < 50ms.
# 4. Hallucination Safeguard: Strictly relies on retrieved context; falls back
#    to localized abstention if context lacks sufficient information.
#
# Usage:
#   from backend.generation import generate_answer, generate_stream
#   async for token in generate_stream(passages, lang="mr", english_query="what is a corporation?"):
#       print(token, end="", flush=True)
# =============================================================================

import os
import sys
import time
import json
import asyncio
from typing import List, Dict, Any, Optional, AsyncGenerator

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    OLLAMA_HOST,
    OLLAMA_MODEL,
    OLLAMA_TIMEOUT,
    LANG_NAMES,
    ABSTAIN_MESSAGES,
)
from backend.guardrails import validate_groundedness, GuardrailResult


# ===========================================================================
# System & User Prompt Templates
# ===========================================================================

# Strict system instructions enforcing language and extraction-only behavior
SYSTEM_PROMPT_TEMPLATE = """You are Zatpat.ai, a multilingual question-answering assistant.

CRITICAL INSTRUCTIONS:
1. Target Language: Output ONLY in {language_name} ({language_code}). Do NOT use any English or other languages unless the target is English.
2. Concise Extraction: Provide ONLY the direct, relevant answer to the question using the provided context. Do NOT copy unnecessary background sentences.
3. Length Limit: Keep the answer concise (1 to 2 sentences maximum).
4. No Extrapolation: Do NOT fabricate details or use outside knowledge. If the context does not contain the answer, say: "{abstain_message}".
5. Direct Response: Output ONLY the final answer text. Do NOT include greetings, prefixes, notes, or explanations."""

USER_PROMPT_TEMPLATE = """Context (in {language_name}):
\"\"\"
{context_passages}
\"\"\"

Question (translated to English): {english_query}

Extract the direct answer in {language_name}:"""


# ===========================================================================
# Lazy-loaded Ollama Client Singleton
# ===========================================================================

_ollama_client = None


def get_ollama_client():
    """Returns an Ollama AsyncClient bound to the current event loop."""
    import ollama
    return ollama.AsyncClient(host=OLLAMA_HOST)


# ===========================================================================
# Prompt Construction Helper
# ===========================================================================

def build_prompts(
    passages: List[Dict[str, Any]],
    lang: str,
    english_query: str,
    conversation_history: Optional[List[Dict[str, Any]]] = None,
) -> List[Dict[str, str]]:
    """
    Constructs the system and user message payload for Ollama chat.
    
    Args:
        passages: List of retrieved passage dicts from Redis
        lang: Target language code ('hi', 'mr', 'sa', 'ta', 'en')
        english_query: User query translated into English
        conversation_history: Optional list of past session turns
    """
    norm_lang = lang.lower() if lang else "en"
    lang_name = LANG_NAMES.get(norm_lang, "English")
    abstain_msg = ABSTAIN_MESSAGES.get(norm_lang, ABSTAIN_MESSAGES["en"])

    # Extract native text (or parent native text for rich context)
    context_chunks = []
    for p in passages[:3]:  # Top 3 passages are sufficient
        # Prefer parent passage if available, else chunk text
        txt = p.get("parent_native_text") or p.get("native_text") or p.get("eng_text") or ""
        if txt.strip() and txt.strip() not in context_chunks:
            context_chunks.append(txt.strip())

    context_str = "\n\n".join(context_chunks) if context_chunks else "No context available."

    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(
        language_name=lang_name,
        language_code=norm_lang,
        abstain_message=abstain_msg,
    )

    user_prompt = USER_PROMPT_TEMPLATE.format(
        language_name=lang_name,
        context_passages=context_str,
        english_query=english_query,
    )

    messages = [{"role": "system", "content": system_prompt}]

    # Optionally inject last conversation turn for conversational flow
    if conversation_history:
        # Include most recent turn if available
        last_turn = conversation_history[0]
        messages.append({"role": "user", "content": f"Previous Question: {last_turn.get('query', '')}"})
        messages.append({"role": "assistant", "content": last_turn.get('answer', '')})

    messages.append({"role": "user", "content": user_prompt})
    return messages


# ===========================================================================
# Streaming Token Generator
# ===========================================================================

async def generate_stream(
    passages: List[Dict[str, Any]],
    lang: str = "hi",
    english_query: str = "",
    conversation_history: Optional[List[Dict[str, Any]]] = None,
) -> AsyncGenerator[Dict[str, Any], None]:
    """
    Async generator that streams generated tokens directly from Ollama.
    
    Yields dicts with:
    - {"type": "token", "text": "..."} for each generated token
    - {"type": "done", "full_answer": "...", "ttft_ms": ..., "total_ms": ..., "tokens": ...} on finish
    
    Args:
        passages: Retrieved candidate passages
        lang: Target language code
        english_query: English translation of query
        conversation_history: Optional session context
    """
    client = get_ollama_client()
    messages = build_prompts(passages, lang, english_query, conversation_history)

    t_start = time.perf_counter()
    ttft_ms = None
    full_answer_parts = []
    token_count = 0

    try:
        response_stream = await client.chat(
            model=OLLAMA_MODEL,
            messages=messages,
            stream=True,
            options={
                "temperature": 0.0,    # Greedy decoding for strict factual extraction
                "top_p": 0.9,
                "num_predict": 128,    # Concise answers (max 128 tokens)
            },
        )

        async for chunk in response_stream:
            token = chunk.get("message", {}).get("content", "")
            if token:
                if ttft_ms is None:
                    ttft_ms = round((time.perf_counter() - t_start) * 1000, 2)

                full_answer_parts.append(token)
                token_count += 1
                yield {"type": "token", "text": token}

        total_ms = round((time.perf_counter() - t_start) * 1000, 2)
        full_answer = "".join(full_answer_parts).strip()

        # Fallback if model generated nothing
        if not full_answer:
            full_answer = ABSTAIN_MESSAGES.get(lang.lower(), ABSTAIN_MESSAGES["en"])

        yield {
            "type": "done",
            "full_answer": full_answer,
            "ttft_ms": ttft_ms or total_ms,
            "total_generation_ms": total_ms,
            "token_count": token_count,
            "tokens_per_sec": round((token_count / (total_ms / 1000.0)), 1) if total_ms > 0 else 0.0,
        }

    except Exception as e:
        total_ms = round((time.perf_counter() - t_start) * 1000, 2)
        abstain_msg = ABSTAIN_MESSAGES.get(lang.lower(), ABSTAIN_MESSAGES["en"])
        yield {
            "type": "error",
            "error": str(e),
            "full_answer": abstain_msg,
            "ttft_ms": ttft_ms or total_ms,
            "total_generation_ms": total_ms,
            "token_count": 0,
        }


# ===========================================================================
# Complete Generation (Non-Streaming Helper)
# ===========================================================================

async def generate_answer(
    passages: List[Dict[str, Any]],
    lang: str = "hi",
    english_query: str = "",
    conversation_history: Optional[List[Dict[str, Any]]] = None,
) -> Dict[str, Any]:
    """
    Executes full generation and aggregates metrics and groundedness check.
    
    Returns:
        Dict containing full_answer, ttft_ms, total_generation_ms, groundedness_score, is_grounded
    """
    final_result = {
        "full_answer": "",
        "ttft_ms": 0.0,
        "total_generation_ms": 0.0,
        "token_count": 0,
        "tokens_per_sec": 0.0,
        "groundedness_score": 1.0,
        "is_grounded": True,
    }

    async for chunk in generate_stream(passages, lang, english_query, conversation_history):
        if chunk["type"] == "done":
            final_result.update(chunk)
        elif chunk["type"] == "error":
            final_result.update(chunk)

    # Perform groundedness check against retrieved context
    if passages and final_result["full_answer"]:
        context_parts = [p.get("parent_native_text") or p.get("native_text") or p.get("eng_text") or "" for p in passages]
        context_text = " ".join(context_parts)
        grounded_check = validate_groundedness(final_result["full_answer"], context_text, lang=lang)
        final_result["groundedness_score"] = grounded_check.metadata.get("overlap_ratio", 1.0)
        final_result["is_grounded"] = grounded_check.passed

    return final_result
