# Promark

[Download the interactive preview](https://github.com/prompolu/promark-marketing-agency-/raw/refs/heads/promark-preview/preview/PROMARK-preview.zip)

Extract the ZIP, then open `PROMARK-preview/index.html`. It includes all five pages and motion animations. The form downloads an unsent draft. No public deployment has been made.

French, responsive agency website. Five static pages generated with Node.js; no application dependencies or external tracking.

## Develop

Use Node.js 24 (tested with 24.19.0).

```sh
npm run build
npm run check
npm run dev
```

The local server listens on port 3000 (`PORT` overrides it). Re-run the build after editing `public/` or `scripts/build.mjs`, then refresh the browser. `dist/` is generated and ignored by Git. The server is for local development; deploy `dist/` to a static host when explicitly authorised.

## Files

- `scripts/build.mjs`: shared layout, page content and static generation.
- `public/style.css`: shared brand tokens and responsive styling.
- `public/app.js`: accessible menu, concept filters/dialogs, validation and request download.
- `public/logo.svg`: original supplied SVG, unchanged.

## Brand

Exact SVG colour: **#000000**. The supplied vector is a black silhouette with transparent lettering, rather than the lime artwork seen in the raster reference. It is displayed over **#D7FF00**, a visual approximation from that reference, not a pixel-extracted brand specification. The image proportions and artwork remain intact; only empty exterior canvas is clipped by its navigation container.

The site uses a black theme: background **#000000**, surfaces **#101110**, foreground **#F5F4EE**, muted text **#AFB2A7**, and lime accent **#D7FF00**. No authorised standalone brand icon was provided, so no invented favicon is included.

## Launch requirements

1. Confirm the production origin. Set `SITE_URL` to the confirmed HTTPS origin at build time to generate canonical URLs, social URL metadata and `sitemap.xml`. Without it, these are deliberately omitted. Rebuilding without a domain removes an earlier generated sitemap.
2. Supply an approved submission destination/service. There are no supplied contact credentials or verified address/number. The form currently validates and downloads a local text draft, explicitly stating that it has not been sent. No requests or personal data are transmitted. Integrate a real backend and verified delivery/error states before enabling submissions; keep service secrets on the server.
3. Confirm the exact lime HEX or provide the original colour asset for sampling if exact colour matching is required. No other logo modification is needed.

All portfolio items are clearly labelled concepts; no invented clients, results, staff, awards or testimonials. Replace with approved project assets when available. No unverified social links or legal claims are included.

## Validation performed

- `npm run build` and `npm run check` pass.
- Chromium/Playwright: all five pages at 1440, 768, 390 and 320 CSS pixels; no horizontal overflow or JavaScript errors.
- Menu open/close and Escape; portfolio filtering and modal dismissal; FAQ; contact preselection, required-field validation and local draft download.
- All internal navigation and fragment destinations checked.
- Desktop/mobile screenshots visually inspected. Screenshots and the executable browser check are retained in `/workspace/promark-validation/` in the cloud environment.

No public deployment has been performed.

## Motion design

The hero, portfolio compositions and About-page artwork use animated typography in black, white and lime. Each concept runs a short, finite sequence on entering the viewport. Replay controls restart the sequence. The `prefers-reduced-motion` setting displays the final static frame and hides replay controls. No video downloads, external libraries, audio, flashing or infinite loops are used. These are labelled concept explorations, not commissioned client work.
