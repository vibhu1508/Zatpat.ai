# Zatpat.ai

Voice-native retrieval over `ingestion_ready.json`. Ask a question out loud in
Hindi, Marathi, Tamil or Sanskrit; Sarvam's `saaras:v3-realtime` translates the
speech to English as you talk; BM25 retrieves against the corpus; the answer
comes back in the language you asked it.

**Measured: 184 ms from end of speech to answer** (Transcribe 183.2, everything
else 1.0 combined). Retrieval is 0.4 ms, recall@1 is 100%.

```bash
npm install
cp .env.example .env          # add your SARVAM_API_KEY
npm run corpus                # ingestion_ready.json -> public/corpus.json
npm run dev                   # http://localhost:5173
npm run eval                  # retrieval accuracy + latency
```

## The API key

`SARVAM_API_KEY` is deliberately **not** `VITE_`-prefixed. Sarvam's documented
browser path is an `api-subscription-key.<key>` WebSocket subprotocol, which
would ship the key to every visitor. Instead the Vite dev server proxies the
upgrade at `/sarvam/*` and attaches the key as an `API-SUBSCRIPTION-KEY`
header ([vite.config.ts](vite.config.ts)), so it stays server-side. Deploying
this means standing up the same proxy in production — the browser must never
hold the key.

## The corpus

