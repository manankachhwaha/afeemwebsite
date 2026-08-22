/**
 * One flag per optional site feature. Flip any of these to `false` to turn
 * that feature off site-wide without touching the rest of the codebase —
 * each feature reads its own flag and renders nothing (or falls back to the
 * plain/static behaviour) when disabled.
 *
 * Motion-driven features show by default for every visitor — they no longer
 * key off the OS-level `prefers-reduced-motion` setting, since that can be
 * on for reasons unrelated to an actual preference (managed devices, phone
 * battery-saver modes) and was silently hiding the whole animation layer.
 * A visitor can still explicitly opt out via the "Reduce motion" control in
 * the footer (see src/lib/motionPreference.ts) — that's the only thing that
 * disables motion now.
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
  /** Slow drifting warm gradient — site-wide ambient base (also reused, scoped, inside the intro splash). */
  ambientGradient: true,
  /** Faint site-wide film-grain texture. */
  filmGrain: true,
  /** Slow floating gold dust — hero, spa & wellness, and the intro splash only. */
  goldParticles: true,
} as const;
