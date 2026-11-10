/**
 * Headings should be proportionate to prose volume (no heading-heavy thin sections).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const pagesDir = path.join(root, 'content', 'pages');

const errors = [];
const warnings = [];

const INDEXABLE = [...new Set(Object.keys(PAGE_SEO).map((r) => (r.endsWith('/') ? r : `${r}/`)))];

const MIN_WORDS_PER_H2 = 70;
const WORDS_PER_H2_BUDGET = 220;
const MIN_WORDS_PER_H3 = 40;

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(text) {
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function extractProseBlock(html) {
  const main = html.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
  const m = main.match(/<div[^>]*class="[^"]*content-markdown[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  return m?.[1] ?? null;
}

function contentPageRouteByFile(file) {
  const raw = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const route = raw.match(/^route:\s*(\S+)/m)?.[1];
  if (!route) return null;
  return route.endsWith('/') ? route : `${route}/`;
}

const CONTENT_ROUTES = new Set(
  fs
    .readdirSync(pagesDir)
    .filter((f) => f.endsWith('.md'))
    .map(contentPageRouteByFile)
    .filter(Boolean),
);

function headingStats(proseHtml) {
  const h1 = (proseHtml.match(/<h1\b/gi) ?? []).length;
  const h2 = (proseHtml.match(/<h2\b/gi) ?? []).length;
  const h3 = (proseHtml.match(/<h3\b/gi) ?? []).length;
  const words = countWords(stripTags(proseHtml));
  return { h1, h2, h3, words };
}

function isProceduralRoute(route, proseHtml) {
  if (route.includes('/guides/') && route.includes('setup')) return true;
  return /step\s*1|step\s*2/i.test(proseHtml) || /## step/i.test(proseHtml);
}

function auditRoute(route, stats, procedural) {
  const { h1, h2, h3, words } = stats;
  if (words < 80 && h2 + h3 > 0) {
    errors.push(`${route}: ${h2} h2 / ${h3} h3 but only ${words} words in content-markdown`);
    return;
  }

  const maxH2 = procedural
    ? Math.max(4, Math.ceil(words / 350))
    : Math.max(2, Math.ceil(words / WORDS_PER_H2_BUDGET));

  if (h2 > maxH2) {
    errors.push(
      `${route}: ${h2} h2 headings for ${words} words (max ${maxH2} — merge sections or add copy)`,
    );
  }

  if (h2 > 0 && words / h2 < MIN_WORDS_PER_H2 && !procedural) {
    errors.push(
      `${route}: ~${Math.round(words / h2)} words per h2 (min ${MIN_WORDS_PER_H2}) — thin sections`,
    );
  }

  if (h3 > 0 && words / h3 < MIN_WORDS_PER_H3 && procedural) {
    warnings.push(`${route}: h3 steps are very short — consider folding steps into numbered lists`);
  }

  if (h1 > 1) {
    errors.push(`${route}: multiple h1 in content-markdown (${h1})`);
  }
}

const audited = [];

for (const route of INDEXABLE) {
  if (!CONTENT_ROUTES.has(route)) continue;
  const file = htmlPath(route);
  if (!fs.existsSync(file)) {
    errors.push(`${route}: no built HTML`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const prose = extractProseBlock(html);
  if (!prose?.trim()) {
    errors.push(`${route}: content-markdown block missing in build output`);
    continue;
  }
  const stats = headingStats(prose);
  const procedural = isProceduralRoute(route, prose);
  auditRoute(route, stats, procedural);
  audited.push(route);
}

if (warnings.length) {
  console.warn('audit-heading-density warnings:\n' + warnings.map((w) => `  ~ ${w}`).join('\n'));
}

if (errors.length) {
  console.error('audit-heading-density failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`audit-heading-density: OK (${audited.length} content routes)`);