Built from [MSMARCO-XI](https://huggingface.co/datasets/ai4bharat/MSMARCO-XI) —
MS MARCO translated into 14 Indic languages, 11.45M rows, 55.6 GB. The repo is
per-language parquet, so only the four in scope are needed, and only the
validation split (~0.44 GB each).

```bash
mkdir -p data && cd data
for L in hin mar san tam; do
  curl -L -O "https://huggingface.co/datasets/ai4bharat/MSMARCO-XI/resolve/main/validation/${L}val.parquet"
done
cd .. && npm run corpus
```

[scripts/build-corpus.py](scripts/build-corpus.py) takes 1,500 queries →
**14,988 English passages, 1,567 of them gold**, with native query and answer in
all four languages. English passages are read once from the primary language
file rather than four times — every language file repeats them verbatim.

`is_selected` from MS MARCO is carried through as `gold`, which is what makes
this a benchmark with relevance labels rather than a sample.

## Retrieval

[retriever.ts](src/lib/retriever.ts) — BM25, each entry scored on its English
question (weighted 2.1x) and its best-matching passage.

```
english      entry@1  99.9%   entry@5  99.9%    0.95 ms   p95 1.79 ms
hi/mr/sa/ta  entry@1   0.5%                     <- lexical cannot cross scripts
```

That second line is the whole argument for a dense index. BM25 against English
passages scores essentially **zero** for a native-language query — not degraded,
zero. Cross-lingual retrieval needs an embedding.

### Cross-lingual, dense

`npm run eval:dense` with bge-m3 over the same 14,988 passages:

```
lang   entry@1  entry@5   gold@1   gold@5  gold@10
en      97.0%   99.8%    44.5%   91.6%   98.5%
hi      80.1%   89.3%    33.1%   72.5%   81.3%
mr      77.6%   87.3%    31.9%   71.1%   80.0%
ta      65.5%   80.6%    26.7%   62.5%   71.3%
sa      58.0%   71.9%    20.9%   53.4%   60.9%
```

Run it without `NO_PREFIX=1` and every cross-lingual number drops ~6 points —
`query:`/`passage:` prefixes are an E5 convention that BGE-M3 is not trained on.

**Translation is worth 17-39 points.** A translated English query retrieves at
97%; the same question in its own language retrieves at 58-80%. That is the
central trade in the latency plan: waiting for Sarvam's translated final costs
167-472 ms and buys real accuracy.

## The refusal gate

Getting this wrong is what makes a demo embarrassing, so it is measured
separately (`npm run eval:guard`).

**Coverage was the wrong signal and has been removed.** It asks "do these words
appear anywhere in the corpus", which stops discriminating at 15k passages —
every common word appears somewhere. At its original 0.5 floor, 11 of 16
out-of-corpus questions were answered.

The gate is now BM25 score normalised by the query's IDF mass (`strength`),
plus a dominance check for single-term queries:

```
in-corpus (1500)        answered correctly  95.5%   wrongly refused  4.4%
off-topic (10)          wrongly answered       1
follow-up, no history   wrongly answered       0
follow-up, with history stayed on topic     100.0%
```

## Conversation

A follow-up strips to almost nothing after stopword removal, and then retrieves
noise:

```
"So what is its function? What does it actually mean?"  -> [function]
   -> "correctional functions" -> answers about prison administration
```

Measured over 300 simulated two-turn conversations, **0%** of follow-ups stayed
on topic. [answer.ts](src/lib/answer.ts) now retries thin queries with the
previous turns prepended, which takes that to **100%**.

Single-term queries are not refused outright — 254 of the 1,500 corpus
questions are genuine one-concept lookups. They are separated by dominance: a
rare term stands clear of the runner-up (median 1.00), a follow-up remnant like
"function" does not (median 0.01).

## Speech

[sarvam.ts](src/lib/sarvam.ts) speaks the documented
[realtime contract](https://docs.sarvam.ai/api-reference/speech-to-text/transcribe/realtime/ws):

```
wss://api.sarvam.ai/speech-to-text-realtime/ws
  ?model=saaras:v3-realtime&mode=translate&language_code=hi-IN
  &encoding=linear16&sample_rate=16000&stream_type=fast
```

Audio is captured through an `AudioContext` constructed at 16 kHz, so the
browser resamples and no manual downsampling is needed. An
[AudioWorklet](public/pcm-worklet.js) batches 128-sample render quanta into
20 ms PCM16 frames on the audio thread. The sphere's analyser and the socket
share one MediaStream and one AudioContext.

**Pick your language in the bar rather than leaving it on auto.** It narrows
saaras's acoustic search — Tamil measured 175 ms explicit vs 224 ms on auto —
and it is the *only* way to know which language to answer in: with
`mode=translate` the transcript's `language` field reports the output language,
which is English by definition, and with an explicit `language_code` the field
is omitted entirely.

## Testing without a key

[scripts/mock-sarvam.mjs](scripts/mock-sarvam.mjs) implements the documented
event contract and validates what the client sends rather than just accepting
it. Point the proxy at it with `SARVAM_WS_TARGET=http://127.0.0.1:8787`.

## Getting under 200 ms

Transcription is 99% of the budget; everything else is already ~1 ms. The
levers are all on the speech side: `stream_type=fast` (already on), a lower
`silence_duration_ms` than the current 500, and answering from the last
`transcript.partial` instead of waiting for `transcript.final`.

## The two pages


**Landing** (`/`) — what the system is made of: the nine pipeline stages and
their latency budgets, the five chunking strategies and how traffic is routed
between them, and the guardrails.

**Console** (`/chat`) — the working interface.

- **Centre**: a sphere of square glowing pixels. At rest it is a still shell.
  While you speak it opens — each pixel is bound to one frequency band and
  pushes outward with that band's energy — and springs back when you stop.
  Blue while you talk, formula red while the agent answers.
- **Recording**: click the button and an energy gate detects the end of your
  utterance on its own, or hold `space` and release. A typed fallback sits at
  the bottom left for testing without a microphone.
- **Below the sphere**: the live caption. Your words as they are transcribed;
  then the answer, with the word currently being spoken picked out in white.
- **Left rail**: session memory — every turn, with its latency, routed
  strategy and `k`. Click a turn to open its full trace.
- **Top right**: the latency panel, filling in stage by stage as the turn runs,
  measured against an 840 ms budget. The slowest stage is marked in red.
- **Top left tabs**: chunking/retrieval and guardrails, each a sheet showing
  what the last turn actually did. Routing is shown, not configurable —
  it is decided by the router. Guardrails are toggleable, and you can add
  your own with a scope and an action.

## The hand-off

The sphere is mounted once in [App.tsx](src/App.tsx), above the router, so it
survives navigation — there is exactly one WebGL context for the whole app,
and it is never torn down. Each page publishes an empty *slot* rectangle
([sphereSlot.ts](src/lib/sphereSlot.ts)) saying where and how big the sphere
should be; [SphereLayer](src/components/SphereLayer.tsx) measures the active
slot and glides to it.

The canvas is a fixed 780 px square that never resizes. Moving and growing it
is a pure CSS transform, so a page transition costs no WebGL work at all — no
reallocated render targets, no dropped frames. 780 is the largest pose either
page asks for, so every other pose scales *down* and the pixels stay crisp.

Opening the console is a single continuous morph, not a sequence of steps.
On click the landing page publishes a slot that is already *exactly* where the
console will put the sphere — same centre, same size, computed from rail widths
shared as CSS tokens ([global.css](src/styles/global.css)) rather than guessed.
So the sphere begins growing on the first frame after the click and never
stops: the page text fades out over it, the route changes at 260 ms while the
sphere is still mid-flight, and the console's frame fades up around it in a
stagger. A single impulse fires at the click, scattering the shell and letting
it re-form exactly as the motion settles. Going back runs the same in reverse.

Three details make it read as one motion rather than several:

- **One impulse per transition.** The console deliberately does not fire its
  own — two pulses read as the shell blowing apart, re-forming, and blowing
  apart again.
- **The glide is armed before the DOM moves.** The layer samples slot
  rectangles on its own rAF loop, so if the slot moves first the layer can
  observe the new position while still in snap mode and jump straight to it.
- **A near-identical target is treated as a correction, not a move.** Without
  that, a few pixels of mismatch on arrival would creep across most of a
  second.

If the hero orb is scrolled out of view when you click, there is nothing on
screen to morph from, so the sphere is parked at the destination instantly —
behind the still-opaque section bands — and grows from there, with the bands
fading away to reveal it mid-grow.

Because the layer is fixed at the root, the panels that need to hide it —
the memory rail, the latency panel, the top bar, the landing's lower
sections — carry their own opaque ground rather than relying on `overflow`.

## How the sphere works

[src/components/PixelSphere.tsx](src/components/PixelSphere.tsx)

Both the microphone and the agent's voice write into one shared
[VoiceField](src/lib/voiceField.ts): 28 log-spaced band energies plus a
broadband level. The renderer only reads that, so it never needs to know who
is talking.

Those 28 floats are uploaded each frame as a 28×1 data texture, which the
vertex shader samples per point — one small texture upload per frame instead
of any per-point work on the CPU. 6,000 points sit on a Fibonacci sphere,
each assigned a band by latitude. Displacement is radial (the shell inflates)
plus tangential along a per-point random axis (so the surface *separates*
rather than just scaling), and the open/close transition is a critically
damped spring, which is what makes the return read as settling rather than
snapping. Points are drawn as hard-edged squares under additive blending with
a bloom pass over the top.

The agent's turn has no analysable audio — `SpeechSynthesis` output can't be
tapped with an `AnalyserNode` — so its bands are modelled instead: word
boundary events drive a syllable envelope shaped by a fixed vocal-tract tilt.
It stays exact to the words actually being spoken.

## Wiring a backend

Replace `run()` in [src/lib/pipeline.ts](src/lib/pipeline.ts). It takes a
query and reports stage timings through `onStages` as they land; return the
answer text and a `Trace`. Nothing else in the UI needs to change.
