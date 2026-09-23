# Premier Academy — static site

A static rebuild of premier-academy.com, replacing the WordPress install. Plain HTML,
CSS and vanilla JS — no framework, nothing to patch, deployable to any static host.

Built from [premier-academy-rebuild.md](premier-academy-rebuild.md), then corrected
against the live site: the real images, palette, copy, slugs and embeds were pulled from
premier-academy.com and its WordPress REST API.

---

## Quick start

```bash
npm run build     # generate the 25 pages + sitemap + redirects
npm run serve     # http://localhost:3000
npm run check     # every internal link resolves, no WordPress URLs left
npm run test      # headless-Chrome functional + responsive tests
```

`npm run dev` does build + serve in one go.

---

## How this repo is laid out

The deployable site **is** the repo root — `index.html`, `about/`, `css/`, `assets/` sit
exactly where the spec's Section 1 says they should. Those HTML files are **generated**;
edit the sources in `build/`, not the output.

```
build/                  ← generator source (edit these)
  build.js              entry point; writes pages, sitemap, robots, redirects
  layout.js             <head>, header + nav, footer, GTM, wave dividers
  site.js               contact details, social URLs, form endpoints, SMS copy
  nav.js                the navigation tree
  data.js               teachers, testimonials, gallery, partners, colleges, embeds
  components.js         reusable blocks (cards, quotes, tables, accordions, CTAs)
  icons.js              inline SVG icons
  redirects.js          old WordPress slugs → new paths
  pages/                page content: home, about, counseling, services, misc

css/styles.css          hand-authored; not generated
js/main.js              hand-authored; not generated
assets/                 84 real images pulled from the live site
scripts/                dev tooling — see below

index.html, about/, …   ← GENERATED. Do not edit; `npm run build` overwrites them.
```

**To change page copy**, edit the matching file in `build/pages/` and rebuild.
**To change contact details, social links or form endpoints**, edit `build/site.js` once —
every page picks it up.

---

## What came from the live site

Everything below was verified against premier-academy.com rather than guessed.

| Thing | Source |
| --- | --- |
| 84 images | WordPress media library via the REST API, resized and optimised (9.1 MB total) |
| Brand palette | Sampled from the live CSS and the crest: crimson `#a60531`, ink `#221638`, coral `#fe4a55`, laurel gold `#d4a233` |
| Logo and crest | `Logo.png` / `Logo-Footer.png`, plus the Chinese wordmark as `logo-wordmark.png` |
| Navigation | Matches the live menu exactly, including the Faculty flyout |
| Redirects | 36 real slugs (`/our-partners/`, `/study-abroad-usa/`, `/gallery-2/`, `/transfer-services/`, …) |
| Partners page | Seven partner logos plus the 19-photo "Friends of the Academy" gallery |
| Study Abroad page | Rewritten from the live page: boarding-school placement, visa support, home stay, and the full FAQ |
| News/Press | Four YouTube embeds, each verified playable via oEmbed |
| Gallery | All 27 photos, in the live page's order |
| Success stories | University logos attached to each card |
| Contact form | The live site's exact SMS consent and carrier-compliance wording |
| Social URLs | Facebook `OfficialPremierAcademy`, Instagram, X — all verified |

### Corrections worth knowing about

- **The palette in the spec was wrong.** It described navy `#1a3c6e` and gold `#e8a93a`;
  the real brand is crimson and ink. The spec did say the values were approximate and to
  verify from screenshots, so they were.
- **Several slugs in the spec do not exist.** The pages the spec listed as 404s are live
  under different names — Partners is `/our-partners/`, Study Abroad is
  `/study-abroad-usa/`, Gallery is `/gallery-2/`, Transfer is `/transfer-services/`.
- **The LinkedIn icon on the live footer links to `#`.** There is no LinkedIn account, so
  the icon is omitted rather than pointed at a dead link.
- **Some News/Press media is already broken on the live site.** All five radio players
  point at `sanmarinopremier.com`, a domain that no longer resolves, and two of the six
  YouTube embeds are removed or private. Only the four working videos are rendered, and
  the radio section is omitted. Both lists are kept in `build/data.js` with notes, so
  either can be restored the moment working sources exist.
- **Two News/Press titles in the spec were attached to the wrong videos.** Titles now come
  from YouTube itself.

---

## Before launch — what still needs you

### 1. Form endpoints

`build/site.js` has `formEndpoint` and `newsletterEndpoint` set to `YOUR_FORM_ID`
placeholders. Until you replace them, submitting shows an explanatory error rather than
silently failing. Sign up with Formspree, Web3Forms or Netlify Forms, paste the real URLs
in, and rebuild. A honeypot field (`_gotcha`) replaces the old CAPTCHA on both forms.

### 2. The Chinese site — built

**A full `/zh/` tree now exists**, generated the same way the English site is, from the
same page templates. Every page, every redirect, every asset path has a Chinese
counterpart. This replaces the live site's TranslatePress plugin (which stored the
translation in the database, not as separate pages — see below for why that approach
wasn't repeated).

**How it works:**

- `content/i18n/zh.json` is a dictionary: English string → Chinese string, 700 entries
  covering everything on the site.
- `content/i18n/keep.json` lists the 79 strings deliberately left in Latin script — people's
  names, local school names, academic credentials (`B.S. UCLA`), and technical tokens
  (`STOP`, `collegeboard.org`) that Chinese readers expect to see as-is.
- The build renders the English pages once, then re-renders them per locale by swapping
  translatable text (`build/i18n.js`). Tags, URLs, classes and scripts are never touched —
  only text nodes and a small set of attributes (`alt`, `title`, `placeholder`,
  `aria-label`, and prose `<meta>` tags).
