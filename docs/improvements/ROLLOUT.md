# Website improvement rollout

## Implemented

- Four distinct French service pages explain fit, deliverables, client inputs, scope and relevant real project examples. Service metadata, internal links, breadcrumbs and Service structured data are generated with the pages.
- Case studies now include more information observable in the actual delivered films: duration, portrait/landscape formats, product presentation and separate versions. No historical production decisions, exact SEO/GEO tasks, results, biography or testimonials are invented.
- WhatsApp calls to action appear prominently on the homepage, contact page, service pages and final invitation.
- Footer/contact/breadcrumb hit areas are at least44px tall. Reduced-motion handling is retained.
- Responsive WebP poster variants preserve the films' artwork and use JPEG fallbacks. The hero uses a more representative frame from the actual Prompolu film. Original videos and logo remain intact.
- Direct submission is configured for the owner's public Formspree endpoint, https://formspree.io/f/xbgglkeg. It includes validation, honeypot, in-flight state, duplicate-submit prevention, timeout handling, accessible success/errors, input preservation on failure and download/email/WhatsApp alternatives. A success state requires both an HTTP success and the provider's explicit `ok: true` response. It reports acceptance by the receiving service, not guaranteed inbox delivery.
- Contact logic and service content are separated from the shared build/browser controller. The development CSP permits the intended mailto fallback and Formspree connection/submission.
- The user confirmed they do not own promarketing.com. The default production configuration now matches the actual GitHub Pages origin and repository path. That unowned domain is not attached or used in the current sitemap/schema/canonicals.
- Optional GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION build variables accept owner-supplied verification values. No tokens or ownership claims were fabricated, and no trackers were installed.

## Verification

- Nine dependency-free automated tests passed.
- Forty-eight route/viewport combinations passed: twelve pages at1440/768/390/320px, with no horizontal overflow, broken above-fold images or JavaScript errors.
- Native video playback, project-dialog-to-case navigation, responsive WebP selection and44px footer target sizes passed browser checks.
- Direct submission was tested with mocked responses for success, HTTP500, rate limit429, rejected payload, network failure, spam trap and duplicate submission. Mock tests never contacted the real provider. No test email or WhatsApp message was sent.
- A verified-HTTPS live HTTP baseline measured three requests each for home, services and contact. See LIVE-HTTP-BEFORE.json. Those are network/TTFB observations, not mobile LCP/INP/CLS or real-user measurements.
- The public PageSpeed API returned a shared-project quota error. The managed Chromium instance's CA-trust issue prevented live rendering; no certificate verification was disabled to produce a passing result. Local browser rendering remained available. Do not describe these limits as failures of the public site's TLS certificate.

## Requires the owner's information or account access

1. A genuine owner/practitioner introduction and approved testimonials, if desired.
2. The exact SEO/GEO tasks performed for Prompolu and any approved outcome evidence.
3. Search Console/Bing ownership verification through the owner's account. The GitHub Pages URL-prefix property is https://prompolu.github.io/promark-marketing-agency-/. A verification meta value or HTML file must come from that account; credentials should never be pasted in chat.
4. An owned domain and access to its DNS before custom-domain migration. The current GitHub Pages URL remains the public site.
5. Provider/account delivery verification for the real form endpoint. Test responses demonstrate UI behavior, not delivery to an actual inbox.

The predeployment audit documents a historical version; these changes resolve several of its implementation findings without claiming live rankings, citations, testimonials or conversion rates.
