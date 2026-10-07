"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!FEATURES.smoothScroll) return;

    const isReducedMotion = !isMotionEnabled();
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // Touch used to be excluded entirely (native momentum scroll only) —
      // syncTouch mimics that same smoothing on drag-release/momentum for
      // touch input too, at the default lerp (0.075) so a finger still
      // tracks 1:1 while actively dragging and only the release/inertia
      // phase gets the soft easing. That avoids the "floaty, disconnected
      // from my finger" feeling a naively-applied wheel config causes on
      // touch, while finally giving mobile the same smooth feel as desktop.
      syncTouch: true,
      syncTouchLerp: 0.075,
      // Without this, an <a href="#book"> click falls through to the
      // browser's native `scroll-behavior: smooth` (see globals.css) while
      // Lenis's own rAF loop keeps independently driving scroll position —
      // two uncoordinated smoothing systems fighting over the same scroll
      // top, which is exactly what read as janky on the many anchor CTAs
      // across the site ("Book Now", "View the Gallery", etc). Lenis reads
      // each target's scroll-margin/scroll-padding itself, so it still
      // respects the sticky header's existing offset without hardcoding it.
      anchors: true,
    });
    lenisRef.current = lenis;

    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
