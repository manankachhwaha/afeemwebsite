import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { experts } from "@/data/experts";
import { whatsappLink } from "@/data/site";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "About Afeem",
  description: "Afeem is a premium beauty, wellness and education brand in Jodhpur — home to Afeem Spa & Salon and Afeem Beauty School.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Afeem"
        title="Beauty, wellness and education — under one roof."
        description="Afeem was built on a simple idea: the same standard of care should run through every service we offer, and every student we train."
      />

      <section className="py-16 md:py-24">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <ImageReveal>
            <Visual label="The Afeem Story" ratio="aspect-[4/3]" />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Our Story</span>
            <h2 className="font-display text-3xl text-brown leading-tight">Two verticals, one standard.</h2>
            <p className="text-brown-soft leading-relaxed">
              Afeem Spa & Salon and Afeem Beauty School share a floor, a philosophy and a name. Our
              students train under working professionals and gain real, supervised salon exposure —
              so by the time they graduate, they&rsquo;ve already worked with real clients. It&rsquo;s
              this connection between learning and doing that sets Afeem apart in Jodhpur.
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
                Hair, skin, spa, makeup and nails — delivered with an editorial eye and genuine care,
                across our Jodhpur locations.
              </p>
              <Button href="/salon-spa" variant="secondary" className="self-start mt-2">Explore Salon & Spa</Button>
            </RevealItem>
            <RevealItem className="bg-white p-8 border border-brown/10 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(58,40,24,0.35)] hover:border-gold/40">
              <h3 className="font-display text-xl text-brown">Afeem Beauty School</h3>
              <p className="text-sm text-brown-soft italic">Learn the art of beauty.</p>
              <p className="text-sm text-brown-soft leading-relaxed">
                Structured courses in makeup, hair, skin and nails — with real, live salon exposure
                built into every programme.
              </p>
              <Button href="/beauty-school" variant="secondary" className="self-start mt-2">Explore Beauty School</Button>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="Meet the Team" title="Meet the Afeem Experts" description="The people behind every cut, colour, facial and bridal look." />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
            {experts.map((e) => (
              <RevealItem key={e.slug} className="flex flex-col gap-3">
                <ImageReveal>
                  <Visual ratio="aspect-[4/5]" />
                </ImageReveal>
                <div>
                  <h3 className="font-display text-lg text-brown">{e.name}</h3>
                  <p className="text-sm text-gold-dark">{e.designation}</p>
                  <p className="text-xs text-brown-mute mt-1">{e.experience} · {e.branch}</p>
                  <p className="text-sm text-brown-soft mt-2 leading-relaxed">{e.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {e.specialisation.map((s) => (
                      <span key={s} className="text-xs bg-yellow-soft text-brown-soft px-2 py-1">{s}</span>
                    ))}
                  </div>
                  <Button
                    href={whatsappLink(`Hi Afeem, I'd like to book with ${e.name}.`)}
                    variant="ghost"
                    className="mt-3 px-0"
                  >
                    Book with {e.name.split(" ")[0]}
                  </Button>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-brown">
        <Container className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Visit Us" title="Find an Afeem Near You" align="center" light />
          </Reveal>
          <Reveal delay={0.15}>
            <Button href="/locations" variant="outline-light">View Locations</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
