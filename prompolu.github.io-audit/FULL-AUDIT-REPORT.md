# PROMARK SEO/GEO audit and fixes

Reviewed 25 October 2026. Skill: Claude SEO full-site audit and GEO review.

## Result and scope

**Production-build readiness: 88/100**, a weighted editorial/technical assessment, not a Google score or ranking prediction. This rating excludes the deliberate staging noindex restriction. The review itself is intentionally ineligible for compliant search indexing; noindex is not a defect to remove before approval.

Scope: twelve static production-build pages, twelve public review routes, 36 local desktop/mobile render checks, menu/contact/project interactions, structured-data/link/sitemap checks and two fresh hosted mobile Lighthouse measurements. The production build was generated in an isolated temporary directory. Public inspection used the origin-root robots response (404/no exclusions), not the nested project robots file. Main content was verified in raw HTML as well as rendered pages.

Review URL: https://prompolu.github.io/promark-marketing-agency-/preview/studio-direction/

**The live production site and previous preview were not changed.** The publisher preserved all 92 files outside this preview folder byte-for-byte.

## Changes completed

- Added plain-language explanations and eight service-specific questions across the four service pages, preserving agreed offerings and case links.
- Replaced internal verification caveats with concrete descriptions of delivered work. No invented client results, staff, office address, testimonials or credentials.
- Added service catalog/entity URLs to production Organization/Service/CreativeWork data, matching visible content. Twelve canonicals, titles, descriptions and sitemap entries agree; all local links/assets/fragments pass validation.
- Added review social-preview images without publishing production canonicals/schema into staging. Updated the general social image to the current design.
- Converted self-hosted fonts from approximately 194 KB TTF to 64 KB WOFF2 (about 67% less font data); preload the body/display font.
- Fixed a visible-label/accessibility-name mismatch on the motion-design link.
- Deferred desktop-only clock initialization on phones after Lighthouse attributed a long task to its script.
- Removed the Chrome mixed-form warning from the review's draft-only flow. Draft actions activate after JS handlers attach; without JS, direct email/WhatsApp links remain available. Production Formspree delivery remains configured. Browser tests sent no real messages.
- Added a linked explanation of how enquiry fields are used. This is practical form transparency, not a claim of comprehensive legal compliance.
- Corrected outdated domain/page-count/robots documentation.

## Fresh mobile Lighthouse measurements

Measured hosted review homepage, Lighthouse 13.5.0, Chrome 155, simulated mobile. Runs 40236912659 and 40237243246. These are two synthetic samples, not a controlled experiment, field Core Web Vitals or whole-site guarantees.

| Metric | First measured pass | Final pass |
| --- | ---: | ---: |
| Performance | 83 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 77 | 100 |
| SEO | 63 | 63 |
| Largest contentful paint | 1.94 s | 1.26 s |
| Total blocking time | 574 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |

**Why SEO is 63:** Lighthouse's remaining failing scored SEO check is `is-crawlable`: review pages deliberately contain `noindex`. This score must not be presented as the production SEO result. Production indexability/canonicals/schema/sitemap were tested separately without publishing that build. No field INP, CrUX, Search Console indexing or ranking data is available. Cache-lifetime/render-blocking opportunities remain, largely constrained by static hosting; they did not prevent the final performance result.

## Readiness assessment

| Category | Score | Weight |
| --- | ---: | ---: |
| Technical SEO | 90 | 22% |
| Content Quality | 80 | 23% |
| On-Page SEO | 92 | 20% |
| Schema / Structured Data | 90 | 10% |
| Performance | 100 | 10% |
| AI Search Readiness | 82 | 10% |
| Images | 94 | 5% |

The assessment uses the Claude SEO audit weights. Content and AI readiness remain below the strongest technical categories because independent brand evidence and measured outcomes were not supplied. No platform-specific AI-visibility score is assigned.

## Crawl controls and launch limitation

`https://prompolu.github.io/robots.txt` returns 404. A robots file controls an origin only from `/robots.txt`; copies under `/promark-marketing-agency-/` or its preview folder are not authoritative. Therefore those copies do not prove that Googlebot or AI crawlers are blocked or that a sitemap is automatically discoverable.

The review is protected by HTML noindex. For the project production site, submit the sitemap directly to verified Search Console/Bing. Origin-root robots control requires an account-root GitHub Pages site or an owned custom domain; the user does not own promarketing.com and it is not configured.

## GEO, content and local identity

Promark's activity, Fès/Maroc location and user-confirmed contacts are consistent. All four service descriptions and three case studies are static HTML; the homepage's single portfolio CTA leads to ordinary case links. These support readers and search/answer engines without special AI files.

Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and Applebot have no root robots exclusion observed. That is not evidence of actual crawling/citations. GPTBot, ClaudeBot, Google-Extended, CCBot and Applebot-Extended are separate training controls and were not used to infer search visibility. See GEO-ANALYSIS.md.

No llms.txt ranking promise, synthetic publication freshness, commercial FAQ rich-result promise, fabricated author/review schema, extra city pages or fake discovery endpoints were added. VideoObject upload dates were not invented. A named employee biography is not a prerequisite for this agency; real team details can be added when supplied.

## Remaining owner-dependent work

1. Approve the new design for production separately; keep review noindex until then.
2. Verify webmaster-tool ownership, submit the production sitemap and inspect representative URLs. No verification values or analytics access were supplied.
3. Add approved testimonials and measured case outcomes with dates/methodology when available. Do not invent results to raise a score.
4. Supply verified business/social profile URLs and team information if they should be published. GBP/reviews/backlinks/brand mentions were not independently measured.
5. Measure real search enquiries, traffic, field CWV and actual answer-engine citations after launch. Source improvements do not establish those outcomes.

## Evidence and limits

- evidence/seo-validation.json: twelve-page production metadata/schema/link/sitemap validation.
- evidence/http-route-check.json: public review route/noindex checks.
- visual-data.json and screenshots/: 36 rendered route/viewport checks, no overflow/runtime errors, focus behavior and single S140RP gallery entry.
- evidence/contact-check.json: draft preparation/no-JS safeguards, zero messages sent.
- evidence/lighthouse-before/ and lighthouse-after/: raw JSON/HTML reports.
- evidence/lighthouse-comparison.json: measured before/after values.
- findings/: category notes. These are code/schema checks, not external rich-result certification.

Primary guidance: [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Google AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Google robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro). The analysis concerns eligibility, useful content and technical accessibility, not guaranteed rankings or AI citations.
