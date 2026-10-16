import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { offers } from "@/data/extras";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

/** Current offers from the CMS. Renders nothing when there are no live offers. */
export default function OffersBand() {
  if (!offers.length) return null;
  return (
    <section className="py-16 md:py-24 bg-cream-soft">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Offers" title="Current Offers at Afeem" />
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {offers.map((o) => (
            <RevealItem key={o.id} className="flex flex-col bg-white border border-brown/10">
              {o.image && <Visual label={o.badge || undefined} ratio="aspect-[16/10]" src={o.image} alt={o.title} />}
              <div className="flex flex-1 flex-col gap-3 p-6">
                {o.badge && !o.image && <span className="w-fit bg-gold px-3 py-1 text-xs font-medium uppercase tracking-wide text-brown">{o.badge}</span>}
                <h3 className="font-display text-xl text-brown">{o.title}</h3>
                {o.description && <p className="text-sm leading-relaxed text-brown-soft">{o.description}</p>}
                {o.validTill && <p className="text-xs text-brown-mute">Valid till {new Date(o.validTill + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>}
                {o.ctaLink && (
                  <Button href={o.ctaLink} variant="secondary" className="mt-auto self-start">
                    {o.ctaLabel || "Book now"}
                  </Button>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
