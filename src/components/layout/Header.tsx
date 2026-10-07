"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/data/site";
import { FEATURES } from "@/config/features";

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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navRef = useRef<HTMLElement>(null);
  // Afeem Bridal runs its own bordeaux + gold theme (see --color-bridal-red*
  // in globals.css) — the header rides on top of that page's video hero, so
  // it goes translucent-red-on-glass instead of the site-wide cream, rather
  // than sitting on it as a mismatched cream bar.
  const pathname = usePathname();
  const isBridal = pathname?.startsWith("/bridal") ?? false;

  // Close an open dropdown on outside click/tap so touch users aren't stuck with it open.
  useEffect(() => {
    if (!openDropdown) return;
    function handlePointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openDropdown]);

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
      style={{ willChange: "transform" }}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isBridal
          ? // Solid, not translucent: the header sits in normal document flow
            // above the page content (it doesn't overlap the hero video), so a
            // glassy header here was letting the site's cream body background
            // bleed through as a yellow strip rather than blending with red.
            scrolled
            ? "border-white/10 bg-bridal-red-dark shadow-[0_8px_30px_-20px_rgba(67,10,19,0.6)]"
            : "border-white/10 bg-bridal-red-dark"
          : scrolled
            ? "border-brown/10 bg-cream/95 backdrop-blur shadow-[0_8px_30px_-20px_rgba(58,40,24,0.4)]"
            : "border-transparent bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <Container className="flex items-center justify-between gap-4 py-2.5">
        <Link href="/" className="shrink-0 flex flex-col items-center">
          <Image
            src="/afeem-logo.png"
            alt="Afeem"
            width={300}
            height={163}
            priority
            className="h-14 sm:h-16 lg:h-[4.5rem] w-auto object-contain"
          />
          <span className={`text-[8px] sm:text-[9px] tracking-[0.28em] sm:tracking-[0.32em] uppercase font-sans font-normal mt-1 ${isBridal ? "text-yellow-warm" : "text-gold-dark"}`}>
            {"Beauty · Wellness · Education"}
          </span>
        </Link>

        <nav ref={navRef} className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => {
                if (item.children) setOpenDropdown(item.label);
                setHoveredNav(item.label);
              }}
              onMouseLeave={() => {
                if (item.children) setOpenDropdown(null);
                setHoveredNav((cur) => (cur === item.label ? null : cur));
              }}
            >
              <div className="flex items-center gap-1">
                <Link
                  href={item.href}
                  onClick={() => setOpenDropdown(null)}
                  className={`relative whitespace-nowrap text-xs font-medium uppercase tracking-[0.08em] transition-colors py-2 ${
                    isBridal ? "text-white/80 hover:text-yellow-warm focus-visible:text-yellow-warm" : "text-brown-soft hover:text-gold-dark focus-visible:text-gold-dark"
                  }`}
                >
                  {item.label}
                  {FEATURES.heavyMode && hoveredNav === item.label && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-0.5 left-0 right-0 h-[1.5px] ${isBridal ? "bg-yellow-warm" : "bg-gold"}`}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    aria-label={`${openDropdown === item.label ? "Close" : "Open"} ${item.label} menu`}
                    aria-expanded={openDropdown === item.label}
                    onClick={() => setOpenDropdown((cur) => (cur === item.label ? null : item.label))}
                    className={`p-1 -ml-1 transition-colors ${isBridal ? "text-white/80 hover:text-yellow-warm" : "text-brown-soft hover:text-gold-dark"}`}
                  >
                    <svg
                      viewBox="0 0 12 8"
                      className={`h-2.5 w-2.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 1.5 6 6.5 11 1.5" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && (
                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full w-56 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    openDropdown === item.label ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="mt-1 bg-white shadow-xl border border-brown/10 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className="block px-5 py-2.5 text-sm text-brown-soft hover:bg-yellow-soft hover:text-gold-dark active:bg-yellow-soft whitespace-nowrap"
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

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Button href="/contact#book" variant={isBridal ? "bridal" : "primary"} className="text-xs px-5 py-2.5">
            Book Now
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 shrink-0"
          onClick={() => setMobileOpen((v) => !v)}
          onMouseDown={() => setHidden(false)}
        >
          <span className={`block h-px w-6 transition-transform ${isBridal ? "bg-white" : "bg-brown"} ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-px w-6 transition-opacity ${isBridal ? "bg-white" : "bg-brown"} ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 transition-transform ${isBridal ? "bg-white" : "bg-brown"} ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:hidden border-t max-h-[75svh] overflow-y-auto ${
              isBridal ? "border-white/10 bg-bridal-red-dark backdrop-blur-md" : "border-brown/10 bg-cream"
            }`}
          >
            <Container className="py-4 flex flex-col gap-1">
              {mobileNavItems.map((item) => (
                <div key={item.href} className={`border-b py-2 ${isBridal ? "border-white/10" : "border-brown/5"}`}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-base font-medium ${isBridal ? "text-white" : "text-brown"}`}
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
                          className={`py-1.5 text-sm ${isBridal ? "text-white/70 hover:text-yellow-warm" : "text-brown-soft hover:text-gold-dark"}`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button href={whatsappLink("Hi Afeem, I'd like to enquire.")} variant={isBridal ? "outline-light" : "secondary"}>
                  Enquire on WhatsApp
                </Button>
                <Button href="/contact#book" variant={isBridal ? "bridal" : "primary"}>
                  Book Now
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
