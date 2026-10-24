# Sitemap validation — generated production-mode artifact

Evidence: `../technical-evidence.json`; `dist/sitemap.xml`; `scripts/build.mjs`.

## Passed checks (11/11 measured local checks)

1. `/sitemap.xml` returns HTTP 200 on the development server.
2. XML parses successfully with a standard XML parser.
3. Standard sitemap namespace is correct.
4. Exactly eight URLs, matching all discovered primary and case pages.
5. Every URL uses HTTPS.
6. All entries use the configured origin `https://promarketing.com`.
7. No duplicates.
8. Every entry matches its page's canonical URL.
9. Every mapped local page returns HTTP 200, without a redirect.
10. No noindex pages or the 404 template are included.
11. Production robots.txt declares the same sitemap URL.

The sitemap is well below the 50,000 URL / 50 MB limits. It omits optional lastmod instead of inventing dates; this is acceptable. There are no deprecated priority/changefreq fields. No image/video extensions are present; they are optional. Video sitemap/VideoObject work is an opportunity only when sufficient truthful metadata, such as actual upload dates, is available.

## Scope and launch warning

This validates generated URLs against their matching local paths. It does **not** establish that public promarketing.com serves them. The lead auditor found the public domain showing a sale/parking flow. Resolve the deployment/domain identity first, then check the actual declared production sitemap, final HTTP status and canonical URLs before submitting to search engines.

The offline ZIP intentionally has no production sitemap, has noindex metadata, and robots.txt disallows crawling. Do not deploy the offline ZIP as production.
