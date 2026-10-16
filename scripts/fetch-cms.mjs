/**
 * Pulls the published CMS content into the site before it is built.
 *
 *   CMS_URL=https://afeem-cms.<account>.workers.dev node scripts/fetch-cms.mjs
 *
 * - writes one JSON file per collection to src/content/cms/ (a `null` file
 *   means "use the defaults baked into the code")
 * - downloads every CMS-uploaded photo into public/images/cms/ so the live
 *   site never depends on the CMS being up, then rewrites those URLs
 * - writes public/_redirects from the "Redirects" section
 *
 * With no CMS_URL (local dev, or before the CMS exists) it does nothing and
 * the site builds from its built-in content. With CMS_URL set, any failure
 * FAILS the build on purpose, so a CMS outage can never publish a version
 * of the site that silently reverts everyone's edits.
 */
import { mkdir, writeFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cmsDir = path.join(root, "src/content/cms");
const imgDir = path.join(root, "public/images/cms");
// Defaults to the live Afeem Studio; set CMS_URL="" to build from the built-in content instead.
const base = (process.env.CMS_URL ?? "https://afeem-cms.manankachhwaha.workers.dev").replace(/\/+$/, "");

if (!base) {
  console.log("[cms] CMS_URL not set — using built-in content.");
  process.exit(0);
}

const res = await fetch(`${base}/public/content.json`, { headers: { "cache-control": "no-cache" } });
if (!res.ok) throw new Error(`[cms] could not fetch content (${res.status})`);
const data = await res.json();
const keys = Object.keys(data);
if (!keys.length) {
  console.log("[cms] nothing published yet — using built-in content.");
  process.exit(0);
}

// 1. download media, rewrite URLs
let json = JSON.stringify(data);
const ids = new Set();
const mediaRe = /https?:\/\/[^"\\\s]+\/media\/([A-Za-z0-9_-]+\.(?:webp|jpg|png|gif))/g;
for (const m of json.matchAll(mediaRe)) ids.add(m[1]);
await mkdir(imgDir, { recursive: true });
for (const f of await readdir(imgDir)) await rm(path.join(imgDir, f), { force: true });
for (const id of ids) {
  const r = await fetch(`${base}/media/${id}`);
  if (!r.ok) throw new Error(`[cms] could not download photo ${id} (${r.status})`);
  await writeFile(path.join(imgDir, id), Buffer.from(await r.arrayBuffer()));
}
json = json.replace(mediaRe, (_m, id) => `/images/cms/${id}`);
const content = JSON.parse(json);

// 2. per-collection files
await mkdir(cmsDir, { recursive: true });
for (const [k, v] of Object.entries(content)) {
  if (!/^[A-Za-z]+$/.test(k)) continue;
  await writeFile(path.join(cmsDir, `${k}.json`), JSON.stringify(v));
}

// 3. redirects (Cloudflare Pages _redirects file)
const redirects = Array.isArray(content.redirects) ? content.redirects : [];
const lines = redirects
  .filter((r) => r && /^\/[^\s]*$/.test(r.from || "") && /^(\/|https?:\/\/)[^\s]*$/.test(r.to || ""))
  .map((r) => `${r.from} ${r.to} 301`);
await writeFile(path.join(root, "public/_redirects"), lines.join("\n") + (lines.length ? "\n" : ""));

console.log(`[cms] pulled ${keys.length} collections, ${ids.size} photos, ${lines.length} redirects.`);
