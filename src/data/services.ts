export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  startingPrice: string;
  includes: string[];
  whoFor: string;
  addOns: string[];
  faqs: Faq[];
  image?: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  services: Service[];
  image?: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "hair",
    name: "Hair",
    shortName: "Hair",
    tagline: "Cut, colour and care — crafted for you.",
    intro:
      "From precision cuts to considered colour, the Afeem hair studio blends technical skill with an editorial eye, so every result feels like you, only more so.",
    seoTitle: "Hair Salon in Jodhpur | Haircut, Colour & Styling — Afeem",
    seoDescription:
      "Premium hair salon in Jodhpur. Haircuts, styling, colour, treatments and hair spa at Afeem — book your appointment today.",
    image: "/images/hair-cut/11.jpg",
    services: [
      {
        slug: "haircut-styling",
        name: "Haircut & Styling",
        description:
          "A considered cut, shaped to your face and the way you actually wear your hair — finished with a blow-dry styled for the day ahead.",
        benefits: ["Face-framing precision cut", "Consultation before every cut", "Styled finish included"],
        startingPrice: "Enquire for pricing",
        includes: ["Consultation", "Wash", "Cut", "Blow-dry styling"],
        whoFor: "Anyone due for a fresh shape, a trim, or a full change of style.",
        addOns: ["Deep conditioning", "Scalp massage", "Keratin finish"],
        faqs: [
          { q: "How often should I get a haircut?", a: "Every 6–8 weeks keeps the shape sharp; longer styles can stretch to 10–12 weeks." },
          { q: "Can I bring reference photos?", a: "Yes — reference images help our stylists understand exactly what you're picturing." },
        ],
        image: "/images/hair-cut/11.jpg",
      },
      {
        slug: "hair-colour",
        name: "Hair Colour",
        description:
          "Global colour, balayage, highlights or a full transformation — formulated in-studio to suit your skin tone and hair health.",
        benefits: ["Custom colour formulation", "Ammonia-light options available", "Includes post-colour care"],
        startingPrice: "Enquire for pricing",
        includes: ["Consultation & strand test", "Colour application", "Toning", "Wash & blow-dry"],
        whoFor: "First-time colour clients to seasoned balayage regulars.",
        addOns: ["Gloss treatment", "Olaplex bond builder", "Root touch-up"],
        faqs: [
          { q: "Is a patch test required?", a: "Yes, for first-time colour clients we recommend a patch test 48 hours prior." },
          { q: "How long does colour last?", a: "4–8 weeks depending on technique, with balayage lasting longer than global colour." },
        ],
        image: "/images/hair-color/05.jpg",
      },
      {
        slug: "hair-treatments",
        name: "Hair Treatments",
        description:
          "Keratin smoothening, Olaplex repair and deep-conditioning rituals that restore strength, shine and softness.",
        benefits: ["Repairs heat & chemical damage", "Visible shine from the first session", "Tailored to your hair type"],
        startingPrice: "Enquire for pricing",
        includes: ["Hair & scalp analysis", "Treatment application", "Steam therapy", "Finishing style"],
        whoFor: "Damaged, frizzy or chemically treated hair in need of recovery.",
        addOns: ["Scalp detox", "Hair spa combo"],
        faqs: [
          { q: "How many sessions will I need?", a: "Most concerns show visible improvement in 1–3 sessions depending on damage level." },
        ],
        image: "/images/hair-spa/03.jpg",
      },
      {
        slug: "hair-spa",
        name: "Hair Spa",
        description:
          "A nourishing ritual of massage, masque and steam that leaves hair soft, calm and genuinely relaxed.",
        benefits: ["Deep hydration", "Stress-relieving scalp massage", "Improves scalp health"],
        startingPrice: "Enquire for pricing",
        includes: ["Scalp massage", "Nourishing masque", "Steam", "Rinse & style"],
        whoFor: "Dry, dull or stressed hair — and anyone who wants an hour to unwind.",
        addOns: ["Hair fall control add-on", "Aroma oil upgrade"],
        faqs: [],
        image: "/images/hair-spa/01.jpg",
      },
      {
        slug: "hair-consultation",
        name: "Hair Consultation",
        description:
          "A one-on-one sit-down with an Afeem stylist to map out the right cut, colour or treatment path for your hair goals.",
        benefits: ["Personalised hair plan", "No-obligation advice", "Product recommendations"],
        startingPrice: "Complimentary",
        includes: ["Hair & scalp assessment", "Style & colour guidance", "Care plan"],
        whoFor: "Anyone unsure where to start, or planning a bigger change.",
        addOns: [],
        faqs: [],
        image: "/images/hair-cut/01.jpg",
      },
    ],
  },
  {
    slug: "skin",
    name: "Skin",
    shortName: "Skin",
    tagline: "Facials and skin therapy that earn their glow.",
    intro:
      "Clinical-grade facials and gentle skin prep rituals, chosen for your skin type — not a one-size-fits-all menu.",
    seoTitle: "Best Facial & Skin Treatments in Jodhpur — Afeem",
    seoDescription:
      "Facials, skin treatments and clean-ups in Jodhpur. Skin-type-specific care at Afeem Spa & Salon — book your consultation.",
    services: [
      {
        slug: "signature-facial",
        name: "Signature Facial",
        description:
          "A multi-step facial with cleansing, exfoliation, extraction and mask — customised to your skin's exact needs that day.",
        benefits: ["Deep cleanse & hydration", "Improves texture & tone", "Relaxing face & shoulder massage"],
        startingPrice: "Enquire for pricing",
        includes: ["Skin analysis", "Cleanse & exfoliate", "Extraction (if needed)", "Mask & massage"],
        whoFor: "All skin types looking for a reliable, glow-giving facial.",
        addOns: ["LED therapy", "Under-eye treatment"],
        faqs: [{ q: "How often should I get a facial?", a: "Every 3–4 weeks aligns with your skin's natural renewal cycle." }],
      },
      {
        slug: "brightening-facial",
        name: "Brightening & Glow Facial",
        description: "Vitamin C and brightening actives to even out tone and lift dullness ahead of an event.",
        benefits: ["Visible radiance", "Evens skin tone", "Great pre-event treatment"],
        startingPrice: "Enquire for pricing",
        includes: ["Skin analysis", "Brightening peel", "Mask", "SPF finish"],
        whoFor: "Dull, tired or uneven-toned skin — especially before a big day.",
        addOns: ["Under-eye brightening"],
        faqs: [],
      },
      {
        slug: "clean-up",
        name: "Clean-Up",
        description: "A quick, effective refresh — deep cleanse and extraction without the full facial ritual.",
        benefits: ["Fast turnaround", "Removes impurities", "Instant fresh look"],
        startingPrice: "Enquire for pricing",
        includes: ["Cleanse", "Scrub", "Extraction", "Mask"],
        whoFor: "Regular upkeep between facials, or a same-day refresh.",
        addOns: [],
        faqs: [],
      },
      {
        slug: "skin-prep",
        name: "Skin Prep Ritual",
        description: "A short course of sessions building toward an event — designed to peak your skin on the day.",
        benefits: ["Progressive visible results", "Event-timed plan", "Personal skin coach"],
        startingPrice: "Enquire for pricing",
        includes: ["Consultation", "Session plan", "Home-care guidance"],
        whoFor: "Brides, grooms and anyone prepping for a milestone event.",
        addOns: ["Combine with Bridal Journey"],
        faqs: [],
      },
    ],
  },
  {
    slug: "spa-wellness",
    name: "Spa & Wellness",
    shortName: "Spa",
    tagline: "Slow down. Let the day go.",
    intro:
      "Body therapies and massage rituals designed for genuine rest — quiet rooms, warm oils, unhurried hands.",
    seoTitle: "Best Spa in Jodhpur | Massage & Body Spa — Afeem",
    seoDescription:
      "Luxury spa in Jodhpur. Body spa, massage, head massage and relaxation therapies at Afeem — book your escape.",
    image: "/images/pal-road/01.jpg",
    services: [
      {
        slug: "full-body-spa",
        name: "Full Body Spa",
        description: "A complete body ritual — scrub, wrap and massage — to soften skin and ease tension head to toe.",
        benefits: ["Full-body relaxation", "Softer, smoother skin", "Improves circulation"],
        startingPrice: "Enquire for pricing",
        includes: ["Body scrub", "Wrap", "Full body massage", "Shower facility"],
        whoFor: "Anyone craving a complete reset.",
        addOns: ["Aromatherapy oils", "Extended massage time"],
        faqs: [],
        image: "/images/pal-road/01.jpg",
      },
      {
        slug: "therapeutic-massage",
        name: "Therapeutic Massage",
        description: "Deep-tissue and Swedish techniques to release tightness from long days and longer weeks.",
        benefits: ["Relieves muscle tension", "Reduces stress", "Improves sleep quality"],
        startingPrice: "Enquire for pricing",
        includes: ["Consultation", "Full body massage", "Warm towel finish"],
        whoFor: "Tension, stiffness, or simply needing to switch off.",
        addOns: ["Hot stone upgrade"],
        faqs: [],
        image: "/images/pal-road/08.jpg",
      },
      {
        slug: "head-massage",
        name: "Head & Shoulder Massage",
        description: "A focused ritual for the head, neck and shoulders — where most of us hold our stress.",
        benefits: ["Eases tension headaches", "Improves scalp circulation", "Deeply calming"],
        startingPrice: "Enquire for pricing",
        includes: ["Warm oil massage", "Neck & shoulder release"],
        whoFor: "Quick stress relief between errands or after work.",
        addOns: [],
        faqs: [],
      },
      {
        slug: "relaxation-experience",
        name: "Afeem Relaxation Experience",
        description: "Our signature multi-therapy escape — massage, foot ritual and quiet time, paced over a full afternoon.",
        benefits: ["Signature multi-step ritual", "Best for special occasions", "Fully guided by our therapist"],
        startingPrice: "Enquire for pricing",
        includes: ["Welcome ritual", "Body massage", "Foot therapy", "Herbal tea"],
        whoFor: "Birthdays, anniversaries, or a proper treat-yourself day.",
        addOns: ["Add a facial", "Add hair spa"],
        faqs: [],
      },
    ],
  },
  {
    slug: "makeup",
    name: "Makeup",
    shortName: "Makeup",
    tagline: "Makeup that photographs as beautifully as it feels.",
    intro:
      "From everyday polish to full bridal glam, Afeem makeup artists work with your features — not against them.",
    seoTitle: "Makeup Artist in Jodhpur | Party & Bridal Makeup — Afeem",
    seoDescription:
      "Professional makeup in Jodhpur — party, occasion and bridal makeup with hair styling at Afeem. Book your artist today.",
    services: [
      {
        slug: "party-makeup",
        name: "Party & Occasion Makeup",
        description: "Long-wear, photo-ready makeup for parties, functions and celebrations.",
        benefits: ["12+ hour wear", "HD & camera-ready finish", "Customised to your outfit"],
        startingPrice: "Enquire for pricing",
        includes: ["Skin prep", "Full face makeup", "False lashes", "Setting spray"],
        whoFor: "Parties, sangeet, festive occasions, shoots.",
        addOns: ["Hair styling combo", "Draping assistance"],
        faqs: [],
      },
      {
        slug: "bridal-makeup",
        name: "Bridal Makeup",
        description: "See our dedicated Bridal journey for the full pre-bridal-to-wedding-day makeup experience.",
        benefits: ["Trial session included", "Airbrush & HDMU options", "Touch-up kit on the day"],
        startingPrice: "Enquire for pricing",
        includes: ["Trial", "Wedding-day makeup", "Hair styling", "Touch-up kit"],
        whoFor: "Brides — see the Afeem Bridal page for the complete journey.",
        addOns: ["Family & guest makeup", "Additional function looks"],
        faqs: [],
      },
      {
        slug: "hair-styling-for-makeup",
        name: "Hair Styling",
        description: "Updos, curls, braids and blow-outs styled to complement your makeup look.",
        benefits: ["Event-ready hold", "Complements your outfit & makeup", "Add-on or standalone"],
        startingPrice: "Enquire for pricing",
        includes: ["Consultation", "Styling", "Finishing spray"],
        whoFor: "Anyone booking makeup, or styling alone for an event.",
        addOns: ["Hair accessories"],
        faqs: [],
      },
    ],
  },
  {
    slug: "nails",
    name: "Nails",
    shortName: "Nails",
    tagline: "Considered nails, from clean to statement.",
    intro: "Manicures, pedicures and nail art — precise, hygienic and finished exactly how you like it.",
    seoTitle: "Manicure & Pedicure in Jodhpur | Nail Art — Afeem",
    seoDescription:
      "Manicure, pedicure and nail art in Jodhpur. Book a nail appointment at Afeem Spa & Salon.",
    image: "/images/nail-art/01.jpg",
    services: [
      {
        slug: "manicure",
        name: "Manicure",
        description: "Shape, cuticle care, massage and polish — a clean, well-kept finish for your hands.",
        benefits: ["Neat, long-lasting shape", "Hand massage included", "Gel or regular polish"],
        startingPrice: "Enquire for pricing",
        includes: ["Soak", "Shape & cuticle care", "Massage", "Polish"],
        whoFor: "Regular hand care and upkeep.",
        addOns: ["Gel polish upgrade", "Paraffin wax"],
        faqs: [],
      },
      {
        slug: "pedicure",
        name: "Pedicure",
        description: "A thorough foot ritual — scrub, callus care, massage and polish.",
        benefits: ["Softer, smoother feet", "Relieves foot fatigue", "Long-lasting finish"],
        startingPrice: "Enquire for pricing",
        includes: ["Soak", "Callus treatment", "Massage", "Polish"],
        whoFor: "Foot care and a genuine moment of relaxation.",
        addOns: ["Gel polish upgrade", "Extended massage"],
        faqs: [],
        image: "/images/pedicure/01.jpg",
      },
      {
        slug: "nail-art",
        name: "Nail Art",
        description: "From minimal line-work to statement design — nail art tailored to your style and occasion.",
        benefits: ["Fully customisable designs", "Long-wear gel finish", "Great for events"],
        startingPrice: "Enquire for pricing",
        includes: ["Design consultation", "Application", "Top coat seal"],
        whoFor: "Anyone wanting a personal, detailed finish.",
        addOns: ["Extensions", "3D embellishments"],
        faqs: [],
        image: "/images/nail-art/06.jpg",
      },
    ],
  },
];

export function getCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getService(categorySlug: string, serviceSlug: string) {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return category && service ? { category, service } : undefined;
}

export const packages = [
  {
    slug: "signature-glow",
    name: "Signature Glow Package",
    description: "Facial + hair spa + manicure — a complete refresh in one visit.",
    price: "Enquire for pricing",
    includes: ["Signature Facial", "Hair Spa", "Manicure"],
  },
  {
    slug: "unwind",
    name: "Afeem Unwind Package",
    description: "Full body spa + head massage + relaxation ritual.",
    price: "Enquire for pricing",
    includes: ["Full Body Spa", "Head & Shoulder Massage", "Herbal Tea Ritual"],
  },
  {
    slug: "event-ready",
    name: "Event-Ready Package",
    description: "Party makeup + hair styling + manicure for your next celebration.",
    price: "Enquire for pricing",
    includes: ["Party Makeup", "Hair Styling", "Manicure"],
  },
];
