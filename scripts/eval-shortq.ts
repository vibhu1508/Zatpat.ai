/**
 * One-word queries come in two kinds and must not be treated alike:
 *   "hydroxocobalamin"  — a legitimate single-concept lookup
 *   "function"          — what a follow-up strips down to
 * The difference is whether the term is discriminative: a rare term dominates
 * one entry, a common one is spread thinly across many.
 */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const r = new Retriever(entries);

const dom = (q: string) => {
  const h = r.search(q, 2);
  if (!h[0]) return { d: 0, s: 0, t: 0 };
  return { d: (h[0].score - (h[1]?.score ?? 0)) / h[0].score, s: h[0].strength, t: h[0].terms };
};

const shortLegit = entries.map((e) => ({ q: e.engQuery, ...dom(e.engQuery), id: e.id }))
  .filter((x) => x.t < 2);
const followupRemnants = ['what does it mean','why is that','who are we talking about here','tell me more',
  'so what is its function','how does it work','is it important','can you explain that','what about it','and then'];
const fu = followupRemnants.map((q) => ({ q, ...dom(q) })).filter((x) => x.t < 2);

const q = (a: number[], p: number) => [...a].sort((x,y)=>x-y)[Math.floor(a.length*p)] ?? 0;
console.log(`legitimate 1-term in-corpus queries: ${shortLegit.length}`);
console.log(`  dominance  p5 ${q(shortLegit.map(x=>x.d),0.05).toFixed(2)}  median ${q(shortLegit.map(x=>x.d),0.5).toFixed(2)}`);
console.log(`follow-up remnants with <2 terms: ${fu.length}`);
console.log(`  dominance  max ${Math.max(...fu.map(x=>x.d)).toFixed(2)}  median ${q(fu.map(x=>x.d),0.5).toFixed(2)}`);
console.log('\n  examples (legit):', shortLegit.slice(0,4).map(x=>`"${x.q}" d=${x.d.toFixed(2)}`).join('  '));
console.log('  examples (remnant):', fu.slice(0,4).map(x=>`"${x.q}" d=${x.d.toFixed(2)}`).join('  '));

console.log('\ndominance floor for 1-term queries — kept / leaked');
for (const t of [0.1,0.2,0.3,0.4,0.5,0.6]) {
  const kept = shortLegit.filter(x=>x.d>=t).length;
  const leak = fu.filter(x=>x.d>=t).length;
  console.log(`  >= ${t.toFixed(1)}   legit kept ${((kept/shortLegit.length)*100).toFixed(1).padStart(5)}%   remnants leaked ${leak}/${fu.length}`);
}
