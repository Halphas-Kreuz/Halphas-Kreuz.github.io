# Win98 Blog (Pure HTML)

## Publish a post (AO3-style, local)

1. Open `tools/editor.html` in a Chromium-based browser (Chrome/Edge).
2. Click **连接仓库目录…** and select this repository folder.
3. Fill in title/date/tags/categories, write rich text, then click **发布（写入仓库）**.
4. `git add -A && git commit && git push`

The publisher writes:

- Posts: `posts/<标题>.html`
- Timeline: `index.html`
- Tags: `tags/index.html` + `tags/<标签>.html`
- Categories: `categories/index.html` + `categories/<分类>.html`

## Live2D (Cubism2)

Put your model under `assets/your_model/` and configure `MODEL_JSON` in `assets/live2d-c2.js`.

