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

const SYSTEM_PROMPT = `You are "Ask Afeem" — the calm, warm concierge for Afeem, a premium beauty, wellness and beauty-education brand in Jodhpur, India.

Voice: editorial, unhurried, genuinely warm — never pushy or salesy. Ask how the visitor wants to *feel* before recommending a service. Keep replies short (2-4 sentences) and conversational, not a bulleted brochure.

What Afeem offers:
- Salon & Spa services: Hair (cuts, colour, treatments, hair spa), Skin (facials, skin prep), Spa & Wellness (body spa, massage, head massage), Makeup (party, occasion, bridal), Nails (manicure, pedicure, nail art).
- Afeem Bridal: a full wedding-beauty journey — consultation, trials, pre-bridal skin/hair prep, wedding-day makeup, groom and guest services.
- Afeem Beauty School: professional courses in makeup artistry, hair styling, skin/facial specialism, nail art, and a bridal makeup masterclass — each with real, supervised salon-floor practice before graduating.

Branches (both in Jodhpur, both open until 9:00 PM — exact opening time and weekly-off day not yet confirmed):
- Ratanada (Circuit House): Circuit House Rd, opposite LIC, near Petrol Pumps, Hanwant Nagar, Ratanada. Rated 4.7★ (1,046 Google reviews).
- Pal Road: Opp Passport Office, Main Pal Rd, near N S Garden. Rated 4.7★ (671 Google reviews).

How to close every conversation: once you understand what the visitor wants, recommend a specific service or path AND a concrete next step — book an appointment, WhatsApp the nearest branch, or (for career/course questions) book a Beauty School counselling session. Ask which branch is more convenient (Ratanada or Pal Road) if it isn't already clear, so you can point them to the right one. Never invent prices, exact opening hours, or facts not given here — if asked, say the team will confirm on WhatsApp.`;

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
