import type { ProductSlide } from './products';
import { MAIN_PRODUCT_CHECKOUT, CLOUD_DMA_CHECKOUT } from './productSite';
import type { IconName } from '../components/icons/types';
import { BODYCAM_IMAGES } from './bodycamImages';

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
  buyLabel?: string;
  viewLabel?: string;
}

export const landingHeroSlides: ProductSlide[] = [
  {
    src: BODYCAM_IMAGES.hero.src,
    alt: BODYCAM_IMAGES.hero.alt,
    caption: 'Bodycam',
    captionDesc: 'Tactical bodycam branding for the PC cheat package.',
  },
  {
    src: BODYCAM_IMAGES.espIndoorCyan.src,
    alt: BODYCAM_IMAGES.espIndoorCyan.alt,
    caption: 'Player ESP',
    captionDesc: 'Cyan boxes, skeletons, and distance tags.',
  },
  {
    src: BODYCAM_IMAGES.menuAimbot.src,
    alt: BODYCAM_IMAGES.menuAimbot.alt,
    caption: 'Aimbot',
    captionDesc: 'FOV, smoothing, bones and recoil options.',
  },
  {
    src: BODYCAM_IMAGES.espForestCyan.src,
    alt: BODYCAM_IMAGES.espForestCyan.alt,
    caption: 'Skeleton ESP',
    captionDesc: 'Snaplines and skeleton readouts outdoors.',
  },
  {
    src: BODYCAM_IMAGES.menuVisuals.src,
    alt: BODYCAM_IMAGES.menuVisuals.alt,
    caption: 'Visuals menu',
    captionDesc: 'Radar, box type, health and team toggles.',
  },
  {
    src: BODYCAM_IMAGES.aimbotFovSnapline.src,
    alt: BODYCAM_IMAGES.aimbotFovSnapline.alt,
    caption: 'FOV & snapline',
    captionDesc: 'Aim circle with tracking line to target.',
  },
];

export const landingProducts: LandingCatalogProduct[] = [
  {
    slug: 'bodycam',
    label: 'Main plan',
    title: 'Bodycam Cheats',
    href: '/bodycam-cheats-price/',
    buyUrl: MAIN_PRODUCT_CHECKOUT,
    badge: 'Popular',
    variant: 'popular',
    icon: 'coreProduct',
    features: ['ESP & aimbot', 'Chams & radar', 'Recoil options', 'Saveable configs'],
    more: 3,
    buyLabel: 'Checkout Bodycam plan',
    viewLabel: 'Open monthly vs lifetime pricing',
  },
  {
    slug: 'cloud-dma',
    label: 'Infrastructure',
    title: 'Cloud DMA for Bodycam',
    href: '/cloud-dma-for-bodycam/',
    buyUrl: CLOUD_DMA_CHECKOUT,
    badge: 'Required stack',
    variant: 'essential',
    icon: 'reqCpu',
    features: ['Hyper-V single-PC', 'Windows 10 & 11', 'Lifetime $50 license', 'Add-ons priced separately'],
    more: 1,
    buyLabel: 'Buy Cloud DMA license',
    viewLabel: 'Read Cloud DMA requirements',
  },
];

export const landingGuideCards = [
  {
    title: 'Bodycam cheats price',
    desc: 'Compare $35 monthly and $150 lifetime access before checkout.',
    href: '/bodycam-cheats-price/',
    readLabel: 'View pricing',
    image: BODYCAM_IMAGES.espWarehouse,
  },
  {
    title: 'Aimbot features',
    desc: 'FOV, silent aim, target zones and weapon options.',
    href: '/bodycam-aimbot/',
    readLabel: 'Aimbot guide',
    image: BODYCAM_IMAGES.aimbotFovSnapline,
  },
  {
    title: 'System requirements',
    desc: 'Windows 10/11, GPU, HVCI, TPM, Secure Boot and Cloud DMA.',
    href: '/bodycam-requirements/',
    readLabel: 'Requirements',
    image: BODYCAM_IMAGES.povHallway,
  },
];
