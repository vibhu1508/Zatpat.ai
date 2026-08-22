import { BANDS, field } from './voiceField';

/**
 * Dev-only console helpers, exposed as `zatpat` on the page.
 *
 * The microphone needs a permission grant, a secure origin and a browser with
 * Web Speech support, none of which are guaranteed while developing. These
 * drive the same code paths without it, so the sphere's speaking states can be
 * watched (and screenshotted) on demand. Compiled out of production builds.
 */

type Ask = (text: string) => void;

let ask: Ask | null = null;
let timer = 0;
let raf = 0;

/** The console page registers its turn handler here while it is mounted. */
export function registerAsk(fn: Ask | null) {
  ask = fn;
}

function stop() {
  cancelAnimationFrame(raf);
  window.clearTimeout(timer);
  raf = 0;
  timer = 0;
  field.speaker = 'idle';
}

/** Animate the sphere as if `who` were talking, for `seconds`. */
function drive(who: 'user' | 'agent', seconds: number) {
  stop();
  field.speaker = who;
  const t0 = performance.now();

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = (performance.now() - t0) / 1000;

    // A syllable envelope — bursts of energy with gaps, the way speech runs.
    const syl = Math.pow(Math.max(0, Math.sin(t * 5.2)), 1.6);
    const phrase = 0.55 + 0.45 * Math.sin(t * 0.7);
    const env = syl * phrase;

    for (let i = 0; i < BANDS; i++) {
      const tilt = Math.sin((Math.PI * (i + 0.5)) / BANDS) ** 1.2;
      const wob = 0.45 + 0.55 * Math.abs(Math.sin(t * (1.6 + i * 0.21) + i * 1.7));
      field.bands[i] = Math.min(1, env * tilt * wob * 1.25);
    }
    field.level = Math.min(1, 0.12 + env * 0.85);
  };
  tick();

  timer = window.setTimeout(stop, seconds * 1000);
  return `sphere: ${who} for ${seconds}s`;
}

export function installDevConsole() {
  if (!import.meta.env.DEV) return;

  const api = {
    /** Run a real turn — retrieval, latency panel, caption, red sphere, speech. */
    ask: (text = 'compare the semantic and proposition chunking strategies') => {
      if (!ask) return 'open /chat first';
      ask(text);
      return `asked: ${text}`;
    },
    /** Just the agent-speaking animation (formula red). */
    speak: (seconds = 6) => drive('agent', seconds),
    /** Just the listening animation (signal blue). */
    listen: (seconds = 6) => drive('user', seconds),
    stop: () => {
      stop();
      return 'stopped';
    },
  };

  (window as unknown as { zatpat: typeof api }).zatpat = api;
  console.log(
    '%c zatpat %c dev console ready — try %czatpat.speak()%c, %czatpat.listen()%c or %czatpat.ask("your question")',
    'background:#1b6dff;color:#fff;font:600 10px/1.6 ui-monospace,monospace;letter-spacing:.12em',
    'color:#8ab8ff',
    'color:#fff;font-family:ui-monospace,monospace',
    'color:#8ab8ff',
    'color:#fff;font-family:ui-monospace,monospace',
    'color:#8ab8ff',
    'color:#fff;font-family:ui-monospace,monospace',
  );
}
