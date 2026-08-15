# Manual Instagram setup checklist

Everything in this file has to be done by hand in the Instagram app/website —
none of it is automated by this repository, and this system never connects
to the Instagram API.

## Account setup

- [ ] Switch `@sarasudha.in` to a **Business** account (Settings → Account type)
- [ ] Paste the display name: `Sarasudha | Music & Culture`
- [ ] Paste the bio from `profile/PROFILE_SETUP.md`
- [ ] Add the website link: `https://sarasudha.in`
- [ ] Upload `profile/avatar-1080x1080.png` as the profile photo
- [ ] Set the profile category (Arts & entertainment / Musician or band)

## Launch content

- [ ] Upload the six feed posts **in order** (`feed/01-...` through
      `feed/06-...`), each with its caption from
      `captions/launch-captions.md` and the hashtag block from
      `captions/hashtags.md` as the first comment — see
      `CONTENT_CALENDAR.md` for suggested spacing between posts
- [ ] Post an initial Story (e.g. `stories/01-introducing-sarasudha-story-1080x1920.png`)
      the same day as the first feed post, so the account doesn't look
      freshly created with a single static post
- [ ] Create the five Highlights (Music, Ragam, Heritage, Events,
      Participate) and set each cover to its matching file in `highlights/`
- [ ] Add at least one Story to each Highlight before publishing it publicly
      (an empty Highlight with just a cover looks unfinished) — reposting
      the matching feed post's Story version into that Highlight is fine

## Optional / later

- [ ] Connect a Facebook Page to the Instagram Business account, if/when one
      exists — not required for launch
- [ ] Enable two-factor authentication on the Instagram account
- [ ] Review the account's linked email/phone recovery options are correct

## Explicitly not done by this checklist

- No API connection, no scheduling tool integration, no third-party
  automation — this repo produces assets and reference text only.
