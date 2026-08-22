import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuardrailSheet from '../components/GuardrailSheet';
import LatencyPanel from '../components/LatencyPanel';
import RecordButton from '../components/RecordButton';
import StrategySheet from '../components/StrategySheet';
import TraceSheet from '../components/TraceSheet';
import TurnRail from '../components/TurnRail';
import { AgentVoice } from '../lib/agentVoice';
import { Mic, type MicState } from '../lib/mic';
import { SarvamRealtime } from '../lib/sarvam';
import { AnswerEngine, blankStages } from '../lib/answer';
import type { Entry } from '../lib/retriever';
import { DEFAULT_GUARDRAILS } from '../lib/pipeline';
import { clearSphereSlot, setSphereSlot, signalSphereGlide } from '../lib/sphereSlot';
import { registerAsk } from '../lib/devConsole';
import { logAnswer, logQuery } from '../lib/turnLog';
import type { Guardrail, Message, Phase, Stage, Trace } from '../lib/types';
import { field } from '../lib/voiceField';
import '../styles/chat.css';

type SheetId = 'strategy' | 'guardrails' | 'trace' | null;

const uid = () => Math.random().toString(36).slice(2, 10);

/** How long the console has to clear out before the landing page takes over. */
const LEAVE_MS = 290;

/** Marks a spoken turn where Sarvam sent no language (i.e. one was specified). */
const VOICE_NO_LANG = '\u0000voice';

/**
 * Resolve which language the answer should be in.
 * `detected` is undefined for typed input, VOICE_NO_LANG for a spoken turn with
 * an explicit language_code, or a BCP-47 code when auto-detection ran.
 */
function answerLanguage(detected: string | undefined, selected: string): string {
  if (detected === undefined) return 'en-IN'; // typed
  if (selected !== 'auto') return selected; // explicit beats detection
  return detected === VOICE_NO_LANG ? 'en-IN' : detected;
}

