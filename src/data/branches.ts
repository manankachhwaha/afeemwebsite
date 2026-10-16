import { cmsOr } from "@/lib/cms";
import branchesJson from "@/content/cms/branches.json";

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

const defaultBranches: Branch[] = [
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
    galleryImages: numberedImages("ratanada", 25),
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
    galleryImages: numberedImages("pal-road", 22),
  },
];

/** CMS stores the editable fields only; link/derived fields are rebuilt here so they can never drift out of sync. */
type CmsBranch = Partial<Branch> & { slug: string; name: string };
function fromCms(c: CmsBranch): Branch {
  const wa = String(c.whatsappNumber ?? "").replace(/D/g, "");
  const shortName = c.shortName || c.name;
  return {
    slug: c.slug,
    name: c.name,
    shortName,
    area: c.area ?? "",
    address: c.address ?? "",
    phone: c.phone ?? "",
    phoneHref: `tel:+${wa}`,
    whatsappNumber: wa,
    email: c.email ?? "",
    hours: c.hours ?? "",
    hoursIsPlaceholder: false,
    googleRating: Number(c.googleRating) || 4.7,
    googleReviewCount: Number(c.googleReviewCount) || 0,
    googleMapsSearchUrl: c.googleMapsSearchUrl ?? "",
    appleMapsUrl: `https://maps.apple.com/?ll=${c.lat},${c.lng}&q=` + encodeURIComponent(c.name),
    lat: Number(c.lat) || 0,
    lng: Number(c.lng) || 0,
    instagram: c.instagram ?? "",
    services: c.services ?? [],
    hasSchool: !!c.hasSchool,
    heroImage: c.heroImage || undefined,
    galleryImages: c.galleryImages ?? [],
  };
}

const cmsBranches = cmsOr<CmsBranch[] | null>(branchesJson, null);
export const branches: Branch[] = cmsBranches && cmsBranches.length ? cmsBranches.map(fromCms) : defaultBranches;

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}

export function branchWhatsappLink(branch: Branch, message: string) {
  return `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
