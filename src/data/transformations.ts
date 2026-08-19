export type Transformation = {
  id: string;
  category: "Hair" | "Makeup" | "Skin" | "Nails" | "Bridal";
  title: string;
  service: string;
  expert: string;
  branch: string;
};

export const transformations: Transformation[] = [
  { id: "t1", category: "Hair", title: "Balayage Transformation", service: "Hair Colour", expert: "Riya Mehta", branch: "Ratanada" },
  { id: "t2", category: "Bridal", title: "Traditional Rajasthani Bridal Look", service: "Bridal Makeup", expert: "Aarav Singh", branch: "Ratanada" },
  { id: "t3", category: "Skin", title: "6-Week Skin Prep Journey", service: "Skin Prep Ritual", expert: "Sneha Rathore", branch: "Shastri Nagar" },
  { id: "t4", category: "Makeup", title: "Editorial Glam", service: "Party Makeup", expert: "Aarav Singh", branch: "Ratanada" },
  { id: "t5", category: "Nails", title: "Hand-Painted Bridal Nail Art", service: "Nail Art", expert: "Priya Choudhary", branch: "Shastri Nagar" },
  { id: "t6", category: "Hair", title: "Short Crop Reinvention", service: "Haircut & Styling", expert: "Riya Mehta", branch: "Ratanada" },
  { id: "t7", category: "Bridal", title: "Pastel Engagement Makeup", service: "Bridal Makeup", expert: "Aarav Singh", branch: "Ratanada" },
  { id: "t8", category: "Skin", title: "Brightening Facial Series", service: "Brightening Facial", expert: "Sneha Rathore", branch: "Shastri Nagar" },
  { id: "t9", category: "Makeup", title: "Soft Glam Day Look", service: "Party Makeup", expert: "Aarav Singh", branch: "Shastri Nagar" },
];

export const transformationFilters = ["All", "Hair", "Makeup", "Skin", "Nails", "Bridal"] as const;
