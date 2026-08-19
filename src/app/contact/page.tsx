import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import BookingForm from "@/components/contact/BookingForm";
import Button from "@/components/ui/Button";
import { branches } from "@/data/branches";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Book",
  description: "Book an appointment or get in touch with Afeem Spa & Salon and Afeem Beauty School in Jodhpur.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in Touch" description="Book an appointment, ask a question, or plan your visit to Afeem." />

      <section id="book" className="py-16 md:py-24 scroll-mt-20">
        <Container className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="Book Now" title="Book an Appointment" description="Tell us your preferred branch, service, date and time — we'll confirm on WhatsApp." />
            <div className="flex flex-col gap-4 mt-2">
              {branches.map((b) => (
                <div key={b.slug} className="text-sm text-brown-soft">
                  <p className="text-brown font-medium">{b.name}</p>
                  <p>{b.address}</p>
                  <a href={b.phoneHref} className="text-gold-dark">{b.phone}</a>
                </div>
              ))}
            </div>
            <Button href={whatsappLink("Hi Afeem, I'd like to enquire.")} variant="secondary" className="self-start mt-2">
              Or Enquire on WhatsApp
            </Button>
          </div>
          <BookingForm />
        </Container>
      </section>

      <section className="py-16 bg-cream-soft">
        <Container className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Call Us</p>
            <a href={site.phoneHref} className="text-gold-dark font-medium">{site.phone}</a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Email</p>
            <a href={`mailto:${site.email}`} className="text-gold-dark font-medium">{site.email}</a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-brown-mute mb-1">Instagram</p>
            <a href={site.instagram} target="_blank" rel="noreferrer" className="text-gold-dark font-medium">@afeem</a>
          </div>
        </Container>
      </section>
    </>
  );
}
