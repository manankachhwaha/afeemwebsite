"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useVelocity,
  useSpring,
  useTransform,
  type PanInfo,
} from "motion/react";
import Image from "next/image";
import { isMotionEnabled } from "@/lib/motionPreference";
import { FEATURES } from "@/config/features";

export type ScrollCarouselImage = { src: string; alt?: string; label?: string };

// --- Tuning knobs: the one place to adjust autoplay speed and dust density. ---
const AUTOPLAY_INTERVAL_MS = 5000;
const SNAP_TRANSITION = { type: "spring", stiffness: 260, damping: 34, mass: 0.9 } as const;
const DUST_COUNT_DESKTOP = 16;
const DUST_COUNT_MOBILE = 9;
const DUST_DRIFT_PER_VELOCITY = 0.06; // px of dust shift per px/s of carousel velocity
const DUST_DRIFT_MAX = 46; // clamp so a hard flick doesn't fling the dust off-frame
// -------------------------------------------------------------------------

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Reactive gold dust for the carousel — reuses the site's existing
 * `.gold-particles` / `.gold-particle` drift system (see globals.css and
 * GoldParticles.tsx) rather than duplicating it, but wraps the field in a
 * motion value driven by the carousel track's velocity, so the whole dust
 * field leans in the direction of motion and eases back to rest when the
 * carousel stops. Purely transform/opacity, pointer-events: none throughout.
 */
type DustParticle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
};

function makeDustParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: 15 + Math.random() * 70,
    size: 2 + Math.random() * 3.5,
    duration: 10 + Math.random() * 10,
    delay: -Math.random() * 18,
    driftX: (Math.random() - 0.5) * 30,
    opacity: 0.35 + Math.random() * 0.4,
  }));
}

