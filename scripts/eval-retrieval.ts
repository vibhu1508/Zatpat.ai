/**
 * Retrieval accuracy on the MSMARCO-XI slice.
 *
 * Two metrics, because they answer different questions:
 *   entry@k    — did the right query's passage set rank first? This is what the
 *                console needs, since the answer is attached to the entry.
 *   gold@k     — did a passage MS MARCO marked `is_selected` land in the top k?
 *                This is the standard IR metric and the one comparable to
 *                published baselines.
 */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';

const { entries } = JSON.parse(
  await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8'),
) as { entries: Entry[] };

const t0 = performance.now();
const r = new Retriever(entries);
const buildMs = performance.now() - t0;

const passages = entries.reduce((a, e) => a + e.passages.length, 0);
console.log(`corpus      ${entries.length.toLocaleString()} queries, ${passages.toLocaleString()} passages`);
console.log(`index build ${buildMs.toFixed(0)} ms\n`);

function run(label: string, queryOf: (e: Entry) => string) {
  let e1 = 0, e5 = 0, g1 = 0, g5 = 0, g10 = 0;
  const times: number[] = [];
  const covs: number[] = [];

  for (const e of entries) {
    const q = queryOf(e);
    if (!q) continue;
    const t = performance.now();
    const hits = r.search(q, 10);
    times.push(performance.now() - t);

    if (hits[0]?.entry.id === e.id) { e1++; covs.push(hits[0].coverage); }
    if (hits.slice(0, 5).some((h) => h.entry.id === e.id)) e5++;

    // gold@k: rank the entry's own gold passage among returned passages
    const goldIdx = hits.findIndex((h) => h.entry.id === e.id && h.passage.gold);
    if (goldIdx === 0) g1++;
    if (goldIdx >= 0 && goldIdx < 5) g5++;
    if (goldIdx >= 0) g10++;
  }

  const n = entries.length;
  times.sort((a, b) => a - b);
  const pct = (x: number) => ((x / n) * 100).toFixed(1).padStart(5);
  console.log(
    `${label.padEnd(16)} entry@1 ${pct(e1)}%  entry@5 ${pct(e5)}%   ` +
    `gold@1 ${pct(g1)}%  gold@5 ${pct(g5)}%   ` +
    `${times[Math.floor(times.length / 2)].toFixed(2)} ms  p95 ${times[Math.floor(times.length * 0.95)].toFixed(2)} ms`,
  );
  return covs;
}

const cov = run('english', (e) => e.engQuery);
for (const l of ['hi', 'mr', 'sa', 'ta'] as const) {
  run(`${l} (lexical)`, (e) => e.native[l]?.query ?? '');
}

// Out-of-corpus separation at this scale.
const off = [
  'what is the weather in mumbai today',
  'give me a recipe for pasta carbonara',
  'who won the football match last night',
  'what is my bank account balance',
  'book me a flight to singapore next tuesday',
];
const offCov = off.map((q) => r.search(q, 1)[0]?.coverage ?? 0);
const cs = [...cov].sort((a, b) => a - b);
console.log(`\ncoverage   correct hits: min ${cs[0].toFixed(2)}  p5 ${cs[Math.floor(cs.length * 0.05)].toFixed(2)}  median ${cs[Math.floor(cs.length / 2)].toFixed(2)}`);
console.log(`           off-topic:     max ${Math.max(...offCov).toFixed(2)}  (${offCov.map((c) => c.toFixed(2)).join(', ')})`);
