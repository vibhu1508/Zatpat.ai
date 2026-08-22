import { BANDS, field } from './voiceField';

/**
 * The agent's turn.
 *
 * SpeechSynthesis gives us audio we can't tap with an AnalyserNode, so the
 * band data is *modelled* instead of measured: word-boundary events drive a
 * syllable envelope, and a fixed formant-ish tilt shapes it across the bands.
 * Visually it is indistinguishable from analysed speech, and it stays exact
 * to the words actually being spoken.
 */

export interface AgentVoiceOptions {
  onWord?: (charIndex: number, charLength: number) => void;
  onEnd?: () => void;
  onStart?: () => void;
}

/** Rough vocal-tract tilt: energy peaks in the low-mids, rolls off up top. */
const TILT = Array.from({ length: BANDS }, (_, i) => {
  const t = i / (BANDS - 1);
  return Math.pow(Math.sin(Math.PI * Math.pow(t, 0.62)), 1.15) * (1 - t * 0.45) + 0.06;
});

export class AgentVoice {
  private raf = 0;
  private envelope = 0;
  private pulseAt = 0;
  private phase = 0;
  private opts: AgentVoiceOptions;
  speaking = false;

  constructor(opts: AgentVoiceOptions = {}) {
    this.opts = opts;
  }

  speak(text: string, lang: string = 'en') {
    this.cancel();
    field.speaker = 'agent';
    this.speaking = true;
    this.opts.onStart?.();
    this.pulseAt = performance.now();
    this.loop();

    if (!('speechSynthesis' in window)) {
      // No TTS: still animate for a plausible duration so the turn reads.
      const ms = Math.max(1400, text.length * 52);
      setTimeout(() => this.finish(), ms);
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.04;
    u.pitch = 0.94;
    u.volume = 1;
    const v = pickVoice(lang);
    if (v) u.voice = v;
    if (v) u.lang = v.lang;

    u.onboundary = (e) => {
      // Each word boundary re-triggers the syllable envelope.
      this.pulseAt = performance.now();
      this.opts.onWord?.(e.charIndex, (e as SpeechSynthesisEvent).charLength || 0);
    };
    u.onend = () => this.finish();
    u.onerror = () => this.finish();

    window.speechSynthesis.speak(u);
  }

  private loop = () => {
    if (!this.speaking) return;
    this.raf = requestAnimationFrame(this.loop);

    const now = performance.now();
    const since = now - this.pulseAt;
    // Sharp attack, ~260 ms decay — one syllable.
    const pulse = Math.exp(-since / 260) * (1 - Math.exp(-since / 22));
    this.envelope += (pulse - this.envelope) * 0.35;
    this.phase += 0.055;

    const lvl = Math.min(1, 0.16 + this.envelope * 0.62);
    field.level += (lvl - field.level) * 0.22;

    for (let b = 0; b < BANDS; b++) {
      // Two detuned oscillators per band keep neighbours from marching in step.
      const wob =
        0.5 +
        0.5 * Math.sin(this.phase * (1.0 + b * 0.17) + b * 2.1) * 0.7 +
        0.5 * Math.sin(this.phase * (0.61 + b * 0.09) + b * 5.3) * 0.3;
      const target = Math.min(1, TILT[b] * (0.10 + this.envelope * 0.78) * (0.50 + wob * 0.70));
      const prev = field.bands[b];
      field.bands[b] = target > prev ? prev + (target - prev) * 0.5 : prev + (target - prev) * 0.14;
    }
  };

  private finish() {
    this.speaking = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    if (field.speaker === 'agent') field.speaker = 'idle';
    this.opts.onEnd?.();
  }

  cancel() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    if (this.speaking) this.finish();
  }
}

/**
 * Pick a voice for the answer's language.
 *
 * The corpus answers in Hindi, Marathi, Sanskrit and Tamil, and browser TTS
 * coverage for those is patchy — Sanskrit in particular has no voice anywhere.
 * Falling back to a Hindi voice keeps Devanagari answers intelligible, and
 * failing that to English, so the turn always completes.
 */
const FALLBACK: Record<string, string[]> = {
  hi: ['hi-IN'],
  mr: ['mr-IN', 'hi-IN'],
  sa: ['sa-IN', 'hi-IN'],
  ta: ['ta-IN'],
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
};

const cache = new Map<string, SpeechSynthesisVoice | null>();

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const base = lang.split('-')[0].toLowerCase();
  if (cache.has(base)) return cache.get(base) ?? null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null; // list not populated yet; try again next turn

  let found: SpeechSynthesisVoice | null = null;
  for (const tag of FALLBACK[base] ?? [base]) {
    found = voices.find((v) => v.lang.replace('_', '-').toLowerCase().startsWith(tag.toLowerCase())) ?? null;
    if (found) break;
  }
  found ??= voices.find((v) => v.lang.startsWith('en')) ?? voices[0] ?? null;

  cache.set(base, found);
  return found;
}
