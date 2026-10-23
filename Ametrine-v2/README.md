# Ametrine Website (v2)

The official Ametrine Foundation website, rebuilt from scratch in Astro.

Ametrine Gradient: `linear-gradient(135deg, #a259f7 0%, #0071e3 100%)`

## Run it

Astro 7 needs Node.js 22.23 or newer (Node 24 recommended).

```bash
npm install       # or: bun install
npm run dev       # local dev server at http://localhost:4321
npm run build     # builds the static site into ./dist
npm run preview   # preview the built site
```

Deploys to Cloudflare the same way as before: `wrangler.jsonc` points at `./dist`,
and unknown URLs now show the custom 404 page.

## Where things are

```
src/
  data/
    site.ts        nav links, social links, site name and description
    projects.ts    every project (home page shows the ones marked flagship)
    team.ts        team members and their photos
  components/
    Header.astro         sticky header, hides on scroll down
    MobileMenu.astro     the burger menu (slide-out panel, under 860px wide)
    SearchPalette.astro  Ctrl/Cmd + K search, also works on mobile
    Footer.astro         footer and back-to-top button
    Gem.astro            faceted pentagon in the home page hero
    ProjectEntry.astro   one project, used on Home and Projects
    Support.astro        Ko-fi donation block
    Principles.astro     the four promises (Home and About)
    PageIntro.astro      title + breadcrumb at the top of inner pages
    Icon.astro / Mark.astro   inline SVG icons and the logo
  layouts/Base.astro     <head>, theme setup, page shell
  pages/                 index, projects, about, 404, sitemap.xml
  scripts/ui.ts          theme, menu, search, header, copy buttons
  styles/global.css      colour tokens, type scale, buttons
public/                  favicons, og.png share image, robots.txt
```

### Adding a project

Add an entry to `src/data/projects.ts`. Set `kind: "application"` for apps and it
will appear under the Applications filter on the Projects page. Set `flagship: true`
to show it on the home page and in the burger menu. Search picks it up automatically.

### Adding a page

Create `src/pages/your-page.astro`, wrap it in `<Base title="...">`, add it to
`nav` in `src/data/site.ts` and to the list in `src/pages/sitemap.xml.ts`.

## What changed from v1

- Every page rebuilt with proper layouts (v1 had `<html>` tags nested inside components)
- New burger menu: slide-out panel with page descriptions, flagship projects,
  Ko-fi card, light/dark/system theme switch and socials. Esc, backdrop click and
  focus handling all work.
- Fully responsive on every page, down to 320px wide
- Search palette now works on phones too, with keyboard navigation on desktop
- Projects page has type filters, text filtering, copy-to-clipboard clone commands
  and an empty state for applications
- Fonts are self-hosted (Schibsted Grotesk and JetBrains Mono via Fontsource), so the
  site makes no requests to Google or any other third party
- Logo is now SVG, team photos are optimised to WebP at build time
- Proper SEO: page titles, descriptions, canonical URLs, Open Graph image, sitemap
- Respects reduced motion, visible keyboard focus everywhere, skip link

## Rules

- Be respectful and professional in all contributions
- Follow the existing code style and formatting conventions
- Test your changes before submitting pull requests
- Write clear, descriptive commit messages
- Document any new features or significant changes
- Report issues with detailed information and reproduction steps

## Links

- Ko-fi: https://ko-fi.com/ametrinefoundation
- GitHub: https://github.com/Ametrine-cc
- Docs: https://docs.ametrine.cc
