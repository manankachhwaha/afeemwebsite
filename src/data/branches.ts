export type Branch = {
  slug: string;
  name: string;
  shortName: string;
  area: string;
  address: string;
  phone: string;
  phoneHref: string;
  /** Full digits incl. country code, no symbols — e.g. "916378986584". */
  whatsappNumber: string;
  email: string;
  hours: string;
  hoursIsPlaceholder: boolean;
  googleRating: number;
  googleReviewCount: number;
  googleMapsSearchUrl: string;
  mapEmbedQuery: string;
  instagram: string;
  services: string[];
  hasSchool: boolean;
};

export const branches: Branch[] = [
  {
    slug: "ratanada",
    name: "Afeem — Ratanada",
    shortName: "Ratanada",
    area: "Ratanada / Hanwant Nagar (Circuit House)",
    address: "Circuit House Rd, opposite LIC, near Petrol Pumps, Hanwant Nagar, Ratanada, Jodhpur, Rajasthan 342001",
    phone: "063789 86584",
    phoneHref: "tel:+916378986584",
    whatsappNumber: "916378986584",
    email: "afeem.jodhpur@gmail.com",
    hours: "10:30 AM – 9:00 PM, daily (no weekly off)",
    hoursIsPlaceholder: false,
    googleRating: 4.7,
    googleReviewCount: 1046,
    googleMapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Afeem Ratanada Jodhpur"),
    mapEmbedQuery: "Circuit House Rd, opposite LIC, Hanwant Nagar, Ratanada, Jodhpur",
    instagram: "https://www.instagram.com/afeemspaandsalon",
    services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal"],
    hasSchool: false,
  },
  {
    slug: "pal-road",
    name: "Afeem — Pal Road",
    shortName: "Pal Road",
    area: "Pal Road / N S Garden",
    address: "Opp Passport Office, Main Pal Rd, near N S Garden, Jodhpur, Rajasthan 342008",
    phone: "070146 32226",
    phoneHref: "tel:+917014632226",
    whatsappNumber: "917014632226",
    email: "afeemspaandsaloon@gmail.com",
    hours: "10:30 AM – 9:00 PM, daily (no weekly off)",
    hoursIsPlaceholder: false,
    googleRating: 4.7,
    googleReviewCount: 671,
    googleMapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Afeem Pal Road Jodhpur"),
    mapEmbedQuery: "Main Pal Rd, near N S Garden, Jodhpur",
    instagram: "https://www.instagram.com/afeemspaandsalon",
    services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal"],
    hasSchool: false,
  },
];

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}

export function branchWhatsappLink(branch: Branch, message: string) {
  return `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
