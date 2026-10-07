import Hero from "@/components/home/Hero";
import PhotoMarquee from "@/components/home/PhotoMarquee";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ExperienceIntro from "@/components/home/ExperienceIntro";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import InsideAfeem from "@/components/home/InsideAfeem";
import TransformationsPreview from "@/components/home/TransformationsPreview";
import SchoolTeaser from "@/components/home/SchoolTeaser";
import Reviews from "@/components/home/Reviews";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <PhotoMarquee />
      <WhatBringsYou />
      <ExperienceIntro />
      <Stats />
      <FeaturedServices />
      <InsideAfeem />
      <TransformationsPreview />
      <SchoolTeaser />
      <Reviews />
      <InstagramFeed />
    </>
  );
}
