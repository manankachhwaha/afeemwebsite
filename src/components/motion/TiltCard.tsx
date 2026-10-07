"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "motion/react";
import { isMotionEnabled } from "@/lib/motionPreference";
import { FEATURES } from "@/config/features";

const TILT_DEGREES = FEATURES.heavyMode ? 8 : 5;
const TILT_DEGREES_TOUCH = TILT_DEGREES * 0.7; // a touch gentler — a thumb covers more of the card than a cursor tip

/**
 * A gentle 3D tilt that follows the cursor (or, on touch, a dragging
 * finger), for cards (service, transformation, package). Wraps around any
 * card without touching its own markup. Off entirely under reduced motion.
 *
 * Fine-pointer devices get the cursor-follow tilt, same as always. Touch
 * devices get their own equivalent: the card tilts to track the finger
 * while it's down (touchmove), and springs back to flat with a quick
 * settle-tap scale on release — the closest touch analogue to "hover" this
 * card has, so touch is no longer a plain, un-interactive div.
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // One-time client-only check (needs `window`, unavailable during static
    // generation) — can't be computed in a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled((fine || coarse) && isMotionEnabled());
    setIsTouch(coarse && !fine);
  }, []);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const degrees = isTouch ? TILT_DEGREES_TOUCH : TILT_DEGREES;
  const rotateX = useSpring(useTransform(my, [0, 1], [degrees, -degrees]), {
    stiffness: 300,
    damping: 28,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-degrees, degrees]), {
    stiffness: 300,
    damping: 28,
    mass: 0.5,
  });

  function setFromPoint(clientX: number, clientY: number) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((clientX - rect.left) / rect.width);
    my.set((clientY - rect.top) / rect.height);
  }

  function handleMove(e: React.MouseEvent) {
    setFromPoint(e.clientX, e.clientY);
  }

  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  function handleTouchMove(e: React.TouchEvent) {
    const touch = e.touches[0];
    if (touch) setFromPoint(touch.clientX, touch.clientY);
  }

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={isTouch ? undefined : handleMove}
      onMouseLeave={isTouch ? undefined : handleLeave}
      onTouchStart={isTouch ? handleTouchMove : undefined}
      onTouchMove={isTouch ? handleTouchMove : undefined}
      onTouchEnd={isTouch ? handleLeave : undefined}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={!isTouch && FEATURES.heavyMode ? { scale: 1.02 } : undefined}
      whileTap={isTouch ? { scale: 0.98 } : undefined}
      transition={{ scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
