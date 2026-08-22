import type { ChunkStrategy, Guardrail } from './types';

/**
 * Static catalogue: the chunking strategies the router can pick from, and the
 * guardrails that ship enabled. The pipeline that consumes these lives in
 * answer.ts — this file holds only what is describable without running.
 */

export const STRATEGIES: ChunkStrategy[] = [
  {
    id: 'semantic',
    name: 'Semantic',
    size: '~512 tok',
    overlap: 'boundary-aware',
    blurb:
      'Splits where the embedding cosine between adjacent sentences drops past a percentile threshold, so a chunk ends where the topic does.',
    bestFor: 'Prose, policy documents, anything argued in paragraphs.',
    share: 0.41,
  },
  {
    id: 'recursive',
    name: 'Recursive character',
    size: '800 / 120 tok',
    overlap: '15%',
    blurb:
      'Falls back through a separator ladder — sections, paragraphs, sentences, words — until each piece fits the window.',
    bestFor: 'Mixed or messy corpora with no reliable structure.',
    share: 0.18,
  },
  {
    id: 'sentence-window',
    name: 'Sentence window',
    size: '1 sent + 3',
    overlap: '±3 sentences',
    blurb:
      'Indexes single sentences for precision, then expands the neighbourhood at read time so the model still sees context.',
    bestFor: 'Short factual questions where the answer is one line.',
    share: 0.24,
  },
  {
    id: 'proposition',
    name: 'Proposition',
    size: '1 claim',
    overlap: 'none',
    blurb:
      'Decomposes passages into standalone atomic claims, each rewritten to survive without its neighbours.',
    bestFor: 'Comparisons, numbers, and multi-hop lookups.',
    share: 0.11,
  },
  {
    id: 'late',
    name: 'Late chunking',
    size: 'document',
    overlap: 'n/a',
    blurb:
      'Embeds the whole document in one pass, then pools token vectors per span — every chunk keeps full-document context.',
    bestFor: 'Long reports where pronouns point far backwards.',
    share: 0.06,
  },
];

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
    scope: 'retrieval',
    detail: 'Scores retrieved passages for imperative override language and drops them above threshold.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
  {
    id: 'grounding',
    name: 'Grounding check',
    scope: 'output',
    detail: 'Every claim must map to a retrieved span. Unsupported sentences are cut before speech.',
    action: 'rewrite',
    enabled: true,
    hits: 0,
  },
  {
    id: 'scope',
    name: 'Domain scope',
    scope: 'input',
    detail: 'Refuses queries outside the indexed corpus instead of letting the model improvise.',
    action: 'block',
    enabled: true,
    hits: 0,
  },
  {
    id: 'toxicity',
    name: 'Toxicity filter',
    scope: 'output',
    detail: 'Classifier over the drafted answer; blocks before the text ever reaches the voice.',
    action: 'flag',
    enabled: false,
    hits: 0,
  },
];
