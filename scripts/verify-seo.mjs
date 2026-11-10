import fs from 'node:fs';
import path from 'node:path';

const SITE_HOST = 'bodycam-cheats.com';
const SITE_URL = `https://${SITE_HOST}`;

const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/bodycam-aimbot/',
  '/bodycam-esp/',
  '/bodycam-cheats-price/',
  '/bodycam-requirements/',
  '/cloud-dma-for-bodycam/',
];

const dist = path.join(process.cwd(), 'dist');
const errors = [];

function readHtml(relativePath) {
  const file = path.join(dist, relativePath === '/' ? 'index.html' : `${relativePath}index.html`);
  if (!fs.existsSync(file)) {
    errors.push(`Missing built page: ${relativePath}`);
    return null;
  }
  return fs.readFileSync(file, 'utf8');
}

function checkPage(route) {
  const html = readHtml(route);
  if (!html) return;

  const canonical = `${SITE_URL}${route === '/' ? '/' : route}`;
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) {
    errors.push(`${route}: canonical must be ${canonical}`);
  }

  if (!html.includes('rel="image_src"')) {
    errors.push(`${route}: missing rel=image_src`);
  }

  if (!html.includes('property="og:image:width" content="1200"')) {
    errors.push(`${route}: og:image:width must be 1200`);
  }

  if (!html.includes('property="og:image:height" content="630"')) {
    errors.push(`${route}: og:image:height must be 630`);
  }

  if (!html.includes(`${SITE_URL}/og/`)) {
    errors.push(`${route}: og:image must use ${SITE_URL}/og/*.jpg`);
  }

  if (html.includes('name="keywords"')) {
    errors.push(`${route}: meta keywords must not be present`);
  }

  if (html.includes('SearchAction')) {
    errors.push(`${route}: SearchAction JSON-LD is not allowed`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) {
    errors.push(`${route}: expected exactly one h1, found ${h1Count}`);
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const ogTitleMatch = html.match(/property="og:title" content="([^"]*)"/i);
  const descMatch = html.match(/name="description" content="([^"]*)"/i);
  const ogDescMatch = html.match(/property="og:description" content="([^"]*)"/i);

  if (titleMatch && ogTitleMatch && titleMatch[1] !== ogTitleMatch[1]) {
    errors.push(`${route}: og:title must match <title>`);
  }
  if (descMatch && ogDescMatch && descMatch[1] !== ogDescMatch[1]) {
    errors.push(`${route}: og:description must match meta description`);
  }

  const expected = `${SITE_URL}${route === '/' ? '/' : route}`;
  for (const lang of ['en', 'en-US', 'x-default']) {
    if (!html.includes(`hreflang="${lang}" href="${expected}"`)) {
      errors.push(`${route}: missing or wrong hreflang=${lang} → ${expected}`);
    }
  }

  if (html.includes('FAQPage')) {
    errors.push(`${route}: FAQPage JSON-LD must not appear on money pages (only /faq/)`);
  }

  if (!html.includes('"@type":"Organization"') && !html.includes('"@type": "Organization"')) {
    errors.push(`${route}: missing Organization JSON-LD`);
  }

  return {
    title: titleMatch?.[1] ?? '',
    description: descMatch?.[1] ?? '',
  };
}

const titles = new Map();
const descriptions = new Map();
for (const route of INDEXABLE_MONEY_ROUTES) {
  const meta = checkPage(route);
  if (!meta) continue;
  if (meta.title) {
    const other = titles.get(meta.title);
    if (other) errors.push(`Duplicate <title> on ${route} and ${other}: "${meta.title}"`);
    else titles.set(meta.title, route);
  }
  if (meta.description) {
    const other = descriptions.get(meta.description);
    if (other) errors.push(`Duplicate meta description on ${route} and ${other}`);
    else descriptions.set(meta.description, route);
  }
}

const faqHtml = readHtml('/faq/');
if (!faqHtml) {
  errors.push('Missing built page: /faq/');
} else if (!faqHtml.includes('FAQPage')) {
  errors.push('/faq/: must include FAQPage JSON-LD');
}

const robotsPath = path.join(dist, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  errors.push('dist/robots.txt missing');
} else {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    errors.push('robots.txt must reference sitemap.xml on apex host');
  }
}

if (errors.length) {
  console.error('verify-seo failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`verify-seo: OK (${INDEXABLE_MONEY_ROUTES.length} money pages + sitemap/robots)`);
