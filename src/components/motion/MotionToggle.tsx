"use client";

import { useEffect, useState } from "react";
import { isMotionEnabled, setMotionEnabled } from "@/lib/motionPreference";

/**
 * Afeem's animations show by default for every visitor. This is the one
 * explicit escape hatch for anyone who genuinely wants a calmer, static
 * site — tucked into the footer rather than pushed in front of everyone.
 */
export default function MotionToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // One-time client-only read (localStorage is unavailable during static
    // generation, so this can't be a lazy useState initializer).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(isMotionEnabled());
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    setMotionEnabled(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!enabled}
      className="hover:text-gold-light"
    >
      {enabled ? "Reduce motion" : "Motion reduced · Turn on"}
    </button>
  );
}
