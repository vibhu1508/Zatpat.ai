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
  onUtteranceEnd?: () => void;
  onSpeechStart?: () => void;
  onState?: (s: MicState) => void;
  onPcm?: (frame: ArrayBuffer) => void;
  localVad?: boolean;
}

export class Mic {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private scriptNode: ScriptProcessorNode | null = null;
  private freq = new Uint8Array(0);
  private time = new Float32Array(0);
  private raf = 0;

  private hasSpoken = false;
  private silenceSince = 0;
  private opts: MicOptions;
  state: MicState = 'idle';

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
          sampleRate: SAMPLE_RATE,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
    } catch {
      this.setState('denied');
      return;
    }

    this.ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
    await this.ctx.resume();
    const src = this.ctx.createMediaStreamSource(this.stream);

    // Analyser node for PixelSphere visualizer
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.72;
    analyser.minDecibels = -92;
    analyser.maxDecibels = -18;
    src.connect(analyser);

    this.analyser = analyser;
    this.freq = new Uint8Array(analyser.frequencyBinCount);
    this.time = new Float32Array(analyser.fftSize);
    this.edges = logEdges(analyser.frequencyBinCount, this.ctx.sampleRate);

    // Audio stream capture for WebSocket / STT
    if (this.opts.onPcm) {
      let workletLoaded = false;
      try {
        await this.ctx.audioWorklet.addModule('/pcm-worklet.js');
        const node = new AudioWorkletNode(this.ctx, 'pcm', {
          numberOfInputs: 1,
          numberOfOutputs: 0,
          processorOptions: { frame: 320 },
        });
        node.port.onmessage = (e: MessageEvent<ArrayBuffer>) => this.opts.onPcm?.(e.data);
        src.connect(node);
        this.worklet = node;
        workletLoaded = true;
      } catch {
        workletLoaded = false;
      }

      if (!workletLoaded) {
        // Fallback to ScriptProcessorNode
        const sp = this.ctx.createScriptProcessor(2048, 1, 1);
        sp.onaudioprocess = (e) => {
          const input = e.inputBuffer.getChannelData(0);
          const pcm16 = new Int16Array(input.length);
          for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }
          this.opts.onPcm?.(pcm16.buffer);
        };
        src.connect(sp);
        sp.connect(this.ctx.destination);
        this.scriptNode = sp;
      }
    }

    this.hasSpoken = false;
    this.silenceSince = 0;
    field.speaker = 'user';
    this.setState('live');
    this.loop();
  }

  private loop = () => {
    const analyser = this.analyser;
    if (!analyser) return;
    this.raf = requestAnimationFrame(this.loop);

    analyser.getByteFrequencyData(this.freq);
    analyser.getFloatTimeDomainData(this.time);

    let sum = 0;
    for (let i = 0; i < this.time.length; i++) sum += this.time[i] * this.time[i];
    const rms = Math.sqrt(sum / this.time.length);

    for (let b = 0; b < BANDS; b++) {
      const lo = this.edges[b];
      const hi = Math.max(this.edges[b + 1], lo + 1);
      let peak = 0;
      for (let i = lo; i < hi; i++) if (this.freq[i] > peak) peak = this.freq[i];
      const target = Math.pow(peak / 255, 1.35);
      const prev = field.bands[b];
      field.bands[b] = target > prev ? prev + (target - prev) * 0.55 : prev + (target - prev) * 0.12;
    }

    const lvl = Math.min(1, rms * 9);
    field.level += (lvl - field.level) * (lvl > field.level ? 0.5 : 0.09);

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
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.analyser = null;
    this.worklet?.port.close();
    this.worklet?.disconnect();
    this.worklet = null;
    this.scriptNode?.disconnect();
    this.scriptNode = null;
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.hasSpoken = false;
    if (this.state !== 'denied' && this.state !== 'unsupported') this.setState('idle');
    if (field.speaker === 'user') field.speaker = 'idle';
  }
}

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
