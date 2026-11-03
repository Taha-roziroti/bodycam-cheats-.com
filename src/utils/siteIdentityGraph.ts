import {
  SITE_ABOUT,
  SITE_NAME,
  SITE_PURPOSE,
  SITE_URL,
  SUPPORT_EMAIL,
} from '../data/site';
import { getOrganizationSameAs } from '../config/seo';

export function siteIdentityGraph() {
  const sameAs = getOrganizationSameAs();

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: SUPPORT_EMAIL,
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_PURPOSE,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#organization` },
      about: SITE_ABOUT.map((term) => ({
        '@type': 'Thing',
        name: term,
      })),
    },
  ];
}

export function assertCanonicalHost(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === SITE_HOST;
  } catch {
    return false;
  }
}
