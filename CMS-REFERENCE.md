# Afeem Studio (CMS) — reference, logic & brainstorm

Written 2026-10-16. Read this before changing the CMS or adding editable content.

## 1. What exists

| Piece | Where | Notes |
|---|---|---|
| Admin panel + API | Cloudflare Worker `afeem-cms` → https://afeem-cms.manankachhwaha.workers.dev | source: `worker/afeem-cms/` |
| Website | Cloudflare Pages `afeem-website` (afeemspasalon.com), static Next.js export | builds on every push to `main` and on every CMS Publish |
| Storage | one KV namespace `CMS_KV` (id in `wrangler.jsonc`) | drafts, live snapshot, history, users, photos, enquiries |
| Publish link | Pages deploy hook `afeem-studio` (id c6d33efb…) | stored as Worker secret `DEPLOY_HOOK_URL` |
| AI concierge | separate Worker `worker/afeem-concierge` | untouched |

## 2. Why it is built this way (decisions)

- **Own email+password login** (chosen by the owner) instead of GitHub-based CMS: the marketing person needs no GitHub account; everything lives in the Cloudflare account Afeem owns.
- **Site stays static.** Content is pulled at *build time* (`scripts/fetch-cms.mjs`), not fetched by visitors. Result: same speed/SEO, and a CMS outage can't take the site down. If the CMS is unreachable *while building*, the build **fails on purpose** so an outage never republishes stale/default content over people's edits.
- **Defaults live in code.** `src/data/*.ts` and `src/content/texts.ts` keep the original content. A collection file in `src/content/cms/*.json` that is `null` means "use the defaults". After the first Publish every collection has a value.
- **Draft vs live.** Save → `draft:<collection>` in KV. Publish → copies all drafts into `live` + a snapshot (last 15, restorable) + triggers the deploy hook. `/public/content.json` serves `live` only.
- **KV for photos, not R2.** R2 needs a payment method on file to enable; KV (≤2.5 MB per value, admin resizes to ≤1800 px WebP) needs nothing. At build, photos are copied into `public/images/cms/` and URLs rewritten, so the live site never hot-links the CMS. Swap to R2 later if the library gets huge (>1 GB).
- **Photo editing is client-side** (canvas): crop presets, zoom/pan, rotate, mirror, brightness/contrast/colour; save as new or overwrite same URL. Built-in site photos open via `/api/proxy` (the static site sends no CORS headers).
- **Optimistic concurrency:** each collection save sends the `updated` stamp it loaded; a mismatch returns 409 so two editors can't silently overwrite each other.
- **Page text:** every editable string is registered in `src/content/texts.ts` (`key → {group,label,default}`); components call `t("key")`. The admin lists the registry (shipped inside the Worker as `_textRegistry` in `seed.json`). Blank = original wording.

## 3. Security model

