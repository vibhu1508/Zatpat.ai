import { useEffect, useRef } from 'react';
import { field } from '../lib/voiceField';
import type { Phase } from '../lib/types';

/**
 * Press to talk, or hold space. The outer ring tracks loudness directly from
 * the voice field rather than from React state — at 60 fps this must not
 * touch the render tree.
 */
export default function RecordButton({
  phase,
  onToggle,
  disabled,
}: {
  phase: Phase;
  onToggle: () => void;
  disabled?: boolean;
}) {
  const ring = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let eased = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      eased += (field.level - eased) * 0.2;
      const el = ring.current;
      if (el) {
        el.style.transform = `scale(${(1 + eased * 0.42).toFixed(4)})`;
        el.style.opacity = String(0.14 + eased * 0.55);
      }
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const label =
    phase === 'listening' ? 'Stop recording' : phase === 'speaking' ? 'Interrupt agent' : 'Start recording';

  return (
    <button
      className="rec"
      data-phase={phase}
      onClick={onToggle}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{ color: phase === 'speaking' ? 'var(--red)' : 'var(--blue)' }}
    >
      <span className="rec__ring" ref={ring} />
      <span className="rec__core" />
    </button>
  );
}
