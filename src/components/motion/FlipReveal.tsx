"use client";

import { motion, Variants } from "motion/react";
import { ReactNode } from "react";
import { FEATURES } from "@/config/features";

const calmVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// A 3D card-flip entrance instead of a plain fade-up — part of "heavy mode".
const flipVariants: Variants = {
  hidden: { opacity: 0, rotateY: -65, scale: 0.92 },
  visible: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Drop-in replacement for RevealItem (same "hidden"/"visible" variant
 * contract, so it works as a child of RevealGroup) that flips 3D into view
 * under heavy mode instead of the plain fade-up.
 */
export default function FlipReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 800 }}
      variants={FEATURES.heavyMode ? flipVariants : calmVariants}
    >
      {children}
    </motion.div>
  );
}
