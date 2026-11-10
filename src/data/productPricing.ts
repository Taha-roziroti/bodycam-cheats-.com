/** Single source of truth for monthly access length (FAQ and plan selector). Matches Zadeyo listing. */
export const MONTHLY_ACCESS_DAYS = 30;

export type ProductPlanId = 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const mainProductPlans: ProductPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    priceUsd: 35,
    priceNote: `USD · ${MONTHLY_ACCESS_DAYS}-day access`,
  },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time' },
];

const hwidSpooferPlans: ProductPlan[] = [
  {
    id: 'onetime',
    label: 'Lifetime access',
    priceUsd: 50,
    priceNote: 'USD · one-time',
  },
];

const cloudDmaPlans: ProductPlan[] = [
  {
    id: 'lifetime',
    label: 'Lifetime license',
    priceUsd: 50,
    priceNote: 'USD · license only (see add-ons)',
  },
];

const standardPlans: ProductPlan[] = mainProductPlans;

const ugcPlans: ProductPlan[] = [
  { id: 'onetime', label: 'One-time access', priceUsd: 50, priceNote: 'USD · one-time' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'ugc') return ugcPlans;
  if (productSlug === 'hwid-spoofer') return hwidSpooferPlans;
  if (productSlug === 'cloud-dma') return cloudDmaPlans;
  if (productSlug === 'main-product' || productSlug === 'bodycam' || productSlug === 'borderlands-3')
    return mainProductPlans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
