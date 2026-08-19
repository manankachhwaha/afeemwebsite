export type Testimonial = {
  name: string;
  service: string;
  quote: string;
  rating: number;
  type: "salon" | "bridal" | "school";
};

export const testimonials: Testimonial[] = [
  {
    name: "Ananya S.",
    service: "Bridal Makeup",
    quote:
      "Aarav and the team understood exactly what I wanted from the very first consultation. My makeup lasted the entire wedding, through tears and dancing.",
    rating: 5,
    type: "bridal",
  },
  {
    name: "Karan M.",
    service: "Hair Colour",
    quote: "Best balayage I've had in Jodhpur — natural, low-maintenance, and it's grown out beautifully.",
    rating: 5,
    type: "salon",
  },
  {
    name: "Priyanka D.",
    service: "Professional Makeup Artistry Course",
    quote: "The live salon exposure in the final month is what set this course apart. I had real client experience before I even graduated.",
    rating: 5,
    type: "school",
  },
  {
    name: "Ritu J.",
    service: "Signature Facial",
    quote: "Sneha takes the time to actually understand your skin instead of running through a fixed menu. My skin has never looked better.",
    rating: 5,
    type: "salon",
  },
  {
    name: "Vansh & Ishita",
    service: "Bridal Packages",
    quote: "From the first function to the wedding day, the whole Afeem team coordinated everything for both of us — it took so much stress off our plates.",
    rating: 5,
    type: "bridal",
  },
];
