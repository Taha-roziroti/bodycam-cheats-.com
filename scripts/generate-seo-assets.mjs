import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const ogDir = path.join(root, 'public', 'og');
const heroSource = path.join(root, 'public', 'images', 'bodycam', 'bodycam-hero.webp');

const outputs = [
  'default.jpg',
  'home.jpg',
  'pricing.jpg',
  'cloud-dma.jpg',
  'cloud-dma-setup.jpg',
  'requirements.jpg',
  'faq.jpg',
];

if (!fs.existsSync(heroSource)) {
  console.warn('generate-seo-assets: missing placeholder hero — skipping OG regeneration');
  process.exit(0);
}

fs.mkdirSync(ogDir, { recursive: true });

for (const file of outputs) {
  const out = path.join(ogDir, file);
  await sharp(heroSource)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(out);
  console.log(`Wrote ${path.relative(root, out)}`);
}

console.log('SEO OG assets complete.');
