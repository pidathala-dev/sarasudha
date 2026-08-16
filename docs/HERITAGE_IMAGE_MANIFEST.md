# Heritage Image Manifest (Internal)

**This file is internal.** It is not linked from any public page and is not rendered as a route.
It exists to record what is known about the first real historical photographs identified for the
Sarasudha archive, and — critically — to record what is **not yet true**: that the actual image
files are not yet present in this repository. See also `docs/HERITAGE_CHRONOLOGY.md`,
`docs/HERITAGE_VERIFICATION.md`, `docs/heritage-sources/README.md` and `docs/CONTENT_GUIDE.md`.

## Source

Catalogued as **AKB-PHOTO-001** in `docs/heritage-sources/README.md`. Six photographs from the
owner's family archive (originating from a local folder the owner referred to as
`akb-archive-01`), shared with the assistant directly in conversation. The owner confirmed these
six are the complete set — not a sample of a larger folder.

**Status: pixel files not yet in this repository.** The six images were shared as inline chat
content during a remote (cloud) Claude Code session, which has no filesystem access to the
sender's images — only the visual content itself, not a file path. No enhancement, denoising,
cropping, or derivative generation has been performed, and none of the archive entries below carry
an `image` field yet. This is recorded plainly rather than worked around, per the project rule
against fabricating archive content that doesn't exist yet (`docs/CONTENT_GUIDE.md` → "Archive
material"). The real files need to reach a session with actual filesystem access (a local Claude
Code session, or the files added to this repository directly) before derivatives can be produced.

## Images and owner-confirmed metadata

Five images from one day, plus one separate portrait. Labelled A–E (assistant-assigned, for
unambiguous reference only — not a claim about original file order) plus a separate portrait.

| Label | Visual description (non-interpretive) | Location | Event | Confirmed by |
| ----- | -------------------------------------- | -------- | ----- | ------------- |
| A | Statue under a colourful canopy/pandal; a man at a blue gate | Cuddapah | 22 May 1997 Mandapam inauguration | Owner |
| B | Same statue with a group of five men at its pedestal; offerings, incense, a Telugu plaque | Cuddapah | 22 May 1997 Mandapam inauguration | Owner |
| E | Close-up of the same statue; garlands, a poster at its base | Cuddapah | 22 May 1997 Mandapam inauguration | Owner |
| C | A building with "THALLAPAKA" Andhra Pradesh Tourism signage | Tallapaka | Same day as A/B/E | Owner |
| D | Blurry indoor scene, appears to be a music programme/kutcheri | Tallapaka | Same day as A/B/E | Owner |
| Portrait | Cropped outdoor portrait, older man, glasses, grey hair, moustache | — | — | Owner: "this is my Dad P. Ramachandran" |

Owner-confirmed facts, and only these facts:

- A, B and E depict the same pre-existing statue in Cuddapah — the statue predates this occasion;
  it was not installed or unveiled that day. The photographs record the Mandapam's official
  inauguration, which the owner confirmed is the same milestone already dated **22 May 1997** in
  `docs/HERITAGE_CHRONOLOGY.md`.
- C and D were taken at Tallapaka, on the same day as A, B and E.
- The portrait is P. Ramachandran, the owner's father. No date, year or formal title has been
  supplied for this photograph, and none is stated in the corresponding archive entry.

Nothing beyond the above is asserted — no identities for the other people visible in B, no
occasion name for D beyond "appears to be a music programme," no claim about who built or donated
the statue.

## Where this is used

- `src/content/archive/p-ramachandran.md` — People entry for the portrait; no `image` field yet.
- `src/content/archive/1997-mandapam-inauguration-cuddapah.md` — Photographs entry for A, B, E; no
  `image`/gallery fields yet.
- `src/content/archive/1997-tallapaka.md` — Photographs entry for C, D; no `image`/gallery fields
  yet.

## Next steps (blocked on file access)

1. Get the six original files into a session with real filesystem access (local Claude Code
   session, or added to the repository under a path excluded from version control until
   processed).
2. Apply only non-generative optimisation (rotation, crop to subject, resize, compression, mild
   tonal normalisation) — no generative restoration or invented detail, per project rule.
3. Add resulting derivatives under `public/images/heritage/`, and populate the `image`/`imageAlt`
   fields on the three archive entries above.
4. Update this manifest's "Status" line once real files exist in the repository.
