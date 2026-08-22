/**
 * BM25 retrieval over the ingested corpus.
 *
 * The corpus is small (60 questions, 71 passages), so this runs entirely in the
 * browser in well under a millisecond — retrieval is not where the latency
 * budget goes, which leaves it for transcription and generation.
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

/** Character trigrams of a padded term, for fuzzy lookup. */
function trigramsOf(term: string): string[] {
  const s = `  ${term} `;
  const out: string[] = [];
  for (let i = 0; i < s.length - 2; i++) out.push(s.slice(i, i + 3));
  return out;
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
  /** Character trigram -> vocabulary terms containing it. */
  private trigrams = new Map<string, Set<string>>();
  private variantCache = new Map<string, string[]>();
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

    // Trigram postings, so a term the corpus does not literally contain can
    // still find its near-spellings. The corpus is user-authored text and
    // carries real typos — it stores "siatic" where a speaker says "sciatic",
    // and exact matching refuses a question it plainly contains.
    for (const term of this.idf.keys()) {
      for (const g of trigramsOf(term)) {
        let set = this.trigrams.get(g);
        if (!set) this.trigrams.set(g, (set = new Set()));
        set.add(term);
      }
    }
    this.avgQueryLen = qLen / Math.max(1, this.docs.length);
    this.avgPassageLen = pLen / Math.max(1, pCount);
  }

  /** Discount applied when a term matches only through a near-spelling. */
  private static readonly VARIANT_WEIGHT = 0.85;

  private bm25(terms: string[], f: Field, avgLen: number): number {
    let score = 0;
    for (const t of terms) {
      let tf = f.tf.get(t);
      let idf = this.idf.get(t) ?? 0;
      let weight = 1;

      if (!tf) {
        // Fall back to the best near-spelling this field does contain.
        for (const v of this.variantsOf(t)) {
          const vtf = f.tf.get(v);
          if (vtf) {
            tf = vtf;
            idf = this.idf.get(v) ?? 0;
            weight = Retriever.VARIANT_WEIGHT;
            break;
          }
        }
      }
      if (!tf) continue;
      score += weight * ((idf * (tf * (K1 + 1))) / (tf + K1 * (1 - B + (B * f.len) / avgLen)));
    }
    return score;
  }

  /**
   * Near-spellings of a term, by trigram Jaccard.
   *
   * This has to run for *known* terms too, not just unknown ones. The corpus
   * carries real typos: it stores "siatic" where a speaker says "sciatic", and
   * both spellings exist in the vocabulary because other passages use each. So
   * "sciatic" is never treated as unknown, yet it fails to match the one entry
   * that answers the question — retrieval still ranks that entry first, but the
   * unmatched term drags the confidence score under the refusal gate.
   *
   * Measured on real variants: sciatic~siatic 0.50, calendar~calender 0.50,
   * temperature~temperatur 0.77. Genuinely different words sit at 0.20-0.50,
   * so 0.49 is the boundary. Variants only ever *add* a way to match, and each
   * is discounted, so a spurious one costs a little noise rather than an answer.
   */
  private variantsOf(term: string): string[] {
    if (term.length < 5) return [];
    const cached = this.variantCache.get(term);
    if (cached) return cached;

    const grams = trigramsOf(term);
    const counts = new Map<string, number>();
    for (const g of grams) {
      const set = this.trigrams.get(g);
      if (!set) continue;
      for (const cand of set) counts.set(cand, (counts.get(cand) ?? 0) + 1);
    }
    const out: string[] = [];
    for (const [cand, shared] of counts) {
      if (cand === term) continue;
      const union = grams.length + trigramsOf(cand).length - shared;
      if (shared / union > 0.49) out.push(cand);
    }
    out.sort((a, b) => (this.idf.get(b) ?? 0) - (this.idf.get(a) ?? 0));
    const top = out.slice(0, 3);
    this.variantCache.set(term, top);
    return top;
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
          let hitTerm: string | null = d.vocab.has(t) ? t : null;
          if (!hitTerm) hitTerm = this.variantsOf(t).find((v) => d.vocab.has(v)) ?? null;
          if (hitTerm) {
            found++;
            explained += this.idf.get(hitTerm) ?? 0;
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
          terms: distinct.length,
        });
      }
    }

    return hits.sort((a, b) => b.score - a.score).slice(0, k);
  }
}
