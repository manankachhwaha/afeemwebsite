import { ComponentType } from "react";

/**
 * Placeholder for real photography/video. Renders an elegant warm gradient
 * block with a label, and — the important part — a large watermark icon
 * identifying the actual service/category, so every block on the site
 * reads as "this is a hair service" / "this is bridal" etc. rather than an
 * interchangeable gold rectangle. Swap for <Image> once brand photography
 * is available; the icon prop can simply be dropped at that point.
 */
export default function Visual({
  label,
  icon: Icon,
  ratio = "aspect-[4/5]",
  dark = false,
  className = "",
}: {
  label?: string;
  icon?: ComponentType<{ className?: string }>;
  ratio?: string;
  dark?: boolean;
  className?: string;
}) {
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
