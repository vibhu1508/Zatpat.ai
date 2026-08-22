"""Embedding client. One HTTP call, kept warm, L2-normalised on the way out."""
import numpy as np
import httpx

from backend.config import (
    EMBED_DIM,
    EMBED_KEEP_ALIVE,
    EMBED_MODEL,
    EMBED_PREFIX_PASSAGE,
    EMBED_PREFIX_QUERY,
    OLLAMA_URL,
)


class Embedder:
    def __init__(self) -> None:
        # Deliberately NOT constructed here. httpx binds its connection pool to
        # the event loop that is running when it is created; building it at
        # import time — before uvicorn starts its loop — makes every request
        # pay a fresh connection and turned a 175 ms embedding into 3,000 ms.
        self._client: httpx.AsyncClient | None = None

    def _get(self) -> httpx.AsyncClient:
        if self._client is None:
            self._client = httpx.AsyncClient(
                base_url=OLLAMA_URL,
                timeout=30.0,
                limits=httpx.Limits(max_keepalive_connections=8, keepalive_expiry=300),
            )
        return self._client

    async def close(self) -> None:
        if self._client is not None:
            await self._client.aclose()
            self._client = None

    async def _embed(self, texts: list[str]) -> np.ndarray:
        r = await self._get().post(
            "/api/embed",
            json={"model": EMBED_MODEL, "input": texts, "keep_alive": EMBED_KEEP_ALIVE},
        )
        r.raise_for_status()
        v = np.asarray(r.json()["embeddings"], dtype=np.float32)
        # Normalise so a dot product is a cosine.
        v /= np.linalg.norm(v, axis=1, keepdims=True).clip(min=1e-9)
        return v

    async def query(self, text: str) -> np.ndarray:
        return (await self._embed([EMBED_PREFIX_QUERY + text]))[0]

    async def passages(self, texts: list[str]) -> np.ndarray:
        return await self._embed([EMBED_PREFIX_PASSAGE + t for t in texts])

    async def warm(self) -> None:
        """
        Force the model resident and pin it there.

        Without the keep_alive above, this warms the model only until Ollama's
        idle timer expires — which it always will, because a voice assistant
        spends most of its time waiting for someone to speak.
        """
        await self.query("warm")

    @property
    def dim(self) -> int:
        return EMBED_DIM
