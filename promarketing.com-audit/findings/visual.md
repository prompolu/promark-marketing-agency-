# Visual and accessibility review

## Measured scope

Eight page routes at **1440, 768, 390 and 320 CSS pixels**: 32 page/viewport combinations. The current local build returned 200 for every intended route. No horizontal document overflow, loaded broken images or JavaScript page errors were observed. Screenshots cover desktop/mobile home, mobile portfolio and mobile contact. Home screenshots were recaptured after progressive scrolling so lazy images appear; a screenshot taken without scrolling can leave offscreen lazy images unloaded and should not be mistaken for a missing-asset defect.

## What works

- Clear black/white/lime hierarchy with readable service and portfolio sections.
- Mobile navigation opens from a named button; Escape closes it and restores focus to the toggle.
- The native project dialog opens with its close button focused; Escape closes it and restores focus to its trigger.
- Keyboard review across the dialog observed no background actionable element receiving focus. Chromium reports a transient `BODY` active element when tabbing through browser chrome, followed by the dialog/close button. The raw `modalFocusContained: false` value is therefore **not** treated as an established focus-trap defect.
- Reduced-motion test on the About page found **zero running animations**.
- Contact fields have visible associated labels and helpful error text. Empty submission produced five invalid fields, focused the name input and exposed a validation status. No mail or WhatsApp message was sent.
- Videos preserve landscape and portrait proportions and have native controls.

## Findings

### Low — make secondary navigation and contact targets more comfortable on touch screens

At 390px width, footer navigation links measure about **16px high**, back-to-top and footer email/phone links **19px**, and the footer WhatsApp link **22px**. The email link embedded in help text is 14px high and is an inline-text case. These are small target rectangles, not automatically a WCAG 2.5.8 failure: spacing, inline and equivalent-target exceptions must be considered. Increase standalone target padding/min-height to at least 24px, with roughly 44–48px as a comfortable target where the design allows.

### Medium — enquiry conversion still depends on a visitor’s configured email application

The form prepares a `mailto:` draft and does not itself submit an enquiry. The interface explains this and provides a download fallback plus email/phone/WhatsApp links. This is honest behaviour, but a visitor without a configured mail handler must take extra steps. Implement a real server-side mail/form service when direct submission is required, with explicit delivery/error states; do not replace the current wording with an unverified success message.

### Medium — verify the no-JavaScript form fallback against CSP

The site has a `mailto:` form action while the local server uses `form-action 'self'`. The technical audit separately reproduced the CSP rejection of native no-JavaScript form submission. This report does not claim to have sent a test email. Preserve direct contact links and align the fallback with the deployed CSP or offer an accessible alternate method.

## Limitations

No axe conformance report or complete manual WCAG audit was run. Named controls and keyboard spot checks cannot establish full accessibility compliance. Touch-target dimensions alone are not a standards certification.

Evidence: `rendering-evidence.json`, `accessibility-contact.json`, `screenshots/`.
