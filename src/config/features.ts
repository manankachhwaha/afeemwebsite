/**
 * One flag per optional site feature. Flip any of these to `false` to turn
 * that feature off site-wide without touching the rest of the codebase —
 * each feature reads its own flag and renders nothing (or falls back to the
 * plain/static behaviour) when disabled.
 *
 * All motion-driven features additionally self-disable under
 * `prefers-reduced-motion: reduce`, regardless of these flags.
 */
export const FEATURES = {
  /** Full-screen logo entrance on first visit per session. */
  introSplash: true,
  /** Scroll-linked "calming" mood shift down the homepage. */
  windDownScroll: true,
  /** Subtle hero/ambient tint shift based on the visitor's local time of day. */
  timeOfDayPalette: true,
  /** Scroll-proportional gold accent thread. */
  goldThread: true,
  /** "Ask Afeem" AI concierge chat widget. */
  concierge: true,
  /** Mouse/trackpad momentum smooth-scroll (Lenis). Touch always uses native scroll. */
  smoothScroll: true,
} as const;
