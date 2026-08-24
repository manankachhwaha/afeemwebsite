export const site = {
  name: "Afeem",
  legalName: "Afeem Spa & Salon and Afeem Beauty School",
  tagline: "Beauty · Wellness · Education",
  city: "Jodhpur",
  description:
    "Afeem is a premium beauty, wellness and education destination in Jodhpur — home to Afeem Spa & Salon and Afeem Beauty School.",
  // Defaults to the Ratanada branch number until a shared front-desk line
  // exists — every per-service/course enquiry not yet wired to a specific
  // branch falls back to this so it's a real, working number.
  phone: "063789 86584",
  phoneHref: "tel:+916378986584",
  whatsappNumber: "916378986584",
  // Defaults to the Ratanada branch inbox until a shared front-desk address exists.
  email: "afeem.jodhpur@gmail.com",
  // Dedicated Afeem Beauty School enquiry line (separate from the two salon branches).
  beautySchoolWhatsapp: "918107663836",
  beautySchoolPhone: "081076 63836",
  beautySchoolPhoneHref: "tel:+918107663836",
  instagram: "https://www.instagram.com/afeemspaandsalon",
  // Not live yet — set the real URL here the moment the account exists and
  // the footer's social row picks it up automatically, no other changes needed.
  linkedin: null as string | null,
  youtube: null as string | null,
  url: "https://afeem-website.pages.dev",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function beautySchoolWhatsappLink(message: string) {
  return `https://wa.me/${site.beautySchoolWhatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hi Afeem, I'd like to know more.";
