import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const widths = [320, 400, 512, 640, 960];
const dirs = [
  'public/images/gameplay',
  'public/images/blog',
  'public/images/borderlands3',
];

async function optimizeDir(relativeDir, { pngOnly = true } = {}) {
  const dir = path.join(root, relativeDir);
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir).filter((file) => {
    if (/-\d+\.webp$/i.test(file)) return false;
    if (pngOnly) return /\.png$/i.test(file);
    return /\.(png|webp)$/i.test(file);
  });

  for (const file of files) {
    const input = path.join(dir, file);
    const base = file.replace(/\.(png|webp)$/i, '');

    for (const width of widths) {
      const output = path.join(dir, `${base}-${width}.webp`);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log(`Wrote ${path.relative(root, output)}`);
    }
  }
}

for (const dir of dirs) {
  const pngOnly = dir !== 'public/images/borderlands3';
  await optimizeDir(dir, { pngOnly });
}

console.log('Image optimization complete.');
