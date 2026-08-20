import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Reviews" title="Loved by the Afeem Community" align="center" />
        </Reveal>
        <RevealGroup className="grid md:grid-cols-3 gap-6" stagger={0.1}>
          {testimonials.slice(0, 3).map((t) => (
            <RevealItem
              key={t.name}
              className="bg-white p-8 flex flex-col gap-4 border border-brown/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)] hover:border-gold/40"
            >
              <Stars rating={t.rating} />
              <p className="text-brown-soft leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="text-brown font-medium text-sm">{t.name}</p>
                <p className="text-brown-mute text-xs">{t.service}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
