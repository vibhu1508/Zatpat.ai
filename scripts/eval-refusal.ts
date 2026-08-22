import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const r = new Retriever(entries);

// Deliberately outside MS MARCO's domain: personal, local, transactional, live.
const off = [
  'what is the weather in mumbai today', 'give me a recipe for pasta carbonara',
  'who won the football match last night', 'what is my bank account balance',
  'book me a flight to singapore next tuesday', 'call my mother please',
  'set an alarm for seven in the morning', 'what did i buy last week',
  'send a message to the team about the meeting', 'play some music',
  'how much money do i have left this month', 'cancel my subscription',
  'what is on my calendar tomorrow', 'turn off the living room lights',
  'order a pizza to my house', 'what time does my train leave',
];
const offScores = off.map((q) => { const h = r.search(q, 2); return { q, cov: h[0]?.coverage ?? 0, con: h[0]?.concentration ?? 0 }; });

const inCov: number[] = [];
const inCon: number[] = [];
for (const e of entries) {
  const h = r.search(e.engQuery, 2);
  if (h[0]?.entry.id === e.id) { inCov.push(h[0].coverage); inCon.push(h[0].concentration); }
}
const q = (a: number[], p: number) => [...a].sort((x, y) => x - y)[Math.floor(a.length * p)];

console.log(`in-corpus  coverage  p1 ${q(inCov,0.01).toFixed(2)}  p5 ${q(inCov,0.05).toFixed(2)}  median ${q(inCov,0.5).toFixed(2)}`);
console.log(`off-topic  coverage  max ${Math.max(...offScores.map(s=>s.cov)).toFixed(2)}  p75 ${q(offScores.map(s=>s.cov),0.75).toFixed(2)}`);
console.log(`\nworst offenders (highest coverage off-topic):`);
for (const s of offScores.sort((a,b)=>b.cov-a.cov).slice(0,5)) console.log(`  ${s.cov.toFixed(2)}  "${s.q}"`);

console.log(`\nin-corpus  concentration  p1 ${q(inCon,0.01).toFixed(2)}  p5 ${q(inCon,0.05).toFixed(2)}  median ${q(inCon,0.5).toFixed(2)}`);
console.log(`off-topic  concentration  max ${Math.max(...offScores.map(s=>s.con)).toFixed(2)}  p75 ${q(offScores.map(s=>s.con),0.75).toFixed(2)}`);

for (const [name, inArr, offArr] of [['coverage', inCov, offScores.map(s=>s.cov)], ['concentration', inCon, offScores.map(s=>s.con)]] as const) {
  console.log(`\n${name}: off-topic wrongly allowed / in-corpus wrongly refused`);
  for (const t of [0.3, 0.4, 0.5, 0.6, 0.7, 0.8]) {
    const fa = offArr.filter((c) => c >= t).length;
    const fr = inArr.filter((c) => c < t).length;
    console.log(`  floor ${t.toFixed(2)}   allowed ${String(fa).padStart(2)}/${off.length}   refused ${((fr/inArr.length)*100).toFixed(1).padStart(5)}%`);
  }
}
