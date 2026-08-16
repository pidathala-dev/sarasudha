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
- **One core message per section.** Music Unbound = breadth. Ragam = classical depth. Heritage =
  where this comes from. Don't blend them.

## Page ownership

Every important idea has exactly one primary home. Other pages may reference it in a sentence or two
and link to the primary source — they should not retell it. Before adding a paragraph, check whether
the idea already has a home below; if it does, write a one- or two-sentence reference with a link
instead of a full explanation.

**Our Story owns** (the personal, narrative "why"):
- the name origin — Sarala + Sudha → Sarasudha, and what each name means (explained fully once, in
  "The Name" section; every other page/section references it briefly, never re-explains the
  meanings)
- the personal-to-public transformation (why a family name became a public platform)
- Sarasudha's purpose and philosophy — why this platform, why music needs it
- the high-level historical connection to Annamacharya Kalabharati (that it exists, roughly when,
  who was involved) — not the detailed chronology
- the quieter period, told as an emotional/narrative bridge, not a dated gap
- 2026 and what Sarasudha wants to become
- Preserve / Perform / Pass On

**Heritage owns** (the archival, evidence-led "what remains"):
- the detailed, dated chronology (1984 registration, 1997 Mandapam, 1998 Vardhanti, 2001 Jayanti,
  2010 statue-protection appeal, and any future recovered dates) — this is the *one* place the full
  timeline renders
- Regn. No. 217/1984 as a registration reference — state it once per page, not in two places on the
  same page
- archive categories, source material, photographs, programmes, documents, recordings
- the Historical Archive / Contemporary Archive split and digitisation status
- archive contribution as an activity ("share material," not "join the story")

**The homepage** only teases — one eyebrow, one headline, one or two sentences, one link to
`/our-story`. It should never contain enough detail that a reader feels they've already read
Our Story or Heritage.

**Reference, don't retell.** When a page needs to mention something owned elsewhere: state it in one
sentence, then link to the owning page. Example (on Our Story, referencing Heritage's chronology):
"Family records show the cultural activity continued across later decades. Explore the documented
chronology → Heritage." Do not follow that sentence with the chronology itself.

Repeated **factual labels** across pages are fine and expected (e.g. "Annamacharya Kalabharati,"
"Cuddapah," "Regn. No. 217/1984," "1984," "Sarasudha" will naturally appear on multiple pages).
Repeated **paragraphs or explanations** are not — if you're about to write a sentence that already
exists near-verbatim on another page, link to it instead.

## Genre/tag vocabulary

Use exactly these tags when writing frontmatter (`src/content.config.ts` → `musicTags`), so filters
and cross-linking work: `Carnatic`, `Light`, `Devotional`, `Vocal`, `Instrumental`, `Contemporary`,
`Young Artists`. Don't invent new tags without updating that shared list and this guide.

## Claims that need care

### Annamacharya Kalabharati / 1984 / Registration No. 217/1984

The owner has supplied the registration number **217/1984** for Annamacharya Kalabharati, Cuddapah.
This may now be published — e.g. "Annamacharya Kalabharati, Cuddapah · Regn. No. 217/1984" — but its
presence on the site is a statement of what was *registered in 1984*, not a statement about the
society's status today.

**Allowed:**
- "Annamacharya Kalabharati, Cuddapah · Regn. No. 217/1984"
- "The organisation was registered in 1984 under Registration No. 217/1984."
- "Rooted in a cultural journey that began with Annamacharya Kalabharati in Cuddapah in 1984."
- "A new chapter inspired by and carrying forward that cultural journey."
- P. Ramachandran, the owner's father, was associated with the original organisation and is named as
  "among its early leaders" (no specific title).

**Not allowed until verified** (see `docs/HERITAGE_VERIFICATION.md`):
- Any claim that the 1984 society is presently active, or that its registration remains current
- Any claim that Sarasudha is legally the same society — avoid "the same organisation," "the same
  cultural institution," or "continuation"; use "inspired by," "rooted in," "carries forward the
  spirit of," or "a new chapter in" instead
- "Registered society since 1984" (present tense) or "42-year-old registered institution"
- Any statement of current NGO registration, tax status, charitable status, or government
  recognition
- A specific formal title for P. Ramachandran (Founder, President, Secretary, etc.) — write "among
  its early leaders" or similar, never a specific designation

If you're not sure whether a historical statement is safe to publish, treat it as unverified and
check `docs/HERITAGE_VERIFICATION.md` first.

### Historical chronology

Dated claims about Annamacharya Kalabharati beyond the 1984 registration (e.g. the 1997 Mandapam,
Vardhanti/Jayanti observances, the 2010 statue-protection appeal) are tracked in
`docs/HERITAGE_CHRONOLOGY.md` — check it before writing or editing any historical date on the public
site.

- Use exact dates only where the underlying source is clearly legible — see the Confidence column in
  `docs/HERITAGE_CHRONOLOGY.md`.
- Use "family records" or "the archival record" (or similar) when attributing a claim to the
  recovered chronology — don't state it as plain fact with no source framing.
- Evidence of *cultural activity* (an appeal, a commemoration, an opening) never by itself
  establishes *legal/compliance status*. Never infer or imply that the registered society was
  continuously, legally active across these years just because cultural activity is documented.
- Don't invent performers, organisers, venues, or programme details beyond what a source states.
- Any entry marked "internal only" / not yet publicly usable in `docs/HERITAGE_CHRONOLOGY.md` (e.g.
  the probable 2005 entry) stays out of public copy until its transcription is resolved with
  confidence — no exceptions for "it's probably right."
- Don't specify a duration for any gap in the documented record (e.g. never say "a two-decade gap"
  or similar) unless a source establishes both endpoints. Use neutral language instead — "in later
  years, the activity became quieter," "the public programme became less visible over time."
