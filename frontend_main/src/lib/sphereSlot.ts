/**
 * Where the sphere should currently be.
 *
 * The sphere itself lives once, above the router, so it survives navigation
 * between the landing page and the console. Each route publishes an empty
 * "slot" element saying where and how big the sphere should be; the layer
 * measures that slot and glides to it. Nothing about the WebGL scene changes
 * across a route change — only a CSS transform.
 */

export interface Slot {
  el: HTMLElement | null;
  opacity: number;
}

let current: Slot = { el: null, opacity: 1 };
const listeners = new Set<() => void>();

export function setSphereSlot(el: HTMLElement | null, opacity = 1) {
  current = { el, opacity };
  listeners.forEach((l) => l());
}

/** Only clears if `el` is still the active slot — routes unmount out of order. */
export function clearSphereSlot(el: HTMLElement | null) {
  if (current.el === el) {
    current = { el: null, opacity: current.opacity };
    listeners.forEach((l) => l());
  }
}

export function getSphereSlot(): Slot {
  return current;
}

/**
 * Arm the layer to animate its next pose change.
 *
 * Call this *synchronously*, before whatever moves the slot — a class change,
 * a route change. The layer samples slot rectangles on its own rAF loop, so
 * if the DOM moves first the layer can observe the new position while still
 * in snap mode and jump straight to it.
 */
export function signalSphereGlide() {
  listeners.forEach((l) => l());
}

export function onSphereSlotChange(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
