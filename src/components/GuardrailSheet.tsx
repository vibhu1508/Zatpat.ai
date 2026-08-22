import { useState } from 'react';
import Sheet from './Sheet';
import type { GuardScope, Guardrail, Trace } from '../lib/types';

/** Guardrails: the shipped rails, their live hit counts, and a composer for your own. */
export default function GuardrailSheet({
  rails,
  trace,
  onToggle,
  onAdd,
  onRemove,
  onClose,
}: {
  rails: Guardrail[];
  trace: Trace | null;
  onToggle: (id: string) => void;
  onAdd: (g: Guardrail) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [scope, setScope] = useState<GuardScope>('output');
  const [action, setAction] = useState<Guardrail['action']>('flag');

  const submit = () => {
    const n = name.trim();
    if (!n) return;
    onAdd({
      id: `custom_${Date.now().toString(36)}`,
      name: n,
      scope,
      action,
      detail: `Custom rail. Runs on the ${scope} pass; matches are handled by ${action}.`,
      enabled: true,
      custom: true,
      hits: 0,
    });
    setName('');
  };

  const active = rails.filter((r) => r.enabled).length;

  return (
    <Sheet
      title="Guardrails"
      subtitle="Input, retrieval and output rails run in the same pass. Retrieved text is treated as untrusted, and nothing unsupported is spoken."
      onClose={onClose}
    >
      {trace && trace.guardHits.length > 0 && (
        <div className="trace">
          <span className="label">Last turn — verdicts</span>
          <div style={{ marginTop: 12, marginLeft: -24, marginRight: -24 }}>
            {trace.guardHits.map((v) => (
              <div className="vd" key={v.railId} data-pass={v.passed}>
                <span className="vd__m">{v.passed ? '✓' : '■'}</span>
                <span className="vd__n">{v.name}</span>
                <span className="vd__note">{v.note ?? 'passed'}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="compose">
        <span className="label">Add a rail</span>
        <div className="compose__row">
          <div className="f">
            <span className="label">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              placeholder="e.g. no competitor names"
            />
          </div>
          <div className="f">
            <span className="label">Scope</span>
            <select value={scope} onChange={(e) => setScope(e.target.value as GuardScope)}>
              <option value="input">input</option>
              <option value="retrieval">retrieval</option>
              <option value="output">output</option>
            </select>
          </div>
          <div className="f">
            <span className="label">Action</span>
            <select value={action} onChange={(e) => setAction(e.target.value as Guardrail['action'])}>
              <option value="flag">flag</option>
              <option value="redact">redact</option>
              <option value="rewrite">rewrite</option>
              <option value="block">block</option>
            </select>
          </div>
          <button className="btn-sq" onClick={submit} disabled={!name.trim()}>
            Add
          </button>
        </div>
      </div>

      <div style={{ padding: '20px 24px 8px', display: 'flex', justifyContent: 'space-between' }}>
        <span className="label">Active rails</span>
        <span className="label" style={{ color: 'var(--ink-1)' }}>
          {active} / {rails.length}
        </span>
      </div>

      {rails.map((g) => (
        <div className="grow" key={g.id}>
          <button
            className="tog"
            data-on={g.enabled}
            onClick={() => onToggle(g.id)}
            aria-label={`${g.enabled ? 'Disable' : 'Enable'} ${g.name}`}
          >
            <i />
          </button>
          <div>
            <h3>
              {g.name}
              {g.custom && (
                <span className="pill" style={{ marginLeft: 10 }}>
                  Custom
                </span>
              )}
            </h3>
            <p>{g.detail}</p>
          </div>
          <div className="grow__meta">
            <span className="tag">
              {g.scope} · {g.action}
            </span>
            <span className="hits">
              {g.hits} HIT{g.hits === 1 ? '' : 'S'}
            </span>
            {g.custom && (
              <button className="hits" style={{ color: 'var(--red-hi)' }} onClick={() => onRemove(g.id)}>
                REMOVE
              </button>
            )}
          </div>
        </div>
      ))}
    </Sheet>
  );
}
