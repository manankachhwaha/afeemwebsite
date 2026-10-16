import { TEXT, type TextKey } from "@/content/texts";
import textsJson from "@/content/cms/texts.json";

/**
 * Bridge between the site and the CMS. `scripts/fetch-cms.mjs` writes one
 * JSON file per collection into src/content/cms/ at build time; a file that
 * holds `null` means "not managed by the CMS" and the site's built-in
 * defaults (src/data/*.ts, src/content/texts.ts) are used instead.
 */
export function cmsOr<T>(value: unknown, fallback: T): T {
  return value === null || value === undefined ? fallback : (value as T);
}

const overrides = (textsJson ?? {}) as Record<string, string>;

/** Editable page copy: CMS value if saved, otherwise the original wording. */
export function t(key: TextKey): string {
  const v = overrides[key];
  return typeof v === "string" && v.trim() ? v : TEXT[key].v;
}

/** Multi-line text → trimmed non-empty lines. */
export function lines(key: TextKey): string[] {
  return t(key).split("\n").map((s) => s.trim()).filter(Boolean);
}
