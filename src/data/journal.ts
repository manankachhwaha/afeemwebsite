export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type JournalPost = {
  slug: string;
  title: string;
  bucket: "Hair" | "Skin" | "Spa" | "Bridal" | "Beauty Education";
  excerpt: string;
  content: ContentBlock[];
  date: string;
  readTime: string;
};

export const journalPosts: JournalPost[] = [
  {
    slug: "best-spa-in-jodhpur-guide",
    title: "Best Spa in Jodhpur: A Complete Guide to Relaxation, Beauty and Self-Care",
    bucket: "Spa",
    excerpt: "What actually makes a spa and salon experience good in Jodhpur — plus a full guide to Afeem's spa, hair, beauty and nail-care services.",
    date: "2026-08-26",
    readTime: "6 min read",
    content: [
      { type: "p", text: "In today's busy lifestyle, finding time for yourself can sometimes feel difficult. Work, family responsibilities, travelling and everyday stress can leave you feeling tired both physically and mentally." },
      { type: "p", text: "Sometimes, a relaxing massage, a refreshing hair treatment, a manicure, or simply an hour away from your busy routine can make a noticeable difference. This is where a good spa and salon can become more than just a place for beauty treatments. It can be a comfortable space where you can slow down, relax, and take care of yourself." },
      { type: "p", text: "Everyone deserves a little time to relax and take care of themselves. At Afeem Spa & Salon, you can enjoy a range of spa services in Jodhpur, including spa and massage treatments, hair care, beauty services, manicures, and pedicures, all in one place. Whether you are planning a relaxing day or simply want to refresh your look, Afeem Spa & Salon can be a convenient option when looking for the best spa in Jodhpur." },
      { type: "h2", text: "Physical Benefits of Regular Spa Treatments" },
      { type: "p", text: "Professional spa treatments are designed to address muscle tension, skin health, and circulation." },
      { type: "list", items: [
        "Take a break from your busy schedule",
        "Reduce muscle tightness",
        "Improve skin hydration",
        "Enhance sleep quality",
        "Enjoy some quiet personal time",
        "Improve blood circulation",
      ] },
      { type: "h2", text: "Why Is a Spa Visit Important in a Busy Lifestyle?" },
      { type: "p", text: "For many people, visiting a spa is not simply about luxury. It is about taking a little time for yourself." },
      { type: "p", text: "After spending long hours at work, travelling or managing daily responsibilities, your body and mind can feel tired. A relaxing treatment gives you an opportunity to slow down and step away from the usual routine for a while." },
      { type: "h2", text: "What Can You Expect at Afeem Spa & Salon?" },
      { type: "p", text: "A spa visit is not limited to massage. Today, people often look for a place where they can take care of several personal-care needs at the same time." },
      { type: "p", text: "Afeem Spa & Salon combines spa and salon services, making it convenient for customers who want relaxation." },
      { type: "h2", text: "Spa and Massage Services" },
      { type: "p", text: "Customers can explore different spa and massage options depending on their individual requirements. Those comparing massage services in Jodhpur may consider factors such as the treatment options, environment, cleanliness, and professional approach." },
      { type: "h2", text: "Hair Care Services" },
      { type: "p", text: "Haircuts, hair wash, styling, and hair spa treatments can be useful for people looking to maintain their regular grooming routine." },
      { type: "h2", text: "Facial and Beauty Services" },
      { type: "p", text: "Facials and other beauty treatments can be included as part of a personal-care routine, especially when you want to refresh and take some time for yourself." },
      { type: "h2", text: "Manicure and Pedicure" },
      { type: "p", text: "Manicure, pedicure, and nail-care services provide additional grooming options and can easily be combined with other salon treatments." },
      { type: "h2", text: "What Makes a Good Spa and Salon Experience?" },
      { type: "list", items: [
        "Clean and hygienic environment",
        "Professional staff",
        "Good communication",
        "Comfortable atmosphere",
        "Variety of services",
      ] },
      { type: "h2", text: "When Should You Book a Spa or Salon Appointment?" },
      { type: "p", text: "You do not need to wait until you are completely exhausted to take some time for yourself." },
      { type: "p", text: "A spa or salon appointment can fit into your routine whenever you feel that you need a little personal care." },
      { type: "h2", text: "Conclusion" },
      { type: "p", text: "The best spa in Jodhpur is not just about choosing a place with many services. It is about finding a spa and salon where you feel comfortable and well looked after. Look for things that genuinely matter — cleanliness, professional staff, comfortable surroundings, quality services and clear communication. With its combination of spa, massage, hair, beauty and nail-care services, Afeem Spa & Salon can be considered by people in Jodhpur who want relaxation." },
      { type: "h2", text: "Frequently Asked Questions" },
      { type: "faq", items: [
        { q: "What services can I get at Afeem Spa & Salon?", a: "The salon is associated with spa, massage, hair, beauty and nail-care services. The available services may change, so it is recommended to check the current service menu before booking." },
        { q: "Is Afeem Spa & Salon suitable for men and women?", a: "It is presented as a unisex spa and salon offering personal-care and grooming services for men and women." },
        { q: "How do I choose the right spa treatment?", a: "Think about what you want from the visit — relaxation, massage, hair care, nail grooming or beauty care. If you are unsure, discuss your requirements with the professional before selecting a service." },
      ] },
    ],
  },
  {
    slug: "prepare-skin-before-wedding",
    title: "How to Prepare Your Skin Before Your Wedding",
    bucket: "Bridal",
    excerpt: "A realistic, month-by-month skin prep timeline so your skin peaks on the day — not just the trial.",
    date: "2026-06-02",
    readTime: "6 min read",
    content: [
      { type: "p", text: "Most brides start skin prep far too close to the wedding date. The best results come from starting at least 8–10 weeks out, giving your skin time to respond to treatment without the risk of a reaction close to the big day." },
      { type: "p", text: "Weeks 8–6: Focus on hydration and gentle exfoliation. This is also the window to address any pigmentation or acne concerns with a facial series." },
      { type: "p", text: "Weeks 6–3: Brightening facials and targeted treatments. Avoid trying new products in this window — stick to what your skin already tolerates well." },
      { type: "p", text: "Final 2 weeks: Simplify. Gentle facials only, no new actives, no extractions within 5 days of the event. Sleep and hydration matter more than any treatment at this stage." },
      { type: "p", text: "Book a Skin Prep consultation with our team to build a timeline around your actual wedding date." },
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
      { type: "p", text: "A wedding beauty timeline works backward from your first function, not just the main event. Here's how we plan it for Afeem Bridal clients." },
      { type: "p", text: "3 months out: Book your bridal consultation, lock your makeup artist and hair stylist, and start any hair treatments if you're growing out or restoring damage." },
      { type: "p", text: "6–8 weeks out: Begin skin prep sessions and any hair colour work — colour needs time to settle before a trial." },
      { type: "p", text: "3–4 weeks out: Makeup and hair trial. Bring your outfit or a photo of it, and your jewellery if possible." },
      { type: "p", text: "1 week out: Final touch-ups only — nails, brows, and a light facial. No new treatments." },
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
      { type: "p", text: "Not all makeup courses are built the same. Here's what to actually check before enrolling anywhere — including with us." },
      { type: "p", text: "Live client exposure: Practising on classmates only gets you so far. Ask whether the course includes real client or salon-floor time." },
      { type: "p", text: "Curriculum depth: A good course covers skin prep and colour theory, not just application techniques." },
      { type: "p", text: "Certification & career support: Ask what happens after graduation — does the school help place students, or connect them to freelance work?" },
      { type: "p", text: "At Afeem Beauty School, every course builds toward supervised live salon exposure in its final weeks — see our Beauty School page for details." },
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
      { type: "p", text: "The first 72 hours after a colour service matter more than people realise — the cuticle is still settling." },
      { type: "p", text: "Avoid washing your hair for at least 48 hours after colour to let the colour fully set." },
      { type: "p", text: "Use lukewarm, not hot, water for the first few washes — heat opens the cuticle and speeds up fade." },
      { type: "p", text: "Switch to a sulphate-free, colour-safe shampoo — ask your stylist for a recommendation suited to your specific shade." },
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
      { type: "p", text: "Your skin type can shift with season, stress, and hormones — which is why a one-time diagnosis rarely holds up for long." },
      { type: "p", text: "Jodhpur's dry heat for much of the year means many clients run drier than they expect, even with visible oiliness in the T-zone." },
      { type: "p", text: "A proper skin analysis at the start of any facial should always precede product recommendations — this is standard at every Afeem skin consultation." },
    ],
  },
];

export function getPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export const journalBuckets = ["All", "Hair", "Skin", "Spa", "Bridal", "Beauty Education"] as const;
