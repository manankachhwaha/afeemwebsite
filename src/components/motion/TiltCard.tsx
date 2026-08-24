"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from "motion/react";
import { isMotionEnabled } from "@/lib/motionPreference";
import { FEATURES } from "@/config/features";

const TILT_DEGREES = FEATURES.heavyMode ? 8 : 5;
const GLOW_RADIUS = FEATURES.heavyMode ? 380 : 280;
const GLOW_OPACITY = FEATURES.heavyMode ? 0.5 : 0.35;

/**
 * A gentle 3D tilt + soft gold sheen that follows the cursor, for cards
 * (service, transformation, package). Wraps around any card without
 * touching its own markup. Fine-pointer devices only (same gating as
 * SmoothScroll.tsx) and off entirely under reduced motion — on touch
 * devices and when disabled it's a plain, unstyled wrapper.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    // One-time client-only check (needs `window`, unavailable during static
    // generation) — can't be computed in a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(fine && isMotionEnabled());
  }, []);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [TILT_DEGREES, -TILT_DEGREES]), {
    stiffness: 300,
    damping: 28,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-TILT_DEGREES, TILT_DEGREES]), {
    stiffness: 300,
    damping: 28,
    mass: 0.5,
  });
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glow = useMotionTemplate`radial-gradient(${GLOW_RADIUS}px circle at ${glowX} ${glowY}, rgba(227, 172, 92, ${GLOW_OPACITY}), transparent 70%)`;

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
    setHovering(false);
  }

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={FEATURES.heavyMode ? { scale: 1.02 } : undefined}
      transition={{ scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative ${className}`}
    >
      {children}
      <motion.div
        aria-hidden
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0"
        style={{ background: glow }}
      />
    </motion.div>
  );
}
