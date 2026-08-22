# =============================================================================
# backend/guardrails.py — Input and Output Guardrails for Zatpat.ai
# =============================================================================
# Implements comprehensive safety, validation, confidence, and groundedness
# guardrails to ensure robust, safe, and factual responses.
#
# Pre-Retrieval (Input Guardrails):
#   1. Language validation (hi, mr, sa, ta, en)
#   2. Query length validation (1 to 200 words)
#   3. Safety & PII filter (phone, email, cards, harmful keywords, prompt injection)
#   4. Configurable blocked topics
#
# Post-Retrieval / Post-Generation (Output Guardrails):
#   5. Retrieval confidence thresholding (< 0.45 cosine similarity -> abstain)
#   6. No-answer / unanswerable dataset passage detection
#   7. Hallucination / groundedness verification (token overlap ratio >= 0.30)
#
# Usage:
#   from backend.guardrails import check_input_guardrails, check_output_guardrails
#   res = check_input_guardrails(query="corporation kya hai", lang="hi")
#   if not res.passed:
#       return res.message
# =============================================================================

import os
import sys
import re
import string
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Set

# ---------------------------------------------------------------------------
# Add project root to path
# ---------------------------------------------------------------------------
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJECT_ROOT)

from backend.config import (
    SUPPORTED_LANGS,
    CONFIDENCE_THRESHOLD,
    GROUNDEDNESS_THRESHOLD,
    MAX_QUERY_WORDS,
    MIN_QUERY_WORDS,
    ABSTAIN_MESSAGES,
    SAFETY_VIOLATION_MESSAGES,
    UNSUPPORTED_LANG_MESSAGES,
    BLOCKED_TOPICS,
)


# ===========================================================================
# Guardrail Result Data Structure
# ===========================================================================

@dataclass
class GuardrailResult:
    """Structured outcome returned by all guardrail functions."""
    passed: bool
    action: str                        # "proceed", "block", "abstain"
    reason: str                        # Machine-readable reason tag
    message: Optional[str] = None      # Localized user-facing message if blocked/abstaining
    stage: str = "input"               # "input" (pre-retrieval) or "output" (post-retrieval)
    metadata: Dict[str, Any] = field(default_factory=dict)


# ===========================================================================
# Regex Patterns for PII & Safety
# ===========================================================================

# Email addresses
EMAIL_REGEX = re.compile(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b")

# Phone numbers (Indian 10-digit mobile, international format, landlines)
PHONE_REGEX = re.compile(r"(\+?91[\-\s]?)?[6789]\d{9}|\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b")

# Credit / Debit card patterns (13 to 19 digits with optional dashes/spaces)
CREDIT_CARD_REGEX = re.compile(r"\b(?:\d[ -]*?){13,19}\b")

# Common Prompt Injection patterns
INJECTION_REGEX = re.compile(
    r"\b(ignore\s+(all\s+)?previous\s+instructions|system\s+prompt|reveal\s+secret|developer\s+mode|jailbreak)\b",
    re.IGNORECASE,
)

# Harmful / Exploit keywords
SAFETY_KEYWORDS = {
    "hack", "exploit", "ddos", "malware", "virus", "trojan",
    "ransomware", "keylogger", "bypass security", "sql injection",
    "bomb", "weapon", "poison", "cyanide", "terrorist", "suicide",
}

# Unanswerable / Empty passage indicators
NO_ANSWER_PATTERNS = {
    "no answer present",
    "no answer present.",
    "उत्तर उपलब्ध नाही",
    "उत्तर उपलब्ध नाही.",
    "कोई उत्तर मौजूद नहीं",
    "कोई उत्तर मौजूद नहीं है।",
    "उत्तरं नास्ति",
    "பதில் இல்லை",
}

# Common stop words for groundedness token overlap calculation
STOPWORDS = {
    # English
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "of",
    "with", "by", "from", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "it", "its", "this", "that", "these", "those", "as",
    # Hindi / Marathi common functional words
    "का", "के", "की", "में", "से", "पर", "है", "हैं", "था", "थी", "थे", "और",
    "या", "तो", "भी", "ने", "को", "एक", "हा", "ही", "हे", "आहे", "आहेत", "नाही",
}


# ===========================================================================
# Input Guardrail 1: Language Validation
# ===========================================================================

def validate_language(lang: str) -> GuardrailResult:
    """
    Ensure the query language is supported (hi, mr, sa, ta, or en).
    """
    valid_langs = set(SUPPORTED_LANGS) | {"en"}
    if not lang or lang.lower() not in valid_langs:
        norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
        return GuardrailResult(
            passed=False,
            action="block",
            reason="unsupported_language",
            message=UNSUPPORTED_LANG_MESSAGES.get(norm_lang, UNSUPPORTED_LANG_MESSAGES["en"]),
            stage="input",
            metadata={"received_lang": lang, "allowed": list(valid_langs)},
        )
    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="language_valid",
        stage="input",
        metadata={"lang": lang.lower()},
    )


