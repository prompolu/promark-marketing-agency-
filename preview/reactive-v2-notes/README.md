# Reactive 3D review — approval required

This branch implements the user's five selected design ideas for review:

1. Layered hero: supplied Promark logo, genuine Prompolu website/vertical-video frames and typography on separate 3D planes, with pointer and keyboard controls.
2. Reactive portfolio cards: restrained tilt, pointer-following lime edge, focus lift and forward-opening project dialog.
3. Scroll-linked depth: small compositor-only offsets on visible scenes, with normal page scrolling and stable captions.
4. Website/phone mockups: genuine supplied film/poster assets, silent on-demand playback, pause/reset/off-screen cleanup. No video loads automatically on initial entry. On fine-pointer desktops, card hover can start the muted preview; touch users get explicit buttons.
5. Tactile controls: hover/press depth and moving inner labels with stable outer click targets.

The preview does not add Wix, custom Wix code or Spline to the services list. It keeps the existing agency services, real client assets and black/lime branding. It uses no third-party 3D library, custom cursor, infinite render loop or scroll interception. Reduced motion disables automatic tilt/scroll/entry animation; explicit native controls remain usable. Without JavaScript, static mockups and permanent project links remain usable.

## Review destination

https://prompolu.github.io/promark-marketing-agency-/preview/reactive-v2/

The review is visibly labelled, noindex, and built without direct form delivery. It is publicly accessible as a staging preview, not a private link. The current production home, pages, styles and scripts are preserved. The publisher refuses to push unless every file outside `preview/reactive-v2/` retains its prior Git mode and content hash. See `preview/review-publication.json` after publication.

The `.preview-only` marker blocks `npm run deploy:github` on this branch. Do not remove that marker, merge this design into production, or run production publication until the user has reviewed and approved the result.

## Validation

- Nine existing build/SEO/contact tests pass.
- Forty-eight preview page/viewport checks pass (twelve routes at1440/768/390/320px), with no horizontal overflow, JavaScript errors or accidental direct form action.
- Hero pointer and keyboard depth, reset, silent multi-video playback, scroll depth, stable button rectangles, press depth, card tilt/edge tracking, modal lift and pause cleanup passed.
- Coarse-pointer touch controls, reduced-motion behavior and JavaScript-disabled permanent case navigation passed.
- The isolated ZIP has been checked for integrity and correct relative page/image/video/srcset links.
- No email or WhatsApp message was sent. These are functional checks, not a new Lighthouse/field-performance score. The current production Lighthouse report does not automatically rate this review design.

## Files and repeatability

`public/reactive.css` contains the design layer. `public/effects.js` handles finite interactions. `scripts/brand-scene.mjs` and `scripts/mockups.mjs` render the reusable composition and device previews. `scripts/publish-review.mjs` builds and publishes only the isolated review directory, preserving the production tree. It also writes a machine-readable publication record.

Build the review explicitly:

```sh
PREVIEW_MODE=review SITE_URL= SITE_BASE_PATH=/promark-marketing-agency-/preview/reactive-v2 CONTACT_FORM_ENDPOINT= npm run build
SITE_BASE_PATH=/promark-marketing-agency-/preview/reactive-v2 PREVIEW_ARCHIVE_NAME=PROMARK-reactive-3D-review.zip npm run preview:package
```

For the hosted review, use `npm run preview:publish`. This is not approval to publish the design at the production root.
