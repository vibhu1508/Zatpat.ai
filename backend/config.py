# =============================================================================
# backend/config.py — Central Configuration for Zatpat.ai RAG Pipeline
# =============================================================================
# All environment variables, constants, language mappings, and model configs
# live here. Every other module imports from this single source of truth.
# =============================================================================

import os
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Load .env from project root (one level up from backend/)
# ---------------------------------------------------------------------------
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env"))


# ===========================================================================
# API Keys & Credentials
# ===========================================================================

# Hugging Face token for dataset downloads (optional if already cached)
HF_TOKEN = os.getenv("HF_TOKEN")
if HF_TOKEN == "your_huggingface_token_here" or not HF_TOKEN:
    HF_TOKEN = None

# Sarvam AI API key for Speech-to-Text (required for voice pipeline)
SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")


# ===========================================================================
# Supported Languages
# ===========================================================================
# Language codes follow ISO 639-1. These are the 4 target languages for the
# Hackerhouse demo, plus English as the intermediate query language.

SUPPORTED_LANGS = ["hi", "mr", "sa", "ta"]

LANG_NAMES = {
    "hi": "Hindi",
    "mr": "Marathi",
    "sa": "Sanskrit",
    "ta": "Tamil",
    "en": "English",
}

# Mapping from language code → MSMARCO-XI parquet filename
LANG_PARQUET_MAP = {
    "hi": "validation/hinval.parquet",
    "mr": "validation/marval.parquet",
    "sa": "validation/sanval.parquet",
    "ta": "validation/tamval.parquet",
}


# ===========================================================================
# Redis Configuration
# ===========================================================================
# Native Redis Stack (installed via Homebrew) provides:
#   - RediSearch: Full-text + vector search (HNSW) via FT.* commands
#   - RedisJSON:  Native JSON document storage
#
# HNSW parameters tuned for low-latency (<5ms) retrieval on ~200 documents.

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_INDEX_NAME = "idx:msmarco_passages"       # FT index name
REDIS_DOC_PREFIX = "doc:msmarco:"                # Hash key prefix

# HNSW tuning parameters
REDIS_HNSW_M = 16                # Max outgoing edges per node (default: 16)
REDIS_HNSW_EF_CONSTRUCTION = 200 # Build-time search width (higher = better recall)
REDIS_HNSW_EF_RUNTIME = 50       # Query-time search width (higher = better recall)

# Session memory (conversation context caching)
REDIS_SESSION_PREFIX = "session:"
REDIS_SESSION_MAX_TURNS = 5      # Keep last 5 conversation turns
REDIS_SESSION_TTL = 1800         # 30-minute TTL per session


# ===========================================================================
# Embedding Model Configuration
# ===========================================================================
# Using all-MiniLM-L6-v2 for fast English-space embeddings (~5ms per query).
# We embed English passages for indexing and English queries for search,
# since Sarvam STT always translates user speech to English first.

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIM = 384              # Output dimensionality (fixed for this model)


# ===========================================================================
# LLM Configuration (Ollama)
# ===========================================================================
# Local Ollama server running llama3.2:1b on Apple Silicon.
# Expected TTFT: ~30ms, total generation for 2 sentences: ~400ms.

OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = "llama3.2:1b"
OLLAMA_TIMEOUT = 10              # Seconds before LLM call times out


# ===========================================================================
# Sarvam STT Configuration
# ===========================================================================
# WebSocket endpoint for real-time speech-to-text with translation.
# Mode: Translate (auto-detect language → English text + detected_lang code)
# Sample rate: 16kHz mono, 16-bit PCM

SARVAM_WS_URL = "wss://api.sarvam.ai/speech-to-text-translate"
SARVAM_MODEL = "saaras:v3-realtime"
SARVAM_SAMPLE_RATE = 16000


# ===========================================================================
# Guardrail Thresholds
# ===========================================================================
# These control when the pipeline abstains vs. answers.

CONFIDENCE_THRESHOLD = 0.45      # Min cosine similarity to proceed with answer
GROUNDEDNESS_THRESHOLD = 0.30    # Min token overlap ratio (LLM output vs context)
MAX_QUERY_WORDS = 200            # Reject queries longer than this
MIN_QUERY_WORDS = 1              # Reject queries shorter than this


# ===========================================================================
# Pipeline Defaults
# ===========================================================================

TOP_K_RESULTS = 5                # Number of passages to retrieve per query
CHUNK_STRATEGY_THRESHOLDS = {
    "parent_child_min_tokens": 250,   # Strategy B: passages > 250 tokens
    "sliding_window_min_tokens": 400, # Strategy C: passages > 400 tokens
    "micro_chunk_max_tokens": 100,    # Strategy D: short factoid passages
    "window_size": 128,               # Strategy C: sliding window size
    "window_overlap": 0.20,           # Strategy C: 20% overlap
}


# ===========================================================================
# Data Paths
# ===========================================================================

# Project root (two levels up from this file: backend/config.py → zatpat.ai/)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
INGESTION_FILE = os.path.join(DATA_DIR, "ingestion_ready.json")
CHUNKS_FILE = os.path.join(DATA_DIR, "chunks_ready.json")
BENCHMARK_FILE = os.path.join(DATA_DIR, "benchmark_results.json")
PREVIEW_FILE = os.path.join(PROJECT_ROOT, "msmarco_xi_preview.json")
