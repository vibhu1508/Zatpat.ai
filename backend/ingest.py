# =============================================================================
# backend/ingest.py — Dataset → Redis Index-Ready Document Extractor
# =============================================================================
# Reads the stratified msmarco_xi_preview.json and produces a clean, flat list
# of index-ready documents in data/ingestion_ready.json.
#
# Each document represents ONE is_selected==1 passage tied to its English
# query and native-language answer. These documents are what Sprint 4 will
# embed and push into Redis Stack.
#
# Usage:
#   python -m backend.ingest                     # Default: all 4 languages
#   python -m backend.ingest --langs hi mr       # Specific languages only
#   python -m backend.ingest --preview-file X    # Custom input file
# =============================================================================

import os
import sys
import json
import time
import argparse
from collections import defaultdict

# ---------------------------------------------------------------------------
# Add project root to path so we can import backend.config
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    SUPPORTED_LANGS,
    LANG_NAMES,
    DATA_DIR,
    INGESTION_FILE,
    PREVIEW_FILE,
)


# ===========================================================================
# No-Answer Detection Strings
# ===========================================================================
# These strings indicate that no valid answer exists for a query.
# We skip these records entirely to avoid indexing noise.

NO_ANSWER_STRINGS = {
    # English
    "No Answer Present.",
    "No Answer Present",
    "no answer present.",
    "no answer present",
    "",
    # Hindi
    "कोई उत्तर मौजूद नहीं है।",
    "कोई उत्तर उपस्थित नहीं।",
    # Marathi
    "उत्तर उपलब्ध नाही.",
    "उत्तर उपलब्ध नाही",
    # Tamil
    "பதில் இல்லை.",
    "பதில் இல்லை",
    # Sanskrit
    "उत्तरं नास्ति।",
    "उत्तरं न विद्यते।",
}


def extract_documents_from_preview(preview_data: dict, target_langs: list) -> list:
    """
    Extract index-ready documents from the stratified preview JSON.
    
    For each record in each language:
    1. Skip if answer is in NO_ANSWER_STRINGS (no valid answer)
    2. Find all passages where is_selected == 1
    3. Create one document per selected passage containing:
       - English query (for embedding/search)
       - English passage (for embedding)
       - Native passage (for LLM context — this is what gets shown to user)
       - Native answer (ground truth for evaluation)
       - Metadata: lang, query_type, query_id, passage_index, chunk_strategy
    
    Args:
        preview_data: Dict mapping lang_code → list of records from parquet
        target_langs: List of language codes to process
    
    Returns:
        List of flat document dicts ready for embedding + indexing
    """
    documents = []
    stats = {
        "total_records_scanned": 0,
        "skipped_no_answer": 0,
        "skipped_no_selected": 0,
        "documents_created": 0,
        "per_lang": defaultdict(lambda: defaultdict(int)),
    }

    for lang in target_langs:
        if lang not in preview_data:
            print(f"  ⚠ Language '{lang}' not found in preview data, skipping.", flush=True)
            continue

        records = preview_data[lang]
        lang_name = LANG_NAMES.get(lang, lang)
        print(f"\n  [{lang}] Processing {len(records)} records for {lang_name}...", flush=True)

        for record in records:
            stats["total_records_scanned"] += 1

            # -----------------------------------------------------------------
            # Step 1: Check for valid answer
            # -----------------------------------------------------------------
            eng_answer = record.get("Eng_Answer", "")
            native_answer = record.get("Answer", "")  # Native-language answer
            
            # Handle answers that might be lists
            if isinstance(native_answer, list):
                native_answer = " ".join(str(a) for a in native_answer if a)
            if isinstance(eng_answer, list):
                eng_answer = " ".join(str(a) for a in eng_answer if a)

            if eng_answer.strip() in NO_ANSWER_STRINGS:
                stats["skipped_no_answer"] += 1
                continue

            # -----------------------------------------------------------------
            # Step 2: Extract passage data
            # -----------------------------------------------------------------
            passages = record.get("passages", {})
            if not isinstance(passages, dict):
                continue

            is_selected = passages.get("is_selected", [])
            passage_texts = passages.get("Translated_passages", [])  # Native language passages
            eng_passages = passages.get("English_passages", [])       # English passages

            # Convert numpy arrays to lists if needed
            if hasattr(is_selected, "tolist"):
                is_selected = is_selected.tolist()
            if hasattr(passage_texts, "tolist"):
                passage_texts = passage_texts.tolist()
            if hasattr(eng_passages, "tolist"):
                eng_passages = eng_passages.tolist()

            # -----------------------------------------------------------------
            # Step 3: Find selected passages (is_selected == 1)
            # -----------------------------------------------------------------
            selected_indices = [i for i, sel in enumerate(is_selected) if sel == 1]

            if not selected_indices:
                stats["skipped_no_selected"] += 1
                continue

            # -----------------------------------------------------------------
            # Step 4: Create one document per selected passage
            # -----------------------------------------------------------------
            query_id = record.get("query_id", 0)
            query_type = record.get("query_type", "UNKNOWN")
            eng_query = record.get("Eng_Query", record.get("query", ""))  # English query text
            native_query = record.get("query", "")                        # Native language query

            for passage_idx in selected_indices:
                # Safely get passage texts with bounds checking
                native_passage = (
                    passage_texts[passage_idx]
                    if passage_idx < len(passage_texts)
                    else ""
                )
                eng_passage = (
                    eng_passages[passage_idx]
                    if passage_idx < len(eng_passages)
                    else ""
                )

                # Skip empty passages
                if not native_passage.strip() and not eng_passage.strip():
                    continue

                # Build the document ID: {lang}_{queryId}_{passageIdx}
                doc_id = f"{lang}_{query_id}_{passage_idx}"

                doc = {
                    "doc_id": doc_id,
                    "lang": lang,
                    "query_id": int(query_id),
                    "query_type": query_type,
                    "eng_query": eng_query.strip(),
                    "native_query": native_query.strip() if isinstance(native_query, str) else str(native_query),
                    "eng_passage": eng_passage.strip(),
                    "native_passage": native_passage.strip(),
                    "native_answer": native_answer.strip() if isinstance(native_answer, str) else str(native_answer),
                    "eng_answer": eng_answer.strip(),
                    "passage_index": passage_idx,
                }

