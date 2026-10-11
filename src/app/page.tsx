import Hero from "@/components/home/Hero";
import BridalTeaser from "@/components/home/BridalTeaser";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ExperienceIntro from "@/components/home/ExperienceIntro";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import InsideAfeem from "@/components/home/InsideAfeem";
import TransformationsPreview from "@/components/home/TransformationsPreview";
import SchoolTeaser from "@/components/home/SchoolTeaser";
import Reviews from "@/components/home/Reviews";
import FinalCTA from "@/components/home/FinalCTA";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function Home() {
  // The homepage reads as a short story: hook -> pick your path -> brides ->
  // why Afeem -> proof -> what we do -> results -> reviews -> a look inside
  // -> learn with us -> follow along -> next step.
  return (
    <>
      <Hero />
      <WhatBringsYou />
      <BridalTeaser />
      <ExperienceIntro />
      <Stats />
      <FeaturedServices />
      <TransformationsPreview />
      <Reviews />
      <InsideAfeem />
      <SchoolTeaser />
      <InstagramFeed />
      <FinalCTA />
    </>
  );
}