- `npm run strings` regenerates the source inventory at `content/i18n/strings.json`
  whenever English copy changes; the build reports any string missing from the dictionary
  instead of silently shipping English text on a Chinese page.

**Why a dictionary instead of duplicating the page templates in Chinese:** editing a
sentence once in `build/pages/*.js` updates both languages, structure only has to be
maintained in one place, and the two sites can never drift into showing different
information — only different words for the same information.

**Terminology** follows the live site's own established Chinese where it existed —
`培名学院` for the Academy's name, `个人家教` for tutoring, `光荣榜` for the honor roll — pulled
from the archived `/zh/` pages before checking each string. University names use their
standard Chinese translations (哈佛大学, 斯坦福大学, …) rather than transliteration.

**What was deliberately not carried over:** the live TranslatePress translation is only
56% complete on average across its 29 pages (measured, not assumed — see
`content/zh-content.json` for the archived original if you want to compare). This build's
translation is complete on every page, but it is a fresh, independent translation of the
English copy — not a continuation of the live site's partial one. If your team has
Chinese-fluent staff, a review pass before launch is worth doing; the dictionary format
(`content/i18n/zh.json`) makes spot-editing any string straightforward.

The original archived Chinese content is still preserved if useful for comparison:
`premier-assets/html-zh/` (gitignored, local only) and `content/zh-content.json`
(committed) — see `npm run fetch-assets` and `npm run extract-zh`.

### 3. Pages that exist on WordPress but are not in this build

`/esl-eld-toefl/` (a real ESL/ELD/TOEFL service page) and `/faq/` are live and are not in
the spec's page list. Both currently 301 to the nearest equivalent. `/key-test-dates/` is
live but its content is stale (2016 SAT dates) and it redirects to the SAT/ACT page.

---

## What is built

50 pages — 25 in English at the repo root, 25 in Chinese under `/zh/` — matching the
live navigation exactly:

- Home, with a 3-slide hero carousel (CSS + vanilla JS, no Slider Revolution)
- About: overview, Director's message, testimonials, honor roll, news/press, gallery,
  teachers, job opportunities
- Private Tutoring, College Counseling (programs, success stories, top colleges, transfer)
- Services: SAT/ACT, AP, Study Abroad, Summer/Winter, Homework Assistance, Payment Options
- Partners, Contact (form + map), Privacy Policy, Terms & Conditions, 404

Plus `sitemap.xml`, `robots.txt`, `_redirects`, `vercel.json` and
`deploy/nginx-redirects.conf` — all generated from one source, all in sync.

### Interactive pieces

| Feature | Notes |
| --- | --- |
| Mobile nav | Slide-in drawer, two levels of accordion, Escape to close, focus returned to the trigger |
| Desktop nav | Hover/focus dropdowns with a flyout for Faculty; right-edge menus align right so they never widen the page |
| Hero carousel | Autoplay with pause on hover/focus, arrows, dots, touch swipe, honours `prefers-reduced-motion` |
| Lightbox | Gallery and the partners photo wall; arrow keys, Escape, focus restore, `aria-modal` |
| Forms | Client-side validation with per-field messages, `aria-invalid`, honeypot, status region |
| Language toggle | Probes `/zh/` before navigating — see above |

---

## Deploying

The repo root is the publish directory.

- **Netlify / Cloudflare Pages** — `netlify.toml` and `_redirects` are ready. Build
  command `npm run build`, publish directory `.`
- **Vercel** — `vercel.json` carries the redirects and cache headers.
- **Nginx / VPS** — include `deploy/nginx-redirects.conf` inside your `server { }` block.

All three block `/build/` and `/scripts/` so the generator source is not served, and 301
the old WordPress slugs so existing links and search results keep working.

Google Tag Manager (`GTM-KCWVX5P4`) is on every page, head and body.

Redirect behaviour depends on the host's trailing-slash handling and cannot be
verified locally — run `npm run smoke -- <url>` after any deploy that touches
`build/redirects.js`.

### Launch checklist

- [ ] Form endpoints set in `build/site.js`, and a test submission received
- [ ] Chinese translation reviewed by a fluent speaker (see "The Chinese site" above)
- [ ] `npm run check` and `npm run test` green
- [ ] `npm run smoke -- https://premier-academy.com` green after DNS cutover
- [ ] SSL configured, DNS pointed at the new host
- [ ] Old WordPress instance archived before shutdown — `npm run fetch-assets` saves the
      media library and page HTML, but archive the database separately

---

## Dev tooling

| Command | What it does |
| --- | --- |
| `npm run check` | Resolves every internal `href`/`src`; fails on leftover same-origin `wp-content` or `?page_id=` URLs |
| `npm run test` | Starts a server and runs both browser harnesses in headless Chrome |
| `npm run fetch-assets` | Re-downloads the media library and page HTML from the live site |
| `npm run assets` | Regenerates the web-ready images from `premier-assets/raw` |
| `npm run smoke -- <url>` | Post-deploy check against a live host: every page, every legacy redirect, key assets, and 404 handling |
| `npm run extract-zh` | Rebuilds `content/zh-content.json` from the archived `/zh/` pages |
| `npm run strings` | Rebuilds `content/i18n/strings.json`, the source inventory for translation |

The harnesses in `scripts/` are ordinary HTML pages — open them in a real browser against
a running server to debug interactively:

- `scripts/fn-test.html` — 44 assertions across nav, slider, forms, lightbox, accordion
- `scripts/overflow-test.html` — horizontal overflow, 25 pages × 7 widths
- `scripts/preview.html` — mobile/tablet viewports side by side in exact-width iframes

`overflow-test.html` is worth re-running after any CSS change; it catches the grid-track
and intrinsic-width problems that stay invisible until someone opens the site on a phone.
