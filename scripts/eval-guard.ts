/** End-to-end gate behaviour: real questions answered, junk refused. */
import { readFile } from 'node:fs/promises';
import { AnswerEngine } from '../src/lib/answer.ts';
import { DEFAULT_GUARDRAILS } from '../src/lib/pipeline.ts';
import type { Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const eng = new AnswerEngine(entries);
// The engine carries session state (cache + current topic), so each simulated
// conversation must start clean or results leak between them.
const ask = (q: string: string[] = [], fresh = true) => {
  if (fresh)  return eng.answer({ query: q, guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
};

// 1. Real questions must be answered, and answered correctly.
let ok = 0, refused = 0;
for (const e of entries) {
  const r = ask(e.engQuery);
  if (!r.trace.grounded) refused++;
  // Correct means it resolved to the right entry — the reply may legitimately
  // be a passage sentence rather than the curated answer.
  else if (r.hits[0]?.entry.id === e.id) ok++;
}
console.log(`in-corpus (${entries.length})   answered correctly ${((ok/entries.length)*100).toFixed(1)}%   wrongly refused ${((refused/entries.length)*100).toFixed(1)}%`);

// 2. Out-of-corpus must be refused, with no conversation to lean on.
const off = ['what is the weather in mumbai today','play some music','what time does my train leave',
  'book me a flight to singapore','call my mother please','what is my bank account balance',
  'set an alarm for seven am','order a pizza','turn off the lights','what is on my calendar'];
const offAnswered = off.filter((q) => ask(q).trace.grounded);
console.log(`off-topic (${off.length})       wrongly answered ${offAnswered.length}   ${offAnswered.length ? '-> ' + offAnswered.join(', ') : ''}`);

// 3. A follow-up with NO history must refuse rather than invent.
const fu = ['what does it mean','why is that','who are we talking about here','tell me more'];
const fuAnswered = fu.filter((q) => ask(q).trace.grounded);
console.log(`follow-up, no history (${fu.length})  wrongly answered ${fuAnswered.length}   ${fuAnswered.length ? '-> ' + fuAnswered.join(', ') : ''}`);

// 4. The same follow-ups WITH history must stay on the previous topic.
// "Stayed on topic" means it resolved to the same entry — the reply is
// expected to differ from the curated answer, because a follow-up asks
// something the curated answer does not address.
let stayed = 0;
for (const e of entries.slice(0, 200)) {
  for (const f of fu) {
    eng.answer({ query: e.engQuery, guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
    const r = eng.answer({ query: f: [e.engQuery], guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
    if (r.trace.grounded && r.hits[0]?.entry.id === e.id) stayed++;
  }
}
console.log(`follow-up, with history      stayed on topic ${((stayed/(200*fu.length))*100).toFixed(1)}%`);
