import Container from "@/components/ui/Container";
import { Reveal } from "@/components/motion";

// Every figure here is confirmed business data (see CLAUDE.md §15): Google
// 4.7★ at both branches, 1,046 + 671 reviews, two Jodhpur studios, open
// daily 10:30–9:00. Do not add unconfirmed numbers.
const facts = [
  { value: "4.7★", label: "Google rating" },
  { value: "1,700+", label: "Google reviews" },
  { value: "2", label: "Studios in Jodhpur" },
  { value: "Daily", label: "Open 10:30 – 9:00" },
];

export default function Stats() {
  return (
    <section className="border-y border-brown/10 bg-white">
      <Container className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-brown/10">
        {facts.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center gap-1 py-8 px-4 text-center">
            <span className="font-display text-3xl sm:text-4xl text-gold-dark">{s.value}</span>
            <span className="text-xs uppercase tracking-[0.15em] text-brown-mute">{s.label}</span>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
