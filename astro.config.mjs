import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://bodycam-cheats.com',
  trailingSlash: 'always',
  redirects: {
    '/pricing/': '/bodycam-cheats-price/',
    '/guides/system-requirements/': '/bodycam-requirements/',
    '/cloud-dma/': '/cloud-dma-for-bodycam/',
    '/go/main-product/': '/go/bodycam/',
    '/go/borderlands-3/': '/go/bodycam/',
    '/guides/borderlands-3-cheat-system-requirements/': '/bodycam-requirements/',
    '/cloud-dma-setup/': '/guides/cloud-dma-setup/',
    '/bodycam-hacks/': '/',
    '/bodycam-cheats/': '/',
    '/cheats/': '/',
    '/products/dota-2-cheats/': '/',
    '/cheats/compare/': '/blog/placeholder-article/',
    '/contact/': '/support/',
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/unslop/**'],
      },
    },
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
});
