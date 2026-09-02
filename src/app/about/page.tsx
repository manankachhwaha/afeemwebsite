import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

const departments = [
  { name: "Hair", blurb: "Cuts, colour, treatments and hair spa." },
  { name: "Skin", blurb: "Facials and skin therapy, chosen for your skin type." },
  { name: "Spa & Wellness", blurb: "Massage and body rituals for genuine rest." },
  { name: "Makeup", blurb: "Everyday polish through to full bridal glam." },
  { name: "Nails", blurb: "Manicures, pedicures and nail art." },
];

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
            <Visual label="The Afeem Story" ratio="aspect-[4/3]" src="/images/ratanada/01.jpg" />
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
            <SectionHeading
              eyebrow="Meet the Team"
              title="Trained Specialists, Every Time"
              description="Every Afeem stylist, therapist and artist is trained to the same standard — so the quality of your visit never depends on who's on shift."
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
