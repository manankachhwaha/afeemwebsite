export type TimeBucket = "morning" | "afternoon" | "evening" | "night";

/** Single source of truth for time-of-day buckets — used by the ambient
 * palette (TimeOfDayPalette.tsx) and any time-aware greeting text, so they
 * never drift out of sync with each other. */
export function getTimeBucket(hour: number): TimeBucket {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

export function getGreeting(bucket: TimeBucket): string {
  switch (bucket) {
    case "morning":
      return "Good morning";
    case "afternoon":
      return "Good afternoon";
    case "evening":
      return "Good evening";
    case "night":
      return "Hello";
  }
}
