import type { Stage, StageId, Trace } from '../lib/types';

/** Target budget for core RAG pipeline (Input Guard + Session + Retrieval + Output Guard). */
const BUDGET_MS = 200;

const LANG_NAMES: Record<string, string> = {
  hi: 'हिन्दी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  sa: 'संस्कृतम्',
  en: 'English',
  auto: 'Auto',
};

const CORE_RAG_STAGES: StageId[] = [
  'input_guard',
  'session',
  'retrieval',
  'output_guard',
];

/**
 * Top-right latency readout.
 * Displays and calculates metrics strictly for the core RAG pipeline:
 * Input Guardrails, Session Context, Redis HNSW Search, Output Guardrail.
 * (STT and LLM generation latencies are excluded from this budget calculation).
 */
export default function LatencyPanel({
  stages,
  trace,
  previousTotal,
  onOpen,
}: {
  stages: Stage[];
  trace: Trace | null;
  previousTotal: number | null;
  onOpen: () => void;
}) {
  // Filter only the 4 requested core RAG stages
  const ragStages = stages.filter((s) => CORE_RAG_STAGES.includes(s.id));
  
  const measured = ragStages.filter((s) => s.ms != null);
  const total = measured.reduce((a, s) => a + (s.ms ?? 0), 0);
  const roundedTotal = Math.round(total * 100) / 100;
  const peak = Math.max(1, ...measured.map((s) => s.ms ?? 0));

  const delta = previousTotal != null && roundedTotal > 0 ? Math.round((roundedTotal - previousTotal) * 100) / 100 : null;
  const vsBudget = roundedTotal > 0 ? Math.round((roundedTotal - BUDGET_MS) * 100) / 100 : null;

  return (
    <aside className="lat">
      <div className="lat__head">
        <span className="label">RAG Latency</span>
        <button className="cs__tab" onClick={onOpen} disabled={!trace}>
          Trace
        </button>
      </div>

      <div>
        <div className="lat__total">
          <span className="label">Core RAG Pipeline</span>
          <div className="lat__big" style={{ marginTop: 10 }}>
            {roundedTotal > 0 ? roundedTotal.toLocaleString() : <span style={{ color: 'var(--ink-3)' }}>—</span>}
            <small>ms</small>
          </div>
          <div className="lat__delta" data-good={vsBudget == null ? undefined : vsBudget <= 0}>
            {vsBudget == null
              ? `BUDGET ${BUDGET_MS} MS`
              : `${vsBudget <= 0 ? '▼' : '▲'} ${Math.abs(vsBudget)} MS VS BUDGET`}
            {delta != null && delta !== 0 && (
              <span style={{ color: 'var(--ink-3)', marginLeft: 10 }}>
                {delta > 0 ? '+' : ''}
                {delta} vs last
              </span>
            )}
          </div>
        </div>

        <div className="lat__list">
          {ragStages.map((s) => {
            const ms = s.ms ?? 0;
            const hot = ms > peak * 0.7 && s.state === 'done';
            return (
              <div className="st" key={s.id} data-state={s.state} data-hot={hot}>
                <span className="st__name">{s.label}</span>
                <span className="st__ms">{s.ms != null ? `${s.ms}` : s.state === 'running' ? '···' : '—'}</span>
                <div className="st__bar">
                  <div
                    className="st__fill"
                    style={{ width: s.state === 'running' ? '100%' : `${(ms / peak) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lat__foot">
        <div className="kv">
          <span className="label">Grounded</span>
          <b style={{ color: trace?.grounded ? 'var(--green-hi, #4caf50)' : 'var(--red-hi, #f44336)' }}>
            {trace ? (trace.grounded ? '✔ Yes' : '✗ No') : '—'}
          </b>
        </div>
        <div className="kv">
          <span className="label">Language</span>
          <b>{trace?.lang ? (LANG_NAMES[trace.lang.split('-')[0]] ?? trace.lang) : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Top score</span>
          <b>{trace ? trace.topScore.toFixed(4) : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Passages</span>
          <b>{trace ? trace.passagesCount : '—'}</b>
        </div>
      </div>
    </aside>
  );
}
