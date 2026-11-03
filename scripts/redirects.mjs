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
  ['/cheats/lite', '/'],
  ['/cheats/lite/', '/'],
  ['/cheats/pro', '/'],
  ['/cheats/pro/', '/'],
  ['/cheats/elite', '/'],
  ['/cheats/elite/', '/'],
  ['/cheats/compare', '/blog/dota-2-lite-vs-pro/'],
  ['/cheats/compare/', '/blog/dota-2-lite-vs-pro/'],
  ['/products/dota-2-cheats/utilities', '/products/dota-2-cheats/utilities/'],
  ['/products/dota-2-cheats', '/'],
  ['/products/dota-2-cheats/', '/'],
  ['/products/dota-2-cheats/account-recovery', '/products/dota-2-cheats/ugc/'],
  ['/products/dota-2-cheats/account-recovery/', '/products/dota-2-cheats/ugc/'],
  ['/buy-borderlands-3-cheats', '/'],
  ['/buy-borderlands-3-cheats/', '/'],
  ['/buy-borderlands-3-cheat', '/'],
  ['/buy-borderlands-3-cheat/', '/'],
  ['/borderlands-3-cheats', '/'],
  ['/borderlands-3-cheats/', '/'],
  ['/borderlands-3-cheats-price', '/pricing/'],
  ['/borderlands-3-cheats-price/', '/pricing/'],
  ['/borderlands-3-esp', '/'],
  ['/borderlands-3-esp/', '/'],
  ['/borderlands-3-aimbot', '/'],
  ['/borderlands-3-aimbot/', '/'],
  ['/cloud-dma-setup', '/guides/cloud-dma-setup/'],
  ['/cloud-dma-setup/', '/guides/cloud-dma-setup/'],
  ['/sitemap-index.xml', '/sitemap.xml'],
  ['/sitemap-0.xml', '/sitemap.xml'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
