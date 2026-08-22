/** What actually separates a real question from a context-free follow-up. */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const r = new Retriever(entries);

const q = (a: number[], p: number) => [...a].sort((x, y) => x - y)[Math.floor(a.length * p)] ?? 0;
const stat = (label: string, xs: number[]) =>
  console.log(`  ${label.padEnd(16)} min ${q(xs,0).toFixed(2).padStart(6)}  p5 ${q(xs,0.05).toFixed(2).padStart(6)}  median ${q(xs,0.5).toFixed(2).padStart(6)}  max ${q(xs,0.999).toFixed(2).padStart(6)}`);

// In-corpus questions answered correctly.
const good: number[] = [];
for (const e of entries) { const h = r.search(e.engQuery, 1)[0]; if (h?.entry.id === e.id) good.push(h.strength); }

// Context-free follow-ups — the actual failure from the transcript.
const followups = [
  'So what is its function? What does it actually mean?', 'Who are we talking about here?',
  'why is that', 'tell me more', 'what about the other one', 'and then what happened',
  'is it good', 'how does that work', 'what does it mean', 'can you explain that again',
];
const off = [
  'what is the weather in mumbai today', 'play some music', 'what time does my train leave',
  'book me a flight to singapore', 'call my mother please', 'what is my bank account balance',
];
const fu = followups.map((x) => r.search(x, 1)[0]?.strength ?? 0);
const ot = off.map((x) => r.search(x, 1)[0]?.strength ?? 0);

console.log('strength (BM25 score / query IDF mass)');
stat('in-corpus', good); stat('follow-ups', fu); stat('off-topic', ot);

console.log('\nthreshold sweep — wrongly answered / wrongly refused');
for (const t of [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0]) {
  const badFu = fu.filter((x) => x >= t).length;
  const badOt = ot.filter((x) => x >= t).length;
  const lost = good.filter((x) => x < t).length;
  console.log(`  strength >= ${t.toFixed(1)}   follow-ups answered ${String(badFu).padStart(2)}/${fu.length}   off-topic answered ${String(badOt).padStart(2)}/${ot.length}   in-corpus refused ${((lost/good.length)*100).toFixed(1).padStart(5)}%`);
}

const short = followups.filter((x) => (r.search(x, 1)[0]?.terms ?? 0) < 2).length;
console.log(`\nfollow-ups with <2 content terms: ${short}/${followups.length}`);
console.log(`in-corpus queries with <2 content terms: ${entries.filter((e) => (r.search(e.engQuery,1)[0]?.terms ?? 9) < 2).length}/${entries.length}`);
