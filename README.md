# anupa.ml

Personal blog + portfolio. Hugo static site with a custom theme (`themes/linen`).

## Develop

```bash
hugo server        # live preview at http://localhost:1313
```

## Add a post

Create `content/writing/<slug>.md`:

```markdown
---
title: "Post title"
date: 2026-05-24
summary: "One-line summary for previews."
math: true   # optional — loads KaTeX only on this page
---
```

## Add a project

Create `content/projects/<slug>.md` with `title`, `weight` (ordering), `blurb`,
and optional `link` (external URL).

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with Hugo
and publishes to GitHub Pages. Custom domain `anupa.ml` is set via `static/CNAME`.
