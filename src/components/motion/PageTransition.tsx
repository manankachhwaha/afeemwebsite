"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

/**
 * Fades each route in with a pure-CSS animation (see .page-enter in
 * globals.css). Deliberately no exit animation / AnimatePresence "wait":
 * waiting on the old page's exit before mounting the new one could stall on
 * heavy pages and leave the next route blank. Keying on the pathname
 * re-mounts the wrapper so the fade replays on every navigation, and the
 * animation can never leave content hidden — it ends at opacity 1 on its own.
 * GoldFlash.tsx still supplies the decorative route-change flourish.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
