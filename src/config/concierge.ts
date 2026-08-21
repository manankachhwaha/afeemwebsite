// URL of the deployed "Ask Afeem" Cloudflare Worker (see /worker/afeem-concierge).
// Override at build time with NEXT_PUBLIC_CONCIERGE_ENDPOINT if you redeploy
// the Worker under a different name/domain.
export const CONCIERGE_ENDPOINT =
  process.env.NEXT_PUBLIC_CONCIERGE_ENDPOINT || "https://afeem-concierge.manankachhwaha.workers.dev";
