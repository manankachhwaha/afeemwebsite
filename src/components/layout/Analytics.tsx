"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { site } from "@/data/site";
import { track } from "@/lib/track";
import { captureAttribution } from "@/lib/leads";

/**
 * Marketing tags — only the ones whose ID is filled in the CMS ("Contact,
 * social & tracking") are loaded. Also records UTM/ad-click attribution and
 * tracks WhatsApp clicks and phone taps site-wide.
 */
export default function Analytics() {
  const { ga4Id, gtmId, metaPixelId, googleAdsId } = site.analytics;
  const pathname = usePathname();
  const first = useRef(true);

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
      {gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}</Script>
      )}
      {!gtmId && (ga4Id || googleAdsId) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id || googleAdsId}`} strategy="afterInteractive" />
          <Script id="gtag" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${ga4Id ? `gtag('config','${ga4Id}');` : ""}${googleAdsId ? `gtag('config','${googleAdsId}');` : ""}`}</Script>
        </>
      )}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}</Script>
      )}
    </>
  );
}
