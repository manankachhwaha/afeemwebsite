import { track } from "@/lib/track";

const ATTR_KEY = "afeem-attribution";

type Attribution = { utm_source?: string; utm_medium?: string; utm_campaign?: string; utm_term?: string; utm_content?: string; gclid?: string; fbclid?: string; referrer?: string; landing?: string };

/** Remember how the visitor arrived (UTM tags, ad click ids, referrer) for this browsing session. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const q = new URLSearchParams(location.search);
    const a: Attribution = { landing: location.pathname };
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const) {
      const v = q.get(k);
      if (v) a[k] = v.slice(0, 120);
    }
    if (document.referrer && !document.referrer.includes(location.host)) a.referrer = document.referrer.slice(0, 200);
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(a));
  } catch {
    // storage blocked — attribution just won't be recorded
  }
}

function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}");
  } catch {
    return {};
  }
}

/**
 * Sends a form submission to the Afeem CMS enquiries inbox (fire-and-forget —
 * the visitor's WhatsApp hand-off never waits on, or fails because of, this)
 * and fires the "generate_lead" conversion event for analytics/ads.
 */
export function submitLead(type: "booking" | "callback" | "bridal" | "school" | "contact", fields: Record<string, string | undefined | null>) {
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(fields)) if (v !== undefined && v !== null && String(v).trim() !== "") clean[k] = String(v);
  const a = readAttribution();
  const source = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ") || (a.gclid ? "google ads" : a.fbclid ? "meta ads" : a.referrer ? new URL(a.referrer).hostname : "direct");
  clean["Source"] = source;
  if (a.landing) clean["Landing page"] = a.landing;
  track("generate_lead", { lead_type: type, source });
  const base = process.env.NEXT_PUBLIC_CMS_URL;
  if (!base) return;
  try {
    void fetch(`${base.replace(/\/+$/, "")}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, fields: clean, page: location.pathname }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never block the visitor
  }
}

/** Turns the "Label: value" lines of a WhatsApp message into inbox fields (Name/Phone get lowercase keys). */
export function linesToFields(lines: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of lines) {
    const m = /^([^:]{1,40}):\s*(.*)$/.exec(l);
    if (!m || m[2] === "—") continue;
    const key = m[1].trim();
    out[key === "Name" ? "name" : key === "Phone" ? "phone" : key] = m[2].trim();
  }
  return out;
}
