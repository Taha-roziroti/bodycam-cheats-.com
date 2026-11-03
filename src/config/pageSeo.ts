/**
 * Central titles/descriptions for high-traffic routes.
 * After Search Console shows impressions, edit the matching path here and redeploy.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Borderlands 3 Cheats for PC | ESP & Soft Aim',
    description:
      'Explore Borderlands 3 PC cheats with soft aim, enemy and loot ESP, radar, recoil control and more. Discover the features and get started.',
  },
  '/pricing/': {
    title: 'Borderlands 3 Cheats Price & Subscription Plans',
    description:
      'Compare Borderlands 3 cheat prices and monthly or lifetime plans. Explore available features and choose your preferred access option.',
  },
  '/cloud-dma/': {
    title: 'Cloud DMA for Game Cheats | Single-PC Setup',
    description:
      'Explore Cloud DMA software, its single-PC Hyper-V environment, Windows requirements and lifetime license. Discover the complete setup.',
  },
  '/guides/cloud-dma-setup/': {
    title: 'Cloud DMA Setup Guide | Hyper-V Requirements',
    description:
      'Learn about Cloud DMA setup, Hyper-V, Windows compatibility, CPU virtualization and RAM requirements with our complete setup overview.',
  },
  '/guides/borderlands-3-cheat-system-requirements/': {
    title: 'Borderlands 3 Cheat System Requirements',
    description:
      'Explore Borderlands 3 cheat system requirements, Windows compatibility, supported PC clients, RAM and Cloud DMA setup specifications.',
  },
  '/products/dota-2-cheats/': {
    title: 'Dota 2 Elite Cheats & Utility Products',
    description:
      'Elite dota 2 cheats plus HWID spoofer, UGC tools, and Skin Changer utilities for Steam ranked on dotacheats.com.',
  },
  '/products/dota-2-cheats/elite/': {
    title: 'Dota 2 Elite Cheats | Bots & Full Map Hack',
    description:
      'Elite tier: auto farm bot, kill steal, skin changer, full map hack suite, and priority patch delivery.',
  },
  '/products/dota-2-cheats/utilities/': {
    title: 'Dota 2 Utilities | HWID, UGC & Skin Changer',
    description:
      'Choose HWID Spoofer, UGC, or Skin Changer—when each utility fits and links to full product pages.',
  },
  '/blog/': {
    title: 'Dota 2 Cheats Guides & Patch Notes',
    description:
      'Setup guides, Lite vs Pro comparisons, VAC patch checklists, and ranked config tips for dota cheats.',
  },
  '/forum/': {
    title: 'Dota 2 Community Forum | DotaCheats',
    description: 'Join Dota players to discuss heroes, builds, patch changes, guides, and community moments.',
  },
  '/faq/': {
    title: 'FAQ | Dota 2 Cheats, Products & Setup',
    description:
      'Answers on cheat tiers, map hack, scripts, HWID tools, checkout, and blog guides at dotacheats.com.',
  },
  '/terms/': {
    title: 'Terms & Conditions | DotaCheats',
    description:
      'Purchase terms, license use, and refund policy for DotaCheats products sold through dotacheats.com.',
  },
  '/privacy/': {
    title: 'Privacy Policy | DotaCheats',
    description:
      'How dotacheats.com uses analytics, cookies, and contact data when you browse or request support.',
  },
  '/about/': {
    title: 'About DotaCheats',
    description:
      'What DotaCheats publishes: Dota 2 cheat tiers, utilities, guides, and status notes at dotacheats.com.',
  },
  '/support/': {
    title: 'Support | DotaCheats',
    description:
      'Get help with loader setup, HWID, and checkout for Dota 2 cheat tiers and utilities.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
