// Generator for the AI Analytics Skills workshop deck.
// The OUTPUT .pptx is the source of truth; edit this script and rebuild to iterate.
//   npm run build   ->   ai-analytics-skills-workshop.pptx
import pptxgen from "pptxgenjs";

const OUT = "ai-analytics-skills-workshop.pptx";

// ---- Palette: "data trust" — deep navy ink, teal primary, mint highlight -----
const C = {
  ink: "0B1B2B", // dark slide background
  inkCard: "12304D", // card on dark
  teal: "0E7490", // primary accent
  tealTint: "E7F2F4", // light teal fill (callouts/loop)
  mint: "5EEAD4", // bright accent on dark
  iceText: "C7D7EC", // soft text on dark
  light: "F4F7FB", // light slide background
  white: "FFFFFF",
  body: "1E293B", // body text on light
  slate: "64748B", // muted captions
  line: "E2E8F0", // hairline / card border
  codeText: "D7E3EC", // text inside dark code cards
  good: "0E7C66", // green-ish for "prefer"
  goodTint: "E7F4EF",
  warn: "B4453A", // red-ish for "never"
  warnTint: "F6E9E7",
};
const FONT_H = "Georgia";
const FONT_B = "Arial";
const FONT_M = "Courier New";

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "AI Analytics Skills workshop";
pres.title = "AI Analytics Skills for BI Analysts";

const W = 10;
const H = 5.625;

const softShadow = () => ({ type: "outer", color: "0B1B2B", blur: 8, offset: 3, angle: 135, opacity: 0.12 });

function pill(slide, text, x, y, { fill = C.teal, color = C.white, fontSize = 10 } = {}) {
  const w = Math.max(0.74, text.length * 0.078 + 0.42);
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, fill: { color: fill }, rectRadius: 0.17 });
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.34, fontFace: FONT_B, fontSize, bold: true, color,
    align: "center", valign: "middle", charSpacing: 1, margin: 0,
  });
  return w;
}

function pillRow(slide, items, x, y, maxRight, { fill = C.tealTint, color = C.teal } = {}) {
  let cx = x, cy = y;
  for (const t of items) {
    const w = Math.max(0.74, t.length * 0.075 + 0.4);
    if (cx + w > maxRight) { cx = x; cy += 0.5; }
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w, h: 0.38, fill: { color: fill }, line: { color: C.teal, width: 1 }, rectRadius: 0.19 });
    slide.addText(t, { x: cx, y: cy, w, h: 0.38, fontFace: FONT_B, fontSize: 10.5, bold: true, color, align: "center", valign: "middle", margin: 0 });
    cx += w + 0.16;
  }
  return cy + 0.5;
}

function circle(slide, x, y, d, label, { fill = C.teal, color = C.white, fontSize = 15 } = {}) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: softShadow() });
  slide.addText(String(label), { x, y, w: d, h: d, fontFace: FONT_B, fontSize, bold: true, color, align: "center", valign: "middle", margin: 0 });
}

function card(slide, x, y, w, h, { fill = C.white, radius = 0.09, border = true } = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fill }, rectRadius: radius,
    ...(border ? { line: { color: C.line, width: 1 } } : {}),
    shadow: softShadow(),
  });
}

function bulletList(slide, items, x, y, w, h, { color = C.body, fontSize = 13, space = 8 } = {}) {
  slide.addText(
    items.map((t) => ({ text: t, options: { bullet: { indent: 16 }, breakLine: true, paraSpaceAfter: space } })),
    { x, y, w, h, fontFace: FONT_B, fontSize, color, valign: "top", margin: 0 }
  );
}

