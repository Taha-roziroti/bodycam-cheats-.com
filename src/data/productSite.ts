import { checkoutPath } from '../config/checkout';
import { LISTED_PRICES } from './site';
import { MONTHLY_ACCESS_DAYS } from './productPricing';

export const PUBLISHER_DISCLAIMER =
  'Bodycam Cheats is an independent resource. It is not operated by, endorsed by, or affiliated with Reissad Studio or other Bodycam rights holders. Bodycam is referenced only to describe supported software.';

export const FEATURE_TOOL_DISCLAIMER =
  'This listing is a feature-based external tool (ESP, aimbot, radar, recoil options)—not a generic trainer. We do not claim undetected status or ban protection.';

export const CLOUD_DMA_ADDITIONAL_SERVICES = [
  {
    name: 'GREENWARD',
    summary: 'Separate activation and routing service required for Cloud DMA (purchased outside the license).',
  },
  {
    name: 'Static Server',
    summary: 'Dedicated server component with its own fee—not included in the Cloud DMA license.',
  },
  {
    name: 'AWS',
    summary: 'Cloud resources with separate billing—not included in the $50 license.',
  },
] as const;

export const MAIN_PRODUCT_CHECKOUT = checkoutPath('mainProduct');
export const CLOUD_DMA_CHECKOUT = checkoutPath('cloudDma');
export const HWID_SPOOFER_CHECKOUT = checkoutPath('hwidSpoofer');

export const mainProductOffers = [
  {
    name: 'Bodycam Cheats — Monthly',
    priceUsd: LISTED_PRICES.monthlyUsd,
    url: MAIN_PRODUCT_CHECKOUT,
  },
  {
    name: 'Bodycam Cheats — Lifetime',
    priceUsd: LISTED_PRICES.lifetimeUsd,
    url: MAIN_PRODUCT_CHECKOUT,
  },
] as const;

export const cloudDmaOffer = {
  name: 'Cloud DMA infrastructure license (lifetime)',
  priceUsd: LISTED_PRICES.cloudDmaLifetimeUsd,
  url: CLOUD_DMA_CHECKOUT,
} as const;

export const hwidSpooferOffer = {
  name: 'HWID Spoofer (lifetime)',
  priceUsd: 50,
  url: HWID_SPOOFER_CHECKOUT,
} as const;

export const mainProductFeatures = [
  'Player ESP, box ESP, skeleton and snaplines',
  'Aimbot with FOV, target zones, silent aim and aim line',
  'Player chams, weapon chams, nicknames, health and distance',
  'Drone and bomb ESP where listed',
  'Recoil control, stream-proof overlay and radar options',
  'In-game menu with saveable configs',
] as const;

export const mainProductClientRequirements = [
  'Supported client: Bodycam on Windows PC',
  'Windows 10 or Windows 11 (64-bit)',
  'Minimum 8 GB RAM; dedicated GPU recommended',
  'HVCI, Core Isolation, TPM and Secure Boot as required for supported builds',
  'Cloud DMA environment required for full functionality on supported builds',
] as const;

export const cloudDmaRequirements = [
  'Windows 10 or Windows 11 64-bit with Hyper-V capable edition',
  'CPU virtualization enabled in firmware and Windows',
  'Minimum 8 GB RAM; 16 GB recommended for the Hyper-V guest',
  'Stable internet connection',
  'Secure Boot and Core Isolation compatible with Hyper-V setup',
] as const;

export const monthlyPlanCopy = {
  priceUsd: LISTED_PRICES.monthlyUsd,
  durationLabel: `${MONTHLY_ACCESS_DAYS}-day access`,
  renewal:
    'Each monthly payment extends access for another 30-day period from activation or renewal per checkout terms.',
} as const;

export const lifetimePlanCopy = {
  priceUsd: LISTED_PRICES.lifetimeUsd,
  durationLabel: 'Lifetime access',
  renewal: 'One-time payment for ongoing access while the Bodycam listing remains available.',
} as const;
