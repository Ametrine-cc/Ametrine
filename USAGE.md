# What's in here

`src/pages/index.astro` is now the full site (ported from the mockup),
built from:

- `src/components/Head.astro` — fonts (Sora replaces Syne for headings,
  Inter stays for body; only the weights actually used are loaded)
- `src/components/LanguageSwitcher.astro` — language picker (nav button +
  full-screen overlay). English ships in the HTML at build time; the other
  5 languages fetch from `/i18n/<code>.json` only when picked, capped at 2
  dictionaries in memory at once. Fires `i18n:change` on `document` so
  other parts of the page (pricing currency) can react.
- `src/components/ReleaseFeed.astro` — release cards. Reads
  `src/data/releases.json` (manual, always shown) and merges in your public
  Mastodon toots at **build time** (automatic, only ones linking to a
  `ko-fi.com` post, duplicates against the manual list skipped). Each card
  links straight to the Ko-fi post.
- `src/data/releases.json` — **edit this whenever you post something.**
  Plain array, no code involved:
  ```json
  [
    {
      "tag": "premium",
      "summary": "Short one-line summary shown on the site.",
      "kofiUrl": "https://ko-fi.com/yourpage/posts/your-post-slug",
      "date": "5 Aug 2026"
    }
  ]
  ```
  `tag` is `"premium"` or `"free"`. Add a new object to the top (or
  anywhere — order in the file is the order shown, up to 4 cards), rebuild,
  done. This always takes priority over the Mastodon auto-fetch below, so
  it's the simplest way to keep the section current if you don't want to
  bother with the Mastodon workflow at all.
- `src/components/GemLogo.astro` — the small gem mark used in the nav and
  footer logos.
- `public/main.css` — the full design-system stylesheet (nav, hero, values,
  stats, about, how-it-works, releases, vision, pricing, footer,
  animations). Lang-picker and release-card styles live scoped inside their
  own components instead of here.
- `public/i18n/*.json` — one file per language, all 131 translation keys.

## Before shipping

Two placeholders still need your real values — both marked clearly in the
files:

1. **`src/data/releases.json`** — replace the placeholder entries with your
   real releases (or leave it empty as `[]` if you'd rather rely purely on
   the Mastodon auto-fetch). Optionally also set `MASTODON_INSTANCE` /
   `MASTODON_HANDLE` in `src/components/ReleaseFeed.astro` to your real
   Mastodon account if you want the automatic path too.
2. **`ko-fi.com/YOURPAGE`** — appears in `src/pages/index.astro` (Ko-fi
   card button, pricing "Become Premium" button, footer link) and in
   `ReleaseFeed.astro`'s fallback. Swap in your real Ko-fi page.

## Ko-fi → Mastodon → site loop

Ko-fi has no public API for reading posts (only donation/shop webhooks —
confirmed, nothing to poll). Mastodon does have a public, unauthenticated
API for public accounts, so that's the bridge:

1. Publish the full post on Ko-fi as normal.
2. Toot a short summary from Mastodon with the Ko-fi post URL somewhere in
   the text (e.g. "Core update is live — details on
   ko-fi.com/yourpage/posts/xyz").
3. On the next build, `ReleaseFeed.astro` pulls your recent public toots,
   keeps the ones with a `ko-fi.com` link, and renders them. Clicking a
   card goes straight to that Ko-fi post — never to the toot.

Nothing auto-crossposts — there's no Ko-fi "post published" webhook and no
built-in Mastodon crossposting, so step 2 is a manual toot each time (or
wire it through Zapier/IFTTT off your own reminder if you want it
semi-automated). Since the fetch runs in the component frontmatter, it's
build-time only — zero runtime JS cost, zero per-visitor fetch. Re-run
`astro build` after tooting to refresh the list.

## Verified

`npm install && npm run build` completes cleanly and produces
`dist/index.html` at ~52KB with all 6 `i18n/*.json` files copied alongside
it. The Mastodon fetch was unreachable in the sandbox used to build this
(network egress is locked down there), which is exactly the failure path
`ReleaseFeed.astro` is built to handle — it fell through to
`MANUAL_RELEASES` without breaking the build, so you'll see that same
safety net if Mastodon is ever briefly down at your real build time too.
