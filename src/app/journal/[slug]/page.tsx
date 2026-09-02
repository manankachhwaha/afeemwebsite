import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Visual from "@/components/ui/Visual";
import Button from "@/components/ui/Button";
import { journalPosts, getPost } from "@/data/journal";
import { Reveal, ImageReveal } from "@/components/motion";

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = journalPosts.filter((p) => p.slug !== post.slug && p.bucket === post.bucket).slice(0, 2);

  return (
    <article>
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl flex flex-col gap-6">
          <Link href="/journal" className="text-xs uppercase tracking-wide text-brown-mute hover:text-gold-dark">
            ← Afeem Journal
          </Link>
          <Reveal className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wide text-gold-dark">{post.bucket}</span>
            <h1 className="font-display text-3xl sm:text-4xl text-brown leading-tight">{post.title}</h1>
            <p className="text-sm text-brown-mute">{new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })} · {post.readTime}</p>
          </Reveal>
          <ImageReveal delay={0.1}>
            <Visual ratio="aspect-[16/9]" />
          </ImageReveal>
          <Reveal delay={0.2} className="flex flex-col gap-4 pt-4">
            {post.content.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2 key={i} className="font-display text-xl sm:text-2xl text-brown mt-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="list-disc pl-5 flex flex-col gap-1.5 text-brown-soft leading-relaxed">
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "faq") {
                return (
                  <div key={i} className="flex flex-col gap-5 pt-2">
                    {block.items.map((faq, j) => (
                      <div key={j}>
                        <p className="font-display text-brown">{faq.q}</p>
                        <p className="text-brown-soft leading-relaxed mt-1">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <p key={i} className="text-brown-soft leading-relaxed">{block.text}</p>
              );
            })}
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-cream-soft">
          <Container className="max-w-3xl flex flex-col gap-6">
            <h2 className="font-display text-xl text-brown">More on {post.bucket}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/journal/${r.slug}`} className="flex flex-col gap-2">
                  <h3 className="font-display text-brown">{r.title}</h3>
                  <p className="text-sm text-brown-soft line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container className="max-w-3xl">
          <Button href="/contact#book" variant="primary">Book an Appointment</Button>
        </Container>
      </section>
    </article>
  );
}
