import Link from "next/link";
import Container from "@/components/ui/Container";
import { HairIcon, SkinIcon, SpaIcon, MakeupIcon, NailsIcon, BridalIcon, EducationIcon } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

const tiles = [
  { label: "Hair", href: "/salon-spa/hair", Icon: HairIcon },
  { label: "Skin", href: "/salon-spa/skin", Icon: SkinIcon },
  { label: "Spa & Wellness", href: "/salon-spa/spa-wellness", Icon: SpaIcon },
  { label: "Makeup", href: "/salon-spa/makeup", Icon: MakeupIcon },
  { label: "Nails", href: "/salon-spa/nails", Icon: NailsIcon },
  { label: "Bridal", href: "/bridal", Icon: BridalIcon },
  { label: "Beauty Education", href: "/beauty-school", Icon: EducationIcon },
];

export default function WhatBringsYou() {
  return (
    <section id="start-here" className="py-16 md:py-24 scroll-mt-20">
      <Container>
        <Reveal className="flex flex-col gap-2 mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Start here</span>
          <h2 className="font-display text-2xl sm:text-3xl text-brown">What brings you to Afeem?</h2>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-3" stagger={0.06}>
          {tiles.map(({ label, href, Icon }) => (
            <RevealItem key={label}>
              <Link
                href={href}
                className="group flex flex-col items-center justify-center gap-4 aspect-square border border-brown/10 bg-white px-3 text-center transition-all duration-300 hover:border-gold hover:shadow-[0_18px_40px_-20px_rgba(58,40,24,0.35)] hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-all duration-300 group-hover:bg-brown group-hover:border-brown group-hover:text-yellow-warm group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-brown">{label}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
