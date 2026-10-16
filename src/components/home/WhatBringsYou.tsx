import Link from "next/link";
import Container from "@/components/ui/Container";
import { HairIcon, SkinIcon, SpaIcon, MakeupIcon, NailsIcon, BridalIcon, EducationIcon } from "@/components/ui/icons";
import { Reveal, RevealGroup } from "@/components/motion";
import FlipReveal from "@/components/motion/FlipReveal";
import TiltCard from "@/components/motion/TiltCard";
import { t } from "@/lib/cms";

const tiles = [
  { label: "Hair", hint: "Cuts, colour, treatments", href: "/salon-spa/hair", Icon: HairIcon },
  { label: "Skin", hint: "Facials & glow", href: "/salon-spa/skin", Icon: SkinIcon },
  { label: "Spa & Wellness", hint: "Unwind & recharge", href: "/salon-spa/spa-wellness", Icon: SpaIcon },
  { label: "Makeup", hint: "Party & occasion looks", href: "/salon-spa/makeup", Icon: MakeupIcon },
  { label: "Nails", hint: "Manicure, pedicure, art", href: "/salon-spa/nails", Icon: NailsIcon },
  { label: "Bridal", hint: "Your big day, planned", href: "/bridal", Icon: BridalIcon },
  { label: "Beauty Education", hint: "Start a beauty career", href: "/beauty-school", Icon: EducationIcon },
];

export default function WhatBringsYou() {
  return (
    <section id="start-here" className="py-16 md:py-24 scroll-mt-32">
      <Container>
        <Reveal className="flex flex-col gap-2 mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">{t("home.startEyebrow")}</span>
          <h2 className="font-display text-2xl sm:text-3xl text-brown">{t("home.startTitle")}</h2>
          <p className="text-sm text-brown-soft">{t("home.startSub")}</p>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-3" stagger={0.06}>
          {tiles.map(({ label, hint, href, Icon }, i) => (
            <FlipReveal key={label} className={i === tiles.length - 1 ? "col-span-2 sm:col-span-1" : ""}>
              <TiltCard>
                <Link
                  href={href}
                  className="group flex flex-col items-center justify-center gap-4 aspect-square border border-brown/10 bg-white px-3 text-center transition-all duration-300 hover:border-gold hover:shadow-[0_18px_40px_-20px_rgba(58,40,24,0.35)] hover:-translate-y-1"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-all duration-300 group-hover:bg-brown group-hover:border-brown group-hover:text-yellow-warm group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-brown">{label}</span>
                    <span className="text-[11px] leading-tight text-brown-mute">{hint}</span>
                  </span>
                </Link>
              </TiltCard>
            </FlipReveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
