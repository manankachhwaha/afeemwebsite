"use client";

import { motion } from "motion/react";
import SplitReveal from "@/components/motion/SplitReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`text-xs font-medium uppercase tracking-[0.25em] ${
            light ? "text-yellow-warm" : "text-gold-dark"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-fluid-title ${
          light ? "text-white" : "text-brown"
        }`}
      >
        <SplitReveal text={title} />
      </h2>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? "text-white/80" : "text-brown-soft"}`}>
          {description}
        </p>
      )}
      <motion.div
        className={`gold-rule ${align === "center" ? "origin-center" : "origin-left"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
