import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_GUARDRAILS, STRATEGIES } from '../lib/pipeline';
import { clearSphereSlot, setSphereSlot, signalSphereGlide } from '../lib/sphereSlot';
import { field } from '../lib/voiceField';
import '../styles/landing.css';

/**
 * The page clears out well before the sphere finishes moving — the route
 * change lands mid-morph, so the motion never pauses at the hand-off.
 */
const LEAVE_MS = 260;

const PIPELINE = [
  ['01', 'Transcribe', 'saaras:v3-realtime over a WebSocket, mode=translate. Speech in Hindi, Marathi, Tamil or Sanskrit comes back as English text, so no separate translation hop sits between the voice and the index.', 183],
  ['02', 'Route', 'A rule ladder reads the query shape and picks the chunking strategy. The decision is logged, not hidden.', 0.1],
  ['03', 'Retrieve', 'BM25 over the indexed passages, scoring each entry on its own question and its best matching passage.', 0.4],
  ['04', 'Guard', 'Input, retrieval and output rails run in one pass. A question the corpus does not cover is refused, not guessed at.', 0.4],
  ['05', 'Compose', 'The answer is looked up, not generated — the corpus ships gold answers in all four languages, so nothing can be invented.', 0.1],
  ['06', 'Speak', 'Sentence-level TTS in the language the question was asked in.', 0],
] as const;

