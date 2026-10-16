import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Reveal } from "@/components/motion";
import { t } from "@/lib/cms";
import { galleries } from "@/data/extras";

// Three portrait frames, fanned. Static CSS rotation only — no JS or blend
// effects — so it stays smooth on phones.
const frameStyles = [
  { rotate: "-rotate-6", offset: "translate-y-4" },
  { rotate: "rotate-0", offset: "-translate-y-2" },
  { rotate: "rotate-6", offset: "translate-y-4" },
];
const frames = galleries.bridalTeaser.slice(0, 3).map((src, i) => ({ src, ...frameStyles[i] }));

/**
 * Homepage doorway to /bridal for everyone who never opens the nav — a bold
 * bordeaux band right below the hero, written as a question to the visitor
 * rather than a menu label.
 */
export default function BridalTeaser() {
  return (
    <section className="relative overflow-hidden bg-bridal-red-dark text-white">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-bridal-red-light/40 blur-3xl" />
      <Container className="relative grid items-center gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <Reveal className="flex flex-col gap-5">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-yellow-warm">
            <span className="h-px w-6 bg-yellow-warm/80" />
            {t("home.bridalEyebrow")}
          </span>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
            {t("home.bridalTitle")}
          </h2>
          <p className="max-w-lg leading-relaxed text-white/80">
            {t("home.bridalBody")}
          </p>
          <div className="flex flex-wrap gap-4 pt-1">
            <Button href="/bridal#gallery" variant="bridal">
              {t("home.bridalBtn1")}
            </Button>
            <Button href="/bridal#book" variant="outline-light">
              {t("home.bridalBtn2")}
            </Button>
          </div>
          <Link href="/bridal" className="w-fit text-sm text-yellow-warm underline underline-offset-4 decoration-yellow-warm/40 hover:decoration-yellow-warm">
            {t("home.bridalLink")}
          </Link>
        </Reveal>

        <Link href="/bridal#gallery" aria-label="See Afeem brides" className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div className="flex w-full items-center justify-center -space-x-8 sm:-space-x-10">
            {frames.map((f, i) => (
              <div
                key={f.src}
                className={`relative aspect-[3/4] w-[36%] shrink-0 overflow-hidden border-4 border-white/90 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] ${f.rotate} ${f.offset} ${i === 1 ? "z-10 w-[40%]" : ""}`}
              >
                <Image src={f.src} alt="Afeem bride" fill sizes="(min-width: 768px) 160px, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </Link>
      </Container>
    </section>
  );
}
