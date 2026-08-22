import Sheet from './Sheet';
import type { ChunkStrategy, Trace } from '../lib/types';

/**
 * Chunking & retrieval strategies panel — shows the backend's 4 real strategies
 * (A–D), their descriptions, thresholds, and which one was routed for the last turn.
 * Metrics have been removed as requested.
 */
export default function StrategySheet({
  strategies,
  trace,
  onClose,
}: {
  strategies: ChunkStrategy[];
  trace: Trace | null;
  onClose: () => void;
}) {
  return (
    <Sheet
      title="Chunking & retrieval"
      subtitle="Four strategies are indexed in parallel. The router selects one based on passage length and query type — the decision is shown, not configurable."
      onClose={onClose}
    >
      {trace && (
        <div className="trace">
          <span className="label">Last routing decision</span>
          <div style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-1)', lineHeight: 1.6 }}>
            Strategy{' '}
            <b style={{ color: 'var(--blue-hi)', fontWeight: 500 }}>
              {strategies.find((s) => s.id === trace.strategy)?.name ?? trace.strategy}
            </b>
            {trace.queryType && (
              <>
                {' '}· Query type{' '}
                <b style={{ color: 'var(--ink-0)', fontWeight: 500 }}>{trace.queryType}</b>
              </>
            )}
          </div>
        </div>
      )}

      {trace && trace.topPassageSample && (
        <>
          <div style={{ padding: '18px 24px 8px' }}>
            <span className="label">Top passage preview</span>
          </div>
          <div style={{ padding: '0 24px 16px', fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6, fontFamily: 'var(--mono)' }}>
            {trace.topPassageSample}
          </div>
        </>
      )}

      <div style={{ padding: '24px 24px 8px' }}>
        <span className="label">Strategy catalogue</span>
      </div>

      {strategies.map((s) => (
        <div className="srow" key={s.id} data-active={trace?.strategy === s.id}>
          <div>
            <h3>
              {s.id}. {s.name}
              {trace?.strategy === s.id && <span className="pill">Routed</span>}
            </h3>
            <p>{s.description}</p>
            <div className="srow__best">Best for — {s.use_case}</div>
          </div>
          <div className="srow__meta">
            <div className="kv">
              <span className="label">Threshold</span>
              <b style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-1)' }}>{s.threshold}</b>
            </div>
          </div>
        </div>
      ))}
    </Sheet>
  );
}
