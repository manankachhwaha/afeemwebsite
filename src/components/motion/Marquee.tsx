import Image from "next/image";

export type MarqueeImage = { src: string; alt?: string };

/**
 * One continuously-drifting row of photos — pure CSS transform, no JS
 * driving it per-frame (see .marquee-track in globals.css), so a page can
 * run several of these at once for the price of a couple of GPU layers.
 * The image list is rendered twice back-to-back; animating exactly -50% of
 * the resulting track is what makes the loop invisible regardless of how
 * many images are in the row or how wide they render.
 */
export default function Marquee({
  images,
  durationSeconds = 50,
  reverse = false,
  cellClassName = "h-52 w-36 sm:h-64 sm:w-44 lg:h-80 lg:w-56",
}: {
  images: MarqueeImage[];
  /** Full loop time — lower is faster. */
  durationSeconds?: number;
  reverse?: boolean;
  cellClassName?: string;
}) {
  if (images.length === 0) return null;
  const track = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <div
        aria-hidden={false}
        className={`marquee-track gap-3 sm:gap-4 ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((img, i) => (
          <div key={`${img.src}-${i}`} className={`group relative shrink-0 overflow-hidden ${cellClassName}`}>
            <Image
              src={img.src}
              alt={img.alt ?? ""}
              fill
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 176px, 144px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
