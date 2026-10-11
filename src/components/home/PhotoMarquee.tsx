import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee, { MarqueeImage } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion";

function numbered(folder: string, label: string, nums: number[]): MarqueeImage[] {
  return nums.map((n) => ({ src: `/images/${folder}/${String(n).padStart(2, "0")}.jpg`, alt: label }));
}

// Energetic mix — the services people book most.
const rowTop: MarqueeImage[] = [
  ...numbered("bridal", "Bridal", [1, 5, 14]),
  ...numbered("hair-color", "Hair Colour", [3, 9]),
  ...numbered("nail-art", "Nail Art", [1, 5]),
  ...numbered("hair-cut", "Hair", [6, 15]),
];

// Calmer mix — the spaces and the studio itself.
const rowBottom: MarqueeImage[] = [
  ...numbered("ratanada", "Afeem Ratanada", [4, 13, 21]),
  ...numbered("pal-road", "Afeem Pal Road", [4, 15]),
  ...numbered("beauty-school", "Afeem Beauty School", [3, 10]),
  ...numbered("hair-spa", "Hair Spa", [5, 11]),
];

export default function PhotoMarquee() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <Container className="mb-10">
        <Reveal>
          <SectionHeading
            eyebrow="In Motion"
            title="A studio full of real work."
            description="Hair, bridal, nails, and the studios themselves — real Afeem, not stock."
          />
        </Reveal>
      </Container>
      <div className="flex flex-col gap-3 sm:gap-4">
        <Marquee images={rowTop} durationSeconds={48} />
        <Marquee images={rowBottom} durationSeconds={62} reverse />
      </div>
    </section>
  );
}
