import { useEffect, type ReactNode } from 'react';

/** A right-hand sheet. Square, hairline-bordered, escape closes it. */
export default function Sheet({
  title,
  subtitle,
  onClose,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
      <div className="sheet__scrim" onClick={onClose} />
      <div className="sheet__panel">
        <div className="sheet__head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="sheet__x" onClick={onClose}>
            ESC
          </button>
        </div>
        <div className="sheet__body">{children}</div>
      </div>
    </div>
  );
}