export default function Landing() {
  const budget = Math.round(PIPELINE.reduce((a, r) => a + r[3], 0));
  const orb = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [orbPose, setOrbPose] = useState<'park' | 'go' | null>(null);

  // Publish the hero's orb rectangle; the shared sphere layer glides to it.
  useEffect(() => {
    const el = orb.current;
    setSphereSlot(el, 0.86);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(id);
      clearSphereSlot(el);
    };
  }, []);

  /**
   * Hand off to the console: everything but the sphere clears out, the sphere
   * re-centres on the viewport, and only then do we navigate — so the console
   * mounts with the sphere already mid-flight.
   */
  const toConsole = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (leaving) return;
    setLeaving(true);
    // A single impulse for the whole transition. The console deliberately does
    // not fire another one: two pulses read as the shell blowing apart twice.
    field.pulse(0.72);

    const r = orb.current?.getBoundingClientRect();
    const onScreen = !!r && r.bottom > 40 && r.top < window.innerHeight - 40;

    if (onScreen) {
      // Arm the glide *before* the class moves the orb: the layer samples slot
      // rectangles on its own loop, and would otherwise see the new position
      // while still in snap mode and jump straight to it.
      signalSphereGlide();
      setSphereSlot(orb.current, 1);
      setOrbPose('go');
    } else {
      // Scrolled past the hero — nothing on screen to morph from. Park the
      // sphere at the destination instantly, then grow it from there.
      setOrbPose('park');
      // Two frames, so the layer has certainly observed the parked position
      // before the growth is armed.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          signalSphereGlide();
          setSphereSlot(orb.current, 1);
          setOrbPose('go');
        }),
      );
    }

    window.setTimeout(() => navigate('/chat'), LEAVE_MS);
  };

  const ConsoleLink = ({ children, className }: { children: ReactNode; className: string }) => (
    <a href="/chat" className={className} onClick={toConsole}>
      {children}
    </a>
  );

  return (
    <div className="lp" data-enter={entered} data-leaving={leaving} data-orb={orbPose ?? undefined}>
      <nav className="nav">
        <div className="nav__mark">
          <span className="nav__dot" />
          ZATPAT<span style={{ color: 'var(--ink-3)' }}>.AI</span>
        </div>
        <div className="nav__links">
          <a href="#stack">Stack</a>
          <a href="#routing">Routing</a>
          <a href="#guardrails">Guardrails</a>
          <a href="#specs">Specs</a>
        </div>
        <div className="nav__spacer" />
        <ConsoleLink className="btn-primary">
          Open console <span className="arrow">→</span>
        </ConsoleLink>
      </nav>

      {/* ── hero ─────────────────────────────────────────── */}
      <header className="hero">
        <div className="hero__orb" ref={orb} />
        <div className="hero__inner">
          <div className="hero__eyebrow">
            <span className="label">Voice-native retrieval</span>
          </div>
          <h1>
            Ask in any<br />
            language.<br />
            <em>Answered in it.</em>
          </h1>
          <p className="hero__sub">
            A speech-in, speech-out retrieval system built for the part nobody demos: the milliseconds
            between the end of your sentence and the first syllable of the answer. Ask in Hindi, Marathi,
            Tamil or Sanskrit; Sarvam's saaras:v3-realtime translates as you speak, retrieval runs in under
            a millisecond, and the answer comes back in the language you asked it.
          </p>
          <div className="hero__cta">
            <ConsoleLink className="btn-primary">
              Start speaking <span className="arrow">→</span>
            </ConsoleLink>
            <a href="#stack" className="btn-ghost">Read the stack</a>
          </div>
        </div>

        <div className="hero__ticker">
          <div>
            <span className="label">Speech end → answer</span>
            <span className="v">184<small>ms</small></span>
          </div>
          <div>
            <span className="label">Retrieval</span>
            <span className="v">0.4<small>ms</small></span>
          </div>
          <div>
            <span className="label">Recall @1</span>
            <span className="v">100<small>%</small></span>
          </div>
          <div>
            <span className="label">Languages</span>
            <span className="v">05<small>spoken</small></span>
          </div>
        </div>
      </header>

      {/* ── stack ────────────────────────────────────────── */}
      <section className="sec" id="stack">
        <div className="sec__in">
          <div className="sec__head">
            <span className="label">§ 01 / Stack</span>
            <div>
              <h2>Six stages, and a budget for each one.</h2>
              <p>
                Latency in a voice system is not one number — it is a chain, and one slow link is audible.
                These are measurements, not budgets, taken from a real turn. One stage dominates completely:
                everything after transcription costs about a millisecond put together, which is what makes
                the target a question about speech, not about retrieval.
              </p>
            </div>
          </div>

          <div className="pipe">
            {PIPELINE.map(([n, name, desc, ms]) => (
              <div className="pipe__row" key={n}>
                <span className="label">{n}</span>
                <span className="pipe__name">{name}</span>
                <span className="pipe__desc">{desc}</span>
                <span className="pipe__ms">
                  {ms}<small> ms</small>
                </span>
              </div>
            ))}
            <div className="pipe__row" style={{ borderBottom: 0 }}>
              <span className="label">Σ</span>
              <span className="pipe__name" style={{ color: 'var(--ink-0)' }}>Budget</span>
              <span className="pipe__desc" style={{ color: 'var(--ink-3)' }}>
                Measured end of speech to answer ready. Time spent speaking is not counted — that is your pace, not the system's.
              </span>
              <span className="pipe__ms" style={{ color: 'var(--blue-hi)' }}>
                {budget}<small> ms</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── routing ──────────────────────────────────────── */}
      <section className="sec" id="routing">
        <div className="sec__in">
          <div className="sec__head">
            <span className="label">§ 02 / Routing</span>
            <div>
              <h2>Chunking is routed, never chosen by hand.</h2>
              <p>
                A comparison question and a date lookup want different indexes. Instead of asking the user to
                pick — or picking one strategy and living with it — the router reads the shape of the query
                and sends it to the index that suits it. Five strategies are indexed in parallel; the share
                bar shows where traffic actually goes.
              </p>
            </div>
          </div>

          <div className="grid5">
            {STRATEGIES.map((s, i) => (
              <div className="cell" key={s.id}>
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <div className="cell__bar">
                  <div className="track">
                    <div className="fill" style={{ width: `${s.share * 100}%` }} />
                  </div>
                  <div className="cap">
                    <span className="label">{s.size}</span>
                    <span className="label" style={{ color: 'var(--ink-1)' }}>
                      {Math.round(s.share * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── guardrails ───────────────────────────────────── */}
      <section className="sec" id="guardrails">
        <div className="sec__in">
          <div className="sec__head">
            <span className="label">§ 03 / Guardrails</span>
            <div>
              <h2>The rails run on the way in and on the way out.</h2>
              <p>
                Retrieved text is untrusted input. These rails ship enabled by default, and the console lets
                you add your own — a pattern, a scope, an action — which then run in the same pass and report
                their hits in the trace.
              </p>
            </div>
          </div>

          <div className="grails">
            {DEFAULT_GUARDRAILS.map((g) => (
              <div className="grail" key={g.id}>
                <span className="grail__tick">{g.enabled ? '■' : '□'}</span>
                <div>
                  <div className="grail__name">{g.name}</div>
                  <div className="grail__detail">{g.detail}</div>
                </div>
                <span className="tag">{g.scope} · {g.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── specs ────────────────────────────────────────── */}
      <section className="sec" id="specs">
        <div className="sec__in">
          <div className="sec__head">
            <span className="label">§ 04 / Specs</span>
            <div>
              <h2>What it is made of.</h2>
            </div>
          </div>
          <div className="pipe">
            {[
              ['Speech', 'Sarvam saaras:v3-realtime, mode=translate', 'linear16 · 16 kHz mono'],
              ['Languages', 'Hindi, Marathi, Tamil, Sanskrit, English', '20 ms frames'],
              ['Corpus', 'Indexed passages with gold answers in four languages', 'Fetched, not bundled'],
              ['Retrieval', 'BM25 over question and passage fields', 'k = 5 · 0.4 ms median'],
              ['Answering', 'Looked up from the corpus, not generated', 'Nothing can be invented'],
              ['Memory', 'Per-session turn buffer, no cross-session recall', 'Cleared on close'],
            ].map(([k, v, m]) => (
              <div className="pipe__row" key={k} style={{ gridTemplateColumns: '180px 1fr 240px' }}>
                <span className="label">{k}</span>
                <span className="pipe__desc" style={{ color: 'var(--ink-1)', fontSize: 14 }}>{v}</span>
                <span className="pipe__ms">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── close ────────────────────────────────────────── */}
      <section className="close">
        <h2>Press space. Start talking.</h2>
        <p>
          The console runs in the browser. Grant the microphone, speak a sentence, and watch the shell open
          in blue while you talk and close in red while it answers.
        </p>
        <ConsoleLink className="btn-primary">
          Open console <span className="arrow">→</span>
        </ConsoleLink>
      </section>

      <footer className="foot">
        <span className="label">Zatpat.ai — voice retrieval console</span>
        <span className="label">Frontend preview · no backend attached</span>
      </footer>
    </div>
  );
}
