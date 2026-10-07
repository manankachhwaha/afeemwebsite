import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee, { MarqueeImage } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion";

function numbered(folder: string, label: string, nums: number[]): MarqueeImage[] {
  return nums.map((n) => ({ src: `/images/${folder}/${String(n).padStart(2, "0")}.jpg`, alt: label }));
}

// Energetic mix — the services people book most.
const rowTop: MarqueeImage[] = [
  ...numbered("bridal", "Bridal", [1, 3, 4, 5, 9, 10, 14, 16]),
  ...numbered("hair-color", "Hair Colour", [1, 3, 5, 2, 9, 14, 18]),
  ...numbered("nail-art", "Nail Art", [1, 3, 5, 7]),
  ...numbered("hair-cut", "Hair", [2, 6, 9, 11, 15, 19]),
];

// Calmer mix — the spaces and the studio itself.
const rowBottom: MarqueeImage[] = [
  ...numbered("ratanada", "Afeem Ratanada", [1, 4, 7, 10, 13, 17, 21, 25]),
  ...numbered("pal-road", "Afeem Pal Road", [1, 4, 8, 11, 15, 19, 22]),
  ...numbered("beauty-school", "Afeem Beauty School", [1, 3, 5, 7, 10, 13]),
  ...numbered("hair-spa", "Hair Spa", [2, 5, 7, 11]),
  ...numbered("bridal", "Bridal", [18, 19]),
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
