# SEO validation — current studio review

Current detailed audit: [FULL-AUDIT-REPORT.md](../prompolu.github.io-audit/FULL-AUDIT-REPORT.md).

- `npm run check` validates the build, server, metadata and browser scripts.
- `npm test` runs nine checks, including temporary production builds with twelve unique page titles, one H1 per page, matching canonicals, sitemap, schema, prefixed links and preview safeguards.
- `node tools/validate-seo.mjs` validates all twelve production-build pages, unique descriptions, service schema/catalog links, local asset/page/fragment targets and preview noindex/social metadata. It generates evidence under `prompolu.github.io-audit/evidence/`.
- Browser checks for this audit cover twelve pages at 1440, 390 and 320px: no horizontal overflow or runtime errors, menu focus restoration, contact dialog focus containment and one S140RP video in its gallery.

The deployment origin is `https://prompolu.github.io/promark-marketing-agency-/`. The user does not own promarketing.com; that domain is not configured. The studio review remains under `/preview/studio-direction/` with HTML noindex and no production canonicals, schema IDs or sitemap.

The origin-root `https://prompolu.github.io/robots.txt` currently returns 404. Nested project/preview robots files are not authoritative for crawlers. Preview protection relies on HTML noindex, not the nested robots file. Search Console can receive the project sitemap directly once ownership is verified.

Source-generated structured data is validated as JSON and against required internal properties. No external rich-result certification, Search Console indexation, CrUX field metrics, rankings or AI citations are inferred from these tests. A fresh preview Lighthouse result is retained in the current audit; it is a synthetic run with intentional noindex.
