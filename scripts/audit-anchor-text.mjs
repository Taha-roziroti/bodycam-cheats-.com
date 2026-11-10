/**
 * Detect redundant internal anchors: same text → different URLs, or repeated generic anchors sitewide.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const errors = [];
const warnings = [];

const INDEXABLE = [...new Set(Object.keys(PAGE_SEO).map((r) => (r.endsWith('/') ? r : `${r}/`)))];

const GENERIC_ANCHORS = new Set([
  'read more',
  'learn more',
  'click here',
  'here',
  'details',
  'view details',
  'setup guide',
  'system requirements',
  'pricing',
  'pricing page',
  'requirements',
  'cloud dma',
]);

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

function normalizeAnchor(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
    .trim()
    .toLowerCase();
}

function normalizeHref(href) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return null;
  }
  if (href.startsWith('#') || href.startsWith('/go/')) return null;
  let p = href.split(/[?#]/)[0];
  if (!p.startsWith('/')) p = `/${p}`;
  if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
  return p;
}

function mainContentHtml(html) {
  const m = html.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i);
  return m?.[1] ?? html;
}

function extractAnchors(html) {
  const out = [];
  const re = /<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const scope = mainContentHtml(html);
  while ((m = re.exec(scope))) {
    const href = normalizeHref(m[1]);
    if (!href) continue;
    const tag = m[0];
    const aria = tag.match(/aria-label="([^"]+)"/i)?.[1];
    const text = (aria ?? m[2].replace(/<[^>]+>/g, '')).trim();
    if (!text || text.length < 2) continue;
    out.push({ href, text: normalizeAnchor(text), raw: text });
  }
  return out;
}

// Site-wide: anchor text → destinations
const anchorToHrefs = new Map();
const hrefAnchorCounts = new Map();
const perPageDupes = [];

for (const route of INDEXABLE) {
  const file = htmlPath(route);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const anchors = extractAnchors(html);
  const seenOnPage = new Map();

  for (const { href, text, raw } of anchors) {
    const dests = anchorToHrefs.get(text) ?? new Set();
    dests.add(href);
    anchorToHrefs.set(text, dests);

    const key = `${href}|${text}`;
    const count = (hrefAnchorCounts.get(key) ?? 0) + 1;
    hrefAnchorCounts.set(key, count);

    const pageKey = `${text}|${href}`;
    seenOnPage.set(pageKey, (seenOnPage.get(pageKey) ?? 0) + 1);
  }

  for (const [key, n] of seenOnPage) {
    if (n > 1) {
      const [text, href] = key.split('|');
      perPageDupes.push({ route, text, href, n });
    }
  }

  if (GENERIC_ANCHORS.size) {
    for (const { text, href, raw } of anchors) {
      if (GENERIC_ANCHORS.has(text)) {
        warnings.push(
          `${route}: generic anchor "${raw}" → ${href} (use a descriptive, unique phrase)`,
        );
      }
    }
  }
}

for (const [text, hrefs] of anchorToHrefs) {
  if (hrefs.size > 1) {
    errors.push(
      `anchor conflict: "${text}" points to ${[...hrefs].join(', ')} (one phrase must not target multiple URLs)`,
    );
  }
}

for (const [key, count] of hrefAnchorCounts) {
  if (count >= 10) {
    const [href, text] = key.split('|');
    warnings.push(`sitewide redundancy: "${text}" → ${href} appears ${count} times (vary anchor text)`);
  }
}

for (const d of perPageDupes) {
  errors.push(
    `${d.route}: repeated anchor "${d.text}" → ${d.href} on the same page (${d.n}×)`,
  );
}

// Source: markdown + faq.ts link() definitions
const pagesDir = path.join(root, 'content', 'pages');
const mdAnchorMap = new Map();
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'))) {
  const body = fs.readFileSync(path.join(pagesDir, file), 'utf8').replace(/^---[\s\S]*?---/m, '');
  for (const m of body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const href = normalizeHref(m[2]);
    if (!href) continue;
    const text = normalizeAnchor(m[1]);
    const dests = mdAnchorMap.get(text) ?? new Set();
    dests.add(`${file}:${href}`);
    mdAnchorMap.set(text, dests);
  }
}

for (const [text, dests] of mdAnchorMap) {
  const hrefs = new Set([...dests].map((d) => d.split(':')[1]));
  if (hrefs.size > 1) {
    errors.push(`markdown anchor conflict: "${text}" → ${[...hrefs].join(', ')}`);
  }
}

const faqSrc = fs.readFileSync(path.join(root, 'src', 'data', 'faq.ts'), 'utf8');
const faqMap = new Map();
for (const m of faqSrc.matchAll(/link\('([^']+)',\s*'([^']+)'\)/g)) {
  const text = normalizeAnchor(m[1]);
  const href = normalizeHref(m[2]);
  if (!href) continue;
  const dests = faqMap.get(text) ?? new Set();
  dests.add(href);
  faqMap.set(text, dests);
}
for (const m of faqSrc.matchAll(/link\("([^"]+)",\s*'([^']+)'\)/g)) {
  const text = normalizeAnchor(m[1]);
  const href = normalizeHref(m[2]);
  if (!href) continue;
  const dests = faqMap.get(text) ?? new Set();
  dests.add(href);
  faqMap.set(text, dests);
}

for (const [text, hrefs] of faqMap) {
  if (hrefs.size > 1) {
    errors.push(`faq.ts anchor conflict: "${text}" → ${[...hrefs].join(', ')}`);
  }
}

if (warnings.length) {
  console.warn('audit-anchor-text warnings:\n' + warnings.map((w) => `  ~ ${w}`).join('\n'));
}

if (errors.length) {
  console.error('audit-anchor-text failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`audit-anchor-text: OK (${INDEXABLE.length} routes, ${anchorToHrefs.size} unique anchors)`);
