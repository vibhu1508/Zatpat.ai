import { STRATEGIES } from '../lib/pipeline';
import Sheet from './Sheet';
import type { Trace } from '../lib/types';

/**
 * Chunking and retrieval strategies. Read-only by design: the routing is
 * intelligent, not user-handled, so this panel explains the choice instead of
 * offering a dropdown that would let you make a worse one.
 */
export default function StrategySheet({ trace, onClose }: { trace: Trace | null; onClose: () => void }) {
  return (
    <Sheet
      title="Chunking & retrieval"
      subtitle="Five strategies are indexed in parallel. The router reads the shape of each query and picks one — the decision is shown, not configurable."
      onClose={onClose}
    >
      {trace && (
        <div className="trace">
          <span className="label">Last routing decision</span>
          <div style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-1)', lineHeight: 1.6 }}>
            Classified <b style={{ color: 'var(--blue-hi)', fontWeight: 400 }}>{trace.queryClass}</b> →{' '}
            <b style={{ color: 'var(--ink-0)', fontWeight: 400 }}>
              {STRATEGIES.find((s) => s.id === trace.strategy)?.name}
            </b>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            {trace.routeReason}
          </p>

          <div className="trace__grid">
            <div>
              <span className="label">Retrieved</span>
              <span className="v">{trace.k}</span>
            </div>
            <div>
              <span className="label">Retrieve</span>
              <span className="v">
                {trace.stages.find((s) => s.id === 'retrieve')?.ms ?? '—'}
                <small style={{ fontSize: 11, color: 'var(--ink-3)' }}> ms</small>
              </span>
            </div>
            <div>
              <span className="label">Coverage</span>
              <span className="v">
                {(trace.coverage * 100).toFixed(0)}
                <small style={{ fontSize: 11, color: 'var(--ink-3)' }}> %</small>
              </span>
            </div>
            <div>
              <span className="label">Top score</span>
              <span className="v">{trace.chunks[0]?.score.toFixed(3) ?? '—'}</span>
            </div>
          </div>
        </div>
      )}

      {trace && (
        <>
          <div style={{ padding: '18px 24px 8px' }}>
            <span className="label">Spans in context</span>
          </div>
          {trace.chunks.map((c, i) => (
            <div className="chunk" key={c.id}>
              <span style={{ color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="chunk__src">{c.source}</span>
              <span className="chunk__span">{c.span}</span>
              <span className="chunk__score">{c.score.toFixed(3)}</span>
            </div>
          ))}
        </>
      )}

      <div style={{ padding: '26px 24px 8px' }}>
        <span className="label">Strategy catalogue</span>
      </div>

      {STRATEGIES.map((s) => (
        <div className="srow" key={s.id} data-active={trace?.strategy === s.id}>
          <div>
            <h3>
              {s.name}
              {trace?.strategy === s.id && <span className="pill">Routed</span>}
            </h3>
            <p>{s.blurb}</p>
            <div className="srow__best">Best for — {s.bestFor}</div>
          </div>
          <div className="srow__meta">
            <div className="kv">
              <span className="label">Chunk</span>
              <b style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-1)' }}>{s.size}</b>
            </div>
            <div className="kv">
              <span className="label">Overlap</span>
              <b style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-1)' }}>{s.overlap}</b>
            </div>
            <div>
              <div className="kv">
                <span className="label">Traffic share</span>
                <b style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-1)' }}>
                  {Math.round(s.share * 100)}%
                </b>
              </div>
              <div className="share">
                <i style={{ width: `${s.share * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </Sheet>
  );
}
