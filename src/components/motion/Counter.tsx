"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

export default function Counter({
  to,
  suffix = "",
  prefix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(to);
  }, [isInView, to, motionValue]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
    });
  }, [spring, prefix, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  );
}
