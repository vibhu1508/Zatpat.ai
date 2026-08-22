/** The exact three turns from the reported conversation, before and after. */
import { readFile } from 'node:fs/promises';
import { AnswerEngine } from '../src/lib/answer.ts';
import { DEFAULT_GUARDRAILS } from '../src/lib/pipeline.ts';
import type { Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const eng = new AnswerEngine(entries);

const turns = [
  'What is a radical neck?',
  'So what is its function? What does it actually mean?',
  'Who are we talking about here?',
];

const history: string[] = [];
for (const q of turns) {
  const r = eng.answer({ query: q, history: [...history], guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
  history.push(q);
  console.log(`\nQ  "${q}"`);
  if (r.resolvedQuery !== q) console.log(`   resolved as: "${r.resolvedQuery.slice(0, 78)}…"`);
  console.log(`   grounded: ${r.trace.grounded}`);
  console.log(`   A  ${r.english.slice(0, 100)}`);
}
