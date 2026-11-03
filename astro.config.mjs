import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';

export default defineConfig({
  site: 'https://borderlands3cheats.com',
  trailingSlash: 'always',
  redirects: {
    '/buy-borderlands-3-cheats/': '/',
    '/buy-borderlands-3-cheat/': '/',
    '/borderlands-3-cheats/': '/',
    '/borderlands-3-cheats-price/': '/pricing/',
    '/borderlands-3-esp/': '/',
    '/borderlands-3-aimbot/': '/',
    '/cloud-dma-setup/': '/guides/cloud-dma-setup/',
    '/cheats/': '/',
    '/products/dota-2-cheats/': '/',
    '/products/dota-2-cheats/elite/': '/',
    '/products/dota-2-cheats/utilities/': '/',
    '/cheats/lite/': '/',
    '/cheats/pro/': '/',
    '/cheats/elite/': '/',
    '/cheats/compare/': '/blog/dota-2-lite-vs-pro/',
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
