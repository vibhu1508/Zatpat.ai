"""
Questions about the conversation rather than about the corpus.

"What country are we asking about?" cannot be answered by retrieval, at any
speed or accuracy. The answer lives in the previous turn, not in a passage —
extraction returns spans from passages by construction, so it can never produce
it. These are handled from the cached chat instead, which costs one Redis read
and no embedding.
"""
from __future__ import annotations

import re

# Deliberately narrow. A false positive here answers a real question with a
# statement about the conversation, which is worse than missing one.
META = re.compile(
    r"^\s*(?:so\s+|and\s+|but\s+)?"
    r"(?:what|which|who)\b[^?]*?\b"
    r"(?:are|were|is|was)\s+(?:we|you|i|this|that|it)\b[^?]*?\b"
    r"(?:talking|asking|discussing|referring|speaking)\b",
    re.IGNORECASE,
)
META_SHORT = re.compile(
    r"^\s*(?:what(?:'s| is| was)?\s+(?:the\s+)?(?:topic|subject|context)"
    r"|what\s+did\s+i\s+(?:just\s+)?ask"
    r"|what\s+are\s+we\s+on\s+about)\b",
    re.IGNORECASE,
)

# Two different questions wear the same clothes. "Which country are we talking
# about" wants the entity; "what did I just ask" wants the question back.
# Answering the first with a sentence is clumsy; answering the second with a
# bare noun is simply wrong.
RECALL = re.compile(
    r"\b(?:what\s+did\s+i\s+(?:just\s+)?(?:ask|say)"
    r"|what(?:'s| is| was)?\s+(?:the\s+)?(?:topic|subject|context)"
    r"|what\s+are\s+we\s+(?:on about|discussing)"
    r"|repeat\s+(?:my\s+)?(?:question|that))\b",
    re.IGNORECASE,
)


def is_meta(query: str) -> bool:
    return bool(META.search(query) or META_SHORT.search(query))


_WORD = re.compile(r"[A-Za-z][\w'-]*")
# Words that start sentences and are capitalised for that reason alone.
_COMMON_START = {
    "the", "a", "an", "this", "that", "these", "those", "it", "in", "on", "at",
    "for", "from", "by", "with", "is", "are", "was", "were", "there", "they",
    "when", "where", "what", "which", "who", "how", "why", "if", "as", "and",
    "but", "or", "so", "he", "she", "we", "you", "i", "his", "her", "their",
    "its", "some", "most", "many", "all", "one", "two", "top", "no", "not",
}


def entities(question: str, passages: list[str], limit: int = 3) -> list[str]:
    """
    Proper nouns shared between the topic's question and its passages.

    The corpus stores questions lower-cased, so capitalisation in the question
    is no help. The passages keep their casing, so a question word that appears
    capitalised mid-sentence in a passage is almost always the entity being
    asked about — which is how "indonesia" becomes "Indonesia".
    """
    q_words = {w.lower() for w in _WORD.findall(question)}
    counts: dict[str, int] = {}
    for text in passages:
        for m in _WORD.finditer(text):
            w = m.group()
            if not w[0].isupper() or w.lower() in _COMMON_START:
                continue
            # Skip words that only look proper because they start a sentence.
            before = text[: m.start()].rstrip()
            if before and before[-1] in ".!?":
                continue
            if w.lower() in q_words:
                counts[w] = counts.get(w, 0) + 1
    return [w for w, _ in sorted(counts.items(), key=lambda x: -x[1])[:limit]]


def _tidy(question: str, names: list[str] | None = None) -> str:
    """
    Corpus questions are lower-cased fragments; make one speakable.

    Proper nouns are restored from the passages, where casing survives — read
    aloud, "how many languages are spoken in indonesia" and the same sentence
    with a capital I are identical, but on screen the lower-case version looks
    like a bug.
    """
    q = question.strip().rstrip("?.").strip()
    q = re.sub(r"^(about|approximately|roughly)\s+", "", q, flags=re.IGNORECASE)
    for name in names or []:
        q = re.sub(rf"\b{re.escape(name)}\b", name, q, flags=re.IGNORECASE)
    return q[:1].upper() + q[1:] if q else q


def answer_meta(query: str, topic_question: str, passages: list[str]) -> str:
    """
    Answer a conversation question from the topic.

    When the entity is identifiable, that alone is the answer — "what country
    are we asking about" wants "Indonesia", not a sentence about the corpus.
    Only when no entity can be found does it fall back to restating the topic,
    which is at least true.
    """
    found = entities(topic_question, passages)
    subject = _tidy(topic_question, found)
    if RECALL.search(query):
        return f"You asked: {subject}."
    if found:
        return f"{found[0]}."
    return f"We are discussing {subject}."
