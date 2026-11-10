/**
 * Static performance guardrails (HTML weight, cacheable CSS, LCP hints).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PAGE_SEO } from '../src/config/pageSeo.ts';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const MAX_HTML_KB_DEFAULT = 95;
const MAX_HTML_KB_HOME = 230;
const errors = [];
const warnings = [];

const MONEY = ['/', ...Object.keys(PAGE_SEO).filter((r) => r !== '/')];

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\//, '').replace(/\/$/, ''), 'index.html');
}

const cssFiles = fs.existsSync(path.join(dist, '_astro'))
  ? fs.readdirSync(path.join(dist, '_astro')).filter((f) => f.endsWith('.css'))
  : [];

if (!cssFiles.length) {
  warnings.push('no external CSS in dist/_astro (inlineStylesheets may still be inlining everything)');
}

for (const route of MONEY) {
  const file = htmlPath(route);
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const kb = Buffer.byteLength(html, 'utf8') / 1024;

  const budget = route === '/' ? MAX_HTML_KB_HOME : MAX_HTML_KB_DEFAULT;
  if (kb > budget) {
    errors.push(`${route}: HTML ${kb.toFixed(0)} KB exceeds ${budget} KB budget`);
  }

  if (!/<link[^>]+rel=["']stylesheet["']/i.test(html)) {
    warnings.push(`${route}: no external stylesheet link (check CSS delivery)`);
  }
}

const home = path.join(dist, 'index.html');
if (fs.existsSync(home)) {
  const html = fs.readFileSync(home, 'utf8');
  if (!/rel=["']preload["'][^>]+as=["']image["']/i.test(html)) {
    warnings.push('/: missing LCP image preload');
  }
  if (
    /rel=["']preload["'][^>]+as=["']image["']/i.test(html) &&
    !/media=\s*"\(min-width:\s*1024px\)"/i.test(html)
  ) {
    warnings.push('/: hero image preload should target desktop (min-width: 1024px)');
  }
}

if (warnings.length) {
  console.warn('audit-performance warnings:\n' + warnings.map((w) => `  ~ ${w}`).join('\n'));
}

if (errors.length) {
  console.error('audit-performance failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`audit-performance: OK (${MONEY.length} routes, ${cssFiles.length} CSS bundles)`);
