import { checkoutPath } from '../config/checkout';
import {
  MAIN_PRODUCT_CHECKOUT,
  mainProductOffers,
  cloudDmaOffer,
  CLOUD_DMA_CHECKOUT,
} from '../data/productSite';
import { BODYCAM_IMAGES } from '../data/bodycamImages';
import { BODYCAM_HERO } from '../data/placeholders';
import { LISTED_PRICES, PRODUCT_ID, SITE_URL } from '../data/site';
import {
  breadcrumbSchema,
  guideArticleSchema,
  productSchema,
  webPageSchema,
  type BreadcrumbItem,
} from './schema';

export function breadcrumbsForRoute(route: string): BreadcrumbItem[] {
  if (route === '/') return [{ name: 'Home', path: '/' }];
  if (route === '/bodycam-cheats-price/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/bodycam-cheats-price/' },
    ];
  }
  if (route === '/bodycam-aimbot/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Aimbot', path: '/bodycam-aimbot/' },
    ];
  }
  if (route === '/bodycam-esp/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'ESP', path: '/bodycam-esp/' },
    ];
  }
  if (route === '/bodycam-requirements/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Requirements', path: '/bodycam-requirements/' },
    ];
  }
  if (route === '/cloud-dma-for-bodycam/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Cloud DMA', path: '/cloud-dma-for-bodycam/' },
    ];
  }
  if (route === '/guides/cloud-dma-setup/') {
    return [
      { name: 'Home', path: '/' },
      { name: 'Cloud DMA', path: '/cloud-dma-for-bodycam/' },
      { name: 'Setup guide', path: '/guides/cloud-dma-setup/' },
    ];
  }
  return [{ name: 'Home', path: '/' }];
}

function productSchemaImage(route: string): string {
  switch (route) {
    case '/':
      return BODYCAM_HERO;
    case '/bodycam-cheats-price/':
      return BODYCAM_IMAGES.espWarehouse.src;
    case '/bodycam-aimbot/':
      return BODYCAM_IMAGES.menuAimbot.src;
    case '/bodycam-esp/':
      return BODYCAM_IMAGES.menuVisuals.src;
    case '/bodycam-requirements/':
      return BODYCAM_IMAGES.povHallway.src;
    case '/cloud-dma-for-bodycam/':
      return BODYCAM_IMAGES.hero.src;
    default:
      return BODYCAM_HERO;
  }
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
    if (input.route === '/' || input.route === '/bodycam-cheats-price/') {
      blocks.push(
        productSchema({
          name: 'Bodycam Cheats for PC',
          description: input.metaDescription,
          url: input.route,
          offerUrl: MAIN_PRODUCT_CHECKOUT,
          sku: 'bodycam-cheats',
          image: productSchemaImage(input.route),
          productId: input.route === '/' ? PRODUCT_ID : `${SITE_URL}/bodycam-cheats-price/#product`,
          offers: [...mainProductOffers],
        }),
      );
    } else if (input.route === '/cloud-dma-for-bodycam/') {
      blocks.push(
        productSchema({
          name: 'Cloud DMA for Bodycam',
          description: input.metaDescription,
          url: '/cloud-dma-for-bodycam/',
          offerUrl: CLOUD_DMA_CHECKOUT,
          sku: 'cloud-dma-license',
          productId: `${SITE_URL}/cloud-dma-for-bodycam/#product`,
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

  if (input.schemaTypes.includes('Offer') && input.route === '/') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Offer',
      name: 'Bodycam Cheats Monthly',
      price: LISTED_PRICES.monthlyUsd.toFixed(2),
      priceCurrency: 'USD',
      url: MAIN_PRODUCT_CHECKOUT,
    });
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

  const articleTypes = ['Article', 'TechArticle'];
  if (articleTypes.some((t) => input.schemaTypes.includes(t)) && input.articlePublished) {
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

export function defaultEndCtaHref(
  route: string,
  checkout?: 'main-product' | 'cloud-dma' | 'hwid-spoofer',
): string {
  if (checkout === 'cloud-dma') return checkoutPath('cloudDma');
  if (checkout === 'hwid-spoofer') return checkoutPath('hwidSpoofer');
  if (checkout === 'main-product') return checkoutPath('mainProduct');
  if (route === '/bodycam-cheats-price/') return checkoutPath('mainProduct');
  if (route === '/cloud-dma-for-bodycam/') return checkoutPath('cloudDma');
  return checkoutPath('mainProduct');
}
