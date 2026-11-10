/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Bodycam Cheats for PC | ESP & Aimbot',
    description:
      'Explore Bodycam cheats for PC, including ESP, aimbot and gameplay options. Compare access plans and review system requirements.',
  },
  '/bodycam-aimbot/': {
    title: 'Bodycam Aimbot Features and Options | PC',
    description:
      'Explore Bodycam aimbot options, including head and chest targeting, FOV, aim line and more. See the feature breakdown and access options.',
  },
  '/bodycam-esp/': {
    title: 'Bodycam ESP & Wallhack Features for PC',
    description:
      'See Bodycam ESP features, from player boxes and skeletons to distance, health and chams. Explore visual options and access details.',
  },
  '/bodycam-cheats-price/': {
    title: 'Bodycam Cheats Price | Monthly vs Lifetime',
    description:
      'Compare Bodycam cheats pricing: 30-day access for $35 or lifetime access for $150. Review included features and current options.',
  },
  '/bodycam-requirements/': {
    title: 'Bodycam Cheat Requirements | Windows 10/11',
    description:
      'Check Bodycam cheat requirements for Windows 10/11, memory, GPU and security settings. Review the Cloud DMA prerequisites before setup.',
  },
  '/cloud-dma-for-bodycam/': {
    title: 'Cloud DMA for Bodycam | Setup & Requirements',
    description:
      'Learn how Cloud DMA for Bodycam works, what a single-PC Hyper-V setup needs, and which additional components are required.',
  },
  '/faq/': {
    title: 'Bodycam Cheats FAQ – plans, Cloud DMA & requirements',
    description:
      'Answers on Bodycam cheat monthly and lifetime plans, Cloud DMA licensing, Windows 10/11 requirements, checkout delivery, and Hyper-V setup before you buy.',
  },
  '/support/': {
    title: 'Bodycam Cheats support – checkout & setup help',
    description:
      'Get help with Bodycam cheat checkout, license delivery email, Cloud DMA Hyper-V setup, Windows requirements, and common install issues before you launch the game.',
  },
  '/about/': {
    title: 'About Bodycam Cheats – independent PC guides',
    description:
      'Bodycam Cheats is an independent resource for Windows PC players comparing ESP, aimbot features, pricing tiers, Cloud DMA setup, and honest system requirement checklists.',
  },
  '/privacy/': {
    title: 'Privacy – Bodycam Cheats analytics & cookies',
    description:
      'Privacy policy for bodycam-cheats.com: what analytics and cookies we use, how support email is handled, and how long basic usage data is retained on this static site.',
  },
  '/terms/': {
    title: 'Terms – Bodycam Cheats purchase & license rules',
    description:
      'Terms of use for Bodycam cheat and Cloud DMA purchases through external checkout, including license delivery, refund limits, and acceptable use of guides on this site.',
  },
  '/guides/cloud-dma-setup/': {
    title: 'Cloud DMA setup guide – Hyper-V & virtualization',
    description:
      'Hyper-V setup for the single-PC Cloud DMA stack with Bodycam—RAM, CPU, virtualization, and security checks before you install the client.',
  },
  '/hwid-spoofer/': {
    title: 'HWID Spoofer utility – hardware ID recovery (placeholder)',
    description:
      'Overview placeholder for an HWID spoofer utility: supported Windows builds, when players use hardware ID recovery, and how it relates to the main Bodycam cheat stack.',
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
