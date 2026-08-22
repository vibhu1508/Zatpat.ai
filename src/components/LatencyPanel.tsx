import type { Stage, Trace } from '../lib/types';

/** Target for the retrieval pipeline alone. */
const BUDGET_MS = 200;

/** Which language the answer came back in — the one thing that silently
 *  surprises people when auto-detection misfires. */
const LANG_NAMES: Record<string, string> = {
  hi: 'हिन्दी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  sa: 'संस्कृतम्',
  en: 'English',
};

/**
 * Top-right latency readout. Fills in stage by stage while the turn runs, so
 * you can see *where* a slow answer went slow rather than only that it did.
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
  // Transcription is excluded from the headline: it is a third-party call an
  // order of magnitude larger than the rest, and including it makes our own
  // pipeline unmeasurable.
  const measured = stages.filter((s) => s.ms != null && s.id !== 'transcribe');
  const running = measured.reduce((a, s) => a + (s.ms ?? 0), 0);
  const total = trace?.totalMs ?? running;
  const peak = Math.max(1, ...measured.map((s) => s.ms ?? 0));

  const delta = previousTotal != null && total > 0 ? total - previousTotal : null;
  const vsBudget = total > 0 ? total - BUDGET_MS : null;

  return (
    <aside className="lat">
      <div className="lat__head">
        <span className="label">Latency</span>
        <button className="cs__tab" onClick={onOpen} disabled={!trace}>
          Trace
        </button>
      </div>

      <div>
        <div className="lat__total">
          <span className="label">Retrieval</span>
          <div className="lat__big" style={{ marginTop: 10 }}>
            {total > 0 ? (total < 10 ? total.toFixed(1) : Math.round(total).toLocaleString()) : <span style={{ color: 'var(--ink-3)' }}>—</span>}
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
          {stages.map((s) => {
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
          <span className="label">Transcribe</span>
          <b>{trace?.transcribeMs ? `${trace.transcribeMs} ms` : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">You spoke for</span>
          <b>{trace?.utteranceMs ? `${(trace.utteranceMs / 1000).toFixed(1)}s` : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Coverage</span>
          <b>{trace ? `${(trace.coverage * 100).toFixed(0)}%` : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Answered in</span>
          <b>{trace ? LANG_NAMES[(trace.lang ?? 'en').split('-')[0]] ?? trace.lang : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Tokens out</span>
          <b>{trace ? trace.tokensOut : '—'}</b>
        </div>
        <div className="kv">
          <span className="label">Chunks · k</span>
          <b>{trace ? trace.k : '—'}</b>
        </div>
      </div>
    </aside>
  );
}
