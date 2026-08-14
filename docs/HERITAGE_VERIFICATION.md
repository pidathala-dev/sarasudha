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
| 2 | 1984 registration number | **Unverified** | No registration number is stated anywhere on the public site. |
| 3 | Exact registration date | **Unverified** | Public copy states only the year "1984," never a specific date. |
| 4 | Original office bearers | **Unverified** | Only P. Ramachandran is named publicly (see item 5), and without a specific title. Other founding/early leadership is not named anywhere on the site. |
| 5 | P. Ramachandran's formal title | **Unverified** | Public copy (`/our-story`) says "among its early leaders" — deliberately not a specific designation (e.g. "Founder," "President," "Secretary") until confirmed. |
| 6 | Current legal status of the original 1984 organisation | **Unverified** | No claim of current registration, active status, tax status, or charitable status appears anywhere on the public site. |
| 7 | Latest filing/status with any registering authority | **Unverified** | Not referenced publicly. |
| 8 | Whether the organisation was ever formally dissolved | **Unverified** | Not referenced publicly. |

## What the public site currently says (and why it's safe)

The public site (`/our-story`, home page heritage section) uses only these two patterns, both
explicitly pre-approved for use without further verification:

- "Rooted in a cultural journey that began with Annamacharya Kalabharati in Cuddapah in 1984."
- "The story traces its roots to Annamacharya Kalabharati, established in Cuddapah in 1984."

Neither statement claims current registration, a specific legal status, or a precise date beyond the
year. This is intentional and should remain the pattern until the items above are resolved.

## Explicitly disallowed until verified

Do not add any of the following to public content until the corresponding item above is resolved
with documentary evidence:

- "Registered society since 1984"
- "42-year-old registered institution"
- Any statement of current NGO registration, tax-exempt status, or charitable status
- Any statement of government recognition
- A specific formal title for P. Ramachandran
- Names of other early office bearers not yet confirmed

## Where these claims live in the codebase

- `src/pages/our-story.astro` — timeline + heritage narrative, P. Ramachandran mention (with an
  inline code comment pointing back to this file)
- `src/pages/index.astro` — home page heritage section
- `src/pages/heritage.astro` — archive timeline
- `docs/CONTENT_GUIDE.md` — the writing rules that keep new copy inside these constraints

## Updating this file

When an item is resolved (e.g. a registration certificate is located), update its **Status** to
**Verified**, add the source/reference, and only then update the corresponding public copy to
reflect the newly confirmed fact.