function codeCard(slide, x, y, w, h, lines, { title } = {}) {
  card(slide, x, y, w, h, { fill: C.ink, border: false, radius: 0.08 });
  let ty = y + 0.2;
  if (title) {
    slide.addText(title, { x: x + 0.28, y: y + 0.16, w: w - 0.56, h: 0.3, fontFace: FONT_B, fontSize: 10, bold: true, color: C.mint, margin: 0, charSpacing: 1 });
    ty = y + 0.56;
  }
  slide.addText(
    lines.map((l) => ({ text: l, options: { breakLine: true } })),
    { x: x + 0.28, y: ty, w: w - 0.56, h: h - (ty - y) - 0.18, fontFace: FONT_M, fontSize: 11, color: C.codeText, valign: "top", margin: 0, lineSpacingMultiple: 1.18 }
  );
}

function footer(slide, page) {
  slide.addText("AI Analytics Skills for BI Analysts", { x: 0.6, y: 5.24, w: 6, h: 0.28, fontFace: FONT_B, fontSize: 9, color: C.slate, margin: 0, valign: "middle" });
  slide.addText(`${String(page).padStart(2, "0")} / 12`, { x: 8.0, y: 5.24, w: 1.4, h: 0.28, fontFace: FONT_B, fontSize: 9, bold: true, color: C.teal, align: "right", margin: 0, valign: "middle" });
}

function contentHeader(slide, { tag, title, subtitle, page }) {
  slide.background = { color: C.light };
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.16, h: H, fill: { color: C.teal } });
  pill(slide, tag, 0.6, 0.42);
  slide.addText(title, { x: 0.6, y: 0.84, w: 8.9, h: 0.66, fontFace: FONT_H, fontSize: 27, bold: true, color: C.ink, margin: 0, valign: "middle" });
  let top = 1.7;
  if (subtitle) {
    slide.addText(subtitle, { x: 0.6, y: 1.52, w: 8.9, h: 0.4, fontFace: FONT_B, fontSize: 13, italic: true, color: C.slate, margin: 0, valign: "middle" });
    top = 2.05;
  }
  footer(slide, page);
  return top;
}

// Left text block with a small accent circle marker (used on lab slides)
function markerBlock(slide, x, y, w, label, desc, { mark = "", markFill = C.teal } = {}) {
  const d = 0.42;
  circle(slide, x, y, d, mark, { fill: markFill, fontSize: 13 });
  slide.addText(label, { x: x + d + 0.18, y: y - 0.02, w: w - d - 0.18, h: 0.32, fontFace: FONT_B, fontSize: 13.5, bold: true, color: C.ink, margin: 0, valign: "middle" });
  slide.addText(desc, { x: x + d + 0.18, y: y + 0.3, w: w - d - 0.18, h: 0.55, fontFace: FONT_B, fontSize: 11.5, color: C.slate, margin: 0, valign: "top" });
}

// ============================================================ SLIDE 1 — TITLE
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.16, h: H, fill: { color: C.teal } });

  pill(s, "Workshop", 0.7, 0.7, { fill: C.teal });
  s.addText("AI Analytics Skills\nfor BI Analysts", { x: 0.7, y: 1.2, w: 5.2, h: 1.7, fontFace: FONT_H, fontSize: 36, bold: true, color: C.white, margin: 0, lineSpacingMultiple: 1.02 });
  s.addText("Trace lineage, tune SQL, repair catalog context, and verify every AI-assisted answer before it reaches a dashboard.",
    { x: 0.7, y: 3.05, w: 5.1, h: 1.0, fontFace: FONT_B, fontSize: 14.5, color: C.iceText, margin: 0, lineSpacingMultiple: 1.1 });
  s.addText("FOR BI ANALYSTS · ANALYTICS ENGINEERS · DASHBOARD OWNERS",
    { x: 0.7, y: 4.15, w: 5.2, h: 0.3, fontFace: FONT_B, fontSize: 10, bold: true, color: C.mint, charSpacing: 1, margin: 0 });
  s.addText("Repo-centered workshop · the repository is the product",
    { x: 0.7, y: 5.15, w: 5.2, h: 0.3, fontFace: FONT_B, fontSize: 9, color: "7C93AC", margin: 0 });

  const arc = [
    ["Find it", "Tableau lineage"],
    ["Tune it", "SQL Server triage"],
    ["Govern it", "Alation remediation"],
    ["Prove it", "KPI reconciliation (optional)"],
  ];
  let cy = 0.95;
  arc.forEach((a, i) => {
    card(s, 6.15, cy, 3.25, 0.82, { fill: C.inkCard, border: false });
    circle(s, 6.36, cy + 0.16, 0.5, i + 1, { fill: C.teal, fontSize: 16 });
    s.addText(a[0], { x: 7.02, y: cy + 0.13, w: 2.25, h: 0.3, fontFace: FONT_B, fontSize: 14, bold: true, color: C.white, margin: 0, valign: "middle" });
    s.addText(a[1], { x: 7.02, y: cy + 0.43, w: 2.25, h: 0.3, fontFace: FONT_B, fontSize: 10.5, color: C.iceText, margin: 0, valign: "middle" });
    cy += 0.94;
  });
}

