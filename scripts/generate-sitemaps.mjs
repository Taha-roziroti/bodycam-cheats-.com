import fs from 'node:fs';
import path from 'node:path';

const SITE_HOST = 'bodycam-cheats.com';
const SITE_URL = `https://${SITE_HOST}`;

/** Keep in sync with src/data/site.ts SITEMAP_IMAGES */
const SITEMAP_IMAGES = {
  '/': [
    {
      loc: `${SITE_URL}/images/bodycam/bodycam-hero.webp`,
      title: 'Bodycam cheats hero — tactical bodycam operators',
    },
    {
      loc: `${SITE_URL}/images/bodycam/bodycam-esp-indoor-cyan.webp`,
      title: 'Bodycam ESP with cyan player boxes indoors',
    },
  ],
  '/bodycam-cheats-price/': [
    { loc: `${SITE_URL}/og/pricing.jpg`, title: 'Bodycam cheats pricing plans' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-esp-warehouse.webp`, title: 'Bodycam ESP warehouse gameplay' },
  ],
  '/bodycam-aimbot/': [
    { loc: `${SITE_URL}/images/bodycam/bodycam-menu-aimbot.webp`, title: 'Bodycam aimbot menu settings' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-aimbot-fov-snapline.webp`, title: 'Bodycam aimbot FOV and snapline' },
  ],
  '/bodycam-esp/': [
    { loc: `${SITE_URL}/images/bodycam/bodycam-menu-visuals.webp`, title: 'Bodycam Visuals ESP menu' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-esp-forest-cyan.webp`, title: 'Bodycam skeleton ESP outdoors' },
  ],
  '/bodycam-requirements/': [
    { loc: `${SITE_URL}/images/bodycam/bodycam-pov-hallway.webp`, title: 'Bodycam in-game bodycam POV' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-esp-scope.webp`, title: 'Bodycam scoped ESP overlay' },
  ],
  '/cloud-dma-for-bodycam/': [
    { loc: `${SITE_URL}/og/cloud-dma.jpg`, title: 'Cloud DMA for Bodycam' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-hero.webp`, title: 'Bodycam product overview' },
  ],
  '/guides/cloud-dma-setup/': [
    { loc: `${SITE_URL}/og/cloud-dma-setup.jpg`, title: 'Cloud DMA Hyper-V setup guide' },
    { loc: `${SITE_URL}/images/bodycam/bodycam-pov-hallway.webp`, title: 'Bodycam tactical POV reference' },
  ],
};

const root = process.cwd();
const dist = path.join(root, 'dist');
const source = path.join(dist, 'sitemap-0.xml');
const lastmodPath = path.join(root, 'src', 'data', 'sitemap-lastmod.json');
const routeLastmod = fs.existsSync(lastmodPath)
  ? JSON.parse(fs.readFileSync(lastmodPath, 'utf8'))
  : {};

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

function applyRouteLastmod(xml) {
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return block;
    let pathname;
    try {
      pathname = new URL(locMatch[1]).pathname;
      if (pathname !== '/' && !pathname.endsWith('/')) pathname = `${pathname}/`;
    } catch {
      return block;
    }
    const date = routeLastmod[pathname];
    if (!date) return block;
    const iso = date.includes('T')
      ? date.endsWith('Z')
        ? date
        : `${date}Z`
      : `${date}T12:00:00.000Z`;
    if (block.includes('<lastmod>')) {
      return block.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${iso}</lastmod>`);
    }
    return block.replace('</url>', `  <lastmod>${iso}</lastmod>\n  </url>`);
  });
}

let raw = fs.readFileSync(source, 'utf8');
raw = raw.replace(/^<\?xml[^?]*\?\>\s*/, '');

if (!raw.includes('xmlns:image=')) {
  raw = raw.replace(
    '<urlset',
    '<urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
  );
}

const withImages = applyRouteLastmod(injectImages(raw));
const styled = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.css"?>\n${withImages}`;
const formatted = styled
  .replace(/<urlset([^>]*)>/, '<urlset$1>\n')
  .replace(/<\/urlset>/, '\n</urlset>\n');

fs.writeFileSync(path.join(dist, 'sitemap.xml'), formatted, 'utf8');
fs.writeFileSync(path.join(dist, 'sitemap-0.xml'), formatted, 'utf8');

const urlCount = (formatted.match(/<url>/g) ?? []).length;
console.log(`generate-sitemaps: ${urlCount} URLs with image namespace → dist/sitemap.xml`);

const cssSrc = path.join(root, 'public', 'sitemap.css');
if (fs.existsSync(cssSrc)) {
  fs.copyFileSync(cssSrc, path.join(dist, 'sitemap.css'));
}

for (const rel of ['og', '_redirects', 'robots.txt']) {
  const from = path.join(root, 'public', rel);
  const to = path.join(dist, rel);
  if (fs.existsSync(from) && fs.statSync(from).isDirectory()) {
    fs.cpSync(from, to, { recursive: true });
  }
}
