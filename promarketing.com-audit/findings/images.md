# Image audit — local build

Evidence: image and asset records in `../technical-evidence.json`. No image SERP data or field layout-shift data was measured.

## What passes

- Every discovered `<img>` has nonempty descriptive alt text and explicit width/height attributes.
- All discovered image/poster paths return 200 locally.
- The original logo is an unchanged SVG; CSS preserves its artwork ratio and clips only surrounding canvas.
- Landscape portfolio posters are 1280×720. Portrait video posters are 720×1280 and native players use contain, preserving complete artwork.
- Hero poster uses `loading="eager"` and `fetchpriority="high"`; non-primary cards use lazy loading.
- JPEG posters are compact: approximately 27–84 kB each. The social image is 1200×630 and 69,146 bytes.
- No inline base64-image bloat or remote image dependency was found.

## Low-priority optimisation

There are no responsive `srcset`/`sizes` variants or WebP/AVIF alternatives for raster posters. A 1280px poster is sent to a small mobile card, though existing files are already small and the hero poster is only 27,433 bytes. Consider 640px WebP/AVIF derivatives with JPEG fallback where savings justify maintenance; preserve the supplied logo and brand work. This is an incremental resource opportunity, not a critical performance finding.

Largest raster poster: `public/media/prompolu-site.jpg`, 83,939 bytes. Largest MP4: `public/media/saraproc-film.mp4`, 2,845,995 bytes; videos are on-request rather than autoplay. Playback and field network behaviour are separate from image checks.

A social screenshot is useful as a fallback; client-specific Open Graph images already use the matching case poster. Confirm cards with social debuggers only after the actual owned domain is deployed.
