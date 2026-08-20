"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";

const salonLinks = [
  { href: "/salon-spa/hair", label: "Hair" },
  { href: "/salon-spa/skin", label: "Skin" },
  { href: "/salon-spa/makeup", label: "Makeup" },
  { href: "/salon-spa/nails", label: "Nails" },
  { href: "/salon-spa/spa-wellness", label: "Spa & Wellness" },
  { href: "/salon-spa#packages", label: "Packages" },
  { href: "/bridal", label: "Bridal" },
  { href: "/transformations", label: "Transformations" },
];

const schoolLinks = [
  { href: "/beauty-school#courses", label: "Courses" },
  { href: "/beauty-school#curriculum", label: "Curriculum" },
  { href: "/beauty-school#trainers", label: "Trainers" },
  { href: "/beauty-school#student-work", label: "Student Work" },
  { href: "/beauty-school#admissions", label: "Admissions" },
  { href: "/beauty-school#careers", label: "Career Opportunities" },
];

const aboutLinks = [
  { href: "/about", label: "About Afeem" },
  { href: "/journal", label: "Journal" },
  { href: "/locations", label: "Locations" },
];

const navItems = [
  { href: "/salon-spa", label: "Salon & Spa", children: salonLinks },
  { href: "/beauty-school", label: "Beauty School", children: schoolLinks },
  { href: "/about", label: "About", children: aboutLinks },
  { href: "/contact", label: "Contact" },
];

const mobileNavItems = [{ href: "/", label: "Home" }, ...navItems];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 16);
    if (mobileOpen) return;
    if (latest < 140) {
      setHidden(false);
      return;
    }
    const delta = latest - prev;
    if (delta > 0.5) setHidden(true);
    else if (delta < -0.5) setHidden(false);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-brown/10 bg-cream/95 backdrop-blur shadow-[0_8px_30px_-20px_rgba(58,40,24,0.4)]" : "border-transparent bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-[4.5rem] lg:h-20 items-center justify-between gap-4">
        <Link href="/" className="shrink-0 flex items-center gap-3">
          <Image
            src="/afeem-logo.png"
            alt="Afeem"
            width={300}
            height={163}
            priority
            className="h-11 sm:h-12 w-auto"
          />
          <span className="hidden xl:inline text-[10px] tracking-[0.3em] uppercase text-gold-dark font-sans font-normal">
            {"Beauty · Wellness · Education"}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.08em] text-brown-soft hover:text-gold-dark transition-colors py-2"
              >
                {item.label}
              </Link>
              {item.children && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full w-56 transition-all duration-150 ${
                    openDropdown === item.label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="mt-1 bg-white shadow-xl border border-brown/10 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-2.5 text-sm text-brown-soft hover:bg-yellow-soft hover:text-gold-dark whitespace-nowrap"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center shrink-0">
          <Button href="/contact#book" variant="primary" className="text-xs px-5 py-2.5">
            Book Now
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 shrink-0"
          onClick={() => setMobileOpen((v) => !v)}
          onMouseDown={() => setHidden(false)}
        >
          <span className={`block h-px w-6 bg-brown transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-brown transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-brown transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </Container>

      {mobileOpen && (
        <div className="lg:hidden border-t border-brown/10 bg-cream max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <Container className="py-4 flex flex-col gap-1">
            {mobileNavItems.map((item) => (
              <div key={item.href} className="border-b border-brown/5 py-2">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-base font-medium text-brown"
                >
                  {item.label}
                </Link>
                {"children" in item && item.children && (
                  <div className="pl-4 flex flex-col gap-1 pb-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-1.5 text-sm text-brown-soft hover:text-gold-dark"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Button href={whatsappLink("Hi Afeem, I'd like to enquire.")} variant="secondary">
                Enquire on WhatsApp
              </Button>
              <Button href="/contact#book" variant="primary">
                Book Now
              </Button>
            </div>
          </Container>
        </div>
      )}
    </motion.header>
  );
}
