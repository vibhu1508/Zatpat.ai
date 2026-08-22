import type { ChunkStrategy, Guardrail, Stage, StageId } from './types';

/**
 * Backend-aligned pipeline constants.
 * Strategies are fetched from GET /api/strategies at startup;
 * these are the fallback defaults matching the Python backend.
 */

export const STRATEGIES: ChunkStrategy[] = [
  {
    id: 'A',
    name: 'Metadata-Aware Selective',
    description:
      'Full is_selected passage as a cohesive semantic unit with metadata tags.',
    threshold: '< 60 tokens',
    use_case: 'Standard factoid queries (ENTITY, PERSON, LOCATION)',
  },
  {
    id: 'B',
    name: 'Parent-Child Hierarchical',
    description:
      'Sentence-level child chunks for high-precision embedding + full parent passage payload for LLM context.',
    threshold: '> 60 tokens OR DESCRIPTION query',
    use_case: 'Descriptive and multi-sentence context questions',
  },
  {
    id: 'C',
    name: 'Script-Aware Sliding Window',
    description:
      'Overlapping windows of 128 tokens with 25% overlap snapped to Indic sentence delimiters (।, ॥).',
    threshold: '> 200 tokens',
    use_case: 'Long narrative documents',
  },
  {
    id: 'D',
    name: 'Query-Type Adaptive Micro-Chunking',
    description:
      'Factoid-optimized micro spans prioritizing numbers and proper noun entities.',
    threshold: '< 40 tokens for NUMERIC/ENTITY',
    use_case: 'High-precision numerical values, stats, and names',
  },
];

/** Stage labels for the latency panel — maps backend timing keys to UI labels. */
export const STAGE_LABELS: Record<StageId, string> = {
  stt: 'Sarvam STT',
  input_guard: 'Input Guardrails',
  session: 'Session Context',
  retrieval: 'Redis HNSW Search',
  output_guard: 'Output Guardrail',
  llm_gen: 'LLM Generation',
  groundedness: 'Groundedness Check',
};

export const STAGE_ORDER: StageId[] = [
  'stt',
  'input_guard',
  'session',
  'retrieval',
  'output_guard',
  'llm_gen',
  'groundedness',
];

export function blankStages(): Stage[] {
  return STAGE_ORDER.map((id) => ({
    id,
    label: STAGE_LABELS[id],
    state: 'pending' as const,
  }));
}

export const DEFAULT_GUARDRAILS: Guardrail[] = [
  {
    id: 'pii',
    name: 'PII redaction',
    scope: 'input',
    detail: 'Masks emails, phone numbers, card and government IDs before the query is embedded.',
    action: 'redact',
    enabled: true,
    hits: 0,
  },
  {
    id: 'injection',
    name: 'Prompt-injection screen',
    scope: 'input',
    detail: 'Detects imperative override language in user queries and blocks them.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
  {
    id: 'language',
    name: 'Language validation',
    scope: 'input',
    detail: 'Ensures the query language is one of the 5 supported Indic languages or English.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
  {
    id: 'grounding',
    name: 'Grounding check',
    scope: 'output',
    detail: 'Validates that the LLM answer is grounded in the retrieved passage with Indic numeral normalization.',
    action: 'rewrite',
    enabled: true,
    hits: 0,
  },
  {
    id: 'confidence',
    name: 'Confidence threshold',
    scope: 'output',
    detail: 'Abstains when the vector similarity score falls below the confidence floor.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
  {
    id: 'blocked_topics',
    name: 'Blocked topics',
    scope: 'input',
    detail: 'Refuses queries that match harmful or off-topic content patterns.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
];
