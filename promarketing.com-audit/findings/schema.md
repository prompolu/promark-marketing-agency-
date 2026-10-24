# Structured-data audit — local production build

## What was checked

Parsed application/ld+json in all eight generated HTML pages with Python's JSON parser and inspected `scripts/seo.mjs:28` through `scripts/seo.mjs:40`. These are deterministic local consistency checks, not a Schema.org or Google Rich Results certification.

- 8/8 pages have parseable JSON-LD.
- 8/8 use the same Organization identifier, `https://promarketing.com/#organization`.
- 8/8 link the WebSite/page publisher to that Organization.
- 8/8 contain the user-supplied email, international telephone and WhatsApp ContactPoint from `scripts/site-config.mjs:4`.
- 8/8 use page URLs/identifiers on the configured production origin.
- 7/7 non-home pages have a BreadcrumbList; case breadcrumbs contain Accueil → Réalisations → current project and corresponding permanent URLs.
- 3/3 cases identify the work as CreativeWork with Promark as creator and the real client as the subject. This reflects supplied scope rather than unsupported performance claims.

The page subtypes are appropriate: AboutPage, ContactPage and CollectionPage where applicable; ordinary WebPage elsewhere. The entity location supplies only the known locality/country. Organization is a reasonable choice because no full verified business address has been provided. Do not convert it to a rich-result-focused LocalBusiness record by inventing an address, hours or reviews.

## Findings

### S-01 — Low: available original logo is not connected to the Organization graph

Evidence: the Organization object in `scripts/seo.mjs:28` has name, URL, contact data, description and locality; there is no `logo` property even though `public/logo.svg` is supplied and used on the pages.

Recommendation: reference an accessible, suitable image rendition of the supplied original as Organization.logo after checking Google's image requirements on the actual host. Do not redraw the logo or use a client poster as the agency logo. This is an entity-completeness improvement, not a JSON-LD validation failure or guaranteed knowledge-panel outcome.

### S-02 — Info: no VideoObject rich-result metadata

Evidence: six native media files are visible on three case-study pages, but schema uses CreativeWork without VideoObject (`scripts/seo.mjs:38`). The project source does not provide verified original publication/upload dates.

Recommendation: consider video-specific metadata only after collecting legitimate publication dates, durable thumbnail/content URLs and accurate names/descriptions. Do not use today's date or the file-transfer date as a fabricated original upload date. Watch-page suitability and Google video indexing require separate live validation; adding markup alone does not establish eligibility.

### S-03 — Info: no unsupported “SEO extras” were added

No fake ratings, aggregate reviews, invented employees/founding dates, commercial FAQ rich-result promises, Product or SearchAction markup were observed. No Service rich-result requirement is inferred; a Service record can be added later if it materially clarifies real offerings.

## Limitations

Rich Results Test, Schema Markup Validator, production URL accessibility, image eligibility, Google indexing and knowledge-panel output were not tested in this specialist review. Seven local consistency check families passed; the missing logo link is an optional improvement, so no opaque schema score is assigned.
