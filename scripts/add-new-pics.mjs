// Appends new photos to public/images/<slug>/ continuing existing NN.jpg numbering.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = path.resolve("../Afeem New Pics 7_10");
const OUT = path.resolve("public/images");

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

for (const [srcFolder, slug] of Object.entries(folders)) {
  const srcDir = path.join(SRC, srcFolder);
  const outDir = path.join(OUT, slug);
  let n = fs.readdirSync(outDir).filter((f) => /^\d+\.jpg$/.test(f)).length;
  for (const file of fs.readdirSync(srcDir).sort()) {
    const outPath = path.join(outDir, `${String(n + 1).padStart(2, "0")}.jpg`);
    try {
      await sharp(path.join(srcDir, file))
        .rotate()
        .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 78, progressive: true, mozjpeg: true })
        .toFile(outPath);
      n++;
      console.log(`${slug}/${path.basename(outPath)} <- ${file}`);
    } catch (e) {
      console.error(`SKIP ${srcFolder}/${file}: ${e.message}`);
    }
  }
}
