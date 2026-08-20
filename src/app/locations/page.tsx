import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { branches } from "@/data/branches";
import { RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Locations in Jodhpur",
  description: "Find an Afeem Spa & Salon or Afeem Beauty School location near you in Jodhpur.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Locations" title="Find Afeem in Jodhpur" description="Two locations, one standard of care." />
      <section className="py-16 md:py-24">
        <Container>
          <RevealGroup className="grid sm:grid-cols-2 gap-8" stagger={0.12}>
            {branches.map((b) => (
              <RevealItem
                key={b.slug}
                className="border border-brown/10 bg-white flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)]"
              >
                <ImageReveal>
                  <Visual label={b.name} ratio="aspect-[16/9]" />
                </ImageReveal>
                <div className="p-8 flex flex-col gap-3">
                  <h2 className="font-display text-xl text-brown">{b.name}</h2>
                  <p className="text-sm text-brown-soft">{b.address}</p>
                  <p className="text-sm text-brown-soft">{b.hours}</p>
                  <a href={b.phoneHref} className="text-sm text-gold-dark">{b.phone}</a>
                  <div className="flex flex-wrap gap-4 pt-3">
                    <Button href={`/locations/${b.slug}`} variant="secondary">View Details</Button>
                    <Button href="/contact#book" variant="primary">Book at This Location</Button>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
