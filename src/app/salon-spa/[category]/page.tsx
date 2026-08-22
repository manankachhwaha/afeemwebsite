import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/salon/ServiceCard";
import { serviceCategories, getCategory } from "@/data/services";
import { whatsappLink } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: cat.seoTitle, description: cat.seoDescription };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  return (
    <>
      <PageHero
        eyebrow="Afeem Spa & Salon"
        title={cat.name}
        description={cat.intro}
        particles={cat.slug === "spa-wellness"}
      />
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" stagger={0.08}>
            {cat.services.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard categorySlug={cat.slug} service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="flex flex-wrap gap-4 pt-6 border-t border-brown/10">
            <Button href="/contact#book" variant="primary">
              Book {cat.shortName}
            </Button>
            <Button
              href={whatsappLink(`Hi Afeem, I'd like to book a ${cat.shortName.toLowerCase()} service.`)}
              variant="secondary"
            >
              Enquire on WhatsApp
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
