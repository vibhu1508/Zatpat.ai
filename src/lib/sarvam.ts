/**
 * Sarvam saaras:v3-realtime — streaming speech translation over WebSocket.
 *
 * Contract: https://docs.sarvam.ai/api-reference/speech-to-text/transcribe/realtime/ws
 *
 *   wss://api.sarvam.ai/speech-to-text-realtime/ws
 *     ?model=saaras:v3-realtime&mode=translate&language_code=auto
 *     &encoding=linear16&sample_rate=16000
 *
 * `mode=translate` is the point of using saaras here: the corpus is indexed in
 * English, but the questions are asked in Hindi, Marathi, Sanskrit or Tamil.
 * The model returns English text directly, so no separate translation hop sits
 * between speech and retrieval.
 *
 * `language_code=auto` makes the final transcript carry a `language` field,
 * which is what lets the answer come back in the language it was asked in.
 */

export type SarvamMode = 'translate' | 'transcribe' | 'verbatim' | 'translit' | 'codemix';

export interface SarvamOptions {
  /** Called while a sleeping proxy is being woken, so the UI can say so. */
  onWaking?: () => void;
  /** Base websocket URL. Defaults to the dev proxy, which injects the key. */
  url?: string;
  mode?: SarvamMode;
  languageCode?: string;
  /** 'fast' trades a little accuracy for earlier partials. */
  streamType?: 'fast' | 'balanced' | 'simulated';
  silenceDurationMs?: number;
  minSpeechDurationMs?: number;

  onOpen?: () => void;
  onPartial?: (text: string, utteranceIdx: number) => void;
  /** Fired per utterance. `language` is present because language_code=auto. */
  onFinal?: (text: string, language: string | undefined, utteranceIdx: number) => void;
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onError?: (message: string, fatal: boolean) => void;
  onClose?: (clean: boolean) => void;
}

export const SAMPLE_RATE = 16000;

/**
 * Where to reach the proxy that holds the subscription key.
 *
 * Same-origin by default, which is what the Vite dev proxy and a Cloudflare
 * Pages Function both provide. When the proxy is a separate service — Render
 * deploys the static site and the proxy as two origins — set
 * VITE_SARVAM_WS_URL to its base, e.g. wss://host.onrender.com/sarvam.
 */
function normaliseBase(raw: string | undefined): string {
  if (!raw) return '/sarvam';
  const trimmed = raw.trim().replace(/\/$/, '');
  // A pasted proxy URL is far more often https:// than wss://. Left alone it
  // fails the ws:// test below and gets resolved against the app's own origin,
  // producing a nonsense URL and an error that says nothing useful.
  if (trimmed.startsWith('https://')) return `wss://${trimmed.slice('https://'.length)}`;
  if (trimmed.startsWith('http://')) return `ws://${trimmed.slice('http://'.length)}`;
  return trimmed;
}

const BASE = normaliseBase(import.meta.env.VITE_SARVAM_WS_URL);
const DEFAULT_URL = `${BASE}/speech-to-text-realtime/ws`;

/** Health endpoint of a cross-origin proxy, used to wake a sleeping host. */
const HEALTH_URL = /^wss?:\/\//.test(BASE)
  ? `${BASE.replace(/^ws/, 'http').replace(/\/sarvam$/, '')}/health`
  : null;

type ServerEvent =
  | { event: 'session.begin'; request_id: string; config: unknown }
  | { event: 'vad.speech_start'; utterance_idx: number }
  | { event: 'vad.speech_end'; utterance_idx: number }
  | { event: 'transcript.partial'; utterance_idx: number; text: string; language?: string }
  | {
      event: 'transcript.final';
      utterance_idx: number;
      text: string;
      language?: string;
      language_confidence?: string;
    }
  | { event: 'session.end' }
  | { event: 'pong' }
  | { event: 'config.updated'; applied: string[] }
  | { event: 'error'; code: string; is_fatal: boolean; message: string };

export class SarvamRealtime {
  private ws: WebSocket | null = null;
  private opts: SarvamOptions;
  private ping = 0;
  private closing = false;
  /** One wake-and-retry per connect, so a genuine failure still surfaces. */
  private retried = false;
  /** Frames captured before the socket finished opening. */
  private pending: string[] = [];

  constructor(opts: SarvamOptions = {}) {
    this.opts = opts;
  }

