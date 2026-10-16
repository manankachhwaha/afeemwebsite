import { cmsOr } from "@/lib/cms";
import offersJson from "@/content/cms/offers.json";
import eventsJson from "@/content/cms/events.json";
import teamJson from "@/content/cms/team.json";
import studentWorkJson from "@/content/cms/studentWork.json";
import galleriesJson from "@/content/cms/galleries.json";
import homeJson from "@/content/cms/home.json";
import listsJson from "@/content/cms/lists.json";
import seoJson from "@/content/cms/seo.json";

// Everything here is edited in the CMS. The `default…` values reproduce the
// site exactly as it looked before the CMS existed.

/** Today as YYYY-MM-DD (build time — the site rebuilds on every publish). */
const today = () => new Date().toISOString().slice(0, 10);

// ---------- offers ----------
export type Offer = {
  id: string;
  title: string;
  badge?: string;
  description?: string;
  validTill?: string;
  ctaLabel?: string;
  ctaLink?: string;
  image?: string;
  active?: boolean;
};
/** Active offers that haven't expired. */
export const offers: Offer[] = cmsOr<Offer[]>(offersJson, []).filter((o) => o.active !== false && (!o.validTill || o.validTill >= today()));

// ---------- events ----------
export type SiteEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  image?: string;
  ctaLabel?: string;
  ctaLink?: string;
  active?: boolean;
};
/** Upcoming events, soonest first. */
export const events: SiteEvent[] = cmsOr<SiteEvent[]>(eventsJson, [])
  .filter((e) => e.active !== false && (!e.date || e.date >= today()))
  .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

// ---------- team ----------
export type TeamMember = {
  id: string;
  name: string;
  role?: string;
  group?: "Expert" | "Trainer";
  specialisation?: string;
  experience?: string;
  bio?: string;
  photo?: string;
  instagram?: string;
  active?: boolean;
};
const allTeam = cmsOr<TeamMember[]>(teamJson, []).filter((m) => m.active !== false);
export const experts = allTeam.filter((m) => m.group !== "Trainer");
export const trainers = allTeam.filter((m) => m.group === "Trainer");

// ---------- student work ----------
export type StudentWork = { id: string; studentName: string; course?: string; category?: string; image?: string; featured?: boolean };
export const studentWork: StudentWork[] = cmsOr<StudentWork[]>(studentWorkJson, []).filter((s) => s.image);

// ---------- photo galleries ----------
const numbered = (folder: string, nums: number[]) => nums.map((n) => `/images/${folder}/${String(n).padStart(2, "0")}.jpg`);
const range = (folder: string, count: number) => numbered(folder, Array.from({ length: count }, (_, i) => i + 1));

type Galleries = {
  heroImage: string;
  experienceImage: string;
  schoolImage: string;
  aboutImage: string;
  schoolHeroImage: string;
  schoolCurriculumImage: string;
  bridalHeroImage: string;
  homeCarousel: string[];
  instagramGrid: string[];
  bridalTeaser: string[];
  bridalGallery: string[];
  schoolGallery: string[];
};
const defaultGalleries: Galleries = {
  heroImage: "/images/hair-color/05.jpg",
  experienceImage: "/images/ratanada/06.jpg",
  schoolImage: "/images/beauty-school/01.jpg",
  aboutImage: "/images/ratanada/01.jpg",
  schoolHeroImage: "/images/beauty-school/01.jpg",
  schoolCurriculumImage: "/images/beauty-school/04.jpg",
  bridalHeroImage: "/images/bridal/01.jpg",
  homeCarousel: [...numbered("hair-cut", [3, 8, 14]), ...numbered("hair-color", [2, 10, 17]), ...numbered("hair-spa", [4, 9]), ...numbered("nail-art", [3, 9]), ...numbered("pedicure", [3, 5])],
  instagramGrid: ["/images/bridal/07.jpg", "/images/hair-color/04.jpg", "/images/nail-art/06.jpg", "/images/bridal/13.jpg", "/images/hair-spa/03.jpg", "/images/beauty-school/02.jpg"],
  bridalTeaser: numbered("bridal", [7, 13, 3]),
  bridalGallery: range("bridal", 21),
  schoolGallery: range("beauty-school", 13),
};
const cmsGalleries = cmsOr<Partial<Galleries>>(galleriesJson, {});
function gallery<K extends keyof Galleries>(key: K): Galleries[K] {
  const v = cmsGalleries[key];
  const d = defaultGalleries[key];
  if (Array.isArray(d)) return (Array.isArray(v) && v.length ? v : d) as Galleries[K];
  return ((typeof v === "string" && v ? v : d) as Galleries[K]);
}
export const galleries: Galleries = {
  heroImage: gallery("heroImage"),
  experienceImage: gallery("experienceImage"),
  schoolImage: gallery("schoolImage"),
  aboutImage: gallery("aboutImage"),
  schoolHeroImage: gallery("schoolHeroImage"),
  schoolCurriculumImage: gallery("schoolCurriculumImage"),
  bridalHeroImage: gallery("bridalHeroImage"),
  homeCarousel: gallery("homeCarousel"),
  instagramGrid: gallery("instagramGrid"),
  bridalTeaser: gallery("bridalTeaser"),
  bridalGallery: gallery("bridalGallery"),
  schoolGallery: gallery("schoolGallery"),
};

