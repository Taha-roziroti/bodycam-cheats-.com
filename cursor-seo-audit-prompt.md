# Cursor `/goal` Prompt: Full Website SEO Audit

Paste everything below the line after `/goal ` in Cursor.

---

## OBJECTIVE

Audit this entire website and fix every issue directly, in repeated full passes, until it is technically and structurally perfect for SEO. Do not ask for permission before making fixes. Work autonomously until a STOP CONDITION below is met, then stop completely.

## AUTONOMY RULES

- Fix everything you find immediately. Do not ask for approval, and do not stop to report between passes.
- Only pause if a required input is truly missing (for example the real affiliate URL or keyword list). In that case use a clearly marked placeholder, log it in AUDIT_LOG.md, and keep going on everything else.
- Commit locally after each green pass (`audit pass N: <summary>`). Never push, deploy, or modify any template/source repo unless I explicitly say so.
- Do not redesign the site. Preserve the existing look, layout, components, animations, and responsiveness unless a specific fix requires a change.
- Never "pass" an audit by cheating: do not delete pages or content, add noindex, loosen thresholds, skip checks, or mark items verified without running the command that proves it.

## STEP 0: RECON AND TOOLING (before any fixes)

1. Detect the stack (expected: Astro), build/dev commands, hosting/redirect config (_redirects, netlify.toml, vercel.json, astro.config redirects, etc.), and the keyword map/source of truth if one exists in the repo.
2. Create `scripts/seo-audit.mjs` (or equivalent) plus an `npm run audit` script. It must build the site, crawl the built output, run every scriptable check below, print a failure list grouped by category, and exit non-zero if anything fails. You may add new checks only during passes 1-3. After pass 3 the script is FROZEN, apart from fixing a bug in the script itself.
3. Create `AUDIT_LOG.md`. After every pass record: pass number, issues found per category, issues fixed, issues remaining, files changed, and evidence (command output). Also keep a "Decisions" list (fixes chosen and why) and a "Blocked" list. Re-read this file at the start of every turn so progress survives context resets.
4. Run a baseline audit and log it as pass 0.

## PASS LOOP

Repeat: run `npm run audit` -> fix everything it reports plus anything found in the judgment reviews -> rebuild -> re-run the scriptable audit -> log -> commit.

If a fix breaks the build or a previously passing check, revert that fix and solve it a different way.

## LOOP SAFETY AND STOP CONDITIONS

Prevent endless rechecking. These rules override everything else.

- **Hard cap:** at most 8 passes after the baseline. Track the pass number in AUDIT_LOG.md. On reaching the cap, stop and write the final report with whatever remains.
- **Per-issue cap:** try at most 3 genuinely different fixes for any single issue. If it still fails, add it to "Blocked" with the reason and what I would need to do, and exclude it from the pass/fail condition. Do not keep retrying it.
- **No-progress rule:** if the number of open issues does not drop for 2 consecutive passes, move every remaining issue to "Blocked" and go straight to final verification.
- **No-change rule:** if a pass makes zero file changes, do not run another pass. Treat the remaining failures as Blocked, run final verification, and stop.
- **Never re-check what has not changed.** Judgment reviews (items 9-12) and Lighthouse run only on pages or templates whose files changed since they last passed. A page marked pass stays pass until its files change. Full-site judgment reviews happen only on the first pass and the final verification.
- **Cap subjective rewriting** at 2 rounds per page for spacing, relevancy, and wording. After that, mark the page pass or Blocked. Do not endlessly polish.
- **External link checks** run at most once per pass, with at most 2 retries. Timeouts, 429s, and bot-blocking 403s count as "unverified", not failures. List them in the final report and do not let them block completion.
- **Do not undo earlier decisions.** Before reversing any past fix, check the "Decisions" list. If two fixes conflict, find one solution that satisfies both, or move the item to Blocked. Never flip-flop.
- **Do not move the goalposts.** No new check categories, stricter thresholds, or extra scope after pass 3.
- **Final verification** is exactly 3 consecutive clean runs of `npm run audit` (exit 0), with the last two requiring no code changes. When they pass, write the final report, mark the goal complete, and stop. Do not run further audits, builds, or reviews after the final report.

## WHAT TO CHECK

### 1. Links and redirects

- Every internal link, anchor, and #fragment resolves (200). Zero 404s.
- No internal links pointing at a redirect; link straight to the final URL.
- No redirect chains, loops, or redirects to missing targets. Every redirect is a single-hop 301.
- Consistent trailing slashes, lowercase URLs, no index.html or duplicate-host variants (www/non-www, http/https).
- No placeholder hrefs (`#`, `javascript:void(0)`), no localhost/staging/dev URLs.
- Real 404 page that returns a 404 status.
- External links: valid HTTPS, correct rel (affiliate links use rel="sponsored noopener"). Verify live where network allows; otherwise list unverified ones in the log.
- Buy/pricing buttons use the single AFFILIATE_LINK_PLACEHOLDER until a real link is supplied. Never invent affiliate URLs.

### 2. Technical SEO

- Unique title (about 50-60 chars) and meta description (about 140-160 chars) on every page. Literal and descriptive, no clickbait.
- Exactly one H1 per page, no skipped heading levels.
- Self-referencing absolute canonicals, correct robots meta, no stray noindex from staging.
- Valid robots.txt referencing the sitemap. sitemap.xml lists only canonical, indexable, 200 URLs.
- Open Graph and Twitter tags complete, with working images.
- JSON-LD valid and matching visible content (Organization, WebSite, BreadcrumbList, plus Product/FAQ only where genuinely applicable). No fabricated ratings or reviews.
- US English only: `lang="en-US"`, no hreflang tags anywhere.
- Clean URL structure: short, lowercase, hyphenated, no query parameters.