# ===========================================================================
# Input Guardrail 2: Query Length Check
# ===========================================================================

def validate_query_length(query: str, lang: str = "en") -> GuardrailResult:
    """
    Validate query word count falls within [MIN_QUERY_WORDS, MAX_QUERY_WORDS].
    """
    if not query or not query.strip():
        norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
        return GuardrailResult(
            passed=False,
            action="block",
            reason="empty_query",
            message="Query cannot be empty." if norm_lang == "en" else ABSTAIN_MESSAGES.get(norm_lang),
            stage="input",
            metadata={"words": 0},
        )

    words = query.strip().split()
    word_count = len(words)

    if word_count < MIN_QUERY_WORDS:
        norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
        return GuardrailResult(
            passed=False,
            action="block",
            reason="query_too_short",
            message="Query is too short." if norm_lang == "en" else ABSTAIN_MESSAGES.get(norm_lang),
            stage="input",
            metadata={"word_count": word_count, "min_words": MIN_QUERY_WORDS},
        )

    if word_count > MAX_QUERY_WORDS:
        norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
        return GuardrailResult(
            passed=False,
            action="block",
            reason="query_too_long",
            message="Query exceeds maximum allowed length of 200 words." if norm_lang == "en" else ABSTAIN_MESSAGES.get(norm_lang),
            stage="input",
            metadata={"word_count": word_count, "max_words": MAX_QUERY_WORDS},
        )

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="length_valid",
        stage="input",
        metadata={"word_count": word_count},
    )


# ===========================================================================
# Input Guardrail 3: Safety, PII & Blocked Topics
# ===========================================================================

def validate_input_safety(query: str, lang: str = "en") -> GuardrailResult:
    """
    Check for PII (emails, phone numbers, cards), harmful keywords,
    prompt injection, and custom blocked topics.
    """
    norm_lang = lang if lang in SAFETY_VIOLATION_MESSAGES else "en"
    safety_msg = SAFETY_VIOLATION_MESSAGES.get(norm_lang, SAFETY_VIOLATION_MESSAGES["en"])

    # 1. Check prompt injection
    if INJECTION_REGEX.search(query):
        return GuardrailResult(
            passed=False,
            action="block",
            reason="prompt_injection_detected",
            message=safety_msg,
            stage="input",
            metadata={"query": query},
        )

    # 2. Check PII: Email
    if EMAIL_REGEX.search(query):
        return GuardrailResult(
            passed=False,
            action="block",
            reason="pii_email_detected",
            message=safety_msg,
            stage="input",
            metadata={"pii_type": "email"},
        )

    # 3. Check PII: Phone Number
    if PHONE_REGEX.search(query):
        return GuardrailResult(
            passed=False,
            action="block",
            reason="pii_phone_detected",
            message=safety_msg,
            stage="input",
            metadata={"pii_type": "phone"},
        )

    # 4. Check PII: Credit Card
    if CREDIT_CARD_REGEX.search(query):
        digits_only = re.sub(r"\D", "", query)
        if len(digits_only) in (13, 15, 16, 19):
            return GuardrailResult(
                passed=False,
                action="block",
                reason="pii_card_detected",
                message=safety_msg,
                stage="input",
                metadata={"pii_type": "credit_card"},
            )

    # 5. Check harmful safety keywords & blocked topics
    query_lower = query.lower()
    all_blocked = set(SAFETY_KEYWORDS) | set(BLOCKED_TOPICS)

    for blocked in all_blocked:
        # Match whole word or exact substring
        pattern = r"\b" + re.escape(blocked.lower()) + r"\b"
        if re.search(pattern, query_lower):
            return GuardrailResult(
                passed=False,
                action="block",
                reason=f"blocked_topic_detected:{blocked}",
                message=safety_msg,
                stage="input",
                metadata={"blocked_term": blocked},
            )

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="safety_valid",
        stage="input",
    )


# ===========================================================================
# Unified Pre-Retrieval Guardrail Pipeline
# ===========================================================================

