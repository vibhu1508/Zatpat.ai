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
import { BackendClient } from '../lib/backend';
import { blankStages, DEFAULT_GUARDRAILS, STRATEGIES } from '../lib/pipeline';
import type { ChunkStrategy, Guardrail, Message, Phase, Stage, Trace } from '../lib/types';
import { clearSphereSlot, setSphereSlot, signalSphereGlide } from '../lib/sphereSlot';
import { registerAsk } from '../lib/devConsole';
import { logAnswer, logQuery } from '../lib/turnLog';
import { field } from '../lib/voiceField';
import '../styles/chat.css';

type SheetId = 'strategy' | 'guardrails' | 'trace' | null;

const uid = () => Math.random().toString(36).slice(2, 10);
const LEAVE_MS = 290;

/** Client-side script detector for typed text queries. */
function autoDetectScriptLang(text: string): string {
  if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
  if (/[\u0900-\u097F]/.test(text)) {
    // Check for Marathi words / characters
    if (/[ळ]|(\b(आहे|नाही|काय|कसे|आणि|यांचा|यांचे|मध्ये|कधी|कोण|होते|होती|सांगा)\b)/.test(text)) {
      return 'mr';
    }
    // Check for Sanskrit words
    if (/\b(अस्ति|भवति|सङ्ग्रह|इति|किम्|कुत्र|कदा|यत्र|तत्र)\b/.test(text)) {
      return 'sa';
    }
    return 'hi';
  }
  return 'en';
}

/** Map spoken language selector values to backend lang codes. */
function toLangCode(spokenLang: string, queryText?: string): string {
  if (spokenLang === 'auto' || !spokenLang) {
    if (queryText) return autoDetectScriptLang(queryText);
    return 'auto';
  }
  const base = spokenLang.split('-')[0].toLowerCase();
  if (['hi', 'mr', 'ta', 'sa', 'en'].includes(base)) return base;
  return 'auto';
}

