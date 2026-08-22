/**
 * Can it now answer things the 1,500 curated questions never asked?
 *
 * The passages carry far more than the questions do. This probes them: take a
 * distinctive sentence out of a passage, ask about it using its rare terms, and
 * check the answer comes back from that same passage rather than being refused.
 */
import { readFile } from 'node:fs/promises';
import { AnswerEngine } from '../src/lib/answer.ts';
import { DEFAULT_GUARDRAILS } from '../src/lib/pipeline.ts';
import type { Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const eng = new AnswerEngine(entries);

let answered = 0, fromPassage = 0, refused = 0, n = 0;
for (const e of entries.slice(0, 300)) {
  // A non-gold passage: content the curated question does not address.
  const p = e.passages.find((x) => !x.gold);
  if (!p) continue;
  const sents = p.text.split(/(?<=[.!?])\s+/).filter((s) => s.length > 70);
  if (!sents.length) continue;
  const probe = sents[0].split(/\s+/).slice(0, 12).join(' ');
  n++;
  const r = eng.answer({ query: probe, guardrails: DEFAULT_GUARDRAILS, languageCode: 'en-IN' });
  if (!r.trace.grounded) { refused++; continue; }
  answered++;
  if (r.english !== r.hits[0]?.entry.engAnswer) fromPassage++;
}
const pct = (x: number) => ((x / n) * 100).toFixed(1).padStart(5);
console.log(`probes drawn from non-curated passage content: ${n}`);
console.log(`  answered            ${pct(answered)}%`);
console.log(`  answered FROM a passage sentence ${pct(fromPassage)}%   <- new capability`);
console.log(`  refused             ${pct(refused)}%`);
