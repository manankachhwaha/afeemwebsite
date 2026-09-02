export type Transformation = {
  id: string;
  category: "Hair" | "Makeup" | "Skin" | "Nails" | "Bridal";
  title: string;
  service: string;
  branch: string;
};

export const transformations: Transformation[] = [
  { id: "t1", category: "Hair", title: "Balayage Transformation", service: "Hair Colour", branch: "Ratanada" },
  { id: "t2", category: "Bridal", title: "Traditional Rajasthani Bridal Look", service: "Bridal Makeup", branch: "Ratanada" },
  { id: "t3", category: "Skin", title: "6-Week Skin Prep Journey", service: "Skin Prep Ritual", branch: "Pal Road" },
  { id: "t4", category: "Makeup", title: "Editorial Glam", service: "Party Makeup", branch: "Ratanada" },
  { id: "t5", category: "Nails", title: "Hand-Painted Bridal Nail Art", service: "Nail Art", branch: "Pal Road" },
  { id: "t6", category: "Hair", title: "Short Crop Reinvention", service: "Haircut & Styling", branch: "Ratanada" },
  { id: "t7", category: "Bridal", title: "Pastel Engagement Makeup", service: "Bridal Makeup", branch: "Ratanada" },
  { id: "t8", category: "Skin", title: "Brightening Facial Series", service: "Brightening Facial", branch: "Pal Road" },
  { id: "t9", category: "Makeup", title: "Soft Glam Day Look", service: "Party Makeup", branch: "Pal Road" },
];

export const transformationFilters = ["All", "Hair", "Makeup", "Skin", "Nails", "Bridal"] as const;
