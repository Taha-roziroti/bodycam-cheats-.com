# SEO Super Booster — Bodycam Cheats (bodycam-cheats.com)

Implementation playbook for this Astro template. **CI-enforced** on `npm run build` via `scripts/verify-seo.mjs` and `scripts/verify-redirects.mjs`.

## 1. Single canonical host

- `SITE_URL` / `SITE_HOST` in `src/data/site.ts` → `https://bodycam-cheats.com` (apex, no `www`).
- Deploy host (`public/_redirects` on Cloudflare Pages) → **301** `www` → apex.
- Every money page: self-referencing `rel=canonical`, `hreflang=en`, `hreflang=x-default` on the same apex URL.

## 2. Page-level metadata discipline

- One `<h1>` per indexed money page; unique `<title>` and `meta description` sitewide (no duplicates among money routes).
- `og:title` / `og:description` match `<title>` / description exactly.
- `og:image` + `twitter:image` → `https://bodycam-cheats.com/og/*.jpg` at **1200×630** (`og:image:width` / `height`).
- `rel=image_src` on all indexable money pages.
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- No `meta keywords`, no `SearchAction`, no keyword-list JSON-LD.

## 3. Structured data graph

- Shared `@id` `https://bodycam-cheats.com/#product` on home and pricing JSON-LD (`PRODUCT_ID` in `src/data/site.ts`).
- `Organization` + `WebSite` on every page (`siteIdentityGraph()` in `src/utils/siteIdentityGraph.ts`); `SITE_PURPOSE` states **Bodycam PC** focus.
- `SITE_ABOUT`: exactly **6** `knowsAbout` terms.
- `FAQPage` JSON-LD **only** on `/faq/` (one graph). In-page FAQ sections on money pages are UI-only—no duplicate `FAQPage`.
- Optional: `/reviews` with `Review` + `AggregateRating`—not required for CI.

## 4. Intent map (not rendered as keywords)

Use `SEO_ROUTE_INTENTS` in `src/data/site.ts` when writing copy. Primary queries:

| Route | Focus |
|-------|--------|
| `/` | Bodycam cheats, ESP, aimbot, PC |
| `/bodycam-aimbot/` | Bodycam aimbot, FOV, silent aim |
| `/bodycam-esp/` | Bodycam ESP, wallhack, player overlays |
| `/bodycam-cheats-price/` | Bodycam cheats price, monthly vs lifetime |
| `/bodycam-requirements/` | Bodycam cheat requirements, Windows 10/11 |
| `/cloud-dma-for-bodycam/` | Cloud DMA for Bodycam, Hyper-V single-PC |
| `/guides/cloud-dma-setup/` | Cloud DMA setup, virtualization, GREENWARD / Static Server / AWS |
| `/faq/` | pricing, Windows, Cloud DMA costs, delivery |

## 5. Media & thumbnails

- Product WebPs under `public/images/bodycam/` (source masters + widths from `scripts/optimize-images.mjs`).
- `scripts/generate-seo-assets.mjs` (runs in `build`) writes `/og/*.jpg` from Bodycam hero/screenshots.
- Content figures and hero images: unique alts in markdown frontmatter and `src/data/bodycamImages.ts`.
- Legacy Dota assets remain for `/blog` and `/forum` (noindex in `BaseLayout`).

## 6. Sitemap super-boost

- Single `dist/sitemap.xml` urlset (not an index); post-processed by `scripts/generate-sitemaps.mjs` after build.
- Money URLs include ≥1 `image:image` (see `SITEMAP_IMAGES` in `src/data/site.ts`).
- `<?xml-stylesheet href="/sitemap.css"?>` for human-readable view.
- No duplicate hreflang in XML (HTML only).
- Sitemap filter excludes `/blog`, `/forum`, `/products/`, `/cheats/`, `/go/` (`src/config/sitemap.ts`).

## 7. Crawl rules

- `public/robots.txt`: `Sitemap: https://bodycam-cheats.com/sitemap.xml`, explicit `Googlebot`.
- Legacy blog/forum/product URLs: `noindex` in layout where applicable.

## 8. Keyword URL aliases (`public/_redirects` + `scripts/redirects.mjs`)

301 commercial and legacy paths to money pages (verified by `verify-redirects.mjs`), e.g.:

- `/bodycam-cheats`, `/bodycam-hacks`, `/cheats` → `/`
- `/pricing` → `/bodycam-cheats-price/`
- `/cloud-dma` → `/cloud-dma-for-bodycam/`
- `/cloud-dma-setup` → `/guides/cloud-dma-setup/`
- `/guides/system-requirements` → `/bodycam-requirements/`
- Legacy Borderlands/Dota product paths → Bodycam routes or `/`

Checkout paths under `/go/*` are **302** to external seller URLs (disallowed in `robots.txt`).

## 9. Build commands

```bash
npm run generate:seo-assets   # OG JPEGs
npm run optimize:images       # responsive WebPs
npm run build                 # verify-redirects → assets → astro → sitemaps → verify-seo → indexnow
```

## 10. Content pages

- Markdown in `content/pages/*.md`; rendered by `src/components/content/ContentPage.astro` (and home overview block on `/`).
- One markdown render per page (no split-body `render()`—Astro ignores overridden `body` on split entries).
- Cloud DMA additional-costs callout: component on product pages; inline detail in setup guide where needed.

## 11. Rebrand checklist (new game)

1. Edit `src/data/site.ts` (URL, name, `SITE_PURPOSE`, `LISTED_PRICES`, intents, OG map, `INDEXABLE_MONEY_ROUTES`).
2. Replace `content/pages/*.md` and `public/images/<game>/`.
3. Update `scripts/verify-seo.mjs` / `verify-redirects.mjs` routes and host if domain changes.
4. `npm run build` until verification passes.
