# Unslop run — borderlands3cheats.com

_unslop by [@heydamir](https://x.com/heydamir) (CC BY 4.0)_

**Scope:** Shared shell and BL3 money pages (`ContentPage`, header, footer, checkout, theme). Legacy Dota blog/forum/product routes remain noindexed and were not fully redlined.

## Audit (before)

| Sign | Where |
| --- | --- |
| Purple SaaS accent `#7f3dee` on chrome, scrollbar, CTAs | `starwind.css`, `BaseLayout` theme-color |
| Glass floating nav + heavy blur/shadow | `Header.astro` |
| Gradient slide-reveal CTA (animated width) | `SlideRevealButton` + `global.css` |
| Uppercase tracked eyebrows/labels | `section-header`, `CheckoutPanel`, `Footer` |
| Bold 700 headings + wide Rajdhani tracking | `starwind.css` base, `ContentPage` |
| Primary-colored logo wordmark + “Try Now” CTA | `Header`, `i18n/en.ts` |
| Purple ring on checkout card | `CheckoutPanel.astro` |
| Vague “Explore / Discover” closers | `home.md`, `pricing.md` |

**Severity:** Medium on BL3 path (template purple + glass nav + uppercase labels). Heavy slop still on legacy Dota surfaces (`forum.css`, `HeroSection`, product pages).

## Direction

- **Product:** Borderlands 3 PC cheat software and Cloud DMA for Windows players who want ESP, aim assist, and loot awareness.
- **Character:** Tactical, dry, loot-forward (not “startup purple”).
- **World:** Pandora — industrial desert, HUD overlays, rarity orange (not violet gradients).
- **Moments:** Real gameplay WebPs in content; checkout panel as the main accent surface.
- **Signature:** Small orange “rarity” dot beside the wordmark in the header.

## Passes applied

1. **Spacing** — Nav height aligned to 56/64px grid; footer/nav gaps unchanged but consistent with 4px scale.
2. **Color** — Warm graphite neutrals; accent `#c2410c`; hairline borders; neutral scrollbars.
3. **Icons** — Unchanged set (Lucide/Tabler); nav hover uses foreground not accent flood.
4. **Copy** — “View plans” CTA; tighter home/pricing closers; full wordmark in header/footer.
5. **Type** — Section eyebrows sentence case, weight 600 cap on content headings.
6. **Layout** — Quieter solid nav bar (no glass pill); content structure preserved.
7. **Details** — Checkout card: flat border, tabular total, no purple ring.
8. **Visuals** — Existing BL3 screenshots remain the rich moment (no new generated hero).
9. **Motion** — Removed slide-reveal width animation; buttons use explicit transition properties.

## Suggestions (not done)

- Move hero WebP above the fold before long intro copy on product layout.
- Full unslop pass on legacy Dota CSS (`forum.css`, `HeroSection`, uppercase product heroes).
- Regenerate `logo.svg` to match orange accent (file still may read purple).
- Story video (`unslop-story/story.html`) if you want a shareable before/after.

## Verify

`npm run build` — verify-seo and verify-redirects OK after changes.
