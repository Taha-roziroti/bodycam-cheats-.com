import type { BlogPostFull } from './types';

export const blogPosts: BlogPostFull[] = [
  {
    tag: 'Guides',
    title: 'Placeholder blog post — replace with your first article',
    slug: 'placeholder-article',
    image: '/images/bodycam/bodycam-esp-forest-cyan.webp',
    desc: 'Short description placeholder for your blog listing card.',
    date: 'Jan 1, 2026',
    readTime: '3 min read',
    body: [
      {
        type: 'p',
        text: 'Replace this article body with your long-form content. You can link to [pricing](/pricing/) or other routes.',
      },
      { type: 'h2', text: 'Section heading placeholder' },
      {
        type: 'p',
        text: 'Add steps, tables, or lists using the BlogPostFull body types already supported by the theme.',
      },
    ],
  },
];
