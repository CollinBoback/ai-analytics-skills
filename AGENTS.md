# Agent Instructions

This file tells any AI coding assistant (Codex CLI, Cursor, Claude Code, or similar) how to work inside this repository. Read it before acting on any lab. It turns this repo from a pile of files into an AI-ready workspace.

## General
- Be evidence-first.
- Do not invent lineage.
- Cite files and line references when possible.
- Separate confirmed facts from assumptions.
- Prefer minimal changes.
- Preserve business logic unless explicitly asked.

## SQL
- Preserve output grain.
- Do not change filters without calling it out.
- Avoid rewriting entire stored procedures unless necessary.
- Generate validation queries.
- Explain performance changes in terms of reads, joins, filters, and row counts.

## Documentation
- Use the standard templates in `templates/`.
- Include owners, caveats, unresolved questions, and review status.
- Use Mermaid for diagrams, following `templates/mermaid-data-flow-standard.md`.

## Catalog updates
- Never mutate production catalog entries without a proposed diff first.
- Draft every proposed change to a local file for human review before any write tool runs.
- Include source evidence for every suggested description.
- Flag owner questions instead of guessing.

## Data safety
- Do not expose PII, credentials, secrets, or production extracts.
- Use schemas, masked samples, row counts, and summaries where possible.
- This is a public-safe repository: never introduce real server names, database names, linked servers, owners, or proprietary terms.

## Working agreement for labs
- One step at a time. Show the move, let the participant try it, verify against evidence, then produce a small artifact.
- When asked for an analysis, return: what you are confident about, what you inferred, and what needs an owner's review.
- Stop and ask before any action that writes to a shared system (catalog, database, shared stored procedure).

## Cursor Cloud specific instructions
- The only runnable code is the optional React/Vite presentation app under `src/`; the durable product is the markdown labs/demos/templates, which need no services. Standard commands live in `README.md` and `package.json` (`npm run dev` on port `3000`, `npm run lint` = `tsc --noEmit`). There are no automated tests.
- No backend, database, or API keys are needed to run anything. The `@google/genai`, `express`, and `dotenv` dependencies and the `GEMINI_API_KEY`/`APP_URL` entries in `.env.example` are vestigial AI Studio scaffolding — they are not imported anywhere in `src/`, so leave `.env` unset.
- `npm run dev` serves on `0.0.0.0:3000`; if 3000 is taken (e.g. the `skill-bank` docs server) Vite does not auto-fallback here, so free the port or change `--port` rather than expecting a different port.
