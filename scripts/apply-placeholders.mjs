import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const PLACEHOLDER_DOMAIN = 'your-domain.example';
const PLACEHOLDER_BRAND = 'Your Product Name';
const PLACEHOLDER_PRODUCT = 'Your Product';
const PLACEHOLDER_GALLERY = '/images/placeholders/gallery.svg';
const PLACEHOLDER_HERO = '/images/placeholders/hero.svg';
const GUIDE_REQUIREMENTS = '/guides/system-requirements/';

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}
function write(rel, content) {
  fs.writeFileSync(path.join(root, rel), content, 'utf8');
}

function replaceInFile(rel, pairs) {
  let text = read(rel);
  for (const [from, to] of pairs) {
    text = text.split(from).join(to);
  }
  write(rel, text);
}

// en.ts bulk neutralization (preserve structure)
replaceInFile('src/i18n/en.ts', [
  ['borderlands3cheats.com', PLACEHOLDER_DOMAIN],
  ['Borderlands 3 Cheats', PLACEHOLDER_BRAND],
  ['Borderlands 3', PLACEHOLDER_PRODUCT],
  ['borderlands 3', 'your product'],
  ['Pandora', 'your game world'],
  ['Vault Hunters', 'placeholder characters'],
  ['Fanatic', 'enemy type'],
  ['Skag', 'creature'],
  ['dotacheats.com', PLACEHOLDER_DOMAIN],
  ['Dota 2', 'Example Game'],
  ['dota 2', 'example game'],
]);

replaceInFile('src/data/faq.ts', [
  ['/guides/borderlands-3-cheat-system-requirements/', GUIDE_REQUIREMENTS],
  ['Borderlands 3 PC requirements checklist', 'system requirements checklist'],
  ['Borderlands 3 cheats', 'main product'],
  ['Borderlands 3', PLACEHOLDER_PRODUCT],
  ['What features are included in Borderlands 3 cheats?', 'What features are included in the main product?'],
]);

replaceInFile('src/config/site.ts', [
  ["export const SITE_DOMAIN = 'borderlands3cheats.com';", `export const SITE_DOMAIN = '${PLACEHOLDER_DOMAIN}';`],
  ["export const SITE_BRAND = 'Borderlands 3 Cheats';", `export const SITE_BRAND = '${PLACEHOLDER_BRAND}';`],
  ["export const TITLE_PREFIX = 'Borderlands 3 Cheats for PC';", `export const TITLE_PREFIX = '${PLACEHOLDER_BRAND} for PC';`],
]);

replaceInFile('src/config/pageSeo.ts', [
  ['borderlands3cheats.com', PLACEHOLDER_DOMAIN],
  ['Borderlands 3', PLACEHOLDER_PRODUCT],
  ['/guides/borderlands-3-cheat-system-requirements/', '/guides/system-requirements/'],
  ['Dota 2 Elite Cheats & Utility Products', 'Example Game Products & Utilities'],
  ['Elite dota 2 cheats', 'Example game product tiers'],
  ['dotacheats.com', PLACEHOLDER_DOMAIN],
  ['Dota 2', 'Example Game'],
]);

replaceInFile('scripts/verify-seo.mjs', [
  ["const SITE_HOST = 'borderlands3cheats.com';", `const SITE_HOST = '${PLACEHOLDER_DOMAIN}';`],
  ["'/guides/borderlands-3-cheat-system-requirements/'", "'/guides/system-requirements/'"],
]);

replaceInFile('scripts/generate-sitemaps.mjs', [
  ["const SITE_HOST = 'borderlands3cheats.com';", `const SITE_HOST = '${PLACEHOLDER_DOMAIN}';`],
  ["'/guides/borderlands-3-cheat-system-requirements/'", "'/guides/system-requirements/'"],
]);
// Replace borderlands image URLs in sitemap script
let sitemap = read('scripts/generate-sitemaps.mjs');
sitemap = sitemap.replace(/\/images\/borderlands3\/[^'"]+/g, `${PLACEHOLDER_GALLERY}`);
write('scripts/generate-sitemaps.mjs', sitemap);

replaceInFile('scripts/serve.mjs', [
  ["const CANONICAL_HOST = 'borderlands3cheats.com';", `const CANONICAL_HOST = '${PLACEHOLDER_DOMAIN}';`],
]);

replaceInFile('scripts/indexnow.mjs', [
  ["'borderlands3cheats.com'", `'${PLACEHOLDER_DOMAIN}'`],
]);

replaceInFile('scripts/verify-redirects.mjs', [
  ...[
    "['/buy-borderlands-3-cheats', '/']",
    "['/buy-borderlands-3-cheats/', '/']",
    "['/buy-borderlands-3-cheat', '/']",
    "['/buy-borderlands-3-cheat/', '/']",
    "['/borderlands-3-cheats', '/']",
    "['/borderlands-3-cheats/', '/']",
    "['/borderlands-3-cheats-price', '/pricing/']",
    "['/borderlands-3-cheats-price/', '/pricing/']",
    "['/borderlands-3-esp', '/']",
    "['/borderlands-3-esp/', '/']",
    "['/borderlands-3-aimbot', '/']",
    "['/borderlands-3-aimbot/', '/']",
  ].map((line) => [line + ',', '']),
]);

replaceInFile('scripts/redirects.mjs', [
  ...[
    "['/buy-borderlands-3-cheats', '/']",
    "['/buy-borderlands-3-cheats/', '/']",
    "['/buy-borderlands-3-cheat', '/']",
    "['/buy-borderlands-3-cheat/', '/']",
    "['/borderlands-3-cheats', '/']",
    "['/borderlands-3-cheats/', '/']",
    "['/borderlands-3-cheats-price', '/pricing/']",
    "['/borderlands-3-cheats-price/', '/pricing/']",
    "['/borderlands-3-esp', '/']",
    "['/borderlands-3-esp/', '/']",
    "['/borderlands-3-aimbot', '/']",
    "['/borderlands-3-aimbot/', '/']",
  ].map((line) => [line + ',', '']),
]);

replaceInFile('public/robots.txt', [
  ['borderlands3cheats.com', PLACEHOLDER_DOMAIN],
]);

replaceInFile('public/site.webmanifest', [
  ['Borderlands 3 Cheats', PLACEHOLDER_BRAND],
  ['borderlands3cheats.com', PLACEHOLDER_DOMAIN],
]);

// products.ts image paths
let products = read('src/data/products.ts');
products = products.replace(/\/images\/[^'"]+\.(webp|png|jpg)/g, PLACEHOLDER_GALLERY);
products = products.replace(/Elite dota cheats/gi, 'Example product tiers');
write('src/data/products.ts', products);

console.log('Placeholder bulk updates applied.');
