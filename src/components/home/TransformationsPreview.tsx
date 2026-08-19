import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { transformations } from "@/data/transformations";

export default function TransformationsPreview() {
  const items = transformations.slice(0, 6);
  return (
    <section className="py-16 md:py-24 bg-brown">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Before. After. Afeem."
          title="Transformations"
          description="A visual record of the work — real results from real Afeem visits."
          light
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((t) => (
            <div key={t.id} className="flex flex-col gap-3">
              <Visual dark ratio="aspect-[4/5]" label={`${t.category} · ${t.title}`} />
              <div className="text-sm text-white/70">
                <p className="text-white">{t.title}</p>
                <p>{t.service} · {t.expert}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button href="/transformations" variant="outline-light">
            View All Transformations
          </Button>
        </div>
      </Container>
    </section>
  );
}
