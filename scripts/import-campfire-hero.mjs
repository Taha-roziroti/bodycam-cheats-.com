import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const src = path.join(
  root,
  'public',
  'images',
  'borderlands3',
  'borderlands-3-campfire-hero-source.jpg',
);
const dir = path.join(root, 'public', 'images', 'borderlands3');
const base = 'borderlands-3-campfire-hero';
const widths = [320, 400, 512, 640, 960];

if (!fs.existsSync(src)) {
  console.error('Missing source:', src);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const master = path.join(dir, `${base}.webp`);
await sharp(src).webp({ quality: 85, effort: 4 }).toFile(master);
console.log(`Wrote ${path.relative(root, master)}`);

for (const width of widths) {
  const output = path.join(dir, `${base}-${width}.webp`);
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);
  console.log(`Wrote ${path.relative(root, output)}`);
}
