/**
 * Image alt text and Bodycam asset utilization (SEO audit item 11).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const catalogPath = path.join(root, 'src', 'data', 'bodycamImages.ts');
const pagesDir = path.join(root, 'content', 'pages');

const errors = [];
const warnings = [];

const INDEXABLE = [...new Set(Object.keys(PAGE_SEO).map((r) => (r.endsWith('/') ? r : `${r}/`)))];

const BAD_ALT = /\b(placeholder|lorem|todo|replace with)\b/i;
const PLACEHOLDER_SRC = /\/images\/placeholders\//i;

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

function readCatalog() {
  const src = fs.readFileSync(catalogPath, 'utf8');
  const entries = [];
  const blockRe = /(\w+):\s*\{\s*src:\s*'([^']+)',\s*alt:\s*'([^']+)'/g;
  let m;
  while ((m = blockRe.exec(src))) {
    entries.push({ key: m[1], src: m[2], alt: m[3] });
  }
  return entries;
}

function normalizeSrc(href) {
  if (!href) return '';
  const p = href.split(/[?#]/)[0];
  return p.replace(/-\d+\.webp$/i, '.webp');
}

function mainContentHtml(html) {
  const m = html.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i);
  return m?.[1] ?? html;
}

function isDecorativeImg(tag, html, index) {
  if (/aria-hidden\s*=\s*["']true["']/i.test(tag)) return true;
  if (/role\s*=\s*["']presentation["']/i.test(tag)) return true;
  const windowStart = Math.max(0, index - 400);
  const windowEnd = Math.min(html.length, index + tag.length + 400);
  const ctx = html.slice(windowStart, windowEnd);
  if (/<a[^>]*aria-hidden\s*=\s*["']true["'][^>]*>[\s\S]*?<\/a>/i.test(ctx)) return true;
  if (
    /<button[^>]*aria-label\s*=\s*["'][^"']+["'][^>]*>[\s\S]*?<\/button>/i.test(ctx) &&
    /data-product-gallery-thumb/i.test(ctx)
  ) {
    return true;
  }
  return false;
}

function extractImgs(scope, route) {
  const re = /<img\s([^>]*?)>/gi;
  let m;
  const imgs = [];
  while ((m = re.exec(scope))) {
    const attrs = m[1];
    const tag = m[0];
    const href = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1] ?? '';
    const altMatch = attrs.match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
    const alt = altMatch ? (altMatch[2] ?? altMatch[3] ?? '') : undefined;
    imgs.push({
      route,
      tag,
      src: href,
      alt,
      index: m.index,
      decorative: isDecorativeImg(tag, scope, m.index),
    });
  }
  return imgs;
}

const catalog = readCatalog();
const catalogBySrc = new Map(catalog.map((e) => [e.src, e]));

for (const entry of catalog) {
  const publicPath = path.join(root, 'public', entry.src.replace(/^\//, ''));
  if (!fs.existsSync(publicPath)) {
    errors.push(`catalog: missing file ${entry.src}`);
  }
  const alt = entry.alt.trim();
  if (!alt) errors.push(`catalog: empty alt for ${entry.key}`);
  if (alt.length > 160) errors.push(`catalog: alt too long for ${entry.key} (${alt.length} chars)`);
  if (BAD_ALT.test(alt)) errors.push(`catalog: weak alt for ${entry.key}: ${alt}`);
}

const catalogUsed = new Map(catalog.map((e) => [e.src, new Set()]));

for (const route of INDEXABLE) {
  const file = htmlPath(route);
  if (!fs.existsSync(file)) {
    errors.push(`${route}: no built HTML (run build first)`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const scope = mainContentHtml(html);
  const imgs = extractImgs(scope, route);

  for (const img of imgs) {
    const src = normalizeSrc(img.src);
    if (!img.src) continue;

    if (img.alt === undefined) {
      errors.push(`${route}: <img> missing alt attribute (${img.src})`);
      continue;
    }

    if (!img.alt.trim()) {
      if (!img.decorative) {
        errors.push(`${route}: empty alt on non-decorative image (${normalizeSrc(img.src)})`);
      }
      continue;
    }

    const alt = img.alt.trim();
    if (alt.length < 8) errors.push(`${route}: alt too short (${alt}) for ${src}`);
    if (alt.length > 160) errors.push(`${route}: alt too long for ${src}`);
    if (BAD_ALT.test(alt)) errors.push(`${route}: placeholder-style alt for ${src}: ${alt}`);

    if (PLACEHOLDER_SRC.test(img.src) || PLACEHOLDER_SRC.test(src)) {
      errors.push(`${route}: placeholder image in indexable content (${img.src})`);
    }

    if (catalogBySrc.has(src)) {
      catalogUsed.get(src).add(route);
      const expected = catalogBySrc.get(src).alt;
      if (alt !== expected) {
        warnings.push(
          `${route}: alt differs from bodycamImages catalog for ${src} (page-specific OK if intentional)`,
        );
      }
    }
  }
}

for (const { src, key } of catalog) {
  const usedOn = catalogUsed.get(src);
  if (!usedOn?.size) {
    errors.push(`utilization: catalog image "${key}" (${src}) not used on any PAGE_SEO route`);
  }
}

for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'))) {
  const text = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const route = text.match(/^route:\s*(\S+)/m)?.[1];
  if (!route || !INDEXABLE.includes(route.endsWith('/') ? route : `${route}/`)) continue;

  for (const m of text.matchAll(/^\s*src:\s*(\S+)/gm)) {
    const src = m[1];
    if (PLACEHOLDER_SRC.test(src)) {
      errors.push(`content/pages/${file}: placeholder src on indexable route ${route}`);
    }
  }
  for (const m of text.matchAll(/^\s*alt:\s*(.+)$/gm)) {
    const alt = m[1].trim().replace(/^['"]|['"]$/g, '');
    if (BAD_ALT.test(alt)) {
      errors.push(`content/pages/${file}: weak alt on indexable route: ${alt}`);
    }
  }
}

if (warnings.length) {
  console.warn('audit-images warnings:\n' + warnings.map((w) => `  ~ ${w}`).join('\n'));
}

if (errors.length) {
  console.error('audit-images failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(
  `audit-images: OK (${catalog.length} catalog assets, ${INDEXABLE.length} indexable routes)`,
);
