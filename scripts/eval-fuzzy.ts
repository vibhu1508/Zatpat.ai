/** Where to set the fuzzy-match threshold: does it fix typos without merging real words? */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };

const probes: [string, string][] = [
  ['sciatic', 'siatic'], ['definition', 'definit'], ['temperature', 'temperatur'],
  ['pronunciation', 'pronounciation'], ['calendar', 'calender'], ['separate', 'seperate'],
];
const t3 = (t: string) => { const s = `  ${t} `; const o: string[] = []; for (let i = 0; i < s.length - 2; i++) o.push(s.slice(i, i + 3)); return o; };
const jac = (a: string, b: string) => { const A = t3(a), B = t3(b); const sh = A.filter((g) => B.includes(g)).length; return sh / (A.length + B.length - sh); };
console.log('trigram Jaccard for real spelling variants:');
for (const [a, b] of probes) console.log(`  ${a.padEnd(15)} ~ ${b.padEnd(16)} ${jac(a, b).toFixed(2)}`);

// Words that must NOT be merged.
const bad: [string, string][] = [['cat', 'car'], ['nerve', 'never'], ['spine', 'spice'], ['heart', 'heard'], ['train', 'brain']];
console.log('\ndistinct words that must stay distinct:');
for (const [a, b] of bad) console.log(`  ${a.padEnd(15)} ~ ${b.padEnd(16)} ${jac(a, b).toFixed(2)}`);

// Regression: does lowering the threshold change answers for real questions?
const base = new Retriever(entries);
const baseTop = entries.map((e) => base.search(e.engQuery, 1)[0]?.entry.id);
console.log('\nregression on 1500 corpus questions (retriever built with current threshold):');
let same = 0;
entries.forEach((e, i) => { if (baseTop[i] === e.id) same++; });
console.log(`  entry@1 ${(same / entries.length * 100).toFixed(1)}%`);
