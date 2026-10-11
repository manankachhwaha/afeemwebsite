"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Counter from "@/components/motion/Counter";
import { Reveal } from "@/components/motion";

// Figures supplied by the Afeem team. The Google line underneath is
// confirmed business data (see CLAUDE.md §15). `fill` is purely visual —
// how far the gold ring sweeps — and does not represent a percentage.
const stats = [
  { to: 10, suffix: "+", label: "Years of Craft", note: "A decade of getting it right", fill: 0.82 },
  { to: 5000, suffix: "+", label: "Transformations", note: "Looks, locks & moments reborn", fill: 0.95 },
  { to: 2, suffix: "", label: "Jodhpur Studios", note: "Ratanada & Pal Road", fill: 0.62 },
  { to: 500, suffix: "+", label: "Students Trained", note: "Beauty careers launched", fill: 0.88 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function Ring({ fill, index }: { fill: number; index: number }) {
  const gid = `stat-grad-${index}`;
  return (
    <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0dca0" />
          <stop offset="55%" stopColor="#dc9d4a" />
          <stop offset="100%" stopColor="#c8801f" />
        </linearGradient>
      </defs>
      {/* slowly turning dial of fine ticks (hidden on phones, see .stat-dial) */}
      <g className="stat-dial" style={{ transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="60" r="57" fill="none" stroke="#e6c274" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="1 5.5" />
      </g>
      {/* faint track */}
      <circle cx="60" cy="60" r="48" fill="none" stroke="#e6c274" strokeOpacity="0.14" strokeWidth="2" />
      {/* the ring that draws itself */}
      <motion.circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: fill }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 2, delay: 0.2 + index * 0.15, ease: EASE }}
      />
    </svg>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-brown text-white">
      {/* Static warm glow — a plain gradient, no blur or blend, so it's free on phones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(220,157,74,0.24), transparent 70%), radial-gradient(40% 60% at 100% 100%, rgba(200,128,31,0.16), transparent 70%)",
        }}
      />
      <Container className="relative py-16 md:py-24">
        <Reveal className="mb-12 flex flex-col items-center gap-3 text-center md:mb-16">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-yellow-warm">
            <motion.span
              aria-hidden
              className="h-px w-10 origin-right bg-yellow-warm/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            />
            Afeem in numbers
            <motion.span
              aria-hidden
              className="h-px w-10 origin-left bg-yellow-warm/60"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            />
          </span>
          <h2 className="font-display text-3xl text-white/95 sm:text-4xl">Craft you can count on.</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            >
              <div className="relative aspect-square w-36 sm:w-44 lg:w-52">
                <Ring fill={s.fill} index={i} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="stat-shimmer font-display text-3xl leading-none sm:text-4xl lg:text-5xl">
                    <Counter to={s.to} suffix={s.suffix} />
                  </span>
                </div>
              </div>
              <span className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-white">{s.label}</span>
              <span className="mt-1.5 max-w-[11rem] text-[11px] leading-snug text-white/55 sm:text-xs">{s.note}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-white/70 sm:text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="text-yellow-warm">★ 4.7 on Google</span>
          <span aria-hidden className="text-white/30">·</span>
          <span>1,700+ reviews</span>
          <span aria-hidden className="text-white/30">·</span>
          <span>Open daily 10:30 – 9:00</span>
        </motion.p>
      </Container>
    </section>
  );
}
