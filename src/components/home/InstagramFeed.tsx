import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import { site } from "@/data/site";

export default function InstagramFeed() {
  return (
    <section className="py-16 md:py-24">
      <Container className="flex flex-col gap-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark">Follow Along</span>
            <h2 className="font-display text-2xl sm:text-3xl text-brown">@afeem on Instagram</h2>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="text-sm text-gold-dark hover:underline hidden sm:block">
            Follow us
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <a key={i} href={site.instagram} target="_blank" rel="noreferrer">
              <Visual ratio="aspect-square" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
