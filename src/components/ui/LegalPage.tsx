import { ReactNode } from "react";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const LEGAL_UPDATED = "30 October 2026";

export default function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Last updated: ${LEGAL_UPDATED}`} />
      <section className="py-12 md:py-16">
        <Container>
          <div className="max-w-3xl flex flex-col gap-5 text-brown-soft leading-relaxed text-[0.95rem] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-brown [&_h2]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_a]:text-gold-dark [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
