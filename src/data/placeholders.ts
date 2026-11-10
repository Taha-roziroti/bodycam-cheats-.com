import { BODYCAM_IMAGES } from './bodycamImages';

/** Shared placeholder media paths — SVG fallbacks when no product shot exists. */

export const PLACEHOLDER_HERO = '/images/placeholders/hero.svg';
export const PLACEHOLDER_GALLERY = '/images/placeholders/gallery.svg';
export const PLACEHOLDER_BLOG = '/images/placeholders/blog.svg';

/** Primary Bodycam marketing hero (responsive widths via optimize-images). */
export const BODYCAM_HERO = BODYCAM_IMAGES.hero.src;

export const PLACEHOLDER_ALT = {
  hero: 'Hero image placeholder — replace with your artwork',
  gallery: 'Product screenshot placeholder',
  blog: 'Blog post image placeholder',
} as const;
