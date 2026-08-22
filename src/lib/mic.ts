import { BANDS, field } from './voiceField';
import { SAMPLE_RATE } from './sarvam';

export type MicState = 'idle' | 'requesting' | 'live' | 'denied' | 'unsupported';

/** Silence this long (ms) after speech has started ends the turn. */
const END_SILENCE_MS = 1100;
/** RMS above this counts as speech. */
const SPEECH_RMS = 0.020;
/** RMS below this counts as silence (hysteresis band avoids flapping). */
const SILENCE_RMS = 0.012;

export interface MicOptions {
  /** Fired once the analyser detects a natural end of utterance. */
  onUtteranceEnd?: () => void;
  /** Fired the first time energy crosses the speech threshold. */
  onSpeechStart?: () => void;
  onState?: (s: MicState) => void;
  /**
   * One PCM16 frame (20 ms at 16 kHz) off the audio thread, ready to stream.
   * The sphere's analyser and this share a single MediaStream and a single
   * AudioContext — capturing twice would double the permission cost and let
   * the two drift apart.
   */
  onPcm?: (frame: ArrayBuffer) => void;
  /**
   * Something in the capture chain failed in a way the user must be told about.
   * Audio problems are otherwise invisible: the socket connects, the sphere
   * reacts, and nothing is ever transcribed — which looks like a broken model
   * rather than a broken microphone.
   */
  onFault?: (message: string) => void;
  /**
   * Use the local energy gate to end the turn. Off when Sarvam is driving,
   * since its server-side VAD is better and already segments the utterance.
   */
  localVad?: boolean;
}

export class Mic {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private framesSent = 0;
  private frameWatch = 0;
  private freq = new Uint8Array(new ArrayBuffer(0));
  private time = new Float32Array(new ArrayBuffer(0));
  private raf = 0;

  private hasSpoken = false;
  private silenceSince = 0;
  private opts: MicOptions;
  state: MicState = 'idle';

  /** Log-spaced bin edges, computed once the sample rate is known. */
  private edges: number[] = [];

  constructor(opts: MicOptions = {}) {
    this.opts = opts;
  }

  private setState(s: MicState) {
    this.state = s;
    this.opts.onState?.(s);
  }

  async start() {
    if (this.state === 'live' || this.state === 'requesting') return;
    if (!navigator.mediaDevices?.getUserMedia) {
      this.setState('unsupported');
      return;
    }
    this.setState('requesting');
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch {
      this.setState('denied');
      return;
    }

    // Constructed at 16 kHz so the browser resamples the capture for us —
    // Sarvam wants linear16/16000 and manual downsampling would only add
    // latency and error.
    try {
      this.ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
    } catch {
      // Some browsers refuse a forced sample rate. Falling back keeps the app
      // working, but the audio then needs resampling before it is streamed.
      this.ctx = new AudioContext();
    }
    if (this.ctx.sampleRate !== SAMPLE_RATE && this.opts.onPcm) {
      this.opts.onFault?.(
        `Microphone is running at ${this.ctx.sampleRate} Hz, not ${SAMPLE_RATE} Hz. Speech may not transcribe.`,
      );
    }
    await this.ctx.resume();
    const src = this.ctx.createMediaStreamSource(this.stream);

    if (this.opts.onPcm) {
      try {
        await this.ctx.audioWorklet.addModule('/pcm-worklet.js');
        const node = new AudioWorkletNode(this.ctx, 'pcm', {
          numberOfInputs: 1,
          numberOfOutputs: 0,
          processorOptions: { frame: 320 },
        });
        node.port.onmessage = (e: MessageEvent<ArrayBuffer>) => {
          this.framesSent++;
          this.opts.onPcm?.(e.data);
        };
        src.connect(node);
        this.worklet = node;
      } catch (err) {
        // Without the worklet nothing is streamed, so nothing is transcribed.
        // The sphere still animates off the analyser, which makes this look
        // like a model failure unless it is reported.
        this.opts.onState?.('unsupported');
        this.opts.onFault?.(
          `Audio capture unavailable (${err instanceof Error ? err.message : 'worklet failed to load'}). Speech cannot be sent.`,
        );
      }
    }

    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.72;
    analyser.minDecibels = -92;
    analyser.maxDecibels = -18;
    src.connect(analyser);

    this.analyser = analyser;
    this.freq = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    this.time = new Float32Array(new ArrayBuffer(analyser.fftSize * 4));
    this.edges = logEdges(analyser.frequencyBinCount, this.ctx.sampleRate);

    this.hasSpoken = false;
    this.silenceSince = 0;
    this.framesSent = 0;
    field.speaker = 'user';
    this.setState('live');

    // If audio is being captured but no frames reach the socket, say so rather
    // than sit silently producing no transcript.
    if (this.opts.onPcm) {
      this.frameWatch = window.setTimeout(() => {
        if (this.framesSent === 0) {
          this.opts.onFault?.('Microphone is open but no audio is being captured.');
        }
      }, 2500);
    }
    this.loop();
  }

