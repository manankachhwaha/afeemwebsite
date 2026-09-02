import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = "C:/Users/manan/OneDrive/Desktop/afeem website";
const SRC = path.join(ROOT, "pictures/AM");
const OUT = path.join(ROOT, "public/images");

const folders = {
  "Hair cut": "hair-cut",
  "Hair Color": "hair-color",
  "hair spa": "hair-spa",
  "Nail Art": "nail-art",
  "pedicure": "pedicure",
  "Ratanada interior": "ratanada",
  "Pal road interior": "pal-road",
  "Afeem Beauty School interior": "beauty-school",
};

const isHeic = (f) => f.toLowerCase().endsWith(".heic");

async function run() {
  for (const [srcFolder, outSlug] of Object.entries(folders)) {
    const srcDir = path.join(SRC, srcFolder);
    const outDir = path.join(OUT, outSlug);
    fs.mkdirSync(outDir, { recursive: true });

    const files = fs
      .readdirSync(srcDir)
      .filter((f) => !isHeic(f))
      .sort();

    let i = 0;
    for (const file of files) {
      i++;
      const num = String(i).padStart(2, "0");
      const outPath = path.join(outDir, `${num}.jpg`);
      const srcPath = path.join(srcDir, file);
      try {
        await sharp(srcPath)
          .rotate()
          .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 78, progressive: true, mozjpeg: true })
          .toFile(outPath);
        const stat = fs.statSync(outPath);
        console.log(`${outSlug}/${num}.jpg  <-  ${file}  (${(stat.size / 1024).toFixed(0)} KB)`);
      } catch (err) {
        console.error(`FAILED: ${srcPath}: ${err.message}`);
      }
    }
  }
}

run();
