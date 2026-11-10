import { CHECKOUT_HUB_PATH, checkoutPath } from '../config/checkout';

export type CheckoutProductId = 'main-product' | 'cloud-dma' | 'hwid-spoofer';

/** Pages where buy goes straight to one product (no three-way chooser). */
const LOCKED_PRODUCT_BY_ROUTE: Record<string, CheckoutProductId> = {
  '/': 'main-product',
  '/bodycam-cheats-price/': 'main-product',
  '/bodycam-aimbot/': 'main-product',
  '/bodycam-esp/': 'main-product',
  '/bodycam-requirements/': 'main-product',
  '/cloud-dma-for-bodycam/': 'cloud-dma',
  '/guides/cloud-dma-setup/': 'cloud-dma',
  '/hwid-spoofer/': 'hwid-spoofer',
};

export function normalizeSitePath(pathname: string): string {
  let p = pathname || '/';
  if (!p.startsWith('/')) p = `/${p}`;
  if (p !== '/' && !p.endsWith('/')) p = `${p}/`;
  return p;
}

export function lockedCheckoutProduct(pathname: string): CheckoutProductId | null {
  return LOCKED_PRODUCT_BY_ROUTE[normalizeSitePath(pathname)] ?? null;
}

export function checkoutHrefForProduct(product: CheckoutProductId): string {
  switch (product) {
    case 'cloud-dma':
      return checkoutPath('cloudDma');
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    default:
      return checkoutPath('mainProduct');
  }
}

/** Header / generic “Buy” CTA: hub when ambiguous, direct on product pages. */
export function primaryBuyHref(pathname: string): string {
  const locked = lockedCheckoutProduct(pathname);
  if (locked) return checkoutHrefForProduct(locked);
  return CHECKOUT_HUB_PATH;
}

export function opensCheckoutHub(pathname: string): boolean {
  return lockedCheckoutProduct(pathname) === null;
}

export function checkoutPanelHeading(product: CheckoutProductId): string {
  switch (product) {
    case 'cloud-dma':
      return 'Cloud DMA license';
    case 'hwid-spoofer':
      return 'HWID Spoofer';
    default:
      return 'Select a plan';
  }
}
