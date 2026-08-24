"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FEATURES } from "@/config/features";
import { beautySchoolWhatsappLink } from "@/data/site";
import { branches, branchWhatsappLink } from "@/data/branches";
import { useBranch } from "@/lib/BranchContext";

type Message = { role: "user" | "assistant"; content: string };

type Action =
  | { type: "goto"; target: string }
  | { type: "link"; href: string }
  | { type: "whatsapp"; message: string }
  | { type: "whatsapp-branch"; slug: string; message: string }
  | { type: "beauty-school"; message: string };

type Option = { label: string; action: Action };
type Node = { message: string; options: Option[] };

/**
 * Guided, tap-to-choose flow — no free text, no AI call. Every leaf ends in
 * a real action (WhatsApp, a booking link, or a course page), never a dead
 * end. Add a branch by adding a node here and pointing an option at it.
 */
const NODES: Record<string, Node> = {
  root: {
    message: "Hi, I'm Ask Afeem. What brings you here today?",
    options: [
      { label: "Book a Salon or Spa Service", action: { type: "goto", target: "salon" } },
      { label: "Bridal Enquiry", action: { type: "goto", target: "bridal" } },
      { label: "Beauty School & Courses", action: { type: "goto", target: "school" } },
      { label: "Hours, Location & Pricing", action: { type: "goto", target: "info" } },
      { label: "Something Else", action: { type: "goto", target: "other" } },
    ],
  },
  salon: {
    message: "What are you looking for?",
    options: [
      { label: "Hair", action: { type: "goto", target: "salon-hair" } },
      { label: "Skin", action: { type: "goto", target: "salon-skin" } },
      { label: "Spa & Wellness", action: { type: "goto", target: "salon-spa" } },
      { label: "Makeup", action: { type: "goto", target: "salon-makeup" } },
      { label: "Nails", action: { type: "goto", target: "salon-nails" } },
      { label: "Not Sure — Recommend Something", action: { type: "goto", target: "salon-unsure" } },
      { label: "Back", action: { type: "goto", target: "root" } },
    ],
  },
  "salon-hair": {
    message: "Hair at Afeem covers haircut & styling, global colour, highlights/balayage, keratin/smoothening and hair spa.",
    options: [
      { label: "Book Now", action: { type: "link", href: "/contact#book" } },
      { label: "WhatsApp This Branch", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about hair services." } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  "salon-skin": {
    message: "Skin services include basic and signature facials, clean-ups, and special skin treatments.",
    options: [
      { label: "Book Now", action: { type: "link", href: "/contact#book" } },
      { label: "WhatsApp This Branch", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about skin/facial services." } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  "salon-spa": {
    message: "Spa & Wellness includes body spa, full body massage, and head & shoulder massage — a proper reset.",
    options: [
      { label: "Book Now", action: { type: "link", href: "/contact#book" } },
      { label: "WhatsApp This Branch", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about spa & wellness services." } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  "salon-makeup": {
    message: "Makeup covers party & occasion looks, with professional hair styling included.",
    options: [
      { label: "Book Now", action: { type: "link", href: "/contact#book" } },
      { label: "WhatsApp This Branch", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about makeup services." } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  "salon-nails": {
    message: "Nails: manicure, pedicure, and nail art / extensions.",
    options: [
      { label: "Book Now", action: { type: "link", href: "/contact#book" } },
      { label: "WhatsApp This Branch", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about nail services." } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  "salon-unsure": {
    message: "No problem — tell our team a little about what you're looking for and they'll recommend the right service.",
    options: [
      { label: "WhatsApp Our Team", action: { type: "whatsapp", message: "Hi Afeem, I'm not sure which service is right for me — could you help me choose?" } },
      { label: "Back", action: { type: "goto", target: "salon" } },
    ],
  },
  bridal: {
    message: "Afeem Bridal covers bridal makeup, pre-bridal prep, and makeup for groom and guests. We recommend booking 4–8 weeks ahead of your date — earlier for peak wedding season.",
    options: [
      { label: "Start Bridal Enquiry", action: { type: "link", href: "/bridal#book" } },
      { label: "WhatsApp the Bridal Team", action: { type: "whatsapp", message: "Hi Afeem, I'd like to enquire about bridal services." } },
      { label: "Back", action: { type: "goto", target: "root" } },
    ],
  },
  school: {
    message: "Afeem Beauty School currently offers two courses: Certificate in Basic Makeup (45 days, ₹38,000) and Hair Styling (30 days, ₹25,000) — both leading to NSDC-linked certification.",
    options: [
      { label: "Book a Counselling Session", action: { type: "beauty-school", message: "Hi Afeem, I'd like to book a Beauty School counselling session." } },
      { label: "View Courses", action: { type: "link", href: "/beauty-school" } },
      { label: "Back", action: { type: "goto", target: "root" } },
    ],
  },
  info: {
    message: "Which would you like to know?",
    options: [
      ...branches.map((b) => ({ label: `${b.shortName} Branch`, action: { type: "goto" as const, target: `info-${b.slug}` } })),
      { label: "Pricing", action: { type: "goto", target: "info-pricing" } },
      { label: "Back", action: { type: "goto", target: "root" } },
    ],
  },
  ...Object.fromEntries(
    branches.map((b) => [
      `info-${b.slug}`,
      {
        message: `${b.name} — ${b.address}. Open ${b.hours}.`,
        options: [
          { label: `Call ${b.shortName}`, action: { type: "link", href: b.phoneHref } },
          { label: `WhatsApp ${b.shortName}`, action: { type: "whatsapp-branch", slug: b.slug, message: `Hi Afeem, I'd like to enquire about ${b.shortName}.` } },
          { label: "Get Directions", action: { type: "link", href: b.googleMapsSearchUrl } },
          { label: "Back", action: { type: "goto", target: "info" } },
        ],
      } satisfies Node,
    ])
  ),
  "info-pricing": {
    message: "Exact pricing depends on the service and is confirmed by our team directly on WhatsApp — they'll get back to you with current rates.",
    options: [
      { label: "WhatsApp for Pricing", action: { type: "whatsapp", message: "Hi Afeem, could you share pricing for your services?" } },
      { label: "Back", action: { type: "goto", target: "info" } },
    ],
  },
  other: {
    message: "No problem — our team is happy to help directly.",
    options: [
      { label: "WhatsApp Us", action: { type: "whatsapp", message: "Hi Afeem, I'd like to know more." } },
      { label: "Back", action: { type: "goto", target: "root" } },
    ],
  },
};

export default function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState("root");
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: NODES.root.message }]);
  const listRef = useRef<HTMLDivElement>(null);
  const { requestBranch } = useBranch();

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!FEATURES.concierge) return null;

  const openLink = (href: string) => {
    const win = window.open(href, "_blank", "noopener,noreferrer");
    if (!win) window.location.assign(href);
  };

  const handleOption = (option: Option) => {
    setMessages((prev) => [...prev, { role: "user", content: option.label }]);
    const { action } = option;

    if (action.type === "goto") {
      const node = NODES[action.target];
      setCurrentKey(action.target);
      setMessages((prev) => [...prev, { role: "assistant", content: node.message }]);
      return;
    }

    if (action.type === "link") {
      // Internal routes and tel:/mailto: stay in this tab; external links
      // (Google Maps, etc.) open in a new one so the visitor doesn't lose
      // the site.
      const staysInTab = action.href.startsWith("/") || action.href.startsWith("tel:") || action.href.startsWith("mailto:");
      if (staysInTab) window.location.assign(action.href);
      else openLink(action.href);
      setMessages((prev) => [...prev, { role: "assistant", content: "Opening that for you now." }]);
      return;
    }

    if (action.type === "whatsapp") {
      requestBranch((branch) => openLink(branchWhatsappLink(branch, action.message)));
      setMessages((prev) => [...prev, { role: "assistant", content: "Opening WhatsApp for you now." }]);
      return;
    }

    if (action.type === "whatsapp-branch") {
      const branch = branches.find((b) => b.slug === action.slug);
      if (branch) openLink(branchWhatsappLink(branch, action.message));
      setMessages((prev) => [...prev, { role: "assistant", content: "Opening WhatsApp for you now." }]);
      return;
    }

    if (action.type === "beauty-school") {
      openLink(beautySchoolWhatsappLink(action.message));
      setMessages((prev) => [...prev, { role: "assistant", content: "Opening WhatsApp for you now." }]);
      return;
    }
  };

  const currentNode = NODES[currentKey];

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Ask Afeem" : "Open Ask Afeem concierge"}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-5 md:bottom-6 md:right-6 z-40 flex h-14 items-center gap-2 rounded-full bg-gold text-brown shadow-lg shadow-brown/30 px-4 hover:bg-gold-dark hover:text-white transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6 shrink-0">
          <path d="M4 5h16v10H8l-4 4V5Z" strokeLinejoin="round" />
          <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="12" cy="10" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
        </svg>
        <span className="hidden sm:inline text-xs uppercase tracking-wide">Ask Afeem</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-40 bg-cream border border-gold/30 shadow-2xl flex flex-col
                       inset-x-4 bottom-24 top-24
                       sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-40 sm:w-[22rem] sm:h-[30rem] md:right-6"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brown/10 bg-brown text-white">
              <div>
                <p className="font-display text-lg leading-tight">Ask Afeem</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-yellow-warm">Your Beauty Concierge</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-white/70 hover:text-white p-1">
                ✕
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "self-end bg-brown text-white"
                      : "self-start bg-white border border-brown/10 text-brown-soft"
                  }`}
                >
                  {m.content}
                </div>
              ))}
            </div>

            <div className="border-t border-brown/10 p-3 flex flex-col gap-2">
              {currentNode.options.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => handleOption(option)}
                  className="text-left text-sm border border-brown/20 text-brown hover:border-gold hover:bg-yellow-soft px-4 py-2.5 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