export default function Chat() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [micState, setMicState] = useState<MicState>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [stages, setStages] = useState<Stage[]>(blankStages());
  const [trace, setTrace] = useState<Trace | null>(null);
  const [prevTotal, setPrevTotal] = useState<number | null>(null);
  const [rails, setRails] = useState<Guardrail[]>(DEFAULT_GUARDRAILS);
  const [strategies] = useState<ChunkStrategy[]>(STRATEGIES);
  const [sheet, setSheet] = useState<SheetId>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [interim, setInterim] = useState('');
  const [agentText, setAgentText] = useState('');
  const [spoken, setSpoken] = useState({ index: 0, length: 0 });
  const [typed, setTyped] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [backendReady, setBackendReady] = useState(false);
  const [spokenLang, setSpokenLang] = useState('auto');

  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const orb = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const mic = useRef<Mic | null>(null);
  const sarvam = useRef<SarvamRealtime | null>(null);
  const voice = useRef<AgentVoice | null>(null);
  const backend = useRef<BackendClient | null>(null);
  const sessionId = useRef('session_' + uid());
  const phaseRef = useRef<Phase>('idle');
  const langRef = useRef(spokenLang);
  const messagesRef = useRef<Message[]>([]);
  const submitRef = useRef<(t: string, detectedLang?: string) => void>(() => {});

  // Accumulate streamed answer tokens for current turn
  const tokenBuf = useRef('');
  // Track retrieval data for building the trace
  const lastRetrieval = useRef<any>(null);
  const lastTelemetry = useRef<Record<string, number>>({});
  const lastTps = useRef(0);
  const lastDetectedLang = useRef<string>('auto');

  phaseRef.current = phase;
  langRef.current = spokenLang;
  messagesRef.current = messages;

  // Sphere slot registration
  useEffect(() => {
    const el = orb.current;
    setSphereSlot(el, 1);
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
    sarvam.current?.close();
    field.pulse(0.72);
    window.setTimeout(() => navigate('/'), LEAVE_MS);
  };

  /* ── the turn ────────────────────────────────────────────── */

  const submit = useCallback((text: string, explicitLang?: string) => {
    const clean = text.trim();
    if (!clean) {
      setPhase('idle');
      return;
    }
    if (!backend.current?.connected) {
      setVoiceError('Backend not connected. Make sure server is running on :8000.');
      setPhase('idle');
      return;
    }

    const detected = explicitLang || (langRef.current === 'auto' ? autoDetectScriptLang(clean) : toLangCode(langRef.current));
    lastDetectedLang.current = detected;

    setMessages((m) => [...m, { id: uid(), role: 'user', text: clean, at: Date.now(), lang: detected }]);
    logQuery(clean);
    setInterim('');
    setAgentText('');
    tokenBuf.current = '';
    lastRetrieval.current = null;
    lastTelemetry.current = {};
    lastTps.current = 0;
    setSpoken({ index: 0, length: 0 });
    setPhase('thinking');
    setStages(blankStages());

    backend.current.sendQuery(clean, detected, sessionId.current);
  }, []);

  submitRef.current = submit;

  useEffect(() => {
    registerAsk((text) => submitRef.current(text));
    return () => registerAsk(null);
  }, []);

  /* ── backend wiring ─────────────────────────────────────── */

  useEffect(() => {
    const bc = new BackendClient({
      onConnect: () => {
        setBackendReady(true);
        setVoiceError(null);
      },
      onDisconnect: () => {
        setBackendReady(false);
      },
      onSTT: (data) => {
        const userQuery = data.native_query || data.english_query;
        setInterim(userQuery);
        lastDetectedLang.current = data.detected_lang || 'en';
        setStages((prev) =>
          prev.map((s) =>
            s.id === 'stt' ? { ...s, ms: data.stt_latency_ms, state: 'done' } : s,
          ),
        );
      },
      onRetrieval: (data) => {
        lastRetrieval.current = data;
        setStages((prev) =>
          prev.map((s) => {
            if (s.id === 'input_guard') return { ...s, ms: 0, state: 'done' };
            if (s.id === 'session') return { ...s, ms: 0, state: 'done' };
            if (s.id === 'retrieval') return { ...s, ms: data.retrieval_ms, state: 'done' };
            return s;
          }),
        );
      },
      onToken: (text) => {
        tokenBuf.current += text;
        setAgentText(tokenBuf.current);
        setStages((prev) =>
          prev.map((s) =>
            s.id === 'llm_gen' && s.state !== 'done'
              ? { ...s, state: 'running' }
              : s,
          ),
        );
      },
      onTelemetry: (timings, tokensPerSec) => {
        lastTelemetry.current = timings;
        lastTps.current = tokensPerSec;
        setStages((prev) =>
          prev.map((s) => {
            const key = stageToTimingKey(s.id);
            if (key && timings[key] !== undefined) {
              return { ...s, ms: Math.round(timings[key] * 100) / 100, state: 'done' };
            }
            return s;
          }),
        );
      },
      onDone: (data) => {
        const finalAnswer = data.full_answer || tokenBuf.current;
        const ret = lastRetrieval.current;
        const timings = lastTelemetry.current;

        const finalStages: Stage[] = blankStages().map((s) => {
          const key = stageToTimingKey(s.id);
          if (key && timings[key] !== undefined) {
            return { ...s, ms: Math.round(timings[key] * 100) / 100, state: 'done' as const };
          }
          return { ...s, state: 'done' as const, ms: 0 };
        });

        // Core RAG Latency = Input Guard + Session + Retrieval + Output Guard
        const coreTotalMs = Math.round(
          ((timings.input_guardrail_ms ?? 0) +
            (timings.session_load_ms ?? 0) +
            (timings.retrieval_ms ?? 0) +
            (timings.output_guardrail_ms ?? 0)) * 100,
        ) / 100;

        const resolvedLang = data.lang || lastDetectedLang.current || toLangCode(langRef.current);

        const t: Trace = {
          stages: finalStages,
          totalMs: coreTotalMs > 0 ? coreTotalMs : Math.round(data.total_ms),
          lang: resolvedLang,
          utteranceMs: 0,
          grounded: data.is_grounded,
          groundednessScore: data.groundedness_score,
          topScore: ret?.top_score ?? 0,
          strategy: (ret?.strategy ?? 'A') as any,
          passagesCount: ret?.passages_count ?? 0,
          queryType: ret?.query_type ?? '',
          topPassageSample: ret?.top_passage_sample ?? '',
          k: ret?.passages_count ?? 0,
          chunks: [],
          guardHits: [],
          tokensPerSec: lastTps.current,
          sessionId: data.session_id,
        };

        setPrevTotal((p) => (trace ? trace.totalMs : p));
        setTrace(t);
        setStages(finalStages);

        const id = uid();
        setMessages((m) => [
          ...m,
          { id, role: 'agent', text: finalAnswer, at: Date.now(), lang: resolvedLang, trace: t },
        ]);
        setSelectedId(id);
        setAgentText(finalAnswer);
        setPhase('speaking');
        logAnswer(finalAnswer, t as any);

        // Speak the answer using browser TTS
        const bcp = resolvedLang === 'en' ? 'en-IN' : `${resolvedLang}-IN`;
        voice.current?.speak(finalAnswer, bcp as any);
      },
      onBlocked: (data) => {
        const msg = data.message || 'Query blocked by guardrails.';
        setAgentText(msg);
        const id = uid();
        setMessages((m) => [...m, { id, role: 'agent', text: msg, at: Date.now() }]);
        setSelectedId(id);
        setPhase('idle');

        if (data.timings) {
          setStages((prev) =>
            prev.map((s) => {
              const key = stageToTimingKey(s.id);
              if (key && data.timings[key] !== undefined) {
                return { ...s, ms: Math.round(data.timings[key] * 100) / 100, state: 'done' };
              }
              return s;
            }),
          );
        }
      },
      onError: (error) => {
        setVoiceError(error);
        setPhase('idle');
      },
    });

    bc.connect();
    backend.current = bc;

    return () => {
      bc.close();
      backend.current = null;
    };
  }, []);

  /* ── real-time STT & voice audio streaming ──────────────── */

  useEffect(() => {
    const sr = new SarvamRealtime({
      mode: 'transcribe',
      languageCode: 'auto',
      streamType: 'fast',
      onPartial: (text) => {
        setInterim(text);
      },
      onFinal: (text, language) => {
        mic.current?.stop();
        sarvam.current?.close();
        if (text.trim()) {
          const normLang = language ? language.split('-')[0].toLowerCase() : autoDetectScriptLang(text);
          submitRef.current(text.trim(), normLang);
        } else {
          setPhase('idle');
        }
      },
      onError: (msg, fatal) => {
        setVoiceError(msg);
        if (fatal) {
          mic.current?.stop();
          setPhase('idle');
        }
      },
    });

    const m = new Mic({
      localVad: false,
      onState: setMicState,
      onPcm: (frame) => {
        sarvam.current?.pushPcm(frame);
      },
    });

    const v = new AgentVoice({
      onWord: (index, length) => setSpoken({ index, length }),
      onEnd: () => {
        setPhase('idle');
        setSpoken({ index: 0, length: 0 });
      },
    });

    sarvam.current = sr;
    mic.current = m;
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

    const chosenLang = langRef.current === 'auto' ? undefined : langRef.current;
    sarvam.current?.connect(chosenLang);
    mic.current?.start();
  }, []);

  const stopListening = useCallback(() => {
    if (phaseRef.current !== 'listening') return;
    mic.current?.stop();
    sarvam.current?.close();
    setPhase('thinking');
    setStages(blankStages());
  }, []);

  const toggle = useCallback(() => {
    const p = phaseRef.current;
    if (p === 'listening') stopListening();
    else if (p === 'speaking') {
      voice.current?.cancel();
      setPhase('idle');
    } else if (p === 'idle') startListening();
  }, [startListening, stopListening]);

  // Hold space to talk
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
          {agentText || last?.text || 'Retrieving from Redis…'}
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
    if (!backendReady)
      return (
        <div className="caption__in" data-role="idle">
          Connecting to backend…
        </div>
      );
    return (
      <div className="caption__in" data-role="idle">
        {messages.length
          ? 'Press space, or the button, to ask again.'
          : 'Hold space or press the button, then ask a question — words stream in real time, and answers return in complete sentences.'}
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
          <span className="label">Language</span>
          <select value={spokenLang} onChange={(e) => setSpokenLang(e.target.value)}>
            <option value="auto">Auto-detect</option>
            <option value="hi-IN">हिन्दी (Hindi)</option>
            <option value="mr-IN">मराठी (Marathi)</option>
            <option value="ta-IN">தமிழ் (Tamil)</option>
            <option value="sa-IN">संस्कृतम् (Sanskrit)</option>
            <option value="en-IN">English</option>
          </select>
        </label>
        <div className="cs__state" data-phase={phase}>
          <i />
          {phase === 'idle' && (backendReady ? 'ready' : 'connecting…')}
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
            sessionId.current = 'session_' + uid();
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
                placeholder="Ask any question in any language (Auto-detected)..."
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
      {sheet === 'strategy' && <StrategySheet strategies={strategies} trace={sheetTrace} onClose={() => setSheet(null)} />}
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

/* ── helpers ────────────────────────────────────────────── */

function stageToTimingKey(id: string): string | null {
  const map: Record<string, string> = {
    stt: 'stt_ms',
    input_guard: 'input_guardrail_ms',
    session: 'session_load_ms',
    retrieval: 'retrieval_ms',
    output_guard: 'output_guardrail_ms',
    llm_gen: 'llm_generation_ms',
    groundedness: 'groundedness_ms',
  };
  return map[id] ?? null;
}
