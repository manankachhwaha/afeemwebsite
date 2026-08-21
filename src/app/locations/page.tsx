import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { branches } from "@/data/branches";
import { RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Locations in Jodhpur",
  description: "Find Afeem Spa & Salon in Ratanada or Pal Road, Jodhpur — pick the branch nearest you.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="Locations" title="Find Afeem in Jodhpur" description="Two branches, one standard of care — Ratanada and Pal Road." />
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
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display text-xl text-brown">{b.shortName}</h2>
                    <span className="text-xs text-gold-dark whitespace-nowrap">★ {b.googleRating} · {b.googleReviewCount.toLocaleString("en-IN")} reviews</span>
                  </div>
                  <p className="text-xs uppercase tracking-wide text-brown-mute">{b.area}</p>
                  <p className="text-sm text-brown-soft">{b.address}</p>
                  <p className="text-sm text-brown-soft">{b.hours}</p>
                  <a href={b.phoneHref} className="text-sm text-gold-dark">{b.phone}</a>
                  <div className="flex flex-wrap gap-4 pt-3">
                    <Button href={`/locations/${b.slug}`} variant="secondary">View Details</Button>
                    <Button href="/contact#book" variant="primary">Book at This Branch</Button>
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
