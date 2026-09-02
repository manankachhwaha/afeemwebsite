import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { courses } from "@/data/courses";
import { testimonials } from "@/data/testimonials";
import { beautySchoolWhatsappLink } from "@/data/site";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";
import ScrollCarousel from "@/components/motion/ScrollCarousel";

export const metadata: Metadata = {
  title: "Beauty School in Jodhpur | Makeup & Beauty Courses",
  description:
    "Afeem Beauty School in Jodhpur — makeup, hair, skin and nail courses with real live salon exposure. Explore courses and book a counselling session.",
};

const journey = ["Learn", "Hands-on Practice", "Live Salon Exposure", "Build Portfolio", "Career Opportunities"];
const schoolReviews = testimonials.filter((t) => t.type === "school");

export default function BeautySchoolPage() {
  return (
    <>
      <section className="relative py-24 md:py-36 overflow-hidden">
        <Image src="/images/beauty-school/01.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream via-cream/75 to-black/25" />
        <Container className="relative">
          <div className="max-w-2xl flex flex-col gap-6">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-dark">Afeem Beauty School</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-fluid-pagehero text-brown">
                Learn the Art of Beauty.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-brown-soft text-lg leading-relaxed">
                Build your skills. Create your portfolio. Build your career.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="flex flex-wrap gap-4 pt-2">
              <Button href="#courses" variant="primary">Explore Courses</Button>
              <Button href="#admissions" variant="secondary">Book Counselling</Button>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="The Difference" title="Learn Where You'll Work" description="Afeem students train on the same floor as our salon guests — the connection between school and salon is the whole point." />
          </Reveal>
          <RevealGroup className="flex flex-wrap gap-x-3 gap-y-4" stagger={0.08}>
            {journey.map((step, i) => (
              <RevealItem key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-brown/10 bg-white px-4 py-2.5">
                  <span className="text-gold-dark text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-brown">{step}</span>
                </div>
                {i < journey.length - 1 && <span className="text-brown-mute hidden sm:block">→</span>}
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="courses" className="py-16 md:py-24 bg-cream-soft scroll-mt-32">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="Courses" title="Find Your Course" />
          </Reveal>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.08}>
            {courses.map((c) => (
              <RevealItem key={c.slug}>
                <Link href={`/beauty-school/${c.slug}`} className="group flex flex-col gap-4 bg-white border border-brown/10">
                  <ImageReveal>
                    <Visual label={c.name} ratio="aspect-[4/3]" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                  </ImageReveal>
                  <div className="p-6 pt-0 flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-gold-dark">{c.category}</span>
                    <h3 className="font-display text-lg text-brown">{c.name}</h3>
                    <p className="text-sm text-brown-soft leading-relaxed line-clamp-2">{c.summary}</p>
                    <span className="text-xs text-brown-mute">{c.duration}</span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section id="curriculum" className="py-16 md:py-24 scroll-mt-32">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <ImageReveal>
            <Visual label="Curriculum & Practical Training" ratio="aspect-[4/3]" src="/images/beauty-school/04.jpg" />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Curriculum</span>
            <h2 className="font-display text-3xl text-brown leading-tight">Theory, technique, and real practice.</h2>
            <p className="text-brown-soft leading-relaxed">
              Every Afeem course pairs structured theory with hands-on studio time — colour theory
              before colour application, skin science before facials. Each course page details the
              full module breakdown, certification and career outcomes.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 md:py-24 overflow-hidden">
        <Container className="mb-10">
          <Reveal>
            <SectionHeading eyebrow="The Campus" title="Inside Afeem Beauty School" />
          </Reveal>
        </Container>
        <ScrollCarousel
          images={Array.from({ length: 8 }, (_, i) => ({
            src: `/images/beauty-school/${String(i + 1).padStart(2, "0")}.jpg`,
            label: "Afeem Beauty School",
          }))}
        />
      </section>

      <section id="trainers" className="py-16 md:py-24 bg-cream-soft scroll-mt-32">
        <Container className="max-w-2xl">
          <Reveal>
            <SectionHeading
              eyebrow="Trainers"
              title="Learn From Working Professionals"
              description="Every course is led by working Afeem stylists and artists, actively practicing on the salon floor — not lecturing from theory alone."
            />
          </Reveal>
        </Container>
      </section>

      <section id="student-work" className="py-16 md:py-24 scroll-mt-32">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <SectionHeading eyebrow="Afeem Talent" title="Student Showcase" description="Real work from real students — across hair, makeup, nails and skin." />
          </Reveal>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4" stagger={0.06}>
            {["Hair", "Makeup", "Nails", "Skin"].map((cat) => (
              <RevealItem key={cat}>
                <ImageReveal>
                  <Visual label={`Student Work · ${cat}`} ratio="aspect-[3/4]" />
                </ImageReveal>
              </RevealItem>
            ))}
          </RevealGroup>
          {schoolReviews.map((r) => (
            <Reveal key={r.name} className="border border-brown/10 p-6 max-w-xl">
              <p className="text-brown-soft text-sm leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <p className="text-brown font-medium text-sm mt-3">{r.name} · <span className="text-brown-mute font-normal">{r.service}</span></p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section id="careers" className="py-16 md:py-24 bg-cream-soft scroll-mt-32">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Career Opportunities</span>
            <h2 className="font-display text-3xl text-brown leading-tight">Where Afeem graduates go</h2>
            <ul className="text-brown-soft text-sm flex flex-col gap-2 mt-2">
              <li>· Placement within the Afeem Salon network</li>
              <li>· Freelance and independent artistry</li>
              <li>· Bridal specialist teams</li>
              <li>· Salon ownership & entrepreneurship</li>
            </ul>
          </Reveal>
          <ImageReveal delay={0.15}>
            <Visual label="Career Opportunities" ratio="aspect-[4/3]" />
          </ImageReveal>
        </Container>
      </section>

      <section id="admissions" className="py-16 md:py-24 bg-cream-soft scroll-mt-32">
        <Container className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Admissions" title="Start Your Beauty Career" align="center" description="Book a free counselling session to find the right course for your goals." />
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap justify-center gap-4">
            <Button href={beautySchoolWhatsappLink("Hi Afeem, I'd like to book a Beauty School counselling session.")} variant="primary">
              Book a Counselling Session
            </Button>
            <Button href="/contact#book" variant="secondary">Apply Now</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
