import { readFile } from 'node:fs/promises';
import { Retriever, tokenize, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const r = new Retriever(entries);

const turns = [
  'What is a radical neck?',
  'So what is its function? What does it actually mean?',
  'Who are we talking about here?',
];

for (const q of turns) {
  const h = r.search(q, 3);
  const top = h[0];
  console.log(`\nQ  "${q}"`);
  console.log(`   content terms after stopwords: [${tokenize(q).join(', ')}]`);
  if (!top) { console.log('   NO HITS'); continue; }
  console.log(`   -> matched entry ${top.entry.id}: "${top.entry.engQuery}"`);
  console.log(`      score ${top.score.toFixed(1)}  coverage ${top.coverage.toFixed(2)}  concentration ${top.concentration.toFixed(2)}`);
  console.log(`      gate (needs >=0.70 both): ${top.coverage >= 0.7 && top.concentration >= 0.7 ? 'PASSES -> answers' : 'REFUSES'}`);
  console.log(`      answer: ${top.entry.engAnswer.slice(0, 90)}`);
  console.log(`      runners-up: ${h.slice(1).map((x) => `"${x.entry.engQuery.slice(0, 34)}" (${x.score.toFixed(0)})`).join(' | ')}`);
}

// What if the follow-ups carried the first turn's context?
console.log('\n\n── with the previous turn prepended ─────────────────────');
let prev = turns[0];
for (const q of turns.slice(1)) {
  const merged = `${prev} ${q}`;
  const h = r.search(merged, 1)[0];
  console.log(`\nQ  "${q}"`);
  console.log(`   merged -> "${merged.slice(0, 70)}…"`);
  console.log(`   -> "${h?.entry.engQuery}"  cov ${h?.coverage.toFixed(2)} con ${h?.concentration.toFixed(2)}`);
}
