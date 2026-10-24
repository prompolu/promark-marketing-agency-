# PROMARK studio direction — review only

Reference inspected: https://www.dopaminestudio.io/ on 24 October 2026. Public homepage, desktop 1440×1000 and mobile 390×844, nine desktop scroll positions, mobile scroll positions, menu and contact overlays. Reference browser capture: GitHub Actions run 40136547489. This is a homepage design study, not a claim to have exhaustively tested its other routes or every timing-dependent interaction.

## UI and layout

The reference uses a near-black canvas, acid lime accents, geometric display typography, monospaced uppercase annotations, restrained white body copy, broad spacing and pill buttons. Desktop uses a split hero, persistent compact header with local clock, centered section introductions and generous two-column project/service sections. Mobile stacks copy, full-width actions and the hero object. The menu/contact overlays are rounded charcoal panels over a dark, blurred backdrop. The footer reverses to lime with an oversized wordmark.

PROMARK adapts these patterns using its own #d7ff00 token, original SVG, French copy, Fès clock and existing 12-page architecture. Open-source Space Grotesk and IBM Plex Mono are self-hosted with their OFL licenses. No proprietary ITC font or reference image is redistributed.

## 3D and motion inventory

| Observed reference treatment | PROMARK implementation |
| --- | --- |
| Hero black industrial toggle with reflective edges and glowing lime thumb | Original interactive CSS geometry: beveled housing, inset track, lit orb, cast shadow; pointer-responsive perspective and accessible on/off switch |
| Hero object delivered as animated WebP, despite its `lottie-animation` class | No inference that it is realtime WebGL; PROMARK uses live CSS transforms rather than copying the render |
| Wireframe wheel/radial/orbital graphics over technical grids | Original concentric rings, orbit, sphere and angular wireframe studies |
| Tilted phone/browser project renders and dark reflective surfaces | Existing original client posters inside dimensional browser/phone frames; hover tilt and explicit video preview controls |
| Large project scenes with lime illumination | Real Prompolu web, Prompolu motion and Saraprocmaroc videos, separate project copy and case-study routes |
| Angled browser featured on a lime panel | Own Prompolu motion film poster, perspective browser frame linking to the case study |
| Scroll-linked section structure, sticky service columns and GSAP/ScrollTrigger scripts | Native scrolling, sticky service introduction and existing scoped scene effects; no scroll trapping |
| Rounded menu and contact overlays with backdrop blur | Native dialogs with Escape, focus containment, focus restoration and ordinary page-link fallbacks |
| Compact language/AI assistant widgets | Not added: no verified multilingual content or actual AI assistant for PROMARK; real contact routes remain available |
| Reference metrics, partner badges, external booking and client list | Not reused; only user-confirmed clients and actual delivered work |

No initial spline-viewer, model-viewer, iframe or canvas scene was present in the fetched homepage. Images can be pre-rendered 3D without an interactive 3D engine. This inventory distinguishes observed appearance and delivery from assumptions about its production tools.

## UX decisions

Primary actions lead to real work and a project conversation. All case studies remain directly addressable when JavaScript is disabled. Native keyboard-operable switch and dialogs support mouse, touch and keyboard. Reduced-motion removes pointer rotation and scene perspective transitions. Videos do not autoplay with sound and retain explicit playback controls in case studies. Contact details remain available; the review uses the existing email-draft fallback, with no automatic Formspree test submissions.

The reference's repeated floating widgets and very long content sequence can compete for mobile space. PROMARK retains the visual direction while using a shorter sequence, no invented claims and no overlapping chat/language widgets.

## Publication boundary

Isolated review: `/preview/studio-direction/`. The publisher compares every Git blob outside this exact directory before permitting the push. Production and the previous reactive-v2 preview remain byte-identical. Review pages are noindex, have no production canonicals, and disable the live form endpoint. The `.preview-only` guard blocks root deployment from this branch.
