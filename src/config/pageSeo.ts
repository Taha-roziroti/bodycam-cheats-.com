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
    title: 'Borderlands 3 – PC soft aim, ESP, loot radar & plans',
    description:
      'Borderlands 3 PC setup with soft aim, enemy and loot ESP, radar, and recoil options. Compare $35 monthly and $150 lifetime plans plus Cloud DMA.',
  },
  '/pricing/': {
    title: 'Cheats – monthly $35, lifetime $150 plans & features',
    description:
      'Cheats pricing for monthly ($35) and lifetime ($150) access with soft aim, ESP, radar, and related features. Compare plans before checkout.',
  },
  '/cloud-dma/': {
    title: 'Cloud DMA – single-PC Hyper-V lifetime license $50',
    description:
      'Cloud DMA Hyper-V license for a single-PC setup: Windows 10/11, 8–16 GB RAM, $50 lifetime pricing, and how it fits the cheat stack.',
  },
  '/guides/cloud-dma-setup/': {
    title: 'DMA setup guide – Hyper-V, RAM & CPU virtualization',
    description:
      'DMA setup steps for Hyper-V, CPU virtualization, 8–16 GB RAM, and Windows 10/11 checks before you enable the single-PC environment.',
  },
  '/guides/borderlands-3-cheat-system-requirements/': {
    title: 'System requirements – Windows, RAM & client specs',
    description:
      'System requirements for Windows 10/11, Steam or Official Client, RAM, and Cloud DMA prerequisites—review before Borderlands 3 cheat checkout.',
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
    title: 'FAQ – cheat plans, Cloud DMA, pricing & checkout',
    description:
      'FAQ: answers on $35/$150 cheat plans, $50 Cloud DMA license, Windows requirements, checkout delivery, and license moves.',
  },
  '/terms/': {
    title: 'Terms – purchase, license & refund policy details',
    description:
      'Terms for Borderlands 3 cheat and Cloud DMA purchases: license use, checkout delivery, refund rules, and acceptable use.',
  },
  '/privacy/': {
    title: 'Privacy – Borderlands 3 Cheats analytics & cookies',
    description:
      'Privacy: how borderlands3cheats.com uses Google Analytics, cookies, and support email data when you browse or checkout.',
  },
  '/about/': {
    title: 'Borderlands 3 Cheats – guides, pricing & Cloud DMA',
    description:
      'Borderlands 3 Cheats publishes PC ESP/soft aim guides, $35/$150 plans, $50 Cloud DMA license info, and independent site policies.',
  },
  '/support/': {
    title: 'Support – checkout help, Cloud DMA setup & licenses',
    description:
      'Support: help with cheat checkout, Cloud DMA Hyper-V setup, Windows requirements, and license delivery after purchase.',
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
