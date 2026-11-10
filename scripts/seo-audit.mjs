/**
 * Full-site SEO audit (see cursor-seo-audit-prompt.md).
 * Runs build + CI checks + post-build HTML scans. Exit 1 on failure.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PATH_REDIRECTS } from './redirects.mjs';
import { KEYWORD_REDIRECTS } from './keyword-redirects.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const dist = path.join(root, 'dist');
const errors = [];
const warnings = [];

const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/bodycam-aimbot/',
  '/bodycam-esp/',
  '/bodycam-cheats-price/',
  '/bodycam-requirements/',
  '/cloud-dma-for-bodycam/',
];

const PLACEHOLDER_PATTERNS = [
  /your-domain\.example/i,
  /Your Product Name/i,
  /Your Product(?!ion)/i,
  /Example Game/i,
  /dotacheats\.com/i,
  /lorem ipsum/i,
  /TODO:/i,
  /placeholder-article/i,
];

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env, ...env },
  });
  return r.status === 0;
}

function htmlPath(route) {
  if (route === '/') return path.join(dist, 'index.html');
  const clean = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(dist, clean, 'index.html');
}

function collectHtmlFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) collectHtmlFiles(full, out);
    else if (ent.name === 'index.html') out.push(full);
  }
  return out;
}

function routeFromHtmlFile(file) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

const ASSET_RE = /\.(png|jpe?g|webp|svg|ico|webmanifest|xml|css|woff2?)$/i;

function resolveInternal(href) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))
    return null;
  if (href.startsWith('#')) return null;
  if (href.startsWith('/go/')) return { ok: true, note: 'checkout' };
  let p = href.split(/[?#]/)[0];
  if (!p.startsWith('/')) p = `/${p}`;

  if (ASSET_RE.test(p)) {
    const inPublic = path.join(root, 'public', p.replace(/^\//, ''));
    const inDist = path.join(dist, p.replace(/^\//, ''));
    if (fs.existsSync(inPublic) || fs.existsSync(inDist)) return { ok: true };
    errors.push(`link: missing asset ${href}`);
    return { ok: false };
  }

  if (p !== '/' && !p.endsWith('/')) p = `${p}/`;

  const redirect =
    PATH_REDIRECTS.get(p.replace(/\/$/, '')) ??
    PATH_REDIRECTS.get(p) ??
    PATH_REDIRECTS.get(p.replace(/\/$/, ''));
  if (redirect) {
    const dest = redirect.endsWith('/') ? redirect : `${redirect}/`;
    if (dest !== p) {
      errors.push(`link: ${href} targets redirect (${p} → ${redirect}); use final URL`);
      return { ok: false };
    }
  }
  for (const [from, to] of KEYWORD_REDIRECTS) {
    const fromNorm = from.endsWith('/') ? from : `${from}/`;
    const toNorm = to.endsWith('/') ? to : `${to}/`;
    const pNorm = p.endsWith('/') ? p : `${p}/`;
    if ((pNorm === fromNorm || p === from) && toNorm !== pNorm) {
      errors.push(`link: ${href} targets redirect alias (${from} → ${to}); use final URL`);
      return { ok: false };
    }
  }

  const file = htmlPath(p);
  if (fs.existsSync(file)) return { ok: true };
  if (p.endsWith('.xml') || p.endsWith('.css') || p.endsWith('.jpg') || p.endsWith('.webp')) {
    const asset = path.join(dist, p.replace(/^\//, ''));
    if (fs.existsSync(asset)) return { ok: true };
  }
  errors.push(`link: broken internal href ${href} (no file at ${p})`);
  return { ok: false };
}

function titleLen(s) {
  return [...s].length;
}

function auditHtmlFile(file) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFromHtmlFile(file);
  const isNoindex = html.includes('content="noindex');

  const legacyNoindex =
    route.startsWith('/blog') ||
    route.startsWith('/forum') ||
    route.startsWith('/products/') ||
    isNoindex;

  if (!legacyNoindex) {
    for (const re of PLACEHOLDER_PATTERNS) {
      if (re.test(html)) {
        errors.push(`${route}: placeholder/leak pattern ${re} in built HTML`);
      }
    }
  }

  if (html.includes('href="#"') && !html.includes('data-scroll')) {
    warnings.push(`${route}: contains href="#" (verify intentional)`);
  }

  const strictLinkAudit =
    INDEXABLE_MONEY_ROUTES.includes(route) ||
    route === '/faq/' ||
    route === '/about/' ||
    route === '/support/' ||
    route === '/privacy/' ||
    route === '/terms/' ||
    route === '/guides/cloud-dma-setup/';

  if (strictLinkAudit) {
    const hrefs = [...html.matchAll(/\shref="([^"]+)"/gi)].map((m) => m[1]);
    for (const href of hrefs) resolveInternal(href);
  }

  if (!isNoindex) {
    const h1 = (html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1 !== 1) errors.push(`${route}: expected 1 h1, found ${h1}`);

    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
    const desc = html.match(/name="description" content="([^"]*)"/i)?.[1] ?? '';
    const lenT = titleLen(title);
    const lenD = titleLen(desc);
    if (lenT < 50 || lenT > 60) warnings.push(`${route}: title length ${lenT} (target 50-60)`);
    if (lenD < 120 || lenD > 155) warnings.push(`${route}: meta description length ${lenD} (target 120-155)`);

    if (!html.includes('lang="en-US"') && html.includes('lang="en"')) {
      warnings.push(`${route}: html lang is "en" not "en-US" (audit prefers en-US)`);
    }
  }
}

console.log('seo-audit: verify-redirects…');
if (!run('node', ['scripts/verify-redirects.mjs'])) process.exit(1);

const skipBuild = process.env.SKIP_BUILD === '1';
if (!skipBuild) {
  console.log('seo-audit: npm run build…');
  if (!run('npm', ['run', 'build'])) process.exit(1);
} else if (!fs.existsSync(dist)) {
  console.error('seo-audit: dist missing — run build or unset SKIP_BUILD');
  process.exit(1);
}

for (const f of collectHtmlFiles(dist)) auditHtmlFile(f);

console.log('seo-audit: images & alt text…');
if (!run('node', ['scripts/audit-images.mjs'])) process.exit(1);

console.log('seo-audit: spelling…');
if (!run('node', ['scripts/audit-spelling.mjs'])) process.exit(1);

console.log('seo-audit: responsive layout…');
if (!run('node', ['scripts/audit-responsive.mjs'])) process.exit(1);

console.log('seo-audit: duplicate content…');
if (!run('node', ['scripts/audit-duplicate-content.mjs'])) process.exit(1);

console.log('seo-audit: anchor text…');
if (!run('node', ['scripts/audit-anchor-text.mjs'])) process.exit(1);

console.log('seo-audit: heading density…');
if (!run('node', ['scripts/audit-heading-density.mjs'])) process.exit(1);

// Sitemap URLs should resolve
const sitemapPath = path.join(dist, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    try {
      const p = new URL(loc).pathname;
      const file = htmlPath(p.endsWith('/') ? p : `${p}/`);
      if (!fs.existsSync(file) && !p.endsWith('.xml')) {
        errors.push(`sitemap: loc ${loc} has no built HTML`);
      }
    } catch {
      errors.push(`sitemap: invalid loc ${loc}`);
    }
  }
}

if (warnings.length) {
  console.warn('seo-audit warnings:\n' + warnings.map((w) => `  ~ ${w}`).join('\n'));
}

if (errors.length) {
  console.error('seo-audit failed:\n' + errors.map((e) => `  ✗ ${e}`).join('\n'));
  process.exit(1);
}

console.log(`seo-audit: OK (${collectHtmlFiles(dist).length} HTML files scanned)`);
