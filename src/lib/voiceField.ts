/**
 * VoiceField — the single source of truth the sphere reads from.
 *
 * Both the microphone (human turn) and the synthesised agent voice
 * (agent turn) write into the same band buffer, so the renderer never
 * needs to know who is talking; it only reads `bands`, `level` and the
 * `speaker` tint. That keeps the shader dumb and the turn-taking cheap.
 */

export const BANDS = 28;

export type Speaker = 'idle' | 'user' | 'agent';

export class VoiceField {
  /** Per-band energy, 0..1, log-spaced across the audible range. */
  readonly bands = new Float32Array(BANDS);
  /** Broadband loudness, 0..1, already smoothed. */
  level = 0;
  /** Who owns the field right now. Drives the sphere's colour. */
  speaker: Speaker = 'idle';
  /**
   * One-shot impulse, 0..1. Page transitions fire this so the shell flares
   * and scatters as it grows, instead of merely sliding across the screen.
   * Decays in the renderer, independently of the audio bands.
   */
  burst = 0;

  pulse(v = 1) {
    this.burst = Math.max(this.burst, v);
  }

  /** Ease every band toward zero — used when nobody is speaking. */
  decay(k: number) {
    for (let i = 0; i < BANDS; i++) this.bands[i] *= k;
    this.level *= k;
  }

  /** Clears audio state only — `burst` belongs to the page transition and
   *  decays on its own clock, so tearing down the mic must not cancel it. */
  reset() {
    this.bands.fill(0);
    this.level = 0;
  }
}

export const field = new VoiceField();

// Dev-only handle: lets the sphere's speaking states be driven from the
// console (or a screenshot harness) without granting microphone access.
if (import.meta.env.DEV) {
  (window as unknown as { __field: VoiceField }).__field = field;
}
