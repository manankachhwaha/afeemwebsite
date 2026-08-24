"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

/**
 * A brief full-screen gold flash with the Afeem mark, on every in-site
 * navigation — part of "heavy mode" (see FEATURES.heavyMode). Purely
 * decorative and pointer-events-none throughout, so it never blocks the
 * click that triggered the navigation or anything on the page underneath.
 * Skips entirely on the very first page load (only reacts to route
 * *changes*) and under reduced motion.
 */
export default function GoldFlash() {
  const pathname = usePathname();
  const [flashId, setFlashId] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!FEATURES.heavyMode || !isMotionEnabled()) return;
    // Reacting to a route change, not a one-time mount read — this is the
    // intended use of an effect (syncing to an external event), but the
    // linter's heuristic still flags the first setState call in any effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlashId((id) => id + 1);
  }, [pathname]);

  if (!FEATURES.heavyMode) return null;

  return (
    <AnimatePresence>
      {flashId > 0 && (
        <motion.div
          key={flashId}
          aria-hidden
          className="fixed inset-0 z-[95] pointer-events-none flex items-center justify-center bg-gradient-to-br from-gold via-gold-light to-brown"
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.img
            src="/afeem-icon.png"
            alt=""
            className="h-14 w-auto"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
