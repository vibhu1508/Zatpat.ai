/**
 * backend.ts — WebSocket client for the Zatpat.ai Python backend.
 *
 * Connects to ws://localhost:8000/ws/chat and dispatches typed events
 * for each frame the backend sends (stt, retrieval, token, telemetry, done, blocked, error).
 */

export interface BackendCallbacks {
  onSTT?: (data: {
    detected_lang: string;
    english_query: string;
    native_query: string;
    stt_latency_ms: number;
    is_mock: boolean;
  }) => void;
  onRetrieval?: (data: {
    top_score: number;
    strategy: string;
    query_type: string;
    passages_count: number;
    top_passage_sample: string;
    retrieval_ms: number;
  }) => void;
  onToken?: (text: string) => void;
  onTelemetry?: (timings: Record<string, number>, tokensPerSec: number) => void;
  onDone?: (data: {
    session_id: string;
    full_answer: string;
    lang?: string;
    is_grounded: boolean;
    groundedness_score: number;
    total_ms: number;
  }) => void;
  onBlocked?: (data: {
    status: string;
    reason: string;
    message: string;
    timings: Record<string, number>;
  }) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

const BACKEND_WS_URL = 'ws://localhost:8000/ws/chat';
const BACKEND_HTTP_URL = 'http://localhost:8000';

export class BackendClient {
  private ws: WebSocket | null = null;
  private callbacks: BackendCallbacks;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private alive = true;

  constructor(callbacks: BackendCallbacks) {
    this.callbacks = callbacks;
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    try {
      this.ws = new WebSocket(BACKEND_WS_URL);
    } catch {
      this.scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      this.callbacks.onConnect?.();
    };

    this.ws.onclose = () => {
      this.callbacks.onDisconnect?.();
      if (this.alive) this.scheduleReconnect();
    };

    this.ws.onerror = () => {
      // onclose will fire after this
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        switch (data.type) {
          case 'stt':
            this.callbacks.onSTT?.(data);
            break;
          case 'retrieval':
            this.callbacks.onRetrieval?.(data);
            break;
          case 'token':
            this.callbacks.onToken?.(data.text);
            break;
          case 'telemetry':
            this.callbacks.onTelemetry?.(data.timings, data.tokens_per_sec ?? 0);
            break;
          case 'done':
            this.callbacks.onDone?.(data);
            break;
          case 'blocked':
          case 'abstained':
            this.callbacks.onBlocked?.(data);
            break;
          case 'error':
            this.callbacks.onError?.(data.error);
            break;
        }
      } catch {
        // ignore malformed frames
      }
    };
  }

  /** Send a text query as JSON. */
  sendQuery(query: string, lang: string, sessionId: string) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(
      JSON.stringify({
        query,
        lang,
        session_id: sessionId,
        english_query: query,
      }),
    );
  }

  /** Send raw WAV audio bytes. */
  sendAudio(wavBytes: ArrayBuffer) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(wavBytes);
  }

  get connected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  close() {
    this.alive = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.ws?.close();
    this.ws = null;
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (this.alive) this.connect();
    }, 2000);
  }
}

/** Fetch backend strategies from REST. */
export async function fetchStrategies(): Promise<any[]> {
  try {
    const res = await fetch(`${BACKEND_HTTP_URL}/api/strategies`);
    const data = await res.json();
    return data.strategies ?? [];
  } catch {
    return [];
  }
}

/** Fetch backend guardrails from REST. */
export async function fetchGuardrails(): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_HTTP_URL}/api/guardrails`);
    return await res.json();
  } catch {
    return null;
  }
}

/** Fetch health status. */
export async function fetchHealth(): Promise<any> {
  try {
    const res = await fetch(`${BACKEND_HTTP_URL}/health`);
    return await res.json();
  } catch {
    return null;
  }
}