### 3. Keyword usage

- Use only the keywords I supplied. One primary keyword per page, with secondaries assigned deliberately.
- No two pages targeting the same primary keyword (cannibalization).
- Flag and rewrite stuffing: unnatural exact-match repetition, the same phrase in every heading, alt text, anchor, and footer link, identical title/H1/meta wording, hidden or off-screen text.
- Flag repetitive wording across pages and boilerplate paragraphs. Rewrite to be natural and varied.

### 4. Information architecture

- Logical hierarchy where URL paths, navigation, and breadcrumbs agree.
- Every page reachable within 3 clicks of the homepage. No orphan or dead-end pages.
- Strong, relevant contextual internal linking (hub and spoke). Varied anchor text, no redundant anchors, no same-anchor-to-different-destination conflicts.
- Consistent header/footer navigation, no duplicate nav items.
- Zero template leakage: no leftover text, images, links, or data from any template repo. Remove files unrelated to this site's topic.

### 5. Content hygiene

- No lorem ipsum, TODO, placeholder, or duplicated paragraphs. Consistent brand name, no AI-sounding filler.

### 6. Images and media

- Every image exists, is non-empty, high-definition, and relevant. Descriptive alt text (not stuffed), empty alt only for decorative images.
- Width/height set to prevent layout shift. Modern formats (WebP/AVIF), responsive srcset, lazy-load below the fold, LCP image eager with fetchpriority.
- No unnecessary image repetition across pages. No AI-generated or stock images presented as authentic screenshots or photos.

### 7. Performance and build integrity

- Build completes with zero errors and zero warnings. Type checks and lint pass. No console errors in the browser.
- No render-blocking resources, proper font loading, minimal JS (islands only where needed). Run Lighthouse on key templates for mobile and desktop and fix what it flags (target 95+ across categories).
- No mixed content, leaked secrets, committed .env files, or leftover dev/debug code.

### 8. Accessibility and responsiveness

- Contrast, visible focus states, keyboard navigation, landmarks, skip link, labeled form fields, aria-labels where needed, prefers-reduced-motion respected for animations.
- No horizontal scroll or layout breakage at 320, 375, 768, 1024, and 1440 px. Check with a headless browser (e.g., Playwright) if available.

### 9. Spelling and language

- Add a spell-check step (e.g., cspell) to `npm run audit` covering all page content, metadata, alt text, and JSON-LD. Maintain a project dictionary only for legitimate brand, product, and game names. Never add a misspelling to it.
- Check US English spelling consistency, grammar, capitalization consistency (headings, buttons, brand name), and punctuation. Fix every error directly.

### 10. Spacing and visual layout

- Use Playwright (or equivalent) to screenshot every page at 375, 768, 1024, and 1440 px. Visually inspect each screenshot yourself.
- Flag and fix: large unexplained empty gaps, sections with too little content for their height, inconsistent padding/margins between similar sections, cramped or touching elements, text hugging screen edges, overlapping elements, orphaned single words or headings at the end of a block, and uneven card or grid heights.
- Measure computed section padding and gaps with script checks, and make spacing follow one consistent scale across the site.
- Keep fixes within the existing design system. Do not redesign.

### 11. Image and alt text accuracy

- Open and look at every image file. For each one, confirm the alt text accurately describes what is actually visible, uses natural language, and avoids repeating the page's primary keyword unless it truly describes the image.
- Confirm each image is relevant to its page's topic, matches its caption, and is not reused across pages without reason. Fix or replace alt text, and flag any image that is irrelevant, blurry, or low resolution.

### 12. Content relevancy

- For every page, review the actual copy and log in AUDIT_LOG.md: assigned primary keyword, search intent (informational, commercial, or transactional), and whether the page content genuinely satisfies that intent.
- Check that content stays on the site's niche, headings match the content beneath them, titles and meta descriptions accurately describe the page, internal link anchors match their destination page's topic, and FAQ/forum content is relevant and not generic filler.
- Rewrite off-topic, vague, repetitive, or padded sections directly. Add missing coverage where a page doesn't satisfy its intent. Use only the keywords I supplied.

## REVIEW TABLE

Judgment-based checks (items 9-12) cannot be proven by a script alone, so verify them by completing a per-page table in AUDIT_LOG.md with columns: page, spelling, spacing, images and alt, relevancy, status, last-changed hash. Every row must be marked pass (or Blocked, with a reason) and include a one-line justification. Follow the LOOP SAFETY rules above for when pages get re-reviewed.

## DEFINITION OF DONE (stop as soon as one of these is met)

- **A. Success:** `npm run build` succeeds with zero errors and zero warnings, `npm run audit` exits 0 on 3 consecutive runs (the last two with no code changes), and the REVIEW TABLE has every page marked pass, all logged with evidence in AUDIT_LOG.md.
- **B. Exhausted:** the 8-pass cap, the no-progress rule, or the no-change rule is reached. Everything remaining is listed under "Blocked" with reasons.

Either way, write the final report and stop.

## FINAL REPORT

Summarize: passes completed, issues fixed per category, Blocked items with reasons and what I need to do, anything that could not be verified (such as external links offline), and any inputs I still need to supply (such as the affiliate URL or keyword list). Then stop.
