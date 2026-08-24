import { FEATURES } from "@/config/features";

/**
 * A slow, organic "liquid gold" texture — three large blurred blobs
 * drifting on independent, very-long loops (see .liquid-blob keyframes in
 * globals.css). Deliberately not SVG feTurbulence: that has to be
 * recomputed on the CPU every frame it's animated and is a well-known
 * jank source, where this is pure transform + a static blur, fully
 * GPU-composited regardless of how long it runs. Negative z-index (see
 * .liquid-gold) keeps it behind every section site-wide, the same fix
 * already applied to .ambient-gradient after that exact bug once.
 */
export default function LiquidGold() {
  if (!FEATURES.liquidGold) return null;
  return (
    <div aria-hidden className="liquid-gold">
      <div className="liquid-blob liquid-blob-1" />
      <div className="liquid-blob liquid-blob-2" />
      <div className="liquid-blob liquid-blob-3" />
    </div>
  );
}
