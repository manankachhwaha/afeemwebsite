import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { courses, getCourse } from "@/data/courses";
import { whatsappLink, site } from "@/data/site";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

export function generateStaticParams() {
  return courses.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) return {};
  return {
    title: `${c.name} — Beauty Course in ${site.city}`,
    description: c.summary,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const c = getCourse(course);
  if (!c) notFound();

  const related = courses.filter((r) => r.slug !== c.slug).slice(0, 2);

  return (
    <article>
      <section className="py-12 md:py-16">
        <Container className="grid md:grid-cols-2 gap-12">
          <ImageReveal>
            <Visual label={c.name} ratio="aspect-[4/5]" />
          </ImageReveal>
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <nav className="text-xs text-brown-mute uppercase tracking-wide">
              <Link href="/beauty-school" className="hover:text-gold-dark">Beauty School</Link>
              <span className="mx-2">/</span>
              {c.category}
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl text-brown">{c.name}</h1>
            <p className="text-brown-soft leading-relaxed">{c.summary}</p>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Duration</p>
                <p className="text-brown font-medium">{c.duration}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Fees</p>
                <p className="text-gold-dark font-medium">{c.fees}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Eligibility</p>
                <p className="text-brown-soft text-sm">{c.eligibility}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-brown-mute">Certification</p>
                <p className="text-brown-soft text-sm">{c.certification}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button href="/contact#book" variant="primary">Apply Now</Button>
              <Button href={whatsappLink(`Hi Afeem, I'd like to book a counselling session for ${c.name}.`)} variant="secondary">
                Book a Counselling Session
              </Button>
            </div>
            <p className="text-xs text-brown-mute">{c.nextBatch}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 bg-cream-soft">
        <Container>
          <Reveal className="grid sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-3">Curriculum & Modules</h2>
              <ul className="flex flex-col gap-2">
                {c.curriculum.map((m) => (
                  <li key={m} className="text-sm text-brown-soft flex gap-2">
                    <span className="text-gold-dark">✓</span>{m}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm uppercase tracking-wide text-brown-mute mb-3">Practical Training</h2>
              <p className="text-sm text-brown-soft leading-relaxed">{c.practicalFocus}</p>
              <h2 className="text-sm uppercase tracking-wide text-brown-mute mt-6 mb-3">Career Opportunities</h2>
              <ul className="flex flex-col gap-1.5">
                {c.careerOutcomes.map((o) => (
                  <li key={o} className="text-sm text-brown-soft">{o}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12">
        <Container className="flex flex-col gap-6">
          <h2 className="font-display text-2xl text-brown">Student Work</h2>
          <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-4" stagger={0.06}>
            {Array.from({ length: 4 }).map((_, i) => (
              <RevealItem key={i}>
                <ImageReveal>
                  <Visual label={c.category} ratio="aspect-[3/4]" />
                </ImageReveal>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {c.faqs.length > 0 && (
        <section className="py-12 bg-cream-soft">
          <Container className="max-w-3xl flex flex-col gap-6">
            <Reveal>
              <h2 className="font-display text-2xl text-brown">Frequently Asked Questions</h2>
            </Reveal>
            <div className="flex flex-col divide-y divide-brown/10">
              {c.faqs.map((f) => (
                <details key={f.q} className="py-4 group">
                  <summary className="cursor-pointer text-brown font-medium list-none flex justify-between items-center">
                    {f.q}
                    <span className="text-gold-dark group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-brown-soft mt-2 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-12 md:py-16 border-t border-brown/10">
          <Container className="flex flex-col gap-8">
            <h2 className="font-display text-2xl text-brown">Other Courses</h2>
            <RevealGroup className="grid sm:grid-cols-2 gap-8" stagger={0.1}>
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <Link href={`/beauty-school/${r.slug}`} className="flex gap-5 border border-brown/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-26px_rgba(58,40,24,0.35)] hover:border-gold/40">
                    <Visual ratio="aspect-square" className="w-24 shrink-0" />
                    <div>
                      <h3 className="font-display text-lg text-brown">{r.name}</h3>
                      <p className="text-sm text-brown-soft mt-1 line-clamp-2">{r.summary}</p>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}
    </article>
  );
}
