"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GoldParticles from "@/components/motion/GoldParticles";
import SplitReveal from "@/components/motion/SplitReveal";
import { getGreeting, getTimeBucket } from "@/lib/timeOfDay";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [parallaxOn, setParallaxOn] = useState(false);

  useEffect(() => {
    // Both depend on client-only state (the visitor's clock; whether
    // heavy-mode parallax should run) — unavailable during static
    // generation, so neither can be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(getGreeting(getTimeBucket(new Date().getHours())));
    setParallaxOn(FEATURES.heavyMode && isMotionEnabled());
  }, []);

  // Background layers drift slower than the foreground as the hero scrolls
  // out of view — part of "heavy mode". bgY stays pinned at 0% whenever
  // parallax is off, so this is a no-op transform in that case.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], parallaxOn ? ["0%", "35%"] : ["0%", "0%"]);

  return (
    <section ref={heroRef} className="relative overflow-hidden warm-placeholder-dark min-h-[92svh] sm:min-h-[85svh] flex items-end">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="ambient-tint" />
        <GoldParticles />
        <div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/45 to-transparent pointer-events-none" />
      </motion.div>
      <Container className="relative pb-16 sm:pb-20 pt-36 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl flex flex-col gap-5 sm:gap-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-warm">
            {greeting ? `${greeting} · Afeem · Jodhpur` : "Afeem · Jodhpur"}
          </span>
          <h1 className="font-display text-white text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl sm:leading-[1.1]">
            <SplitReveal text="Where Beauty Becomes an Experience." delay={0.15} />
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-lg leading-relaxed">
            Step into Afeem — a destination for beauty, wellness and professional beauty education.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/contact#book" variant="outline-light">
              Book an Experience
            </Button>
            <Button href="#start-here" variant="ghost" className="text-white hover:text-yellow-warm">
              Explore Afeem
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
