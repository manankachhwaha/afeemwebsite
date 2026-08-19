export type Branch = {
  slug: string;
  name: string;
  address: string;
  phone: string;
  phoneHref: string;
  hours: string;
  mapEmbedQuery: string;
  services: string[];
  parking: string;
  hasSchool: boolean;
};

export const branches: Branch[] = [
  {
    slug: "ratanada",
    name: "Afeem — Ratanada",
    address: "2nd Floor, Sarva Priya Complex, Ratanada Road, Jodhpur, Rajasthan 342001",
    phone: "+91 98765 43210",
    phoneHref: "tel:+919876543210",
    hours: "Tue–Sun · 10:00 AM – 8:00 PM (Closed Mondays)",
    mapEmbedQuery: "Ratanada, Jodhpur",
    services: ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal", "Beauty School"],
    parking: "Dedicated 2-wheeler & car parking available on-site.",
    hasSchool: true,
  },
  {
    slug: "shastri-nagar",
    name: "Afeem — Shastri Nagar",
    address: "Shop 4, Vivaan Arcade, Shastri Nagar, Jodhpur, Rajasthan 342003",
    phone: "+91 98765 43211",
    phoneHref: "tel:+919876543211",
    hours: "Tue–Sun · 10:00 AM – 8:00 PM (Closed Mondays)",
    mapEmbedQuery: "Shastri Nagar, Jodhpur",
    services: ["Hair", "Skin", "Makeup", "Nails"],
    parking: "Street parking available; valet on weekends.",
    hasSchool: false,
  },
];

export function getBranch(slug: string) {
  return branches.find((b) => b.slug === slug);
}
