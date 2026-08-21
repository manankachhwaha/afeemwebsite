"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

/**
 * Tracks scroll depth (0 → 1 per page) and exposes it as the `--wind-down`
 * CSS custom property on <html>. Pure CSS reads that variable to warm the
 * page and settle its motion as the visitor scrolls deeper — no React
 * state, no per-frame re-renders, so it stays cheap on low-end phones.
 */
export default function WindDown() {
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    if (!FEATURES.windDownScroll || !isMotionEnabled()) {
      root.style.setProperty("--wind-down", "0");
      return;
    }

    function update() {
      const scrollable = root.scrollHeight - root.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      // Reach full "calm" by ~70% depth and hold, rather than a linear ramp
      // that's still climbing right at the bottom of the page.
      const eased = Math.min(1, progress / 0.7);
      root.style.setProperty("--wind-down", eased.toFixed(3));
      rafRef.current = null;
    }

    function onScroll() {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      root.style.setProperty("--wind-down", "0");
    };
  }, [pathname]);

  return <div aria-hidden className="wind-down-overlay" />;
}
