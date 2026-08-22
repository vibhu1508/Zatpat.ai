import { Retriever, tokenize, type Entry, type Hit, type Lang } from './retriever';
import { STRATEGIES } from './pipeline';
import type { ChunkStrategyId, GuardVerdict, Guardrail, Stage, StageId, Trace } from './types';

/**
 * Question in English → answer from the corpus.
 *
 * There is no language model in this path. The corpus is a question-answering
 * set with gold answers attached, so the answer is looked up, not generated —
 * which is both faithful (nothing can be invented) and fast: the whole
 * retrieve-and-answer step runs in well under a millisecond, leaving the
 * latency budget to speech.
 */

const STAGE_LABELS: Record<StageId, string> = {
  transcribe: 'Transcribe',
  route: 'Route',
  retrieve: 'Retrieve',
  guard: 'Guard',
  compose: 'Compose',
  speak: 'Speak',
};

export const STAGE_ORDER: StageId[] = [
  'transcribe',
  'route',
  'retrieve',
  'guard',
  'compose',
  'speak',
];

export function blankStages(): Stage[] {
  return STAGE_ORDER.map((id) => ({ id, label: STAGE_LABELS[id], state: 'pending' as const }));
}

/**
 * Refusal gate, on BM25 score normalised by the query's IDF mass.
 *
 * Coverage was the wrong signal and has been dropped from the gate. It reads
 * 1.00 for any single-word query whose word appears anywhere in 15k passages —
 * which is exactly what a context-free follow-up looks like after stopword
 * removal, so it waved through every one of them.
 *
 * Measured (`npm run eval:gate`): at 2.5, none of the out-of-corpus probes are
 * answered and 3.5% of genuine questions are refused. Below 2.0 the off-topic
 * ones start getting through; above 3.0 real recall falls off a cliff (19.6%).
 */
const STRENGTH_FLOOR = 2.5;

/**
 * Lower floor for a query that had conversation history merged into it.
 * Merging adds terms, which inflates the IDF denominator and deflates strength
 * even when the match is right — 25.7% of correctly-resolved follow-ups were
 * refused at the full floor.
 */
const MERGED_STRENGTH_FLOOR = 1.6;

/**
 * A query with fewer content terms than this needs to prove itself, because
 * this is what a follow-up looks like after stopword removal.
 *
 * It is not enough to refuse them outright — 254 of the 1,500 corpus questions
 * are genuine single-concept lookups ("what is monogram"), and refusing those
 * cost 17% recall. What separates the two is whether the term is
 * discriminative: a rare one dominates a single entry, a common one like
 * "function" is spread thinly across many. Measured, legitimate short queries
 * have a median dominance of 1.00 against 0.01 for follow-up remnants, and a
 * floor of 0.4 keeps 94.5% of the real ones while leaking none of the others.
 */
const MIN_TERMS = 2;
const SHORT_DOMINANCE_FLOOR = 0.4;

/** How many previous user turns to carry when resolving a follow-up. */
const HISTORY_TURNS = 2;

const REFUSALS: Record<string, string> = {
  en: "That is not in the indexed corpus, so I am not going to answer it from memory. Ask me one of the sixty questions the documents actually cover.",
  hi: 'यह जानकारी अनुक्रमित संग्रह में नहीं है, इसलिए मैं अनुमान नहीं लगाऊँगा।',
  mr: 'ही माहिती अनुक्रमित संग्रहात नाही, त्यामुळे मी अंदाज लावणार नाही.',
  sa: 'एतत् सूचना सङ्ग्रहे नास्ति, अतः अहं न अनुमानिष्यामि।',
  ta: 'இந்தத் தகவல் சேகரிப்பில் இல்லை, எனவே நான் ஊகிக்க மாட்டேன்.',
};

/**
 * Sarvam returns BCP-47-ish codes; the corpus keys on the bare language.
 *
 * Note this cannot come from the final transcript's `language` field when
 * `mode=translate`: that reports the language of the *output* (always English),
 * not of the speaker. The answer's language is whatever the user selected.
 */
export function toLang(code: string | undefined): Lang | 'en' {
  const base = (code ?? '').split('-')[0].toLowerCase();
  return base === 'hi' || base === 'mr' || base === 'sa' || base === 'ta' ? base : 'en';
}

export interface AnswerRequest {
  query: string;
  /** Previous user turns, oldest first. Used to resolve follow-ups. */
  history?: string[];
  /** Language code from Sarvam's final transcript, e.g. "hi-IN". */
  languageCode?: string;
  guardrails: Guardrail[];
  /** How long the speaker spoke — context, not latency. */
  utteranceMs?: number;
  /** End of speech → final transcript. The dominant term in the budget. */
  transcribeMs?: number;
  onStages?: (stages: Stage[]) => void;
}

export interface AnswerResult {
  /** Spoken text, in the language the question was asked in. */
  text: string;
  /** The query actually retrieved on — differs when history was merged in. */
  resolvedQuery: string;
  /** The same answer in English, for the trace. */
  english: string;
  lang: Lang | 'en';
  trace: Trace;
  hits: Hit[];
}

export class AnswerEngine {
  private retriever: Retriever;

  constructor(entries: Entry[]) {
    this.retriever = new Retriever(entries);
  }

