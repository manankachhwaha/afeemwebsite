"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { isMotionEnabled } from "@/lib/motionPreference";
import { FEATURES } from "@/config/features";

const TILT_DEGREES = FEATURES.heavyMode ? 8 : 5;

/**
 * A gentle 3D tilt that follows the cursor, for cards (service,
 * transformation, package). Wraps around any card without touching its own
 * markup. Fine-pointer devices only (same gating as SmoothScroll.tsx) and
 * off entirely under reduced motion — on touch devices and when disabled
 * it's a plain, unstyled wrapper.
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

  function handleMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={FEATURES.heavyMode ? { scale: 1.02 } : undefined}
      transition={{ scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
