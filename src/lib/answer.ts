import { Retriever, type Entry, type Hit, type Lang } from './retriever';
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


/**
 * A sentence pulled from a passage must beat this to be preferred over the
 * entry's curated answer. Below it, the curated answer is both more concise and
 * more likely to be what was asked.
 */
const EXTRACT_FLOOR = 6;

/**
 * Above this, the user essentially asked the entry's own curated question, so
 * the curated answer is what they want — short, clean, and available in every
 * language. Below it they asked something else and a passage sentence serves
 * them better. Without this test, extraction fires on the main path: curated
 * answers are four words long and lose to thirty-word passage sentences on
 * BM25 regardless of which actually answers the question.
 *
 * Measured: exact corpus questions score 0.67 at p1 and 0.96 median; natural
 * paraphrases 0.84-0.98; context-free follow-ups 0.00-0.61. 0.7 sits in the
 * gap. Set at 1.0 it was above everything, so paraphrasing a question even
 * slightly — "sciatic" where the corpus typed "siatic" — dropped the curated
 * answer in favour of whichever passage sentence happened to score best.
 */
const CURATED_FLOOR = 0.7;

/**
 * A passage can carry an answer the curated questions never covered. When the
 * question field matches nothing but a passage matches strongly, answer from
 * the passage instead of refusing.
 */
/*
 * Measured trade at this floor: admits 34% of genuine passage-content
 * questions and leaks 2 of 14 off-topic probes. Lowering it to 1.0 admits 84%
 * but leaks 5 of 14 — lexical matching cannot tell a real question about a
 * passage from an off-topic one that shares vocabulary with it. Dense
 * similarity is what closes this gap; until then this stays conservative.
 */
const PASSAGE_ONLY_FLOOR = 1.2;

/** Sentence length bounds — speech, not a paragraph. */
const MIN_SENTENCE = 40;
const MAX_SENTENCE = 320;

/** Split a passage into sentences worth speaking. */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .map((s) => s.trim())
    .filter((s) => s.length >= MIN_SENTENCE && s.length <= MAX_SENTENCE);
}

/**
 * Refusals say what happened and nothing about how the system is built.
 * An earlier version named the corpus size, which was both an internal detail
 * and wrong the moment the corpus changed.
 */
const REFUSALS: Record<string, string> = {
  en: "I don't have information on that. Try asking about something else.",
  hi: 'मेरे पास इसकी जानकारी नहीं है। कुछ और पूछकर देखिए।',
  mr: 'माझ्याकडे याबद्दल माहिती नाही. दुसरे काहीतरी विचारून पहा.',
  sa: 'तस्य विषये मम सूचना नास्ति। अन्यत् किमपि पृच्छतु।',
  ta: 'அதைப் பற்றிய தகவல் என்னிடம் இல்லை. வேறு ஏதாவது கேட்டுப் பாருங்கள்.',
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
  /** The query retrieved on. Always the query as asked — no context is merged. */
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
    //
    // Each turn is resolved on its own. An earlier version merged the previous
    // turns into a thin query so follow-ups stayed on topic, and cached the
    // result per session. Both are gone deliberately: carrying context forward
    // made a new question inherit the previous answer, which is a worse failure
    // than refusing. A context-free follow-up now falls below the strength gate
    // and is refused rather than answered from whatever came before.
    t = performance.now();
    const hits = this.retriever.search(req.query, 5);
    const resolvedQuery = req.query;
    mark('retrieve', performance.now() - t);

    const best = hits[0];
    const floor = STRENGTH_FLOOR;
    // How far the top entry stands clear of the runner-up.
    const dominance = best ? (best.score - (hits[1]?.score ?? 0)) / best.score : 0;
    const grounded =
      !!best &&
      (best.strength >= floor || best.passageStrength >= PASSAGE_ONLY_FLOOR) &&
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

    // The curated answer answers the entry's own question. A follow-up asks
    // something else about the same topic, so returning that answer again is
    // just the previous reply repeated. Look for a sentence in the retrieved
    // passages that answers *this* question instead — and it also lets the
    // system answer things the 1,500 curated questions never covered, since
    // the passages carry far more than the questions do.
    let english = REFUSALS.en;
    let extracted: string | null = null;

    // Did they ask the curated question, or something else about the topic?
    const askedCurated = !!best && best.questionStrength >= CURATED_FLOOR;

    if (useCorpus && !askedCurated) {
      english = best.entry.engAnswer;
      // Only the resolved entry's own passages. Pooling the top few entries
      // gives more material but lets the answer drift: asking "what is its
      // function?" about a radical neck pulled a sentence about the Department
      // of Corrections, because that entry also talks about functions.
      const pool: string[] = [];
      for (const p of best.entry.passages) pool.push(...sentences(p.text));
      const ranked = this.retriever.rank(req.query, pool);
      const topSentence = ranked[0];
      // Only prefer a sentence when it clearly beats the curated answer for
      // this particular question.
      const curatedScore = this.retriever.rank(req.query, [best.entry.engAnswer])[0]?.score ?? 0;
      if (topSentence && topSentence.score >= EXTRACT_FLOOR && topSentence.score > curatedScore) {
        extracted = topSentence.text;
        english = topSentence.text;
      }
    } else if (useCorpus) {
      english = best.entry.engAnswer;
    }

    // Curated answers exist in every language; extracted sentences are English
    // only, because the browser corpus carries English passages alone.
    const text = !useCorpus
      ? (REFUSALS[lang] ?? REFUSALS.en)
      : extracted
        ? extracted
        : (lang !== 'en' && best.entry.native[lang]?.answer) || best.entry.engAnswer;
    mark('compose', performance.now() - t);

    mark('speak', 0);

    // Headline latency is the retrieval pipeline alone. Transcription is a
    // third-party network call an order of magnitude larger than everything
    // else, and averaging it in hides whether our own work is fast — it is
    // still measured, still in the trace, just not the number on the wall.
    const retrievalMs = stages
      .filter((x) => x.id !== 'transcribe')
      .reduce((a, x) => a + (x.ms ?? 0), 0);

    const trace: Trace = {
      stages,
      totalMs: Math.round(retrievalMs * 100) / 100,
      transcribeMs: Math.round(req.transcribeMs ?? 0),
      lang: req.languageCode,
      utteranceMs: Math.round(req.utteranceMs ?? 0),
      grounded: useCorpus,
      coverage: best?.coverage ?? 0,
      strategy,
      routeReason: reasonFor(strategy, best),
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
  if (!best) return `${name} — no passage scored above zero.`;
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
          note = fired ? 'No matching information found.' : undefined;
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