PBKDF2-SHA256 (100k iterations, Workers' max) hashes; session = HMAC-signed cookie, HttpOnly + Secure + SameSite=Strict, 12 h, invalidated when the user's password changes (`tv` counter); all non-GET calls need `X-CMS: 1` and same-origin; login rate-limited per IP and per email (KV counters); admin pages served with CSP (`admin/_headers`); uploads restricted to webp/jpeg/png/gif (no SVG); public lead endpoint is origin-checked, honeypot + 20/h per IP. Secrets: `SESSION_SECRET`, `SETUP_KEY` (only used for first account), `DEPLOY_HOOK_URL`.

## 4. Accounts

- Owner: subhanshiratnawat15@gmail.com (can add/remove people, reset passwords).
- Marketing editor: marketing@afeem.studio — the address is only a login name, no email is ever sent. Password was set at creation (see chat); **change both password and, if wanted, recreate with his real email** (Users & password → Add a person, then Remove the old one).
- Lost password: owner resets it (Users & password → Reset). Lost owner password: set a new `SETUP_KEY`, delete the `user:<email>` key in KV, open the admin to run first-time setup again.

## 5. Everything editable (collection → effect on site)

`texts` page copy · `home` counters + featured services · `serviceCategories` (nested services, prices, FAQs, SEO) · `packages` · `offers` (homepage band, auto-expire on `validTill`) · `events` (homepage + Beauty School, hide when past) · `courses` · `journalPosts` (+cover image/OG) · `testimonials` · `transformations` (before/after) · `team` (Expert → About, Trainer → Beauty School) · `studentWork` · `galleries` (hero/page photos, bridal/school galleries, Instagram grid, homepage carousel, bridal teaser) · `branches` · `settings` (contact, social, announcement bar, GA4/GTM/Pixel/Ads IDs, Search Console, share image) · `seo` (per-page titles) · `lists` (bridal cards, journey, About departments, school journey) · `redirects` (→ `public/_redirects`).

## 6. Marketing features included

GA4 / Tag Manager / Meta Pixel / Google Ads (only loaded when an ID is set) · events: `phone_click`, `whatsapp_click`, `generate_lead` (maps to Meta `Lead`/`Contact`) · UTM + `gclid`/`fbclid` + referrer captured per session and stored with every enquiry ("Source", "Landing page") · enquiries inbox with status, notes, WhatsApp reply, CSV export · OG/WhatsApp share image · per-page SEO fields · redirects · dashboard checklist of missing marketing basics.

## 7. Known limits / gotchas

- No email/WhatsApp alert on new enquiries yet.
- No draft *preview* — changes are visible only after Publish (~2–4 min build).
- Deleting every item of a slug-routed list (all journal posts, courses, branches, service categories) may break the static build — keep at least one.
- Changing a slug after publishing changes the page URL (add a Redirect).
- KV is eventually consistent (seconds) and has free-tier write limits (1,000/day) — fine for editing; photo uploads count as writes.
- Replacing a photo requires the same format (webp→webp); otherwise save as new.
- `ALLOWED_ORIGINS`/`SITE_URL` in `wrangler.jsonc` must include any new site domain, then `npx wrangler deploy`.
- `src/content/cms/*.json` and `public/images/cms/` are build outputs — never commit them (`git checkout` them if a local `npm run cms:pull` changed them). Local builds pull the live CMS by default; `CMS_URL="" npm run build` uses built-in content.
- Editing `texts.ts`: new keys must also be added to the seed registry in `worker/afeem-cms/src/seed.json` (`_textRegistry`) and the Worker redeployed, or they won't appear in the admin.

## 8. Operations cheat-sheet

```
cd worker/afeem-cms
npx wrangler dev                    # local admin at http://127.0.0.1:8787 (uses .dev.vars)
npx wrangler deploy                 # ship admin/API changes
npx wrangler secret put <NAME>      # SESSION_SECRET | SETUP_KEY | DEPLOY_HOOK_URL
npx wrangler tail afeem-cms         # live logs
```
Rebuild the site by hand: Pages → Deployments → Retry, or press Publish in Studio.

## 9. Ideas for later (brainstorm backlog)

Priority first:
1. **Lead alerts** — Cloudflare Email Service/Routing or a WhatsApp Business API message to the front desk on each enquiry (CLAUDE.md §14/§21).
2. **Draft preview** — build previews of unpublished content (Pages preview branch or a `?preview` mode reading drafts).
3. **Custom domain** `studio.afeemspasalon.com` for the admin (+ optional Cloudflare Access in front for 2-factor).
4. **Real booking system** (§13): branch → service → expert → slot; store appointments in D1; WhatsApp confirmations/reminders.
5. **Afeem Circle loyalty + Gift cards** (§12): collections for tiers/benefits; gift-card purchase flow.
6. **Automated customer journey** (§21): booking confirmation → reminder → thank-you → review request → rebooking nudge; needs WhatsApp Business API templates.
7. **Google reviews / Instagram feed sync** instead of static grid (Graph API token stored as Worker secret).
8. **Per-service/course "Book with expert" linking** to `team` entries; expert availability.
9. **A/B-able hero text**, scheduled publishing (publish at a date/time via Cron Trigger), scheduled offers.
10. **Roles**: viewer/approver (editor drafts, owner publishes); audit log of who changed what (`by` is already stored per draft).
11. **Image tools**: bulk upload, auto-alt-text (Claude vision), focal-point cropping, R2 migration.
12. **Analytics view in Studio**: leads per source/campaign chart; export to Google Sheets.
13. **Multilingual (Hindi) copy** via a second texts registry.
14. **Backups**: nightly KV export of `live` + media to R2/Git.

## 10. File map

```
worker/afeem-cms/
  src/index.ts      API + auth + publish + media + leads
  src/seed.json     original content, text registry, built-in photo list
  admin/            index.html, style.css, schema.js (all editable fields), app.js (form engine), media.js, views.js
  wrangler.jsonc    KV binding, vars, assets
scripts/fetch-cms.mjs      build-time pull (content, photos, redirects)
src/lib/cms.ts             t(), cmsOr()      src/content/texts.ts   editable copy registry
src/data/extras.ts         offers/events/team/galleries/lists/seo   src/data/*.ts  defaults + CMS override
src/lib/leads.ts, track.ts, components/layout/Analytics.tsx   marketing + lead capture
src/components/cms/        OffersBand, EventsBand, TeamGrid
```
