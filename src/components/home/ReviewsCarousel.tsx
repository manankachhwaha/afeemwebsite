"use client";

import { useRef } from "react";
import { testimonials } from "@/data/testimonials";
import { BranchGoogleReviewsButton } from "@/components/branch/BranchCTA";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const best = [...testimonials].sort((a, b) => b.rating - a.rating);

  function scroll(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {best.map((t) => (
            <div
              key={t.name}
              className="snap-start shrink-0 w-[280px] sm:w-[340px] bg-white p-8 flex flex-col gap-4 border border-brown/10"
            >
              <Stars rating={t.rating} />
              <p className="text-brown-soft leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="text-brown font-medium text-sm">{t.name}</p>
                <p className="text-brown-mute text-xs">{t.service}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous reviews"
          className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-brown/15 text-brown shadow-md absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hover:border-gold hover:text-gold-dark transition-colors"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next reviews"
          className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full bg-white border border-brown/15 text-brown shadow-md absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hover:border-gold hover:text-gold-dark transition-colors"
        >
          ›
        </button>
      </div>
      <div className="flex justify-center">
        <BranchGoogleReviewsButton variant="secondary">See More on Google Reviews</BranchGoogleReviewsButton>
      </div>
    </div>
  );
}
