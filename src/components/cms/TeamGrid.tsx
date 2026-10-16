import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";
import type { TeamMember } from "@/data/extras";
import { Reveal, RevealGroup, RevealItem, ImageReveal } from "@/components/motion";

/** Profiles of experts/trainers from the CMS. Renders nothing when the list is empty. */
export default function TeamGrid({ members, eyebrow, title, description, id }: { members: TeamMember[]; eyebrow: string; title: string; description?: string; id?: string }) {
  if (!members.length) return null;
  return (
    <section id={id} className="py-16 md:py-24 scroll-mt-32">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </Reveal>
        <RevealGroup className="grid grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.08}>
          {members.map((m) => (
            <RevealItem key={m.id} className="flex flex-col gap-3">
              <ImageReveal>
                <Visual label={m.specialisation || undefined} ratio="aspect-[3/4]" src={m.photo || undefined} alt={m.name} />
              </ImageReveal>
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-lg text-brown">{m.name}</h3>
                {m.role && <p className="text-sm text-gold-dark">{m.role}</p>}
                {m.experience && <p className="text-xs text-brown-mute">{m.experience}</p>}
                {m.bio && <p className="mt-1 text-sm leading-relaxed text-brown-soft">{m.bio}</p>}
                <Button href={whatsappLink(`Hi Afeem, I'd like to book with ${m.name}.`)} variant="ghost" className="mt-2 self-start !px-0 normal-case tracking-normal">
                  Book with {m.name.split(" ")[0]}
                </Button>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
