"use client";

import { useEffect, useRef, useState } from "react";
import { isMotionEnabled } from "@/lib/motionPreference";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz·";
const FRAME_MS = 28;
const REVEAL_PER_FRAME = 0.7; // fraction of a character revealed per frame, on average

/**
 * A decode/scramble reveal — characters cycle through random glyphs before
 * settling on the real text, left to right. One-shot on mount (or when
 * `text` changes), plain text underneath the whole time so it degrades to
 * the final string instantly if JS is slow, and skips the scramble
 * entirely under reduced motion.
 */
export default function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isMotionEnabled()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(text);
      return;
    }

    let revealed = 0;
    function tick() {
      revealed += REVEAL_PER_FRAME;
      const settled = Math.floor(revealed);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || i < settled) out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (settled >= text.length) {
        setDisplay(text);
        if (frameRef.current) clearInterval(frameRef.current);
      }
    }
    tick(); // run immediately so the first paint after mount is already scrambled, not the plain text
    frameRef.current = setInterval(tick, FRAME_MS);

    return () => {
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text]);

  return <span className={className}>{display}</span>;
}
