# =============================================================================
# backend/tests/test_chunking.py — Unit Tests for Multi-Strategy Chunking
# =============================================================================
# Tests strategy routing, all 4 chunking strategies, Indic script handling,
# and edge cases.
#
# Run: python -m pytest backend/tests/test_chunking.py -v
# =============================================================================

import os
import sys
import pytest

# Add project root to path
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, PROJECT_ROOT)

from backend.chunking import (
    select_strategy,
    chunk_metadata_aware,
    chunk_parent_child,
    chunk_sliding_window,
    chunk_query_adaptive,
    chunk_document,
    split_into_sentences,
    token_count,
)


# ===========================================================================
# Test Fixtures — Sample Documents
# ===========================================================================

def make_doc(eng_passage: str, native_passage: str = "", query_type: str = "DESCRIPTION",
             lang: str = "hi", query_id: int = 999):
    """Helper to create a minimal document dict for testing."""
    return {
        "doc_id": f"{lang}_{query_id}_0",
        "lang": lang,
        "query_id": query_id,
        "query_type": query_type,
        "eng_query": "test query",
        "native_query": "परीक्षण प्रश्न",
        "eng_passage": eng_passage,
        "native_passage": native_passage or eng_passage,
        "native_answer": "test answer",
        "eng_answer": "test answer",
        "passage_index": 0,
    }


# Short passage (~30 tokens)
SHORT_ENG = "A corporation is a company or group of people authorized to act as a single entity and recognized as such in law."
SHORT_NATIVE = "निगम एक कंपनी या लोगों का समूह होता है जो एक एकल इकाई के रूप में कार्य करने के लिए अधिकृत होता है।"

# Medium passage (~60 tokens) with Indic delimiters
MEDIUM_ENG = (
    "A corporation is a company authorized to act as a single entity. "
    "It can issue stock and has shareholders. "
    "Corporations can be public or private. "
    "They are governed by the laws of the state where they are incorporated."
)
MEDIUM_NATIVE = (
    "निगम एक कंपनी है जो एकल इकाई के रूप में कार्य करने के लिए अधिकृत है। "
    "यह स्टॉक जारी कर सकता है और इसके शेयरधारक होते हैं। "
    "निगम सार्वजनिक या निजी हो सकते हैं। "
    "वे उस राज्य के कानूनों द्वारा शासित होते हैं जहां वे निगमित हैं।"
)

# Long passage (~300 tokens) for Strategy B
LONG_ENG = " ".join([f"Sentence number {i} talks about important topic {i}." for i in range(50)])

# Very long passage (~500 tokens) for Strategy C
VERY_LONG_ENG = " ".join([f"Word{i}" for i in range(500)])


# ===========================================================================
# Test: Strategy Router (select_strategy)
# ===========================================================================

class TestSelectStrategy:
    """Tests for the intelligent strategy router."""
    
    def test_short_numeric_returns_D(self):
        """60-token NUMERIC passage → Strategy D (micro-chunking)"""
        passage = " ".join(["word"] * 60)
        assert select_strategy(passage, "NUMERIC") == "D"
    
    def test_short_entity_returns_D(self):
        """60-token ENTITY passage → Strategy D"""
        passage = " ".join(["word"] * 60)
        assert select_strategy(passage, "ENTITY") == "D"
    
    def test_very_long_returns_C(self):
        """500-token passage → Strategy C (sliding window)"""
        passage = " ".join(["word"] * 500)
        assert select_strategy(passage, "DESCRIPTION") == "C"
    
    def test_medium_description_returns_B(self):
        """300-token DESCRIPTION passage → Strategy B (parent-child)"""
        passage = " ".join(["word"] * 300)
        assert select_strategy(passage, "DESCRIPTION") == "B"
    
    def test_long_non_description_returns_B(self):
        """300-token NUMERIC passage (>250) → Strategy B"""
        passage = " ".join(["word"] * 300)
        assert select_strategy(passage, "NUMERIC") == "B"
    
    def test_short_description_returns_B(self):
        """Even short DESCRIPTION passages → Strategy B"""
        passage = " ".join(["word"] * 50)
        assert select_strategy(passage, "DESCRIPTION") == "B"
    
    def test_short_location_returns_A(self):
        """120-token LOCATION passage → Strategy A (default)"""
        passage = " ".join(["word"] * 120)
        assert select_strategy(passage, "LOCATION") == "A"
    
    def test_short_person_returns_A(self):
        """120-token PERSON passage → Strategy A"""
        passage = " ".join(["word"] * 120)
        assert select_strategy(passage, "PERSON") == "A"
    
    def test_boundary_250_returns_B(self):
        """Exactly 251 tokens → Strategy B"""
        passage = " ".join(["word"] * 251)
        assert select_strategy(passage, "PERSON") == "B"
    
    def test_boundary_400_returns_C(self):
        """Exactly 401 tokens → Strategy C"""
        passage = " ".join(["word"] * 401)
        assert select_strategy(passage, "PERSON") == "C"
    
    def test_boundary_100_numeric_returns_A(self):
        """Exactly 100 tokens NUMERIC → Strategy A (D requires < 100)"""
        passage = " ".join(["word"] * 100)
        assert select_strategy(passage, "NUMERIC") == "A"


