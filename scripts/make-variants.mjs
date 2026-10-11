// Build-time responsive image variants for the static export (no image server
// exists on Cloudflare Pages). For every /public/images/**/NAME.(jpg|png) this
// writes NAME-320.webp … NAME-1280.webp, which src/lib/imageLoader.ts maps to.
// Generated files are gitignored; this runs from `prebuild` and is incremental.
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
const WIDTHS = [320, 640, 960, 1280];

function* walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(name)) yield p;
  }
}

let made = 0;
for (const file of walk(ROOT)) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const srcTime = fs.statSync(file).mtimeMs;
  for (const w of WIDTHS) {
    const out = `${base}-${w}.webp`;
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out);
    made++;
  }
}
console.log(`make-variants: wrote ${made} files`);
