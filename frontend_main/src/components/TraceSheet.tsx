import { STRATEGIES } from '../lib/pipeline';
import Sheet from './Sheet';
import type { Trace } from '../lib/types';

/** Full breakdown for one turn — every backend stage, passage preview, and groundedness. */
export default function TraceSheet({ trace, onClose }: { trace: Trace; onClose: () => void }) {
  const peak = Math.max(1, ...trace.stages.map((s) => s.ms ?? 0));

  return (
    <Sheet
      title="Turn trace"
      subtitle="Where the milliseconds went, which strategy was routed, and what the guardrails decided."
      onClose={onClose}
    >
      <div className="trace">
        <div className="trace__grid" style={{ marginTop: 0 }}>
          <div>
            <span className="label">End to end</span>
            <span className="v">
              {trace.totalMs}
              <small style={{ fontSize: 11, color: 'var(--ink-3)' }}> ms</small>
            </span>
          </div>
          <div>
            <span className="label">Strategy</span>
            <span className="v" style={{ fontSize: 14 }}>
              {STRATEGIES.find((s) => s.id === trace.strategy)?.name ?? trace.strategy}
            </span>
          </div>
          <div>
            <span className="label">Query type</span>
            <span className="v" style={{ fontSize: 14 }}>
              {trace.queryType || '—'}
            </span>
          </div>
          <div>
            <span className="label">Grounded</span>
            <span
              className="v"
              style={{
                fontSize: 14,
                color: trace.grounded ? 'var(--green-hi, #4caf50)' : 'var(--red-hi, #f44336)',
              }}
            >
              {trace.grounded ? '✔' : '✗'} {(trace.groundednessScore * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 24px 8px' }}>
        <span className="label">Stage breakdown</span>
      </div>
      {trace.stages.map((s) => (
        <div className="st" key={s.id} data-state={s.state} style={{ padding: '9px 24px 10px' }}>
          <span className="st__name" style={{ fontSize: 12 }}>
            {s.label}
          </span>
          <span className="st__ms">{s.ms != null ? `${s.ms}` : '—'}</span>
          <div className="st__bar">
            <div className="st__fill" style={{ width: `${((s.ms ?? 0) / peak) * 100}%` }} />
          </div>
        </div>
      ))}

      {trace.topPassageSample && (
        <>
          <div style={{ padding: '26px 24px 8px' }}>
            <span className="label">Top passage preview</span>
          </div>
          <div
            style={{
              padding: '0 24px 16px',
              fontSize: 13,
              color: 'var(--ink-2)',
              lineHeight: 1.6,
              fontFamily: 'var(--mono)',
            }}
          >
            {trace.topPassageSample}
          </div>
        </>
      )}

      <div style={{ padding: '26px 24px 8px' }}>
        <span className="label">Metrics</span>
      </div>
      <div className="trace" style={{ marginTop: 0 }}>
        <div className="trace__grid" style={{ marginTop: 0 }}>
          <div>
            <span className="label">Top score</span>
            <span className="v">{trace.topScore.toFixed(4)}</span>
          </div>
          <div>
            <span className="label">Passages</span>
            <span className="v">{trace.passagesCount}</span>
          </div>
          <div>
            <span className="label">Tok/s</span>
            <span className="v">{trace.tokensPerSec.toFixed(1)}</span>
          </div>
          <div>
            <span className="label">Session</span>
            <span className="v" style={{ fontSize: 11, fontFamily: 'var(--mono)' }}>
              {trace.sessionId?.slice(0, 12) ?? '—'}
            </span>
          </div>
        </div>
      </div>

      {trace.guardHits.length > 0 && (
        <>
          <div style={{ padding: '26px 24px 8px' }}>
            <span className="label">Guardrail verdicts</span>
          </div>
          {trace.guardHits.map((v) => (
            <div className="vd" key={v.railId} data-pass={v.passed}>
              <span className="vd__m">{v.passed ? '✓' : '■'}</span>
              <span className="vd__n">{v.name}</span>
              <span className="vd__note">{v.note ?? 'passed'}</span>
            </div>
          ))}
        </>
      )}
    </Sheet>
  );
}
