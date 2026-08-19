import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { courses } from "@/data/courses";
import { experts } from "@/data/experts";
import { testimonials } from "@/data/testimonials";
import { whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Beauty School in Jodhpur | Makeup & Beauty Courses",
  description:
    "Afeem Beauty School in Jodhpur — makeup, hair, skin and nail courses with real live salon exposure. Explore courses and book a counselling session.",
};

const journey = ["Learn", "Hands-on Practice", "Live Salon Exposure", "Build Portfolio", "Career Opportunities"];
const trainers = experts.filter((e) => ["meher-vyas", "aarav-singh", "riya-mehta"].includes(e.slug));
const schoolReviews = testimonials.filter((t) => t.type === "school");

export default function BeautySchoolPage() {
  return (
    <>
      <section className="warm-placeholder-dark py-24 md:py-36">
        <Container>
          <div className="max-w-2xl flex flex-col gap-6">
            <span className="text-xs uppercase tracking-[0.3em] text-yellow-warm">Afeem Beauty School</span>
            <h1 className="font-display text-4xl sm:text-5xl text-white leading-tight">
              Learn the Art of Beauty.
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Build your skills. Create your portfolio. Build your career.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href="#courses" variant="outline-light">Explore Courses</Button>
              <Button href="#admissions" variant="ghost" className="text-white hover:text-yellow-warm">Book Counselling</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="The Difference" title="Learn Where You'll Work" description="Afeem students train on the same floor as our salon guests — the connection between school and salon is the whole point." />
          <div className="flex flex-wrap gap-x-3 gap-y-4">
            {journey.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex items-center gap-2 border border-brown/10 bg-white px-4 py-2.5">
                  <span className="text-gold-dark text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-brown">{step}</span>
                </div>
                {i < journey.length - 1 && <span className="text-brown-mute hidden sm:block">→</span>}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="courses" className="py-16 md:py-24 bg-cream-soft scroll-mt-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Courses" title="Find Your Course" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <Link key={c.slug} href={`/beauty-school/${c.slug}`} className="group flex flex-col gap-4 bg-white border border-brown/10">
                <Visual label={c.name} ratio="aspect-[4/3]" />
                <div className="p-6 pt-0 flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wide text-gold-dark">{c.category}</span>
                  <h3 className="font-display text-lg text-brown">{c.name}</h3>
                  <p className="text-sm text-brown-soft leading-relaxed line-clamp-2">{c.summary}</p>
                  <span className="text-xs text-brown-mute">{c.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="curriculum" className="py-16 md:py-24 scroll-mt-20">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <Visual label="Curriculum & Practical Training" ratio="aspect-[4/3]" />
          <div className="flex flex-col gap-5">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Curriculum</span>
            <h2 className="font-display text-3xl text-brown leading-tight">Theory, technique, and real practice.</h2>
            <p className="text-brown-soft leading-relaxed">
              Every Afeem course pairs structured theory with hands-on studio time — colour theory
              before colour application, skin science before facials. Each course page details the
              full module breakdown, certification and career outcomes.
            </p>
          </div>
        </Container>
      </section>

      <section id="trainers" className="py-16 md:py-24 bg-cream-soft scroll-mt-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Trainers" title="Learn From Working Professionals" />
          <div className="grid sm:grid-cols-3 gap-8">
            {trainers.map((t) => (
              <div key={t.slug} className="flex flex-col gap-3">
                <Visual ratio="aspect-square" />
                <div>
                  <h3 className="font-display text-lg text-brown">{t.name}</h3>
                  <p className="text-sm text-gold-dark">{t.designation}</p>
                  <p className="text-sm text-brown-soft mt-1">{t.experience} experience</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="student-work" className="py-16 md:py-24 scroll-mt-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Afeem Talent" title="Student Showcase" description="Real work from real students — across hair, makeup, nails and skin." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Hair", "Makeup", "Nails", "Skin"].map((cat) => (
              <Visual key={cat} label={`Student Work · ${cat}`} ratio="aspect-[3/4]" />
            ))}
          </div>
          {schoolReviews.map((r) => (
            <div key={r.name} className="border border-brown/10 p-6 max-w-xl">
              <p className="text-brown-soft text-sm leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <p className="text-brown font-medium text-sm mt-3">{r.name} · <span className="text-brown-mute font-normal">{r.service}</span></p>
            </div>
          ))}
        </Container>
      </section>

      <section id="careers" className="py-16 md:py-24 bg-brown scroll-mt-20">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.25em] text-yellow-warm">Career Opportunities</span>
            <h2 className="font-display text-3xl text-white leading-tight">Where Afeem graduates go</h2>
            <ul className="text-white/80 text-sm flex flex-col gap-2 mt-2">
              <li>· Placement within the Afeem Salon network</li>
              <li>· Freelance and independent artistry</li>
              <li>· Bridal specialist teams</li>
              <li>· Salon ownership & entrepreneurship</li>
            </ul>
          </div>
          <Visual dark label="Career Opportunities" ratio="aspect-[4/3]" />
        </Container>
      </section>

      <section id="admissions" className="py-16 md:py-24 bg-cream-soft scroll-mt-20">
        <Container className="flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
          <SectionHeading eyebrow="Admissions" title="Start Your Beauty Career" align="center" description="Book a free counselling session to find the right course for your goals." />
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={whatsappLink("Hi Afeem, I'd like to book a Beauty School counselling session.")} variant="primary">
              Book a Counselling Session
            </Button>
            <Button href="/contact#book" variant="secondary">Apply Now</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