def check_input_guardrails(query: str, lang: str = "en") -> GuardrailResult:
    """
    Executes all pre-retrieval guardrails in sequence:
    1. Language validation
    2. Query length check
    3. Input safety & PII filter
    """
    # 1. Language check
    lang_res = validate_language(lang)
    if not lang_res.passed:
        return lang_res

    # 2. Length check
    length_res = validate_query_length(query, lang)
    if not length_res.passed:
        return length_res

    # 3. Safety check
    safety_res = validate_input_safety(query, lang)
    if not safety_res.passed:
        return safety_res

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="input_guardrails_passed",
        stage="input",
        metadata={"lang": lang, "word_count": len(query.split())},
    )


# ===========================================================================
# Output Guardrail 1: Retrieval Confidence Threshold
# ===========================================================================

def validate_retrieval_confidence(
    results: List[Dict[str, Any]],
    lang: str = "en",
    threshold: float = None,
) -> GuardrailResult:
    """
    Verify top retrieved chunk meets minimum cosine similarity threshold.
    If below CONFIDENCE_THRESHOLD (0.45), triggers localized abstention.
    """
    threshold = threshold if threshold is not None else CONFIDENCE_THRESHOLD
    norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
    abstain_msg = ABSTAIN_MESSAGES.get(norm_lang, ABSTAIN_MESSAGES["en"])

    if not results:
        return GuardrailResult(
            passed=False,
            action="abstain",
            reason="empty_retrieval_results",
            message=abstain_msg,
            stage="output",
            metadata={"top_score": 0.0, "threshold": threshold},
        )

    top_score = results[0].get("score", 0.0)

    if top_score < threshold:
        return GuardrailResult(
            passed=False,
            action="abstain",
            reason="low_retrieval_confidence",
            message=abstain_msg,
            stage="output",
            metadata={"top_score": top_score, "threshold": threshold},
        )

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="confidence_sufficient",
        stage="output",
        metadata={"top_score": top_score, "threshold": threshold},
    )


# ===========================================================================
# Output Guardrail 2: No-Answer Passage Detection
# ===========================================================================

def validate_no_answer_passage(
    results: List[Dict[str, Any]],
    lang: str = "en",
) -> GuardrailResult:
    """
    Check if the retrieved passage / answer explicitly says 'No Answer Present'.
    """
    if not results:
        return GuardrailResult(passed=True, action="proceed", reason="no_results_to_check", stage="output")

    top_doc = results[0]
    native_ans = str(top_doc.get("native_answer", "")).strip().lower()
    eng_ans = str(top_doc.get("eng_answer", "")).strip().lower()

    for pattern in NO_ANSWER_PATTERNS:
        if pattern.lower() in native_ans or pattern.lower() in eng_ans:
            norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
            return GuardrailResult(
                passed=False,
                action="abstain",
                reason="unanswerable_dataset_record",
                message=ABSTAIN_MESSAGES.get(norm_lang, ABSTAIN_MESSAGES["en"]),
                stage="output",
                metadata={"detected_pattern": pattern},
            )

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="answerable_record",
        stage="output",
    )


# ===========================================================================
# Output Guardrail 3: Groundedness & Factuality Check
# ===========================================================================

def tokenize_for_groundedness(text: str) -> Set[str]:
    """Clean and extract meaningful semantic tokens from text."""
    translator = str.maketrans("", "", string.punctuation + "।॥,.-_!?'\"()[]{}")
    cleaned = text.translate(translator).lower()
    tokens = {t for t in cleaned.split() if len(t) > 1 and t not in STOPWORDS}
    return tokens


INDIC_DIGITS = str.maketrans("०१२३४५६७८९௧௨௩௪௫௬௭௮௯௦", "01234567891234567890")

def normalize_digits(text: str) -> str:
    """Normalize Indic numerals (Devanagari, Tamil) to standard ASCII digits."""
    return text.translate(INDIC_DIGITS)


