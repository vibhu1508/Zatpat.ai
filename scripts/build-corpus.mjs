/**
 * ingestion_ready.json → public/corpus.json
 *
 * The raw file is 284 rows: 60 questions × 4 languages, with the same English
 * passages repeated once per language. Collapsing to one entry per question —
 * English passages deduped, native answers keyed by language — cuts the payload
 * by roughly 4× and gives the retriever a flat list to score.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const SRC = new URL('../../ingestion_ready.json', import.meta.url);
const OUT = new URL('../public/corpus.json', import.meta.url);

const rows = JSON.parse(await readFile(SRC, 'utf8'));

/** @type {Map<number, any>} */
const byQuery = new Map();

for (const r of rows) {
  let e = byQuery.get(r.query_id);
  if (!e) {
    e = {
      id: r.query_id,
      type: r.query_type,
      // Source queries carry stray leading punctuation ('. what is…', '+where is…').
      engQuery: r.eng_query.replace(/^[^\p{L}\p{N}]+/u, '').trim(),
      engAnswer: r.eng_answer,
      passages: [],
      native: {},
    };
    byQuery.set(r.query_id, e);
  }
  // Native query + answer, one per language.
  e.native[r.lang] = { query: r.native_query, answer: r.native_answer };
  // English passages repeat across languages — keep the first of each.
  if (!e.passages.some((p) => p.text === r.eng_passage)) {
    e.passages.push({ text: r.eng_passage, idx: r.passage_index, docId: r.doc_id });
  }
}

const entries = [...byQuery.values()].sort((a, b) => a.id - b.id);

await mkdir(new URL('../public/', import.meta.url), { recursive: true });
await writeFile(OUT, JSON.stringify({ entries }, null, 0));

const raw = (await readFile(SRC)).length;
const out = (await readFile(OUT)).length;
console.log(`rows        ${rows.length}`);
console.log(`entries     ${entries.length}`);
console.log(`passages    ${entries.reduce((a, e) => a + e.passages.length, 0)}`);
console.log(`languages   ${[...new Set(rows.map((r) => r.lang))].join(', ')}`);
console.log(`size        ${(raw / 1024).toFixed(0)} KB -> ${(out / 1024).toFixed(0)} KB`);