  get ready() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /** `languageCode` overrides the constructor default for this session. */
  connect(languageCode?: string) {
    if (this.ws) return;
    this.closing = false;
    this.retried = false;
    this.open(languageCode);
  }

  private open(languageCode?: string) {

    const base = this.opts.url ?? DEFAULT_URL;
    const url = base.startsWith('ws')
      ? new URL(base)
      : new URL(base, window.location.origin.replace(/^http/, 'ws'));

    const q = url.searchParams;
    q.set('model', 'saaras:v3-realtime');
    q.set('mode', this.opts.mode ?? 'translate');
    q.set('language_code', languageCode ?? this.opts.languageCode ?? 'auto');
    q.set('encoding', 'linear16');
    q.set('sample_rate', String(SAMPLE_RATE));
    q.set('stream_type', this.opts.streamType ?? 'fast');
    q.set('endpointing', 'vad');
    q.set('silence_duration_ms', String(this.opts.silenceDurationMs ?? 500));
    q.set('min_speech_duration_ms', String(this.opts.minSpeechDurationMs ?? 250));

    // The key is attached by the dev proxy as an API-SUBSCRIPTION-KEY header.
    // Browsers cannot set WebSocket headers; Sarvam's documented browser path
    // is the `api-subscription-key.<key>` subprotocol, which would put the key
    // in the bundle. Proxying keeps it server-side.
    const ws = new WebSocket(url.toString());
    ws.binaryType = 'arraybuffer';
    this.ws = ws;

    ws.onopen = () => {
      this.opts.onOpen?.();
      for (const frame of this.pending) this.sendAudio(frame);
      this.pending = [];
      this.ping = window.setInterval(() => this.send({ event: 'ping' }), 15000);
    };

    ws.onmessage = (e) => {
      let msg: ServerEvent;
      try {
        msg = JSON.parse(typeof e.data === 'string' ? e.data : new TextDecoder().decode(e.data));
      } catch {
        return;
      }
      this.handle(msg);
    };

    ws.onerror = () => {
      if (this.closing) return;
      // Free hosting tiers sleep when idle and take 30-60 s to wake; the first
      // upgrade attempt is refused while that happens. Wake the host over plain
      // HTTP — that request blocks until it is up — then try once more.
      if (HEALTH_URL && !this.retried) {
        this.retried = true;
        this.ws = null;
        this.opts.onWaking?.();
        fetch(HEALTH_URL, { mode: 'cors' })
          .catch(() => {})
          .then(() => {
            if (!this.closing) this.open(languageCode);
          });
        return;
      }
      this.opts.onError?.(
        HEALTH_URL
          ? 'Could not reach the speech service. It may still be starting up — try again.'
          : 'Realtime connection failed.',
        true,
      );
    };

    ws.onclose = () => {
      window.clearInterval(this.ping);
      this.ping = 0;
      this.ws = null;
      this.opts.onClose?.(this.closing);
    };
  }

  private handle(msg: ServerEvent) {
    switch (msg.event) {
      case 'transcript.partial':
        this.opts.onPartial?.(msg.text, msg.utterance_idx);
        break;
      case 'transcript.final':
        this.opts.onFinal?.(msg.text, msg.language, msg.utterance_idx);
        break;
      case 'vad.speech_start':
        this.opts.onSpeechStart?.();
        break;
      case 'vad.speech_end':
        this.opts.onSpeechEnd?.();
        break;
      case 'error':
        this.opts.onError?.(msg.message, msg.is_fatal);
        break;
      default:
        break;
    }
  }

  private send(payload: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(payload));
  }

  /** Feed one PCM16 frame. Frames captured before open are queued, not dropped. */
  pushPcm(pcm: ArrayBuffer) {
    const b64 = base64(new Uint8Array(pcm));
    if (this.ws?.readyState === WebSocket.OPEN) this.sendAudio(b64);
    else if (this.pending.length < 200) this.pending.push(b64);
  }

  private sendAudio(audio: string) {
    this.send({ event: 'audio_input', audio });
  }

  close() {
    this.closing = true;
    this.pending = [];
    if (this.ws?.readyState === WebSocket.OPEN) this.send({ event: 'end' });
    this.ws?.close();
  }
}

/** Binary → base64 without blowing the argument limit on large frames. */
function base64(bytes: Uint8Array): string {
  let s = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    s += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(s);
}
