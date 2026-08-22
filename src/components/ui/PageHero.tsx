"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import GoldParticles from "@/components/motion/GoldParticles";

export default function PageHero({
  eyebrow,
  title,
  description,
  particles = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Gold dust layer — only meant for the spa & wellness page per the brand's atmospheric background spec. */
  particles?: boolean;
}) {
  return (
    <section className="relative warm-placeholder-dark py-24 md:py-32 overflow-hidden">
      <div className="ambient-tint" />
      {particles && <GoldParticles />}
      <Container className="relative">
        <div className="max-w-2xl flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-yellow-warm"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/80 leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
