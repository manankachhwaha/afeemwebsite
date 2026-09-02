function numberedImages(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/${folder}/${String(i + 1).padStart(2, "0")}.jpg`);
}

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
  appleMapsUrl: string;
  /** Exact pin coordinates for this branch's Google Business listing — used for the map embed so it points at the actual door, not just a geocoded address. */
  lat: number;
  lng: number;
  instagram: string;
  services: string[];
  hasSchool: boolean;
  heroImage?: string;
  galleryImages?: string[];
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
    googleMapsSearchUrl: "https://maps.app.goo.gl/rRCJgRYJrWeVkNzT7",
    appleMapsUrl: "https://maps.apple.com/?ll=26.2780457,73.0369323&q=" + encodeURIComponent("Afeem — Ratanada"),
    lat: 26.2780457,
    lng: 73.0369323,
    instagram: "https://www.instagram.com/afeemspaandsalon",
    services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal"],
    hasSchool: false,
    heroImage: "/images/ratanada/06.jpg",
    galleryImages: numberedImages("ratanada", 13),
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
    googleMapsSearchUrl: "https://maps.app.goo.gl/uc5fwFaio3HisdTP8",
    appleMapsUrl: "https://maps.apple.com/?ll=26.2608782,72.9880298&q=" + encodeURIComponent("Afeem — Pal Road"),
    lat: 26.2608782,
    lng: 72.9880298,
    instagram: "https://www.instagram.com/afeemspaandsalon",
    services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal"],
    hasSchool: false,
    heroImage: "/images/pal-road/01.jpg",
    galleryImages: numberedImages("pal-road", 12),
  },
];

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}

export function branchWhatsappLink(branch: Branch, message: string) {
  return `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
