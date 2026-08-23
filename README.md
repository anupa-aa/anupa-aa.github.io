# anupa.ml

Personal blog + portfolio. Hugo static site with a custom theme (`themes/linen`).

## Develop

```bash
hugo server        # live preview at http://localhost:1313
```

## Add a post

Use the Obsidian workflow (below), or scaffold one from the terminal:

```bash
hugo new content writing/<slug>/index.md   # page bundle, from archetypes/writing.md
```

This creates `content/writing/<slug>/index.md` with front matter (`draft: true`,
`math: true`). Drop images in the same folder and reference them as `![alt](image.png)`.

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

### Writing maths

Two local plugins (source in `~/Documents/obsidian-plugins`, built into
`.obsidian/plugins/`) cover the two annoying parts of writing maths here.

**Symbols** — type `:` and a name to get a dropdown, arrow keys to choose, Enter
to insert:

```
:delta      →  δ  Δ  ∂  ∇
:grad       →  ∇
:approx     →  ≈
:expected value →  𝔼
```

Matching covers plain English as well as the symbol's own name, so `:gradient`,
`:nabla` and `:grad` all land on the same character. It remembers which variant
you pick for a given query and floats that one to the top next time. In prose it
inserts the Unicode character; inside `$…$` it inserts `\delta` instead.

**Equations** — type `:"` then describe what you want in English and press Enter:

```
:"adamw update rule
:"cross entropy loss for multiclass
:"the softmax function
```

The description goes to the `claude` CLI (your normal Claude Code login, no API
key) and comes back as LaTeX, wrapped in `$…$` or `$$…$$` — the dropdown offers
both. Takes 3-5 seconds; repeats of the same description are cached and instant.
The plugin sets `math: true` in the front matter so KaTeX loads on the page.

Rebuild after changing either plugin:

```bash
cd ~/Documents/obsidian-plugins && npm run build
```

Then run **Reload app without saving** from the Obsidian command palette.

Drafts (`draft: true`) never appear on the live site, so a push can't reveal an
unfinished post. The homepage intro is `content/_index.md`; the About page is
`content/about/index.md` — edit and publish them the same way.

### Changing site "chrome" (rare — edit `hugo.toml` directly)
- **Your name in the header / copyright:** `title`
- **Nav labels** (writing / projects / about): the `[[menu.main]]` entries
- **Footer links:** the `[[params.social]]` entries
- **Tagline / SEO description:** `params.description`