// ====================================================== SLIDE 2 — NOT PROMPTING
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Positioning", title: "This is not prompt training", subtitle: "A chatbot answers from what you paste. A workspace assistant reasons across your project.", page: 2 });
  s.addText([
    { text: "We are not teaching people to prompt a chatbot. ", options: { color: C.body } },
    { text: "We are teaching people to package repeatable analytics work as context-aware, tool-using, reviewable AI workflows.", options: { bold: true, color: C.ink } },
  ], { x: 0.6, y: top, w: 8.9, h: 0.9, fontFace: FONT_B, fontSize: 15, valign: "top", margin: 0, lineSpacingMultiple: 1.1 });

  card(s, 0.6, top + 0.95, 8.9, 1.0, { fill: C.tealTint, border: false });
  s.addText("An assistant inside a BI workspace can read Tableau XML, SQL files, stored procedures, view and metric definitions, catalog docs, templates, and validation artifacts — and cite the evidence it used.",
    { x: 0.95, y: top + 1.06, w: 8.2, h: 0.8, fontFace: FONT_B, fontSize: 13.5, color: C.ink, valign: "middle", margin: 0, lineSpacingMultiple: 1.08 });

  pillRow(s, ["Multi-file context", "Repo-aware reasoning", "Tool / catalog access", "Evidence-backed artifacts", "Reviewable output"], 0.6, top + 2.15, 9.45);
}

// ================================================ SLIDE 3 — CHATBOT VS ASSISTANT
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Framing", title: "Chatbot vs BI workspace assistant", page: 3 });
  const colW = 4.15, colH = 3.05, yy = top + 0.05;

  // Left — chatbot (muted)
  card(s, 0.6, yy, colW, colH, { fill: C.white });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: yy, w: colW, h: 0.52, fill: { color: "475569" }, rectRadius: 0.09 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: yy + 0.26, w: colW, h: 0.26, fill: { color: "475569" } });
  s.addText("Chatbot", { x: 0.6, y: yy, w: colW, h: 0.52, fontFace: FONT_B, fontSize: 15, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  bulletList(s, ["Context = only what you paste", "You supply evidence manually", "No tools", "Output is text", "Safety is up to you"], 0.95, yy + 0.72, colW - 0.6, colH - 0.85, { color: C.slate, fontSize: 12.5, space: 9 });

  // Right — workspace assistant (highlighted)
  const rx = 0.6 + colW + 0.45;
  card(s, rx, yy, colW, colH, { fill: C.white, border: false });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: yy, w: colW, h: colH, fill: { color: C.white }, line: { color: C.teal, width: 2 }, rectRadius: 0.09 });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx, y: yy, w: colW, h: 0.52, fill: { color: C.teal }, rectRadius: 0.09 });
  s.addShape(pres.shapes.RECTANGLE, { x: rx, y: yy + 0.26, w: colW, h: 0.26, fill: { color: C.teal } });
  s.addText("Workspace assistant", { x: rx, y: yy, w: colW, h: 0.52, fontFace: FONT_B, fontSize: 15, bold: true, color: C.white, align: "center", valign: "middle", margin: 0 });
  bulletList(s, ["Context = the actual repo files", "Cites files and lines it read", "Catalog / search / filesystem via MCP", "Output is reviewable artifacts", "Safety enforced by AGENTS.md + hooks"], rx + 0.35, yy + 0.72, colW - 0.6, colH - 0.85, { color: C.body, fontSize: 12.5, space: 9 });
}

