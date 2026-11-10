/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/'],
  ['/cheats/', '/'],
  ['/products/dota-2-cheats', '/'],
  ['/products/dota-2-cheats/', '/'],
  ['/pricing', '/bodycam-cheats-price/'],
  ['/pricing/', '/bodycam-cheats-price/'],
  ['/bodycam-hacks', '/'],
  ['/bodycam-hacks/', '/'],
  ['/bodycam-cheats', '/'],
  ['/bodycam-cheats/', '/'],
  ['/cloud-dma', '/cloud-dma-for-bodycam/'],
  ['/cloud-dma/', '/cloud-dma-for-bodycam/'],
  ['/guides/system-requirements', '/bodycam-requirements/'],
  ['/guides/system-requirements/', '/bodycam-requirements/'],
  ['/guides/borderlands-3-cheat-system-requirements', '/bodycam-requirements/'],
  ['/guides/borderlands-3-cheat-system-requirements/', '/bodycam-requirements/'],
  ['/go/main-product', '/go/bodycam/'],
  ['/go/main-product/', '/go/bodycam/'],
  ['/go/borderlands-3', '/go/bodycam/'],
  ['/go/borderlands-3/', '/go/bodycam/'],
  ['/cloud-dma-setup', '/guides/cloud-dma-setup/'],
  ['/cloud-dma-setup/', '/guides/cloud-dma-setup/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
]);

export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
