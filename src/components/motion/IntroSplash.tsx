"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

const STORAGE_KEY = "afeem-intro-seen";
const AUTO_ENTER_MS = 4500;
const EXIT_DURATION = 0.9;

export default function IntroSplash() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = useCallback(() => {
    setExiting((already) => {
      if (already) return already;
      exitTimerRef.current = setTimeout(() => setVisible(false), EXIT_DURATION * 1000);
      return true;
    });
  }, []);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY);
    // One-time client-only check (needs `window`/`sessionStorage`, unavailable
    // during static generation) — can't be computed in a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!FEATURES.introSplash || seen || !isMotionEnabled()) return;
    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    const autoTimer = setTimeout(handleEnter, AUTO_ENTER_MS);
    return () => {
      clearTimeout(autoTimer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [handleEnter]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center warm-placeholder-dark"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: EXIT_DURATION, ease: [0.65, 0, 0.35, 1], delay: exiting ? 0.15 : 0 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <button
            type="button"
            onClick={handleEnter}
            aria-label="Enter Afeem"
            className="flex flex-col items-center focus:outline-none focus-visible:opacity-80"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.75, rotate: -6 }}
              animate={
                exiting
                  ? { opacity: 0, scale: 7, rotate: 0 }
                  : { opacity: 1, scale: 1, rotate: 0 }
              }
              transition={
                exiting
                  ? { duration: EXIT_DURATION, ease: [0.7, 0, 0.84, 0] }
                  : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <Image src="/afeem-icon.png" alt="" width={82} height={85} priority className="h-16 w-auto sm:h-20" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: exiting ? 0 : 1, y: 0 }}
              transition={{
                duration: exiting ? 0.35 : 0.7,
                delay: exiting ? 0 : 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative mt-4"
            >
              <Image src="/afeem-wordmark.png" alt="Afeem" width={300} height={63} priority className="h-9 w-auto sm:h-11" />
              {/* One-time gold shimmer sweep, masked to the wordmark's own letterforms. */}
              {!exiting && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    maskImage: "url(/afeem-wordmark.png)",
                    WebkitMaskImage: "url(/afeem-wordmark.png)",
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    background:
                      "linear-gradient(100deg, transparent 35%, rgba(255,244,214,0.95) 50%, transparent 65%)",
                  }}
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{ duration: 1, delay: 1.15, ease: [0.65, 0, 0.35, 1] }}
                />
              )}
            </motion.div>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: exiting ? 0 : 1, opacity: exiting ? 0 : 1 }}
              transition={{
                duration: exiting ? 0.3 : 0.6,
                delay: exiting ? 0 : 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-5 h-px w-12 bg-gold origin-center"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: exiting ? 0.3 : 0.6, delay: exiting ? 0 : 1.05 }}
              className="mt-5 text-[10px] uppercase tracking-[0.35em] text-yellow-warm/80"
            >
              Beauty · Wellness · Education
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : [0.55, 1, 0.55] }}
              transition={{
                opacity: exiting
                  ? { duration: 0.2 }
                  : { duration: 2.2, delay: 1.5, repeat: Infinity, ease: "easeInOut" },
              }}
              className="mt-9 text-[11px] uppercase tracking-[0.3em] text-gold border border-gold/40 rounded-full px-5 py-2"
            >
              Tap to Enter
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
