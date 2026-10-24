# Text alignment review

Reviewed all 12 studio-preview pages on desktop and mobile, plus shared menu/contact dialogs, project dialogs, video captions, breadcrumbs and footer.

Changes:
- Retained centered section introductions and left-aligned editorial/service/case-study text.
- Balanced heading lines and improved paragraph endings without inserting manual line breaks.
- Centered mobile CTA buttons beneath their heading with matching widths and spacing.
- Restored horizontal padding inside secondary pill buttons and consistent label line height.
- Aligned breadcrumb labels and separators vertically.
- Aligned process numbers, headings and paragraph starts across each row using shared grid tracks; tablet uses two columns and mobile one.
- Reserved consistent heading space in desktop information columns.
- Improved tablet contact columns, narrow-screen contact labels, and video-caption wrapping.
- Aligned footer copyright with its navigation and restored dark text on the lime background.

Verification: 12 routes × 4 viewport widths (1440, 1024, 390, 320), with no horizontal overflow, JavaScript errors or heading/noindex regressions. Additional focused checks at 1440, 768, 390 and 320 confirm CTA centering and process paragraph alignment. Menu focus, contact/project dialogs and reduced motion remain functional. Screenshots reviewed for desktop process cards, mobile CTA, tablet form and narrow-screen cards. Existing build/SEO/form tests pass through the review publisher.

Only `/preview/studio-direction/` is updated. Production and the older preview remain byte-identical according to the publisher's Git-tree comparison.

## Client-name repetition

The homepage now leads with project titles, with the client named once in each project label. Repeated client names were removed from the section introduction, decorative browser bars and featured-video bar. Homepage text mentions of Prompolu decreased from 6 to 2 (excluding text inside client-supplied images/videos). Service and about copy now focuses on PROMARK; client-specific details remain in the portfolio and case studies, with accessible media descriptions and accurate project metadata preserved.
