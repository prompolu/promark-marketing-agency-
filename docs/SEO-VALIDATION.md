# Technical SEO validation

## Required automated checks

- `npm run build`: generates eight French pages, three static case studies, crawler directives and assets.
- `npm run check`: syntax checks for the build, local server, browser interaction code, metadata module and project data.
- `npm test`: three dependency-free tests. Covers production-origin validation and rejection of ambiguous/unsafe values; structured-data/content encoding; isolated production and preview builds with eight unique titles, one H1 per page, matching canonicals/sitemap, structured data, social tags, static case content and preview noindex/stale-sitemap removal.

The production integration test uses `https://agency.example` in a temporary directory and deletes that directory afterward. This reserved test origin is never saved as the production domain or distributed in the preview.

## Browser/runtime checks

Chromium/Playwright checks in `/workspace/promark-validation/seo-browser.cjs` cover eight routes at 1440, 768, 390 and 320px (32 combinations), local links, JavaScript-free case-study navigation, quick-preview-to-case navigation, native playback, canonical-path redirects and 404 status. Screenshots are retained outside the checkout.

The server redirects `/index.html` and slashless directory URLs to the slash URL in one 308 response while retaining query parameters. Case pages use native video controls and no autoplay. MP4 range requests remain supported. Security headers include CSP, nosniff, frame denial and a referrer policy; HSTS is left to the actual HTTPS deployment host.

## Limits

No public deployment, Search Console/CrUX access, actual indexing checks, rich-result validation service or live AI visibility test has been performed. No Lighthouse or Core Web Vitals score is claimed. Structured data is checked as generated JSON and against expected properties, not certified by a third-party validator. See GEO-ANALYSIS.md for domain and launch requirements.
