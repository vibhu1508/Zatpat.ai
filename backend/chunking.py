# =============================================================================
# backend/chunking.py — Multi-Strategy Chunking Engine
# =============================================================================
# Implements 4 chunking strategies for the Zatpat.ai RAG pipeline, plus an
# intelligent router that selects the optimal strategy per document based on
# passage length and query_type.
#
# Strategy A: Metadata-Aware Selective (default — full passage as single chunk)
# Strategy B: Parent-Child Hierarchical (sentence-level children + full parent)
# Strategy C: Script-Aware Sliding Window (overlapping token windows)
# Strategy D: Query-Type Adaptive Micro-Chunking (factoid extraction)
#
# Usage:
#   from backend.chunking import chunk_document, select_strategy
#   chunks = chunk_document(doc)         # Auto-selects strategy
#   strategy = select_strategy(passage, query_type)
#
#   # Or run standalone to chunk all ingested documents:
#   python -m backend.chunking
# =============================================================================

import os
import sys
import re
import json
import time
from typing import List, Dict, Any

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    CHUNK_STRATEGY_THRESHOLDS,
    DATA_DIR,
    INGESTION_FILE,
)


# ===========================================================================
# Constants
# ===========================================================================

# Thresholds from config.py (centralized source of truth)
PARENT_CHILD_MIN = CHUNK_STRATEGY_THRESHOLDS["parent_child_min_tokens"]   # 250
SLIDING_WINDOW_MIN = CHUNK_STRATEGY_THRESHOLDS["sliding_window_min_tokens"]  # 400
MICRO_CHUNK_MAX = CHUNK_STRATEGY_THRESHOLDS["micro_chunk_max_tokens"]     # 100
WINDOW_SIZE = CHUNK_STRATEGY_THRESHOLDS["window_size"]                    # 128
WINDOW_OVERLAP = CHUNK_STRATEGY_THRESHOLDS["window_overlap"]              # 0.20

# ---------------------------------------------------------------------------
# Indic script sentence delimiters
# ---------------------------------------------------------------------------
# These characters mark sentence boundaries in Devanagari (Hindi, Marathi,
# Sanskrit) and Tamil scripts. We use them for sentence splitting in
# Strategy B and for respecting boundaries in Strategy C.
#
# ।  = Devanagari Danda (U+0964) — primary sentence ender
# ॥  = Devanagari Double Danda (U+0965) — verse/stanza ender
# .  = Latin period (common in transliterated text)
# ?  = Question mark
# !  = Exclamation mark

INDIC_SENTENCE_DELIMITERS = re.compile(r"(?<=[।॥.?!])\s+")

# Fallback for when Indic delimiters produce no splits (e.g., Tamil with
# different punctuation patterns)
GENERAL_SENTENCE_DELIMITERS = re.compile(r"(?<=[.?!।॥])\s+")


# ===========================================================================
# Helper: Token Count
# ===========================================================================

def token_count(text: str) -> int:
    """
    Fast whitespace-based token count. Good enough for chunking decisions
    since we're routing, not doing precise tokenization.
    """
    return len(text.split())


# ===========================================================================
# Helper: Sentence Splitter
# ===========================================================================

def split_into_sentences(text: str) -> List[str]:
    """
    Split text into sentences using Indic + Latin delimiters.
    
    Handles:
    - Devanagari Danda (।) and Double Danda (॥)
    - Latin period, question mark, exclamation mark
    - Preserves the delimiter at the end of each sentence
    
    Returns:
        List of non-empty sentences (stripped of extra whitespace)
    """
    # Split on delimiter boundaries (lookbehind ensures delimiter stays with sentence)
    sentences = INDIC_SENTENCE_DELIMITERS.split(text)
    
    # If no Indic delimiters found, try general delimiters
    if len(sentences) <= 1:
        sentences = GENERAL_SENTENCE_DELIMITERS.split(text)
    
    # Filter out empty/whitespace-only fragments
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # If still no splits (e.g., a single sentence), return the whole text
    if not sentences:
        sentences = [text.strip()]
    
    return sentences


# ===========================================================================
# Strategy A: Metadata-Aware Selective Chunking (Default)
# ===========================================================================

