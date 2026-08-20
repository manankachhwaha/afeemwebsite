"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export default function ImageReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.15, 1] }}
    >
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