def extract_documents_from_corpus_json(corpus_data: dict, target_langs: list) -> tuple:
    """
    Extracts index-ready documents from structured data/corpus.json format.
    Handles gold passage identification and all 4 native language mappings.
    """
    documents = []
    stats = {
        "total_records_scanned": 0,
        "skipped_no_answer": 0,
        "skipped_no_selected": 0,
        "documents_created": 0,
        "per_lang": defaultdict(lambda: defaultdict(int)),
    }

    entries = corpus_data.get("entries", [])
    for entry in entries:
        stats["total_records_scanned"] += 1
        query_id = entry.get("id", 0)
        query_type = entry.get("type", "DESCRIPTION")
        eng_query = entry.get("engQuery", "").strip()
        eng_answer = entry.get("engAnswer", "").strip()
        passages = entry.get("passages", [])

        # Find gold passage(s) (is_selected == true)
        gold_passages = [p for p in passages if p.get("gold")]
        if not gold_passages:
            gold_passages = [passages[0]] if passages else []

        if not gold_passages:
            stats["skipped_no_selected"] += 1
            continue

        native_dict = entry.get("native", {})

        for p_idx, p in enumerate(gold_passages):
            eng_passage = p.get("text", "").strip()
            doc_id_raw = p.get("docId", f"{query_id}_{p_idx}")

            for lang in target_langs:
                lang_data = native_dict.get(lang, {})
                native_query = lang_data.get("query", eng_query).strip()
                native_answer = lang_data.get("answer", eng_answer).strip()

                doc_id = f"{lang}_{doc_id_raw}"
                doc = {
                    "doc_id": doc_id,
                    "lang": lang,
                    "query_id": int(query_id),
                    "query_type": query_type,
                    "eng_query": eng_query,
                    "native_query": native_query,
                    "eng_passage": eng_passage,
                    "native_passage": eng_passage,
                    "native_answer": native_answer,
                    "eng_answer": eng_answer,
                    "passage_index": p.get("idx", p_idx),
                }
                documents.append(doc)
                stats["documents_created"] += 1
                stats["per_lang"][lang][query_type] += 1

    return documents, stats


