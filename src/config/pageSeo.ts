/**
 * Central titles/descriptions for high-traffic routes.
 */

export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'Bodycam Cheats for PC | ESP, Aimbot & Plan Pricing',
    description:
      'Bodycam cheats for PC: ESP, aimbot, pricing from $35 monthly or $150 lifetime, and Windows requirements. Compare plans before checkout.',
  },
  '/bodycam-aimbot/': {
    title: 'Bodycam Aimbot for PC | FOV, Bones & Smooth Targeting',
    description:
      'Bodycam aimbot options for PC: head and chest bones, FOV circle, snaplines, smoothness sliders, and recoil control. See plans and requirements.',
  },
  '/bodycam-esp/': {
    title: 'Bodycam ESP & Wallhack for PC | Boxes, Chams & Radar',
    description:
      'Bodycam ESP and wallhack features: player boxes, skeletons, distance, health, chams, and radar overlays for Windows PC. Review access options.',
  },
  '/bodycam-cheats-price/': {
    title: 'Bodycam Cheats Price | $35 Monthly & $150 Lifetime',
    description:
      'Bodycam cheats price: $35 monthly or $150 lifetime for the same ESP and aimbot list. Cloud DMA is a separate $50 license—compare plans before checkout.',
  },
  '/bodycam-requirements/': {
    title: 'Bodycam Cheat Requirements | Windows 10 & 11 PC Guide',
    description:
      'Bodycam cheat requirements for Windows 10/11: RAM, GPU, HVCI, virtualization for Cloud DMA, and security settings to verify before install.',
  },
  '/cloud-dma-for-bodycam/': {
    title: 'Cloud DMA for Bodycam Cheats | Hyper-V One-PC Setup',
    description:
      'Cloud DMA for Bodycam explains the required Hyper-V single-PC stack, $50 lifetime license, GREENWARD/AWS add-ons, and Windows prerequisites.',
  },
  '/faq/': {
    title: 'Bodycam Cheats FAQ | Plans, Cloud DMA & Requirements',
    description:
      'Bodycam FAQ: monthly vs lifetime plans, Cloud DMA licensing, Windows 10/11 specs, checkout delivery, and Hyper-V setup before you buy.',
  },
  '/support/': {
    title: 'Bodycam Cheat Support | Checkout & License Delivery',
    description:
      'Bodycam support for checkout errors, license email delivery, Cloud DMA Hyper-V setup, and Windows compatibility checks before launch.',
  },
  '/about/': {
    title: 'About Bodycam Cheats | Independent PC Guides & FAQs',
    description:
      'Independent Bodycam Cheats publishes ESP, aimbot, pricing, Cloud DMA, and requirements guides for Windows players—no official game affiliation.',
  },
  '/privacy/': {
    title: 'Bodycam Cheats Privacy Policy | Cookies & Analytics',
    description:
      'How bodycam-cheats.com uses privacy-friendly analytics, cookies, support email, and retention on this static Bodycam guides site.',
  },
  '/terms/': {
    title: 'Terms of Use | Bodycam Cheats & Cloud DMA Licenses',
    description:
      'Terms for Bodycam cheat and Cloud DMA purchases via external checkout, license delivery, refund limits, and acceptable use of our guides.',
  },
  '/guides/cloud-dma-setup/': {
    title: 'Cloud DMA Setup for Bodycam | Hyper-V Guide Steps',
    description:
      'Hyper-V setup for Bodycam Cloud DMA on one PC: enable virtualization, allocate RAM, finish activation, and verify before loading the client.',
  },
  '/hwid-spoofer/': {
    title: 'HWID Spoofer for Bodycam Players | Hardware ID Utility',
    description:
      'HWID spoofer utility overview for Bodycam users: when to use hardware ID recovery, Windows builds supported, and limits vs the main cheat license.',
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
