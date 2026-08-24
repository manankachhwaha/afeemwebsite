"use client";

import { useEffect } from "react";
import { FEATURES } from "@/config/features";
import { getTimeBucket } from "@/lib/timeOfDay";

/**
 * Sets data-time-of-day on <html> from the visitor's local clock. Pure CSS
 * (see globals.css `--ambient-color`) uses that to tint decorative ambient
 * surfaces only — text colour is never touched, so contrast is unaffected.
 */
export default function TimeOfDayPalette() {
  useEffect(() => {
    if (!FEATURES.timeOfDayPalette) return;
    document.documentElement.setAttribute("data-time-of-day", getTimeBucket(new Date().getHours()));
    return () => document.documentElement.removeAttribute("data-time-of-day");
  }, []);

  return null;
}
