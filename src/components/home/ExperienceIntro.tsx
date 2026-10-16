import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { SparkleIcon } from "@/components/ui/icons";
import { Reveal, ImageReveal } from "@/components/motion";
import { t } from "@/lib/cms";
import { galleries } from "@/data/extras";

export default function ExperienceIntro() {
  return (
    <section className="py-16 md:py-24 bg-cream-soft">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <ImageReveal>
          <Visual label="Afeem Ratanada" icon={SparkleIcon} ratio="aspect-[4/3]" src={galleries.experienceImage} />
        </ImageReveal>
        <Reveal delay={0.15} className="flex flex-col gap-5">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">{t("home.expEyebrow")}</span>
          <h2 className="font-display text-3xl sm:text-4xl text-brown leading-tight">
            {t("home.expTitle")}
          </h2>
          <p className="text-brown-soft leading-relaxed">
            {t("home.expBody")}
          </p>
          <div className="gold-rule" />
          <div>
            <Button href="/about" variant="secondary">
              {t("home.expBtn")}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