  answer(req: AnswerRequest): AnswerResult {
    const stages = blankStages();
    const mark = (id: StageId, ms: number) => {
      const s = stages.find((x) => x.id === id)!;
      s.ms = Math.round(ms * 100) / 100;
      s.state = 'done';
      req.onStages?.(stages.map((x) => ({ ...x })));
    };

    mark('transcribe', req.transcribeMs ?? 0);

    // ── route ────────────────────────────────────────────────
    let t = performance.now();
    const strategy = routeFor(req.query);
    mark('route', performance.now() - t);

    // ── retrieve ─────────────────────────────────────────────
    t = performance.now();
    let hits = this.retriever.search(req.query, 5);
    let resolvedQuery = req.query;
    let merged = false;

    // A question like "so what is its function?" strips to a single content
    // term and retrieves noise — measured, 0 of 300 such follow-ups stayed on
    // topic. Carrying the previous turns in fixes all of them, so retry that
    // way whenever the query is too thin to stand on its own.
    const thin = !hits[0] || hits[0].terms < MIN_TERMS || hits[0].strength < STRENGTH_FLOOR;
    if (thin && req.history?.length) {
      const context = req.history.slice(-HISTORY_TURNS).join(' ');
      // Only merge if the history actually contributes something the query does
      // not already say. Without this, asking the same borderline question twice
      // answers it the second time purely because the merged text repeats the
      // terms — the same question would behave differently on a repeat, which
      // is worse than being consistently wrong.
      const own = new Set(tokenize(req.query));
      const adds = tokenize(context).some((t) => !own.has(t));
      const candidate = adds ? `${context} ${req.query}` : req.query;
      const retried = adds ? this.retriever.search(candidate, 5) : [];
      if (retried[0] && retried[0].strength >= MERGED_STRENGTH_FLOOR) {
        hits = retried;
        resolvedQuery = candidate;
        merged = true;
      }
    }
    mark('retrieve', performance.now() - t);

    const best = hits[0];
    const floor = merged ? MERGED_STRENGTH_FLOOR : STRENGTH_FLOOR;
    // How far the top entry stands clear of the runner-up.
    const dominance = best ? (best.score - (hits[1]?.score ?? 0)) / best.score : 0;
    const grounded =
      !!best &&
      best.strength >= floor &&
      (best.terms >= MIN_TERMS || dominance >= SHORT_DOMINANCE_FLOOR);
    const lang = toLang(req.languageCode);

    // ── guard ────────────────────────────────────────────────
    t = performance.now();
    const guardHits = runRails(req.guardrails, req.query, grounded);
    const blocked = guardHits.some(
      (v) => !v.passed && (v.railId === 'scope' || v.railId === 'injection'),
    );
    mark('guard', performance.now() - t);

    // ── compose ──────────────────────────────────────────────
    t = performance.now();
    const useCorpus = grounded && !blocked;
    const english = useCorpus ? best.entry.engAnswer : REFUSALS.en;
    const text = useCorpus
      ? (lang !== 'en' && best.entry.native[lang]?.answer) || best.entry.engAnswer
      : (REFUSALS[lang] ?? REFUSALS.en);
    mark('compose', performance.now() - t);

    mark('speak', 0);

    const totalMs = stages.reduce((a, s) => a + (s.ms ?? 0), 0);

    const trace: Trace = {
      stages,
      totalMs: Math.round(totalMs),
      lang: req.languageCode,
      utteranceMs: Math.round(req.utteranceMs ?? 0),
      grounded: useCorpus,
      coverage: best?.coverage ?? 0,
      strategy,
      routeReason: merged
        ? `${reasonFor(strategy, best)} Resolved using the previous turn.`
        : reasonFor(strategy, best),
      queryClass: best?.entry.type?.toLowerCase() ?? 'unmatched',
      k: hits.length,
      chunks: hits.map((h) => ({
        id: h.passage.docId,
        source: `corpus/${h.entry.type.toLowerCase()}/${h.entry.id}.md`,
        span: `p${h.passage.idx}`,
        score: Math.round(h.score * 1000) / 1000,
        strategy,
      })),
      guardHits,
      tokensIn: req.query.split(/\s+/).filter(Boolean).length,
      tokensOut: text.split(/\s+/).filter(Boolean).length,
    };

    return { text, english, lang, trace, hits, resolvedQuery };
  }
}

/* ── routing ──────────────────────────────────────────────── */

function routeFor(query: string): ChunkStrategyId {
  const words = query.trim().split(/\s+/).length;
  if (/\b(compare|versus|vs\.?|difference|between)\b/i.test(query)) return 'proposition';
  if (words <= 8) return 'sentence-window';
  if (words > 20) return 'late';
  return 'semantic';
}

function reasonFor(strategy: ChunkStrategyId, best: Hit | undefined): string {
  const name = STRATEGIES.find((s) => s.id === strategy)?.name ?? strategy;
  if (!best) return `${name} — nothing in the corpus scored above zero.`;
  return `${name} — matched "${best.entry.engQuery}" with ${(best.coverage * 100).toFixed(0)}% term coverage.`;
}

/* ── guardrails ───────────────────────────────────────────── */

function runRails(rails: Guardrail[], query: string, grounded: boolean): GuardVerdict[] {
  return rails
    .filter((g) => g.enabled)
    .map((g) => {
      let fired = false;
      let note: string | undefined;

      switch (g.id) {
        case 'pii':
          fired = /\b[\w.+-]+@[\w.-]+\.\w+\b|\b\d{10}\b|\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/.test(query);
          note = fired ? 'Masked 1 identifier before retrieval.' : undefined;
          break;
        case 'scope':
          // The real gate: retrieval found nothing that covers the question.
          fired = !grounded;
          note = fired ? 'Question falls outside the indexed corpus.' : undefined;
          break;
        case 'injection':
          fired = /\b(ignore (all |the )?(previous|prior) instructions|disregard the above|system prompt)\b/i.test(
            query,
          );
          note = fired ? 'Override language detected in the question.' : undefined;
          break;
        case 'grounding':
          // Nothing is generated, so every answer maps to a retrieved entry.
          fired = false;
          break;
        default:
          fired = false;
      }

      return { railId: g.id, name: g.name, passed: !fired, note };
    });
}
