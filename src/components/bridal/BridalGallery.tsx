import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import GoldParticles from "@/components/motion/GoldParticles";
import TiltCard from "@/components/motion/TiltCard";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

/** Curated from real Afeem Bridal shoots — see /pictures/AM/Bridal for the full source set. */
const galleryImages = Array.from({ length: 21 }, (_, i) => `/images/bridal/${String(i + 1).padStart(2, "0")}.jpg`);

export default function BridalGallery() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-bridal-red-dark py-16 md:py-24 scroll-mt-32">
      <GoldParticles tone="dark" />
      <Container className="relative flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Real Work, Real Brides"
            title="From the Afeem Bridal Studio"
            description="A look at the artistry — bridal, engagement and function makeup from real Afeem clients."
            light
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" stagger={0.03}>
          {galleryImages.map((src, i) => (
            <RevealItem key={src} className="group">
              <TiltCard>
                <ImageReveal delay={(i % 8) * 0.02}>
                  <Visual
                    src={src}
                    ratio="aspect-[3/4]"
                    dark
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </ImageReveal>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
