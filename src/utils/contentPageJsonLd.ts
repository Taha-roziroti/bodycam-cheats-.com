import { checkoutPath } from '../config/checkout';
import {
  BL3_CHECKOUT,
  bl3ProductOffers,
  cloudDmaOffer,
  CLOUD_DMA_CHECKOUT,
} from '../data/borderlands3Site';
import { PRODUCT_ID, SITE_URL } from '../data/site';
import {
  breadcrumbSchema,
  guideArticleSchema,
  productSchema,
  webPageSchema,
  type BreadcrumbItem,
} from './schema';

export function breadcrumbsForRoute(route: string): BreadcrumbItem[] {
  if (route === '/') return [{ name: 'Home', path: '/' }];
  if (route === '/pricing/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing/' },
    ];
  }
  if (route === '/cloud-dma/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Cloud DMA', path: '/cloud-dma/' },
    ];
  }
  if (route === '/guides/cloud-dma-setup/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Cloud DMA setup guide', path: '/guides/cloud-dma-setup/' },
    ];
  }
  if (route === '/guides/borderlands-3-cheat-system-requirements/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'System requirements', path: '/guides/borderlands-3-cheat-system-requirements/' },
    ];
  }
  return [{ name: 'Home', path: '/' }];
}

export function jsonLdForContentPage(input: {
  route: string;
  seoTitle: string;
  metaDescription: string;
  schemaTypes: string[];
  articlePublished?: string;
}): Record<string, unknown>[] {
  const breadcrumbs = breadcrumbsForRoute(input.route);
  const blocks: Record<string, unknown>[] = [];

  if (input.schemaTypes.includes('Product')) {
    if (input.route === '/') {
      blocks.push(
        productSchema({
          name: 'Borderlands 3 Cheats for PC',
          description: input.metaDescription,
          url: '/',
          offerUrl: BL3_CHECKOUT,
          sku: 'borderlands-3-cheats',
          image: '/images/borderlands3/borderlands-3-esp-soft-aim-hero.webp',
          productId: PRODUCT_ID,
          offers: [...bl3ProductOffers],
        }),
      );
    } else if (input.route === '/cloud-dma/') {
      blocks.push(
        productSchema({
          name: 'Cloud DMA for Game Cheats',
          description: input.metaDescription,
          url: '/cloud-dma/',
          offerUrl: CLOUD_DMA_CHECKOUT,
          sku: 'cloud-dma-license',
          productId: `${SITE_URL}/cloud-dma/#product`,
          offers: [
            {
              name: cloudDmaOffer.name,
              priceUsd: cloudDmaOffer.priceUsd,
              url: CLOUD_DMA_CHECKOUT,
            },
          ],
        }),
      );
    }
  }

  if (input.schemaTypes.includes('WebPage')) {
    blocks.push(
      webPageSchema({
        name: input.seoTitle,
        description: input.metaDescription,
        url: input.route,
      }),
    );
  }

  if (input.schemaTypes.includes('Article') && input.articlePublished) {
    blocks.push(
      guideArticleSchema({
        name: input.seoTitle,
        description: input.metaDescription,
        url: input.route,
        datePublished: input.articlePublished,
      }),
    );
  }

  if (input.schemaTypes.includes('BreadcrumbList')) {
    blocks.push(breadcrumbSchema(breadcrumbs));
  }

  return blocks;
}

export function defaultEndCtaHref(route: string, checkout?: 'borderlands-3' | 'cloud-dma'): string {
  if (checkout === 'cloud-dma') return checkoutPath('cloudDma');
  if (checkout === 'borderlands-3') return checkoutPath('borderlands3');
  if (route === '/pricing/') return checkoutPath('borderlands3');
  if (route === '/cloud-dma/') return checkoutPath('cloudDma');
  return checkoutPath('borderlands3');
}
