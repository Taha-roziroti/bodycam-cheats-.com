import { BODYCAM_IMAGES } from '../data/bodycamImages';

/** Map responsive /srcset paths back to catalog master WebP. */
export function normalizeBodycamImageSrc(src: string): string {
  const pathOnly = src.split(/[?#]/)[0];
  return pathOnly.replace(/-\d+\.webp$/i, '.webp');
}

export function bodycamAltForSrc(src: string): string | undefined {
  const normalized = normalizeBodycamImageSrc(src);
  for (const entry of Object.values(BODYCAM_IMAGES)) {
    if (normalized === entry.src || src.startsWith(entry.src.replace(/\.webp$/, ''))) {
      return entry.alt;
    }
  }
  return undefined;
}

export function resolveImageAlt(src: string, fallback: string): string {
  const catalog = bodycamAltForSrc(src);
  if (catalog) return catalog;
  return fallback.trim();
}
