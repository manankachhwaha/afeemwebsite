export type JournalPost = {
  slug: string;
  title: string;
  bucket: "Hair" | "Skin" | "Bridal" | "Beauty Education";
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "prepare-skin-before-wedding",
    title: "How to Prepare Your Skin Before Your Wedding",
    bucket: "Bridal",
    excerpt: "A realistic, month-by-month skin prep timeline so your skin peaks on the day — not just the trial.",
    date: "2026-06-02",
    readTime: "6 min read",
    content: [
      "Most brides start skin prep far too close to the wedding date. The best results come from starting at least 8–10 weeks out, giving your skin time to respond to treatment without the risk of a reaction close to the big day.",
      "Weeks 8–6: Focus on hydration and gentle exfoliation. This is also the window to address any pigmentation or acne concerns with a facial series.",
      "Weeks 6–3: Brightening facials and targeted treatments. Avoid trying new products in this window — stick to what your skin already tolerates well.",
      "Final 2 weeks: Simplify. Gentle facials only, no new actives, no extractions within 5 days of the event. Sleep and hydration matter more than any treatment at this stage.",
      "Book a Skin Prep consultation with our team to build a timeline around your actual wedding date.",
    ],
  },
  {
    slug: "complete-pre-bridal-timeline",
    title: "The Complete Pre-Bridal Timeline",
    bucket: "Bridal",
    excerpt: "Hair, skin, nails and makeup trials — mapped against your wedding countdown.",
    date: "2026-05-18",
    readTime: "8 min read",
    content: [
      "A wedding beauty timeline works backward from your first function, not just the main event. Here's how we plan it for Afeem Bridal clients.",
      "3 months out: Book your bridal consultation, lock your makeup artist and hair stylist, and start any hair treatments if you're growing out or restoring damage.",
      "6–8 weeks out: Begin skin prep sessions and any hair colour work — colour needs time to settle before a trial.",
      "3–4 weeks out: Makeup and hair trial. Bring your outfit or a photo of it, and your jewellery if possible.",
      "1 week out: Final touch-ups only — nails, brows, and a light facial. No new treatments.",
    ],
  },
  {
    slug: "how-to-choose-a-makeup-course",
    title: "How to Choose a Makeup Course",
    bucket: "Beauty Education",
    excerpt: "Duration, curriculum, live salon exposure — what actually matters when picking a makeup programme.",
    date: "2026-04-30",
    readTime: "5 min read",
    content: [
      "Not all makeup courses are built the same. Here's what to actually check before enrolling anywhere — including with us.",
      "Live client exposure: Practising on classmates only gets you so far. Ask whether the course includes real client or salon-floor time.",
      "Curriculum depth: A good course covers skin prep and colour theory, not just application techniques.",
      "Certification & career support: Ask what happens after graduation — does the school help place students, or connect them to freelance work?",
      "At Afeem Beauty School, every course builds toward supervised live salon exposure in its final weeks — see our Beauty School page for details.",
    ],
  },
  {
    slug: "hair-colour-aftercare-guide",
    title: "Hair Colour Aftercare: What to Do in the First 72 Hours",
    bucket: "Hair",
    excerpt: "Simple aftercare habits that make colour last significantly longer.",
    date: "2026-04-10",
    readTime: "4 min read",
    content: [
      "The first 72 hours after a colour service matter more than people realise — the cuticle is still settling.",
      "Avoid washing your hair for at least 48 hours after colour to let the colour fully set.",
      "Use lukewarm, not hot, water for the first few washes — heat opens the cuticle and speeds up fade.",
      "Switch to a sulphate-free, colour-safe shampoo — ask your stylist for a recommendation suited to your specific shade.",
    ],
  },
  {
    slug: "understanding-your-skin-type",
    title: "Understanding Your Skin Type (And Why It Changes)",
    bucket: "Skin",
    excerpt: "Skin type isn't fixed — here's how to read what your skin actually needs right now.",
    date: "2026-03-22",
    readTime: "5 min read",
    content: [
      "Your skin type can shift with season, stress, and hormones — which is why a one-time diagnosis rarely holds up for long.",
      "Jodhpur's dry heat for much of the year means many clients run drier than they expect, even with visible oiliness in the T-zone.",
      "A proper skin analysis at the start of any facial should always precede product recommendations — this is standard at every Afeem skin consultation.",
    ],
  },
];

export function getPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export const journalBuckets = ["All", "Hair", "Skin", "Bridal", "Beauty Education"] as const;
