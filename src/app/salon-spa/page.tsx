import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { serviceCategories, packages } from "@/data/services";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";
import TiltCard from "@/components/motion/TiltCard";
import { getCategoryIcon } from "@/data/categoryIcons";
import { BridalIcon, SparkleIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Salon & Spa in Jodhpur",
  description:
    "Afeem Spa & Salon in Jodhpur — Hair, Skin, Makeup, Nails and Spa & Wellness. Premium salon services, bridal beauty and curated packages.",
};

export default function SalonSpaPage() {
  return (
    <>
      <PageHero
        eyebrow="Afeem Spa & Salon"
        title="Experience the Art of Beauty."
        description="Five studios, one standard of care — Hair, Skin, Spa & Wellness, Makeup and Nails, all under one roof in Jodhpur."
      />

      <section className="py-16 md:py-24">
        <Container>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
            {serviceCategories.map((cat) => (
              <RevealItem key={cat.slug}>
                <Link href={`/salon-spa/${cat.slug}`} className="group flex flex-col gap-4">
                  <ImageReveal>
                    <Visual label={cat.name} icon={getCategoryIcon(cat.slug)} ratio="aspect-[4/3]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  </ImageReveal>
                  <div>
                    <h2 className="font-display text-xl text-brown">{cat.name}</h2>
                    <p className="text-sm text-brown-soft mt-1">{cat.tagline}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
            <RevealItem>
              <Link href="/bridal" className="group flex flex-col gap-4">
                <ImageReveal>
                  <Visual label="Afeem Bridal" dark icon={BridalIcon} ratio="aspect-[4/3]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                </ImageReveal>
                <div>
                  <h2 className="font-display text-xl text-brown">Bridal</h2>
                  <p className="text-sm text-brown-soft mt-1">Your wedding beauty journey, thoughtfully planned.</p>
                </div>
              </Link>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <section id="packages" className="py-16 md:py-24 bg-cream-soft scroll-mt-20">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Curated Packages"
              title="Afeem Packages"
              description="Combine our most-loved services into a single, unhurried visit."
            />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-3 gap-6" stagger={0.1}>
            {packages.map((p) => (
              <RevealItem key={p.slug}>
                <TiltCard className="bg-white p-8 flex flex-col gap-4 border border-brown/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)] hover:border-gold/40">
                  <h3 className="font-display text-xl text-brown">{p.name}</h3>
                  <p className="text-sm text-brown-soft leading-relaxed">{p.description}</p>
                  <ul className="text-sm text-brown-soft flex flex-col gap-1">
                    {p.includes.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-gold-dark">·</span>{i}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-brown/10">
                    <span className="text-gold-dark font-medium">{p.price}</span>
                    <span className="text-xs text-brown-mute">{p.duration}</span>
                  </div>
                  <Button href="/contact#book" variant="secondary" className="mt-2">
                    Book Package
                  </Button>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Afeem Experiences</span>
            <h2 className="font-display text-3xl text-brown leading-tight">Not sure what to book?</h2>
            <p className="text-brown-soft leading-relaxed">
              Tell us how you want to feel, not which service to pick. Our team will recommend the
              right combination of services for your occasion — from a quick refresh to a full
              makeover.
            </p>
            <div>
              <Button href="/contact#book" variant="primary">
                Build My Experience
              </Button>
            </div>
          </Reveal>
          <ImageReveal delay={0.15}>
            <Visual label="Find Your Afeem Experience" icon={SparkleIcon} ratio="aspect-[4/3]" />
          </ImageReveal>
        </Container>
      </section>
    </>
  );
}
