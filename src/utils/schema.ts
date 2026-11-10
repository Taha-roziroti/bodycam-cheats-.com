import type { FaqItem } from '../i18n/types';
import { SITE_BRAND, SUPPORT_EMAIL } from '../config/site';
import { SITE_PURPOSE } from '../data/site';
import { SITE_ORIGIN, absoluteAssetUrl, canonicalUrl, getOrganizationSameAs } from '../config/seo';

export interface ProductOfferInput {
  name: string;
  priceUsd: number;
  priceCurrency?: string;
  url: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_BRAND,
    url: `${SITE_ORIGIN}/`,
    inLanguage: 'en-US',
    description: SITE_PURPOSE,
  };
}

export function organizationSchema() {
  const sameAs = getOrganizationSameAs();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_BRAND,
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/logo.svg`,
    email: SUPPORT_EMAIL,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        url: canonicalUrl('/support/'),
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
  };
}

export function collectionPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_BRAND,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function webPageSchema(input: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_BRAND,
      url: `${SITE_ORIGIN}/`,
    },
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.url),
    })),
  };
}

export function discussionForumPostingSchema(input: {
  name: string;
  text: string;
  url: string;
  author: string;
  comments: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: input.name,
    articleBody: input.text,
    url: canonicalUrl(input.url),
    author: { '@type': 'Person', name: input.author },
    commentCount: input.comments,
    isPartOf: { '@type': 'CollectionPage', name: `${SITE_BRAND} Community Forum`, url: canonicalUrl('/forum/') },
  };
}

function offerUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return canonicalUrl(path);
}

function buildOffer(offer: ProductOfferInput) {
  return {
    '@type': 'Offer' as const,
    name: offer.name,
    url: offerUrl(offer.url),
    price: offer.priceUsd.toFixed(2),
    priceCurrency: offer.priceCurrency ?? 'USD',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: SITE_BRAND,
    },
  };
}

export function productSchema(input: {
  name: string;
  description: string;
  url: string;
  offerUrl: string;
  image?: string;
  sku?: string;
  offers?: ProductOfferInput[];
  productId?: string;
}) {
  const offersBlock =
    input.offers && input.offers.length > 0
      ? input.offers.length === 1
        ? buildOffer(input.offers[0]!)
        : input.offers.map((o) => buildOffer(o))
      : {
          '@type': 'Offer',
          url: offerUrl(input.offerUrl),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: SITE_BRAND,
          },
        };

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    ...(input.productId ? { '@id': input.productId } : {}),
    name: input.name,
    description: input.description,
    sku: input.sku ?? input.url.replace(/\//g, '-'),
    brand: {
      '@type': 'Brand',
      name: SITE_BRAND,
    },
    ...(input.image ? { image: absoluteAssetUrl(input.image) } : {}),
    offers: offersBlock,
  };
}

/** Article schema for technical guides (not blog posts). */
export function guideArticleSchema(input: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: SITE_BRAND,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

/** @deprecated Prefer productSchema for product/cheat detail pages. */
export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offerUrl?: string;
}) {
  return productSchema({
    name: input.name,
    description: input.description,
    url: input.url,
    offerUrl: input.offerUrl ?? input.url,
    image: input.image,
  });
}

export function articleSchema(input: {
  name: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.name,
    description: input.description,
    url: canonicalUrl(input.url),
    image: absoluteAssetUrl(input.image),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: SITE_BRAND,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl(input.url),
    },
  };
}

export function parseBlogDate(date: string): string {
  const parsed = Date.parse(date);
  if (Number.isNaN(parsed)) return new Date().toISOString().slice(0, 10);
  return new Date(parsed).toISOString().slice(0, 10);
}
