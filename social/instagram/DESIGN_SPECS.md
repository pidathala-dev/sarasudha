# Launch post design specifications

A designer/developer handoff reference for the six launch posts — the exact
text set on each artwork, the layout, and the colour treatment, alongside
each rendered image. The source of truth for the actual pixels is
`data/posts.mjs` + `scripts/render.mjs`; this file documents the *design
intent* behind that code in plain language, and notes where a post has a
natural future life as a carousel once there's more real content to extend
it with.

All six share the same ground rules: 96px side margins, Source Serif 4
(medium) for headlines, Inter for supporting text and labels, and the exact
palette in `data/theme.mjs` (mirrors `src/styles/tokens.css` — no colours
invented for social).

---

## 01 — Introducing Sarasudha

| | |
| --- | --- |
| **Title text on artwork** | The "Sarasudha" wordmark (two-tone lockup, not typed as plain text) |
| **Supporting text** | Eyebrow: "Carnatic · Light · Contemporary" · Tagline: "Rooted in tradition. Open to every note." |
| **Layout** | Full-bleed wine background; left-aligned wordmark lockup in the lower-middle third; faint concentric-arc motif upper-right; gold pill CTA bottom-left |
| **Colour emphasis** | Wine ground · warm-white + gold-warm wordmark halves · gold-antique CTA pill (wine text) |
| **Format** | Static |
| **File** | `feed/01-introducing-sarasudha-1080x1080.png`, `stories/01-introducing-sarasudha-story-1080x1920.png` |

## 02 — The Name

| | |
| --- | --- |
| **Title text on artwork** | "Sarala + Sudha → Sarasudha" (rendered as a vertical equation, not a single line) |
| **Supporting text** | "Sarala" / "SIMPLICITY · SINCERITY · GRACE" — "Sudha" / "NECTAR · SWEETNESS · RICHNESS" — closing line: "Two names. One musical expression." |
| **Layout** | Cream ground; centred, stacked equation composition (word, meaning, operator, repeat) resolving into the full wordmark, closing line beneath |
| **Colour emphasis** | Cream ground · maroon ("Sarala"/"Sara") + gold-text ("Sudha"/"sudha") · teal-text meaning labels · gold-antique operators |
| **Format** | Static now. **Carousel potential**: a 2-slide version (Sarala on slide 1, Sudha on slide 2, Sarasudha reveal on slide 3) gives each name more room once there's appetite for a slower reveal |
| **File** | `feed/02-the-name-1080x1080.png`, `stories/02-the-name-story-1080x1920.png` |

## 03 — Rooted in 1984

| | |
| --- | --- |
| **Title text on artwork** | "Rooted in 1984." |
| **Supporting text** | Registration block: "Annamacharya Kalabharati" / "Cuddapah · Regn. No. 217/1984" — body: "Sarasudha is a new chapter inspired by that cultural journey." |
| **Layout** | Wine ground; upper-left headline, gold rule, registration block, body copy; faint motif lower-left; deliberate open space lower-right |
| **Colour emphasis** | Wine ground · warm-white headline + registration name · gold-warm eyebrow + registration meta · text-inverse-muted body |
| **Format** | Static — see `docs/CONTENT_GUIDE.md` and `docs/HERITAGE_VERIFICATION.md` before extending this post; no additional historical claims beyond what's already verified for the website |
| **File** | `feed/03-rooted-in-1984-1080x1080.png`, `stories/03-rooted-in-1984-story-1080x1920.png` |

## 04 — One Tradition. Many Expressions.

| | |
| --- | --- |
| **Title text on artwork** | "Music does not stop at the boundaries we give it." |
| **Supporting text** | Eyebrow: "ONE TRADITION, MANY EXPRESSIONS" — numbered list: 01 Carnatic, 02 Light Music, 03 Devotional, 04 Contemporary |
| **Layout** | Cream-alt ground; upper-left eyebrow + headline; four-row numbered list with hairline dividers filling the lower two-thirds |
| **Colour emphasis** | Cream-alt ground · teal-text eyebrow · ink headline + list labels · gold-text numerals |
| **Format** | Static now. **Carousel potential**: one slide per genre (Carnatic / Light / Devotional / Contemporary), each carrying a short, real example once performances exist to point to |
| **File** | `feed/04-one-tradition-many-expressions-1080x1080.png`, `stories/04-one-tradition-many-expressions-story-1080x1920.png` |

## 05 — Preserve. Perform. Pass On.

| | |
| --- | --- |
| **Title text on artwork** | "Preserve. Perform. Pass on." |
| **Supporting text** | Subline: "A space for memory, music and the next generation." — three pillars: 01 Preserve, 02 Perform, 03 Pass On |
| **Layout** | Cream ground; upper-left headline + subline; three pillars set in a single row near the base |
| **Colour emphasis** | Cream ground · maroon headline + pillar words · gold-text numerals · muted-ink subline |
| **Format** | Static |
| **File** | `feed/05-preserve-perform-pass-on-1080x1080.png`, `stories/05-preserve-perform-pass-on-story-1080x1920.png` |

## 06 — Be Part of What Comes Next

| | |
| --- | --- |
| **Title text on artwork** | "Be part of what comes next." |
| **Supporting text** | Eyebrow: "PARTICIPATE" — subline: "For musicians, collaborators, archive contributors and listeners." |
| **Layout** | Wine ground; upper-left eyebrow + headline + subline; gold pill CTA bottom-left; motif lower-right |
| **Colour emphasis** | Wine ground · warm-white headline · gold-warm eyebrow · gold-antique CTA pill (wine text) |
| **Format** | Static |
| **File** | `feed/06-be-part-of-what-comes-next-1080x1080.png`, `stories/06-be-part-of-what-comes-next-story-1080x1920.png` |

---

For full captions and hashtags, see `captions/launch-captions.md` and
`captions/hashtags.md`. To change any of this, edit `data/posts.mjs` and
re-run `npm run social:instagram:feed` (and `:stories`) — see the main
`README.md` → "Adding a future post" for the full workflow.
