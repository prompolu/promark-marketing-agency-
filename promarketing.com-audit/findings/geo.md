# GEO / AI-search readiness — local content review

This is a review of local, generated content. Google AI Overviews/AI Mode, ChatGPT Search, Claude Search and Perplexity visibility have **not** been measured; none receives a numeric platform score. No live brand-mention/backlink survey was performed.

## What is ready locally

- Identity, city/country and real contact channels are explicit and consistent: homepage/About/contact plus `scripts/site-config.mjs:4` and `scripts/seo.mjs:28`.
- Relevant service definitions appear in raw HTML, including question headings “Qu’est-ce que le SEO ?” and “Qu’est-ce que le GEO ?” in the Services content (`scripts/build.mjs:32`). The copy acknowledges that neither a position nor a citation is guaranteed.
- Three case pages provide text and real videos without requiring a JavaScript dialog to access the core content (`scripts/build.mjs:42`).
- Real examples link to the service/context and back to related work, rather than relying on a decorative carousel.
- Production robots.txt contains `User-agent: *`, `Allow: /`, and the configured sitemap URL (`scripts/build.mjs:58`). This is a generated policy, not evidence of how a live host/WAF responds.

## Generated robots policy, separated by crawler purpose

| Token | Local production policy | What this supports or governs |
|---|---|---|
| Googlebot | Not blocked by generic Allow | Google Search crawling, including search surfaces feeding Google AI features; no indexing guarantee |
| OAI-SearchBot | Not blocked | ChatGPT Search crawler policy; no citation guarantee |
| Claude-SearchBot | Not blocked | Claude search crawler policy; no citation guarantee |
| PerplexityBot | Not blocked | Perplexity search crawler policy; no citation guarantee |
| Applebot | Not blocked | Apple search crawler policy |
| GPTBot | No added restriction | OpenAI training policy; not evidence about ChatGPT Search citations |
| ClaudeBot | No added restriction | Anthropic training policy; not evidence about Claude search citations |
| Google-Extended | No added restriction | Gemini/Vertex and related model-use policy; not the Googlebot search-inclusion policy |
| CCBot | No added restriction | Common Crawl training/dataset-use signal |
| Applebot-Extended | No added restriction | Apple model-use opt-out signal, separate from Applebot search |

These policies are not yet a platform-access test. Robots snippets alone cannot prove crawl authorization, indexing, grounding or citations. The downloadable preview intentionally uses noindex and Disallow: /; that is appropriate for the preview, not a live production defect.

## Main gaps

### G-01 — High: primary evidence exists but explanations contain little proprietary expertise

The three real case pages total only 145, 189 and 126 main-text words under the extraction method in content.md. Text gives outputs and objectives, not what was discovered, why particular creative/technical choices were made, or how a result was validated. This is the biggest actionable passage-level gap: not arbitrary word count or AI-specific wording.

Add original, approved client-specific observations and work artifacts. For the website/SEO/GEO case, name the actual work undertaken and explain constraints; include verified results only when supplied. More generic SEO definitions would add less value than this first-hand account.

### G-02 — Medium: brand corroboration is unverified

There are no supplied official social/profile URLs or independently checked client references in the current source. This review did not measure third-party mentions, reputation, backlinks or citations. Do not infer the brand is absent everywhere. Request official profiles if they exist, keep business facts consistent, and seek genuine client references/credits where appropriate. Do not recommend fabricated Reddit/Wikipedia/mention campaigns.

### G-03 — Info: llms.txt is absent and not a citation blocker

No llms.txt file is generated. It is optional and receives no ranking/citation weight in this audit. Do not treat creating it as the main GEO fix, and do not promise visibility from it. No licensing/RSL policy was configured; any such decision requires the owner's real preferences.

## Recommended priorities

1. Deploy only the authorised production build to the confirmed owned host; then verify crawl/index eligibility on the actual host before claiming visibility.
2. Expand the real case studies with actual methods, decisions and proof.
3. Add approved agency/practitioner information and genuine external corroboration when available.
4. Validate the existing schema and stable entity/contact information on the live host.
5. Measure citations and organic queries after launch using appropriate accounts/tools, separately for each engine.

No freshness dates, statistics, people or credentials should be fabricated to improve an audit score. Do not rewrite truthful copy into “AI patterns” or force fixed passage lengths.

Guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
