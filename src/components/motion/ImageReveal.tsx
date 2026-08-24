"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { FEATURES } from "@/config/features";

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const heavy = FEATURES.heavyMode;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)", rotate: heavy ? -1.5 : 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: heavy ? 1.3 : 1.1, delay, ease: [0.65, 0, 0.15, 1] }}
    >
      <motion.div
        initial={{ scale: heavy ? 1.4 : 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: heavy ? 1.6 : 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
