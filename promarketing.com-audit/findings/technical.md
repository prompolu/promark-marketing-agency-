# Technical SEO — local production-mode build

Scope: current `dist/`, served read-only by the existing Node development server at `http://127.0.0.1:3040`. Findings are not evidence of a live deployment. Raw evidence: `../technical-evidence.json`; no-JS form evidence: `../nojs-form-evidence.json`.

## Critical launch blocker (verified by lead auditor)

The lead auditor's live checks found `https://promarketing.com/` redirecting toward `/lander` and a GoDaddy domain-for-sale page, rather than this Promark website. See `../live-check.json` and `../live-lander-check.json`. Treat this as a domain/deployment identity blocker; do not infer ownership, acquisition or live indexing from a canonical configured in source. Resolve the exact deployable owned domain before launch, and regenerate all domain-bound metadata if it changes.

## Local checks

All eight expected pages were discovered by following raw homepage links. All are at crawl depth 0 or 1; all return HTTP 200. Important content, canonical tags, title/description, robots instructions and JSON-LD occur in initial HTML. The largest page is 18,541 bytes, well under Google's HTML fetch limit.

Baseline checklist: 12 passes, 1 failure (92% of these local checks, not a general search ranking or complete live SEO score).

| Check | Result | Evidence |
|---|---|---|
| Expected primary/case pages discoverable through raw links | Pass | 8/8, depth 0–1 |
| Primary/case pages return HTTP 200 | Pass | 8/8 |
| Production-mode pages indexable in HTML | Pass | 8/8 have index,follow,max-image-preview:large |
| Self-referencing canonical per page | Pass | 8/8, HTTPS promarketing.com origin |
| robots.txt fetch works | Pass | 200; generic Allow: /; sitemap declared |
| XML sitemap works and matches canonical pages | Pass | 200; 8/8 exact page coverage |
| Internal resource references resolve | Pass | 15/15 unique discovered image/script/style/media references return 200 |
| Fragment links resolve | Pass | No broken checked internal fragments |
| Slash/index normalisation | Pass | /services → /services/; /services/index.html?source=test → /services/?source=test; /index.html → /, each 308 |
| Missing pages produce genuine 404 + noindex | Pass | /does-not-exist/ returns 404 with noindex |
| Media seeking and correct MIME | Pass | MP4 Range bytes=0-1023 returns 206, 1,024 bytes; MIME video/mp4 |
| Basic security headers | Pass | CSP, Referrer-Policy, nosniff, frame denial present locally |
| No-JS contact form compatible with CSP | **Fail** | Chromium blocks mailto form submission because form-action permits only self |

## Medium: no-JavaScript form submission blocked by CSP

`scripts/build.mjs` renders a contact form whose action is `mailto:marketingagencypromark@gmail.com`, while `scripts/server.mjs` sets `Content-Security-Policy: ... form-action 'self'`. In Chromium with JavaScript disabled, clicking “Préparer mon email” produces: “Sending form data to 'mailto:...' violates ... form-action 'self'. The request has been blocked.” No email was sent during the audit.

The JavaScript flow uses a mailto anchor rather than form submission, so it is not blocked by this form-action directive. Direct email/phone/WhatsApp links remain valid fallbacks. This is a progressive-enhancement/conversion defect, not an indexing blocker. Recommendation: permit the intended `mailto:` scheme in the host's form-action policy, or replace the no-JS form submission with a clear direct contact fallback; recheck with JS disabled after deployment.

## Deployment checks still required

The Node server has no Cache-Control or Content-Encoding in the checked responses. Configure caching and text compression at the production host; these are not established live-site failures. HSTS is absent on this HTTP local server, which is appropriate to assess only on the eventual HTTPS host. Live TLS, www/non-www canonicalisation, CDN/WAF treatment, real bot access, Search Console coverage and Core Web Vitals were not measured by this local technical crawl. Do not carry the Node development server's header results over to a static host.

`/404.html` itself returns 200 with noindex, while arbitrary missing paths return 404; that is acceptable for the local error-template file and is not a soft-404 finding for the tested missing URL.
