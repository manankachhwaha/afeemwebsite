import Container from "@/components/ui/Container";
import Counter from "@/components/motion/Counter";
import { Reveal } from "@/components/motion";

const stats = [
  { to: 10, suffix: "+", label: "Years of Craft" },
  { to: 5000, suffix: "+", label: "Transformations" },
  { to: 2, suffix: "", label: "Jodhpur Locations" },
  { to: 500, suffix: "+", label: "Students Trained" },
];

export default function Stats() {
  return (
    <section className="border-y border-brown/10 bg-white">
      <Container className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-brown/10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center gap-1 py-10 px-4 text-center">
            <span className="font-display text-3xl sm:text-4xl text-gold-dark">
              <Counter to={s.to} suffix={s.suffix} />
            </span>
            <span className="text-xs uppercase tracking-[0.15em] text-brown-mute">{s.label}</span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
