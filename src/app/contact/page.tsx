import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/contact/BookingForm";
import CallbackForm from "@/components/contact/CallbackForm";
import Button from "@/components/ui/Button";
import { branches, branchWhatsappLink } from "@/data/branches";
import { site } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { BranchCallButton } from "@/components/branch/BranchCTA";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Book an appointment or get in touch with Afeem Spa & Salon and Afeem Beauty School in Jodhpur.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch" description="Book an appointment, ask a question, or plan your visit to Afeem." />

      <section id="book" className="py-16 md:py-24 scroll-mt-32">
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading eyebrow="Book Now" title="Book an Appointment" description="Tell us your preferred branch, service, date and time — we'll confirm on WhatsApp." />
            <div className="flex flex-col gap-6 mt-2">
              {branches.map((b) => (
                <div key={b.slug} className="text-sm text-brown-soft flex flex-col gap-2">
                  <p className="text-brown font-medium">{b.name}</p>
                  <p>{b.address}</p>
                  <a href={b.phoneHref} className="text-gold-dark">{b.phone}</a>
                  <Button
                    href={branchWhatsappLink(b, `Hi Afeem, I'd like to enquire about ${b.name}.`)}
                    variant="secondary"
                    className="self-start mt-1"
                  >
                    Enquire — {b.shortName}
                  </Button>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <BookingForm />
          </Reveal>
        </Container>
      </section>

      <section id="callback" className="py-16 md:py-24 bg-cream-soft scroll-mt-32">
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              eyebrow="Prefer a Call?"
              title="Request a Callback"
              description="Short on time to fill out the full booking form? Leave your number and a good time to call — our team will ring you directly."
            />
          </Reveal>
          <Reveal delay={0.15}>
            <CallbackForm />
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <RevealGroup className="grid sm:grid-cols-3 gap-8 text-center sm:text-left items-start" stagger={0.1}>
            <RevealItem className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Call Us</p>
              <BranchCallButton variant="ghost" className="px-0 normal-case tracking-normal text-base">
                {site.phone}
              </BranchCallButton>
            </RevealItem>
            <RevealItem>
              <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Email</p>
              <a href={`mailto:${site.email}`} className="text-gold-dark font-medium">{site.email}</a>
            </RevealItem>
            <RevealItem>
              <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Instagram</p>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="text-gold-dark font-medium">@afeemspaandsalon</a>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
