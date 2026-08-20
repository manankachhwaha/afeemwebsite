import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import BridalConsultationForm from "@/components/bridal/BridalConsultationForm";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Bridal Makeup & Beauty in Jodhpur",
  description:
    "Afeem Bridal — bridal makeup, pre-bridal skin prep, hair, nails and groom services in Jodhpur. Book your bridal consultation today.",
};

const coverage = [
  { title: "Bridal Makeup", desc: "HD & airbrush makeup with a trial session included." },
  { title: "Pre-Bridal", desc: "Skin, hair and body prep timed to your wedding date." },
  { title: "Hair", desc: "Bridal hairstyling, trials, and hair health treatments." },
  { title: "Skin Preparation", desc: "A facial series designed to peak your skin on the day." },
  { title: "Nails", desc: "Bridal manicure, pedicure and hand-painted nail art." },
  { title: "Groom", desc: "Grooming, skin and hair services for the groom." },
  { title: "Wedding Guest", desc: "Makeup and styling for your wedding party and guests." },
  { title: "Bridal Packages", desc: "Bundled multi-function packages for the full celebration." },
];

const journey = [
  { step: "Consultation", desc: "Share your date, vision and functions with our bridal team." },
  { step: "Trial", desc: "Makeup and hair trial, timed 3–4 weeks before your wedding." },
  { step: "Prep Timeline", desc: "A custom skin, hair and nail plan across your countdown." },
  { step: "The Big Day", desc: "Your artist and stylist on-site, with a touch-up kit included." },
];

export default function BridalPage() {
  const bridalReviews = testimonials.filter((t) => t.type === "bridal");

  return (
    <>
      <PageHero
        eyebrow="Afeem Bridal"
        title="Your wedding beauty journey, thoughtfully planned."
        description="From the first consultation to your final function, Afeem Bridal plans every detail of your beauty timeline."
      />

      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="What We Cover" title="Everything for Your Celebration" />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.06}>
            {coverage.map((c) => (
              <RevealItem
                key={c.title}
                className="border border-brown/10 p-6 bg-white flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-26px_rgba(58,40,24,0.35)] hover:border-gold/40"
              >
                <h3 className="font-display text-lg text-brown">{c.title}</h3>
                <p className="text-sm text-brown-soft leading-relaxed">{c.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-brown">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="The Journey"
              title="How Afeem Bridal Works"
              light
            />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {journey.map((j, i) => (
              <RevealItem key={j.step} className="flex flex-col gap-2">
                <span className="text-yellow-warm text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-white font-display text-lg">{j.step}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{j.desc}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {bridalReviews.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <RevealGroup className="grid md:grid-cols-2 gap-8" stagger={0.1}>
              {bridalReviews.map((r) => (
                <RevealItem key={r.name} className="border border-brown/10 p-8">
                  <p className="text-brown-soft leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                  <p className="text-brown font-medium mt-4">{r.name} · <span className="text-brown-mute font-normal">{r.service}</span></p>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      <section id="book" className="py-16 md:py-24 bg-cream-soft scroll-mt-20">
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Get Started"
              title="Book Your Bridal Consultation"
              description="Tell us about your wedding and we'll build a plan around your dates, functions and budget."
            />
            <ImageReveal>
              <Visual label="Afeem Bridal" ratio="aspect-[4/3]" />
            </ImageReveal>
          </Reveal>
          <Reveal delay={0.15}>
            <BridalConsultationForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
