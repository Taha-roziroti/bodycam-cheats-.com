import { canonicalUrl } from './seo';

/** Locales served (extend here when adding translated routes). */
export const HREFLANG_LOCALES = ['en', 'en-US'] as const;

export type HreflangAlternate = {
  hreflang: string;
  href: string;
};

/**
 * Self-referencing alternates + x-default (absolute URLs) for a pathname.
 */
export function hreflangAlternates(pathname: string): HreflangAlternate[] {
  const href = canonicalUrl(pathname);
  const locales = HREFLANG_LOCALES.map((lang) => ({ hreflang: lang, href }));
  return [...locales, { hreflang: 'x-default', href }];
}
