import { STRATEGIES } from './pipeline';
import type { Trace } from './types';

/**
 * Dev-only transcript in the browser console.
 *
 * The caption and the memory rail already show the answer, but during
 * development it is useful to have the turn in copyable text next to its
 * routing decision, timings and any rail that fired — without opening a sheet.
 * Compiled out of production builds.
 */

const enabled = import.meta.env.DEV;

export function logQuery(text: string) {
  if (!enabled) return;
  console.log('%c YOU %c ' + text, badge('#1b6dff'), 'color:#cfe2ff;font-size:13px');
}

export function logAnswer(text: string, t: Trace) {
  if (!enabled) return;
  // Handy for the screenshot harness and for eyeballing a turn's budget.
  (window as unknown as { __lastTrace: Trace }).__lastTrace = t;
  const strategy = STRATEGIES.find((s) => s.id === t.strategy)?.name ?? t.strategy;
  const fired = t.guardHits.filter((v) => !v.passed);

  console.groupCollapsed('%c AGENT %c ' + text, badge('#ff2800'), 'color:#ffd0c0;font-size:13px');
  console.log(
    `${t.totalMs} ms  ·  ${t.queryType || '—'} → ${strategy}  ·  passages=${t.passagesCount}  ·  ${t.tokensPerSec.toFixed(1)} tok/s`,
  );
  console.log(`grounded: ${t.grounded}  ·  score: ${t.topScore.toFixed(4)}`);
  console.table(
    t.stages.map((s) => ({ stage: s.label, ms: s.ms ?? null })),
  );
  if (fired.length) {
    console.log(
      '%cguardrails fired:%c ' + fired.map((v) => `${v.name} — ${v.note}`).join(' | '),
      'color:#ff8a6b',
      'color:inherit',
    );
  }
  console.groupEnd();
}

const badge = (bg: string) =>
  `background:${bg};color:#fff;font:600 10px/1.6 ui-monospace,monospace;letter-spacing:.12em`;
