/**
 * Sarvam WebSocket proxy — Render Web Service.
 *
 * Same job as the Cloudflare function: the browser cannot set headers on a
 * WebSocket handshake, so Sarvam's client-side path would put the API key in
 * the bundle. This holds the key server-side and pipes frames both ways.
 *
 *   PORT              provided by Render
 *   SARVAM_API_KEY    required, set as an environment secret
 *   SARVAM_WS_ORIGIN  optional override (used by the mock in tests)
 *   ALLOWED_ORIGINS   optional comma-separated allowlist for the browser origin
 */
import http from 'node:http';
import { WebSocketServer, WebSocket } from 'ws';

const PORT = Number(process.env.PORT || 8080);
const KEY = process.env.SARVAM_API_KEY;
const ORIGIN = process.env.SARVAM_WS_ORIGIN || 'wss://api.sarvam.ai';
const ALLOWED = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

if (!KEY) {
  console.error('SARVAM_API_KEY is not set — refusing to start.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  // Render's health check hits the service over plain HTTP; without this it
  // would be marked unhealthy and restarted in a loop.
  if (req.url === '/health' || req.url === '/') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ ok: true, upstream: ORIGIN }));
    return;
  }
  res.writeHead(426).end('Expected a WebSocket upgrade.');
});

// noServer: the upgrade is handled manually so a rejected origin never
// completes a handshake.
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  if (!req.url?.startsWith('/sarvam/')) {
    socket.destroy();
    return;
  }
  const origin = req.headers.origin;
  if (ALLOWED.length && origin && !ALLOWED.includes(origin)) {
    socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, (browser) => pipe(browser, req.url));
});

/** Bridge one browser socket to a fresh upstream socket. */
function pipe(browser, path) {
  const upstreamUrl = ORIGIN + path.replace(/^\/sarvam/, '');
  const upstream = new WebSocket(upstreamUrl, {
    headers: { 'API-SUBSCRIPTION-KEY': KEY },
  });

  // Frames can arrive before the upstream socket is open; queue rather than drop.
  const pending = [];
  let open = false;

  upstream.on('open', () => {
    open = true;
    for (const m of pending.splice(0)) upstream.send(m);
  });

  browser.on('message', (m) => (open ? upstream.send(m) : pending.push(m)));
  upstream.on('message', (m) => {
    if (browser.readyState === WebSocket.OPEN) browser.send(m);
  });

  const shut = (a, code, reason) => {
    // Codes outside 1000-4999 cannot be sent on the wire.
    const safe = code >= 1000 && code <= 4999 ? code : 1011;
    try {
      a.close(safe, reason);
    } catch {
      /* already closing */
    }
  };
  browser.on('close', (c, r) => shut(upstream, c, r));
  upstream.on('close', (c, r) => shut(browser, c, r));
  browser.on('error', () => shut(upstream, 1011));
  upstream.on('error', (e) => {
    console.error('upstream error:', e.message);
    shut(browser, 1011, 'upstream error');
  });
}

server.listen(PORT, () => console.log(`sarvam proxy on :${PORT} -> ${ORIGIN}`));
