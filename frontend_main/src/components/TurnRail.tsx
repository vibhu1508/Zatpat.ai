import { useEffect, useRef } from 'react';
import type { Message } from '../lib/types';

const clock = (t: number) =>
  new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/**
 * Continuous ChatGPT-like chat panel showing full queries and RAG-generated answers.
 * No metrics are displayed here — pure conversation flow.
 */
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
  }, [messages.length, messages[messages.length - 1]?.text]);

  const turns = messages.filter((m) => m.role === 'user').length;

  return (
    <aside className="rail">
      <div className="rail__head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="label" style={{ color: 'var(--ink-0)', fontWeight: 600 }}>Chat History</span>
          {turns > 0 && (
            <span
              style={{
                fontSize: 10,
                padding: '1px 6px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.08)',
                color: 'var(--ink-2)',
                fontFamily: 'var(--mono)',
              }}
            >
              {turns} {turns === 1 ? 'turn' : 'turns'}
            </span>
          )}
        </div>
        <button className="cs__tab" onClick={onClear} disabled={!messages.length}>
          Clear
        </button>
      </div>

      <div className="rail__scroll" ref={scroll} style={{ padding: '12px 14px' }}>
        {!messages.length ? (
          <div className="rail__empty" style={{ textAlign: 'center', padding: '60px 12px' }}>
            <div style={{ fontSize: 20, marginBottom: 8, opacity: 0.4 }}>💬</div>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 13 }}>No messages yet</p>
            <p style={{ margin: '6px 0 0', color: 'var(--ink-3)', fontSize: 11, lineHeight: 1.5 }}>
              Ask a question by typing below or holding space to talk.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {messages.map((m) => {
              const isUser = m.role === 'user';
              const isSelected = m.id === selectedId;

              return (
                <div
                  key={m.id}
                  onClick={() => onSelect(m)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '92%',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 4,
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isUser ? 'var(--blue-hi, #60a5fa)' : 'var(--red-hi, #f87171)',
                        fontFamily: 'var(--mono)',
                      }}
                    >
                      {isUser ? 'You' : 'Zatpat AI'}
                    </span>
                    <span
                      style={{
                        fontSize: 9,
                        color: 'var(--ink-3)',
                        fontFamily: 'var(--mono)',
                      }}
                    >
                      {clock(m.at)}
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '10px 13px',
                      borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                      background: isUser
                        ? 'rgba(37, 99, 235, 0.15)'
                        : isSelected
                        ? 'rgba(255, 255, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.04)',
                      border: isUser
                        ? '1px solid rgba(59, 130, 246, 0.3)'
                        : isSelected
                        ? '1px solid rgba(255, 255, 255, 0.18)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      color: 'var(--ink-0, #f3f4f6)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      boxShadow: isSelected ? '0 0 12px rgba(0,0,0,0.4)' : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rail__foot" style={{ padding: '10px 14px' }}>
        <span className="label">Session Active</span>
        <span className="label" style={{ color: 'var(--ink-1)' }}>
          {messages.length} msgs
        </span>
      </div>
    </aside>
  );
}
