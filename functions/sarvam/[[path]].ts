/**
 * Sarvam WebSocket proxy — Cloudflare Pages Function.
 *
 * This exists for one reason: the browser cannot set headers on a WebSocket
 * handshake, so the only client-side way to authenticate with Sarvam is their
 * `api-subscription-key.<key>` subprotocol — which ships the key to every
 * visitor. A Worker can set headers on an outbound upgrade, so the key stays
 * server-side and never reaches the bundle.
 *
 * It replaces the Vite dev proxy, which does not exist in production.
 *
 * Deploy: set SARVAM_API_KEY as an encrypted secret on the Pages project.
 */

interface Env {
  SARVAM_API_KEY: string;
  /** Optional override, e.g. to point at a mock during testing. */
  SARVAM_WS_ORIGIN?: string;
}

const DEFAULT_ORIGIN = 'https://api.sarvam.ai';

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
    return new Response('Expected a WebSocket upgrade.', { status: 426 });
  }
  if (!env.SARVAM_API_KEY) {
    return new Response('SARVAM_API_KEY is not configured.', { status: 500 });
  }

  // /sarvam/speech-to-text-realtime/ws?... -> https://api.sarvam.ai/speech-to-text-realtime/ws?...
  const incoming = new URL(request.url);
  const origin = env.SARVAM_WS_ORIGIN ?? DEFAULT_ORIGIN;
  const upstreamUrl = new URL(incoming.pathname.replace(/^\/sarvam/, '') + incoming.search, origin);

  const upstream = await fetch(upstreamUrl.toString(), {
    headers: {
      Upgrade: 'websocket',
      Connection: 'Upgrade',
      'API-SUBSCRIPTION-KEY': env.SARVAM_API_KEY,
    },
  });

  const server = upstream.webSocket;
  if (!server) {
    // Sarvam refused the upgrade — surface its status rather than a blank 500,
    // since an invalid key looks identical to a network fault otherwise.
    return new Response(`Upstream refused the WebSocket upgrade (${upstream.status}).`, {
      status: 502,
    });
  }

  // One socket to the browser, one to Sarvam, piped both ways.
  const pair = new WebSocketPair();
  const [client, browser] = Object.values(pair);

  server.accept();
  browser.accept();

  browser.addEventListener('message', (e) => {
    try {
      server.send(e.data);
    } catch {
      /* upstream already closed */
    }
  });
  server.addEventListener('message', (e) => {
    try {
      browser.send(e.data);
    } catch {
      /* client already closed */
    }
  });

  // Close and error must propagate, or one side hangs holding a dead socket.
  const shut = (a: WebSocket, code?: number, reason?: string) => {
    try {
      a.close(code && code >= 1000 && code <= 4999 ? code : 1011, reason);
    } catch {
      /* already closing */
    }
  };
  browser.addEventListener('close', (e) => shut(server, e.code, e.reason));
  server.addEventListener('close', (e) => shut(browser, e.code, e.reason));
  browser.addEventListener('error', () => shut(server));
  server.addEventListener('error', () => shut(browser));

  return new Response(null, { status: 101, webSocket: client });
};