  private loop = () => {
    const analyser = this.analyser;
    if (!analyser) return;
    this.raf = requestAnimationFrame(this.loop);

    analyser.getByteFrequencyData(this.freq);
    analyser.getFloatTimeDomainData(this.time);

    // Broadband RMS drives both the VAD and the sphere's overall bloom.
    let sum = 0;
    for (let i = 0; i < this.time.length; i++) sum += this.time[i] * this.time[i];
    const rms = Math.sqrt(sum / this.time.length);

    // Fold the FFT into log-spaced perceptual bands.
    for (let b = 0; b < BANDS; b++) {
      const lo = this.edges[b];
      const hi = Math.max(this.edges[b + 1], lo + 1);
      let peak = 0;
      for (let i = lo; i < hi; i++) if (this.freq[i] > peak) peak = this.freq[i];
      const target = Math.pow(peak / 255, 1.35);
      // Attack fast, release slow — reads as "alive" rather than jittery.
      const prev = field.bands[b];
      field.bands[b] = target > prev ? prev + (target - prev) * 0.55 : prev + (target - prev) * 0.12;
    }

    const lvl = Math.min(1, rms * 9);
    field.level += (lvl - field.level) * (lvl > field.level ? 0.5 : 0.09);

    // ── voice activity ──────────────────────────────────────
    const now = performance.now();
    if (rms > SPEECH_RMS) {
      if (!this.hasSpoken) {
        this.hasSpoken = true;
        this.opts.onSpeechStart?.();
      }
      this.silenceSince = 0;
    } else if (rms < SILENCE_RMS && this.hasSpoken && this.opts.localVad !== false) {
      if (this.silenceSince === 0) this.silenceSince = now;
      else if (now - this.silenceSince > END_SILENCE_MS) {
        this.opts.onUtteranceEnd?.();
        this.stop();
      }
    }
  };

  stop() {
    window.clearTimeout(this.frameWatch);
    this.frameWatch = 0;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.analyser = null;
    this.worklet?.port.close();
    this.worklet?.disconnect();
    this.worklet = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.hasSpoken = false;
    if (this.state !== 'denied' && this.state !== 'unsupported') this.setState('idle');
    if (field.speaker === 'user') field.speaker = 'idle';
  }
}

/** Bin indices for BANDS log-spaced buckets between 60 Hz and 11 kHz. */
function logEdges(binCount: number, sampleRate: number): number[] {
  const nyquist = sampleRate / 2;
  const lo = 60;
  const hi = Math.min(11000, nyquist);
  const out: number[] = [];
  for (let b = 0; b <= BANDS; b++) {
    const f = lo * Math.pow(hi / lo, b / BANDS);
    out.push(Math.min(binCount - 1, Math.round((f / nyquist) * binCount)));
  }
  return out;
}
