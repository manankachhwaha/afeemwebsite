export type Course = {
  slug: string;
  name: string;
  category: string;
  duration: string;
  eligibility: string;
  summary: string;
  curriculum: string[];
  practicalFocus: string;
  certification: string;
  fees: string;
  nextBatch: string;
  careerOutcomes: string[];
  faqs: { q: string; a: string }[];
};

export const courses: Course[] = [
  {
    slug: "professional-makeup-artistry",
    name: "Professional Makeup Artistry",
    category: "Makeup",
    duration: "3 months",
    eligibility: "Open to beginners — no prior experience required.",
    summary:
      "A complete grounding in makeup artistry — from skin prep and colour theory to bridal glam and editorial looks — taught by working Afeem artists.",
    curriculum: [
      "Skin prep & colour theory",
      "Day, party & HD makeup",
      "Bridal & airbrush makeup",
      "Editorial & photoshoot looks",
      "Client handling & kit building",
    ],
    practicalFocus: "Hands-on practice on live models every week, plus supervised salon floor exposure in the final month.",
    certification: "Afeem Certified Makeup Artist",
    fees: "Enquire for fees",
    nextBatch: "Batches start every month — enquire for the next start date.",
    careerOutcomes: ["Freelance makeup artist", "Salon makeup artist", "Bridal makeup specialist", "Assistant to senior artists"],
    faqs: [
      { q: "Do I need my own kit?", a: "A starter kit list is shared before batch start; premium brand kits are available at partner pricing." },
      { q: "Will I get real client experience?", a: "Yes — in the final month, students assist on real Afeem Salon bookings under supervision." },
    ],
  },
  {
    slug: "hair-styling-diploma",
    name: "Hair Styling & Cutting Diploma",
    category: "Hair",
    duration: "4 months",
    eligibility: "Open to beginners and working stylists looking to upskill.",
    summary:
      "Master precision cutting, colour application and styling techniques used daily in a working salon.",
    curriculum: [
      "Cutting fundamentals & face-shape analysis",
      "Blow-dry & styling techniques",
      "Global colour, balayage & highlights",
      "Hair treatments & scalp care",
      "Salon operations & client consultation",
    ],
    practicalFocus: "Practice on training mannequins first, then live models, with live salon floor shadowing in later weeks.",
    certification: "Afeem Certified Hair Stylist",
    fees: "Enquire for fees",
    nextBatch: "Batches start every month — enquire for the next start date.",
    careerOutcomes: ["Salon hair stylist", "Colour specialist", "Freelance stylist", "Salon floor supervisor track"],
    faqs: [{ q: "Is this suitable for complete beginners?", a: "Yes, the course starts from fundamentals before progressing to advanced technique." }],
  },
  {
    slug: "skin-care-facial-specialist",
    name: "Skin Care & Facial Specialist Course",
    category: "Skin",
    duration: "2.5 months",
    eligibility: "Open to beginners — no prior experience required.",
    summary:
      "Learn skin analysis, facial protocols and treatment planning for every skin type, grounded in real client practice.",
    curriculum: [
      "Skin anatomy & analysis",
      "Facial protocols by skin type",
      "Clean-ups, peels & brightening treatments",
      "Hygiene & sanitation standards",
      "Client consultation & retailing",
    ],
    practicalFocus: "Weekly hands-on facials on live models, plus supervised sessions on salon clients in the final weeks.",
    certification: "Afeem Certified Skin & Facial Specialist",
    fees: "Enquire for fees",
    nextBatch: "Batches start every month — enquire for the next start date.",
    careerOutcomes: ["Salon facial specialist", "Skin care consultant", "Spa therapist track", "Freelance skin specialist"],
    faqs: [],
  },
  {
    slug: "nail-art-technician",
    name: "Nail Art & Technician Course",
    category: "Nails",
    duration: "6 weeks",
    eligibility: "Open to beginners — no prior experience required.",
    summary: "From manicure and pedicure fundamentals to advanced nail art and extensions.",
    curriculum: [
      "Manicure & pedicure technique",
      "Gel polish application",
      "Nail art & hand-painted design",
      "Extensions & 3D embellishment",
      "Hygiene & tool care",
    ],
    practicalFocus: "Daily hands-on practice, building toward live client sessions in the salon.",
    certification: "Afeem Certified Nail Technician",
    fees: "Enquire for fees",
    nextBatch: "Batches start every month — enquire for the next start date.",
    careerOutcomes: ["Salon nail technician", "Freelance nail artist", "Nail studio owner track"],
    faqs: [],
  },
  {
    slug: "bridal-makeup-masterclass",
    name: "Bridal Makeup Masterclass",
    category: "Makeup",
    duration: "3 weeks",
    eligibility: "For students or professionals with basic makeup experience.",
    summary:
      "An advanced, focused programme on bridal makeup — HD, airbrush, draping and the full wedding-day workflow.",
    curriculum: [
      "Bridal skin prep & longevity techniques",
      "HD & airbrush bridal makeup",
      "Regional bridal looks & draping",
      "Wedding-day workflow & client management",
    ],
    practicalFocus: "Live bridal model practice each week, plus observation of real Afeem bridal bookings.",
    certification: "Afeem Certified Bridal Makeup Specialist",
    fees: "Enquire for fees",
    nextBatch: "Batches start every month — enquire for the next start date.",
    careerOutcomes: ["Independent bridal makeup artist", "Senior salon bridal artist", "Bridal team lead"],
    faqs: [],
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
