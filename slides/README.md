# Slides

The workshop deck is a physical PowerPoint file: [`ai-analytics-skills-workshop.pptx`](./ai-analytics-skills-workshop.pptx). That `.pptx` is the **source of truth** for facilitation — present it directly from PowerPoint, Keynote, or LibreOffice Impress.

The deck is generated from code (`build-deck.mjs` using [`pptxgenjs`](https://gitbrent.github.io/PptxGenJS/)) so it stays in sync with the repo (same examples, same prompts) and uses a consistent "data trust" palette (navy ink + teal + mint, Georgia/Arial).

The React app under [`src/data/slides.tsx`](../src/data/slides.tsx) is an optional in-browser preview, not the live deck.

## Build

```bash
cd slides
npm install
npm run build   # writes ai-analytics-skills-workshop.pptx
```

## Render previews for visual QA

```bash
# macOS
/Applications/LibreOffice.app/Contents/MacOS/soffice \
  -env:UserInstallation=file://$PWD/.render/profile \
  --headless --convert-to pdf --outdir .render \
  ai-analytics-skills-workshop.pptx

# Linux (Debian/Ubuntu): apt install libreoffice-impress poppler-utils
soffice -env:UserInstallation=file://$PWD/.render/profile \
  --headless --convert-to pdf --outdir .render \
  ai-analytics-skills-workshop.pptx

pdftoppm -jpeg -r 150 .render/ai-analytics-skills-workshop.pdf .render/slide
```

The `.render/` directory is gitignored — it is local scratch space for QA.

## Outline (12 slides)

1. Title — AI Analytics Skills for BI Analysts
2. Why this is not prompt training
3. Chatbot vs BI workspace assistant
4. The AI analytics engineer mindset (the loop)
5. Data safety and approved context
6. Repo tour: README, AGENTS.md, labs, demos, templates
7. Lab 1 — Find it: Tableau lineage
8. Lab 2 — Tune it: SQL Server performance triage
9. Lab 3 — Govern it: Alation catalog remediation
10. Optional Lab 4 — Prove it: KPI reconciliation
11. Verification checklist
12. How to continue after the workshop

## Backbone

The deck frames the "why" and paces the session; the repository is the durable product. See [`docs/facilitator-guide.md`](../docs/facilitator-guide.md) for timing.
