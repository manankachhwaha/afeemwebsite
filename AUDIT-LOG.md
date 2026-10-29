# Afeem pre-launch audit — running log

Kept up to date as work happens. Newest entries at the bottom of each section.

## Round 1 — pushed (commit ce20a92, 2026-10-30)
- Added Privacy, Terms, Cookie and Refund & Cancellation pages (`src/app/*`), linked in footer + sitemap.
  - Text is a DRAFT written from what the site actually does. Needs a human/legal read.
- Privacy notice (`ConsentNote`) above the submit button on Booking, Callback and Bridal forms (notice only — does not block submit).
- Accessibility: bridal textarea label, Instagram thumbnail names, keyboard-focusable reviews scroller, visible focus ring on form fields, darker `gold-dark` / `brown-mute` tokens, footer legal line contrast.
- Canonical tags via `alternates.canonical` in `layout.tsx`.
- Fixed `/D/g` → `/\D/g` in `src/data/branches.ts` (CMS phone numbers).
- Verified: tsc, eslint, `next build`, axe-core on 12 pages, live site returns 200 for all new pages.

## Round 2 — 2026-10-30
Findings that drove it:
- `afeemspasalon.com` already serves the site (HTTP 200) but its canonical/sitemap/robots still pointed at `afeem-website.pages.dev`.
- `www.afeemspasalon.com` returns 522 (Cloudflare can't reach origin) — NOT a code issue, needs a DNS/Pages custom-domain fix in Cloudflare.

Done:
- [x] `site.url` → `https://afeemspasalon.com` (sitemap, robots, schema, canonical, metadataBase)
- [x] Default social share image `/og-image.jpg` (1200×630, generated from the existing logo)
- [x] Site-wide schema → `Organization`; branch pages keep `BeautySalon` and gain `geo`
- [x] Branch page titles: drop duplicated brand name
- [x] "Ask Afeem" button label contrast
- [x] Home reviews: unverified testimonials replaced by each branch's Google rating card (figures from CLAUDE.md)
- [x] Cookie consent banner + GA4/GTM/Meta/Ads gated behind consent (banner only appears once an analytics ID is configured; GTM noscript iframe removed since it ignored consent)
- [x] Re-test (below)

### Verification
- tsc + eslint clean; `next build` clean (also built a scratch copy with a fake GA ID to test the banner).
- Canonical, og:image, sitemap and robots use https://afeemspasalon.com.
- Bridal / school / service pages hide their review blocks when there are none ("What Clients Say" is now conditional).
- Functionality (fetch/open stubbed, no real leads sent): Booking, Callback and Bridal forms each post a lead to the CMS and open the right branch WhatsApp, then show the thank-you state.
- Cookie banner: first visit shows banner and requests no tracker; Decline stays off and is remembered; Accept loads gtag and is remembered.
- axe-core: all colour-contrast failures gone on tested pages; only minor "region" / "landmark-unique" notes remain.
- 0 broken internal links and 0 missing anchors (checked in round 1; no routes removed since).

### Correction found after deploy (2026-10-30)
- Earlier notes said "CMS content: nothing published". That is only true of the repo's local `src/content/cms/*.json` (all `null`).
  The Cloudflare build runs `fetch-cms.mjs`, which pulls the LIVE CMS, and the live CMS has all 18 collections published.
- So production still shows the 5 original testimonials (Ananya S., Karan M., Priyanka D., Ritu J., Vansh & Ishita) because
  they are saved in the CMS "Testimonials" collection, overriding the code default I emptied.
  Removing them must be done in the CMS admin (https://afeem-cms.manankachhwaha.workers.dev) → Testimonials → delete, then republish/rebuild.
  After that the home page shows the Google rating cards.
- Live CMS settings: analytics IDs are all empty (so the cookie banner stays hidden until one is added); no redirects; no SEO overrides.
- Live deploy confirmed: canonical/sitemap/robots on afeemspasalon.com, og-image.jpg returns 200.

## Deliberately NOT changed
- "Best salon/spa in Jodhpur" keywords/titles/journal post — CLAUDE.md §19 targets these terms on purpose.
- Pal Road email `afeemspaandsaloon@gmail.com` — matches CLAUDE.md.
- Legal wording — needs owner/lawyer review; no refund percentages or deadlines were invented.

## Needs the owner
- Fix `www.afeemspasalon.com` (522) in Cloudflare Pages → Custom domains / DNS.
- Review the four legal pages.
- Provide real testimonials (CMS "Testimonials") if wanted; they will show automatically.
- Add Facebook/YouTube/LinkedIn URLs and analytics IDs in the CMS when the accounts exist.
