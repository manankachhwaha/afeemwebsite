"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";
import { FEATURES } from "@/config/features";

/**
 * Wipe-and-settle entrance for photos. The scroll-into-view check lives on
 * the OUTER, never-clipped box. Observing the element that starts fully
 * clipped (clip-path: inset(0 0 100% 0)) could leave it with no visible area
 * to intersect, so on some phones/cards it never fired and the photo stayed
 * blank forever. The animated layers are children of the observed box.
 */
export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const heavy = FEATURES.heavyMode;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)", rotate: heavy ? -1.5 : 0 }}
        animate={inView ? { clipPath: "inset(0 0 0% 0)", rotate: 0 } : undefined}
        transition={{ duration: heavy ? 1.3 : 1.1, delay, ease: [0.65, 0, 0.15, 1] }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: heavy ? 1.4 : 1.25 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: heavy ? 1.6 : 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
