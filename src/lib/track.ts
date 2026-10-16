type Win = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };

/**
 * Sends an analytics event to whichever tools are connected (Tag Manager's
 * dataLayer, GA4, Meta Pixel). Safe to call when none are — it does nothing.
 */
export function track(event: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined") return;
  const w = window as Win;
  try {
    w.dataLayer?.push({ event, ...params });
    if (typeof w.gtag === "function") w.gtag("event", event, params);
    if (typeof w.fbq === "function") {
      if (event === "generate_lead") w.fbq("track", "Lead", params);
      else if (event === "whatsapp_click" || event === "phone_click") w.fbq("track", "Contact", params);
      else w.fbq("trackCustom", event, params);
    }
  } catch {
    // analytics must never break the page
  }
}
