# PROMARK — SEO & GEO Audit

Audit date: 24 October 2026 · Business: marketing and creative agency, Fès, Morocco.

## Executive conclusion

**Launch status: blocked.** `https://promarketing.com` currently sends visitors to a GoDaddy domain-for-sale destination, rather than the PROMARK website. No conclusion about domain ownership is inferred. The local build can be audited, but its SEO implementation is not active on that public domain.

**Local implementation checklist: 88/100.** This is a limited local code/content review, not a Google score, a ranking forecast, a live SEO health score or a measured AI-visibility score. The 10% field-performance category is unmeasured and excluded; the remaining 90% is renormalized. Passing technical checks must not be interpreted as deployment readiness.

The site has a strong crawlable foundation and genuine portfolio assets. The most important content improvement is to explain the real work behind those assets. A functional defect also remains in the no-JavaScript email-form fallback.

## Scope and methods

- Audited commit: `c72e0763c5ee72066150edb7bc793ca5849030e8`; no application fixes made during this audit.
- Eight local production-mode pages crawled from the homepage, depth 0–1, with at most 500 allowed. All checked local resources and fragments were examined.
- Generated robots and eight-entry sitemap inspected; canonical, indexability, metadata, JSON-LD and native video controls checked.
- Chromium tested eight pages at 1440, 768, 390 and 320px: 32 route/viewport combinations. Accessibility-tree and keyboard checks supplemented screenshots.
- Read-only authenticated HTTPS checks of the configured public domain and its explicit redirect destination distinguished the parked domain from the local build. The unrelated sale site was not crawled as if it were PROMARK.
- Claude SEO audit, technical, content, schema, sitemap, GEO, SXO and agent-readiness skill guidance used. Plugin CLI/Lighthouse/Google/SEO data APIs were not available; supported local tools provided the recorded evidence.
- User requested Sites; no Sites tools were exposed in the current session. No Sites read, write, upload or deployment is claimed.

## Local scoring and coverage

| Category | Passed / checklist | Local score | Original weight |
|---|---:|---:|---:|
| Technical SEO | 12/13 | 92.3 | 22% |
| Content Quality | 7/10 | 70.0 | 23% |
| On-Page SEO | 7/7 | 100.0 | 20% |
| Schema / Structured Data | 7/7 | 100.0 | 10% |
| AI Search Readiness — local only | 4/5 | 80.0 | 10% |
| Images | 7/7 | 100.0 | 5% |
| Performance / field CWV | Not measured | — | 10% (excluded) |

Technical score uses the specialist’s 12/13 baseline. Content uses the documented 10-item editorial checklist. On-page uses seven implementation families (title, description, H1/language, canonical/robots, social/viewport, raw content, local discovery). Schema uses seven local consistency families, not official rich-result validation. AI readiness uses five local structural criteria: raw HTML, entity clarity, crawler policy, authentic work, and specific first-hand methods; the methods criterion needs work. Images uses seven basic loading/alt/dimension/resource checks. Optional improvements are not counted as validation failures. External authority, live indexing and actual platform citations remain unscored.

## Prioritized findings

### Critical · D-01 — Configured domain is a sale/parking destination

Authenticated HTTPS fetch of promarketing.com returned a 114-byte JavaScript redirect to /lander. Following /lander reached a GoDaddy domain-for-sale page. The PROMARK build is not deployed there. This is not proof about who owns the domain.

**Action:** Verify ownership and DNS access, or choose a domain you control. Do not claim the build is live or submit its sitemap at this domain until the correct website is served.

### High · C-01 — Case studies lack first-hand detail

Three real cases show client assets and state the objective/deliverables, but do not explain actual SEO/GEO tasks, creative decisions, constraints or validation. Main text is approximately 126–189 words per case; length itself is not the failure.

**Action:** Add the genuine client brief, your role, specific decisions and delivered changes. Use approved before/after evidence and verified outcomes only.

### Medium · T-01 — Native form fallback conflicts with security policy

With JavaScript disabled, Chromium blocks the form’s mailto submission because the Node server sets CSP form-action to self. Reproduced without sending email; direct email links remain usable.

**Action:** Permit the intended mailto action in the serving policy, or use a non-submitting email/WhatsApp fallback. Recheck with JavaScript disabled.

### Medium · X-01 — Enquiry submission depends on the visitor’s mail app

The form prepares an email draft and cannot confirm delivery. It is clearly labelled, and email, phone and WhatsApp alternatives are real. This is a conversion limitation, not an indexing penalty.

**Action:** If reliable in-page submission is required, configure a server-side mail service with validation, accessible error handling and verified success states.

### Medium · C-02 — Services and practitioner detail are limited

