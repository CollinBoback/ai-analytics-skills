# Lab 01 — Workspace setup and context management

**Goal:** get an AI coding assistant running against this repo, reading `AGENTS.md`, with the right amount of autonomy.

This workshop is tool-agnostic. Any of these work:

- **Codex CLI** — a local coding agent that reads, changes, and runs code in a selected directory. Configured via `.codex/` in this repo.
- **Cursor** or **Claude Code** — IDE/CLI assistants that read the workspace and the portable skills in `.agents/skills/`.

## Watch

The facilitator opens this folder in the assistant, points it at `AGENTS.md`, and shows how selected files become context.

## Try

1. **Open the repo** as your working directory (not a single file — the whole folder).
2. **Load the guidance.** Ask your assistant to read `AGENTS.md` and summarize the rules it will follow.
3. **Give it precise context.** Practice the three ways to scope context:
   - Open a file (for example `demos/sql-server-tuning/slow-dashboard-query.sql`).
   - Select a range of lines.
   - Reference a file by name (for example `@AGENTS.md`).
4. **Pick an autonomy level** for the labs:
   - **Chat / planning only** — the assistant explains and proposes, but does not edit.
   - **Agent / local edits** — the assistant can create artifacts in `outputs/` (recommended for these labs).
   - **Full access** — avoid for shared systems; never point write-access at a production catalog or database.

> Recommendation: use **Agent / local edits** so you can produce artifacts, but keep all writes inside this repo.

## Verify

Ask the assistant:

> "Read the repo guidance and tell me which files define the workshop rules, where the demo data lives, and which output templates exist. Do not edit anything yet."

A good answer cites `AGENTS.md`, the `demos/` subfolders, and the `templates/` files — and distinguishes what it confirmed from what it inferred.

## Document

Create `outputs/workspace-notes.md` with: which tool you used, the autonomy level you chose, and the context-scoping method that worked best for you. You will reuse these habits in every lab.

> `outputs/` is git-ignored. It is your scratch space for lab artifacts.
