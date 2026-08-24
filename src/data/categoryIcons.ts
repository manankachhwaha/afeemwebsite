import {
  HairIcon,
  SkinIcon,
  SpaIcon,
  MakeupIcon,
  NailsIcon,
  BridalIcon,
  EducationIcon,
} from "@/components/ui/icons";

/**
 * One place mapping a service/course category (or a transformation's
 * category, or a journal post's bucket — they all use the same handful of
 * names) to the icon that identifies it. Used to watermark <Visual>
 * placeholders so every block on the site reads as a specific salon
 * service, not a generic gold rectangle, even before real photography.
 */
export const CATEGORY_ICONS = {
  Hair: HairIcon,
  hair: HairIcon,
  Skin: SkinIcon,
  skin: SkinIcon,
  "Spa & Wellness": SpaIcon,
  "spa-wellness": SpaIcon,
  Makeup: MakeupIcon,
  makeup: MakeupIcon,
  Nails: NailsIcon,
  nails: NailsIcon,
  Bridal: BridalIcon,
  bridal: BridalIcon,
  "Beauty Education": EducationIcon,
  "beauty-school": EducationIcon,
} as const;

export function getCategoryIcon(key: string) {
  return CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS];
}
