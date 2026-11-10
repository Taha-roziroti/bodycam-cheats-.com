# SEO audit log — bodycam-cheats.com

Source: `cursor-seo-audit-prompt.md`

## Pass 0 (baseline)

**Stack:** Astro 7, static `dist/`, Cloudflare `public/_redirects`, Astro `redirects` in `astro.config.mjs`, CI: `verify-seo.mjs`, `verify-redirects.mjs`.

**Tooling added:** `scripts/seo-audit.mjs`, `npm run audit` (build + redirect/SEO CI + HTML scan).

**Decisions**

| Topic | Choice | Why |
|-------|--------|-----|
| hreflang | Keep `en` + `x-default` | `verify-seo.mjs` + SEO-SUPER-BOOSTER require it; conflicts with audit §2 “no hreflang” → **Blocked** until one doc wins |
| Affiliate URLs | `/go/bodycam/`, `/go/cloud-dma/` | Real Zadeyo paths in `_redirects`; no invented URLs |
| Blog/forum/product pages | `noindex` + excluded from sitemap | Legacy template; not Bodycam money pages |

**Blocked (pass 0)**

- Lighthouse 95+ all categories — not automated in `npm run audit` (manual spot-check recommended).
- Legacy Dota blog/forum/product HTML — noindex, out of sitemap; full copy purge deferred.

## Pass 1 (scriptable green)

**Fixes:** Canonical internal URLs, `en-US`, FAQ/plan copy, meta descriptions on support/legal routes, `ctaHref` fixes.

**Evidence:** `npm run audit` exit 0 after full rebuild (unset `SKIP_BUILD`).

## Pass 2 (extended audit + layout)

**Tooling added (pass 1–3 scope):**

| Script | Purpose |
|--------|---------|
| `scripts/audit-spelling.mjs` + `cspell.json` | Item 9 — money-page markdown + `pageSeo.ts` + `bodycamPageFaqs.ts` |
| `scripts/audit-bodycam-images.mjs` | Item 11 — catalog files + alt text |
| `scripts/audit-responsive.mjs` | Item 8/10 — Playwright, no user-scrollable horizontal overflow at 320–1440px |

**Layout fixes:** `html/body { overflow-x: clip }`, products carousel clip, workflow CTAs stack on narrow viewports, end-CTA buttons `w-full` + wrap on mobile (`ContentPage`, home markdown CTA).

**Evidence (pass 2):**

```
audit-bodycam-images: OK (11 assets, 11 alts)
audit-spelling: OK (9 files)
audit-responsive: OK (13 routes × 5 viewports)
verify-seo: OK (6 money pages + sitemap/robots)
seo-audit: OK (55 HTML files scanned)
```

**Final verification:** Three consecutive `npm run audit` exit 0 after pass 2 tooling (runs 2–3 with no code changes before meta trim on cloud-dma-setup). Re-run triple after meta length trim:

```powershell
Remove-Item Env:SKIP_BUILD -ErrorAction SilentlyContinue
npm run audit  # ×3
```

**Pass number:** 2 of 8 max.

## Review table (judgment)

Intent notes: primary keyword from `pageSeo.ts` / route; **commercial** = money pages, **informational** = FAQ/guides/legal.

| Page | Spelling | Spacing | Images/alt | Relevancy | Status | Hash / notes |
|------|----------|---------|------------|-----------|--------|----------------|
| `/` | pass | pass | pass | pass | pass | `home.md` 19c2b2f6 — Bodycam cheats hub; responsive OK |
| `/bodycam-aimbot/` | pass | pass | pass | pass | pass | `a952f94a` — aimbot features; catalog alts match shots |
| `/bodycam-esp/` | pass | pass | pass | pass | pass | Bodycam ESP/wallhack intent; figures wired |
| `/bodycam-cheats-price/` | pass | pass | pass | pass | pass | Transactional pricing + `/go/bodycam/` |
| `/bodycam-requirements/` | pass | pass | pass | pass | pass | Windows/Cloud DMA reqs |
| `/cloud-dma-for-bodycam/` | pass | pass | pass | pass | pass | Cloud DMA commercial + setup links |
| `/faq/` | pass | pass | — | pass | pass | `siteFaqs` Bodycam-only on indexable FAQ |
| `/about/` | pass | pass | — | pass | pass | Independent publisher positioning |
| `/support/` | pass | pass | — | pass | pass | Checkout/setup help |
| `/privacy/` | pass | pass | — | pass | pass | Analytics/cookies disclosure |
| `/terms/` | pass | pass | — | pass | pass | External checkout terms |
| `/guides/cloud-dma-setup/` | pass | pass | — | pass | pass | Hyper-V setup intent |
| `/hwid-spoofer/` | pass | pass | pass | pass | pass | Placeholder utility; meta + routes indexed |

Repo HEAD at pass 2: `144f231`.

## Blocked (final)

| Item | Reason | Owner action |
|------|--------|----------------|
| hreflang `en` + `x-default` vs audit “no hreflang” | `verify-seo.mjs` requires tags | Pick one spec and align scripts |
| Lighthouse 95+ automated gate | Not in `npm run audit` | Run Lighthouse on `/` + one money template manually |
| Legacy Dota blog/forum/products | noindex, not in sitemap | Optional: delete or replace template routes |

## Final report (summary)

**Passes:** 0 baseline → 1 scriptable links/meta → 2 spelling/images/responsive + mobile layout.

**Fixed by category:** redirect-target links, meta description lengths, mobile horizontal scroll (carousel/CTAs), cspell on money copy, image catalog verification, `npm run audit` orchestration.

**Verified:** `npm run build` clean; `verify-seo`, `verify-redirects`, triple `npm run audit` exit 0; 13 sitemap URLs build; review table all **pass** for indexable routes.

**Unverified:** Live external affiliate HTTPS (checkout redirect targets); IndexNow (`INDEXNOW_KEY` unset).
