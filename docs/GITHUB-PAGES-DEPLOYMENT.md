> Historical initial deployment record. Current configuration has twelve pages and is documented in SEO-VALIDATION.md. Proposed-domain statements below are superseded; the user does not own promarketing.com.

# GitHub Pages deployment

Live URL: https://prompolu.github.io/promark-marketing-agency-/

Verified on 24 October 2026. GitHub Pages reports `built`, source branch `gh-pages`, path `/`, HTTPS enforced, and no custom domain. Deployed artifact commit: `67ca21a2a3c045e17d8cc8f53f6a3e6e2f4be147`.

The initial activation POST returned HTTP403 from the GitHub integration. A subsequent status check confirmed that Pages was enabled with the intended source and that the build completed. This report claims only that observed final state, not a cause for the intermediate permission error.

## Verification

- Syntax checks and six automated tests passed before publication.
- Local repository-path browser tests passed for the logo, project dialog, permanent case-study navigation, video decoding/playback and mobile overflow.
- HTTPS curl requests, with certificate verification enabled, confirmed all eight live pages return200 and use the matching GitHub Pages canonicals.
- All15 discovered live CSS/JS/image/video resources returned200.
- The live sitemap contains exactly the eight GitHub Pages URLs, with no `promarketing.com` URLs.
- A live MP4 byte-range request returned206, `video/mp4`, and the requested1024bytes.
- Live Chromium navigation was blocked by this managed browser's CA-trust configuration. No certificate verification was disabled to force that check to pass. This environment limitation is distinct from the successful TLS-verified live HTTP checks; no live browser screenshot or playback result is claimed.

See `GITHUB-PAGES-LIVE-CHECK.json` for the live-check inventory. No email/WhatsApp messages were sent during verification.

## Updating

Source changes live on `promark-preview`. Run `npm run deploy:github` to test, rebuild for the project-site path and push generated files to `gh-pages`. GitHub Pages builds from that branch; verify the final Pages build status and public URL after updates. Merely pushing source edits does not rebuild `gh-pages`.

The custom-domain setting in `scripts/site-config.mjs` retains the user's proposed domain for future work. The deployment script overrides it with the actual GitHub Pages origin and repository prefix. Do not attach `promarketing.com` until ownership/access and DNS are confirmed. Its previously observed sale-page response is documented in the predeployment audit.

GitHub Pages controls the public serving headers and its root-domain robots policy. The development server's headers do not automatically transfer to Pages. The contact form prepares a draft in the visitor's mail app; it is not a server-side email delivery service.
