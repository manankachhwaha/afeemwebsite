import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import TransformationsGallery from "@/components/transformations/TransformationsGallery";
import { t } from "@/lib/cms";
import { pageSeo } from "@/data/extras";

export const metadata: Metadata = pageSeo("transformations", {
  title: "Transformations",
  description: "Before. After. Afeem. A visual portfolio of hair, makeup, skin, nails and bridal transformations from Afeem in Jodhpur.",
});

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow={t("transformations.heroEyebrow")}
        title={t("transformations.heroTitle")}
        description={t("transformations.heroSub")}
      />
      <section className="py-16 md:py-24">
        <Container>
          <TransformationsGallery />
        </Container>
      </section>
    </>
  );
}
