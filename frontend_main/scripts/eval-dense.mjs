/**
 * Cross-lingual dense retrieval over the MSMARCO-XI slice.
 *
 * The question this answers: can a native-language query find its English
 * passage with no translation step? BM25 scores ~0 across scripts, so if dense
 * retrieval does not work here, the whole "skip the translated final" plan is
 * dead and the 167–472 ms stays in the critical path.
 *
 * Embeddings are cached to disk — re-running the metrics should not re-run the
 * model.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const MODEL = process.env.EMB_MODEL ?? 'bge-m3';
/**
 * `query:` / `passage:` prefixes are an E5 convention. BGE-M3 is trained
 * without them and prefixing can actively hurt it, so this is a flag rather
 * than an assumption — the control matters more than the headline number.
 */
const PREFIX = process.env.NO_PREFIX ? { q: '', p: '' } : { q: 'query: ', p: 'passage: ' };
const TAG = process.env.NO_PREFIX ? '_np' : '';
const DIM = 1024;
const BATCH = 128;
const CACHE = new URL('../.cache/', import.meta.url);

const { entries } = JSON.parse(await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8'));
await mkdir(CACHE, { recursive: true });

async function embedBatch(texts) {
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch('http://127.0.0.1:11434/api/embed', {
        method: 'POST',
        body: JSON.stringify({ model: MODEL, input: texts }),
      });
      if (!r.ok) throw new Error((await r.text()).slice(0, 150));
      return (await r.json()).embeddings;
    } catch (e) {
      if (attempt >= 2) throw e;
    }
  }
}

/** Embed with an on-disk cache; returns a Float32Array of n*DIM, L2-normalised. */
async function embedAll(name, texts) {
  const file = new URL(`${name}.f32`, CACHE);
  if (existsSync(file)) {
    const buf = await readFile(file);
    if (buf.length === texts.length * DIM * 4) {
      process.stdout.write(`  ${name}: cached\n`);
      return new Float32Array(buf.buffer, buf.byteOffset, texts.length * DIM);
    }
  }
  const out = new Float32Array(texts.length * DIM);
  const t0 = performance.now();
  for (let i = 0; i < texts.length; i += BATCH) {
    const vecs = await embedBatch(texts.slice(i, i + BATCH));
    vecs.forEach((v, j) => {
      let n = 0;
      for (let d = 0; d < DIM; d++) n += v[d] * v[d];
      n = Math.sqrt(n) || 1;
      const off = (i + j) * DIM;
      for (let d = 0; d < DIM; d++) out[off + d] = v[d] / n;
    });
    const done = Math.min(i + BATCH, texts.length);
    process.stdout.write(`\r  ${name}: ${done}/${texts.length}  ${((performance.now() - t0) / 1000).toFixed(0)}s   `);
  }
  process.stdout.write('\n');
  await writeFile(file, Buffer.from(out.buffer));
  return out;
}

// ── index: every English passage ──────────────────────────────────
const passages = [];
for (const e of entries) {
  e.passages.forEach((p, i) => passages.push({ entryId: e.id, i, gold: !!p.gold, text: p.text }));
}
console.log(`indexing ${passages.length.toLocaleString()} English passages with ${MODEL}${process.env.NO_PREFIX ? ' (no prefixes)' : ' (E5 prefixes)'}`);
const PV = await embedAll(`passages${TAG}`, passages.map((p) => PREFIX.p + p.text));

// ── queries, English + four native ────────────────────────────────
const LANGS = ['hi', 'mr', 'sa', 'ta'];
const queries = { en: entries.map((e) => e.engQuery) };
for (const l of LANGS) queries[l] = entries.map((e) => e.native[l]?.query ?? '');
const QV = {};
for (const [l, qs] of Object.entries(queries)) QV[l] = await embedAll(`q_${l}${TAG}`, qs.map((q) => PREFIX.q + q));

// ── brute-force cosine, exact (no ANN approximation to confound it) ─
function search(qv, qOff, k) {
  const best = [];
  for (let p = 0; p < passages.length; p++) {
    let s = 0;
    const off = p * DIM;
    for (let d = 0; d < DIM; d++) s += qv[qOff + d] * PV[off + d];
    if (best.length < k) {
      best.push({ p, s });
      if (best.length === k) best.sort((a, b) => b.s - a.s);
    } else if (s > best[k - 1].s) {
      best[k - 1] = { p, s };
      for (let i = k - 1; i > 0 && best[i].s > best[i - 1].s; i--) [best[i], best[i - 1]] = [best[i - 1], best[i]];
    }
  }
  return best;
}

console.log('\nlang   entry@1  entry@5   gold@1   gold@5  gold@10    search');
for (const lang of ['en', ...LANGS]) {
  let e1 = 0, e5 = 0, g1 = 0, g5 = 0, g10 = 0, n = 0;
  const times = [];
  entries.forEach((e, qi) => {
    if (!queries[lang][qi]) return;
    n++;
    const t = performance.now();
    const hits = search(QV[lang], qi * DIM, 10);
    times.push(performance.now() - t);
    const ent = hits.map((h) => passages[h.p].entryId);
    const gold = hits.map((h) => passages[h.p].gold && passages[h.p].entryId === e.id);
    if (ent[0] === e.id) e1++;
    if (ent.slice(0, 5).includes(e.id)) e5++;
    if (gold[0]) g1++;
    if (gold.slice(0, 5).some(Boolean)) g5++;
    if (gold.some(Boolean)) g10++;
  });
  times.sort((a, b) => a - b);
  const pct = (x) => ((x / n) * 100).toFixed(1).padStart(6);
  console.log(`${lang.padEnd(5)} ${pct(e1)}% ${pct(e5)}%  ${pct(g1)}% ${pct(g5)}% ${pct(g10)}%   ${times[Math.floor(times.length / 2)].toFixed(1)} ms`);
}