function CarouselDust({ driftX }: { driftX: ReturnType<typeof useSpring> }) {
  const [particles, setParticles] = useState<DustParticle[] | null>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 640px)").matches;
    // Client-only randomization (needs `window`) — can't run during static
    // generation or as a pure render-time computation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParticles(makeDustParticles(small ? DUST_COUNT_MOBILE : DUST_COUNT_DESKTOP));
  }, []);

  if (!particles) return null;

  return (
    <motion.div aria-hidden style={{ x: driftX }} className="pointer-events-none absolute -inset-x-4 -inset-y-6 sm:-inset-x-10">
      <div className="gold-particles">
        {particles.map((p, i) => (
          <span
            key={i}
            className="gold-particle gold-particle--onlight"
            style={
              {
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--drift-x": `${p.driftX}px`,
                "--particle-opacity": p.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * A large, editorial slide carousel — one focal slide at a time with the
 * neighbours peeking at the edges on desktop, near-full-width on mobile.
 * Drag/swipe with weighted momentum-based snapping, slow autoplay that
 * pauses on hover/drag, slim gold pagination, and a reactive gold-dust
 * layer that flows with the motion and settles at rest. Falls back to a
 * simple, instant crossfade with no autoplay/drag/dust when the visitor
 * has turned off motion (see MotionToggle / lib/motionPreference).
 */
export default function ScrollCarousel({
  images,
  aspectClassName = "aspect-[4/5]",
  autoplay = true,
  dust = true,
  className = "",
}: {
  images: ScrollCarouselImage[];
  /** Tailwind aspect-ratio utility applied to every slide, e.g. "aspect-square". */
  aspectClassName?: string;
  autoplay?: boolean;
  /** Per-instance toggle for the reactive gold-dust layer (also gated by FEATURES.carouselGoldDust). */
  dust?: boolean;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [motionOn, setMotionOn] = useState(true);
  const [slideStep, setSlideStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackX = useMotionValue(0);

  useEffect(() => {
    // Client-only read of the visitor's motion preference — unavailable
    // during static generation.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMotionOn(isMotionEnabled());
  }, []);

  // Measure the pixel distance between slides (width + gap) — used only for
  // drag constraints/snap math, never for initial sizing, so there's no
  // layout shift while this settles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function measure() {
      const first = track!.children[0] as HTMLElement | undefined;
      const second = track!.children[1] as HTMLElement | undefined;
      if (!first) return;
      setSlideStep(second ? second.offsetLeft - first.offsetLeft : first.offsetWidth);
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [images.length]);

  // Snap the track to the active slide whenever it (or the measured step) changes.
  useEffect(() => {
    if (!slideStep) return;
    const controls = animate(trackX, -index * slideStep, motionOn ? SNAP_TRANSITION : { duration: 0 });
    return () => controls.stop();
  }, [index, slideStep, motionOn, trackX]);

  // Slow autoplay — paused on hover, drag, reduced motion, or a single slide.
  useEffect(() => {
    if (!autoplay || !motionOn || paused || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(id);
  }, [autoplay, motionOn, paused, images.length]);

  function handleDragEnd(_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    setPaused(false);
    if (!slideStep) return;
    const delta = Math.round(-(info.offset.x + info.velocity.x * 0.15) / slideStep);
    setIndex((i) => clamp(i + delta, 0, images.length - 1));
  }

  const velocity = useVelocity(trackX);
  const dustDrift = useSpring(
    useTransform(velocity, (v) => clamp(v * DUST_DRIFT_PER_VELOCITY, -DUST_DRIFT_MAX, DUST_DRIFT_MAX)),
    { stiffness: 70, damping: 22 }
  );

  const showDust = dust && FEATURES.carouselGoldDust && motionOn;

  if (images.length === 0) return null;

  // Reduced-motion fallback: a plain, instant crossfade — no drag, autoplay,
  // spring physics, or dust, per the visitor's explicit preference.
  if (!motionOn) {
    return (
      <div className={`relative ${className}`}>
        <div className={`relative mx-auto w-[86vw] sm:w-[64vw] max-w-[620px] overflow-hidden ${aspectClassName}`}>
          {images.map((img, i) => (
            <div key={img.src + i} className="absolute inset-0 transition-opacity duration-200" style={{ opacity: i === index ? 1 : 0 }}>
              <Image src={img.src} alt={img.alt ?? img.label ?? ""} fill sizes="70vw" className="object-cover" priority={i === 0} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-colors duration-200 ${i === index ? "w-6 bg-gold" : "w-1.5 bg-brown/25"}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {showDust && <CarouselDust driftX={dustDrift} />}

      <div className="overflow-hidden px-[8vw] sm:px-[19vw] lg:px-[27vw]">
        <motion.div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
          style={{ x: trackX }}
          drag={slideStep ? "x" : false}
          dragElastic={0.1}
          dragMomentum={false}
          dragConstraints={{ left: -(images.length - 1) * slideStep, right: 0 }}
          onDragStart={() => setPaused(true)}
          onDragEnd={handleDragEnd}
        >
          {images.map((img, i) => {
            const active = i === index;
            return (
              <motion.div
                key={img.src + i}
                className={`group relative shrink-0 overflow-hidden rounded-sm w-[84vw] sm:w-[62vw] lg:w-[min(640px,46vw)] ${aspectClassName}`}
                animate={{ scale: active ? 1 : 0.92, opacity: active ? 1 : 0.62 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <Image
                  src={img.src}
                  alt={img.alt ?? img.label ?? ""}
                  fill
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 62vw, 84vw"
                  draggable={false}
                  priority={i === 0}
                  className="object-cover pointer-events-none select-none"
                />
                <div className="pointer-events-none absolute inset-2 sm:inset-3 border border-white/30" />
                {img.label && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: active ? 1 : 0, y: active ? 0 : 8 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="pointer-events-none absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4 bg-gradient-to-t from-black/55 to-transparent flex items-center gap-2"
                  >
                    <span className="h-px w-4 bg-yellow-warm/80" />
                    <span className="text-[10px] uppercase tracking-[0.18em] truncate text-yellow-warm/90">
                      {img.label}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => clamp(i - 1, 0, images.length - 1))}
            aria-label="Previous slide"
            className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white/90 border border-brown/15 text-brown shadow-md absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 hover:border-gold hover:text-gold-dark transition-colors duration-300"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => clamp(i + 1, 0, images.length - 1))}
            aria-label="Next slide"
            className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white/90 border border-brown/15 text-brown shadow-md absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 hover:border-gold hover:text-gold-dark transition-colors duration-300"
          >
            ›
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  i === index ? "w-6 bg-gold" : "w-1.5 bg-brown/25 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
