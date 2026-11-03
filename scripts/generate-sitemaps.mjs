import fs from 'node:fs';
import path from 'node:path';

const SITE_HOST = 'borderlands3cheats.com';
const SITE_URL = `https://${SITE_HOST}`;

/** Keep in sync with src/data/site.ts SITEMAP_IMAGES */
const SITEMAP_IMAGES = {
  '/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-campfire-hero-640.webp`,
      title: 'Borderlands 3 PC gameplay with ESP and soft aim overlays',
    },
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-enemy-esp-gameplay-640.webp`,
      title: 'Borderlands 3 enemy ESP gameplay overlay',
    },
  ],
  '/pricing/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-campfire-hero-640.webp`,
      title: 'Borderlands 3 cheat plans and pricing',
    },
  ],
  '/cloud-dma/': [{ loc: `${SITE_URL}/og/cloud-dma.jpg`, title: 'Cloud DMA single-PC Hyper-V setup' }],
  '/guides/cloud-dma-setup/': [
    { loc: `${SITE_URL}/og/cloud-dma-setup.jpg`, title: 'Cloud DMA setup guide' },
  ],
  '/guides/borderlands-3-cheat-system-requirements/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-soft-aim-gameplay-640.webp`,
      title: 'Borderlands 3 PC system requirements',
    },
  ],
  '/faq/': [{ loc: `${SITE_URL}/og/faq.jpg`, title: 'Borderlands 3 cheats FAQ' }],
};

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'sitemap-0.xml');

if (!fs.existsSync(source)) {
  console.error('generate-sitemaps: dist/sitemap-0.xml not found — run astro build first.');
  process.exit(1);
}

function pathnameFromLoc(loc) {
  const u = new URL(loc);
  let p = u.pathname;
  if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
  return p;
}

function injectImages(xml) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return block;
    const pathname = pathnameFromLoc(locMatch[1]);
    const images = SITEMAP_IMAGES[pathname];
    if (!images?.length) return block;
    if (block.includes('image:image')) return block;

    const imageXml = images
      .map(
        (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
    </image:image>`,
      )
      .join('\n');

    return block.replace('</url>', `${imageXml}\n  </url>`);
  });
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let raw = fs.readFileSync(source, 'utf8');
raw = raw.replace(/^<\?xml[^?]*\?\>\s*/, '');

if (!raw.includes('xmlns:image=')) {
  raw = raw.replace(
    '<urlset',
    '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
  );
}

const withImages = injectImages(raw);
const styled = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.css"?>\n${withImages}`;
const formatted = styled
  .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
  .replace(/<\/urlset>/, '\n</urlset>\n');

fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

const urlCount = (formatted.match(/<url>/g) ?? []).length;
console.log(`generate-sitemaps: ${urlCount} URLs with image namespace → dist/sitemap.xml`);

// Copy public sitemap.css into dist if present
const cssSrc = path.join(root, 'public', 'sitemap.css');
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, path.join(dist, 'sitemap.css'));
}

// Copy og + _redirects
for (const rel of ['og', '_redirects', 'robots.txt']) {
  const from = path.join(root, 'public', rel);
  const to = path.join(dist, rel);
  if (fs.existsSync(from) && fs.statSync(from).isDirectory()) {
    fs.cpSync(from, to, { recursive: true });
  }
}
