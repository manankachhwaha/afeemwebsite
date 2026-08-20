"use client";

export default function Marquee({
  items,
  dark = false,
  speed = 32,
}: {
  items: string[];
  dark?: boolean;
  speed?: number;
}) {
  const track = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-y ${dark ? "border-white/10 bg-brown" : "border-brown/10 bg-cream-soft"} py-5`}
    >
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className={`font-display text-2xl sm:text-3xl italic flex items-center gap-10 ${
              dark ? "text-white/85" : "text-brown/80"
            }`}
          >
            {item}
            <span className={dark ? "text-gold" : "text-gold-dark"}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
