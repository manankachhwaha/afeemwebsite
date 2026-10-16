import { cmsOr } from "@/lib/cms";
import settingsJson from "@/content/cms/settings.json";

type Settings = {
  name?: string;
  tagline?: string;
  city?: string;
  description?: string;
  phone?: string;
  whatsappNumber?: string;
  email?: string;
  beautySchoolPhone?: string;
  beautySchoolWhatsapp?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  linkedin?: string;
  searchConsoleVerification?: string;
  ogImage?: string;
  announcement?: { enabled?: boolean; text?: string; linkText?: string; href?: string };
  analytics?: { ga4Id?: string; gtmId?: string; metaPixelId?: string; googleAdsId?: string };
};

// Edited in the CMS ("Contact, social & tracking"); the values below are the
// built-in defaults used until something is published.
const s = cmsOr<Settings>(settingsJson, {});
const pick = (v: string | undefined, d: string) => (v && v.trim() ? v.trim() : d);
const digits = (v: string) => v.replace(/\D/g, "");

const whatsappNumber = pick(s.whatsappNumber, "916378986584");
const schoolWhatsapp = pick(s.beautySchoolWhatsapp, "918107663836");

export const site = {
  name: pick(s.name, "Afeem"),
  legalName: "Afeem Spa & Salon and Afeem Beauty School",
  tagline: pick(s.tagline, "Beauty · Wellness · Education"),
  city: pick(s.city, "Jodhpur"),
  description: pick(
    s.description,
    "Afeem is a premium beauty, wellness and education destination in Jodhpur — home to Afeem Spa & Salon and Afeem Beauty School.",
  ),
  // Defaults to the Ratanada branch number until a shared front-desk line
  // exists — every per-service/course enquiry not yet wired to a specific
  // branch falls back to this so it's a real, working number.
  phone: pick(s.phone, "063789 86584"),
  phoneHref: `tel:+${digits(whatsappNumber)}`,
  whatsappNumber: digits(whatsappNumber),
  // Defaults to the Ratanada branch inbox until a shared front-desk address exists.
  email: pick(s.email, "afeem.jodhpur@gmail.com"),
  // Dedicated Afeem Beauty School enquiry line (separate from the two salon branches).
  beautySchoolWhatsapp: digits(schoolWhatsapp),
  beautySchoolPhone: pick(s.beautySchoolPhone, "081076 63836"),
  beautySchoolPhoneHref: `tel:+${digits(schoolWhatsapp)}`,
  instagram: pick(s.instagram, "https://www.instagram.com/afeemspaandsalon"),
  facebook: (s.facebook?.trim() || null) as string | null,
  // Not live yet — set the real URL in the CMS the moment the account exists and
  // the footer's social row picks it up automatically.
  linkedin: (s.linkedin?.trim() || null) as string | null,
  youtube: (s.youtube?.trim() || null) as string | null,
  url: "https://afeem-website.pages.dev",
  ogImage: s.ogImage?.trim() || null,
  searchConsoleVerification: s.searchConsoleVerification?.trim() || null,
  announcement: {
    enabled: s.announcement ? s.announcement.enabled !== false : true,
    text: s.announcement ? (s.announcement.text ?? "") : "Getting married?",
    linkText: s.announcement ? (s.announcement.linkText ?? "") : "See how Afeem brides look →",
    href: s.announcement?.href?.trim() || "/bridal",
  },
  analytics: {
    ga4Id: s.analytics?.ga4Id?.trim() || "",
    gtmId: s.analytics?.gtmId?.trim() || "",
    metaPixelId: s.analytics?.metaPixelId?.trim() || "",
    googleAdsId: s.analytics?.googleAdsId?.trim() || "",
  },
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function beautySchoolWhatsappLink(message: string) {
  return `https://wa.me/${site.beautySchoolWhatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hi Afeem, I'd like to know more.";