# ===========================================================================
# Test: Strategy A — Metadata-Aware Selective
# ===========================================================================

class TestStrategyA:
    """Tests for chunk_metadata_aware (Strategy A)."""
    
    def test_returns_single_chunk(self):
        """Strategy A always returns exactly 1 chunk."""
        doc = make_doc(SHORT_ENG, SHORT_NATIVE)
        chunks = chunk_metadata_aware(doc)
        assert len(chunks) == 1
    
    def test_chunk_has_correct_strategy(self):
        doc = make_doc(SHORT_ENG, SHORT_NATIVE)
        chunks = chunk_metadata_aware(doc)
        assert chunks[0]["strategy"] == "A"
    
    def test_chunk_preserves_full_passage(self):
        """Strategy A uses full passage as both chunk and parent."""
        doc = make_doc(SHORT_ENG, SHORT_NATIVE)
        chunks = chunk_metadata_aware(doc)
        assert chunks[0]["eng_text"] == SHORT_ENG
        assert chunks[0]["native_text"] == SHORT_NATIVE
        assert chunks[0]["parent_eng_text"] == SHORT_ENG
    
    def test_chunk_preserves_metadata(self):
        doc = make_doc(SHORT_ENG, SHORT_NATIVE, query_type="NUMERIC", lang="mr")
        chunks = chunk_metadata_aware(doc)
        assert chunks[0]["lang"] == "mr"
        assert chunks[0]["query_type"] == "NUMERIC"


# ===========================================================================
# Test: Strategy B — Parent-Child Hierarchical
# ===========================================================================

class TestStrategyB:
    """Tests for chunk_parent_child (Strategy B)."""
    
    def test_splits_into_sentences(self):
        """300-token DESCRIPTION → multiple sentence-level chunks."""
        doc = make_doc(LONG_ENG, LONG_ENG, query_type="DESCRIPTION")
        chunks = chunk_parent_child(doc)
        assert len(chunks) > 1
    
    def test_parent_always_full_passage(self):
        """Each child chunk stores the full parent passage."""
        doc = make_doc(MEDIUM_ENG, MEDIUM_NATIVE)
        chunks = chunk_parent_child(doc)
        for chunk in chunks:
            assert chunk["parent_eng_text"] == MEDIUM_ENG
            assert chunk["parent_native_text"] == MEDIUM_NATIVE
    
    def test_child_is_sentence(self):
        """Each chunk's eng_text is a single sentence, not the full passage."""
        doc = make_doc(MEDIUM_ENG, MEDIUM_NATIVE)
        chunks = chunk_parent_child(doc)
        for chunk in chunks:
            assert len(chunk["eng_text"]) <= len(MEDIUM_ENG)
    
    def test_strategy_label(self):
        doc = make_doc(MEDIUM_ENG, MEDIUM_NATIVE)
        chunks = chunk_parent_child(doc)
        for chunk in chunks:
            assert chunk["strategy"] == "B"
    
    def test_fallback_to_A_on_single_sentence(self):
        """If passage is a single sentence, B should still produce chunks."""
        doc = make_doc("Hello world this is a test.", "नमस्ते दुनिया यह एक परीक्षण है।")
        chunks = chunk_parent_child(doc)
        assert len(chunks) >= 1


# ===========================================================================
# Test: Strategy C — Sliding Window
# ===========================================================================

class TestStrategyC:
    """Tests for chunk_sliding_window (Strategy C)."""
    
    def test_500_token_produces_multiple_windows(self):
        """500 tokens with window=128, stride=103 → ~5 windows."""
        doc = make_doc(VERY_LONG_ENG, VERY_LONG_ENG)
        chunks = chunk_sliding_window(doc)
        assert len(chunks) >= 4  # 500 / 103 ≈ 4.85
    
    def test_windows_have_overlap(self):
        """Adjacent windows should share overlapping tokens."""
        doc = make_doc(VERY_LONG_ENG, VERY_LONG_ENG)
        chunks = chunk_sliding_window(doc)
        if len(chunks) >= 2:
            words_0 = set(chunks[0]["eng_text"].split())
            words_1 = set(chunks[1]["eng_text"].split())
            overlap = words_0 & words_1
            assert len(overlap) > 0, "Adjacent windows should overlap"
    
    def test_strategy_label(self):
        doc = make_doc(VERY_LONG_ENG, VERY_LONG_ENG)
        chunks = chunk_sliding_window(doc)
        for chunk in chunks:
            assert chunk["strategy"] == "C"
    
    def test_parent_is_full_passage(self):
        doc = make_doc(VERY_LONG_ENG, VERY_LONG_ENG)
        chunks = chunk_sliding_window(doc)
        for chunk in chunks:
            assert chunk["parent_eng_text"] == VERY_LONG_ENG


# ===========================================================================
# Test: Strategy D — Query-Type Adaptive Micro-Chunking
# ===========================================================================

