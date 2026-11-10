/**
 * Keep content/pages frontmatter seoTitle + metaDescription aligned with PAGE_SEO.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'content', 'pages');

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const full = path.join(dir, file);
  let raw = fs.readFileSync(full, 'utf8');
  const route = raw.match(/^route:\s*(.+)$/m)?.[1]?.trim();
  if (!route) continue;
  const normalized = route.endsWith('/') ? route : `${route}/`;
  const entry = PAGE_SEO[normalized];
  if (!entry) continue;
  const quote = (s) => `'${s.replace(/'/g, "''")}'`;
  raw = raw.replace(/^seoTitle:\s*.+$/m, `seoTitle: ${quote(entry.title)}`);
  raw = raw.replace(/^metaDescription:\s*.+$/m, `metaDescription: ${quote(entry.description)}`);
  fs.writeFileSync(full, raw);
}

console.log('sync-page-frontmatter: OK');
