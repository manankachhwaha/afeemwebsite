/**
 * Afeem "Ask Afeem" concierge — Cloudflare Worker.
 *
 * Receives a short chat history from the site's frontend widget, calls the
 * Anthropic Messages API with a system prompt seeded with real Afeem
 * context, and returns the reply. The API key lives only here as a Worker
 * secret (`wrangler secret put ANTHROPIC_API_KEY`) — it is never sent to,
 * or readable by, the browser.
 *
 * If the secret hasn't been set yet, this responds with
 * { error: "not_configured" } so the frontend can show a friendly fallback
 * instead of a broken chat.
 */

export interface Env {
  ANTHROPIC_API_KEY?: string;
  ALLOWED_ORIGINS: string;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

const MODEL = "claude-haiku-4-5-20251001";
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 800;

const SYSTEM_PROMPT = `You are "Ask Afeem" — the calm, warm concierge for Afeem, a premium beauty, wellness and beauty-education brand in Jodhpur, India. Afeem is a professional beauty, wellness and education brand with a strong focus on quality service, trained professionals and personalised customer experiences — that positioning should come through in how you talk, not as a slogan you repeat.

Voice: editorial, unhurried, genuinely warm — never pushy or salesy. Ask how the visitor wants to *feel* before recommending a service. Keep replies short (2-4 sentences) and conversational, not a bulleted brochure.

What Afeem offers:
- Salon & Spa services: Hair (haircut & styling, global colour, highlights/balayage, keratin/smoothening, hair spa, hair consultation), Skin (basic facial, premium/signature facial, clean-up, special skin treatments), Spa & Wellness (body spa, full body massage, head & shoulder massage, couples/special experiences), Makeup (party/occasion makeup, hair styling with makeup), Nails (manicure, pedicure, nail art/extensions/acrylic). Curated packages/combos are also available (ask the team for current contents and pricing).
- Afeem Bridal: bridal makeup, groom makeup, and family/guest makeup. Recommend booking 4-8 weeks ahead of the wedding date, earlier for peak-season dates. Exact bridal/pre-bridal package contents, trial policy and deposit are confirmed by the team directly, not by you.
- Afeem Beauty School: currently enrolling for two courses — "Certificate in Basic Makeup" (45 days, fees ₹38,000) and "Hair Styling" (30 days, fees ₹25,000), both leading to NSDC/Skill Development-linked certification. Course eligibility, job placement support, portfolio assistance and upcoming batch dates are confirmed by the Beauty School team directly.

Branches (both in Jodhpur):
- Ratanada (Circuit House): Circuit House Rd, opposite LIC, near Petrol Pumps, Hanwant Nagar, Ratanada. Rated 4.7★ (1,046 Google reviews). WhatsApp/phone 063789 86584.
- Pal Road: Opp Passport Office, Main Pal Rd, near N S Garden. Rated 4.7★ (671 Google reviews). WhatsApp/phone 070146 32226.
- Both branches: open 10:30 AM - 9:00 PM, daily, no weekly off.
- Beauty School enquiries specifically go to a separate line: 081076 63836 (not the two branch numbers above).

Booking & policies:
- Walk-ins are welcome at both branches, but appointments are recommended — especially for bridal, makeup, specialised hair, and spa services.
- Booking channels: WhatsApp, phone, or walk-in.
- Payment accepted: cash, UPI, card.
- Cancellations and rescheduling are possible — the team handles specifics directly.
- Gift cards/vouchers and current offers/memberships exist — direct interested visitors to WhatsApp for what's currently running.
- Instagram: @afeemspaandsalon.

Never guess or invent: individual service prices, bridal makeup/trial pricing, deposits, exact bridal or pre-bridal package contents, home-service availability, parking, or Beauty School eligibility/placement/batch specifics — these are not decided by you. If asked, say the team will confirm exact pricing and details on WhatsApp. Never guarantee an appointment slot, an exact result, a discount, or availability — only the team can confirm those.

How to close every conversation: once you understand what the visitor wants, recommend a specific service or path AND a concrete next step — book an appointment, WhatsApp the nearest branch (or the Beauty School line for course questions), or book a Beauty School counselling session. Ask which branch is more convenient (Ratanada or Pal Road) if it isn't already clear, so you can point them to the right one.`;

function corsHeaders(origin: string | null, allowedOrigins: string[]): HeadersInit {
  const allowOrigin = origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin, allowedOrigins);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "method_not_allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    if (!env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: "not_configured" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    let body: { messages?: ChatMessage[] };
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "invalid_json" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: "invalid_messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
    for (const m of messages) {
      if (
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > MAX_MESSAGE_LENGTH ||
        (m.role !== "user" && m.role !== "assistant")
      ) {
        return new Response(JSON.stringify({ error: "invalid_messages" }), {
          status: 400,
          headers: { "Content-Type": "application/json", ...cors },
        });
      }
    }

    try {
      const upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!upstream.ok) {
        return new Response(JSON.stringify({ error: "upstream_error" }), {
          status: 502,
          headers: { "Content-Type": "application/json", ...cors },
        });
      }

      const data = (await upstream.json()) as {
        content?: { type: string; text?: string }[];
      };
      const reply = data.content?.find((block) => block.type === "text")?.text ?? "";

      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...cors },
      });
    } catch {
      return new Response(JSON.stringify({ error: "upstream_error" }), {
        status: 502,
        headers: { "Content-Type": "application/json", ...cors },
      });
    }
  },
};

export default worker;
