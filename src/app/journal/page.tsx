import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Visual from "@/components/ui/Visual";
import { journalPosts } from "@/data/journal";
import { RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Afeem Journal",
  description: "Beauty, bridal and beauty-education guides from the Afeem team in Jodhpur.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Afeem Journal"
        title="Stories, guides and expertise."
        description="Practical advice from our stylists, artists and trainers — hair, skin, bridal and beauty education."
      />
      <section className="py-16 md:py-24">
        <Container>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" stagger={0.08}>
            {journalPosts.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/journal/${p.slug}`} className="group flex flex-col gap-4">
                  <ImageReveal>
                    <Visual label={p.bucket} ratio="aspect-[4/3]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  </ImageReveal>
                  <div>
                    <span className="text-xs uppercase tracking-wide text-gold-dark">{p.bucket}</span>
                    <h2 className="font-display text-lg text-brown mt-1">{p.title}</h2>
                    <p className="text-sm text-brown-soft mt-1 line-clamp-2">{p.excerpt}</p>
                    <p className="text-xs text-brown-mute mt-2">{p.readTime}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