// =================================================== SLIDE 4 — MINDSET / LOOP
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Mindset", title: "The AI analytics engineer mindset", subtitle: "Every lab repeats the same loop.", page: 4 });

  card(s, 0.6, top, 8.9, 1.45, { fill: C.tealTint, border: false });
  s.addText([
    { text: "Open context   →   ask with constraints   →   inspect evidence", options: { breakLine: true } },
    { text: "→   propose a change or artifact   →   validate   →   communicate caveats", options: {} },
  ], { x: 0.8, y: top + 0.1, w: 8.5, h: 1.25, fontFace: FONT_B, fontSize: 16, bold: true, color: C.teal, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.35 });

  card(s, 0.6, top + 1.65, 8.9, 1.1, { fill: C.white });
  s.addText([
    { text: "AI is not valuable because it writes more content. ", options: { color: C.body } },
    { text: "It is valuable because it helps you structure the work, inspect evidence, reduce blind spots, and create artifacts a human can review.", options: { bold: true, color: C.ink } },
  ], { x: 0.95, y: top + 1.76, w: 8.2, h: 0.9, fontFace: FONT_B, fontSize: 13.5, valign: "middle", margin: 0, lineSpacingMultiple: 1.1 });
}

// =================================================== SLIDE 5 — DATA SAFETY
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Safety", title: "Data safety and approved context", subtitle: "One public-safe repo for both internal and external runs.", page: 5 });
  const colW = 4.15, colH = 2.55, yy = top + 0.05;

  card(s, 0.6, yy, colW, colH, { fill: C.warnTint, border: false });
  s.addText("Never include", { x: 0.9, y: yy + 0.18, w: colW - 0.6, h: 0.35, fontFace: FONT_B, fontSize: 14, bold: true, color: C.warn, margin: 0 });
  bulletList(s, ["PII, credentials, secrets", "Production extracts", "Real server / DB / table / owner names", "Real catalog URLs or proprietary terms"], 0.9, yy + 0.66, colW - 0.55, colH - 0.8, { color: C.body, fontSize: 12.5, space: 8 });

  const rx = 0.6 + colW + 0.45;
  card(s, rx, yy, colW, colH, { fill: C.goodTint, border: false });
  s.addText("Prefer instead", { x: rx + 0.3, y: yy + 0.18, w: colW - 0.6, h: 0.35, fontFace: FONT_B, fontSize: 14, bold: true, color: C.good, margin: 0 });
  bulletList(s, ["Masked / invented samples", "Schemas, row counts, summaries", "Generic finance domain names", "Legacy ERP / new ERP platform (generic)"], rx + 0.3, yy + 0.66, colW - 0.55, colH - 0.8, { color: C.body, fontSize: 12.5, space: 8 });
}

// =================================================== SLIDE 6 — REPO TOUR
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Orientation", title: "Repo tour", subtitle: "The repository is the durable product; the app is an optional wrapper.", page: 6 });
  codeCard(s, 0.6, top, 8.9, 2.85, [
    "ai-analytics-skills/",
    "  AGENTS.md          # rules your assistant follows",
    "  labs/              # the workshop labs (start at 00-kickoff.md)",
    "  demos/             # sanitized demo files for each lab",
    "  templates/         # output templates + Mermaid standard",
    "  .agents/skills/    # reusable skill packages (portable)",
    "  .codex/            # Codex config, hooks, rules",
    "  evals/             # eval cases for the skills",
    "  docs/              # facilitator guide, data handling",
    "  src/               # optional React app (deck + repo browser)",
  ], { title: "repository layout" });
}

