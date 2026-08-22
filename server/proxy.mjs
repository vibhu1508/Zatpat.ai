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
    // CORS matters here: the browser pings this from the app's origin to wake a
    // sleeping instance before retrying the WebSocket. Without the header the
    // fetch is blocked and the wake never happens.
    const origin = req.headers.origin;
    const allow = !ALLOWED.length || (origin && ALLOWED.includes(origin));
    res.writeHead(200, {
      'content-type': 'application/json',
      'access-control-allow-origin': allow && origin ? origin : '*',
      'cache-control': 'no-store',
    });
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

  /**
   * Forward a frame preserving its type.
   *
   * `ws` delivers every payload as a Buffer, and `send(Buffer)` emits a BINARY
   * frame by default. Sarvam's protocol is JSON text, so forwarding naively
   * turns every `audio_input` message into a binary frame that the API ignores
   * — the socket opens, `session.begin` arrives, and nothing is ever
   * transcribed. The mock server did not catch this because it calls
   * `toString()` on whatever arrives.
   */
  const forward = (sock, data, isBinary) => {
    if (sock.readyState === WebSocket.OPEN) sock.send(data, { binary: isBinary });
  };

  upstream.on('open', () => {
    open = true;
    for (const [data, isBinary] of pending.splice(0)) forward(upstream, data, isBinary);
  });

  browser.on('message', (m, isBinary) =>
    open ? forward(upstream, m, isBinary) : pending.push([m, isBinary]),
  );
  upstream.on('message', (m, isBinary) => forward(browser, m, isBinary));

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
