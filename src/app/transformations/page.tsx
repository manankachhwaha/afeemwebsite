import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import TransformationsGallery from "@/components/transformations/TransformationsGallery";

export const metadata: Metadata = {
  title: "Transformations",
  description: "Before. After. Afeem. A visual portfolio of hair, makeup, skin, nails and bridal transformations from Afeem in Jodhpur.",
};

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Before. After. Afeem."
        title="Transformations"
        description="A living record of the work — filter by category to see real results from real Afeem visits."
      />
      <section className="py-16 md:py-24">
        <Container>
          <TransformationsGallery />
        </Container>
      </section>
    </>
  );
}
