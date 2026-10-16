# Afeem Studio (CMS)

A Cloudflare Worker that serves the admin panel (`admin/`) and its API. Marketing logs in with email + password, edits content/photos, presses **Publish**, and the Cloudflare Pages site rebuilds with the new content.

```
Marketing ──► Afeem Studio (this Worker: login, drafts, photos, enquiries)
                    │  Publish → Pages deploy hook
                    ▼
Cloudflare Pages build: scripts/fetch-cms.mjs pulls /public/content.json + photos → static site
```

Nothing the visitor loads depends on the CMS; if it is down the live site is unaffected, and builds fail (instead of reverting edits) if the CMS is unreachable.

## One-time deployment

Run in `worker/afeem-cms`:

1. `npm install`
2. `npx wrangler kv namespace create CMS_KV` → paste the printed `id` into `wrangler.jsonc`
3. Secrets (each prompts for the value):
   - `npx wrangler secret put SESSION_SECRET` — any long random string (40+ chars)
   - `npx wrangler secret put SETUP_KEY` — a one-time key used to create the owner account
   - `npx wrangler secret put DEPLOY_HOOK_URL` — Cloudflare dashboard → Pages → afeem-website → Settings → Builds → *Deploy hooks* → create one (branch `main`) and paste its URL
4. `npx wrangler deploy` → note the URL, e.g. `https://afeem-cms.<account>.workers.dev`
5. Open that URL → create the owner account (uses `SETUP_KEY`) → **Users & password → Add a person** for the marketing teammate (copy the generated login details to send them).
6. Cloudflare Pages → afeem-website → Settings → Environment variables (Production): add `CMS_URL` = the Worker URL. Push any commit (or hit the deploy hook) — the site now builds from CMS content.
7. If the site domain changes, update `ALLOWED_ORIGINS` / `SITE_URL` in `wrangler.jsonc` and redeploy.

Local test: copy `.dev.vars.example` to `.dev.vars`, `npx wrangler dev`.

## How content flows

- Collections (services, offers, texts…) are stored as drafts in KV. **Save** = draft. **Publish** = snapshot (last 15 kept, restorable from the Dashboard) + Pages deploy hook.
- `src/content/cms/*.json` is generated at build and holds `null` in git (= use the code defaults). Never commit pulled content.
- CMS photos are downloaded into `public/images/cms/` at build, so the live site serves them itself.
- To make more copy editable: add an entry to `src/content/texts.ts`, use `t("key")`, then regenerate the registry in `src/seed.json` (`_textRegistry`).
- Website forms POST to `/api/leads` (needs `CMS_URL` at build) → Enquiries inbox + CSV export.

## Security notes

PBKDF2-SHA256 password hashes; HttpOnly + Secure + SameSite=Strict session cookie (12 h); custom-header CSRF check; login rate limiting; CSP on the admin; uploads limited to image types ≤ 2.5 MB (the admin resizes before upload).
