import type { ProductSlide } from './products';
import {
  BL3_CHECKOUT,
  CLOUD_DMA_CHECKOUT,
  HWID_SPOOFER_CHECKOUT,
} from './borderlands3Site';
import type { IconName } from '../components/icons/types';

export interface LandingCatalogProduct {
  slug: string;
  label: string;
  title: string;
  href: string;
  buyUrl: string;
  features: string[];
  more: number;
  icon: IconName;
  badge?: string;
  variant?: 'essential' | 'popular' | 'limited';
}

export const borderlandsHeroSlides: ProductSlide[] = [
  {
    src: '/images/borderlands3/borderlands-3-enemy-esp-gameplay.webp',
    alt: 'Borderlands 3 enemy ESP overlay during combat',
    caption: 'Enemy ESP',
    captionDesc: 'Health bars, distance, and skeleton readouts for nearby threats.',
  },
  {
    src: '/images/borderlands3/borderlands-3-loot-esp-showcase.webp',
    alt: 'Borderlands 3 loot ESP highlighting weapon drops',
    caption: 'Loot ESP',
    captionDesc: 'Rarity highlights and pickup markers across Pandora.',
  },
  {
    src: '/images/borderlands3/borderlands-3-soft-aim-gameplay.webp',
    alt: 'Borderlands 3 soft aim configuration in game',
    caption: 'Soft aim',
    captionDesc: 'Configurable FOV, smoothing, and combat tuning options.',
  },
  {
    src: '/images/borderlands3/borderlands-3-radar-gameplay.webp',
    alt: 'Borderlands 3 radar overlay',
    caption: 'Radar',
    captionDesc: '2D awareness for enemies and loot without covering the HUD.',
  },
  {
    src: '/images/borderlands3/borderlands-3-esp-soft-aim-hero.webp',
    alt: 'Borderlands 3 cheat menu and ESP preview',
    caption: 'In-game menu',
    captionDesc: 'Toggle modules and save presets from one overlay.',
  },
];

export const borderlandsLandingProducts: LandingCatalogProduct[] = [
  {
    slug: 'borderlands-3',
    label: 'Main plan',
    title: 'Borderlands 3 Cheats',
    href: '/pricing/',
    buyUrl: BL3_CHECKOUT,
    badge: 'Popular',
    variant: 'popular',
    icon: 'coreProduct',
    features: [
      'Enemy ESP',
      'Loot ESP',
      'Soft aim',
      '2D radar',
      'Recoil options',
      'Saveable configs',
    ],
    more: 4,
  },
  {
    slug: 'hwid-spoofer',
    label: 'Utility',
    title: 'HWID Spoofer',
    href: '/hwid-spoofer/',
    buyUrl: HWID_SPOOFER_CHECKOUT,
    badge: 'Available',
    variant: 'essential',
    icon: 'shieldCheck',
    features: [
      'Hardware ID reset workflow',
      'Compatibility scan',
      'Cleanup utilities',
      'Post-spoof verification',
    ],
    more: 2,
  },
  {
    slug: 'cloud-dma',
    label: 'Infrastructure',
    title: 'Cloud DMA license',
    href: '/cloud-dma/',
    buyUrl: CLOUD_DMA_CHECKOUT,
    badge: 'Available',
    variant: 'essential',
    icon: 'reqCpu',
    features: [
      'Hyper-V environment',
      'Single-PC setup',
      'Windows 10 & 11',
      'Lifetime license',
    ],
    more: 1,
  },
];

export const borderlandsGuideCards = [
  {
    title: 'Cheat plan pricing',
    desc: 'Compare $35 monthly and $150 lifetime Borderlands 3 access before checkout.',
    href: '/pricing/',
    readLabel: 'Compare plans',
  },
  {
    title: 'Cloud DMA setup guide',
    desc: 'Hyper-V, RAM, and CPU virtualization checks for the single-PC environment.',
    href: '/guides/cloud-dma-setup/',
    readLabel: 'Read setup guide',
  },
  {
    title: 'PC system requirements',
    desc: 'Windows, Steam client, RAM, and Cloud DMA prerequisites for supported builds.',
    href: '/guides/borderlands-3-cheat-system-requirements/',
    readLabel: 'Check requirements',
  },
] as const;
