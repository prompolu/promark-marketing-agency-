# Promark

**Live website:** https://prompolu.github.io/promark-marketing-agency-/

See [deployment verification](docs/GITHUB-PAGES-DEPLOYMENT.md) for the published build and live checks.

[Download the interactive preview](https://github.com/prompolu/promark-marketing-agency-/raw/refs/heads/promark-preview/preview/PROMARK-preview.zip)

Extract the ZIP, then open `PROMARK-preview/index.html`. It includes twelve French pages, real case studies and client videos. The contact form uses the owner-provided Formspree endpoint, with email, WhatsApp and download alternatives. The website is now published on GitHub Pages; the ZIP remains an offline preview.

French, responsive agency website. Twelve static pages generated with Node.js; no application dependencies or external tracking.

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

1. The public production origin is **https://prompolu.github.io/promark-marketing-agency-/**. The user does not own `promarketing.com`; that domain is no longer the default and must not be attached without confirmed ownership. `SITE_URL` overrides the origin and `SITE_BASE_PATH` overrides the path. Explicit `SITE_URL=` builds a noindex domainless preview.
2. Public contacts and the owner-provided Formspree endpoint are configured in `scripts/site-config.mjs`. Direct submission sends to `https://formspree.io/f/xbgglkeg`; it never claims success before provider acceptance. `CONTACT_FORM_ENDPOINT` can override it, and an empty value restores the clearly labelled email-draft fallback. The public endpoint is not a secret. No test email was sent; verify actual delivery in the owner’s Formspree account before relying on inbox receipt.
3. Confirm the exact lime HEX or provide the original colour asset for sampling if exact colour matching is required. No other logo modification is needed.

The portfolio presents real client work supplied by the user: Prompolu (website, SEO, GEO and motion design) and Saraprocmaroc (animated video). Case studies describe the confirmed scope without invented performance results. The Prompolu website poster comes from the supplied site-launch video. The About-page typography is an own-brand Promark signature, not a client project. No unverified social links or legal claims are included.

## Validation performed

- `npm run build` and `npm run check` pass.
- Chromium/Playwright: all five pages at 1440, 768, 390 and 320 CSS pixels; no horizontal overflow or JavaScript errors.
- Menu open/close and Escape; portfolio filtering and modal dismissal; FAQ; contact preselection, required-field validation and local draft download.
- All internal navigation and fragment destinations checked.
- Desktop/mobile screenshots visually inspected. Screenshots and the executable browser check are retained in `/workspace/promark-validation/` in the cloud environment.

GitHub Pages deployment is now live; see docs/GITHUB-PAGES-DEPLOYMENT.md. Earlier audit reports remain snapshots of the predeployment state.

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

## Enquiry source

When a visitor arrives through a tagged link (for example the Instagram bio link `?utm_source=instagram&utm_medium=social&utm_campaign=bio`), `public/contact.js` keeps the `utm_source`, `utm_medium` and `utm_campaign` values in `sessionStorage` for that browser tab only. A form sent through Formspree then carries a `source` field such as `instagram / social / bio`. No cookie, third-party script or analytics service is used, and untagged visits send no source.

## SEO and AI-search implementation

Case studies have permanent, server-rendered URLs and crawlable project links. JavaScript provides optional quick previews. See [SEO validation](docs/SEO-VALIDATION.md) and [GEO implementation review](docs/GEO-ANALYSIS.md).

Confirmed-domain production build:

```sh
npm run build
npm run check
npm test
```

The default origin/path match the live GitHub Pages site. The user confirmed the proposed .com domain is not owned. `SITE_URL= npm run build` produces a domainless noindex preview. Offline ZIPs always remain noindex, disallow crawling and omit the production sitemap. With a confirmed origin, the build generates matching canonicals/sitemap, Organization/WebSite/page/breadcrumb metadata and absolute social-preview URLs. No local placeholders are included in the published preview.

Use `npm run preview:package` after building to refresh the offline ZIP. It rewrites page/media links for local use and remains noindex. The local development server supports normalising index/slash URLs and security headers; equivalent deployment-host settings still need to be verified after launch.

Contact browser checks in `/workspace/promark-validation/contact.cjs` cover 1440/390/320px layouts, required-field and email validation, destination and encoded email-body contents, plus local draft downloads. Email and WhatsApp links were not used to send test messages.

## GitHub Pages deployment

The user authorised deployment through GitHub. The Pages destination is:

https://prompolu.github.io/promark-marketing-agency-/

Run `npm run deploy:github` from this checkout. It checks syntax and tests, builds with `SITE_URL=https://prompolu.github.io` and `SITE_BASE_PATH=/promark-marketing-agency-`, and pushes only the generated site (including `.nojekyll`) to `gh-pages`. It uses an isolated temporary Git index and does not switch source branches or publish repository/audit files. Existing Pages history is retained; no force push is used. A git push alone is not proof that the Pages build succeeded—verify the Pages status and public URL after each deployment.

Configure GitHub Pages to publish from branch `gh-pages`, folder `/`. No custom domain is attached. The default build now uses the live GitHub Pages address; an owned domain can be configured later through the explicit build variables. Pages-build SEO URLs use the actual GitHub Pages address instead. GitHub controls the host's headers, redirects, caching, root-domain robots policy, and TLS; the Node development server's custom headers do not apply there.

Root-relative links, local media sources and poster URLs are prefixed at build time for project-site deployments. The twelve sitemap/canonical/structured-data URLs and social images use the same destination. Offline ZIP packaging removes any configured project prefix from local asset/page/poster/srcset URLs and always remains noindex.

## Latest improvements

See [rollout notes](docs/improvements/ROLLOUT.md) for the twelve-page release, form-service configuration, responsive media, tests and outstanding owner information. `scripts/services.mjs` contains unique service-page content; `scripts/contact.mjs` renders the form; `public/contact.js` handles its interaction. `scripts/projects.mjs` contains project records and evidence-based descriptions.

Optional owner-supplied Search Console and Bing verification values can be provided with `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` at build/deploy time. No verification value or analytics account is currently configured. Do not add fictitious testimonials, personal biographies or performance claims to fill missing owner information.

## Interactive features

The homepage's brand object is actual six-face CSS3D with pointer tilt, native slider/keyboard rotation and reset. Scroll-entry effects are progressive, finite and disabled for reduced-motion users. There is no WebGL/Spline dependency, perpetual canvas loop, custom cursor or scroll hijacking. These are features of the Promark website; they do not advertise Wix/Spline work as agency services.

An on-demand `Live site performance audit` GitHub Actions workflow measures the public mobile site with pinned Lighthouse13.5.0 and saves JSON/HTML artifacts. These are lab results; Google Search Console/CrUX indexing and field measurements still require the owner's account/eligible traffic.

Latest live mobile Lighthouse (GitHub Actions run40133602643): **97 performance / 100 accessibility / 100 best practices / 100 SEO**, LCP1.6s, CLS0 and TBT170ms. See [measurement comparison](docs/improvements/LIGHTHOUSE-COMPARISON.json) and [latest JSON report](docs/improvements/lighthouse-after/report.json). These are synthetic lab results, not field measurements or ranking guarantees.
