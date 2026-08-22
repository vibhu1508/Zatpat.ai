import { STRATEGIES } from '../lib/pipeline';
import Sheet from './Sheet';
import type { Trace } from '../lib/types';

/** Full breakdown for one turn — every stage, every span, every verdict. */
export default function TraceSheet({ trace, onClose }: { trace: Trace; onClose: () => void }) {
  const peak = Math.max(1, ...trace.stages.map((s) => s.ms ?? 0));

  return (
    <Sheet
      title="Turn trace"
      subtitle="Where the milliseconds went, which spans were in context, and what the rails decided."
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
              {STRATEGIES.find((s) => s.id === trace.strategy)?.name}
            </span>
          </div>
          <div>
            <span className="label">Query class</span>
            <span className="v" style={{ fontSize: 14 }}>
              {trace.queryClass}
            </span>
          </div>
          <div>
            <span className="label">Tokens</span>
            <span className="v" style={{ fontSize: 14 }}>
              {trace.tokensIn} / {trace.tokensOut}
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
          <span className="st__ms">{s.ms ?? '—'}</span>
          <div className="st__bar">
            <div className="st__fill" style={{ width: `${((s.ms ?? 0) / peak) * 100}%` }} />
          </div>
        </div>
      ))}

      <div style={{ padding: '26px 24px 8px' }}>
        <span className="label">Context spans</span>
      </div>
      {trace.chunks.map((c, i) => (
        <div className="chunk" key={c.id}>
          <span style={{ color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
          <span className="chunk__src">{c.source}</span>
          <span className="chunk__span">{c.span}</span>
          <span className="chunk__score">{c.score.toFixed(3)}</span>
        </div>
      ))}

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
    </Sheet>
  );
}
