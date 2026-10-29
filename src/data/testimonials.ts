import { cmsOr } from "@/lib/cms";
import testimonialsJson from "@/content/cms/testimonials.json";

export type Testimonial = {
  name: string;
  service: string;
  quote: string;
  rating: number;
  type: "salon" | "bridal" | "school";
};

// No built-in testimonials: only real, client-approved reviews added in the CMS are shown.
// Until then the home page shows each branch's live Google rating instead.
const defaultTestimonials: Testimonial[] = [];

export const testimonials: Testimonial[] = cmsOr(testimonialsJson, defaultTestimonials);
