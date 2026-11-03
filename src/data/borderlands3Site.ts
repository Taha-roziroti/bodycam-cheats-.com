import { checkoutPath } from '../config/checkout';
import { MONTHLY_ACCESS_DAYS } from './productPricing';

/** Shared disclaimer — independent of Gearbox / 2K. */
export const PUBLISHER_DISCLAIMER =
  'Borderlands 3 Cheats is an independent site and is not affiliated with, endorsed by, or sponsored by the game publisher or its licensors. Borderlands 3 is used only as a descriptive reference to the supported game.';

export const FEATURE_TOOL_DISCLAIMER =
  'This product is a feature-based external cheat tool (ESP, soft aim, radar, recoil options)—not a traditional unlimited-health trainer or single-button god mode.';

export const CLOUD_DMA_ADDITIONAL_SERVICES = [
  {
    name: 'GREENWARD',
    summary: 'Separate service required for Cloud DMA activation and routing (purchased outside this license).',
  },
  {
    name: 'Static Server',
    summary: 'Dedicated static server hosting component—priced and bought separately from the Cloud DMA license.',
  },
  {
    name: 'AWS',
    summary: 'Amazon Web Services resources used in the Cloud DMA stack—ongoing or setup fees are not included in the $50 license.',
  },
] as const;

export const BL3_CHECKOUT = checkoutPath('borderlands3');
export const CLOUD_DMA_CHECKOUT = checkoutPath('cloudDma');

export const bl3ProductOffers = [
  { name: 'Borderlands 3 Cheats — Monthly', priceUsd: 35, url: BL3_CHECKOUT },
  { name: 'Borderlands 3 Cheats — Lifetime', priceUsd: 150, url: BL3_CHECKOUT },
] as const;

export const cloudDmaOffer = {
  name: 'Cloud DMA infrastructure license (lifetime)',
  priceUsd: 50,
  url: CLOUD_DMA_CHECKOUT,
} as const;

export const bl3Features = [
  'Enemy ESP with health bars and distance readouts',
  'Loot ESP with weapon rarity highlights',
  'Soft aim with configurable FOV and smoothing',
  'Radar overlay for nearby threats and pickups',
  'Recoil control and related combat tuning options',
  'In-game menu for toggles and configuration presets',
] as const;

export const bl3ClientRequirements = [
  'Supported client: Steam / official Borderlands 3 PC client',
  'Windows 10 or Windows 11 (64-bit)',
  'Minimum 8 GB RAM; dedicated GPU recommended',
  'HVCI, Core Isolation, TPM, and Secure Boot configured as required for supported builds',
  'Cloud DMA environment required for full functionality on supported builds',
] as const;

export const cloudDmaRequirements = [
  'Windows 10 or Windows 11 64-bit with Hyper-V capable edition',
  'CPU virtualization enabled in firmware and Windows',
  'Minimum 8 GB RAM; 16 GB recommended for the Hyper-V guest',
  'Stable wired or wireless internet connection',
  'Secure Boot and Core Isolation settings compatible with Hyper-V setup',
] as const;

export const monthlyPlanCopy = {
  priceUsd: 35,
  durationLabel: `${MONTHLY_ACCESS_DAYS}-day access`,
  renewal:
    'Each monthly payment extends access for another 30-day period from activation or renewal. Cancel future renewals according to checkout terms.',
} as const;

export const lifetimePlanCopy = {
  priceUsd: 150,
  durationLabel: 'Lifetime access',
  renewal: 'One-time payment for ongoing access to the Borderlands 3 cheat package while the product remains available.',
} as const;