// ---------- homepage ----------
export type Stat = { to: number; suffix: string; label: string; note: string };
const defaultStats: Stat[] = [
  { to: 10, suffix: "+", label: "Years of Craft", note: "A decade of getting it right" },
  { to: 5000, suffix: "+", label: "Transformations", note: "Looks, locks & moments reborn" },
  { to: 2, suffix: "", label: "Jodhpur Studios", note: "Ratanada & Pal Road" },
  { to: 500, suffix: "+", label: "Students Trained", note: "Beauty careers launched" },
];
const defaultFeatured = [
  { category: "hair", service: "hair-colour" },
  { category: "makeup", service: "bridal-makeup" },
  { category: "skin", service: "signature-facial" },
  { category: "spa-wellness", service: "full-body-spa" },
];
const cmsHome = cmsOr<{ stats?: Stat[]; featured?: { category: string; service: string }[] }>(homeJson, {});
export const homeStats: Stat[] = cmsHome.stats && cmsHome.stats.length ? cmsHome.stats.map((s) => ({ ...s, to: Number(s.to) || 0 })) : defaultStats;
export const featuredServices = cmsHome.featured && cmsHome.featured.length ? cmsHome.featured : defaultFeatured;

// ---------- editable lists on Bridal / About / School ----------
const defaultLists = {
  bridalCoverage: [
    { title: "Bridal Makeup", desc: "HD & airbrush makeup with a trial session included." },
    { title: "Pre-Bridal", desc: "Skin, hair and body prep timed to your wedding date." },
    { title: "Hair", desc: "Bridal hairstyling, trials, and hair health treatments." },
    { title: "Skin Preparation", desc: "A facial series designed to peak your skin on the day." },
    { title: "Nails", desc: "Bridal manicure, pedicure and hand-painted nail art." },
    { title: "Groom", desc: "Grooming, skin and hair services for the groom." },
    { title: "Wedding Guest", desc: "Makeup and styling for your wedding party and guests." },
    { title: "Bridal Packages", desc: "Bundled multi-function packages for the full celebration." },
  ],
  bridalJourney: [
    { step: "Consultation", desc: "Share your date, vision and functions with our bridal team." },
    { step: "Trial", desc: "Makeup and hair trial, timed 3–4 weeks before your wedding." },
    { step: "Prep Timeline", desc: "A custom skin, hair and nail plan across your countdown." },
    { step: "The Big Day", desc: "Your artist and stylist on-site, with a touch-up kit included." },
  ],
  aboutDepartments: [
    { name: "Hair", blurb: "Cuts, colour, treatments and hair spa." },
    { name: "Skin", blurb: "Facials and skin therapy, chosen for your skin type." },
    { name: "Spa & Wellness", blurb: "Massage and body rituals for genuine rest." },
    { name: "Makeup", blurb: "Everyday polish through to full bridal glam." },
    { name: "Nails", blurb: "Manicures, pedicures and nail art." },
  ],
  schoolJourney: ["Learn", "Hands-on Practice", "Live Salon Exposure", "Build Portfolio", "Career Opportunities"],
};
const cmsLists = cmsOr<Partial<typeof defaultLists>>(listsJson, {});
const nonEmpty = <T,>(v: T[] | undefined, d: T[]) => (Array.isArray(v) && v.length ? v : d);
export const lists = {
  bridalCoverage: nonEmpty(cmsLists.bridalCoverage, defaultLists.bridalCoverage),
  bridalJourney: nonEmpty(cmsLists.bridalJourney, defaultLists.bridalJourney),
  aboutDepartments: nonEmpty(cmsLists.aboutDepartments, defaultLists.aboutDepartments),
  schoolJourney: nonEmpty(cmsLists.schoolJourney, defaultLists.schoolJourney),
};

// ---------- per-page SEO ----------
type PageSeo = { title?: string; description?: string };
const cmsSeo = cmsOr<Record<string, PageSeo>>(seoJson, {});
/** Overrides a page's Google title/description when set in the CMS. */
export function pageSeo(key: string, fallback: { title: string; description: string }) {
  const s = cmsSeo[key] ?? {};
  return { title: s.title?.trim() || fallback.title, description: s.description?.trim() || fallback.description };
}
