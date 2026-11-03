import { CHECKOUT_URLS } from './checkout-redirects.mjs';

/**
 * External checkout URLs — server-side redirect targets only (never use as visible href).
 */
export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

/** URL slug for /go/[slug]/ checkout redirect pages. */
export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  borderlands3: 'borderlands-3',
  cloudDma: 'cloud-dma',
  dota2: 'dota-2',
  skinChanger: 'skin-changer',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

/** Internal checkout path shown to users (hides external URL on hover). */
export function checkoutPath(product: CheckoutProduct = 'borderlands3'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

/** Hub where visitors pick Borderlands 3, Cloud DMA, or HWID Spoofer before checkout. */
export const CHECKOUT_HUB_PATH = '/go/';

/** Default generic buy CTA (header, support pre-checkout). */
export const PRIMARY_CHECKOUT_PATH = CHECKOUT_HUB_PATH;

/** Map internal product slugs to checkout redirect paths. */
export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'unlock-all':
      return checkoutPath('skinChanger');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'account-recovery':
      return checkoutPath('ugc');
    case 'lite':
    case 'pro':
    case 'elite':
    case 'borderlands-3':
      return checkoutPath('borderlands3');
    case 'cloud-dma':
      return checkoutPath('cloudDma');
    default:
      return checkoutPath('borderlands3');
  }
}

/** Resolve blog CTA or legacy href values to internal checkout paths. */
export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  // Legacy / encoded product paths → internal checkout
  if (
    href.includes('%2Fproducts%2Fcloud-dma') ||
    href.includes('/products/cloud-dma') ||
    (href.includes('/go/TAHA') && href.includes('cloud-dma'))
  ) {
    return checkoutPath('cloudDma');
  }
  if (
    href.includes('borderlands-3') ||
    href.includes('/products/borderlands-3') ||
    (href.includes('/go/TAHA') && href.includes('borderlands-3'))
  ) {
    return checkoutPath('borderlands3');
  }
  if (
    href.includes('%2Fproducts%2Fskin-changer') ||
    href.includes('/products/skin-changer')
  ) {
    return checkoutPath('skinChanger');
  }
  if (
    href.includes('%2Fproducts%2Fhwid-spoofer') ||
    href.includes('/products/hwid-spoofer') ||
    (href.includes('/go/TAHA') && href.includes('hwid-spoofer'))
  ) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }
  if (href.includes('%2Fproducts%2Fdota-2') || href.includes('/products/dota-2')) {
    return checkoutPath('dota2');
  }

  return href;
}
