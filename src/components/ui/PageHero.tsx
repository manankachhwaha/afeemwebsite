import Container from "@/components/ui/Container";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="warm-placeholder-dark py-24 md:py-32">
      <Container>
        <div className="max-w-2xl flex flex-col gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-warm">{eyebrow}</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight">{title}</h1>
          {description && <p className="text-white/80 leading-relaxed max-w-xl">{description}</p>}
        </div>
      </Container>
    </section>
  );
}