- The latest date in the recovered chronology (currently 2010) is not necessarily the last year of
  activity — say "among the records recovered so far" rather than implying it was the end.

### Sarala, Sudha and the Sarasudha name

- **Sarala** (the owner's mother) and **Sudha** (the owner's sister) are separate personal names when
  explaining the etymology — never merge them into a single name or attribute them to the same
  person.
- Interpret **Sarala** as simplicity, sincerity and grace; interpret **Sudha** as nectar, sweetness
  and richness. Don't over-literalise the Sanskrit/dictionary definitions — see
  `docs/BRAND_GUIDE.md` → "Name origin" for the approved conceptual framing.
- The combination is bigger than the two names: frame Sarasudha as what those two ideas become when
  expressed through music, not as a family tribute.
- The origin story is personal and true, and can be told directly (see `/our-story`). Keep it
  restrained — it's the origin of a public cultural platform, not a memorial.
- Don't over-use the family story. It belongs prominently on `/our-story`; reference it selectively
  elsewhere (if at all) and never repeat it in footers, performance listings, artist pages, or every
  CTA. The platform must read as bigger than its origin: origin story → identity → universal music
  platform.

### The brand name itself

Always write **Sarasudha** as one word. Never "Sara Sudha," "SaraSudha," or "Sarala Sudha" as the
brand name (Sarala and Sudha are the two source names, not the brand name). The classical vertical is
**Sarasudha Ragam** — always as a sub-brand of Sarasudha, never shortened to just "Ragam" as a
standalone brand identity in first reference on a page (later references on the same page may say
"Ragam" for brevity once established).

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

**Image identity, date and location metadata.** Where a photograph's identity, date or location has
been supplied directly by the owner, it may be recorded as owner-supplied archival metadata (e.g.
"the owner confirmed this was taken at Tallapaka"). Unidentified people, uncertain dates and unclear
event associations must not be inferred from a photograph itself — not from who appears to be
present, not from file order, not from resemblance to other photos. If in doubt, ask the owner
rather than guess, and record what's confirmed vs. still open in `docs/HERITAGE_IMAGE_MANIFEST.md`.

## Writing for artists

Artist bios in this repository (outside of the four labelled demo profiles) should only describe
real, verified information supplied by the artist or a trusted source — never invented biographical
detail, even to fill out a template.
