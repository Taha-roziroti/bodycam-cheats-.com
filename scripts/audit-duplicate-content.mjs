/**
 * Detect duplicate SEO meta, repeated paragraphs, and boilerplate copy across indexable pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const errors = [];

const INDEXABLE = [...new Set(Object.keys(PAGE_SEO).map((r) => (r.endsWith('/') ? r : `${r}/`)))];

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

function normalizeParagraph(s) {
  return s
    .replace(/\s+/g, ' ')
    .replace(/&amp;/g, '&')
  .trim()
    .toLowerCase();
}

function extractMeta(html, name) {
  const re =
    name === 'title'
      ? /<title>([^<]*)<\/title>/i
      : new RegExp(`name="${name}" content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m?.[1] ?? '';
}

function proseParagraphs(html) {
  const blocks = [];
  const re = /<(?:p|h2)[^>]*>([^<]+(?:<[^>]+>[^<]*)*)<\/(?:p|h2)>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, ' ').trim();
    if (text.length >= 80) blocks.push(normalizeParagraph(text));
  }
  return blocks;
}

const titles = new Map();
const descriptions = new Map();
const paragraphIndex = new Map();

for (const route of INDEXABLE) {
  const file = htmlPath(route);
  if (!fs.existsSync(file)) {
    errors.push(`${route}: missing built HTML`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const title = extractMeta(html, 'title');
  const desc = extractMeta(html, 'description');

  if (titles.has(title)) {
    errors.push(`duplicate <title> on ${route} and ${titles.get(title)}: "${title}"`);
  } else titles.set(title, route);

  if (descriptions.has(desc)) {
    errors.push(`duplicate meta description on ${route} and ${descriptions.get(desc)}`);
  } else descriptions.set(desc, route);

  for (const para of proseParagraphs(html)) {
    if (paragraphIndex.has(para)) {
      const other = paragraphIndex.get(para);
      if (other !== route) {
        errors.push(`duplicate paragraph text on ${route} and ${other}: "${para.slice(0, 72)}…"`);
      }
    } else paragraphIndex.set(para, route);
  }
}

// Frontmatter vs PAGE_SEO drift
const pagesDir = path.join(root, 'content', 'pages');
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  const routeM = raw.match(/^route:\s*(.+)$/m);
  if (!routeM) continue;
  let route = routeM[1].trim();
  if (!route.endsWith('/')) route = `${route}/`;
  const entry = PAGE_SEO[route];
  if (!entry) continue;
  const titleM = raw.match(/^seoTitle:\s*(.+)$/m);
  const descM = raw.match(/^metaDescription:\s*(.+)$/m);
  const strip = (s) => s.replace(/^['"]|['"]$/g, '').trim();
  if (titleM && strip(titleM[1]) !== entry.title) {
    errors.push(`content/pages/${file}: seoTitle differs from pageSeo.ts for ${route}`);
  }
  if (descM && strip(descM[1]) !== entry.description) {
    errors.push(`content/pages/${file}: metaDescription differs from pageSeo.ts for ${route}`);
  }
}

// Duplicate prose blocks in content markdown (ignore frontmatter, headings, list items)
const mdParagraphs = new Map();
for (const file of fs.readdirSync(pagesDir).filter((f) => f.endsWith('.md'))) {
  const body = fs
    .readFileSync(path.join(pagesDir, file), 'utf8')
    .replace(/^---[\s\S]*?---/m, '')
    .replace(/^#+\s.+$/gm, '')
    .replace(/^\|.+\|$/gm, '')
    .replace(/^[-*]\s.+$/gm, '');
  for (const block of body.split(/\n\s*\n/)) {
    const text = block.replace(/\[[^\]]+\]\([^)]+\)/g, '$1').replace(/[#*_`]/g, '').trim();
    if (text.length < 100) continue;
    const norm = normalizeParagraph(text);
    if (mdParagraphs.has(norm)) {
      errors.push(
        `duplicate markdown paragraph in content/pages/${file} and ${mdParagraphs.get(norm)}: "${norm.slice(0, 72)}…"`,
      );
    } else mdParagraphs.set(norm, file);
  }
}

// Duplicate FAQ answers (site + bodycam catalogs)
const faqSources = [
  path.join(root, 'src', 'data', 'faq.ts'),
  path.join(root, 'src', 'data', 'bodycamPageFaqs.ts'),
];
const faqAnswers = new Map();
for (const src of faqSources) {
  const text = fs.readFileSync(src, 'utf8');
  for (const m of text.matchAll(/\n\s+a:\s*(?:`|'|")?([^'`"\n]{40,})/g)) {
    const norm = normalizeParagraph(m[1]);
    if (faqAnswers.has(norm)) {
      errors.push(`duplicate FAQ answer text in ${path.basename(src)} and ${faqAnswers.get(norm)}`);
    } else faqAnswers.set(norm, path.basename(src));
  }
}

if (errors.length) {
  console.error('audit-duplicate-content failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(
  `audit-duplicate-content: OK (${INDEXABLE.length} routes, ${paragraphIndex.size} HTML paragraphs, ${mdParagraphs.size} markdown blocks)`,
);
