"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const headline = "Where Beauty Becomes an Experience.";

const wordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 1, delay: 0.3 + i * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[92vh] sm:min-h-[85vh] flex items-end">
      <motion.div className="absolute inset-0 warm-placeholder-dark" style={{ scale }} />
      <motion.div className="absolute inset-0 bg-gradient-to-t from-brown via-brown/45 to-transparent" style={{ opacity }} />
      <Container className="relative pb-16 sm:pb-20 pt-36 sm:pt-40">
        <motion.div style={{ y }} className="max-w-2xl flex flex-col gap-5 sm:gap-6">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-yellow-warm"
          >
            Afeem · Jodhpur
          </motion.span>
          <h1 className="font-display text-white text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl sm:leading-[1.1]">
            <span className="sr-only">{headline}</span>
            <span aria-hidden className="flex flex-wrap">
              {headline.split(" ").map((word, i) => (
                <span key={i} className="overflow-hidden pb-1 pr-[0.28em]">
                  <motion.span
                    className="inline-block"
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/80 text-base sm:text-lg max-w-lg leading-relaxed"
          >
            Step into Afeem — a destination for beauty, wellness and professional beauty education.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button href="/contact#book" variant="outline-light">
              Book an Experience
            </Button>
            <Button href="/about" variant="ghost" className="text-white hover:text-yellow-warm">
              Explore Afeem
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 right-6 sm:right-10 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-white/60 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-white/40"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
