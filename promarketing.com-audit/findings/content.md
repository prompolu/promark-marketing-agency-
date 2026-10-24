# Content audit — local production build

## Scope and method

Reviewed all eight generated `dist/**/index.html` files and source content in `scripts/build.mjs` and `scripts/projects.mjs`. Visible main-text extraction uses Python's standard-library HTMLParser, excluding nav/footer outside `<main>` and script/style/SVG content. Some counts include captions, control labels, FAQ text and repeated process/CTA copy. Word counts describe coverage; they are not Google ranking thresholds or targets. No live ranking, backlinks or independent reputation checks were performed in this specialist review.

## Strengths

- Homepage explicitly identifies Promark as a marketing/creative agency in Fès and describes concrete services (`scripts/build.mjs:31`). About reinforces the same identity and location (`scripts/build.mjs:35`).
- Services describe client problems, proposed deliverables, scope limits, agreed feedback stages and “Sur devis” rather than invented prices (`scripts/build.mjs:33`).
- Portfolio uses real user-supplied work: Prompolu website/SEO/GEO plus client videos and Saraprocmaroc's film (`scripts/projects.mjs:2`). No fabricated commercial results, staff, awards or biographies were found.
- Case studies now render context, objective and deliverables in initial HTML, with captions and real video sources (`scripts/build.mjs:42`).
- First-party evidence and Prompolu's public URL are more credible than the earlier conceptual placeholders. Homepage FAQ addresses quote preparation, scope-dependent timing, revision scope and remote collaboration without fixed promises.

## Measured content inventory

| Route | Main-text words | Interpretation |
|---|---:|---|
| `/` | 578 | Useful overview; much is shared process/FAQ/navigation-to-services copy. |
| `/services/` | 575 | Four services plus SEO/GEO explanation share this one page. |
| `/a-propos/` | 239 | Clear approach/location; limited concrete information about the people or how the practice operates. |
| `/contact/` | 188 | Adequate task-focused contact copy, real email/phone/WhatsApp, transparent email-draft behavior. |
| `/realisations/` | 107 | Acceptable short collection/index; do not pad it to an arbitrary count. |
| `/realisations/prompolu-web/` | 145 | Original explanation is brief: scope is stated, actual SEO/GEO tasks are not detailed. |
| `/realisations/prompolu-motion/` | 189 | Four films provide evidence; method/creative decisions remain general. |
| `/realisations/saraproc-motion/` | 126 | One real film and concise scope, with little case-specific explanatory detail. |

No case is deemed “thin” solely because of these counts. The actionable issue is missing first-hand explanation that would help a prospective client choose Promark.

## Findings

### C-01 — High: case studies state scope, but not the distinctive work or decisions

Evidence: `scripts/projects.mjs:2` describes Prompolu SEO/GEO as “accompagnement SEO ... et GEO” without the actual pages/issues investigated or improvements delivered. The two video entries (`scripts/projects.mjs:3` and `scripts/projects.mjs:4`) give goals and output formats but no brief, constraints, storyboard choices or production decisions. Generated case pages reuse generic “Objectif”/“Travail réalisé” sections (`scripts/build.mjs:42`).

Why it matters: the authentic videos are strong proof, but the text does little to distinguish this agency's expertise from another provider's. This is a content and conversion limitation, not evidence of a Google penalty.

Recommendation: ask the user for the real client brief, Promark's exact role, the constraints, what changed, and one or two specific decisions. For Prompolu, document only actual SEO/GEO tasks performed; include before/after screenshots or approved evidence where available. Publish verified outcomes if supplied; otherwise explain the delivery and validation, without manufacturing traffic/ranking metrics.

### C-02 — Medium: service coverage is broad but brief at the individual-service level

Evidence: four core services plus SEO/GEO definitions are in `scripts/build.mjs:33`; their only distinct navigation targets are fragments (`/services/#contenu`, `#social`, `#web`, `#motion`). The overall 575 words include repeated scope language and the shared process/CTA.

Recommendation: expand decision-useful details for the most important service: who it fits, what the client supplies, deliverable examples, boundaries and an approved case link. Create a separate service URL only when there is enough distinct information and keyword/intent research supports it. Do not mass-produce near-duplicate city pages or assume every service needs a page to rank.

### C-03 — Medium: About page explains values but offers limited verifiable “who/how” evidence

Evidence: `scripts/build.mjs:35` describes approach, Fès location and the shared four-step method. It contains no named practitioner, owned process artifacts, or approved professional background. This is an agency page, so an article byline is not inherently required.

Recommendation: add a truthful owner/team introduction or a concrete explanation of how a project is managed, using only information the user approves. An office address, years in business, certifications, team photographs or awards must not be invented. Testimonials are optional and must be real, attributed and approved.

### C-04 — Low: headings can be more informative without losing the brand voice

Evidence: home H1 “Votre marque mérite d’être remarquée”, Services H1 “Du sens dans les idées”, and case H1s “Une présence digitale complète”/“Le produit prend la parole” are editorial. Titles, nearby labels and paragraphs already carry category/client/location context.

Recommendation: retain the editorial hero if desired; strengthen the case subtitles or H1s with a clear client/service identifier, e.g. “Prompolu : création du site et accompagnement SEO/GEO”. This is an incremental clarity improvement, not a missing-keyword penalty.

## Transparent local content checklist

Seven of ten criteria passed in this local editorial review: explicit identity/location; service deliverables and scope; authentic portfolio assets; conservative claims; case context/objectives/outputs; readable sections; clear quote/engagement expectations. Three criteria need work: client-specific process decisions; actual evidence of the SEO/GEO method; richer verifiable practitioner/operating detail. If converted to a number, **70/100 is a local implementation/content checklist score**, not Google's E-E-A-T score, a ranking prediction, or a measured authority score.

Experience is demonstrated by supplied media; expertise is only partly explained; external authority is not measured; trust benefits from genuine contact details and explicit mailto behavior. No numeric external-authority score is assigned.
