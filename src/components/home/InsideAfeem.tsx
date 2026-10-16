import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollCarousel, { ScrollCarouselImage } from "@/components/motion/ScrollCarousel";
import { Reveal } from "@/components/motion";
import { t } from "@/lib/cms";
import { galleries } from "@/data/extras";

const images: ScrollCarouselImage[] = galleries.homeCarousel.map((src) => ({ src, label: "Afeem" }));

export default function InsideAfeem() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft overflow-hidden">
      <Container className="mb-10">
        <Reveal>
          <SectionHeading
            eyebrow={t("home.insideEyebrow")}
            title={t("home.insideTitle")}
            description={t("home.insideSub")}
          />
        </Reveal>
      </Container>
      <ScrollCarousel images={images} />
    </section>
  );
}
