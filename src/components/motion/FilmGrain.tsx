import { FEATURES } from "@/config/features";

/**
 * Faint site-wide film-grain texture for an editorial, print-like feel.
 * isolation: isolate (see .film-grain in globals.css) keeps its blend
 * mode contained so it can't bleed through the intro splash or any other
 * fixed full-screen element painted above it — the same fix already
 * applied to .warm-placeholder after a real bug of that exact shape.
 */
export default function FilmGrain() {
  if (!FEATURES.filmGrain) return null;
  return <div aria-hidden className="film-grain" />;
}
