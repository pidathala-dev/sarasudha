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

**Status: five of six derivatives are in the repository; the portrait is still outstanding.**
The original files reached a local session as 20 raw camera JPEGs
(`incoming/heritage/akb-archive-01/P1010273.JPG`–`P1010292.JPG`, gitignored, not committed) —
apparently the full camera roll from the same day, not just the six frames previously described to
the assistant inline. The assistant visually matched five of them against the owner-confirmed
labels below and produced non-generative derivatives (EXIF-safe orient, crop to subject, resize,
mild contrast normalisation via `sharp .normalize()`, WebP compression) using
`scripts/process-heritage-images.mjs`:

| Label | Source file | Derivative |
| ----- | ----------- | ---------- |
| A | `P1010278.JPG` | `public/images/heritage/cuddapah-1997-canopy.webp` |
| B | `P1010282.JPG` | `public/images/heritage/cuddapah-1997-offerings.webp` |
| E | `P1010273.JPG` | `public/images/heritage/cuddapah-1997-closeup.webp` |
| C | `P1010289.JPG` | `public/images/heritage/tallapaka-1997-signage.webp` |
| D | `P1010291.JPG` | `public/images/heritage/tallapaka-1997-music-programme.webp` |

No generative restoration or invented detail was applied — D in particular is genuinely
motion-blurred in the source and was left blurred rather than sharpened. B was used as the lead
`image` for the Cuddapah entry (community gathered, offerings visible) and A/E were embedded
further down the entry body; C is the lead `image` for the Tallapaka entry and D is embedded below
it.

**The portrait is not among the 20 files.** None of the raw JPEGs is a standalone photograph of an
individual man — all 20 are statue, temple, or group-event photographs from the same Cuddapah/
Tallapaka day. The owner was asked whether one of the men visible in the group photographs is
P. Ramachandran, cropped from an existing group shot, or a separate portrait file, and chose to
defer this for now rather than have the assistant guess a face from the crowd. `p-ramachandran.md`
still carries no `image` field. See "Next steps" below.

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

- `src/content/archive/1997-mandapam-inauguration-cuddapah.md` — Photographs entry; `image` = B,
  with A and E embedded inline in the body.
- `src/content/archive/1997-tallapaka.md` — Photographs entry; `image` = C, with D embedded inline
  in the body.
- **P. Ramachandran (People) — not currently published.** The text-only entry
  (`src/content/archive/p-ramachandran.md`) was removed at the owner's request while the portrait
  remains unresolved (see below), rather than leave an image-less card live on the public site. It
  can be recreated once a portrait is identified — the approved copy is preserved in git history
  (the commit that removed it) if it's needed again.

## Next steps (blocked on portrait identification)

1. Get an owner decision on the portrait: point to a specific person in one of the existing group
   photographs to crop, or supply a separate portrait file (into
   `incoming/heritage/akb-archive-01/` or elsewhere, gitignored under `/incoming/`).
2. Once identified, apply the same non-generative optimisation used for the other five images
   (`scripts/process-heritage-images.mjs` as a starting point), add the derivative under
   `public/images/heritage/`, and recreate `src/content/archive/p-ramachandran.md` with
   `image`/`imageAlt` populated.
3. Update this manifest's "Status" section once the portrait derivative exists.
