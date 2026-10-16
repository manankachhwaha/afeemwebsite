import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import { site } from "@/data/site";
import { t } from "@/lib/cms";
import { galleries } from "@/data/extras";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

/** A stand-in for the live feed until the Instagram Graph API is wired up — real Afeem photography, not stock. */
const feedImages = galleries.instagramGrid;

export default function InstagramFeed() {
  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">{t("home.instaEyebrow")}</span>
            <h2 className="font-display text-2xl sm:text-3xl text-brown">{t("home.instaTitle")}</h2>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="text-sm text-gold-dark hover:underline hidden sm:block">
            Follow us
          </a>
        </Reveal>
        <RevealGroup className="grid grid-cols-3 md:grid-cols-6 gap-2" stagger={0.05}>
          {feedImages.map((src, i) => (
            <RevealItem key={src} className="group">
              <a href={site.instagram} target="_blank" rel="noreferrer">
                <ImageReveal delay={i * 0.03}>
                  <Visual src={src} ratio="aspect-square" className="transition-transform duration-500 ease-out group-hover:scale-105" />
                </ImageReveal>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
