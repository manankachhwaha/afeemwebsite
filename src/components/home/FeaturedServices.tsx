import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/salon/ServiceCard";
import { serviceCategories } from "@/data/services";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

const featured = [
  { categorySlug: "hair", serviceSlug: "hair-colour" },
  { categorySlug: "makeup", serviceSlug: "bridal-makeup" },
  { categorySlug: "skin", serviceSlug: "signature-facial" },
  { categorySlug: "spa-wellness", serviceSlug: "full-body-spa" },
];

export default function FeaturedServices() {
  const items = featured
    .map(({ categorySlug, serviceSlug }) => {
      const category = serviceCategories.find((c) => c.slug === categorySlug);
      const service = category?.services.find((s) => s.slug === serviceSlug);
      return service ? { categorySlug, service } : null;
    })
    .filter(Boolean) as { categorySlug: string; service: (typeof serviceCategories)[number]["services"][number] }[];

  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <SectionHeading eyebrow="Signature Services" title="Featured at Afeem" />
          <Button href="/salon-spa" variant="secondary" className="shrink-0">
            View All Services
          </Button>
        </Reveal>
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1}>
          {items.map(({ categorySlug, service }) => (
            <RevealItem key={service.slug}>
              <ServiceCard categorySlug={categorySlug} service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
