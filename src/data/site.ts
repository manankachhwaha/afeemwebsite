export const site = {
  name: "Afeem",
  legalName: "Afeem Spa & Salon and Afeem Beauty School",
  tagline: "Beauty · Wellness · Education",
  city: "Jodhpur",
  description:
    "Afeem is a premium beauty, wellness and education destination in Jodhpur — home to Afeem Spa & Salon and Afeem Beauty School.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  email: "hello@afeem.in",
  instagram: "https://instagram.com/afeem",
  url: "https://afeem-website.pages.dev",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hi Afeem, I'd like to know more.";
