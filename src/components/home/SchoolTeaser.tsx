import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { EducationIcon } from "@/components/ui/icons";
import { Reveal, ImageReveal } from "@/components/motion";
import { t } from "@/lib/cms";
import { galleries, lists } from "@/data/extras";

const journeySteps = lists.schoolJourney;

export default function SchoolTeaser() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal className="flex flex-col gap-5 order-2 md:order-1">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">{t("home.schoolEyebrow")}</span>
          <h2 className="font-display text-3xl sm:text-4xl text-brown leading-tight">
            {t("home.schoolTitle")}
          </h2>
          <p className="text-brown-soft leading-relaxed">
            {t("home.schoolBody")}
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
              {t("home.schoolBtn1")}
            </Button>
            <Button href="/beauty-school#admissions" variant="secondary">
              {t("home.schoolBtn2")}
            </Button>
          </div>
        </Reveal>
        <ImageReveal delay={0.15} className="order-1 md:order-2">
          <Visual label="Afeem Beauty School" icon={EducationIcon} ratio="aspect-[4/3]" src={galleries.schoolImage} />
        </ImageReveal>
      </Container>
    </section>
  );
}
