"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { FEATURES } from "@/config/features";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!FEATURES.smoothScroll) return;

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only smooth scroll for mouse/trackpad users. Touch devices already have
    // excellent native momentum scrolling — layering Lenis on top of it tends
    // to fight the browser's own physics and feel "floaty" rather than smooth,
    // and it complicates anchor-link and keyboard scrolling on mobile for no
    // real benefit. Native scroll-behavior handles anchor links everywhere.
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isReducedMotion || !isFinePointer) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
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
