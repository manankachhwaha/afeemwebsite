const WIDTHS = [320, 640, 960, 1280];

/**
 * next/image loader for the static export: maps /images/** photos to the
 * pre-generated NAME-<w>.webp variants (scripts/make-variants.mjs). Anything
 * else (logos, external URLs) is served as-is.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/") || !/\.(jpe?g|png)$/i.test(src)) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return src.replace(/\.(jpe?g|png)$/i, `-${w}.webp`);
}
