import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { EducationIcon } from "@/components/ui/icons";
import { Reveal, ImageReveal } from "@/components/motion";

const journeySteps = ["Learn", "Hands-on Practice", "Live Salon Exposure", "Build Portfolio", "Career Opportunities"];

export default function SchoolTeaser() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="flex flex-col gap-5 order-2 md:order-1">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Afeem Beauty School</span>
          <h2 className="font-display text-3xl sm:text-4xl text-brown leading-tight">
            Learn the Art of Beauty.
          </h2>
          <p className="text-brown-soft leading-relaxed">
            Our students train on the same floor as our salon guests — building real skill, a real
            portfolio, and real client experience before they graduate.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {journeySteps.map((step, i) => (
              <span key={step} className="flex items-center gap-2 text-xs text-brown-soft">
                <span className="text-gold-dark font-medium">{String(i + 1).padStart(2, "0")}</span>
                {step}
                {i < journeySteps.length - 1 && <span className="text-brown-mute">→</span>}
              </span>
            ))}
          </div>
          <div className="flex gap-4 pt-2">
            <Button href="/beauty-school" variant="primary">
              Explore Courses
            </Button>
            <Button href="/beauty-school#admissions" variant="secondary">
              Book Counselling
            </Button>
          </div>
        </Reveal>
        <ImageReveal delay={0.15} className="order-1 md:order-2">
          <Visual label="Afeem Beauty School" icon={EducationIcon} ratio="aspect-[4/3]" src="/images/beauty-school/01.jpg" />
        </ImageReveal>
      </Container>
    </section>
  );
}
