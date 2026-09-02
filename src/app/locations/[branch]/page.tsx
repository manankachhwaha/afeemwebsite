import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { branches, getBranch, branchWhatsappLink } from "@/data/branches";
import { site } from "@/data/site";
import { Reveal, ImageReveal } from "@/components/motion";
import ScrollCarousel from "@/components/motion/ScrollCarousel";
import BranchBookButton from "@/components/branch/BranchBookButton";

export function generateStaticParams() {
  return branches.map((b) => ({ branch: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ branch: string }>;
}): Promise<Metadata> {
  const { branch } = await params;
  const b = getBranch(branch);
  if (!b) return {};
  return {
    title: `Salon & Spa in ${b.area.split(" / ")[0]}, Jodhpur — ${b.name}`,
    description: `Afeem Spa & Salon in ${b.area} — ${b.address}. Rated ${b.googleRating}★ (${b.googleReviewCount} Google reviews). Call ${b.phone} or book online.`,
  };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const b = getBranch(branch);
  if (!b) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: b.name,
    image: `${site.url}/afeem-logo.png`,
    url: `${site.url}/locations/${b.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: "Jodhpur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    telephone: b.phone,
    email: b.email,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: b.googleRating,
      reviewCount: b.googleReviewCount,
    },
    sameAs: [b.instagram],
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="py-12 md:py-16">
        <Container className="grid md:grid-cols-2 gap-12">
          <ImageReveal>
            <Visual label={b.name} ratio="aspect-[4/5]" src={b.heroImage} priority />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <nav className="text-xs text-brown-mute uppercase tracking-wide">
              <Link href="/locations" className="hover:text-gold-dark">Locations</Link>
              <span className="mx-2">/</span>
              {b.shortName}
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl text-brown">{b.name}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gold-dark">★ {b.googleRating}</span>
              <a
                href={b.googleMapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-brown-soft hover:text-gold-dark underline underline-offset-2"
              >
                {b.googleReviewCount.toLocaleString("en-IN")} Google reviews
              </a>
            </div>
            <p className="text-brown-soft leading-relaxed">{b.address}</p>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Phone</p>
                <a href={b.phoneHref} className="text-gold-dark font-medium">{b.phone}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Hours</p>
                <p className="text-brown-soft text-sm">
                  {b.hours}
                  {b.hoursIsPlaceholder && <span className="text-brown-mute"> (opening time to be confirmed)</span>}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Email</p>
                <a href={`mailto:${b.email}`} className="text-gold-dark font-medium text-sm">{b.email}</a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-brown-mute mb-2">Services Available</p>
              <div className="flex flex-wrap gap-2">
                {b.services.map((s) => (
                  <span key={s} className="text-xs bg-yellow-soft text-brown-soft px-2 py-1">{s}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <BranchBookButton slug={b.slug}>Book at This Branch</BranchBookButton>
              <Button
                href={branchWhatsappLink(b, `Hi Afeem, I'd like to enquire about ${b.name}.`)}
                variant="secondary"
              >
                Enquire on WhatsApp
              </Button>
            </div>
            <a href={b.instagram} target="_blank" rel="noreferrer" className="text-sm text-gold-dark hover:underline">
              @afeemspaandsalon on Instagram
            </a>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 overflow-hidden">
        <Container className="mb-6">
          <h2 className="font-display text-2xl text-brown">Photos from {b.shortName}</h2>
        </Container>
        <ScrollCarousel
          images={(b.galleryImages ?? []).map((src) => ({ src, label: b.shortName }))}
          aspectClassName="aspect-square"
        />
      </section>

      <section className="py-12 bg-cream-soft">
        <Container className="flex flex-col gap-4">
          <div className="aspect-[16/9] w-full">
            <iframe
              title={`${b.name} map`}
              src={`https://www.google.com/maps?q=${b.lat},${b.lng}&z=17&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={b.googleMapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gold-dark hover:underline underline-offset-2"
            >
              Open in Google Maps →
            </a>
            <a
              href={b.appleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-gold-dark hover:underline underline-offset-2"
            >
              Open in Apple Maps →
            </a>
          </div>
        </Container>
      </section>

      <section className="py-12 border-t border-brown/10">
        <Container className="flex flex-col gap-6">
          <h2 className="font-display text-xl text-brown">Our Other Branch</h2>
          <div className="grid sm:grid-cols-1 gap-4 max-w-sm">
            {branches
              .filter((other) => other.slug !== b.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/locations/${other.slug}`}
                  className="border border-brown/10 p-5 hover:border-gold transition-colors"
                >
                  <p className="font-display text-brown">{other.shortName}</p>
                  <p className="text-xs text-brown-mute mt-1">{other.area}</p>
                </Link>
              ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
