import Hero from "@/components/home/Hero";
import WhatBringsYou from "@/components/home/WhatBringsYou";
import ExperienceIntro from "@/components/home/ExperienceIntro";
import Stats from "@/components/home/Stats";
import FeaturedServices from "@/components/home/FeaturedServices";
import TransformationsPreview from "@/components/home/TransformationsPreview";
import SchoolTeaser from "@/components/home/SchoolTeaser";
import Reviews from "@/components/home/Reviews";
import InstagramFeed from "@/components/home/InstagramFeed";
import Marquee from "@/components/motion/Marquee";

const marqueeItems = ["Hair", "Skin", "Spa & Wellness", "Makeup", "Nails", "Bridal", "Beauty Education"];

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
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
