import { FEATURES } from "@/config/features";

/**
 * Slow, low-contrast warm gradient — the ambient base behind the whole
 * site. Also reused, scoped, inside the intro splash via `fixed={false}`
 * (absolute within the splash's own bounds) instead of duplicating the
 * effect. Pure CSS (see .ambient-gradient in globals.css): no JS, no
 * layout cost, freezes automatically under reduced motion.
 */
export default function AmbientGradient({ fixed = true }: { fixed?: boolean }) {
  if (!FEATURES.ambientGradient) return null;
  return (
    <div
      aria-hidden
      className={`ambient-gradient${fixed ? " ambient-gradient--fixed" : ""}`}
    />
  );
}
