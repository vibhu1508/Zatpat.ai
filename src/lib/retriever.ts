/**
 * BM25 retrieval over the ingested corpus.
 *
 * The index is small enough to run entirely in the browser in a couple of
 * milliseconds — retrieval is not where the latency budget goes, which leaves
 * it for transcription and speech.
 *
 * Each entry is scored on two fields: its own English question, and its best
 * matching passage. Matching the question carries more weight — the corpus is a
 * question-answering set, so a query that looks like one of the questions is a
 * stronger signal than one that merely shares vocabulary with a passage.
 */

export type Lang = 'hi' | 'mr' | 'sa' | 'ta';

export interface Passage {
  text: string;
  idx: number;
  docId: string;
  /** MS MARCO `is_selected` — this passage actually answers the query. */
  gold?: boolean;
}

export interface Entry {
  id: number;
  type: string;
  engQuery: string;
  engAnswer: string;
  passages: Passage[];
  native: Partial<Record<Lang, { query: string; answer: string }>>;
}

export interface Hit {
  entry: Entry;
  score: number;
  /** Best-matching passage for this entry, and its own score. */
  passage: Passage;
  passageScore: number;
  /**
   * Fraction of the query's distinct content terms that appear anywhere in this
   * entry, 0..1. BM25 alone cannot separate in-corpus from out-of-corpus here:
   * a long off-topic question accumulates score from one incidental term match
   * and can outscore a short genuine one. Coverage asks a different question —
   * *how much* of what you asked about does this entry actually talk about —
   * and it is what the domain-scope guardrail gates on.
   */
  coverage: number;
  /**
   * Share of the query's total IDF mass that this single entry explains, 0..1.
   *
   * Coverage asks "do these words appear anywhere in the entry", which stops
   * discriminating once the corpus is large — in 15k passages almost every
   * common word appears somewhere, so "play some music" scores 1.0. This asks
   * the harder question: did *one* entry account for most of what made the
   * query specific? An off-topic query spreads its weight thinly across many
   * entries and concentrates on none.
   */
  concentration: number;
  /**
   * BM25 score per unit of query information (score / total query IDF).
   *
   * Raw score is not comparable across queries — a six-word question outscores
   * a two-word one regardless of match quality. Dividing by the query's IDF
   * mass makes it comparable, and unlike coverage it does not saturate at 1.0
   * for a one-word query that happens to appear somewhere.
   */
  strength: number;
  /** Content terms left after stopwords. Below 2, a query is usually a follow-up. */
  terms: number;
  /**
   * How well the query matches this entry's own curated question, normalised.
   * High means the user asked (more or less) the curated question, so the
   * curated answer is the right reply. Low means they asked something else
   * about the same topic, and the answer has to come from a passage.
   */
  questionStrength: number;
  /** How well the query matches the best passage, normalised. */
  passageStrength: number;
}

/* ── tokenisation ─────────────────────────────────────────── */

/**
 * Stopwords plus conversational filler.
 *
 * The filler half matters more than usual here: the query arrives from speech,
 * not a search box, so it carries "um", "so tell me", "please" and the like.
 * Those words are absent from the corpus, and without stripping them they drag
 * coverage down far enough to look like an out-of-corpus question.
 */
const STOP = new Set(
  ('a an the of in on at to for from by with is are was were be been being do does did what which who whom whose ' +
    'when where why how and or but if then than that this these those it its as into about over under can could ' +
    'should would may might will shall have has had i you he she they we me him her them my your his their our ' +
    // conversational filler
    'um uh er ah hmm okay ok so well now just actually basically really please thanks thank hey hi hello ' +
    'tell explain describe say give show know want need like would mean means there here also very much many')
    .split(' '),
);

/** Light suffix stripping — enough to match "corporations" to "corporation". */
function stem(w: string): string {
  if (w.length > 4 && w.endsWith('ies')) return `${w.slice(0, -3)}y`;
  if (w.length > 4 && (w.endsWith('ses') || w.endsWith('xes') || w.endsWith('ches') || w.endsWith('shes')))
    return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  return w;
}

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

/* ── index ────────────────────────────────────────────────── */

interface Field {
  tf: Map<string, number>;
  len: number;
}

interface Indexed {
  entry: Entry;
  query: Field;
  passages: Field[];
  /** Every term anywhere in this entry, for coverage. */
  vocab: Set<string>;
}

const K1 = 1.4;
const B = 0.72;
/** How much more a question match counts than a passage match. */
const QUERY_WEIGHT = 2.1;

