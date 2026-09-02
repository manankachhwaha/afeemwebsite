import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { SparkleIcon } from "@/components/ui/icons";
import { Reveal, ImageReveal } from "@/components/motion";

export default function ExperienceIntro() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <ImageReveal>
          <Visual label="The Afeem Experience" icon={SparkleIcon} ratio="aspect-[4/3]" src="/images/ratanada/06.jpg" />
        </ImageReveal>
        <Reveal delay={0.15} className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">The Afeem Experience</span>
          <h2 className="font-display text-3xl sm:text-4xl text-brown leading-tight">
            More than a salon. An experience designed around you.
          </h2>
          <p className="text-brown-soft leading-relaxed">
            Every visit to Afeem begins with listening — to your hair, your skin, your day. Our
            spaces are built for quiet, our experts trained to notice detail, and our Beauty School
            students trained on the same standards our salon guests receive. It&rsquo;s one brand,
            one standard of care, across everything we do.
          </p>
          <div className="gold-rule" />
          <div>
            <Button href="/about" variant="secondary">
              Discover Afeem
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
