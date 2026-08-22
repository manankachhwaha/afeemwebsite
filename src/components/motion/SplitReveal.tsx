"use client";

import { motion, Variants } from "motion/react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Word-by-word reveal for headings — each word rises in from a clipped
 * mask, staggered left to right. Drop-in replacement for plain heading
 * text; renders inline so the parent stays the real <h1>/<h2>. Purely
 * transform-based (translateY inside overflow-hidden), so it's cheap, and
 * it degrades gracefully under reduced motion the same way Reveal.tsx
 * does (the final state is always the plain, fully visible text).
 */
export default function SplitReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`inline ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
