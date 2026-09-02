import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollCarousel, { ScrollCarouselImage } from "@/components/motion/ScrollCarousel";
import { Reveal } from "@/components/motion";

function numbered(folder: string, label: string, nums: number[]): ScrollCarouselImage[] {
  return nums.map((n) => ({ src: `/images/${folder}/${String(n).padStart(2, "0")}.jpg`, label }));
}

/** Round-robins across categories so the strip alternates rather than blocking by folder. */
function interleave(groups: ScrollCarouselImage[][]): ScrollCarouselImage[] {
  const out: ScrollCarouselImage[] = [];
  const max = Math.max(...groups.map((g) => g.length));
  for (let i = 0; i < max; i++) {
    for (const g of groups) if (g[i]) out.push(g[i]);
  }
  return out;
}

const images = interleave([
  numbered("hair-cut", "Hair", [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]),
  numbered("hair-color", "Hair Colour", [1, 2, 3, 4, 6]),
  numbered("hair-spa", "Hair Spa", [2, 4, 5, 6, 7, 8]),
  numbered("nail-art", "Nails", [2, 3, 4, 5, 7, 8]),
  numbered("pedicure", "Nails", [2, 3, 4]),
]);

export default function InsideAfeem() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft overflow-hidden">
      <Container className="mb-10">
        <Reveal>
          <SectionHeading
            eyebrow="Inside Afeem"
            title="A closer look."
            description="Real moments from the studio floor — scroll to look around."
          />
        </Reveal>
      </Container>
      <ScrollCarousel images={images} />
    </section>
  );
}
