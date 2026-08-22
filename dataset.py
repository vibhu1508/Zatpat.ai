import os
import json
import time
import requests
import pyarrow.parquet as pq
from dotenv import load_dotenv
from huggingface_hub import hf_hub_download, hf_hub_url

# Load environment variables from .env
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")
if HF_TOKEN == "your_huggingface_token_here" or not HF_TOKEN:
    HF_TOKEN = None

# Correct mapping of all 14 language codes in ai4bharat/MSMARCO-XI
LANG_URL_MAP = {
    "hi": "validation/hinval.parquet",
    "bn": "validation/benval.parquet",
    "gu": "validation/gujval.parquet",
    "kn": "validation/kanval.parquet",
    "ml": "validation/malval.parquet",
    "mr": "validation/marval.parquet",
    "ne": "validation/nepval.parquet",
    "or": "validation/orival.parquet",
    "pa": "validation/panval.parquet",
    "sa": "validation/sanval.parquet",
    "ta": "validation/tamval.parquet",
    "te": "validation/telval.parquet",
    "ur": "validation/urdval.parquet",
    "as": "validation/asmval.parquet",
}

def get_parquet_path(rel_path, token=None):
    """
    Downloads or retrieves the Parquet file from local Hugging Face cache.
    Shows real-time download progress and network throughput.
    """
    try:
        # Check if already cached locally (instant)
        local_path = hf_hub_download(
            repo_id="ai4bharat/MSMARCO-XI",
            filename=rel_path,
            repo_type="dataset",
            local_files_only=True
        )
        print(f"       ⚡ Using cached local file: {os.path.basename(local_path)} (0s)", flush=True)
        return local_path
    except Exception:
        pass

    # File not in cache: Stream download with live progress
    url = hf_hub_url(repo_id="ai4bharat/MSMARCO-XI", filename=rel_path, repo_type="dataset")
    headers = {"User-Agent": "Mozilla/5.0"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    cache_dir = os.path.expanduser("~/.cache/huggingface/hub/datasets--ai4bharat--MSMARCO-XI/snapshots/main")
    os.makedirs(cache_dir, exist_ok=True)
    local_path = os.path.join(cache_dir, os.path.basename(rel_path))

    response = requests.get(url, headers=headers, stream=True, allow_redirects=True, timeout=(10, 60))
    response.raise_for_status()

    total_size = int(response.headers.get("content-length", 0))
    block_size = 2 * 1024 * 1024  # 2 MB buffer for fast throughput
    downloaded = 0
    start_time = time.time()
    last_print = 0

    print(f"       ⬇ Downloading {total_size / (1024*1024):.1f} MB from Hugging Face CDN...", flush=True)
    with open(local_path, "wb") as f:
        for chunk in response.iter_content(chunk_size=block_size):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                now = time.time()
                if now - last_print >= 0.5 or downloaded == total_size:
                    elapsed = now - start_time
                    speed = (downloaded / (1024 * 1024)) / elapsed if elapsed > 0 else 0
                    mb_down = downloaded / (1024 * 1024)
                    mb_total = total_size / (1024 * 1024)
                    pct = (downloaded / total_size * 100) if total_size else 0
                    print(
                        f"\r       [Progress] {mb_down:6.1f} MB / {mb_total:6.1f} MB ({pct:5.1f}%) @ {speed:5.1f} MB/s",
                        end="",
                        flush=True
                    )
                    last_print = now

    print("", flush=True)
    return local_path

def extract_stratified_subset(parquet_file, target_per_type=12, max_scan_batches=50):
    """
    Extracts a balanced, diverse subset containing records from EVERY query_type
    (DESCRIPTION, NUMERIC, ENTITY, LOCATION, PERSON, etc.) with valid answers.
    """
    pf = pq.ParquetFile(parquet_file)
    type_buckets = {}
    collected = []
    
    for batch in pf.iter_batches(batch_size=200):
        df = batch.to_pandas()
        for _, row in df.iterrows():
            r = row.to_dict()
            q_type = r.get("query_type", "UNKNOWN")
            ans = r.get("Eng_Answer", "")
            
            # Skip unanswerable queries for demo knowledge base
            if ans in ("No Answer Present.", "No Answer Present", ""):
                continue
            
            # Verify at least one passage is selected (is_selected == 1)
            passages = r.get("passages", {})
            if isinstance(passages, dict):
                is_sel = passages.get("is_selected", [])
                if hasattr(is_sel, "tolist"):
                    is_sel = is_sel.tolist()
                if not any(x == 1 for x in is_sel):
                    continue

            # Add to bucket if we haven't reached quota for this query_type
            type_buckets.setdefault(q_type, 0)
            if type_buckets[q_type] < target_per_type:
                # Clean list/numpy types for JSON
                for k in passages:
                    if hasattr(passages[k], "tolist"):
                        passages[k] = passages[k].tolist()
                
                type_buckets[q_type] += 1
                collected.append(r)
                
        # If we have collected enough across multiple types, break early
        if sum(type_buckets.values()) >= target_per_type * 5:
            break
            
    return collected, type_buckets

def inspect_dataset_subsets(
    target_langs=None,
    output_file="msmarco_xi_preview.json",
    target_per_type=12
):
    """
    Extracts stratified subsets across all query types for specified languages.
    target_langs: List of language codes (e.g. ['hi', 'mr', 'sa', 'ta']).
    """
    if target_langs is None:
        target_langs = list(LANG_URL_MAP.keys())

    dataset_preview = {}
    
    # Load existing preview file if present so we preserve cached work
    if os.path.exists(output_file):
        try:
            with open(output_file, "r", encoding="utf-8") as f:
                dataset_preview = json.load(f)
        except Exception:
            dataset_preview = {}

    total_start = time.time()
    token_status = "Authenticated" if HF_TOKEN else "Anonymous"

    print("============================================================", flush=True)
    print(f" MSMARCO-XI Stratified Multi-QueryType Sampler")
    print(f" Target: ~{target_per_type} rows/query_type | Mode: {token_status} | Output: {output_file}")
    print("============================================================\n", flush=True)

    for idx, lang in enumerate(target_langs, 1):
        if lang not in LANG_URL_MAP:
            print(f"Skipping unknown language code: '{lang}'", flush=True)
            continue

        rel_path = LANG_URL_MAP[lang]
        pct = (idx / len(target_langs)) * 100
        print(f"[{idx}/{len(target_langs)}] ({pct:5.1f}%) Processing '{lang}' ({rel_path})...", flush=True)

        try:
            lang_start = time.time()
            local_file = get_parquet_path(rel_path, token=HF_TOKEN)

            # Perform stratified extraction across all query types
            records, type_counts = extract_stratified_subset(local_file, target_per_type=target_per_type)
            dataset_preview[lang] = records
            elapsed = time.time() - lang_start
            
            print(f"       ✔ Loaded {len(records)} rows for '{lang}' in {elapsed:.1f}s")
            print(f"         Query Type Breakdown: {dict(type_counts)}\n", flush=True)

            # Save progress
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(dataset_preview, f, ensure_ascii=False, indent=2)

        except Exception as e:
            print(f"       ✖ [Error] Failed for '{lang}': {e}\n", flush=True)

    total_elapsed = time.time() - total_start
    print("============================================================", flush=True)
    print(f" Completed {len(dataset_preview)} languages in {total_elapsed / 60:.2f} minutes.", flush=True)
    print(f" Stratified preview ready in '{output_file}'.", flush=True)
    print("============================================================", flush=True)

if __name__ == "__main__":
    # Extracts balanced query types for the 4 core demo languages:
    inspect_dataset_subsets(target_langs=["hi", "mr", "sa", "ta"], target_per_type=12)




