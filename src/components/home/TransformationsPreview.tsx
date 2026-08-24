import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { transformations } from "@/data/transformations";
import { getCategoryIcon } from "@/data/categoryIcons";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export default function TransformationsPreview() {
  const items = transformations.slice(0, 6);
  return (
    <section className="py-16 md:py-24 bg-brown">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="Before. After. Afeem."
            title="Transformations"
            description="A visual record of the work — real results from real Afeem visits."
            light
          />
        </Reveal>
        <RevealGroup className="grid grid-cols-2 md:grid-cols-3 gap-4" stagger={0.08}>
          {items.map((t) => (
            <RevealItem key={t.id} className="group flex flex-col gap-3">
              <ImageReveal>
                <Visual
                  dark
                  ratio="aspect-[4/5]"
                  label={`${t.category} · ${t.title}`}
                  icon={getCategoryIcon(t.category)}
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </ImageReveal>
              <div className="text-sm text-white/70">
                <p className="text-white">{t.title}</p>
                <p>{t.service} · {t.expert}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal>
          <Button href="/transformations" variant="outline-light">
            View All Transformations
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
