import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const brandSource = path.join(publicDir, 'brand', 'bodycam-favicon-source.jpg');
const legacySource = path.join(publicDir, 'favicon-32.png');

const source = fs.existsSync(brandSource)
  ? brandSource
  : legacySource;

if (!fs.existsSync(source)) {
  console.warn('generate-brand-icons: missing brand source or public/favicon-32.png — skipping');
  process.exit(0);
}

/** Logo art is black-backed; keep tabs/icons on true black. */
const ICON_BG = { r: 0, g: 0, b: 0, alpha: 1 };

/** Drop HUD timestamp strip so the wordmark reads at 16–32px. */
async function preparedLogo() {
  const meta = await sharp(source).rotate().metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (!w || !h) return sharp(source).rotate();

  const cropTop = Math.min(Math.round(h * 0.12), h - 2);
  const cropH = h - cropTop;
  if (cropH < 8) return sharp(source).rotate();

  return sharp(source).rotate().extract({
    left: 0,
    top: cropTop,
    width: w,
    height: cropH,
  });
}

function squarePng(prepared, size) {
  return prepared.clone().resize(size, size, {
    fit: 'contain',
    background: ICON_BG,
  }).png();
}

function pngToSingleIco(pngBuffer, dimension) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = dimension >= 256 ? 0 : dimension;
  entry[1] = dimension >= 256 ? 0 : dimension;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

const base = await preparedLogo();
await squarePng(base, 32).toFile(path.join(publicDir, 'favicon-32.png'));
await squarePng(base, 16).toFile(path.join(publicDir, 'favicon-16.png'));
await squarePng(base, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));

const png32 = await squarePng(base, 32).toBuffer();
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), pngToSingleIco(png32, 32));

const base64 = png32.toString('base64');
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Bodycam">
  <rect width="32" height="32" fill="#000"/>
  <image href="data:image/png;base64,${base64}" width="32" height="32"/>
</svg>
`;
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');

const label = source.includes('bodycam-favicon-source')
  ? 'public/brand/bodycam-favicon-source.jpg'
  : 'public/favicon-32.png';
console.log(`Brand icons generated from ${label}`);
