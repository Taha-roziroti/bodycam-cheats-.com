/**
 * Verify Bodycam catalog images exist and alt text is present (item 11).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'src', 'data', 'bodycamImages.ts');
const src = fs.readFileSync(catalogPath, 'utf8');

const altMatches = [...src.matchAll(/alt:\s*'([^']+)'/g)];
const srcMatches = [...src.matchAll(/src:\s*'([^']+)'/g)];
const errors = [];

for (const m of srcMatches) {
  const publicPath = path.join(root, 'public', m[1].replace(/^\//, ''));
  if (!fs.existsSync(publicPath)) {
    errors.push(`missing file for ${m[1]}`);
  }
}

for (const m of altMatches) {
  const alt = m[1].trim();
  if (!alt) errors.push('empty alt in bodycamImages.ts');
  if (alt.length > 160) errors.push(`alt too long (${alt.length} chars): ${alt.slice(0, 40)}…`);
  if (/lorem|placeholder|TODO/i.test(alt)) errors.push(`placeholder alt: ${alt}`);
}

if (errors.length) {
  console.error('audit-bodycam-images failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`audit-bodycam-images: OK (${srcMatches.length} assets, ${altMatches.length} alts)`);
