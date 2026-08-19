/**
 * Placeholder for real photography/video. Renders an elegant warm gradient
 * block with a label so pages read intentionally, not as broken images.
 * Swap for <Image> once brand photography is available.
 */
export default function Visual({
  label,
  ratio = "aspect-[4/5]",
  dark = false,
  className = "",
}: {
  label?: string;
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
          dark ? "border-yellow-warm/25" : "border-white/40"
        }`}
      />
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
