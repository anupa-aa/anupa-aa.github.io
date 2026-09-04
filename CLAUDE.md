# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Hugo static site for anupa.ml (personal blog + portfolio) with a custom in-repo theme,
`themes/linen`. The repo doubles as an Obsidian vault — the README documents that
authoring workflow, and most commits are auto-generated `vault backup: <timestamp>`
commits from the Obsidian Git plugin.

## Commands

```bash
hugo server              # live preview at localhost:1313 (drafts hidden)
hugo server -D           # include draft: true pages
hugo --minify            # production build into public/
hugo new content writing/<slug>/index.md   # scaffold a post from archetypes/writing.md
```

There is no test suite, linter, or package manager — Hugo is the only build tool.
Local Hugo is 0.165.0 extended; CI pins `HUGO_VERSION: 0.161.1` in
`.github/workflows/deploy.yml`. Both must be the **extended** build.

Push to `main` → GitHub Actions builds and deploys to GitHub Pages. Custom domain
comes from `static/CNAME`. `public/` is gitignored; the copy on disk is stale local
build output and is never the deployed artifact — don't edit it.

## Content model

Two sections, rendered by different code paths:

- **`content/writing/`** — page bundles (`<slug>/index.md`) so pasted images live
  beside the post. Sorted by date, descending. `render-image.html` resolves image
  destinations against `.Page.Resources` first, which is what makes bare
  `![](image.png)` links work inside a bundle.
- **`content/projects/`** — flat single files. Sorted `ByWeight`. A `link` front
  matter value makes the listing row point at an external URL (`target="_blank"`)
  instead of the page itself; `blurb` is appended after an em dash. All current
  projects share `weight: 1`, so their order is effectively arbitrary.

Both sections appear twice: once on their own list page (`_default/list.html`,
which branches on `.Section`) and once on the homepage (`layouts/index.html`,
which re-implements the same two loops). **Change a listing row and you must change
it in both files.**

Directory names carry spaces and punctuation (`content/writing/pre norm > post norm/`);
Hugo slugifies these into URLs. Quote paths in shell commands.

## Maths

`hugo.toml` enables the Goldmark **passthrough** extension for `$…$` and `$$…$$`, so
Hugo leaves LaTeX untouched instead of mangling `_` and `\` as Markdown. KaTeX is then
loaded client-side by `partials/math.html` — but only when the page has `math: true` in
its front matter. A post with LaTeX and no `math: true` ships raw dollar signs. The
`writing` archetype and the Obsidian Templater template both set it by default.

## Theme notes

- `layouts/partials/head.html` fingerprints `assets/css/main.css` and applies the
  saved/system theme via an inline blocking script before first paint (avoids a flash).
  Colours are CSS custom properties on `:root` / `[data-theme="dark"]` at the top of
  `main.css`; `assets/js/theme-toggle.js` flips `data-theme` and persists to
  `localStorage`.
- `goldmark.renderer.unsafe = true` — raw HTML in Markdown is rendered.
- Taxonomies are disabled (`disableKinds = ["taxonomy", "term"]`), so `tags:` /
  `categories:` front matter produces no pages.
