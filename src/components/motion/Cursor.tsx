"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, summary, [data-cursor-hover]";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    // One-time capability check requiring `window`, which isn't available during
    // static generation — this can't be computed in a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    }
    function handleOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    }
    function handleLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-gold-dark"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[998] rounded-full border border-gold/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 52 : 28,
          height: hovering ? 52 : 28,
          backgroundColor: hovering ? "rgba(198,153,63,0.12)" : "rgba(198,153,63,0)",
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}
