# PROMARK — 20 secondes / français

Editable HyperFrames film. 1920×1080, 30 fps, exactly 20 seconds, 600 frames. Original stereo instrumental score at 120 BPM, no voiceover.

## Edit and render

Requires Node 22+, FFmpeg and Chrome. Python, NumPy and SciPy are needed only to regenerate the original score.

- `index.html`: editable French text, SVG motifs, asset placement, and embedded master timeline.
- `styles.css`: palette, typography and layout.
- `timeline.js`: master GSAP keyframes in absolute seconds. After editing, run `python scripts/sync_timeline.py` to update the embedded copy used by HyperFrames.
- `assets/logo.svg`: unchanged original logo. Never edit its paths or split its letters.
- `assets/*.jpg`, `assets/prompolu-site.mp4`: genuine supplied portfolio images and silent selected-project source.
- `assets/music.wav`, `assets/sound-effects.wav`: editable separate original audio stems.
- `assets/soundtrack.wav`: mastered stereo mix used in the film.
- `scripts/compose_audio.py`: note-level editable original electronic score and sound design.

Commands:

```sh
npm run check
npx --yes hyperframes@0.8.192 snapshot --at 1.5,3.2,4.7,7.8,10.7,12.6,14.7,16.5,19
npx --yes hyperframes@0.8.192 render --fps 30 --quality high --output PROMARK_Motion_20s_FR.mp4
npx --yes hyperframes@0.8.192 preview --background
```

For Studio, use the printed project URL, ending `/#project/promark-film`. All render assets are local; the pinned CLI may need internet on first use. GSAP is vendored locally.

## Sources and substitutions

Source snapshot: the connected repository's `origin/promark-preview` branch, including `public/style.css`, `public/logo.svg`, `public/media`, and `index.html` inside `preview/PROMARK-preview.zip`. The source website was neither edited nor deployed.

The actual CSS tokens are paper `#f5f4ee`, ink `#141515`, lime `#d7ff00`, muted `#62645c`, line `#d7d8cf`. The source stylesheet describes those colors as provisional. Black canvas around the supplied black SVG is retained for seamless placement. The original logo geometry, lettering, proportions, spacing, and black fill are unmodified; its transparent lettering reveals a paper backing. Only external canvas whitespace is masked; no artwork is clipped.

The source declares Arial/Helvetica and Georgia. Original licensed font binaries were not supplied. This self-contained render embeds Liberation Sans as an Arial metric-compatible substitute and Noto Serif italic in place of Georgia. These substitutions are explicit production choices.

The previously mentioned animation reference video was not present in the available attachment or repository. Motion techniques were implemented from the detailed written brief. No missing logo or fabricated portfolio replacement is used. Abstract service illustrations are marked “Concept créatif”; they are not client work.

The duplicate gallery cards are intentional repeats in one accelerated scrolling rail. Their duplicate-media lint warnings do not indicate missing assets. Brief crossfades and masked scene handoffs may be identified as overlap by automated checks. Very short service beats and secondary editorial labels follow the requested 20-second timing; no essential sentence relies on those small labels.

No contact address, invented result, testimonial, award, or additional client has been added.

If the CLI requests a browser download, set `HYPERFRAMES_BROWSER_PATH` to your installed Chrome/Chromium executable before rendering. On this Linux render machine: `/usr/bin/chromium`.
