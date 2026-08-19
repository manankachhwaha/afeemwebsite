import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/salon/ServiceCard";
import { serviceCategories, getService } from "@/data/services";
import { getExpert } from "@/data/experts";
import { testimonials } from "@/data/testimonials";
import { whatsappLink, site } from "@/data/site";

const categoryExpert: Record<string, string> = {
  hair: "riya-mehta",
  skin: "sneha-rathore",
  "spa-wellness": "kabir-oswal",
  makeup: "aarav-singh",
  nails: "priya-choudhary",
};

export function generateStaticParams() {
  return serviceCategories.flatMap((c) => c.services.map((s) => ({ category: c.slug, service: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}): Promise<Metadata> {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) return {};
  return {
    title: `${found.service.name} in Jodhpur`,
    description: `${found.service.description} Starting at ${found.service.startingPrice} at Afeem in ${site.city}.`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; service: string }>;
}) {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) notFound();
  const { category: cat, service: s } = found;

  const expert = getExpert(categoryExpert[cat.slug]);
  const related = cat.services.filter((r) => r.slug !== s.slug).slice(0, 3);
  const relevantReviews = testimonials.filter((t) => t.type === "salon" || t.type === "bridal").slice(0, 2);

  return (
    <article>
      <section className="py-12 md:py-16">
        <Container className="grid md:grid-cols-2 gap-12">
          <Visual label={s.name} ratio="aspect-[4/5]" />
          <div className="flex flex-col gap-5">
            <nav className="text-xs text-brown-mute uppercase tracking-wide">
              <Link href="/salon-spa" className="hover:text-gold-dark">Salon & Spa</Link>
              <span className="mx-2">/</span>
              <Link href={`/salon-spa/${cat.slug}`} className="hover:text-gold-dark">{cat.name}</Link>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl text-brown">{s.name}</h1>
            <p className="text-brown-soft leading-relaxed">{s.description}</p>

            <div className="flex gap-8 py-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Duration</p>
                <p className="text-brown font-medium">{s.duration}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Starting Price</p>
                <p className="text-gold-dark font-medium">{s.startingPrice}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact#book" variant="primary">Book Now</Button>
              <Button href={whatsappLink(`Hi Afeem, I'd like to book ${s.name}.`)} variant="secondary">
                Enquire on WhatsApp
              </Button>
            </div>

            {s.benefits.length > 0 && (
              <div className="pt-4 border-t border-brown/10">
                <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-2">Benefits</h2>
                <ul className="flex flex-col gap-1.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="text-sm text-brown-soft flex gap-2">
                      <span className="text-gold-dark">✓</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-cream-soft">
        <Container className="grid sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-2">What&rsquo;s Included</h2>
            <ul className="flex flex-col gap-1.5">
              {s.includes.map((i) => (
                <li key={i} className="text-sm text-brown-soft">{i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-2">Who It&rsquo;s For</h2>
            <p className="text-sm text-brown-soft leading-relaxed">{s.whoFor}</p>
          </div>
          {s.addOns.length > 0 && (
            <div>
              <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-2">Add-Ons</h2>
              <ul className="flex flex-col gap-1.5">
                {s.addOns.map((a) => (
                  <li key={a} className="text-sm text-brown-soft">{a}</li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {expert && (
        <section className="py-12">
          <Container className="flex flex-col sm:flex-row gap-6 sm:items-center bg-white border border-brown/10 p-8">
            <Visual ratio="aspect-square" className="w-24 h-24 shrink-0" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wide text-gold-dark">Your Expert</p>
              <h3 className="font-display text-xl text-brown">{expert.name}</h3>
              <p className="text-sm text-brown-soft">{expert.designation} · {expert.experience} experience</p>
            </div>
            <Button href={whatsappLink(`Hi Afeem, I'd like to book ${s.name} with ${expert.name}.`)} variant="secondary">
              Book with {expert.name.split(" ")[0]}
            </Button>
          </Container>
        </section>
      )}

      {s.faqs.length > 0 && (
        <section className="py-12 bg-cream-soft">
          <Container className="max-w-3xl flex flex-col gap-6">
            <h2 className="font-display text-2xl text-brown">Frequently Asked Questions</h2>
            <div className="flex flex-col divide-y divide-brown/10">
              {s.faqs.map((f) => (
                <details key={f.q} className="py-4 group">
                  <summary className="cursor-pointer text-brown font-medium list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-gold-dark group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-brown-soft mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-12">
        <Container className="flex flex-col gap-6">
          <h2 className="font-display text-2xl text-brown">What Clients Say</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {relevantReviews.map((r) => (
              <div key={r.name} className="border border-brown/10 p-6">
                <p className="text-sm text-brown-soft leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-sm text-brown font-medium mt-3">{r.name} · <span className="text-brown-mute font-normal">{r.service}</span></p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-12 md:py-16 border-t border-brown/10">
          <Container className="flex flex-col gap-8">
            <h2 className="font-display text-2xl text-brown">Related Services</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((r) => (
                <ServiceCard key={r.slug} categorySlug={cat.slug} service={r} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </article>
  );
}
