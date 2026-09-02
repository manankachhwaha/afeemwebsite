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
  /** Soft, blurred gold blobs drifting slowly site-wide — a liquid/flowing texture layered under everything. */
  liquidGold: true,
  /** Reactive gold-dust layer on ScrollCarousel that drifts with drag/autoplay motion and settles at rest. Per-instance `dust` prop can still override this off. */
  carouselGoldDust: true,
  /**
   * Master switch for the "high level" animation pass — parallax hero,
   * gold-flash page transitions, bigger image reveals, and amplified
   * gold-thread/particle/tilt intensity. Everything it touches is written
   * to fall back EXACTLY to the site's calmer default the moment this is
   * false, so flipping it is a complete, instant revert — no other
   * changes needed, no git surgery required. If it ever feels like too
   * much, this is the one line to flip.
   */
  heavyMode: true,
} as const;
