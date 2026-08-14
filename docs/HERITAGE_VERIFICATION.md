# Heritage Verification (Internal)

**This file is internal.** It is not linked from any public page, not rendered as a route, and
should not be treated as content to publish. It exists to track which historical/legal claims about
Annamacharya Kalabharati and its connection to Sarasudha are still unverified against original
records, so the public site never states more than is currently known.

Do not remove items from this list without documentary evidence. Do not copy language from this file
directly onto the public site — public copy should always use the deliberately soft phrasing in
`docs/CONTENT_GUIDE.md` until an item below is resolved.

## Outstanding items

| # | Item | Status | Notes |
| - | ---- | ------ | ----- |
| 1 | Exact legal name of Annamacharya Kalabharati | **Unverified** | Public copy uses "Annamacharya Kalabharati" as given; not confirmed against a founding/registration document. |
| 2 | Registration No. 217/1984 | **Owner supplied — documentary copy/current registry status pending verification** | The owner has supplied this registration number directly. It may be published (see below), but no documentary copy of the certificate has been reviewed and its current standing with the registering authority has not been checked. |
| 3 | Exact registration date | **Unverified** | Only the year (1984) and the registration number are supplied. The specific date on the certificate is not yet known. |
| 4 | Original governing body / office bearers | **Unverified** | Only P. Ramachandran is named publicly (see item 5), and without a specific title. Other founding/early leadership is not named anywhere on the site. |
| 5 | P. Ramachandran's formal title | **Unverified** | The owner has confirmed P. Ramachandran — the owner's father — was associated with the original organisation, but his exact designation (Founder, President, Secretary, etc.) has not been confirmed against the original registration documents. Public copy says "among its early leaders" — deliberately not a specific designation until confirmed. |
| 6 | Present legal status of the 1984 society | **Unverified** | No claim is made that the 1984 society is presently active, that its registration remains current, or that Sarasudha is legally the same society. |
| 7 | Latest filing with the registering authority | **Unverified** | Not referenced publicly. |
| 8 | Whether the organisation was ever formally dissolved | **Unverified** | Not referenced publicly. |

## What the public site currently says (and why it's safe)

The public site (`/our-story`, home page heritage section, `/heritage`) uses patterns along these
lines, all consistent with what's actually known:

- "Annamacharya Kalabharati, Cuddapah · Regn. No. 217/1984"
- "Before Sarasudha, there was Annamacharya Kalabharati" / "a new chapter inspired by and carrying
  forward that cultural journey"
- "The story reaches back to Cuddapah in 1984, when Annamacharya Kalabharati was established as a
  cultural initiative bringing music, artists and community together."

None of these claim current registration, a specific legal status, or that Sarasudha is the same
legal entity as the 1984 society — they state the registration number as supplied, and describe
Sarasudha as inspired by / carrying forward that cultural journey, not as its legal continuation.
This is intentional and should remain the pattern until the items above are resolved.

## Explicitly disallowed until verified

Do not add any of the following to public content until the corresponding item above is resolved
with documentary evidence:

- "Registered society since 1984" (present tense — implies current, unverified standing)
- "42-year-old registered institution"
- Any statement that the 1984 society is presently active
- Any statement that Sarasudha is legally the same society, or "the same organisation" / "the same
  cultural institution" as Annamacharya Kalabharati
- Any statement of current NGO registration, tax-exempt status, or charitable status
- Any statement of government recognition
- A specific formal title for P. Ramachandran
- Names of other early office bearers not yet confirmed

Prefer "inspired by," "rooted in," "carries forward the spirit of," or "a new chapter in" wherever
copy connects 1984 to Sarasudha today.

## Where these claims live in the codebase

- `src/pages/our-story.astro` — hero, "The Name" section, "Where It Began" heritage section,
  timeline, P. Ramachandran mention (with an inline code comment pointing back to this file)
- `src/pages/index.astro` — home page heritage section
- `src/pages/heritage.astro` — archive timeline, historical vs. contemporary archive split
- `docs/CONTENT_GUIDE.md` — the writing rules that keep new copy inside these constraints

## Updating this file

When an item is resolved (e.g. a registration certificate is located), update its **Status** to
**Verified**, add the source/reference, and only then update the corresponding public copy to
reflect the newly confirmed fact.
