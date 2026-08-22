import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { site } from "@/data/site";
import { branches } from "@/data/branches";
import MotionToggle from "@/components/motion/MotionToggle";
import SocialLinks from "@/components/layout/SocialLinks";

const columns = [
  {
    title: "Salon & Spa",
    links: [
      { href: "/salon-spa/hair", label: "Hair" },
      { href: "/salon-spa/skin", label: "Skin" },
      { href: "/salon-spa/makeup", label: "Makeup" },
      { href: "/salon-spa/nails", label: "Nails" },
      { href: "/salon-spa/spa-wellness", label: "Spa & Wellness" },
      { href: "/bridal", label: "Bridal" },
    ],
  },
  {
    title: "Beauty School",
    links: [
      { href: "/beauty-school#courses", label: "Courses" },
      { href: "/beauty-school#admissions", label: "Admissions" },
      { href: "/beauty-school#student-work", label: "Student Work" },
      { href: "/beauty-school#careers", label: "Career Opportunities" },
    ],
  },
  {
    title: "Afeem",
    links: [
      { href: "/about", label: "About Afeem" },
      { href: "/transformations", label: "Transformations" },
      { href: "/journal", label: "Journal" },
      { href: "/locations", label: "Locations" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brown text-white mt-24">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2 flex flex-col gap-4">
            <Image
              src="/afeem-logo.png"
              alt="Afeem"
              width={300}
              height={163}
              className="w-32 h-auto self-start object-contain"
            />
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-warm">{site.tagline}</p>
            <p className="text-sm text-white/70 max-w-xs leading-relaxed">{site.description}</p>
            <div className="gold-rule" />
            <div className="flex flex-col gap-3">
              {branches.map((b) => (
                <div key={b.slug} className="text-sm text-white/70 flex flex-col gap-0.5">
                  <span className="text-yellow-warm text-xs uppercase tracking-wide">{b.shortName}</span>
                  <a href={b.phoneHref} className="hover:text-gold-light">{b.phone}</a>
                  <a href={`mailto:${b.email}`} className="hover:text-gold-light">{b.email}</a>
                </div>
              ))}
            </div>
            <SocialLinks />
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-yellow-warm">{col.title}</h3>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-white/70 hover:text-gold-light">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved. {site.city}, India.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-gold-light">Contact</Link>
            <Link href="/locations" className="hover:text-gold-light">Locations</Link>
            <MotionToggle />
          </div>
        </div>
      </Container>
    </footer>
  );
}
