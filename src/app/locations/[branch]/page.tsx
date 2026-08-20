import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { branches, getBranch } from "@/data/branches";
import { whatsappLink } from "@/data/site";
import { Reveal, ImageReveal } from "@/components/motion";

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
  return { title: b.name, description: `${b.name} — ${b.address}` };
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const b = getBranch(branch);
  if (!b) notFound();

  return (
    <article>
      <section className="py-12 md:py-16">
        <Container className="grid md:grid-cols-2 gap-12">
          <ImageReveal>
            <Visual label={b.name} ratio="aspect-[4/5]" />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <h1 className="font-display text-3xl sm:text-4xl text-brown">{b.name}</h1>
            <p className="text-brown-soft leading-relaxed">{b.address}</p>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Phone</p>
                <a href={b.phoneHref} className="text-gold-dark font-medium">{b.phone}</a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Hours</p>
                <p className="text-brown-soft text-sm">{b.hours}</p>
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
            <p className="text-sm text-brown-soft">{b.parking}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="/contact#book" variant="primary">Book at This Location</Button>
              <Button href={whatsappLink(`Hi Afeem, I'd like to enquire about ${b.name}.`)} variant="secondary">
                Enquire on WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 bg-cream-soft">
        <Container>
          <div className="aspect-[16/9] w-full">
            <iframe
              title={`${b.name} map`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(b.mapEmbedQuery)}&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>
    </article>
  );
}
