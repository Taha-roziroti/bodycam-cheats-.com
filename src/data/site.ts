/** Canonical SEO / site identity — single source of truth (SEO-SUPER-BOOSTER). */

export const SITE_HOST = 'borderlands3cheats.com';
export const SITE_URL = `https://${SITE_HOST}`;

export const SITE_NAME = 'Borderlands 3 Cheats';
export const SITE_BRAND = SITE_NAME;
export const SUPPORT_EMAIL = `support@${SITE_HOST}`;

export const PRODUCT_BASE = '/';
export const TITLE_PREFIX = 'Borderlands 3 Cheats for PC';

/** Shared Product @id for home + product JSON-LD graphs. */
export const PRODUCT_ID = `${SITE_URL}/#product`;

export const SITE_PURPOSE =
  'Borderlands 3 PC cheat software with ESP, soft aim, loot highlights, radar, and Cloud DMA infrastructure for supported Windows builds.';

/** Exactly six knowsAbout terms (structured data). */
export const SITE_ABOUT = [
  'Borderlands 3 PC cheats',
  'Enemy ESP',
  'Loot ESP',
  'Soft aim',
  'Cloud DMA',
  'Hyper-V virtualization',
] as const;

export const LISTED_PRICES = {
  monthlyUsd: 35,
  lifetimeUsd: 150,
  cloudDmaLifetimeUsd: 50,
} as const;

/** Copy intent map — not rendered as keyword lists on pages. */
export const SEO_ROUTE_INTENTS: Record<string, string> = {
  '/': 'borderlands 3 cheats, ESP, soft aim, loot radar, PC availability',
  '/pricing/': 'borderlands 3 cheats price, monthly and lifetime plans',
  '/cloud-dma/': 'cloud dma for game cheats, single-PC Hyper-V license',
  '/hwid-spoofer/': 'hwid spoofer, hardware ID reset utility, PC ban recovery',
  '/guides/cloud-dma-setup/': 'cloud dma setup guide, Hyper-V and virtualization',
  '/guides/borderlands-3-cheat-system-requirements/':
    'borderlands 3 cheat system requirements, Windows and Steam client',
  '/faq/': 'pricing, Windows requirements, Cloud DMA, delivery',
  '/support/': 'checkout and setup support',
};

/** Primary money pages verified in CI. */
export const INDEXABLE_MONEY_ROUTES = [
  '/',
  '/pricing/',
  '/cloud-dma/',
  '/hwid-spoofer/',
  '/guides/cloud-dma-setup/',
  '/guides/borderlands-3-cheat-system-requirements/',
  '/faq/',
] as const;

/** Open Graph JPEG paths (1200×630) under /og/ */
export const OG_IMAGES: Record<string, string> = {
  '/': '/og/home.jpg',
  '/pricing/': '/og/pricing.jpg',
  '/cloud-dma/': '/og/cloud-dma.jpg',
  '/hwid-spoofer/': '/og/default.jpg',
  '/guides/cloud-dma-setup/': '/og/cloud-dma-setup.jpg',
  '/guides/borderlands-3-cheat-system-requirements/': '/og/requirements.jpg',
  '/faq/': '/og/faq.jpg',
  default: '/og/default.jpg',
};

export function ogImageForPath(pathname: string): string {
  const path = pathname.endsWith('/') || pathname === '' ? pathname || '/' : `${pathname}/`;
  return OG_IMAGES[path] ?? OG_IMAGES.default!;
}

/** Sitemap image entries (≥1 per indexable URL). */
export const SITEMAP_IMAGES: Record<string, { loc: string; title: string }[]> = {
  '/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-campfire-hero-640.webp`,
      title: 'Borderlands 3 PC gameplay with ESP and soft aim overlays',
    },
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-enemy-esp-gameplay-640.webp`,
      title: 'Borderlands 3 enemy ESP gameplay overlay',
    },
  ],
  '/pricing/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-campfire-hero-640.webp`,
      title: 'Borderlands 3 cheat plans and pricing',
    },
  ],
  '/cloud-dma/': [
    {
      loc: `${SITE_URL}/og/cloud-dma.jpg`,
      title: 'Cloud DMA single-PC Hyper-V setup',
    },
  ],
  '/hwid-spoofer/': [
    {
      loc: `${SITE_URL}/og/default.jpg`,
      title: 'HWID Spoofer lifetime utility',
    },
  ],
  '/guides/cloud-dma-setup/': [
    {
      loc: `${SITE_URL}/og/cloud-dma-setup.jpg`,
      title: 'Cloud DMA setup guide',
    },
  ],
  '/guides/borderlands-3-cheat-system-requirements/': [
    {
      loc: `${SITE_URL}/images/borderlands3/borderlands-3-soft-aim-gameplay-640.webp`,
      title: 'Borderlands 3 PC system requirements',
    },
  ],
  '/faq/': [
    {
      loc: `${SITE_URL}/og/faq.jpg`,
      title: 'Borderlands 3 cheats FAQ',
    },
  ],
};

/** 301 aliases for commercial / legacy keyword URLs (also in public/_redirects). */
export const KEYWORD_REDIRECTS: [string, string][] = [
  ['/buy-borderlands-3-cheats', '/'],
  ['/buy-borderlands-3-cheats/', '/'],
  ['/buy-borderlands-3-cheat', '/'],
  ['/buy-borderlands-3-cheat/', '/'],
  ['/borderlands-3-cheats', '/'],
  ['/borderlands-3-cheats/', '/'],
  ['/borderlands-3-cheats-price', '/pricing/'],
  ['/borderlands-3-cheats-price/', '/pricing/'],
  ['/borderlands-3-esp', '/'],
  ['/borderlands-3-esp/', '/'],
  ['/borderlands-3-aimbot', '/'],
  ['/borderlands-3-aimbot/', '/'],
  ['/cloud-dma-setup', '/guides/cloud-dma-setup/'],
  ['/cloud-dma-setup/', '/guides/cloud-dma-setup/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
];
