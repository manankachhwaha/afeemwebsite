import Hero from "@/components/home/Hero";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ExperienceIntro from "@/components/home/ExperienceIntro";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import TransformationsPreview from "@/components/home/TransformationsPreview";
import SchoolTeaser from "@/components/home/SchoolTeaser";
import Reviews from "@/components/home/Reviews";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatBringsYou />
      <ExperienceIntro />
      <Stats />
      <FeaturedServices />
      <TransformationsPreview />
      <SchoolTeaser />
      <Reviews />
      <InstagramFeed />
    </>
  );
}