export default function Chat() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [micState, setMicState] = useState<MicState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stages, setStages] = useState<Stage[]>(blankStages());
  const [trace, setTrace] = useState<Trace | null>(null);
  const [prevTotal, setPrevTotal] = useState<number | null>(null);
  const [rails, setRails] = useState<Guardrail[]>(DEFAULT_GUARDRAILS);
  const [sheet, setSheet] = useState<SheetId>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Live caption state.
  const [interim, setInterim] = useState('');
  const [agentText, setAgentText] = useState('');
  const [spoken, setSpoken] = useState({ index: 0, length: 0 });

  const [typed, setTyped] = useState('');
  /** Non-fatal connection trouble, surfaced in the caption. */
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [corpusReady, setCorpusReady] = useState(false);
  /**
   * Which language you are speaking. Naming it explicitly beats `auto` twice
   * over: it lets saaras narrow its acoustic search, and it is the only way to
   * know which language to answer in — `mode=translate` always reports the
   * output language, which is English by definition.
   */
  const [spokenLang, setSpokenLang] = useState('hi-IN');

  // Arrival + departure choreography. The sphere is already on screen when
  // this mounts — the console builds itself around it.
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const orb = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Engines are refs: they own timers and audio graphs, never re-render.
  const mic = useRef<Mic | null>(null);
  const sarvam = useRef<SarvamRealtime | null>(null);
  const voice = useRef<AgentVoice | null>(null);
  const engine = useRef<AnswerEngine | null>(null);
  // Turn timing, measured rather than modelled.
  const micStartAt = useRef(0);
  const speechEndAt = useRef(0);
  const phaseRef = useRef<Phase>('idle');
  const railsRef = useRef(rails);
  const langRef = useRef(spokenLang);
  const submitRef = useRef<(t: string, detectedLang?: string) => void>(() => {});
  const traceRef = useRef<Trace | null>(null);

  phaseRef.current = phase;
  railsRef.current = rails;
  langRef.current = spokenLang;

  // Publish the console's orb rectangle; the shared sphere layer grows into it.
  useEffect(() => {
    const el = orb.current;
    setSphereSlot(el, 1);
    // No pulse here — the landing page already fired one for this transition,
    // and the sphere is still mid-flight when this mounts.
    // Two frames, so the entry styles are committed before they are released.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    return () => {
      cancelAnimationFrame(id);
      clearSphereSlot(el);
    };
  }, []);

  const toLanding = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (leaving) return;
    signalSphereGlide();
    setLeaving(true);
    voice.current?.cancel();
    mic.current?.stop();
    field.pulse(0.72);
    window.setTimeout(() => navigate('/'), LEAVE_MS);
  };

  /* ── the turn ────────────────────────────────────────────── */

  const submit = useCallback((text: string, detectedLang?: string) => {
    const clean = text.trim();
    if (!clean) {
      setPhase('idle');
      return;
    }

    const eng = engine.current;
    if (!eng) {
      setVoiceError('Corpus still loading.');
      setPhase('idle');
      return;
    }

    setMessages((m) => [...m, { id: uid(), role: 'user', text: clean, at: Date.now() }]);
    logQuery(clean);
    setInterim('');
    setAgentText('');
    setSpoken({ index: 0, length: 0 });
    setPhase('thinking');
    setStages(blankStages());

    const now = performance.now();
    const utteranceMs =
      speechEndAt.current && micStartAt.current ? speechEndAt.current - micStartAt.current : 0;
    const transcribeMs = speechEndAt.current ? now - speechEndAt.current : 0;

    const { text: answer, lang, trace: t } = eng.answer({
      query: clean,
      // Which language to answer in, in order of trust:
      //   1. typed input          -> English, you typed it
      //   2. an explicit choice   -> that language; you know better than the
      //                              detector, and naming it also speeds up ASR
      //   3. auto                 -> whatever saaras detected, when it is one
      //                              of the corpus languages
      // Sarvam only sends `language` under language_code=auto, and detection is
      // not dependable — it read synthesised Hindi as en-IN in testing — which
      // is why an explicit choice wins over it.
      languageCode: answerLanguage(detectedLang, langRef.current),
      guardrails: railsRef.current,
      utteranceMs,
      transcribeMs,
      onStages: setStages,
    });

    setPrevTotal((p) => (traceRef.current ? traceRef.current.totalMs : p));
    setTrace(t);
    traceRef.current = t;
    setStages(t.stages);

    // Fold this turn's verdicts back into the rail hit counters.
    setRails((rs) =>
      rs.map((r) => {
        const v = t.guardHits.find((h) => h.railId === r.id);
        return v && !v.passed ? { ...r, hits: r.hits + 1 } : r;
      }),
    );

    const id = uid();
    setMessages((m) => [...m, { id, role: 'agent', text: answer, at: Date.now(), trace: t }]);
    setSelectedId(id);
    setAgentText(answer);
    setPhase('speaking');
    logAnswer(answer, t);
    voice.current?.speak(answer, lang);
  }, []);

  submitRef.current = submit;

  // Let the dev console drive a real turn without a microphone.
  useEffect(() => {
    registerAsk((text) => submitRef.current(text));
    return () => registerAsk(null);
  }, []);

  /* ── engine wiring ───────────────────────────────────────── */

  // The corpus is fetched rather than bundled: 136 KB of JSON has no business
  // in the JS payload, and this way the browser caches it separately.
  useEffect(() => {
    let alive = true;
    fetch('/corpus.json')
      .then((r) => r.json())
      .then((d: { entries: Entry[] }) => {
        if (!alive) return;
        engine.current = new AnswerEngine(d.entries);
        setCorpusReady(true);
      })
      .catch(() => alive && setVoiceError('Could not load the corpus.'));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    // Sarvam's server-side VAD segments the utterance, so the local energy
    // gate is off — it only drives the sphere.
    const m = new Mic({
      localVad: false,
      onState: setMicState,
      onPcm: (frame) => sarvam.current?.pushPcm(frame),
    });

    const sr = new SarvamRealtime({
      mode: 'translate',
      languageCode: 'auto',
      streamType: 'fast',
      onPartial: (text) => setInterim(text),
      onWaking: () => setVoiceError('Waking the speech service… this can take up to a minute on first use.'),
      onSpeechEnd: () => {
        speechEndAt.current = performance.now();
      },
      onFinal: (text, language) => {
        // One utterance, one turn: stop capturing and answer it.
        mic.current?.stop();
        sarvam.current?.close();
        submitRef.current(text, language ?? VOICE_NO_LANG);
      },
      onError: (message, fatal) => {
        setVoiceError(message);
        if (fatal) {
          mic.current?.stop();
          setPhase('idle');
        }
      },
    });

    const v = new AgentVoice({
      onWord: (index, length) => setSpoken({ index, length }),
      onEnd: () => {
        setPhase('idle');
        setSpoken({ index: 0, length: 0 });
      },
    });

    mic.current = m;
    sarvam.current = sr;
    voice.current = v;

    if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

    return () => {
      m.stop();
      sr.close();
      v.cancel();
      field.reset();
      field.speaker = 'idle';
      mic.current = null;
      sarvam.current = null;
      voice.current = null;
    };
  }, []);

  /* ── controls ────────────────────────────────────────────── */

  const startListening = useCallback(() => {
    if (phaseRef.current === 'listening' || phaseRef.current === 'thinking') return;
    voice.current?.cancel();
    setAgentText('');
    setInterim('');
    setVoiceError(null);
    setPhase('listening');
    micStartAt.current = performance.now();
    speechEndAt.current = 0;
    sarvam.current?.connect(langRef.current);
    mic.current?.start();
  }, []);

  const stopListening = useCallback(() => {
    if (phaseRef.current !== 'listening') return;
    // Push-to-talk release. Close the socket and let Sarvam's final transcript
    // land through onFinal — the audio already sent is still being decoded.
    mic.current?.stop();
    if (!speechEndAt.current) speechEndAt.current = performance.now();
    sarvam.current?.close();
    setPhase('thinking');
  }, []);

  const toggle = useCallback(() => {
    const p = phaseRef.current;
    if (p === 'listening') stopListening();
    else if (p === 'speaking') {
      voice.current?.cancel();
      setPhase('idle');
    } else if (p === 'idle') startListening();
  }, [startListening, stopListening]);

  // Hold space to talk. Ignored while typing or while a sheet is open.
  useEffect(() => {
    const typingIn = (t: EventTarget | null) =>
      t instanceof HTMLElement && (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.isContentEditable);

    const down = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.repeat || typingIn(e.target) || sheet) return;
      e.preventDefault();
      startListening();
    };
    const up = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || typingIn(e.target) || sheet) return;
      e.preventDefault();
      stopListening();
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [startListening, stopListening, sheet]);

  /* ── caption ─────────────────────────────────────────────── */

  const caption = (() => {
    if (phase === 'speaking' && agentText) {
      const { index, length } = spoken;
      const head = agentText.slice(0, index);
      const word = length ? agentText.slice(index, index + length) : '';
      const tail = agentText.slice(index + (length || 0));
      return (
        <div className="caption__in" data-role="agent">
          {head}
          {word && <em>{word}</em>}
          <s>{tail}</s>
        </div>
      );
    }
    if (phase === 'listening') {
      return (
        <div className="caption__in" data-role="user">
          {interim || <span style={{ color: 'var(--ink-3)' }}>Listening…</span>}
          <span className="caption__cursor" />
        </div>
      );
    }
    if (phase === 'thinking') {
      const last = [...messages].reverse().find((m) => m.role === 'user');
      return (
        <div className="caption__in" data-role="idle">
          {last?.text}
        </div>
      );
    }
    if (voiceError)
      return (
        <div className="caption__in" data-role="idle" style={{ color: 'var(--red-hi)' }}>
          {voiceError}
        </div>
      );
    if (micState === 'denied')
      return (
        <div className="caption__in" data-role="idle">
          Microphone blocked. Allow it in the address bar, or type a question below.
        </div>
      );
    if (!corpusReady)
      return (
        <div className="caption__in" data-role="idle">
          Loading corpus…
        </div>
      );
    return (
      <div className="caption__in" data-role="idle">
        {messages.length
          ? 'Press space, or the button, to ask again.'
          : 'Hold space or press the button, then ask a question — in Hindi, Marathi, Tamil, Sanskrit or English. The answer comes back in the language you asked it.'}
      </div>
    );
  })();

  const selected = messages.find((m) => m.id === selectedId) ?? null;
  const sheetTrace = selected?.trace ?? trace;

  return (
    <div className="cs" data-enter={entered} data-leaving={leaving}>
      {/* ── bar ─────────────────────────────────────────── */}
      <header className="cs__bar">
        <a href="/" className="cs__back" onClick={toLanding}>
          <span className="chev">←</span> ZATPAT<span style={{ color: 'var(--ink-3)' }}>.AI</span>
        </a>
        <div className="cs__tabs">
          <button className="cs__tab" data-on={sheet === 'strategy'} onClick={() => setSheet('strategy')}>
            Chunking
          </button>
          <button className="cs__tab" data-on={sheet === 'guardrails'} onClick={() => setSheet('guardrails')}>
            Guardrails
          </button>
        </div>
        <div className="cs__spacer" />
        <label className="cs__lang">
          <span className="label">Speaking</span>
          <select value={spokenLang} onChange={(e) => setSpokenLang(e.target.value)}>
            <option value="hi-IN">हिन्दी</option>
            <option value="mr-IN">मराठी</option>
            <option value="ta-IN">தமிழ்</option>
            <option value="sa-IN">संस्कृतम्</option>
            <option value="en-IN">English</option>
            <option value="auto">Auto-detect</option>
          </select>
        </label>
        <div className="cs__state" data-phase={phase}>
          <i />
          {phase === 'idle' && (micState === 'denied' ? 'mic blocked' : 'ready')}
          {phase === 'listening' && 'listening'}
          {phase === 'thinking' && 'retrieving'}
          {phase === 'speaking' && 'answering'}
        </div>
      </header>

      {/* ── body ────────────────────────────────────────── */}
      <div className="cs__body">
        <TurnRail
          messages={messages}
          selectedId={selectedId}
          onSelect={(m) => {
            setSelectedId(m.id);
            if (m.trace) setSheet('trace');
          }}
          onClear={() => {
            setMessages([]);
            setTrace(null);
            setSelectedId(null);
            setStages(blankStages());
            setPrevTotal(null);
          }}
        />

        <main className="stage">
          <div className="stage__orb" ref={orb} />

          <div className="caption">{caption}</div>

          <div className="ctl">
            <div className="type">
              <span className="label" style={{ color: 'var(--ink-3)' }}>›</span>
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && typed.trim() && phase !== 'thinking') {
                    submit(typed);
                    setTyped('');
                  }
                }}
                placeholder="or type a question in English" 
                aria-label="Type a query"
              />
            </div>

            <RecordButton phase={phase} onToggle={toggle} disabled={phase === 'thinking'} />

            <div className="ctl__right">
              <span className="ctl__hint">
                <kbd>space</kbd> hold to talk · <kbd>click</kbd> auto-stop
              </span>
            </div>
          </div>
        </main>

        <LatencyPanel
          stages={stages}
          trace={trace}
          previousTotal={prevTotal}
          onOpen={() => setSheet('trace')}
        />
      </div>

      {/* ── sheets ──────────────────────────────────────── */}
      {sheet === 'strategy' && <StrategySheet trace={sheetTrace} onClose={() => setSheet(null)} />}
      {sheet === 'guardrails' && (
        <GuardrailSheet
          rails={rails}
          trace={sheetTrace}
          onToggle={(id) => setRails((rs) => rs.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)))}
          onAdd={(g) => setRails((rs) => [...rs, g])}
          onRemove={(id) => setRails((rs) => rs.filter((r) => r.id !== id))}
          onClose={() => setSheet(null)}
        />
      )}
      {sheet === 'trace' && sheetTrace && <TraceSheet trace={sheetTrace} onClose={() => setSheet(null)} />}
    </div>
  );
}
