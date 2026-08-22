import { readFile } from 'node:fs/promises';
import { AnswerEngine } from '../src/lib/answer.ts';
import { Retriever, tokenize, type Entry } from '../src/lib/retriever.ts';
import { DEFAULT_GUARDRAILS } from '../src/lib/pipeline.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const eng = new AnswerEngine(entries);
const r = new Retriever(entries);

console.log('── BUG 1: same question refused, then answered ──');
const q1 = 'Where is the sciatic nerve located?';
const target = entries.find((e) => e.engQuery.includes('siatic'))!;
console.log(`corpus stores : "${target.engQuery}"`);
console.log(`user said     : "${q1}"`);
console.log(`corpus tokens : [${tokenize(target.engQuery).join(', ')}]`);
console.log(`query tokens  : [${tokenize(q1).join(', ')}]`);
const h = r.search(q1, 2)[0];
console.log(`top hit: "${h?.entry.engQuery}"  strength ${h?.strength.toFixed(2)} terms ${h?.terms}`);

const hist: string[] = [];
for (let i = 1; i <= 3; i++) {
  const res = eng.answer({ query: q1: [...hist], guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
  hist.push(q1);
  console.log(`  turn ${i}: grounded=${res.trace.grounded}  "${res.english.slice(0, 52)}"`);
}

console.log('\n── BUG 2: follow-up returns the same answer ──');
const indo = entries.find((e) => /indonesia/i.test(e.engQuery));
if (indo) {
  console.log(`entry: "${indo.engQuery}"`);
  console.log(`gold answer: "${indo.engAnswer}"`);
  const res = eng.answer({ query: 'Which country are we talking about?': [indo.engQuery], guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
  console.log(`follow-up "Which country are we talking about?" -> "${res.english}"`);
  console.log(`\nbut the passages DO contain the answer:`);
  for (const p of indo.passages.slice(0, 2)) console.log(`  - ${p.text.slice(0, 110)}…`);
}