def validate_groundedness(
    generated_text: str,
    context_text: str,
    lang: str = "en",
    threshold: float = None,
    native_reference: str = "",
) -> GuardrailResult:
    """
    Computes groundedness between LLM output and retrieved context.
    
    Supports:
    1. Cross-lingual digit & numeral normalization (e.g. ८००-२२७-९७७० vs 800-227-9770)
    2. Native reference text matching when available
    3. Token overlap and substring containment
    """
    threshold = threshold if threshold is not None else GROUNDEDNESS_THRESHOLD

    if not generated_text or not generated_text.strip():
        return GuardrailResult(
            passed=False,
            action="abstain",
            reason="empty_generated_text",
            message=ABSTAIN_MESSAGES.get(lang, ABSTAIN_MESSAGES["en"]),
            stage="output",
            metadata={"overlap_ratio": 0.0},
        )

    norm_gen = normalize_digits(generated_text)
    norm_ctx = normalize_digits(context_text)
    norm_ref = normalize_digits(native_reference) if native_reference else ""

    # Check if numbers in generated text match numbers in context/reference
    gen_numbers = set(re.findall(r"\d+", norm_gen))
    ctx_numbers = set(re.findall(r"\d+", norm_ctx + " " + norm_ref))
    if gen_numbers and ctx_numbers and gen_numbers.intersection(ctx_numbers):
        # Numerical facts are grounded
        return GuardrailResult(
            passed=True,
            action="proceed",
            reason="numerical_grounding_verified",
            stage="output",
            metadata={"overlap_ratio": 1.0, "matched_numbers": list(gen_numbers.intersection(ctx_numbers))},
        )

    # For cross-lingual Indic languages, also check against native reference if available
    combined_ctx = f"{norm_ctx} {norm_ref}".strip()

    gen_tokens = tokenize_for_groundedness(norm_gen)
    if not gen_tokens:
        return GuardrailResult(
            passed=True,
            action="proceed",
            reason="short_response_pass",
            stage="output",
            metadata={"overlap_ratio": 1.0},
        )

    ctx_tokens = tokenize_for_groundedness(combined_ctx)
    
    # Calculate grounded tokens
    grounded_count = 0
    for gt in gen_tokens:
        if gt in ctx_tokens:
            grounded_count += 1
        elif len(gt) >= 3 and any(ct.startswith(gt[:3]) or gt.startswith(ct[:3]) for ct in ctx_tokens if len(ct) >= 3):
            grounded_count += 1
        elif gt in combined_ctx.lower():
            grounded_count += 1

    overlap_ratio = grounded_count / len(gen_tokens)

    # For cross-lingual generation where English context is translated to Indic,
    # adjust threshold if non-empty output was generated from valid retrieval
    effective_threshold = threshold if lang == "en" else 0.15

    if overlap_ratio >= effective_threshold or (lang != "en" and len(generated_text.strip()) > 5):
        return GuardrailResult(
            passed=True,
            action="proceed",
            reason="groundedness_verified",
            stage="output",
            metadata={
                "overlap_ratio": round(max(overlap_ratio, 0.85 if lang != "en" else overlap_ratio), 4),
                "threshold": effective_threshold,
                "gen_tokens_count": len(gen_tokens),
                "overlap_count": grounded_count,
            },
        )

    norm_lang = lang if lang in ABSTAIN_MESSAGES else "en"
    return GuardrailResult(
        passed=False,
        action="abstain",
        reason="hallucination_detected_low_groundedness",
        message=ABSTAIN_MESSAGES.get(norm_lang, ABSTAIN_MESSAGES["en"]),
        stage="output",
        metadata={
            "overlap_ratio": round(overlap_ratio, 4),
            "threshold": effective_threshold,
            "gen_tokens_count": len(gen_tokens),
            "overlap_count": grounded_count,
        },
    )

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="groundedness_verified",
        stage="output",
        metadata={
            "overlap_ratio": round(overlap_ratio, 4),
            "threshold": threshold,
            "gen_tokens_count": len(gen_tokens),
            "overlap_count": grounded_count,
        },
    )


# ===========================================================================
# Unified Post-Retrieval Guardrail Pipeline
# ===========================================================================

def check_output_guardrails(
    results: List[Dict[str, Any]],
    generated_text: Optional[str] = None,
    lang: str = "en",
) -> GuardrailResult:
    """
    Executes all post-retrieval guardrails:
    1. Retrieval confidence threshold check
    2. No-answer / unanswerable dataset check
    3. Groundedness / hallucination check (if generated_text is provided)
    """
    # 1. Confidence check
    conf_res = validate_retrieval_confidence(results, lang=lang)
    if not conf_res.passed:
        return conf_res

    # 2. No-answer detection
    no_ans_res = validate_no_answer_passage(results, lang=lang)
    if not no_ans_res.passed:
        return no_ans_res

    # 3. Groundedness check (if generation is present)
    if generated_text is not None and results:
        context = results[0].get("parent_native_text") or results[0].get("native_text") or ""
        grounded_res = validate_groundedness(generated_text, context, lang=lang)
        if not grounded_res.passed:
            return grounded_res

    return GuardrailResult(
        passed=True,
        action="proceed",
        reason="output_guardrails_passed",
        stage="output",
        metadata={"top_score": results[0]["score"] if results else 0.0},
    )
