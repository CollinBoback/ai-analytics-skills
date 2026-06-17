# AI Analytics Skills for BI Analysts

> Trace lineage, tune SQL, repair catalog context, and verify every AI-assisted answer before it reaches a dashboard.

This repository is a hands-on, repo-centered workshop that teaches BI analysts, analytics engineers, data analysts, and dashboard owners how to use AI coding assistants responsibly in real analytics workflows.

This is **not** a "how to prompt ChatGPT" workshop. A chatbot can only answer from what you paste into it. An AI coding assistant working inside a BI workspace can reason across your actual project context: Tableau workbook XML, SQL files, stored procedures, view definitions, metric definitions, catalog docs, templates, and validation artifacts.

**North-star message:** We are not teaching people to prompt a chatbot. We are teaching people to package repeatable analytics work as context-aware, tool-using, reviewable AI workflows.

## The core loop

Every lab teaches the same loop:

```
Open context → ask with constraints → inspect evidence → propose a change or artifact → validate → communicate caveats
```

AI is not valuable because it writes more content. It is valuable because it helps analysts structure the work, inspect evidence, reduce blind spots, and create artifacts humans can review.

## Lab arc

| Lab | Title | Primary question | Core deliverable |
| --- | --- | --- | --- |
| 1 — Find it | Trace Tableau lineage with workspace context | What does this dashboard depend on? | Lineage doc + Mermaid diagram + source inventory |
| 2 — Tune it | Triage SQL Server performance safely | Why is this slow, and what is the smallest safe fix? | Performance review note + before/after validation |
| 3 — Govern it | Repair catalog context with AI | Which catalog entries are broken, sparse, or stale? | Catalog remediation checklist + proposed descriptions |
| 4 — Prove it (optional) | Prove the KPI still reconciles | Did the metric survive a source change? | Validation packet + reconciliation report |

## Repository structure

```
ai-analytics-skills/
  AGENTS.md                  # Agent instructions read by your AI assistant
  labs/                      # The workshop labs (start here)
  demos/                     # Sanitized demo files used by each lab
  templates/                 # Output templates + Mermaid standard
  .agents/skills/            # Reusable skill packages (portable across tools)
  .codex/                    # Codex CLI config, hooks, and rules
  evals/                     # Eval cases for the reusable skills
  docs/                      # Facilitator guide, data handling, troubleshooting
  slides/                    # Notes on the presentation deck
  src/                       # Optional React app: deck + repo browser + console
```

The repository is the durable product. The presentation app is an optional wrapper for live pacing.

## How to use this repo (with an AI coding assistant)

1. Open this folder in your AI-enabled editor or CLI (Codex CLI, Cursor, Claude Code, or similar).
2. Make sure your assistant reads [`AGENTS.md`](AGENTS.md) — it sets the evidence-first, safe-write rules for the whole repo.
3. Start with [`labs/00-kickoff.md`](labs/00-kickoff.md) and work through the labs in order.
4. Each lab points to sanitized files in `demos/`, a reusable skill in `.agents/skills/`, and an output template in `templates/`.

## Run the optional presentation app

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # serves the deck + repo browser + facilitator console on :3000
npm run lint     # type-check (tsc --noEmit)
```

The app has three tabs: **Presentation** (the deck), **Repository** (a browser over the real files in this repo), and **Facilitator Console** (live pacing prompts).

## Data safety

This is a **public-safe** repository. All examples use sanitized, structurally realistic data — generic finance tables, masked samples, and invented object names. Do not add credentials, secrets, PII, production extracts, real server/database names, or proprietary architecture details. See [`docs/data-handling.md`](docs/data-handling.md).