// ---- Lab slide builder (slides 7–10) ----------------------------------------
function labSlide({ page, tag, title, question, markers, promptTitle, promptLines }) {
  const s = pres.addSlide();
  const top = contentHeader(s, { tag, title, subtitle: question, page });
  const leftX = 0.6, leftW = 4.0;
  let my = top + 0.08;
  markers.forEach((m) => {
    markerBlock(s, leftX, my, leftW, m.label, m.desc, { mark: m.mark, markFill: m.fill || C.teal });
    my += 0.98;
  });
  codeCard(s, 5.0, top + 0.05, 4.45, 2.82, promptLines, { title: promptTitle });
  return s;
}

// SLIDE 7 — LAB 1
labSlide({
  page: 7, tag: "Lab 1 · Find it", title: "Trace Tableau lineage", question: "What does this dashboard depend on?",
  markers: [
    { mark: "?", label: "Primary question", desc: "What does this Tableau dashboard depend on?" },
    { mark: "✓", label: "Deliverable", desc: "Lineage doc + Mermaid diagram + source inventory" },
    { mark: "!", label: "Key discipline", desc: "Separate confirmed from inferred; unknowns become owner questions." },
  ],
  promptTitle: "prompt pattern",
  promptLines: [
    "Trace each custom SQL block to",
    "its source objects. Return:",
    "1. Data sources",
    "2. Custom SQL blocks",
    "3. Referenced views / procs",
    "4. Upstream tables / linked servers",
    "5. Confirmed vs inferred lineage",
    "6. Unknowns for owner review",
    "7. Mermaid data-flow diagram",
  ],
});

// SLIDE 8 — LAB 2
labSlide({
  page: 8, tag: "Lab 2 · Tune it", title: "Triage SQL Server performance safely", question: "Why is this slow, and what is the smallest safe fix?",
  markers: [
    { mark: "✕", label: "Guardrails", desc: "Don't change logic or grain; don't add indexes; validate rows and totals.", fill: C.warn },
    { mark: "1", label: "Phase 1 — diagnose", desc: "Explain risks; do not rewrite yet. Collect baseline evidence." },
    { mark: "2", label: "Phase 2 — rewrite", desc: "Smallest safe change + a validation query that proves equivalence." },
  ],
  promptTitle: "two-phase prompt",
  promptLines: [
    "// Phase 1: diagnose",
    "1. What the query does",
    "2. Likely performance risks",
    "3. Safe-for-analyst fixes",
    "4. DBA / data-eng review items",
    "5. Baseline to collect first",
    "",
    "// Phase 2: smallest safe rewrite",
    "Preserve grain, rows, totals.",
    "Include a validation query.",
  ],
});

// SLIDE 9 — LAB 3
labSlide({
  page: 9, tag: "Lab 3 · Govern it", title: "Repair catalog context with AI", question: "The full agentic stack — with a safe-write contract.",
  markers: [
    { mark: "▣", label: "The stack", desc: "AGENTS.md + skill + MCP + hooks + rules (read free, writes gated)." },
    { mark: "◇", label: "Safe-write contract", desc: "Read-only, then draft a local diff, human review, then write." },
    { mark: "✓", label: "Non-negotiable", desc: "The local diff is the dry run — no write without cited evidence." },
  ],
  promptTitle: "safe-write contract",
  promptLines: [
    "1. Read catalog + SQL read-only",
    "2. Draft the change to a",
    "   local diff (outputs/)",
    "3. Human reviews vs evidence",
    "4. Only then call the write tool",
    "",
    "allow:    read-only search",
    "approval: catalog writes",
    "block:    destructive ops",
  ],
});

