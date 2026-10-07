import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BridalHero from "@/components/bridal/BridalHero";
import BridalGallery from "@/components/bridal/BridalGallery";
import BridalVideoBand from "@/components/bridal/BridalVideoBand";
import BridalConsultationForm from "@/components/bridal/BridalConsultationForm";
import { testimonials } from "@/data/testimonials";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import TiltCard from "@/components/motion/TiltCard";

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
      <BridalHero />

      <section className="py-16 md:py-24 bg-bridal-red-dark">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="What We Cover" title="Everything for Your Celebration" light />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.06}>
            {coverage.map((c) => (
              <RevealItem key={c.title}>
                <TiltCard className="h-full border border-white/15 p-6 bg-white/10 backdrop-blur-md flex flex-col gap-2 transition-colors duration-300 hover:bg-white/15 hover:border-yellow-warm/30">
                  <h3 className="font-display text-lg text-white">{c.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{c.desc}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <BridalVideoBand
        src="/videos/bridal/detail-1.mp4"
        poster="/images/bridal/poster-detail-1.jpg"
        overlayClassName="bg-gradient-to-b from-bridal-red-dark/90 via-bridal-red-dark/80 to-bridal-red-dark/90"
        className="py-16 md:py-24"
      >
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="The Journey" title="How Afeem Bridal Works" light />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
            {journey.map((j, i) => (
              <RevealItem key={j.step}>
                <TiltCard className="h-full flex flex-col gap-2 bg-white/10 backdrop-blur-md border border-white/15 p-5 transition-colors duration-300 hover:bg-white/15 hover:border-yellow-warm/30">
                  <span className="text-yellow-warm text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-white font-display text-lg">{j.step}</h3>
                  <p className="text-white/75 text-sm leading-relaxed">{j.desc}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </BridalVideoBand>

      <BridalGallery />

      {bridalReviews.length > 0 && (
        <section className="py-16 md:py-24 bg-bridal-red-dark">
          <Container className="flex flex-col gap-10">
            <Reveal>
              <SectionHeading eyebrow="Loved By Our Brides" title="What They're Saying" light />
            </Reveal>
            <RevealGroup className="grid md:grid-cols-2 gap-8" stagger={0.1}>
              {bridalReviews.map((r) => (
                <RevealItem key={r.name}>
                  <TiltCard className="h-full border border-white/15 bg-white/10 backdrop-blur-md p-8 border-l-2 border-l-yellow-warm/60">
                    <p className="text-white/80 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                    <p className="text-white font-medium mt-4">{r.name} · <span className="text-white/60 font-normal">{r.service}</span></p>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      <BridalVideoBand
        id="book"
        src="/videos/bridal/hero-3.mp4"
        poster="/images/bridal/poster-hero-3.jpg"
        overlayClassName="bg-gradient-to-r from-bridal-red-dark/92 via-bridal-red-dark/70 to-bridal-red-dark/40"
        className="py-16 md:py-24 scroll-mt-32"
      >
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-5 bg-white/10 backdrop-blur-md border border-white/15 p-8">
            <SectionHeading
              eyebrow="Get Started"
              title="Book Your Bridal Consultation"
              description="Tell us about your wedding and we'll build a plan around your dates, functions and budget."
              light
            />
          </Reveal>
          <Reveal delay={0.15}>
            <BridalConsultationForm />
          </Reveal>
        </Container>
      </BridalVideoBand>
    </>
  );
}
