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

## Writing & publishing with Obsidian

This repo doubles as an Obsidian vault. Write posts as Markdown, paste images, and
publish with one hotkey.

### One-time setup
1. Install [Obsidian](https://obsidian.md). Open this folder as a vault.
2. Settings → Community plugins → enable, then install: **Obsidian Git** and **Templater**.
3. Settings → Files & Links:
   - "Default location for new attachments" → **Same folder as current file**
   - "Use [[Wikilinks]]" → **Off**
   - "New link format" → **Relative path to file**
4. Templater settings: set the template folder to `_templates`. Add a hotkey for
   "Templater: Create new note from template" (then pick `new-post`), or bind the
   `new-post` template to its own hotkey.
5. Obsidian Git settings: bind a hotkey to **"Commit-and-sync"** (commit all + push).

### Writing a post
1. Run the new-post hotkey, type the title → it creates
   `content/writing/<slug>/index.md` with front matter (`draft: true`, `math: true`).
2. Write. LaTeX uses `$…$` (inline) and `$$…$$` (block). Paste images — they land in the
   post's folder and embed as `![](image.png)`.
3. When ready, set `draft: false`.
4. Hit the commit-and-sync hotkey. GitHub Actions deploys to anupa.ml in ~1–2 minutes.

Drafts (`draft: true`) never appear on the live site, so a push can't reveal an
unfinished post. The homepage intro is `content/_index.md`; the About page is
`content/about/index.md` — edit and publish them the same way.

### Changing site "chrome" (rare — edit `hugo.toml` directly)
- **Your name in the header / copyright:** `title`
- **Nav labels** (writing / projects / about): the `[[menu.main]]` entries
- **Footer links:** the `[[params.social]]` entries
- **Tagline / SEO description:** `params.description`
