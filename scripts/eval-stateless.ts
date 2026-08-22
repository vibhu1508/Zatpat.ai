/**
 * With no conversation state, every turn must resolve on its own — and a
 * context-free follow-up must be refused rather than inherit a previous answer.
 */
import { readFile } from 'node:fs/promises';
import { AnswerEngine } from '../src/lib/answer.ts';
import { DEFAULT_GUARDRAILS } from '../src/lib/pipeline.ts';
import type { Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const eng = new AnswerEngine(entries);
const ask = (q: string) => eng.answer({ query: q, guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });

// 1. real questions still answered
let ok = 0, refused = 0;
for (const e of entries) {
  const r = ask(e.engQuery);
  if (!r.trace.grounded) refused++;
  else if (r.hits[0]?.entry.id === e.id) ok++;
}
console.log(`in-corpus (${entries.length})    answered correctly ${(ok / entries.length * 100).toFixed(1)}%   wrongly refused ${(refused / entries.length * 100).toFixed(1)}%`);

// 2. asking the same thing twice must give the same answer
let stable = 0;
for (const e of entries.slice(0, 400)) {
  if (ask(e.engQuery).english === ask(e.engQuery).english) stable++;
}
console.log(`repeat determinism (400)  identical answer ${(stable / 400 * 100).toFixed(1)}%`);

// 3. follow-ups must refuse, not inherit
const fu = ['what does it mean', 'why is that', 'tell me more', 'who are we talking about here',
            'which country are we talking about', 'so what is its function'];
const answered = fu.filter((q) => ask(q).trace.grounded);
console.log(`context-free follow-ups   answered ${answered.length}/${fu.length}${answered.length ? ' -> ' + answered.join(', ') : '  (all refused)'}`);

// 4. no bleed: a previous turn must not change the next answer
let bled = 0;
for (const e of entries.slice(0, 200)) {
  const alone = ask('what is a radical neck').english;
  ask(e.engQuery);
  if (ask('what is a radical neck').english !== alone) bled++;
}
console.log(`state bleed (200 probes)  answers changed by prior turns: ${bled}`);
