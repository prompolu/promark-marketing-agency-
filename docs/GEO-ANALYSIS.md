# Promark: SEO and AI-search implementation review

This review uses the Claude SEO technical and GEO skills. It concerns the local site and generated files, not a deployed domain. No AI visibility, ranking, traffic, or field Core Web Vitals scores were measured. No readiness score is assigned to unmeasured external platforms.

## Findings and changes

1. **Crawlable evidence:** project details and videos previously existed only inside JavaScript dialogs. Three permanent `/realisations/<project>/` pages now render context, objectives, confirmed deliverables, media descriptions and links directly in their initial HTML. Cards are real links; JavaScript adds optional quick previews.
2. **Entity clarity:** the homepage and About page identify Promark as a marketing and creative agency in Fès, Morocco. No invented contact details, office location, awards, staff, experience or results have been added.
3. **Helpful explanations:** the Services page defines SEO and GEO in visible French text and links to the actual Prompolu case. GEO is described as improving clarity and accessibility for answer engines, with no promise of a citation or position.
4. **Internal discovery:** case studies have breadcrumbs, related-project links and direct links from the homepage or portfolio. Verified work for Prompolu and Saraprocmaroc provides first-hand evidence. Project summaries remain readable without JavaScript.
5. **Metadata and structured data:** descriptive page-specific titles/descriptions, social previews and stable per-page URL generation. Production builds include Organization, WebSite, WebPage (or appropriate page subtype), BreadcrumbList and case-study CreativeWork data matching the visible text. No commercial FAQ rich-result markup, invented ratings, Person records or unsupported VideoObject upload dates.

## AI crawler access

The production robots policy uses `User-agent: *` and `Allow: /`:

- Googlebot: not blocked by the generated robots policy; this supports crawling for Google Search and associated search surfaces, not a guarantee of indexing.
- OAI-SearchBot: not blocked; ChatGPT Search crawling policy.
- Claude-SearchBot: not blocked; Claude search crawling policy.
- PerplexityBot: not blocked; Perplexity search crawling policy.
- Applebot: not blocked; Apple search crawling policy.

Training-policy signals are separate: GPTBot, ClaudeBot, Google-Extended, CCBot and Applebot-Extended have no added restrictions under the generic production policy. Their status is not evidence of search citations. No training-policy preference has been changed for a live website.

The current build has no confirmed production origin. It is intentionally `noindex,follow` with `Disallow: /` in robots.txt, and omits canonical URLs and sitemap entries. The offline ZIP is also noindex. This prevents claiming an unknown or placeholder domain as production. The generated production policy was tested using a reserved `.example` origin exclusively in an isolated temporary test build. Live crawler responses, WAF treatment, indexing and citations remain untested until deployment.

## Remaining signals

- **llms.txt:** not added. It is not a prerequisite for Google Search or an established citation-ranking lever.
- **Platform visibility:** Google AI Overviews, AI Mode, ChatGPT and Perplexity visibility have not been measured. Local HTML readiness cannot establish actual citations.
- **Brand mentions:** no independent survey of Wikipedia, Reddit, YouTube, LinkedIn or directories was performed. No profile URLs were invented.
- **Publication dates and authors:** no artificial freshness dates or fabricated biographies added.
- **Results:** the SEO/GEO case describes user-confirmed scope, without traffic, lead or ranking claims.

## Launch actions

1. Supply the complete owned production domain; `.com` alone is insufficient. Build with `SITE_URL=https://<confirmed-domain>` to generate matching canonicals, sitemap, social URLs and structured data. Publish only the production `dist/` build, not the offline ZIP.
2. Deploy only after explicit authorisation. Ensure the static host preserves 404 status and HTTPS; the Node development server's redirect/security headers do not automatically configure another host.
3. Configure the real contact destination before enabling submissions.
4. Once live, verify robots/sitemap/canonicals/structured data on the actual host, then submit through the owner's Search Console/Bing tools when available. Measure field CWV and actual search/AI visibility separately.

Guidance reference: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

No ranking or AI citation outcomes are promised by these code changes.