The Services page covers four services on one URL. About explains values/location, with limited approved who/how detail. No SERP mismatch was demonstrated.

**Action:** Enrich the most important service with decision-useful examples and scope. Add a truthful practitioner introduction. Create separate service pages only after intent research and enough distinct material.

### Medium · V-01 — Small secondary link hit areas

Some mobile footer link boxes are 16–22px tall. Spacing and inline exceptions have not been fully evaluated; this is not a declared WCAG failure.

**Action:** Increase padding/hit area of footer and breadcrumb links; preserve spacing and visible focus states.

### Low · S-01 — Original logo is absent from the Organization graph

The SVG is rendered in the site but is not referenced as Organization.logo. No JSON-LD parsing failure was found.

**Action:** Connect a suitable, accessible original-logo image after checking actual-host requirements. Do not redraw the logo.

### Low · I-01 — No responsive raster variants

Posters are already compact at about 27–84kB, but mobile cards use the same 1280px landscape files.

**Action:** Consider smaller srcset variants and efficient formats where actual savings justify maintenance.

### Info · P-01 — Production performance and search outcomes unmeasured

No deployed PROMARK host, CrUX/GSC access, Lighthouse installation or measured AI citations were available. Local lab timings do not establish field CWV.

**Action:** After deployment, measure mobile field CWV, indexing, rich-result eligibility and search/AI visibility; record a baseline.

### Info · A-01 — Sites connector tools unavailable

The user tagged Sites, but the active tool catalog exposed no callable Sites tools or matching app capabilities.

**Action:** Reconnect or enable Sites for this conversation if further work must use that app; do not invent a publication or connector result.

## What works

- 8/8 local pages return 200 and are discoverable through raw HTML links; all 15 unique checked assets return 200.
- 8/8 have unique titles/descriptions, one H1, French language, self-canonicals and metadata in initial HTML; the valid sitemap contains all eight URLs.
- 8/8 JSON-LD graphs parse; stable organization/contact data, seven breadcrumb lists and three case-study CreativeWork records match the supplied scope.
- No horizontal overflow, broken loaded images or JavaScript errors across 32 page/viewport combinations. Contact controls have accessible names; menu/dialog Escape and focus restoration work.
- Native videos preserve portrait/landscape ratios, have controls and do not autoplay. Main hero poster is eager/high-priority; later cards lazy-load.
- Contact details match user-supplied email, telephone and WhatsApp. Draft behavior is honestly labelled rather than claiming delivery.
- No fake awards, results, biographies, full street address, ratings or unsupported video upload dates were added.

## Local business signals

The visible business name, Fès/Morocco locality, email, international telephone and WhatsApp destination agree with the Organization/ContactPoint data. No full office address was supplied and no fabricated address was added. Google Business Profile, Bing/Apple listings, reviews, local-pack positions and external citations remain unmeasured; no local-market score is assigned. See `findings/local.md`.

## Performance and AI-search limits

Six local unthrottled Chromium 154 homepage runs observed median LCP 132ms desktop and 112ms mobile, with CLS 0. These are development-machine lab observations, not field Core Web Vitals, Lighthouse scores or evidence of production performance. Field INP is unmeasured.

Production-build robots allows Googlebot, OAI-SearchBot, Claude-SearchBot, PerplexityBot and Applebot through its generic allow policy. Live policy on a deployed PROMARK host is not established. GPTBot/ClaudeBot/Google-Extended training policy is separate from search citability. No numeric Google AIO, AI Mode, ChatGPT or Perplexity score is assigned. Missing llms.txt, ai-catalog, Markdown delivery and WebMCP are informational rather than required Google citation fixes. Lighthouse’s Agentic Browsing fraction is unavailable and is not replaced by an invented score.

## Action plan

### 1. Resolve launch blocker

- Verify an owned domain and its DNS/hosting access.
- Serve the correct production build over HTTPS.
- Retest live canonicals, robots, sitemap and redirects before requesting indexing.

### 2. Improve reliability and evidence

- Resolve the native form/CSP conflict.
- Choose whether to implement server-side enquiry delivery.
- Add real case-specific process details and approved practitioner information.

### 3. Refine and measure

- Improve secondary touch targets; optionally connect the logo graph and responsive images.
- Verify rich-result eligibility, crawl/index coverage and field CWV.
- Research service search intent and measure actual search/AI visibility.

## Evidence and specialist files

See `technical-evidence.json`, `rendering-evidence.json`, `nojs-form-evidence.json`, `accessibility-contact.json`, `live-check.json`, `live-lander-check.json`, `findings/` and `screenshots/`. No backlinks, third-party brand mentions, business-profile reputation, keyword volumes, actual SERP intent patterns or live search performance were independently measured. No unsupported claim or metric is inferred from an unavailable data source.
