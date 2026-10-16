"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { BranchCallButton, BranchWhatsAppButton } from "@/components/branch/BranchCTA";
import { Reveal } from "@/components/motion";
import { t } from "@/lib/cms";

/** The last beat of the homepage story: three easy ways to take the next step. */
export default function FinalCTA() {
  return (
    <section className="bg-brown text-white">
      <Container className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <Reveal className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-yellow-warm">{t("home.finalEyebrow")}</span>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">{t("home.finalTitle")}</h2>
          <p className="max-w-md leading-relaxed text-white/75">
            {t("home.finalBody")}
          </p>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/contact#book" variant="primary" className="!bg-gold !border-gold !text-brown hover:!bg-white hover:!border-white">
            {t("home.finalBtn1")}
          </Button>
          <BranchWhatsAppButton message="Hi Afeem, I'd like to know more about your services." variant="outline-light">
            {t("home.finalBtn2")}
          </BranchWhatsAppButton>
          <BranchCallButton variant="outline-light">{t("home.finalBtn3")}</BranchCallButton>
        </div>
      </Container>
    </section>
  );
}
