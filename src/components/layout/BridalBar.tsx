"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const KEY = "afeem-bridal-bar-closed";

/**
 * Slim announcement strip above the header, on every page except /bridal, so
 * the bridal section is one tap away for visitors who never open the menu.
 * Dismissible for the session. Scrolls away with the page (not sticky).
 */
export default function BridalBar() {
  const pathname = usePathname();
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setClosed(sessionStorage.getItem(KEY) === "1");
    } catch {
      // storage blocked — just show the bar
    }
  }, []);

  if (closed || pathname.startsWith("/bridal")) return null;

  return (
    <div className="relative bg-bridal-red-dark text-white">
      <Link
        href="/bridal"
        className="flex items-center justify-center gap-2 px-10 py-2 text-center text-[11px] leading-snug tracking-wide sm:text-xs"
      >
        <span className="text-yellow-warm">✦</span>
        <span>
          Getting married? <span className="text-yellow-warm underline underline-offset-4">See how Afeem brides look →</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            // ignore
          }
        }}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/60 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}
