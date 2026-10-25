# Performance and visual checks

Final hosted mobile homepage: performance/accessibility/best-practices 100/100/100; LCP 1.26s, TBT 0ms, CLS 0. Raw report and initial measured pass retained under evidence/. No field INP/CrUX data; two lab runs are not a controlled statistical comparison. SEO 63 is explained by staging noindex and is not a production SEO measurement.

WOFF2 reduces font data about 67%; body/display font is preloaded. Header clock skips hidden mobile initialization. Visible label and accessible name now match. Preview mailto form action warning removed while preserving direct contact links and draft behavior. Native controlled videos do not autoplay sound.

36 local page/viewport checks show no horizontal overflow or runtime errors. Menu focus restores to trigger; contact dialog contains focus. Inline text contact links benefit from WCAG inline-link exceptions; the separate privacy-information link has an explicit 44px target.
