import { ComponentType } from "react";
import Image from "next/image";

/**
 * Placeholder for real photography/video. Renders an elegant warm gradient
 * block with a label, and — the important part — a large watermark icon
 * identifying the actual service/category, so every block on the site
 * reads as "this is a hair service" / "this is bridal" etc. rather than an
 * interchangeable gold rectangle. Once a `src` is supplied it renders the
 * real photo instead (icon watermark drops away, label lockup stays as a
 * caption over the image) — pass `src` per call site as photography lands.
 */
export default function Visual({
  label,
  icon: Icon,
  ratio = "aspect-[4/5]",
  dark = false,
  className = "",
  src,
  alt,
  priority = false,
}: {
  label?: string;
  icon?: ComponentType<{ className?: string }>;
  ratio?: string;
  dark?: boolean;
  className?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`group relative overflow-hidden ${ratio} ${className}`}>
        <Image
          src={src}
          alt={alt ?? label ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          className={`pointer-events-none absolute inset-3 border transition-colors duration-300 ${
            dark ? "border-yellow-warm/25" : "border-white/30"
          }`}
        />
        {label && (
          <div className="absolute bottom-0 left-0 right-0 pt-10 pb-4 px-4 bg-gradient-to-t from-black/55 to-transparent flex items-center gap-2">
            <span className="h-px w-4 bg-yellow-warm/80" />
            <span className="text-[10px] uppercase tracking-[0.18em] truncate text-yellow-warm/90">
              {label}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden ${ratio} ${
        dark ? "warm-placeholder-dark" : "warm-placeholder"
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-3 border transition-colors duration-300 ${
          dark ? "border-yellow-warm/25" : "border-gold/25"
        }`}
      />
      {Icon && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Icon
            className={`h-[38%] w-[38%] transition-transform duration-500 ease-out group-hover:scale-110 ${
              dark ? "text-yellow-warm/50" : "text-brown/25"
            }`}
          />
        </div>
      )}
      {label && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <span className={`h-px w-4 ${dark ? "bg-yellow-warm/70" : "bg-brown/50"}`} />
          <span
            className={`text-[10px] uppercase tracking-[0.18em] truncate ${
              dark ? "text-yellow-warm/85" : "text-brown/70"
            }`}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
