# Promark

[Download the interactive preview](https://github.com/prompolu/promark-marketing-agency-/raw/refs/heads/promark-preview/preview/PROMARK-preview.zip)

Extract the ZIP, then open `PROMARK-preview/index.html`. It includes eight French pages, real case studies and client videos. The form downloads an unsent draft. No public deployment has been made.

French, responsive agency website. Eight static pages generated with Node.js; no application dependencies or external tracking.

## Develop

Use Node.js 24 (tested with 24.19.0).

```sh
npm run build
npm run check
npm test
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

1. The user-selected production origin is **https://promarketing.com**, saved in `scripts/site-config.mjs`. Normal builds generate matching canonical URLs, social metadata, structured data and an eight-page sitemap. `SITE_URL` can override the origin; setting it to an empty string creates a noindex build without production URLs. DNS, HTTPS and deployment still require verification before launch.
2. Supply an approved submission destination/service. There are no supplied contact credentials or verified address/number. The form currently validates and downloads a local text draft, explicitly stating that it has not been sent. No requests or personal data are transmitted. Integrate a real backend and verified delivery/error states before enabling submissions; keep service secrets on the server.
3. Confirm the exact lime HEX or provide the original colour asset for sampling if exact colour matching is required. No other logo modification is needed.

The portfolio presents real client work supplied by the user: Prompolu (website, SEO, GEO and motion design) and Saraprocmaroc (animated video). Case studies describe the confirmed scope without invented performance results. The Prompolu website poster comes from the supplied site-launch video. The About-page typography is an own-brand Promark signature, not a client project. No unverified social links or legal claims are included.

## Validation performed

- `npm run build` and `npm run check` pass.
- Chromium/Playwright: all five pages at 1440, 768, 390 and 320 CSS pixels; no horizontal overflow or JavaScript errors.
- Menu open/close and Escape; portfolio filtering and modal dismissal; FAQ; contact preselection, required-field validation and local draft download.
- All internal navigation and fragment destinations checked.
- Desktop/mobile screenshots visually inspected. Screenshots and the executable browser check are retained in `/workspace/promark-validation/` in the cloud environment.

No public deployment has been performed.

## Portfolio media

`scripts/projects.mjs` is the shared source for the three case studies and six videos. Client video sources were supplied directly by the user. Exact duplicate uploads were removed; both distinct S140RP edits are retained. Original source files are preserved in the cloud attachments, while H.264/AAC browser copies and JPEG posters live in `public/media/`. Landscape clips are limited to 1280px wide and portrait clips to 720px wide, keeping their aspect ratios. The supplied 4K site-launch clip has a web rendition; the source is not overwritten.

One earlier Saraprocmaroc upload exceeded the 32 MiB transfer limit and was not included. The supplied 60-second Saraproc Maroc file is included. No unverified SEO/GEO performance claims are made.

Players use native controls, play only on request and preserve portrait/landscape aspect ratios. Closing a project pauses playback, and starting another video pauses the previous one. Media uses local files, so the downloadable preview works without third-party video hosts. The development server supports byte-range requests for seeking.

To regenerate the offline ZIP after building:

```sh
python scripts/package-preview.py
```

Browser validation covers 20 page/viewport combinations plus actual decoding, playback and seeking of all six clips, filters, project dialogs, mobile menu and media-range requests. The package is approximately 8.6 MB.

The About-page signature uses a finite animated typography sequence. Reduced-motion preferences display its static final frame. No looping animation or autoplay sound is used.

## SEO and AI-search implementation

Case studies have permanent, server-rendered URLs and crawlable project links. JavaScript provides optional quick previews. See [SEO validation](docs/SEO-VALIDATION.md) and [GEO implementation review](docs/GEO-ANALYSIS.md).

Confirmed-domain production build:

```sh
npm run build
npm run check
npm test
```

The default domain is `https://promarketing.com`, as selected by the user. `SITE_URL= npm run build` produces a domainless noindex preview. Offline ZIPs always remain noindex, disallow crawling and omit the production sitemap. With a confirmed origin, the build generates matching canonicals/sitemap, Organization/WebSite/page/breadcrumb metadata and absolute social-preview URLs. No local placeholders are included in the published preview.

Use `npm run preview:package` after building to refresh the offline ZIP. It rewrites page/media links for local use and remains noindex. The local development server supports normalising index/slash URLs and security headers; equivalent deployment-host settings still need to be verified after launch.