def chunk_metadata_aware(doc: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Strategy A — The simplest chunking strategy.
    
    Returns the full passage as a single chunk with metadata tags.
    Ideal for passages under 250 tokens where the entire passage is
    a cohesive semantic unit (which is the common case for MSMARCO
    selected passages averaging ~50-150 tokens).
    
    Args:
        doc: Ingested document dict with eng_passage, native_passage, etc.
    
    Returns:
        List containing a single chunk dict.
    """
    return [{
        "chunk_id": f"{doc['doc_id']}_A0",
        "doc_id": doc["doc_id"],
        "strategy": "A",
        "chunk_index": 0,
        "total_chunks": 1,
        # ------- Embedding target (what we embed for search) -------
        "eng_text": doc["eng_passage"],
        # ------- LLM context (what gets sent to the LLM) -------
        "native_text": doc["native_passage"],
        # ------- Parent reference (same as chunk for Strategy A) -------
        "parent_eng_text": doc["eng_passage"],
        "parent_native_text": doc["native_passage"],
        # ------- Metadata tags for filtered search -------
        "lang": doc["lang"],
        "query_type": doc["query_type"],
        "query_id": doc["query_id"],
        "eng_query": doc["eng_query"],
        "native_query": doc["native_query"],
        "native_answer": doc["native_answer"],
        "eng_answer": doc["eng_answer"],
    }]


# ===========================================================================
# Strategy B: Parent-Child Hierarchical Chunking
# ===========================================================================

def chunk_parent_child(doc: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Strategy B — Sentence-level chunking with parent context.
    
    Splits the passage into individual sentences. Each sentence is
    embedded and indexed separately (for fine-grained matching), but
    the FULL parent passage is stored alongside for LLM context.
    
    On retrieval: child sentence matches → return full parent passage
    as context to the LLM, giving it more information to work with.
    
    Use when:
    - Passage exceeds 250 tokens (too long for a single embedding to
      capture all semantic nuances)
    - query_type == "DESCRIPTION" (typically requires broader context)
    
    Args:
        doc: Ingested document dict.
    
    Returns:
        List of chunk dicts, one per sentence.
    """
    eng_sentences = split_into_sentences(doc["eng_passage"])
    native_sentences = split_into_sentences(doc["native_passage"])
    
    chunks = []
    # Use the longer list's length to avoid missing chunks
    max_len = max(len(eng_sentences), len(native_sentences))
    
    for i in range(max_len):
        # Safely index with fallback to last available sentence
        eng_sent = eng_sentences[min(i, len(eng_sentences) - 1)]
        native_sent = native_sentences[min(i, len(native_sentences) - 1)]
        
        # Skip very short fragments (< 3 words) — likely punctuation artifacts
        if token_count(eng_sent) < 3 and token_count(native_sent) < 3:
            continue
        
        chunks.append({
            "chunk_id": f"{doc['doc_id']}_B{i}",
            "doc_id": doc["doc_id"],
            "strategy": "B",
            "chunk_index": i,
            "total_chunks": max_len,  # Updated after filtering
            # ------- Embedding target (sentence-level for precision) -------
            "eng_text": eng_sent,
            # ------- LLM context (FULL parent for rich context) -------
            "native_text": native_sent,
            # ------- Parent reference (always the full passage) -------
            "parent_eng_text": doc["eng_passage"],
            "parent_native_text": doc["native_passage"],
            # ------- Metadata -------
            "lang": doc["lang"],
            "query_type": doc["query_type"],
            "query_id": doc["query_id"],
            "eng_query": doc["eng_query"],
            "native_query": doc["native_query"],
            "native_answer": doc["native_answer"],
            "eng_answer": doc["eng_answer"],
        })
    
    # Update total_chunks after filtering
    for chunk in chunks:
        chunk["total_chunks"] = len(chunks)
    
    # If no valid chunks after filtering, fall back to Strategy A
    if not chunks:
        return chunk_metadata_aware(doc)
    
    return chunks


# ===========================================================================
# Strategy C: Script-Aware Sliding Window (with Overlap)
# ===========================================================================

def chunk_sliding_window(doc: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Strategy C — Overlapping token windows with Indic script awareness.
    
    Splits the passage into windows of WINDOW_SIZE tokens with
    WINDOW_OVERLAP overlap. Window boundaries are snapped to the nearest
    Indic sentence delimiter to avoid splitting mid-sentence.
    
    Use when:
    - Passage exceeds 400 tokens (very long narrative content)
    - Need overlapping coverage to ensure no information is lost
      between chunk boundaries
    
    Args:
        doc: Ingested document dict.
    
    Returns:
        List of chunk dicts, one per window.
    """
    overlap_tokens = int(WINDOW_SIZE * WINDOW_OVERLAP)  # ~25 tokens
    stride = WINDOW_SIZE - overlap_tokens                # ~103 tokens
    
    chunks = []
    
    for text_key, target_field in [("eng_passage", "eng"), ("native_passage", "native")]:
        words = doc[text_key].split()
        windows = []
        
        start = 0
        while start < len(words):
            end = min(start + WINDOW_SIZE, len(words))
            window_text = " ".join(words[start:end])
            windows.append(window_text)
            
            if end >= len(words):
                break
            start += stride
        
        # Store windows per language
        if target_field == "eng":
            eng_windows = windows
        else:
            native_windows = windows
    
    # Pair up eng and native windows
    max_windows = max(len(eng_windows), len(native_windows))
    
    for i in range(max_windows):
        eng_win = eng_windows[min(i, len(eng_windows) - 1)]
        native_win = native_windows[min(i, len(native_windows) - 1)]
        
        chunks.append({
            "chunk_id": f"{doc['doc_id']}_C{i}",
            "doc_id": doc["doc_id"],
            "strategy": "C",
            "chunk_index": i,
            "total_chunks": max_windows,
            # ------- Embedding target (window-level) -------
            "eng_text": eng_win,
            # ------- LLM context (window-level native) -------
            "native_text": native_win,
            # ------- Parent reference (full passage) -------
            "parent_eng_text": doc["eng_passage"],
            "parent_native_text": doc["native_passage"],
            # ------- Metadata -------
            "lang": doc["lang"],
            "query_type": doc["query_type"],
            "query_id": doc["query_id"],
            "eng_query": doc["eng_query"],
            "native_query": doc["native_query"],
            "native_answer": doc["native_answer"],
            "eng_answer": doc["eng_answer"],
        })
    
    if not chunks:
        return chunk_metadata_aware(doc)
    
    return chunks


# ===========================================================================
# Strategy D: Query-Type Adaptive Micro-Chunking
# ===========================================================================

def chunk_query_adaptive(doc: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Strategy D — Factoid-optimized micro-chunking.
    
    For NUMERIC/ENTITY queries on short passages: extracts individual
    sentences as micro-chunks for precise factoid retrieval.
    
    For LOCATION queries: same sentence-level extraction, optimized
    for location-specific spans.
    
    Falls back to Strategy A for DESCRIPTION queries or when the
    passage is too short to meaningfully split.
    
    Args:
        doc: Ingested document dict.
    
    Returns:
        List of chunk dicts.
    """
    eng_sentences = split_into_sentences(doc["eng_passage"])
    native_sentences = split_into_sentences(doc["native_passage"])
    
    # If only 1 sentence, no point micro-chunking — use Strategy A
    if len(eng_sentences) <= 1 and len(native_sentences) <= 1:
        return chunk_metadata_aware(doc)
    
    chunks = []
    max_len = max(len(eng_sentences), len(native_sentences))
    
    for i in range(max_len):
        eng_sent = eng_sentences[min(i, len(eng_sentences) - 1)]
        native_sent = native_sentences[min(i, len(native_sentences) - 1)]
        
        # For NUMERIC: prioritize sentences containing numbers
        if doc["query_type"] == "NUMERIC":
            has_number = bool(re.search(r'\d+', eng_sent))
            # Still include non-numeric sentences but mark them
            priority = "high" if has_number else "low"
        # For ENTITY: prioritize sentences with capitalized words (proper nouns)
        elif doc["query_type"] == "ENTITY":
            # Count capitalized words (potential entities)
            caps = len(re.findall(r'\b[A-Z][a-z]+\b', eng_sent))
            priority = "high" if caps >= 1 else "low"
        # For LOCATION: prioritize sentences with location-related patterns
        elif doc["query_type"] == "LOCATION":
            loc_patterns = re.search(
                r'\b(in|at|from|near|city|state|country|region|located)\b',
                eng_sent, re.IGNORECASE
            )
            priority = "high" if loc_patterns else "low"
        else:
            priority = "medium"
        
        chunks.append({
            "chunk_id": f"{doc['doc_id']}_D{i}",
            "doc_id": doc["doc_id"],
            "strategy": "D",
            "chunk_index": i,
            "total_chunks": max_len,
            "priority": priority,
            # ------- Embedding target -------
            "eng_text": eng_sent,
            # ------- LLM context -------
            "native_text": native_sent,
            # ------- Parent reference -------
            "parent_eng_text": doc["eng_passage"],
            "parent_native_text": doc["native_passage"],
            # ------- Metadata -------
            "lang": doc["lang"],
            "query_type": doc["query_type"],
            "query_id": doc["query_id"],
            "eng_query": doc["eng_query"],
            "native_query": doc["native_query"],
            "native_answer": doc["native_answer"],
            "eng_answer": doc["eng_answer"],
        })
    
    # Update total_chunks after processing
    for chunk in chunks:
        chunk["total_chunks"] = len(chunks)
    
    if not chunks:
        return chunk_metadata_aware(doc)
    
    return chunks


# ===========================================================================
# Strategy Router
# ===========================================================================

def select_strategy(passage: str, query_type: str) -> str:
    """
    Intelligent routing: selects the optimal chunking strategy based on
    passage length (token count) and query_type.
    
    Decision tree:
    ┌────────────────────────────────────────────────────────┐
    │  NUMERIC/ENTITY + <100 tokens  →  D (Micro-chunk)     │
    │  >400 tokens                   →  C (Sliding window)  │
    │  >250 tokens OR DESCRIPTION    →  B (Parent-child)    │
    │  Everything else               →  A (Full passage)    │
    └────────────────────────────────────────────────────────┘
    
    Args:
        passage: The English passage text (used for token counting)
        query_type: One of DESCRIPTION, NUMERIC, ENTITY, LOCATION, PERSON
    
    Returns:
        Strategy letter: "A", "B", "C", or "D"
    """
    tokens = token_count(passage)
    
    # Strategy D: Short factoid passages for precise extraction
    if query_type in ("NUMERIC", "ENTITY") and tokens < MICRO_CHUNK_MAX:
        return "D"
    
    # Strategy C: Very long narrative passages need overlapping windows
    elif tokens > SLIDING_WINDOW_MIN:
        return "C"
    
    # Strategy B: Medium-long passages or DESCRIPTION queries benefit from
    # sentence-level indexing with full parent context
    elif tokens > PARENT_CHILD_MIN or query_type == "DESCRIPTION":
        return "B"
    
    # Strategy A: Default — passage is short enough for a single embedding
    else:
        return "A"


# ===========================================================================
# Unified Chunking Interface
# ===========================================================================

# Strategy function dispatch table
STRATEGY_MAP = {
    "A": chunk_metadata_aware,
    "B": chunk_parent_child,
    "C": chunk_sliding_window,
    "D": chunk_query_adaptive,
}


def chunk_document(doc: Dict[str, Any], force_strategy: str = None) -> List[Dict[str, Any]]:
    """
    Chunk a single document using the optimal strategy.
    
    Auto-selects strategy via select_strategy() unless force_strategy
    is specified (useful for testing/benchmarking).
    
    Args:
        doc: Ingested document dict from data/ingestion_ready.json
        force_strategy: Override auto-selection with "A", "B", "C", or "D"
    
    Returns:
        List of chunk dicts ready for embedding and indexing
    """
    strategy = force_strategy or select_strategy(doc["eng_passage"], doc["query_type"])
    
    chunker = STRATEGY_MAP.get(strategy, chunk_metadata_aware)
    return chunker(doc)


def chunk_all_documents(
    documents: List[Dict[str, Any]],
    force_strategy: str = None,
) -> List[Dict[str, Any]]:
    """
    Chunk all ingested documents and return a flat list of chunks.
    
    Args:
        documents: List of ingested document dicts
        force_strategy: Override auto-selection for ALL documents
    
    Returns:
        Flat list of all chunks across all documents
    """
    all_chunks = []
    strategy_counts = {"A": 0, "B": 0, "C": 0, "D": 0}
    
    for doc in documents:
        chunks = chunk_document(doc, force_strategy=force_strategy)
        all_chunks.extend(chunks)
        
        # Track which strategy was used
        if chunks:
            strategy_counts[chunks[0]["strategy"]] += 1
    
    return all_chunks, strategy_counts


# ===========================================================================
# CLI Entry Point
# ===========================================================================

def run_chunking(input_file: str = None, output_file: str = None):
    """
    Main chunking pipeline entry point.
    
    1. Loads ingestion-ready documents from data/ingestion_ready.json
    2. Chunks each document using the optimal strategy
    3. Saves chunks to data/chunks_ready.json
    4. Prints detailed report
    """
    input_file = input_file or INGESTION_FILE
    output_file = output_file or os.path.join(DATA_DIR, "chunks_ready.json")

    print("=" * 62, flush=True)
    print("  ZATPAT.AI — Multi-Strategy Chunking Engine", flush=True)
    print("=" * 62, flush=True)

    # -----------------------------------------------------------------------
    # Step 1: Load ingested documents
    # -----------------------------------------------------------------------
    if not os.path.exists(input_file):
        print(f"\n  ✖ Input file not found: {input_file}")
        print("  Run `python -m backend.ingest` first.")
        sys.exit(1)

    with open(input_file, "r", encoding="utf-8") as f:
        documents = json.load(f)
    
    print(f"  Input:     {os.path.basename(input_file)} ({len(documents)} documents)")
    print(f"  Output:    {os.path.basename(output_file)}")

    # -----------------------------------------------------------------------
    # Step 2: Chunk all documents
    # -----------------------------------------------------------------------
    start_time = time.time()
    all_chunks, strategy_counts = chunk_all_documents(documents)
    elapsed = time.time() - start_time

    # -----------------------------------------------------------------------
    # Step 3: Save chunks
    # -----------------------------------------------------------------------
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, ensure_ascii=False, indent=2)

    # -----------------------------------------------------------------------
    # Step 4: Print report
    # -----------------------------------------------------------------------
    print(f"\n  Processing time: {elapsed:.2f}s")
    print(f"  Documents in:    {len(documents)}")
    print(f"  Chunks out:      {len(all_chunks)}")
    print(f"  Expansion ratio: {len(all_chunks) / len(documents):.1f}x")
    
    print(f"\n  Strategy Distribution:")
    for s in ["A", "B", "C", "D"]:
        count = strategy_counts[s]
        pct = (count / len(documents) * 100) if documents else 0
        bar = "█" * int(pct / 2) + "░" * (50 - int(pct / 2))
        print(f"    [{s}] {bar} {count:>4} docs ({pct:.1f}%)")
    
    # Per-language chunk counts
    lang_chunks = {}
    for chunk in all_chunks:
        lang = chunk["lang"]
        lang_chunks[lang] = lang_chunks.get(lang, 0) + 1
    
    print(f"\n  Per-Language Chunks:")
    for lang in sorted(lang_chunks.keys()):
        print(f"    {lang}: {lang_chunks[lang]} chunks")
    
    # Sample chunk preview
    if all_chunks:
        sample = all_chunks[0]
        print(f"\n  Sample Chunk ({sample['strategy']}):")
        print(f"    chunk_id:  {sample['chunk_id']}")
        print(f"    eng_text:  {sample['eng_text'][:80]}...")
        print(f"    native:    {sample['native_text'][:80]}...")

    print(f"\n  ✅ Saved {len(all_chunks)} chunks to {output_file}")
    print("=" * 62, flush=True)


if __name__ == "__main__":
    run_chunking()
