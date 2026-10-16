import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Visual from "@/components/ui/Visual";
import { events } from "@/data/extras";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";

/** Upcoming events from the CMS. Renders nothing when there are none. */
export default function EventsBand({ title = "Upcoming at Afeem" }: { title?: string }) {
  if (!events.length) return null;
  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow="Events" title={title} />
        </Reveal>
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {events.map((e) => (
            <RevealItem key={e.id} className="flex flex-col border border-brown/10 bg-white">
              {e.image && <Visual ratio="aspect-[16/10]" src={e.image} alt={e.title} />}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="text-xs uppercase tracking-wide text-gold-dark">
                  {e.date ? new Date(e.date + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) : ""}
                  {e.time ? ` · ${e.time}` : ""}
                </span>
                <h3 className="font-display text-xl text-brown">{e.title}</h3>
                {e.location && <p className="text-xs text-brown-mute">{e.location}</p>}
                {e.description && <p className="text-sm leading-relaxed text-brown-soft">{e.description}</p>}
                {e.ctaLink && (
                  <Button href={e.ctaLink} variant="secondary" className="mt-auto self-start">
                    {e.ctaLabel || "Reserve a seat"}
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