// SLIDE 10 — LAB 4
labSlide({
  page: 10, tag: "Lab 4 · Prove it (optional)", title: "Prove the KPI still reconciles", question: "Did the metric survive a source / platform change?",
  markers: [
    { mark: "λ", label: "LLM drafts the spec", desc: "An enterprise LLM API proposes a structured validation spec." },
    { mark: "π", label: "Python scores it", desc: "Deterministic checks: same inputs, same verdict — every time." },
    { mark: "=", label: "Determinism contract", desc: "Thresholds live in the spec; the LLM never decides pass/fail." },
  ],
  promptTitle: "outputs/",
  promptLines: [
    "validation_spec.json",
    "reconciliation_results.csv",
    "failed_checks.csv",
    "validation_report.md",
    "catalog_doc_patch.md",
    "",
    "# borrow: dbt-audit-helper,",
    "# Great Expectations, dbt-codegen",
  ],
});

// =================================================== SLIDE 11 — VERIFICATION
{
  const s = pres.addSlide();
  const top = contentHeader(s, { tag: "Verify", title: "Verification checklist", subtitle: "The analyst remains accountable for the claim.", page: 11 });
  const diamond = [
    ["Metric", "Accurate to the business?"],
    ["Data", "Right grain and scope?"],
    ["SQL", "Joins fan out? Filters applied?"],
    ["Story", "Supported strictly by evidence?"],
  ];
  const cw = 2.07, gap = 0.18, x0 = 0.6, yy = top + 0.02, ch = 1.25;
  diamond.forEach((d, i) => {
    const cx = x0 + i * (cw + gap);
    card(s, cx, yy, cw, ch, { fill: C.white });
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: yy + 0.18, w: cw, h: 0.03, fill: { color: C.teal } });
    s.addText(d[0], { x: cx, y: yy + 0.28, w: cw, h: 0.35, fontFace: FONT_B, fontSize: 15, bold: true, color: C.teal, align: "center", margin: 0 });
    s.addText(d[1], { x: cx + 0.12, y: yy + 0.66, w: cw - 0.24, h: 0.5, fontFace: FONT_B, fontSize: 11, color: C.slate, align: "center", valign: "top", margin: 0 });
  });
  codeCard(s, 0.6, yy + ch + 0.22, 8.9, 1.1, [
    "Before I use this answer, list every assumption, source file,",
    "query, unresolved risk, and manual check. Separate what",
    "you confirmed from what you inferred.",
  ], { title: "the reviewer prompt" });
}

// =================================================== SLIDE 12 — CLOSING
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.12, fill: { color: C.teal } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: H - 0.12, w: W, h: 0.12, fill: { color: C.teal } });
  pill(s, "Continue", 4.4, 0.95, { fill: C.teal });
  s.addText("Make it a habit", { x: 1, y: 1.5, w: 8, h: 0.9, fontFace: FONT_H, fontSize: 34, bold: true, color: C.white, align: "center", margin: 0 });
  s.addText("Copy the skills into your own repo, add a root AGENTS.md, keep writes gated behind approval, and run the verification checklist on real work.",
    { x: 1.6, y: 2.5, w: 6.8, h: 1.0, fontFace: FONT_B, fontSize: 15, color: C.iceText, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
  const chips = ["Adopt the loop", "Reuse the skills", "Safe by default", "Eval in CI"];
  let cx = 1.55;
  const total = chips.reduce((a, t) => a + Math.max(1.4, t.length * 0.085 + 0.6) + 0.2, 0) - 0.2;
  cx = (W - total) / 2;
  chips.forEach((t) => {
    const w = Math.max(1.4, t.length * 0.085 + 0.6);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 3.7, w, h: 0.5, fill: { color: C.inkCard }, line: { color: "2A4A6B", width: 1 }, rectRadius: 0.25 });
    s.addText(t, { x: cx, y: 3.7, w, h: 0.5, fontFace: FONT_B, fontSize: 12, bold: true, color: C.mint, align: "center", valign: "middle", margin: 0 });
    cx += w + 0.2;
  });
  s.addText("docs/next-steps.md  ·  labs/06-verification-checklist.md", { x: 1, y: 4.7, w: 8, h: 0.3, fontFace: FONT_M, fontSize: 11, color: "7C93AC", align: "center", margin: 0 });
}

await pres.writeFile({ fileName: OUT });
console.log("Wrote", OUT);
