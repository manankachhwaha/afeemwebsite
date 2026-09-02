"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import GoldParticles from "@/components/motion/GoldParticles";
import SplitReveal from "@/components/motion/SplitReveal";
import TextScramble from "@/components/motion/TextScramble";
import { SparkleIcon } from "@/components/ui/icons";
import { getGreeting, getTimeBucket } from "@/lib/timeOfDay";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [parallaxOn, setParallaxOn] = useState(false);
  const [spotlightOn, setSpotlightOn] = useState(false);

  useEffect(() => {
    // All depend on client-only state (the visitor's clock; whether heavy
    // mode/fine-pointer effects should run) — unavailable during static
    // generation, so none can be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGreeting(getGreeting(getTimeBucket(new Date().getHours())));
    const heavy = FEATURES.heavyMode && isMotionEnabled();
    setParallaxOn(heavy);
    setSpotlightOn(heavy && window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Background layers drift slower than the foreground as the hero scrolls
  // out of view — part of "heavy mode". bgY stays pinned at 0% whenever
  // parallax is off, so this is a no-op transform in that case.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], parallaxOn ? ["0%", "35%"] : ["0%", "0%"]);

  // A soft light that follows the cursor within the hero — an ambient
  // lighting effect, not a cursor replacement (the real OS cursor stays
  // untouched throughout). Desktop/fine-pointer + heavy mode only.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${useTransform(mx, [0, 1], ["0%", "100%"])} ${useTransform(my, [0, 1], ["0%", "100%"])}, rgba(208, 144, 48, 0.12), transparent 70%)`;

  function handleHeroMove(e: React.MouseEvent<HTMLElement>) {
    if (!spotlightOn || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleHeroMove}
      className="relative overflow-hidden bg-cream flex items-center py-28 sm:py-32 lg:min-h-[85svh]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="ambient-tint" />
        <GoldParticles tone="light" />
      </motion.div>
      {spotlightOn && <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />}
      <Container className="relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 sm:gap-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark">
            {greeting ? (
              FEATURES.heavyMode ? (
                <TextScramble text={`${greeting} · Afeem · Jodhpur`} />
              ) : (
                `${greeting} · Afeem · Jodhpur`
              )
            ) : (
              "Afeem · Jodhpur"
            )}
          </span>
          <h1 className="font-display text-fluid-hero text-brown">
            <SplitReveal text="Where Beauty Becomes an Experience." delay={0.15} />
          </h1>
          <p className="text-brown-soft text-base sm:text-lg max-w-lg leading-relaxed">
            Step into Afeem — a destination for beauty, wellness and professional beauty education.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button href="/contact#book" variant="primary">
              Book an Experience
            </Button>
            <Button href="#start-here" variant="secondary">
              Explore Afeem
            </Button>
          </div>
        </motion.div>

        {/* Editorial gallery-label frame — a deliberately composed placeholder
            rather than a full-bleed texture, so the hero reads as "space held
            for one considered photo" and a real one can drop straight in. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <Visual
            icon={SparkleIcon}
            label="Afeem — Jodhpur"
            ratio="aspect-[4/3] sm:aspect-[3/4]"
            src="/images/hair-color/05.jpg"
            priority
          />
          <span aria-hidden className="pointer-events-none absolute -top-2 -left-2 sm:-top-3 sm:-left-3 h-5 w-5 sm:h-7 sm:w-7 border-t-2 border-l-2 border-gold" />
          <span aria-hidden className="pointer-events-none absolute -top-2 -right-2 sm:-top-3 sm:-right-3 h-5 w-5 sm:h-7 sm:w-7 border-t-2 border-r-2 border-gold" />
          <span aria-hidden className="pointer-events-none absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 h-5 w-5 sm:h-7 sm:w-7 border-b-2 border-l-2 border-gold" />
          <span aria-hidden className="pointer-events-none absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 h-5 w-5 sm:h-7 sm:w-7 border-b-2 border-r-2 border-gold" />
        </motion.div>
      </Container>
    </section>
  );
}
