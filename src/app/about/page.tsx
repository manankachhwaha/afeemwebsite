import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";
import { t } from "@/lib/cms";
import { experts, galleries, lists, pageSeo } from "@/data/extras";
import TeamGrid from "@/components/cms/TeamGrid";

const departments = lists.aboutDepartments;

export const metadata: Metadata = pageSeo("about", {
  title: "About Afeem",
  description: "Afeem is a premium beauty, wellness and education brand in Jodhpur — home to Afeem Spa & Salon and Afeem Beauty School.",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Afeem"
        title={t("about.heroTitle")}
        description={t("about.heroSub")}
      />

      <section className="py-16 md:py-24">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <ImageReveal>
            <Visual label="The Afeem Story" ratio="aspect-[4/3]" src={galleries.aboutImage} />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Our Story</span>
            <h2 className="font-display text-3xl text-brown leading-tight">{t("about.storyTitle")}</h2>
            <p className="text-brown-soft leading-relaxed">
              {t("about.storyBody")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-cream-soft">
        <Container>
          <RevealGroup className="grid sm:grid-cols-2 gap-8" stagger={0.12}>
            <RevealItem className="bg-white p-8 border border-brown/10 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)] hover:border-gold/40">
              <h3 className="font-display text-xl text-brown">Afeem Spa & Salon</h3>
              <p className="text-sm text-brown-soft italic">Experience the art of beauty.</p>
              <p className="text-sm text-brown-soft leading-relaxed">
                {t("about.salonBody")}
              </p>
              <Button href="/salon-spa" variant="secondary" className="self-start mt-2">Explore Salon & Spa</Button>
            </RevealItem>
            <RevealItem className="bg-white p-8 border border-brown/10 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)] hover:border-gold/40">
              <h3 className="font-display text-xl text-brown">Afeem Beauty School</h3>
              <p className="text-sm text-brown-soft italic">Learn the art of beauty.</p>
              <p className="text-sm text-brown-soft leading-relaxed">
                {t("about.schoolBody")}
              </p>
              <Button href="/beauty-school" variant="secondary" className="self-start mt-2">Explore Beauty School</Button>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Meet the Team"
              title={t("about.teamTitle")}
              description={t("about.teamSub")}
            />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6" stagger={0.08}>
            {departments.map((d) => (
              <RevealItem key={d.name} className="bg-white border border-brown/10 p-6 flex flex-col gap-2">
                <h3 className="font-display text-lg text-brown">{d.name}</h3>
                <p className="text-sm text-brown-soft leading-relaxed">{d.blurb}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <Button href="/contact#book" variant="secondary" className="self-start">Book an Appointment</Button>
          </Reveal>
        </Container>
      </section>

      <TeamGrid members={experts} eyebrow="Meet the Experts" title="The people behind your look" />

      <section className="py-16 md:py-24 bg-cream-soft">
        <Container className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Visit Us" title="Find an Afeem Near You" align="center" />
          </Reveal>
          <Reveal delay={0.15}>
            <Button href="/locations" variant="primary">View Locations</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
