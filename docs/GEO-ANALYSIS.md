# Promark SEO and AI-search readiness — current review

Detailed audit and evidence: [FULL-AUDIT-REPORT.md](../prompolu.github.io-audit/FULL-AUDIT-REPORT.md).

GEO here means useful, reliable and accessible content for answer engines. It does not require a separate Google AI index, special keyword phrasing, or a promise of citations.

## What is implemented

- Agency identity and user-confirmed email/phone/WhatsApp are consistent across visible pages and production Organization/ContactPoint schema.
- Services and three real case studies render in initial HTML. The homepage's single portfolio button leads to a collection with ordinary case-study links.
- Each of four service pages has a plain-language explanation and service-specific questions, with explicit scope and relevant proof links.
- Case studies describe confirmed deliverables and show supplied films. No invented team, certifications, testimonials, address, traffic or ranking outcomes.
- Production builds include matching canonicals, social images, Organization service catalog, service/case entity links, breadcrumbs and a twelve-page sitemap.
- Review builds retain noindex and suppress production canonical/schema/sitemap output. Social images remain usable when sharing review links.

## Crawl controls and limits

Only the origin-root robots.txt is authoritative. `https://prompolu.github.io/robots.txt` returns 404, which supplies no robots restrictions. Copies under the project path or nested preview do not control crawlers. Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and Applebot therefore have no root robots exclusion observed; this is not proof that they crawled or indexed the site.

Training-policy agents GPTBot, ClaudeBot, Google-Extended, CCBot and Applebot-Extended are separate from search inclusion and were not used as search-visibility signals. No licensing preference was changed. Preview noindex addresses compliant search indexing; it is not an access-control mechanism.

`llms.txt` is absent and is not treated as a ranking/citation requirement. No fabricated discovery files, AI endpoints or bulk city pages were added.

## Remaining work

Actual Google/ChatGPT/Claude/Perplexity visibility, rankings, backlinks, Search Console, CrUX and independent brand mentions were not measured. No access/profile details were supplied for GBP, verified social profiles or analytics. Those results cannot be inferred from source markup. Measured case outcomes and approved testimonials would strengthen first-hand evidence when supplied.

The production site remains unchanged until the user approves this review for launch. A verified domain or account-root GitHub Pages setup is needed to control origin-root robots.txt. The current project sitemap can be submitted directly through verified webmaster tools.
