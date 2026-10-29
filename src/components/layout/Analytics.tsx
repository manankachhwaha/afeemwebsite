"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { site } from "@/data/site";
import { track } from "@/lib/track";
import { captureAttribution } from "@/lib/leads";

const CONSENT_KEY = "afeem-cookie-consent";

/**
 * Marketing tags — only the ones whose ID is filled in the CMS ("Contact,
 * social & tracking") are loaded, and only after the visitor accepts the cookie
 * banner. Also records UTM/ad-click attribution and
 * tracks WhatsApp clicks and phone taps site-wide.
 */
export default function Analytics() {
  const { ga4Id, gtmId, metaPixelId, googleAdsId } = site.analytics;
  const pathname = usePathname();
  const first = useRef(true);
  const hasTags = !!(ga4Id || gtmId || metaPixelId || googleAdsId);
  const [consent, setConsent] = useState<"granted" | "denied" | "unset" | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(v === "granted" || v === "denied" ? v : "unset");
    } catch {
      setConsent("unset");
    }
  }, []);

  function choose(v: "granted" | "denied") {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch {
      // storage blocked — choice just applies to this page view
    }
    setConsent(v);
  }
  const allowTags = consent === "granted";

  useEffect(() => {
    captureAttribution();
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("phone_click", { link_url: href, page: location.pathname });
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)/.test(href)) track("whatsapp_click", { link_url: href.split("?")[0], page: location.pathname });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Meta Pixel needs a manual PageView on client-side navigation.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as Window & { fbq?: (...a: unknown[]) => void };
    w.fbq?.("track", "PageView");
  }, [pathname]);

  return (
    <>
      {hasTags && consent === "unset" && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed z-[60] left-4 right-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] md:left-auto md:right-6 md:bottom-6 md:max-w-md bg-brown text-white p-5 shadow-2xl border border-gold/40"
        >
          <p className="text-sm leading-relaxed text-white/90">
            We use cookies for analytics and advertising to understand what helps visitors and improve Afeem. See our{" "}
            <Link href="/cookie-policy" className="underline underline-offset-2 text-yellow-warm">Cookie Policy</Link>.
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => choose("granted")} className="px-5 py-2 text-xs font-medium uppercase tracking-wide bg-gold text-[#2b1a0c] hover:bg-gold-light">Accept</button>
            <button type="button" onClick={() => choose("denied")} className="px-5 py-2 text-xs font-medium uppercase tracking-wide border border-white/60 hover:bg-white hover:text-brown">Decline</button>
          </div>
        </div>
      )}
      {allowTags && gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
      )}
      {allowTags && !gtmId && (ga4Id || googleAdsId) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id || googleAdsId}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${ga4Id ? `gtag('config','${ga4Id}');` : ""}${googleAdsId ? `gtag('config','${googleAdsId}');` : ""}`}</Script>
        </>
      )}
      {allowTags && metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}</Script>
      )}
    </>
  );
}
