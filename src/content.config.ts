import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/pages' }),
  schema: z.object({
    route: z.string(),
    seoTitle: z.string(),
    metaDescription: z.string(),
    schemaTypes: z.array(z.string()),
    layout: z.enum(['product', 'pricing', 'article']),
    checkout: z.enum(['borderlands-3', 'cloud-dma']).optional(),
    articlePublished: z.string().optional(),
    showAdditionalCostsCallout: z.boolean().optional(),
    endCtaLabel: z.string().optional(),
    endCtaHref: z.string().optional(),
    heroImage: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    ogImage: z.string().optional(),
    figures: z
      .array(
        z.object({
          src: z.string().optional(),
          alt: z.string(),
          filename: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { pages };
