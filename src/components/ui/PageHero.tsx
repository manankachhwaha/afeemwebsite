"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import GoldParticles from "@/components/motion/GoldParticles";

export default function PageHero({
  eyebrow,
  title,
  description,
  particles = false,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  /** Gold dust layer — only meant for the spa & wellness page per the brand's atmospheric background spec. */
  particles?: boolean;
  /** Real photo for the hero background, once available — falls back to the warm gradient placeholder when omitted. */
  image?: string;
}) {
  return (
    <section className={`relative py-24 md:py-32 overflow-hidden ${image ? "" : "warm-placeholder"}`}>
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/70 to-black/25" />
        </>
      )}
      <div className="ambient-tint" />
      {particles && <GoldParticles tone="light" />}
      <Container className="relative">
        <div className="max-w-2xl flex flex-col gap-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-gold-dark"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-pagehero text-brown"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-brown-soft leading-relaxed max-w-xl"
            >
              {description}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
