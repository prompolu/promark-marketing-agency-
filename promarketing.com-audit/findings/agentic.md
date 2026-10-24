# Agentic browsing readiness

## Summary

**Lighthouse Agentic Browsing (desktop/mobile): not measured; X/N unavailable.** Lighthouse is not installed in the environment, and no public-site PSI result was used. No Lighthouse fraction or Agent-UX heuristic score is fabricated.

The current build provides meaningful HTML, real links, named controls and accessible native media. The main local task limitation is the email-client-dependent enquiry flow and the CSP/native mailto fallback conflict identified by the technical audit. Deployment/access policy on the intended domain remains a separate, unverified condition.

## Local accessibility-tree evidence

Chrome DevTools `Accessibility.getFullAXTree` captured **249 nodes** on Contact. Among non-ignored buttons, links, textboxes and comboboxes, **zero unnamed interactive nodes** were found. Named form controls include Nom, Entreprise, Email, Téléphone (facultatif), Service souhaité and Description du projet. Required field semantics are present for the form’s native controls. This is an observed local tree check, not a Lighthouse `agent-accessibility-tree` result or complete accessibility certification.

Native controls, project anchors and permanent case-study pages give browsers and agents routes that do not require hover-only interactions. Mobile menu, modal dismissal/focus restoration, invalid-form focus, and reduced-motion behaviour were spot-tested. Full keyboard tracing did not find a background page control taking focus while the native modal was open; a transient browser-chrome/BODY state is recorded in the raw evidence and not classified as a focus-trap failure.

## Access and discovery evidence

| Request | Local result |
|---|---|
| `/robots.txt` | 200 text/plain; generic Allow and production sitemap declaration |
| `/llms.txt` | 404 |
| `/ai-catalog.json` | 404 |
| `/.well-known/agent-card.json` | 404 |
| `/.well-known/api-catalog` | 404 |
| Unknown resource URL | Real 404 |
| Home with `Accept: text/markdown` | 200 text/html; no `Vary: Accept` |

The local robots policy is `User-agent: *`, `Allow: /`. Search crawlers (`Googlebot`, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`) have no generated path restriction. Training tokens (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Applebot-Extended`) also have no added restriction; this is a separate training-policy observation and is not evidence of search citations. User-triggered fetchers are not subject to a dedicated local rule; actual vendor behaviour and authentication were not tested. No user-agent spoofing or WAF matrix was run.

No Markdown negotiation is implemented. `document.modelContext` and `navigator.modelContext` are undefined in the test browser; no declarative WebMCP form attributes were found. This does not establish a browser-independent WebMCP conformance failure. The site does not operate an API/commerce/agent service that would require an API catalog, OAuth metadata, A2A card or UCP document.

## Priorities

- **P0 measured failures:** none established by the local tree/layout spot checks. This is not a global pass: live WAF, verified-bot access and the Lighthouse audit are unmeasured.
- **P1 / medium:** align no-JavaScript contact fallback and CSP; then validate a direct, reliable enquiry outcome without inventing successful delivery.
- **Low:** improve standalone secondary touch targets, considering spacing exceptions before declaring a WCAG failure.
- **Optional:** Markdown delivery or a curated machine-readable discovery file can be considered if a concrete integration needs them. The absence of `llms.txt` is informational; do not present it as a Google ranking or AI-citation blocker.
- **Not required for this agency site:** custom WebMCP transactions, API catalog, A2A or UCP endpoints without corresponding underlying services.

## Standards and scope

As checked on 2026-10-24, this site implements none of WebMCP, Content-Signal, ARD/API Catalog discovery, MCP Server Card or Web Bot Auth. No vendor support/compatibility or ratification claim is made from their absence. Their draft/proposal status and vendor support must be reverified against primary sources before adopting them. Conventional accessible HTML and explicit, safe confirmation behaviour remain the practical foundation.

Evidence: `rendering-evidence.json`, `accessibility-contact.json`, the current generated HTML and server headers. Do not equate this local assessment with live search eligibility, verified agent access or measured AI visibility.
