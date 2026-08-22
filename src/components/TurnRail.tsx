import { useEffect, useRef } from 'react';
import { STRATEGIES } from '../lib/pipeline';
import type { Message } from '../lib/types';

const clock = (t: number) =>
  new Date(t).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

/** In-session memory. Every turn, in order, with its trace summary attached. */
export default function TurnRail({
  messages,
  selectedId,
  onSelect,
  onClear,
}: {
  messages: Message[];
  selectedId: string | null;
  onSelect: (m: Message) => void;
  onClear: () => void;
}) {
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroll.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const turns = messages.filter((m) => m.role === 'user').length;

  return (
    <aside className="rail">
      <div className="rail__head">
        <span className="label">Session memory</span>
        <button className="cs__tab" onClick={onClear} disabled={!messages.length}>
          Clear
        </button>
      </div>

      <div className="rail__scroll" ref={scroll}>
        {!messages.length ? (
          <p className="rail__empty">
            Nothing yet. This rail holds the turns of the current session — your words and the answers
            given — and clears when the tab closes. Nothing is carried between sessions.
          </p>
        ) : (
          messages.map((m) => (
            <div
              className="turn"
              key={m.id}
              data-role={m.role}
              data-sel={m.id === selectedId}
              onClick={() => onSelect(m)}
            >
              <div className="turn__meta">
                <span className="turn__who">{m.role === 'user' ? 'You' : 'Agent'}</span>
                <span className="turn__t">{clock(m.at)}</span>
              </div>
              <div className="turn__text">{m.text}</div>
              {m.trace && (
                <div className="turn__foot">
                  <span>
                    <b>{m.trace.totalMs < 10 ? m.trace.totalMs.toFixed(1) : Math.round(m.trace.totalMs)}</b> ms
                  </span>
                  <span>
                    <b>{STRATEGIES.find((s) => s.id === m.trace!.strategy)?.name}</b>
                  </span>
                  <span>
                    k=<b>{m.trace.k}</b>
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="rail__foot">
        <span className="label">Turns</span>
        <span className="label" style={{ color: 'var(--ink-1)' }}>
          {String(turns).padStart(2, '0')}
        </span>
      </div>
    </aside>
  );
}
