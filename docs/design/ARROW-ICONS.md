# Unified arrow icons

Replaced the diagonal arrow's separately drawn CSS lines with one SVG mask using consistent rounded strokes and joins. All current arrows use a 20px square box and inherit the surrounding text color, covering lime/dark buttons, text links, project cards, navigation and project-dialog actions. Old pseudo-element arrow pieces are disabled.

Checked twelve pages at 1440, 768, 390 and 320px, plus project-dialog links. Verified consistent computed dimensions, a single SVG mask, no remaining pseudo-element pieces, valid icon asset and no horizontal overflow. SVG remains crisp when a 3D card or dialog scales during an animation. The preview publisher preserves all production files.
