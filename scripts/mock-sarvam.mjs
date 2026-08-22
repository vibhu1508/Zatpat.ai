/**
 * A stand-in for wss://api.sarvam.ai/speech-to-text-realtime/ws
 *
 * Implements the documented saaras:v3-realtime event contract so the whole
 * voice path — capture, PCM16 framing, base64, socket, partials, final, VAD
 * segmentation, retrieval, answer — can be exercised end to end without an API
 * key. It validates what the client sends rather than just accepting it, so a
 * malformed frame fails here instead of silently in production.
 *
 *   node scripts/mock-sarvam.mjs [--question "..."] [--lang hi-IN]
 */
import { WebSocketServer } from 'ws';
import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const PORT = Number(argOf('port', 8787));
const LANG = argOf('lang', 'hi-IN');

// Default to a real question from the corpus so retrieval has something to find.
const { entries } = JSON.parse(
  await readFile(new URL('../public/corpus.json', import.meta.url), 'utf8'),
);
const QUESTION = argOf('question', entries[0].engQuery);

const wss = new WebSocketServer({ port: PORT, path: '/speech-to-text-realtime/ws' });
console.log(`mock sarvam listening on ws://127.0.0.1:${PORT}/speech-to-text-realtime/ws`);
console.log(`  will resolve every utterance to: "${QUESTION}"  (${LANG})`);

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, 'http://x');
  const q = Object.fromEntries(url.searchParams);
  const key = req.headers['api-subscription-key'];

  console.log('\nconnection');
  console.log('  key header    ', key ? `present (${String(key).slice(0, 4)}…)` : 'MISSING');
  console.log('  model         ', q.model);
  console.log('  mode          ', q.mode);
  console.log('  language_code ', q.language_code);
  console.log('  encoding      ', q.encoding, q.sample_rate, 'Hz');

  // Validate the query contract the client claims to speak.
  const problems = [];
  if (q.model !== 'saaras:v3-realtime') problems.push(`model=${q.model}`);
  if (q.mode !== 'translate') problems.push(`mode=${q.mode}`);
  if (q.encoding !== 'linear16') problems.push(`encoding=${q.encoding}`);
  if (q.sample_rate !== '16000') problems.push(`sample_rate=${q.sample_rate}`);
  if (problems.length) console.log('  ✗ UNEXPECTED  ', problems.join(', '));

  const send = (o) => ws.readyState === ws.OPEN && ws.send(JSON.stringify(o));
  send({ event: 'session.begin', request_id: 'mock-' + Date.now(), config: q });

  let frames = 0;
  let bytes = 0;
  let started = false;
  let finalised = false;
  let badFrames = 0;
  let binaryFrames = 0;

  const finalise = () => {
    if (finalised) return;
    finalised = true;
    send({ event: 'vad.speech_end', utterance_idx: 0, confidence: '0.9' });
    send({
      event: 'transcript.final',
      utterance_idx: 0,
      text: QUESTION,
      language: LANG,
      language_confidence: '0.97',
    });
    console.log(
      `  final sent — ${frames} frames, ${bytes} bytes, ${badFrames} malformed` +
        (binaryFrames ? `, ${binaryFrames} BINARY (must be text — these are ignored)` : ''),
    );
  };

  ws.on('message', (raw, isBinary) => {
    // Sarvam's protocol is JSON text. A proxy that forwards Buffers naively
    // turns these into binary frames, which the real API silently ignores —
    // so this must be an error here, not tolerated by calling toString().
    if (isBinary) {
      binaryFrames++;
      return;
    }
    let msg;
    try {
      msg = JSON.parse(raw.toString());
    } catch {
      badFrames++;
      return;
    }

    if (msg.event === 'audio_input') {
      // The client must send base64 of PCM16 — 320 samples = 640 bytes/frame.
      const buf = Buffer.from(msg.audio ?? '', 'base64');
      if (!msg.audio || buf.length === 0 || buf.length % 2 !== 0) badFrames++;
      frames++;
      bytes += buf.length;

      if (!started && frames >= 3) {
        started = true;
        send({ event: 'vad.speech_start', utterance_idx: 0, confidence: '0.95' });
        console.log('  speech_start');
      }
      // Dribble out partials the way a streaming model would.
      if (started && frames % 12 === 0 && !finalised) {
        const words = QUESTION.split(' ');
        const n = Math.min(words.length, Math.floor(frames / 12));
        send({ event: 'transcript.partial', utterance_idx: 0, text: words.slice(0, n).join(' ') });
      }
      // ~1.2 s of audio, then resolve the utterance.
      if (started && frames >= 60) finalise();
    } else if (msg.event === 'ping') {
      send({ event: 'pong' });
    } else if (msg.event === 'end') {
      // Push-to-talk release: still produce a final for the audio we received.
      finalise();
      send({ event: 'session.end', request_id: 'mock', total_utterances: 1 });
    }
  });

  ws.on('close', () =>
    console.log(
      `  closed — ${frames} frames, ${bytes} bytes` +
        (binaryFrames ? `, ${binaryFrames} BINARY frames rejected` : ''),
    ),
  );
});
