import Container from "@/components/ui/Container";
import Counter from "@/components/motion/Counter";
import { Reveal } from "@/components/motion";

// Figures supplied by the Afeem team. The Google line underneath is
// confirmed business data (see CLAUDE.md §15).
const stats = [
  { to: 10, suffix: "+", label: "Years of Craft", note: "A decade of getting it right" },
  { to: 5000, suffix: "+", label: "Transformations", note: "Looks, locks & moments reborn" },
  { to: 2, suffix: "", label: "Jodhpur Studios", note: "Ratanada & Pal Road" },
  { to: 500, suffix: "+", label: "Students Trained", note: "Beauty careers launched" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-brown text-white">
      {/* Static warm glow — a plain gradient, no blur or blend, so it's free on phones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(220,157,74,0.22), transparent 70%), radial-gradient(40% 60% at 100% 100%, rgba(200,128,31,0.16), transparent 70%)",
        }}
      />
      <Container className="relative py-14 md:py-20">
        <Reveal className="mb-10 flex flex-col items-center gap-3 text-center md:mb-14">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-yellow-warm">
            <span className="h-px w-8 bg-yellow-warm/60" />
            Afeem in numbers
            <span className="h-px w-8 bg-yellow-warm/60" />
          </span>
          <h2 className="font-display text-2xl text-white/95 sm:text-3xl">Craft you can count on.</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-px bg-yellow-warm/20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className="group relative flex flex-col items-center gap-2 bg-brown px-4 py-9 text-center sm:py-12"
            >
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/60" />
              <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/60" />
              <span className="bg-gradient-to-b from-yellow-warm via-gold-light to-gold bg-clip-text font-display text-5xl leading-none text-transparent sm:text-6xl">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white">{s.label}</span>
              <span className="text-[11px] text-white/55 sm:text-xs">{s.note}</span>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-white/70 sm:text-sm">
          <span className="text-yellow-warm">★ 4.7 on Google</span>
          <span aria-hidden className="text-white/30">·</span>
          <span>1,700+ reviews</span>
          <span aria-hidden className="text-white/30">·</span>
          <span>Open daily 10:30 – 9:00</span>
        </p>
      </Container>
    </section>
  );
}
