import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import { Reveal } from "@/components/motion";

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="Loved by the Afeem Community" align="center" />
        </Reveal>
        <ReviewsCarousel />
      </Container>
    </section>
  );
}
