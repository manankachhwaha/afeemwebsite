"use client";

import { useEffect } from "react";
import { FEATURES } from "@/config/features";

function getBucket(hour: number): "morning" | "afternoon" | "evening" | "night" {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

/**
 * Sets data-time-of-day on <html> from the visitor's local clock. Pure CSS
 * (see globals.css `--ambient-color`) uses that to tint decorative ambient
 * surfaces only — text colour is never touched, so contrast is unaffected.
 */
export default function TimeOfDayPalette() {
  useEffect(() => {
    if (!FEATURES.timeOfDayPalette) return;
    document.documentElement.setAttribute("data-time-of-day", getBucket(new Date().getHours()));
    return () => document.documentElement.removeAttribute("data-time-of-day");
  }, []);

  return null;
}
