/** Single source of truth for monthly access length (FAQ and plan selector). */
export const MONTHLY_ACCESS_DAYS = 30;

export type ProductPlanId = 'monthly' | 'lifetime' | 'onetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const bl3Plans: ProductPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    priceUsd: 35,
    priceNote: `USD · ${MONTHLY_ACCESS_DAYS}-day access`,
  },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · one-time' },
];

const cloudDmaPlans: ProductPlan[] = [
  {
    id: 'lifetime',
    label: 'Lifetime license',
    priceUsd: 50,
    priceNote: 'USD · license only (see add-ons)',
  },
];

const standardPlans: ProductPlan[] = bl3Plans;

const ugcPlans: ProductPlan[] = [
  { id: 'onetime', label: 'One-time access', priceUsd: 50, priceNote: 'USD · one-time' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'ugc') return ugcPlans;
  if (productSlug === 'cloud-dma') return cloudDmaPlans;
  if (productSlug === 'borderlands-3') return bl3Plans;
  return standardPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
