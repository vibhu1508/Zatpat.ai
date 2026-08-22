# Deploying — free

**Frontend on Vercel, WebSocket proxy on Render.** Both free tiers. The
Cloudflare Pages function in `functions/` is an alternative to Render for the
proxy and can be ignored or deleted.

## Why a proxy is required at all

A browser cannot set headers on a WebSocket handshake. Sarvam's documented
client-side path is the `api-subscription-key.<key>` subprotocol, which puts
your key in the bundle for every visitor to read. A server can set the header,
so the key stays server-side.

The Vite proxy does this in development. It does not exist in production —
[`server/proxy.mjs`](server/proxy.mjs) replaces it.

## 1. Proxy on Render

Push the repo, then **New > Blueprint** and point it at
[`render.yaml`](render.yaml). Set two environment variables in the dashboard:

| variable | value |
|---|---|
| `SARVAM_API_KEY` | your key — encrypted, never committed |
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

`ALLOWED_ORIGINS` matters here in a way it does not on Cloudflare. The proxy is
on a different origin from the app, and it holds a paid API key. Without an
allowlist, anyone who finds the URL can spend your Sarvam quota. Rejected
origins are refused **before** the handshake completes.

Note the free tier's behaviour and decide if it suits you: the service **sleeps
after ~15 minutes idle**, and the next connection waits 30-60 s for it to wake.
For a voice app that means the first question of a session hangs. There is also
a 750 instance-hour monthly allowance across all free services.

## 2. Frontend on Vercel

Import the repo. Vercel detects Vite; [`vercel.json`](vercel.json) supplies the
SPA rewrite and cache headers. Set one environment variable:

| variable | value |
|---|---|
| `VITE_SARVAM_WS_URL` | `wss://zatpat-sarvam-proxy.onrender.com/sarvam` |

`wss://`, not `https://`. Without this the app looks for the proxy on its own
origin — correct for local development and for Cloudflare, wrong for a split
deployment.

## Payload

```
corpus.json   9.1 MB raw  ->  2.4 MB gzipped   (Vercel compresses automatically)
app js         760 KB     ->  215 KB
css             28 KB     ->    6 KB
```

2.4 MB on first visit is the corpus, and it is the one number worth attention.
It is cached afterwards, but on a slow connection it delays the first question.
Either ship fewer entries (`--queries` in `build-corpus.py`) or move retrieval
behind the backend so the browser never downloads it.

## Verifying before you deploy

The proxy runs against the mock Sarvam server, which validates what the client
sends rather than just accepting it:

```bash
node scripts/mock-sarvam.mjs &
SARVAM_API_KEY=test-key \
SARVAM_WS_ORIGIN=ws://127.0.0.1:8787 \
ALLOWED_ORIGINS=https://example.vercel.app \
  npm run proxy
```

A passing run shows the mock reporting `key header present`, the query
parameters forwarded intact, `60 frames, 0 malformed`, and the full
`session.begin -> vad.speech_start -> transcript.partial -> transcript.final`
sequence. Connecting from an origin outside the allowlist is refused with a 403.

## The Python backend does not fit a free tier

`backend/` needs bge-m3 resident (~630 MB), a 59 MB vector index and Redis, and
the model must stay warm — a cold reload measured 3,197 ms against 190 ms warm.
Render's free tier sleeps, which is the one thing that breaks it.

Not currently a blocker: **nothing in the frontend calls it.** The deployed app
retrieves in-browser with BM25 and works standalone. When you want it, Render's
paid Starter tier (~$7/month, always on) runs FastAPI, Redis and Ollama the way
they run locally — or swap the local model for a managed embedding API and the
RAM problem disappears.
