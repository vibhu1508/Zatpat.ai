/**
 * Does carrying the previous turn into retrieval fix context-free follow-ups?
 *
 * Simulated two-turn conversations: turn 1 is a real corpus question, turn 2 is
 * a pronoun-laden follow-up that on its own strips to almost nothing. Correct
 * behaviour is for turn 2 to stay on the same entry as turn 1.
 */
import { readFile } from 'node:fs/promises';
import { Retriever, type Entry } from '../src/lib/retriever.ts';
const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8')) as { entries: Entry[] };
const r = new Retriever(entries);

const FOLLOWUPS = [
  'what does it mean', 'why is that', 'tell me more about it', 'how does it work',
  'so what is its function', 'is it important', 'can you explain that',
  'what about it', 'and then', 'who are we talking about here',
];

let aloneOk = 0, mergedOk = 0, total = 0, mergedRefused = 0;
const sample = entries.slice(0, 300);

for (let i = 0; i < sample.length; i++) {
  const e = sample[i];
  const fu = FOLLOWUPS[i % FOLLOWUPS.length];
  total++;

  // Turn 2 alone — the current behaviour.
  const alone = r.search(fu, 1)[0];
  if (alone?.entry.id === e.id) aloneOk++;

  // Turn 2 with turn 1 prepended.
  const merged = r.search(`${e.engQuery} ${fu}`, 1)[0];
  if (merged?.entry.id === e.id) mergedOk++;
  if (!merged || merged.strength < 2.5) mergedRefused++;
}

const pct = (n: number) => ((n / total) * 100).toFixed(1).padStart(5);
console.log(`simulated follow-ups: ${total}`);
console.log(`  turn 2 alone   stays on topic ${pct(aloneOk)}%   <- current behaviour`);
console.log(`  turn 2 merged  stays on topic ${pct(mergedOk)}%   <- with previous turn carried`);
console.log(`  merged then refused by strength gate: ${pct(mergedRefused)}%`);
