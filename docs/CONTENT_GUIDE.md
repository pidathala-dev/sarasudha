# Content Guide

How to write for Sarasudha — tone, structure and the specific claims to be careful with.

## Voice

Sarasudha should read like a premium cultural publication, not a template. Write like you're
introducing someone to a musician or a story you genuinely respect — informed, warm, unhurried.

**Sarasudha is:**
- warm
- thoughtful
- credible
- elegant
- culturally rooted
- contemporary
- inclusive across generations

**Sarasudha is not:**
- corporate
- flashy
- a Bollywood-entertainment portal
- a religious institution
- a music-school template
- a wedding-event website
- an NGO brochure

## Avoid generic AI/marketing language

Do not use phrases like:

- "embark on a journey"
- "where passion meets excellence"
- "celebrating the rich tapestry"
- "unlock the power of"
- "world-class"
- "revolutionising music"

If a sentence would read the same on a template for any music brand, rewrite it until it's specific
to Sarasudha. Prefer concrete, restrained language over superlatives.

## Structure conventions

- **Eyebrow → headline → supporting line.** Most sections use a short uppercase eyebrow, a serif
  headline, and one or two sentences of supporting copy. Don't stack multiple taglines in the same
  section.
- **Headlines are short.** Aim for one line at desktop width. If a headline needs three clauses to
  make its point, it's doing too much — split it into a headline plus a lede sentence instead.
  the same idea again.
- **One core message per section.** Music Unbound = breadth. Ragam = classical depth. Heritage =
  where this comes from. Don't blend them.

## Genre/tag vocabulary

Use exactly these tags when writing frontmatter (`src/content.config.ts` → `musicTags`), so filters
and cross-linking work: `Carnatic`, `Light`, `Devotional`, `Vocal`, `Instrumental`, `Contemporary`,
`Young Artists`. Don't invent new tags without updating that shared list and this guide.

## Claims that need care

### Annamacharya Kalabharati / 1984

**Allowed:**
- "Rooted in a cultural journey that began with Annamacharya Kalabharati in Cuddapah in 1984."
- "The story traces its roots to Annamacharya Kalabharati, established in Cuddapah in 1984."

**Not allowed until verified** (see `docs/HERITAGE_VERIFICATION.md`):
- "Registered society since 1984"
- "42-year-old registered institution"
- Any statement of current NGO registration, tax status, charitable status, or government
  recognition
- A specific formal title for P. Ramachandran (write "among its early leaders" or similar, not a
  specific designation)

If you're not sure whether a historical statement is safe to publish, treat it as unverified and
check `docs/HERITAGE_VERIFICATION.md` first.

### Sarasudha's own name

The Sarala + Sudha origin story is personal and true, and can be told directly (see `/our-story`).
Keep it restrained — it's the origin story of a public cultural platform, not a memorial. Don't
extend the family narrative into sections that aren't specifically about the platform's origin.

### Demo/placeholder content

Anything in `src/content/*` with `isDemoContent: true` is placeholder content used to preview
layouts, not a claim about a real person, recording or event. Never write demo content that could be
mistaken for a real historical claim (no invented dates tied to actual Annamacharya Kalabharati
history, no fabricated biographical facts about real people). Fictional demo artists should read as
obviously representative (see the existing four demo artist profiles for the tone to match).

### Events

Never invent a real, dated, "upcoming" event. If there's nothing scheduled, that's what the empty
state (`EmptyState` component, copy: "New Sarasudha gatherings are being composed. Join our community
to hear first.") is for. Demo events are fine for development but must be flagged
`isDemoContent: true` and excluded from a production build via `PUBLIC_SHOW_DEMO_CONTENT=false`.

### Archive material

Don't fabricate archival documents, photographs, or historical specifics. Where material hasn't been
digitised yet, say so plainly ("Archive material being digitised") rather than describing content
that doesn't yet exist in the archive.

## Writing for artists

Artist bios in this repository (outside of the four labelled demo profiles) should only describe
real, verified information supplied by the artist or a trusted source — never invented biographical
detail, even to fill out a template.
