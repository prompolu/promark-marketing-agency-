# Performance — local lab evidence

## Scope and method

Audited the current build at `http://127.0.0.1:3040/` with Chromium **154.0.8037.57**, on 2026-10-24. Three fresh-context homepage navigations at 1440×1000 and three at 390×844. Local network, unthrottled CPU/network, reduced motion. PerformanceObserver recorded LCP, layout shifts and long tasks. These numbers describe this container and generated build; they do not measure the deployed domain or real-user experience.

| Observed metric | Desktop | Mobile viewport |
|---|---:|---:|
| LCP samples | 136, 108, 132 ms | 120, 100, 112 ms |
| Median LCP | **132 ms** | **112 ms** |
| Maximum observed CLS | **0** | **0** |
| Long tasks observed | 0 | 0 |

These are not field Core Web Vitals, Lighthouse scores, a 75th-percentile assessment, or proof that a mobile device on a real connection will achieve equivalent results. INP was **not measured**. Zero observed long tasks is not an INP result. No performance category score is assigned.

## What works

- Small, local assets; no third-party fonts, tracking or video-host scripts loaded in the measured initial navigations.
- Measured encoded resource payload in five runs was about 67.6–68.0 KB, excluding the HTML document; one desktop run reached 223.0 KB when additional lazy resources were requested. Do not treat this as the full site/video weight.
- Initial resource samples: CSS 28,832 bytes; app JS 7,914 bytes; original SVG 3,402 bytes; hero JPEG 27,433 bytes. The hero uses eager loading and high fetch priority.
- Client videos are not downloaded for autoplay; native players use `preload="none"` and posters. Case-study media remains on-demand.
- Aspect-ratio containers, explicit image dimensions and local fonts produced no measured navigation layout shift.

## Opportunities

**Low — reduce CSS maintenance overhead.** `public/style.css` contains the original light-theme definitions followed by dark-theme and feature overrides. The file is still small, but consolidation would simplify safe future edits. No measurable LCP failure is attributed to this structure.

**Low — favicon request returns 404.** One fresh desktop navigation requested `/favicon.ico`, which returned 404. No authorised icon variant was supplied. Provide an approved icon asset rather than inventing one; this is a browser polish issue, not a critical ranking defect.

## Next validation

After the intended site is actually hosted, verify compression/cache headers on that host, repeat mobile lab tests under an explicit device/network profile, and inspect real-user CrUX/Search Console data when available. Existing local server timings cannot predict production TTFB, CDN cache behaviour or field INP.

Evidence: `rendering-evidence.json`, `screenshots/home-1440.png`, `screenshots/home-390.png`.
