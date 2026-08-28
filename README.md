# kieran.co

Personal site and CV. Statically exported and served from GitHub Pages at
[kieran.co](https://kieran.co).

## Stack

- Next.js 15 (App Router), statically exported
- React 19, TypeScript
- CSS Modules, with design tokens in `app/globals.css`
- Radix Primitives — Dialog, Toggle Group, Visually Hidden
- MDX posts, highlighted at build time by Shiki (`rehype-pretty-code`)
- Space Grotesk + IBM Plex Mono via `next/font`
- Yarn 4, Node 20

## Getting started

```bash
yarn install
yarn dev
```

Runs on [localhost:3000](http://localhost:3000). Use `--port` for anything else:

```bash
yarn dev --port 1337
```

## Scripts

| Command | Does |
| --- | --- |
| `yarn dev` | Dev server |
| `yarn build` | Static export to `out/` |
| `yarn lint` | ESLint (flat config, `eslint-config-next`) |
| `yarn typecheck` | `tsc --noEmit` |

There is no `start` script: `next start` needs a server and this is a static
export. To preview a build, serve `out/` with anything, e.g. `npx serve out`.

## Structure

```
app/
  layout.tsx            root shell, fonts, metadata
  globals.css           tokens (light + dark) and base styles
  not-found.tsx
  opengraph-image.png   social card, plus .alt.txt
  icon.svg              favicon
  (home)/               route group, still served at "/"
    page.tsx            section composition
    _components/        Hero, Experience, Projects, Education, HomeFooter,
                        and the shared Section + ChipList
  writing/              blog index and [slug] post pages
components/             cross-route: SiteHeader, CommandPalette, ThemeToggle,
                        ThemeScript, MetaKey, Prose
content/writing/        posts as .mdx with frontmatter
lib/                    useTheme, posts (reads content/), mdx (plugins),
                        commands (the palette's table)
data/                   cv.ts, projects.ts — all site copy lives here
public/                 profile photo, company logos, CV pdf, CNAME
tools/og-card.tsx       source for the social card, not built
```

Content is data-driven: roles, projects and profile copy come from `data/`,
posts from `content/writing/`, and the command palette builds itself from both.

## Writing a post

Drop a `.mdx` file in `content/writing/`. Frontmatter is required — the build
fails on a missing field rather than rendering a blank:

```yaml
---
title: "Post title"
date: "2026-08-28"
excerpt: "One line for the index and the social card."
---
```

The filename becomes the slug. Reading time is derived from the body. Fenced code
blocks are highlighted at build time and follow the site theme; add
` ```ts title="next.config.ts" ` for a filename header.

## Theming

Three values of `html[data-theme]`: `light`, `dark`, or `system` (the default,
following `prefers-color-scheme`). The choice persists to
`localStorage["kieran-theme"]`, and `ThemeScript` applies it in `<head>` before
paint so there is no flash.

Colours are custom properties. To reskin, change `--accent-h` in `:root`. Keep
the per-theme accent lightness (`L 0.48` light, `L 0.72` dark) or re-check
contrast — those values are what hold AA at the small mono sizes.

Keyboard: `⌘/Ctrl+K` opens the command palette, `⌘/Ctrl+J` flips the theme.

## Deploying

Pushing to `master` builds and publishes via
`.github/workflows/deploy.yml`. Requires **Settings → Pages → Source: GitHub
Actions**.

Three pieces make the export work on Pages, all already in place:

- `output: "export"` and `images: { unoptimized: true }` in `next.config.ts` —
  without the second, the build still emits `/_next/image` URLs that 404 on a
  static host
- `public/.nojekyll` — stops Jekyll hiding `_next/`
- `public/CNAME` — the custom domain

To change the social card, copy `tools/og-card.tsx` to
`app/opengraph-image.tsx`, run `yarn build`, replace
`app/opengraph-image.png` with `out/opengraph-image`, then delete the route
file again.
