import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

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
        <SectionHeading eyebrow="Reviews" title="Loved by the Afeem Community" align="center" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.name} className="bg-white p-8 flex flex-col gap-4 border border-brown/10">
              <Stars rating={t.rating} />
              <p className="text-brown-soft leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="text-brown font-medium text-sm">{t.name}</p>
                <p className="text-brown-mute text-xs">{t.service}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
