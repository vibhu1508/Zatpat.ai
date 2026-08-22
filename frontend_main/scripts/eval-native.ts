/**
 * Can we retrieve directly from the SOURCE language, skipping translation?
 *
 * Partials arrive in the language spoken and land ~0 ms after speech end, while
 * the translated final costs 175–455 ms. The corpus carries native_query for
 * all four languages, so an index per language would let a partial hit the
 * corpus with no translation hop in the critical path. This measures whether
 * that retrieval is actually accurate.
 */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';

const { entries } = JSON.parse(
  await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8'),
) as { entries: Entry[] };

const LANGS = ['hi', 'mr', 'sa', 'ta'] as const;

for (const lang of LANGS) {
  // Build an index whose "question" field is the native query.
  const nativeEntries: Entry[] = entries.map((e) => ({
    ...e,
    engQuery: e.native[lang]!.query,
    passages: [{ text: e.native[lang]!.query, idx: 0, docId: String(e.id) }],
  }));
  const r = new Retriever(nativeEntries);

  let top1 = 0;
  let truncOk = 0;
  let noisyOk = 0;
  const times: number[] = [];

  for (const e of entries) {
    const q = e.native[lang]!.query;
    const t = performance.now();
    const hits = r.search(q, 1);
    times.push(performance.now() - t);
    if (hits[0]?.entry.id === e.id) top1++;

    // A partial is a prefix of the utterance: drop the last word.
    const words = q.split(/\s+/);
    const prefix = words.slice(0, Math.max(1, words.length - 1)).join(' ');
    if (r.search(prefix, 1)[0]?.entry.id === e.id) truncOk++;

    // Partials also repeat and garble the tail, as observed on the wire.
    const noisy = `${prefix} ${words.at(-1) ?? ''} ${words.at(-1) ?? ''}`;
    if (r.search(noisy, 1)[0]?.entry.id === e.id) noisyOk++;
  }

  times.sort((a, b) => a - b);
  const pct = (n: number) => ((n / entries.length) * 100).toFixed(1).padStart(5);
  console.log(
    `${lang}  recall@1 ${pct(top1)}%   prefix ${pct(truncOk)}%   garbled-tail ${pct(noisyOk)}%   median ${times[30].toFixed(3)} ms`,
  );
}