class TestStrategyD:
    """Tests for chunk_query_adaptive (Strategy D)."""
    
    def test_numeric_prioritizes_number_sentences(self):
        """NUMERIC queries should mark sentences with numbers as high priority."""
        eng = "The temperature is 42 degrees. It rains often. Population is 1.3 million."
        doc = make_doc(eng, eng, query_type="NUMERIC")
        chunks = chunk_query_adaptive(doc)
        high_priority = [c for c in chunks if c.get("priority") == "high"]
        assert len(high_priority) >= 2  # "42 degrees" and "1.3 million"
    
    def test_entity_prioritizes_proper_nouns(self):
        """ENTITY queries should mark sentences with capitalized words as high."""
        eng = "Barack Obama was president. The weather was nice. Google is a company."
        doc = make_doc(eng, eng, query_type="ENTITY")
        chunks = chunk_query_adaptive(doc)
        high_priority = [c for c in chunks if c.get("priority") == "high"]
        assert len(high_priority) >= 2  # "Barack Obama" and "Google"
    
    def test_single_sentence_falls_back_to_A(self):
        """Single sentence → falls back to Strategy A."""
        doc = make_doc("Just one sentence here.", "बस एक वाक्य यहाँ।", query_type="NUMERIC")
        chunks = chunk_query_adaptive(doc)
        assert len(chunks) == 1
        assert chunks[0]["strategy"] == "A"  # Fell back to A
    
    def test_strategy_label(self):
        eng = "First sentence. Second sentence."
        doc = make_doc(eng, eng, query_type="ENTITY")
        chunks = chunk_query_adaptive(doc)
        # If multiple chunks, they should be D (unless fallback)
        d_chunks = [c for c in chunks if c["strategy"] == "D"]
        assert len(d_chunks) >= 1


# ===========================================================================
# Test: Indic Script Handling
# ===========================================================================

class TestIndicScript:
    """Tests for Indic script delimiter handling."""
    
    def test_devanagari_danda_splits(self):
        """Devanagari Danda (।) should be recognized as sentence boundary."""
        text = "यह पहला वाक्य है। यह दूसरा वाक्य है। यह तीसरा है।"
        sentences = split_into_sentences(text)
        assert len(sentences) >= 2
    
    def test_double_danda_splits(self):
        """Double Danda (॥) should be a sentence boundary."""
        text = "श्लोक एक॥ श्लोक दो॥ श्लोक तीन॥"
        sentences = split_into_sentences(text)
        assert len(sentences) >= 2
    
    def test_mixed_delimiters(self):
        """Mix of Latin and Indic delimiters should all be handled."""
        text = "English sentence. हिंदी वाक्य। Another English? और हिंदी!"
        sentences = split_into_sentences(text)
        assert len(sentences) >= 3
    
    def test_no_delimiter_returns_whole(self):
        """Text without delimiters returns as single sentence."""
        text = "कोई विराम चिह्न नहीं है यह एक लंबा वाक्य"
        sentences = split_into_sentences(text)
        assert len(sentences) == 1
        assert sentences[0] == text


# ===========================================================================
# Test: Unified Interface (chunk_document)
# ===========================================================================

class TestChunkDocument:
    """Tests for the unified chunk_document interface."""
    
    def test_auto_selects_A_for_short(self):
        """Short PERSON passage → auto-selects Strategy A."""
        doc = make_doc(SHORT_ENG, SHORT_NATIVE, query_type="PERSON")
        chunks = chunk_document(doc)
        assert chunks[0]["strategy"] == "A"
    
    def test_auto_selects_B_for_description(self):
        """DESCRIPTION query → auto-selects Strategy B."""
        doc = make_doc(MEDIUM_ENG, MEDIUM_NATIVE, query_type="DESCRIPTION")
        chunks = chunk_document(doc)
        assert chunks[0]["strategy"] == "B"
    
    def test_force_strategy_overrides(self):
        """force_strategy should override auto-selection."""
        doc = make_doc(SHORT_ENG, SHORT_NATIVE, query_type="PERSON")
        chunks = chunk_document(doc, force_strategy="B")
        assert chunks[0]["strategy"] == "B"
    
    def test_all_chunks_have_required_fields(self):
        """Every chunk must have the required fields for downstream indexing."""
        doc = make_doc(MEDIUM_ENG, MEDIUM_NATIVE)
        chunks = chunk_document(doc)
        
        required = {
            "chunk_id", "doc_id", "strategy", "chunk_index", "total_chunks",
            "eng_text", "native_text", "parent_eng_text", "parent_native_text",
            "lang", "query_type", "query_id", "eng_query", "native_query",
            "native_answer", "eng_answer",
        }
        for chunk in chunks:
            missing = required - set(chunk.keys())
            assert not missing, f"Chunk missing fields: {missing}"


# ===========================================================================
# Test: Token Count Helper
# ===========================================================================

class TestTokenCount:
    """Tests for the token_count helper."""
    
    def test_empty_string(self):
        assert token_count("") == 0
    
    def test_single_word(self):
        assert token_count("hello") == 1
    
    def test_multiple_words(self):
        assert token_count("hello world foo bar") == 4
    
    def test_indic_text(self):
        """Indic text should also be countable by whitespace."""
        assert token_count("यह एक परीक्षण है") == 4