function field(text: string): Field {
  const tokens = tokenize(text);
  const tf = new Map<string, number>();
  for (const t of tokens) tf.set(t, (tf.get(t) ?? 0) + 1);
  return { tf, len: tokens.length };
}

export class Retriever {
  private docs: Indexed[] = [];
  private idf = new Map<string, number>();
  private avgQueryLen = 1;
  private avgPassageLen = 1;
  private maxIdf = 1;

  constructor(entries: Entry[]) {
    this.docs = entries.map((entry) => {
      const query = field(entry.engQuery);
      const passages = entry.passages.map((p) => field(p.text));
      const vocab = new Set<string>();
      for (const f of [query, ...passages]) for (const t of f.tf.keys()) vocab.add(t);
      return { entry, query, passages, vocab };
    });

    // Document frequency is counted over every field, questions and passages
    // alike — they are all evidence about the same 60 topics.
    const df = new Map<string, number>();
    let fields = 0;
    let qLen = 0;
    let pLen = 0;
    let pCount = 0;

    for (const d of this.docs) {
      for (const f of [d.query, ...d.passages]) {
        fields++;
        for (const term of f.tf.keys()) df.set(term, (df.get(term) ?? 0) + 1);
      }
      qLen += d.query.len;
      for (const p of d.passages) {
        pLen += p.len;
        pCount++;
      }
    }

    for (const [term, n] of df) {
      this.idf.set(term, Math.log(1 + (fields - n + 0.5) / (n + 0.5)));
    }
    this.maxIdf = Math.max(1, ...this.idf.values());

    this.avgQueryLen = qLen / Math.max(1, this.docs.length);
    this.avgPassageLen = pLen / Math.max(1, pCount);
  }

  /**
   * Plain BM25 over the query's terms.
   *
   * A near-spelling expansion once lived here, to match a corpus typo
   * ("siatic" where a speaker says "sciatic"). It worked, and it cost 10-16x
   * on every single query to rescue a handful — retrieval went from ~1 ms to
   * ~16 ms. Synonym and spelling robustness belongs in the embedding, not in a
   * lexical index that is chosen precisely because it is cheap.
   */
  private bm25(terms: string[], f: Field, avgLen: number): number {
    let score = 0;
    for (const t of terms) {
      const tf = f.tf.get(t);
      if (!tf) continue;
      const idf = this.idf.get(t) ?? 0;
      score += (idf * (tf * (K1 + 1))) / (tf + K1 * (1 - B + (B * f.len) / avgLen));
    }
    return score;
  }

  /**
   * Score arbitrary candidate texts against a query with the index's own IDF.
   * Used to pick a sentence out of a retrieved passage, so a follow-up can be
   * answered with something other than the entry's single curated answer.
   */
  rank(query: string, candidates: string[]): { text: string; score: number }[] {
    const terms = [...new Set(tokenize(query))];
    if (!terms.length) return [];
    return candidates
      .map((text) => ({ text, score: this.bm25(terms, field(text), this.avgPassageLen) }))
      .sort((a, b) => b.score - a.score);
  }

  search(query: string, k = 5): Hit[] {
    const raw = tokenize(query);
    if (!raw.length) return [];
    const distinct = [...new Set(raw)];
    const terms = distinct;

    // Total IDF mass of the query. Terms absent from the corpus count at the
    // maximum, so a query full of unknown words can never look well explained.
    let idfMass = 0;
    for (const t of distinct) idfMass += this.idf.get(t) ?? this.maxIdf;
    idfMass = Math.max(idfMass, 1e-6);

    const hits: Hit[] = [];
    for (const d of this.docs) {
      const qScore = this.bm25(terms, d.query, this.avgQueryLen) * QUERY_WEIGHT;

      let bestP = 0;
      let bestIdx = 0;
      d.passages.forEach((p, i) => {
        const s = this.bm25(terms, p, this.avgPassageLen);
        if (s > bestP) {
          bestP = s;
          bestIdx = i;
        }
      });

      const score = qScore + bestP;
      if (score > 0) {
        let found = 0;
        let explained = 0;
        for (const t of distinct) {
          if (d.vocab.has(t)) {
            found++;
            explained += this.idf.get(t) ?? 0;
          }
        }
        hits.push({
          entry: d.entry,
          score,
          passage: d.entry.passages[bestIdx],
          passageScore: bestP,
          coverage: found / distinct.length,
          concentration: explained / idfMass,
          strength: score / idfMass,
          questionStrength: qScore / QUERY_WEIGHT / idfMass,
          passageStrength: bestP / idfMass,
          terms: distinct.length,
        });
      }
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, k);
  }
}
