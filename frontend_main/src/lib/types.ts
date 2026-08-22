export type Role = 'user' | 'agent';

export interface Message {
  id: string;
  role: Role;
  text: string;
  at: number;
  lang?: string;
  trace?: Trace;
}

/** Backend pipeline stages — maps 1:1 with the timings dict from /ws/chat. */
export type StageId =
  | 'stt'
  | 'input_guard'
  | 'session'
  | 'retrieval'
  | 'output_guard'
  | 'llm_gen'
  | 'groundedness';

export interface Stage {
  id: StageId;
  label: string;
  /** Milliseconds. Undefined until the stage has run. */
  ms?: number;
  state: 'pending' | 'running' | 'done';
}

/** Backend chunking strategy IDs. */
export type ChunkStrategyId = 'A' | 'B' | 'C' | 'D';

export interface ChunkStrategy {
  id: ChunkStrategyId;
  name: string;
  description: string;
  threshold: string;
  use_case: string;
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
  totalMs: number;
  lang?: string;
  utteranceMs: number;
  grounded: boolean;
  groundednessScore: number;
  topScore: number;
  strategy: ChunkStrategyId;
  passagesCount: number;
  queryType: string;
  topPassageSample: string;
  k: number;
  chunks: RetrievedChunk[];
  guardHits: GuardVerdict[];
  tokensPerSec: number;
  sessionId: string;
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
