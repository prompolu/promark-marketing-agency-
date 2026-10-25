# Technical, schema, sitemap and agent access

## Verified
- Twelve generated production pages have unique titles/descriptions, exactly one H1 each, matching canonical/sitemap URLs and parseable Organization/WebSite/page/breadcrumb data. Services and case work have stable entity URLs; the Organization service catalog links to the four real service pages.
- Local page, asset and fragment targets resolve in the production build. Public review routes return successfully and remain noindex. See evidence/seo-validation.json and evidence/http-route-check.json.
- All meaningful service/case content is present in initial HTML; no modal-only case studies. Real links support direct navigation. No WebMCP or fabricated agent endpoints were introduced.
- HTTPS is served by GitHub Pages. Development CSP/other headers do not automatically configure the public host.

## Fixed
- Review social images were omitted alongside production canonicals; they now use review URLs while keeping noindex and no production schema/canonical leakage.
- Service/case entity URLs and Organization service catalog added, matching visible offerings.
- Outdated domain/page-count documentation corrected. Proposed promarketing.com is not owned or configured.
- Replaced preview native mailto-form action with a JavaScript-enabled draft flow and explicit no-JS contact fallback, removing the Chrome mixed-form warning. Actual production Formspree destination remains configured and supports native submission.

## Limits / remaining
- Only https://prompolu.github.io/robots.txt is authoritative; it returns 404. Nested project/preview robots files do not establish crawler restrictions or sitemap discovery. A root-site/domain change is outside this isolated preview. Direct sitemap submission through verified Search Console/Bing is the available route.
- Review noindex intentionally prevents compliant search indexing. It is not a security/access-control mechanism.
- No verified Search Console/Bing access, CrUX or external rich-result validation. Agentic Browsing fraction not measured; keyboard/DOM semantics checked directly instead.
