/** Zadeyo affiliate gateway (TAHA) — used for Borderlands 3 checkout redirects. */
const AFFILIATE_GO = 'https://zadeyo.com/go/TAHA';

function affiliateTo(productPath) {
  return `${AFFILIATE_GO}?to=${encodeURIComponent(productPath)}`;
}

/** Checkout destinations keyed by internal product id. */
export const CHECKOUT_URLS = {
  borderlands3: affiliateTo('/products/borderlands-3'),
  cloudDma: affiliateTo('/products/cloud-dma'),
  dota2: 'https://zadeyo.com/products/dota-2',
  skinChanger: 'https://zadeyo.com/products/skin-changer',
  hwidSpoofer: affiliateTo('/products/hwid-spoofer'),
  ugc: 'https://zadeyo.com/products/ugc',
};

/** Checkout paths → external product URLs (used by Node serve + Astro middleware + _redirects). */
export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/borderlands-3', CHECKOUT_URLS.borderlands3],
  ['/go/borderlands-3/', CHECKOUT_URLS.borderlands3],
  ['/go/cloud-dma', CHECKOUT_URLS.cloudDma],
  ['/go/cloud-dma/', CHECKOUT_URLS.cloudDma],
  ['/go/dota-2', CHECKOUT_URLS.dota2],
  ['/go/dota-2/', CHECKOUT_URLS.dota2],
  ['/go/skin-changer', CHECKOUT_URLS.skinChanger],
  ['/go/skin-changer/', CHECKOUT_URLS.skinChanger],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

function mergeSearchParams(destination, search) {
  if (!search || search === '?') return destination;
  const raw = search.startsWith('?') ? search.slice(1) : search;
  if (!raw) return destination;
  const dest = new URL(destination);
  const extra = new URLSearchParams(raw);
  for (const [key, value] of extra) {
    dest.searchParams.set(key, value);
  }
  return dest.toString();
}

export function resolveCheckoutPathRedirect(pathname, search = '') {
  if (pathname === '/go' || pathname === '/go/') return null;

  let base =
    CHECKOUT_PATH_REDIRECTS.get(pathname) ??
    (pathname !== '/' && !pathname.endsWith('/')
      ? (CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null)
      : null);

  if (!base) return null;
  return mergeSearchParams(base, search);
}

/** Unique /go paths for static host redirect files (Netlify / Cloudflare Pages). */
export function checkoutRedirectLines() {
  const seen = new Set();
  const lines = [];
  for (const [from, to] of CHECKOUT_PATH_REDIRECTS) {
    if (seen.has(from)) continue;
    seen.add(from);
    lines.push(`${from} ${to} 302`);
  }
  return lines.sort((a, b) => a.localeCompare(b));
}
