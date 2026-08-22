"""
Two-tier session cache on Redis.

Tier 1 is an exact-string lookup: no embedding needed, so it is the only path
that is genuinely instant. Tier 2 is a vector search over the query vectors of
everything already answered in this session, which does need the embedding.

Redis 8 ships Vector Sets natively (VADD/VSIM), so the query vectors live in
Redis rather than in a sidecar index — which is what makes this survive a
restart and work across more than one process.
"""
from __future__ import annotations

import json
import re
import unicodedata

import numpy as np
import redis.asyncio as redis

from backend.config import (
    CACHE_TTL_SECONDS,
    REDIS_URL,
    SEMANTIC_CACHE_THRESHOLD,
    TURN_HISTORY,
)

_PUNCT = re.compile(r"[^\w\s]", re.UNICODE)
_WS = re.compile(r"\s+")


def normalise(q: str) -> str:
    """Exact-tier key. Case, punctuation and spacing must not cause a miss."""
    q = unicodedata.normalize("NFKC", q).casefold()
    return _WS.sub(" ", _PUNCT.sub(" ", q)).strip()


class SessionCache:
    def __init__(self) -> None:
        self.r: redis.Redis | None = None

    async def connect(self) -> None:
        self.r = redis.from_url(REDIS_URL, decode_responses=False)
        await self.r.ping()

    async def close(self) -> None:
        if self.r:
            await self.r.aclose()

    @staticmethod
    def _kv(session: str, key: str) -> str:
        return f"zat:{session}:q:{key}"

    @staticmethod
    def _vset(session: str) -> str:
        return f"zat:{session}:vec"

    @staticmethod
    def _turns(session: str) -> str:
        return f"zat:{session}:turns"

    async def get_exact(self, session: str, query: str) -> dict | None:
        raw = await self.r.get(self._kv(session, normalise(query)))
        return json.loads(raw) if raw else None

    async def get_similar(self, session: str, qv: np.ndarray) -> tuple[dict, float] | None:
        """Nearest previously-answered query in this session, if close enough."""
        # A first turn has no vector set yet. Serialising 1024 floats only for
        # Redis to raise is pure waste on exactly the path that is already the
        # slowest — check first.
        if not await self.r.exists(self._vset(session)):
            return None
        try:
            res = await self.r.execute_command(
                "VSIM", self._vset(session), "VALUES", len(qv),
                *[repr(float(x)) for x in qv], "WITHSCORES", "COUNT", 1,
            )
        except redis.ResponseError:
            return None  # no vector set for this session yet
        if not res:
            return None

        # Redis 8 returns WITHSCORES as a map {member: score}; older array
        # replies come back flat. Handle both rather than assume.
        if isinstance(res, dict):
            member, score = next(iter(res.items()))
        else:
            if len(res) < 2:
                return None
            member, score = res[0], res[1]

        key = member.decode() if isinstance(member, bytes) else member

        # Redis VSIM reports (1 + cosine) / 2, not cosine — verified against
        # known pairs: cosine 1.0 -> 1.0, 0.75 -> 0.874, 0.0 -> 0.5, -1.0 -> 0.0.
        # Comparing a cosine threshold against that raw score silently halves
        # it: 0.85 becomes cosine 0.70, which is loose enough to answer a new
        # question with a previous answer about the same topic.
        cosine = 2.0 * float(score) - 1.0
        if cosine < SEMANTIC_CACHE_THRESHOLD:
            return None
        score = cosine
        raw = await self.r.get(self._kv(session, key))
        return (json.loads(raw), score) if raw else None

    async def put(self, session: str, query: str, qv: np.ndarray, payload: dict) -> None:
        key = normalise(query)
        pipe = self.r.pipeline()
        pipe.set(self._kv(session, key), json.dumps(payload), ex=CACHE_TTL_SECONDS)
        pipe.execute_command(
            "VADD", self._vset(session), "VALUES", len(qv),
            *[repr(float(x)) for x in qv], key,
        )
        pipe.expire(self._vset(session), CACHE_TTL_SECONDS)
        await pipe.execute()

    async def push_turn(self, session: str, turn: dict) -> None:
        """Append a resolved turn. Trimmed, so a long chat cannot grow unbounded."""
        key = self._turns(session)
        pipe = self.r.pipeline()
        pipe.rpush(key, json.dumps(turn))
        pipe.ltrim(key, -TURN_HISTORY, -1)
        pipe.expire(key, CACHE_TTL_SECONDS)
        await pipe.execute()

    async def get_turns(self, session: str) -> list[dict]:
        """Recent turns, oldest first. One Redis round trip, no embedding."""
        raw = await self.r.lrange(self._turns(session), 0, -1)
        return [json.loads(x) for x in raw]

    async def put_exact(self, session: str, query: str, payload: dict) -> None:
        """Exact tier only — for answers reached without ever embedding."""
        await self.r.set(
            self._kv(session, normalise(query)), json.dumps(payload), ex=CACHE_TTL_SECONDS
        )

    async def clear(self, session: str) -> int:
        keys = [k async for k in self.r.scan_iter(match=f"zat:{session}:*")]
        return await self.r.delete(*keys) if keys else 0
