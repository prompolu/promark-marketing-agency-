---
name: sticky
description: "Apply the Sticky visual style: lime crumpled paper, giant condensed headlines, tape strips, sticky notes, kraft cards, round stickers, tape marquees, curved section edges and real-time Three.js 3D objects everywhere. Use when the user types /sticky, asks for the sticky style, or wants a website, landing page, artifact or UI in the style of the Promark redesign (inspired by sweet-tape.com)."
---

# /sticky — the Sticky style

A loud, tactile, playful look: everything feels like paper, tape and stickers on a pinboard, with chunky 3D objects floating in it. It was built for the Promark agency site (https://prompolu.github.io/promark-marketing-agency-/), inspired by the packaging-site style of sweet-tape.com. Take the style from that site. Don't copy its products, logo or copy.

When `/sticky` is invoked, apply this style to whatever the user is building or pointing at: a new page, an existing site, a component, or an artifact. If they give no target, ask what to style. Always keep their real content, structure, SEO and accessibility. Change the look, not the facts.

## Read first

- `references/promark-style.css` is the complete, production-tested stylesheet. Use it as the source for tokens and component recipes. Lift whatever you need from it and rename classes to fit the project.
- `references/scene3d.js` is the 3D engine. It adds the 3D scenes to `<canvas data-3d="kind">` elements, with fallbacks and reduced-motion support. Copy it into the project and adapt it.
- `references/components.md` has markup patterns for every component, plus the build rules that bit us.
- `assets/paper.svg` and `assets/paper-dark.svg` are the crumpled-paper textures for light and dark surfaces.

## The look in ten rules

1. **Palette:**
   - lime `#D7FF00` (hero and accent)
   - ink `#131419` (text and dark sections)
   - orange `#FF6A13`
   - cream `#F6F0E2`
   - kraft `#C99F72`, with brown text `#5B3208`
   - yellow `#FFE14D` (chips, sticky notes)
   - blue `#4FA8FF` and pink `#FF9EC4`, sparingly
   If the brand has its own accent, it replaces lime. Keep ink for text and contrast.
2. **Paper everywhere:** every section is crumpled paper. On light colours, use `background-image:url(paper.svg)` with `background-blend-mode:multiply` at 800px tiles. On dark colours, use `paper-dark.svg` with `soft-light`.
3. **Curved edges:** each section rises over the previous one with a soft curve. Use a `::before` ellipse that inherits the section background. The hero ends in a dark "hill" (a radial-gradient mask) that the 3D hero object sits on.
4. **Giant condensed type:** headlines use **Anton**, uppercase, at `clamp(50px, 8.6vw, 150px)` with line-height ≈ 1 (lower clips French/accented capitals). The hero words reach about 15vw, and each letter gets a small fixed rotation and offset from `nth-child` rules. Use **Caveat** for handwritten asides ("on rend les marques…", "pour tout ce qui compte ↘") and **Geist / Geist Mono** for body text and labels. Fetch all fonts from @fontsource on jsdelivr, pinned, and check them by SHA-256 (see components.md).
5. **Tape:** strips of semi-transparent beige (`rgba(238,226,190,.86)`) with zigzag ends from a `clip-path` polygon. Tape holds the top of cards, photos, notes, forms and the menu.
6. **Tilt and hard shadows:** cards, photos, notes and FAQ items are rotated -2.5° to +2.5°, alternating. Shadows are flat offsets with no blur (`10px 12px 0 rgba(19,20,25,.28)`). On hover a card straightens and lifts with a springy `cubic-bezier(.2,1.45,.4,1)`.
7. **Pinboard objects:**
   - a yellow sticky note with a handwritten checklist
   - a white-bordered photo print
   - kraft cardboard cards with big brown Anton text
   - round cream stickers with text circling an SVG `textPath` (spinning slowly) and a lime core
   - yellow chips with a dotted marker
8. **Tape marquees:** a rotated ink or lime band of Anton text scrolling forever (two copies in the track, animated to -50%).
9. **Agency navigation:** a cream floating bar with Anton links, the current page highlighted in lime, and an ink CTA button. On mobile it becomes a burger menu with a taped paper dropdown. Never use a novelty "pull me" tab for primary navigation. A fixed round "Parlons-en"/contact sticker in a corner is fine.
10. **Motion:**
    - headings pop in word by word (rotate, scale and rise, once, on intersection)
    - cards, photos and notes "slap on" when they enter the viewport
    - hero letters pop in on load
    Everything stops under `prefers-reduced-motion`.

## 3D is not optional

The user insists on 3D. Every page should carry at least one real-time Three.js object:

- **Hero:** a branded tape roll (label drawn on a canvas texture) that unrolls as you scroll and spins on drag. Around it float a heart, an asterisk, a content stack, an orbit, a ball and a cursor, each leaning toward the pointer.
- **Service or feature cards:** one object each: a content stack (video posts), a speech bubble with a heart (social), a browser window with a cursor (web), a torus with an orbiting ball (motion).
- **Inner pages:** a cluster (overview), a bouncing location pin (about), a paper plane (contact), a play card (case studies), a lime asterisk (CTA) and an ink asterisk (404, or any lime background).

Engine rules (already in `scene3d.js`):

- Give each object its own canvas, and render it only while visible (IntersectionObserver).
- Use `MeshPhysicalMaterial` with clearcoat, `NoToneMapping` so brand colours stay saturated, and sRGB output.
- Add a hard drop shadow with CSS `filter: drop-shadow(9px 12px 0 rgba(19,20,25,.2))` on the canvas.
- Build every shape from code (extrusions, capsules, tori, lathe). Never mirror geometry with a negative scale: it flips the faces inside out. Rotate instead.
- If WebGL is unavailable, show the static fallback next to the canvas (SVG illustration or CSS shape). Under reduced motion, render still frames and allow drag only.
- Load Three.js `three@0.160.0` as an ES module, self-hosted or pinned, with its hash verified.

## Workflow

1. Look at the target: its stack, templates, content and existing brand colours or logo. Keep the logo untouched. It can sit in a tilted sticker frame with a thick ink border.
2. Map its sections onto Sticky surfaces. A typical page runs lime hero, then ink manifesto (pinboard), then orange services (sticker cards with 3D), then lime work (taped photo prints with kraft captions), then ink FAQ (paper index cards), then orange CTA (3D asterisk and handwritten note), then ink footer (lime tape marquee and giant wobbly brand word).
3. Add the fonts, paper textures, tokens and components. Then add `scene3d.js` and the canvases.
4. Respect any content security policy: no inline `style=""` attributes. Use `nth-child` rules or set CSS variables from JS.
5. Check in a real browser (Playwright/Chromium with `--use-angle=swiftshader` for WebGL) at 1440, 900, 390 and 320px wide. Confirm all of these:
   - no horizontal overflow
   - one H1 per page
   - no console errors
   - the `has-3d` class is set
   - headings don't collide (accents)
   - 3D objects aren't cropped
   - satellites don't cover text or buttons
   Look at the screenshots before you call it done, and show them to the user as the preview.
