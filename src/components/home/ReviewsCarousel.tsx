"use client";

import { useRef } from "react";
import { testimonials } from "@/data/testimonials";
import { branches } from "@/data/branches";
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

  if (best.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          {branches.map((b) => (
            <a
              key={b.slug}
              href={b.googleMapsSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-8 flex flex-col gap-3 border border-brown/10 text-center hover:border-gold transition-colors"
            >
              <span className="text-gold-dark text-3xl font-display">★ {b.googleRating}</span>
              <span className="text-brown-soft text-sm">{b.googleReviewCount.toLocaleString("en-IN")} Google reviews</span>
              <span className="text-brown font-medium text-sm">{b.name}</span>
              <span className="text-gold-dark text-xs underline underline-offset-2">Read reviews on Google</span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <div
          ref={trackRef}
          tabIndex={0}
          role="region"
          aria-label="Customer reviews"
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
