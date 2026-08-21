export type Expert = {
  slug: string;
  name: string;
  designation: string;
  specialisation: string[];
  experience: string;
  bio: string;
  branch: string;
};

export const experts: Expert[] = [
  {
    slug: "riya-mehta",
    name: "Riya Mehta",
    designation: "Senior Hair Stylist & Colour Specialist",
    specialisation: ["Balayage", "Global Colour", "Precision Cutting"],
    experience: "9 years",
    bio: "Riya trained in Mumbai before joining Afeem, and leads our colour bar with a soft, wearable approach to balayage.",
    branch: "Afeem — Ratanada",
  },
  {
    slug: "aarav-singh",
    name: "Aarav Singh",
    designation: "Lead Makeup Artist",
    specialisation: ["Bridal Makeup", "HD & Airbrush", "Editorial"],
    experience: "11 years",
    bio: "Aarav has worked on over 500 bridal looks across Rajasthan and heads the Afeem Bridal makeup team.",
    branch: "Afeem — Ratanada",
  },
  {
    slug: "sneha-rathore",
    name: "Sneha Rathore",
    designation: "Skin & Facial Specialist",
    specialisation: ["Skin Prep", "Brightening Facials", "Acne Care"],
    experience: "7 years",
    bio: "Sneha designs Afeem's pre-bridal skin prep timelines and leads our clinical-grade facial protocols.",
    branch: "Afeem — Pal Road",
  },
  {
    slug: "kabir-oswal",
    name: "Kabir Oswal",
    designation: "Spa & Wellness Therapist",
    specialisation: ["Deep Tissue Massage", "Body Spa", "Aromatherapy"],
    experience: "8 years",
    bio: "Kabir trained in therapeutic massage and leads the Afeem Relaxation Experience programme.",
    branch: "Afeem — Ratanada",
  },
  {
    slug: "priya-choudhary",
    name: "Priya Choudhary",
    designation: "Nail Artist",
    specialisation: ["Nail Art", "Gel Extensions", "Bridal Nails"],
    experience: "5 years",
    bio: "Priya is known for her detailed hand-painted nail art and is a lead trainer at Afeem Beauty School.",
    branch: "Afeem — Pal Road",
  },
  {
    slug: "meher-vyas",
    name: "Meher Vyas",
    designation: "Head Trainer, Afeem Beauty School",
    specialisation: ["Makeup Artistry", "Curriculum Design", "Student Mentorship"],
    experience: "12 years",
    bio: "Meher built the Afeem Beauty School curriculum, blending working-salon technique with structured, exam-ready training.",
    branch: "Afeem Beauty School — Ratanada",
  },
];

export function getExpert(slug: string) {
  return experts.find((e) => e.slug === slug);
}
