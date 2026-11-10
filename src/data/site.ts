/** Canonical SEO / site identity — bodycam-cheats.com */

import { BODYCAM_IMAGES } from './bodycamImages';
import { BODYCAM_HERO } from './placeholders';

export const SITE_HOST = 'bodycam-cheats.com';
export const SITE_URL = `https://${SITE_HOST}`;

export const SITE_NAME = 'Bodycam Cheats';
export const SITE_BRAND = SITE_NAME;
export const SUPPORT_EMAIL = `support@${SITE_HOST}`;

export const PRODUCT_BASE = '/';
export const TITLE_PREFIX = 'Bodycam Cheats for PC';

/** Shared Product @id for home + product JSON-LD graphs. */
export const PRODUCT_ID = `${SITE_URL}/#product`;

export const SITE_PURPOSE =
  'Independent Bodycam PC cheat resource covering ESP, aimbot, pricing, Windows requirements, and Cloud DMA compatibility—not affiliated with Reissad Studio.';

/** Exactly six knowsAbout terms (structured data). */
export const SITE_ABOUT = [
  'Bodycam PC cheats',
  'Bodycam ESP',
  'Bodycam aimbot',
  'Cloud DMA',
  'Hyper-V virtualization',
  'Windows 10 and 11 compatibility',
] as const;

export const LISTED_PRICES = {
  monthlyUsd: 35,
  lifetimeUsd: 150,
  cloudDmaLifetimeUsd: 50,
} as const;

export const SEO_ROUTE_INTENTS: Record<string, string> = {
  '/': 'Bodycam cheats, ESP, aimbot, PC plans',
  '/bodycam-aimbot/': 'Bodycam aimbot, FOV, silent aim',
  '/bodycam-esp/': 'Bodycam ESP, wallhack, player overlays',
  '/bodycam-cheats-price/': 'Bodycam cheats price, monthly vs lifetime',
  '/bodycam-requirements/': 'Bodycam cheat requirements, Windows 10/11',
  '/cloud-dma-for-bodycam/': 'Cloud DMA for Bodycam, Hyper-V single-PC',
  '/guides/cloud-dma-setup/': 'Cloud DMA setup, Hyper-V, GREENWARD, Static Server, AWS',
  '/faq/': 'Bodycam pricing, requirements, Cloud DMA, delivery',
  '/support/': 'checkout and setup support',
};

/** Primary commercial pages verified in CI. */
export const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/bodycam-aimbot/',
  '/bodycam-esp/',
  '/bodycam-cheats-price/',
  '/bodycam-requirements/',
  '/cloud-dma-for-bodycam/',
] as const;

export const OG_IMAGES: Record<string, string> = {
  '/': '/og/home.jpg',
  '/bodycam-aimbot/': '/og/home.jpg',
  '/bodycam-esp/': '/og/home.jpg',
  '/bodycam-cheats-price/': '/og/pricing.jpg',
  '/bodycam-requirements/': '/og/requirements.jpg',
  '/cloud-dma-for-bodycam/': '/og/cloud-dma.jpg',
  '/faq/': '/og/faq.jpg',
  default: '/og/default.jpg',
};

export function ogImageForPath(pathname: string): string {
  const path = pathname.endsWith('/') || pathname === '' ? pathname || '/' : `${pathname}/`;
  return OG_IMAGES[path] ?? OG_IMAGES.default!;
}

export const SITEMAP_IMAGES: Record<string, { loc: string; title: string }[]> = {
  '/': [
    { loc: `${SITE_URL}${BODYCAM_HERO}`, title: BODYCAM_IMAGES.hero.alt },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.espIndoorCyan.src}`, title: BODYCAM_IMAGES.espIndoorCyan.alt },
  ],
  '/bodycam-aimbot/': [
    { loc: `${SITE_URL}${BODYCAM_IMAGES.menuAimbot.src}`, title: BODYCAM_IMAGES.menuAimbot.alt },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.aimbotFovSnapline.src}`, title: BODYCAM_IMAGES.aimbotFovSnapline.alt },
  ],
  '/bodycam-esp/': [
    { loc: `${SITE_URL}${BODYCAM_IMAGES.menuVisuals.src}`, title: BODYCAM_IMAGES.menuVisuals.alt },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.espForestCyan.src}`, title: BODYCAM_IMAGES.espForestCyan.alt },
  ],
  '/bodycam-cheats-price/': [
    { loc: `${SITE_URL}/og/pricing.jpg`, title: 'Bodycam cheat pricing plans' },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.espWarehouse.src}`, title: BODYCAM_IMAGES.espWarehouse.alt },
  ],
  '/bodycam-requirements/': [
    { loc: `${SITE_URL}${BODYCAM_IMAGES.povHallway.src}`, title: BODYCAM_IMAGES.povHallway.alt },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.espScope.src}`, title: BODYCAM_IMAGES.espScope.alt },
  ],
  '/cloud-dma-for-bodycam/': [
    { loc: `${SITE_URL}/og/cloud-dma.jpg`, title: 'Cloud DMA for Bodycam' },
    { loc: `${SITE_URL}${BODYCAM_HERO}`, title: BODYCAM_IMAGES.hero.alt },
  ],
  '/guides/cloud-dma-setup/': [
    { loc: `${SITE_URL}/og/cloud-dma-setup.jpg`, title: 'Cloud DMA Hyper-V setup guide' },
    { loc: `${SITE_URL}${BODYCAM_IMAGES.povHallway.src}`, title: BODYCAM_IMAGES.povHallway.alt },
  ],
};

/** Documented in scripts/keyword-redirects.mjs — mirrored here for app imports */
export const KEYWORD_REDIRECTS: [string, string][] = [
  ['/pricing', '/bodycam-cheats-price/'],
  ['/pricing/', '/bodycam-cheats-price/'],
  ['/guides/system-requirements', '/bodycam-requirements/'],
  ['/guides/system-requirements/', '/bodycam-requirements/'],
  ['/guides/borderlands-3-cheat-system-requirements', '/bodycam-requirements/'],
  ['/guides/borderlands-3-cheat-system-requirements/', '/bodycam-requirements/'],
  ['/cloud-dma', '/cloud-dma-for-bodycam/'],
  ['/cloud-dma/', '/cloud-dma-for-bodycam/'],
  ['/bodycam-hacks', '/'],
  ['/bodycam-hacks/', '/'],
  ['/bodycam-cheats', '/'],
  ['/bodycam-cheats/', '/'],
  ['/cheats', '/'],
  ['/cheats/', '/'],
  ['/products/dota-2-cheats', '/'],
  ['/products/dota-2-cheats/', '/'],
  ['/go/main-product', '/go/bodycam/'],
  ['/go/main-product/', '/go/bodycam/'],
  ['/go/borderlands-3', '/go/bodycam/'],
  ['/go/borderlands-3/', '/go/bodycam/'],
  ['/cloud-dma-setup', '/guides/cloud-dma-setup/'],
  ['/cloud-dma-setup/', '/guides/cloud-dma-setup/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
];
