"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GoldParticles from "@/components/motion/GoldParticles";

/**
 * Full-bleed cinematic hero for /bridal — a looping clip from real Afeem
 * bridal work, wrapped in the bordeaux + gold treatment that's exclusive to
 * this section (see --color-bridal-red* in globals.css). The poster image
 * is always rendered underneath the <video> so there's zero layout shift
 * and it's what shows once html.reduce-motion hides the video (see the
 * .bridal-bg-video rule in globals.css) or while the clip buffers.
 */
export default function BridalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Chrome keeps decoding an off-screen playing <video> — with the two
  // other bridal video bands further down the page, that's up to three
  // clips fighting for the same decoder at once and it visibly locks up
  // the tab while scrolling. Pausing the hero clip once it scrolls out
  // (and resuming it if the visitor scrolls back up) keeps at most one
  // clip decoding at a time.
  const inView = useInView(sectionRef, { amount: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView]);

  // min-h-[88svh] alone (no padding) forces this hero to nearly fill the
  // viewport and vertically centers its content within that — on a short
  // phone viewport that pushes the CTA row down far enough to collide with
  // the fixed StickyBookBar + Ask Afeem bubble (confirmed via real Chrome
  // device emulation: the chat bubble fully covered "Book Bridal
  // Consultation", the sticky bar covered a third of "View the Gallery").
  // Same fix as the homepage Hero: natural content height + real padding on
  // phones, the forced min-height only from sm: up where there's no fixed
  // bottom bar to collide with.
  return (
    <section ref={sectionRef} className="relative isolate flex items-center overflow-hidden bg-bridal-red-dark py-20 sm:py-0 sm:min-h-[88svh]">
      <div className="absolute inset-0">
        <Image
          src="/images/bridal/01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          className="bridal-bg-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/bridal/01.jpg"
        >
          <source src="/videos/bridal/hero-1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Bordeaux wash + legibility gradient — the video reads warm and rich,
          not desaturated, while keeping the light headline text readable. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bridal-red-dark via-bridal-red-dark/55 to-black/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bridal-red-dark/80 via-transparent to-transparent" />

      <GoldParticles tone="dark" />

      <Container className="relative">
        <div className="max-w-2xl flex flex-col gap-5">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-yellow-warm"
          >
            <span className="h-px w-6 bg-yellow-warm/80" />
            Afeem Bridal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-fluid-pagehero text-white"
          >
            Your wedding beauty journey, thoughtfully planned.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/80 leading-relaxed max-w-xl"
          >
            From the first consultation to your final function, Afeem Bridal plans every detail of
            your beauty timeline — real brides, real looks, from our own studio.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button href="#book" variant="bridal">
              Book Bridal Consultation
            </Button>
            <Button href="#gallery" variant="outline-light">
              View the Gallery
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
