import fs from 'node:fs';
import path from 'node:path';

const SITE_HOST = 'borderlands3cheats.com';
const SITE_URL = `https://${SITE_HOST}`;

const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/pricing/',
  '/cloud-dma/',
  '/guides/cloud-dma-setup/',
  '/guides/borderlands-3-cheat-system-requirements/',
  '/faq/',
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

  if (!html.includes('"@type":"Organization"') && !html.includes('"@type": "Organization"')) {
    errors.push(`${route}: missing Organization JSON-LD`);
  }
  if (!html.includes('"@type":"WebSite"') && !html.includes('"@type": "WebSite"')) {
    errors.push(`${route}: missing WebSite JSON-LD`);
  }
}

const titles = new Map();

for (const route of INDEXABLE_MONEY_ROUTES) {
  checkPage(route);
  const html = readHtml(route);
  if (!html) continue;
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    if (titles.has(title)) {
      errors.push(`Duplicate title "${title}" on ${titles.get(title)} and ${route}`);
    } else {
      titles.set(title, route);
    }
  }
}

const sitemapPath = path.join(dist, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  errors.push('dist/sitemap.xml missing');
} else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemap.includes('image:image')) {
    errors.push('sitemap.xml must include at least one image:image entry');
  }
  if (!sitemap.includes('<?xml-stylesheet')) {
    errors.push('sitemap.xml must reference sitemap.css stylesheet');
  }
  if (sitemap.includes('dotacheats.com')) {
    errors.push('sitemap.xml must not reference dotacheats.com');
  }
}

const robots = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  errors.push('robots.txt must point to apex sitemap');
}

if (errors.length) {
  console.error('verify-seo failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`verify-seo: OK (${INDEXABLE_MONEY_ROUTES.length} money pages + sitemap/robots)`);
