/**
 * hreflang: every indexable page lists all locales + x-default with absolute URLs.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const SITE = 'https://bodycam-cheats.com';
const LOCALES = ['en', 'en-US', 'x-default'];

const ROUTES = [...new Set(Object.keys(PAGE_SEO).map((r) => (r.endsWith('/') ? r : `${r}/`)))];

const errors = [];

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

function extractHreflang(html) {
  const map = new Map();
  for (const m of html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]*>/gi)) {
    map.set(m[1].toLowerCase(), m[2]);
  }
  for (const m of html.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["'][^>]+rel=["']alternate["'][^>]*>/gi)) {
    map.set(m[1].toLowerCase(), m[2]);
  }
  return map;
}

for (const route of ROUTES) {
  const file = htmlPath(route);
  if (!fs.existsSync(file)) {
    errors.push(`${route}: missing HTML`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const expected = `${SITE}${route === '/' ? '/' : route}`;
  const tags = extractHreflang(html);

  for (const locale of LOCALES) {
    const href = tags.get(locale.toLowerCase());
    if (!href) {
      errors.push(`${route}: missing hreflang="${locale}"`);
      continue;
    }
    if (!href.startsWith('http')) {
      errors.push(`${route}: hreflang ${locale} must be absolute (got ${href})`);
    }
    if (href !== expected) {
      errors.push(`${route}: hreflang ${locale} should be ${expected}, got ${href}`);
    }
  }

  const extra = [...tags.keys()].filter((k) => !LOCALES.map((l) => l.toLowerCase()).includes(k));
  if (extra.length) {
    errors.push(`${route}: unexpected hreflang values: ${extra.join(', ')}`);
  }
}

if (errors.length) {
  console.error('audit-hreflang failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`audit-hreflang: OK (${ROUTES.length} routes, ${LOCALES.length} alternates each)`);
