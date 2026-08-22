export type Role = 'user' | 'agent';

export interface Message {
  id: string;
  role: Role;
  text: string;
  at: number;
  trace?: Trace;
}

/** One stage of the voice→answer pipeline. */
export type StageId = 'transcribe' | 'route' | 'retrieve' | 'guard' | 'compose' | 'speak';

export interface Stage {
  id: StageId;
  label: string;
  /** Milliseconds. Undefined until the stage has run. */
  ms?: number;
  state: 'pending' | 'running' | 'done';
}

export interface RetrievedChunk {
  id: string;
  source: string;
  span: string;
  score: number;
  strategy: ChunkStrategyId;
}

export interface Trace {
  stages: Stage[];
  /** Retrieval pipeline only, excluding transcription. */
  totalMs: number;
  /** Speech-to-text time. Reported separately — see `totalMs`. */
  transcribeMs: number;
  /** Language the question was asked in, as reported by Sarvam. */
  lang?: string;
  /**
   * How long the speaker actually spoke, in ms. Deliberately NOT part of
   * `totalMs`: it is the user's pace, not the system's. Counting it as latency
   * makes a slow speaker look like a slow system and hides the number that
   * matters — end of speech to first sound of the answer.
   */
  utteranceMs: number;
  /** True when the answer came from the corpus rather than a refusal. */
  grounded: boolean;
  /** Share of the question's content terms the matched entry covers, 0..1. */
  coverage: number;
  /** Which chunking strategy the router picked, and why. */
  strategy: ChunkStrategyId;
  routeReason: string;
  queryClass: string;
  k: number;
  chunks: RetrievedChunk[];
  guardHits: GuardVerdict[];
  tokensIn: number;
  tokensOut: number;
}

export type ChunkStrategyId = 'semantic' | 'recursive' | 'sentence-window' | 'proposition' | 'late';

export interface ChunkStrategy {
  id: ChunkStrategyId;
  name: string;
  size: string;
  overlap: string;
  blurb: string;
  bestFor: string;
  /** Share of traffic the router has sent here this session, 0..1. */
  share: number;
}

export type GuardScope = 'input' | 'output' | 'retrieval';

export interface Guardrail {
  id: string;
  name: string;
  scope: GuardScope;
  detail: string;
  action: 'block' | 'redact' | 'flag' | 'rewrite';
  enabled: boolean;
  custom?: boolean;
  /** Times this rail has fired in the session. */
  hits: number;
}

export interface GuardVerdict {
  railId: string;
  name: string;
  passed: boolean;
  note?: string;
}

/** UI phase for the console. */
export type Phase = 'idle' | 'listening' | 'thinking' | 'speaking';
