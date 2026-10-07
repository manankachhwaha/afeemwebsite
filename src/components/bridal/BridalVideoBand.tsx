"use client";

import { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import { useInView } from "motion/react";

/**
 * A section-width band with a looping bridal video as its backdrop —
 * reused for the "Journey" and "Book Consultation" sections so the page
 * doesn't lean on the hero's clip alone. Same poster-under-video +
 * .bridal-bg-video kill-switch pattern as BridalHero.
 *
 * Two separate visibility checks are in play: `everNear` (fires once, with
 * a lookahead margin) gates whether the <video> mounts at all, so a band a
 * visitor never scrolls to never downloads its clip; `visible` (continuous,
 * no margin) then plays/pauses the mounted clip as it enters/leaves the
 * viewport. Without the pause, Chrome keeps decoding an off-screen playing
 * video — with three bridal bands on one page that's multiple clips
 * fighting for the decoder at once, which visibly locked up the tab while
 * scrolling.
 */
export default function BridalVideoBand({
  id,
  src,
  poster,
  overlayClassName = "bg-bridal-red-dark/75",
  className = "",
  children,
}: {
  id?: string;
  src: string;
  poster: string;
  overlayClassName?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const everNear = useInView(ref, { once: true, margin: "200px 0px" });
  const visible = useInView(ref, { amount: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible) video.play().catch(() => {});
    else video.pause();
  }, [visible]);

  return (
    <section id={id} ref={ref} className={`relative isolate overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
        {everNear && (
          <video
            ref={videoRef}
            className="bridal-bg-video absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
      <div className={`pointer-events-none absolute inset-0 ${overlayClassName}`} />
      {/* Soft top/bottom fades to solid bridal-red-dark — every plain section
          on this page shares that exact colour, so fading the video/image
          edge into it dissolves what would otherwise be a hard seam where a
          flat-colour section meets a textured video one. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bridal-red-dark to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bridal-red-dark to-transparent" />
      <div className="relative">{children}</div>
    </section>
  );
}