def print_ingestion_report(stats: dict, documents: list, elapsed: float):
    """
    Print a formatted ingestion report showing per-language and
    per-query-type document counts.
    """
    print("\n" + "=" * 62, flush=True)
    print("  INGESTION REPORT", flush=True)
    print("=" * 62, flush=True)

    print(f"\n  Records scanned:    {stats['total_records_scanned']}")
    print(f"  Skipped (no answer): {stats['skipped_no_answer']}")
    print(f"  Skipped (no selected): {stats['skipped_no_selected']}")
    print(f"  Documents created:  {stats['documents_created']}")
    print(f"  Processing time:    {elapsed:.1f}s")

    # Per-language breakdown
    print(f"\n  {'Lang':<6} {'Total':<8}", end="")
    
    # Collect all query types across all languages
    all_types = sorted(set(
        qt for lang_data in stats["per_lang"].values()
        for qt in lang_data.keys()
    ))
    for qt in all_types:
        print(f" {qt:<13}", end="")
    print()
    print("  " + "-" * (6 + 8 + 13 * len(all_types)))

    for lang in sorted(stats["per_lang"].keys()):
        lang_data = stats["per_lang"][lang]
        total = sum(lang_data.values())
        print(f"  {lang:<6} {total:<8}", end="")
        for qt in all_types:
            count = lang_data.get(qt, 0)
            print(f" {count:<13}", end="")
        print()

    # Grand total
    grand_total = stats["documents_created"]
    print("  " + "-" * (6 + 8 + 13 * len(all_types)))
    print(f"  {'TOTAL':<6} {grand_total:<8}", end="")
    for qt in all_types:
        qt_total = sum(stats["per_lang"][lang].get(qt, 0) for lang in stats["per_lang"])
        print(f" {qt_total:<13}", end="")
    print()

    print("\n" + "=" * 62, flush=True)


def run_ingestion(
    preview_file: str = None,
    output_file: str = None,
    target_langs: list = None,
):
    """
    Main ingestion pipeline entry point.
    
    1. Loads the stratified preview JSON
    2. Extracts index-ready documents
    3. Saves to data/ingestion_ready.json
    4. Prints detailed report
    """
    preview_file = preview_file or PREVIEW_FILE
    output_file = output_file or INGESTION_FILE
    target_langs = target_langs or SUPPORTED_LANGS

    print("=" * 62, flush=True)
    print("  ZATPAT.AI — Document Ingestion Pipeline", flush=True)
    print("=" * 62, flush=True)
    print(f"  Input:    {os.path.basename(preview_file)}")
    print(f"  Output:   {os.path.basename(output_file)}")
    print(f"  Languages: {', '.join(target_langs)}")

    # -----------------------------------------------------------------------
    # Step 1: Load input data
    # -----------------------------------------------------------------------
    # Auto-detect data/corpus.json if preview_file doesn't exist
    if not os.path.exists(preview_file):
        alt_corpus = os.path.join(PROJECT_ROOT, "data", "corpus.json")
        if os.path.exists(alt_corpus):
            preview_file = alt_corpus
        else:
            print(f"\n  ✖ Input file not found: {preview_file}")
            sys.exit(1)

    with open(preview_file, "r", encoding="utf-8") as f:
        input_data = json.load(f)

    # -----------------------------------------------------------------------
    # Step 2: Extract documents (Detect schema: corpus.json vs preview.json)
    # -----------------------------------------------------------------------
    start_time = time.time()

    if isinstance(input_data, dict) and "entries" in input_data:
        print(f"  Schema:   data/corpus.json (Unified multi-entry format)")
        documents, stats = extract_documents_from_corpus_json(input_data, target_langs)
    else:
        print(f"  Schema:   msmarco_xi_preview.json (Per-language map format)")
        available_langs = [l for l in target_langs if l in input_data]
        documents, stats = extract_documents_from_preview(input_data, available_langs)

    elapsed = time.time() - start_time

    # -----------------------------------------------------------------------
    # Step 3: Save to output file
    # -----------------------------------------------------------------------
    os.makedirs(os.path.dirname(output_file), exist_ok=True)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(documents, f, ensure_ascii=False, indent=2)

    # -----------------------------------------------------------------------
    # Step 4: Print report
    # -----------------------------------------------------------------------
    print_ingestion_report(stats, documents, elapsed)
    print(f"\n  ✅ Saved {len(documents)} documents to {output_file}")


# ===========================================================================
# CLI Entry Point
# ===========================================================================

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Extract index-ready documents from MSMARCO-XI preview data"
    )
    parser.add_argument(
        "--langs",
        nargs="+",
        default=None,
        help="Language codes to process (default: hi mr sa ta)",
    )
    parser.add_argument(
        "--preview-file",
        default=None,
        help="Path to preview JSON (default: msmarco_xi_preview.json)",
    )
    parser.add_argument(
        "--output",
        default=None,
        help="Output path for ingestion-ready JSON (default: data/ingestion_ready.json)",
    )

    args = parser.parse_args()
    run_ingestion(
        preview_file=args.preview_file,
        output_file=args.output,
        target_langs=args.langs,
    )
