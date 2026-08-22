# =============================================================================
# Zatpat.ai Backend Package
# =============================================================================
# Voice-enabled multilingual RAG pipeline for Hackerhouse Goa 2026 Task 2.
#
# Modules:
#   config.py      - Central configuration (env vars, constants, language maps)
#   ingest.py      - Dataset → Redis indexing pipeline
#   chunking.py    - Multi-strategy chunking engine (4 strategies + router)
#   retrieval.py   - Redis HNSW vector search with language filtering
#   guardrails.py  - Input/output safety, confidence, groundedness checks
#   harness.py     - Pipeline orchestrator with retries & telemetry
#   generation.py  - Ollama llama3.2:1b streaming generation
#   stt.py         - Sarvam AI WebSocket STT client
#   server.py      - FastAPI WebSocket server
# =============================================================================
