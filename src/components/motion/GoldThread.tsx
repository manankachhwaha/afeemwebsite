"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FEATURES } from "@/config/features";
import { isMotionEnabled } from "@/lib/motionPreference";

/**
 * A slim gold thread along the left edge that grows with scroll depth —
 * the logo's swirl, drawn out into a continuous line that travels down the
 * site. Deliberately distinct from the top ScrollProgress bar (vertical,
 * soft-glow, desktop-only) so the two don't read as duplicates.
 */
export default function GoldThread() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!FEATURES.goldThread || !isMotionEnabled()) return;

    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;
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
    };
  }, [pathname]);

  if (!FEATURES.goldThread) return null;

  return (
    <div
      aria-hidden
      className="fixed top-16 bottom-16 left-4 z-30 hidden w-px pointer-events-none sm:block"
    >
      <div className="h-full w-full bg-brown/10" />
      <div
        ref={barRef}
        className="absolute inset-0 origin-top bg-gradient-to-b from-gold via-gold-light to-gold/30 will-change-transform"
        style={{ transform: "scaleY(0)", boxShadow: "0 0 8px rgba(208,144,48,0.55)" }}
      />
    </div>
  );
}
