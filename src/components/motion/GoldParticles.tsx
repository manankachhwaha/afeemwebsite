"use client";

import { useEffect, useState } from "react";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

// --- Tuning knobs: the one place to make the dust subtler/denser/faster. ---
const PARTICLE_COUNT_DESKTOP = FEATURES.heavyMode ? 46 : 32;
const PARTICLE_COUNT_MOBILE = FEATURES.heavyMode ? 22 : 16;
const MOBILE_BREAKPOINT_PX = 640;
const DURATION_MIN_S = 14;
const DURATION_MAX_S = 24;
const SIZE_MIN_PX = 2;
const SIZE_MAX_PX = 6;
const OPACITY_MIN = 0.4;
const OPACITY_MAX = 0.85;
// ---------------------------------------------------------------------

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
};

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: 35 + Math.random() * 60,
    size: SIZE_MIN_PX + Math.random() * (SIZE_MAX_PX - SIZE_MIN_PX),
    duration: DURATION_MIN_S + Math.random() * (DURATION_MAX_S - DURATION_MIN_S),
    delay: -Math.random() * DURATION_MAX_S,
    driftX: (Math.random() - 0.5) * 40,
    opacity: OPACITY_MIN + Math.random() * (OPACITY_MAX - OPACITY_MIN),
  }));
}

/**
 * A light scatter of slowly drifting gold flecks. Self-contained — drop it
 * into any `relative`-positioned section (hero, spa & wellness, the intro
 * splash) as the layer just before the section's real content. Renders
 * nothing under reduced motion or when its flag is off, so it's always
 * safe to include.
 */
export default function GoldParticles({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    if (!FEATURES.goldParticles || !isMotionEnabled()) return;
    const isSmallScreen = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX}px)`).matches;
    // One-time client-only randomization (needs `window`, unavailable during
    // static generation) — can't be computed in a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(makeParticles(isSmallScreen ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP));
  }, []);

  if (!particles) return null;

  return (
    <div className="gold-particles" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className={`gold-particle${tone === "light" ? " gold-particle--onlight" : ""}`}
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift-x": `${p.driftX}px`,
              "--particle-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
