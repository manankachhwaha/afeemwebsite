"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

const calm = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
};

// Paired with GoldFlash.tsx's full-screen wipe — the content itself blurs
// and scales in behind the flash rather than a plain fade.
const heavy = {
  initial: { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, scale: 1.01, filter: "blur(8px)" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

// A visitor who has explicitly turned motion off still gets *some* signal
// that the route changed — just an instant, plain fade, never the blur/scale
// choreography above.
const reduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 } as const,
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    // Client-only read of the visitor's motion preference — unavailable
    // during static generation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionOn(isMotionEnabled());
  }, []);

  const variant = !motionOn ? reduced : FEATURES.heavyMode ? heavy : calm;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={variant.initial}
        animate={variant.animate}
        exit={variant.exit}
        transition={variant.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
