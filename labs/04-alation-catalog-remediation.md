# Lab 04 — Repair catalog context with AI (Govern it)

**Primary question:** Which catalog entries are broken, sparse, stale, or missing evidence?

**Tool posture:** the full agentic stack — Codex CLI + `AGENTS.md` + a skill + MCP + hooks/rules, and optionally subagents.

**Core deliverable:** a catalog remediation checklist plus proposed, evidence-backed object descriptions.

## Why this lab

This is where the agentic coding stack earns its keep in a realistic governance workflow — without turning into abstract "what is an agent?" theory. The catalog (Alation in our scenario) is a validation aid and documentation surface, not the whole answer. The assistant uses repo evidence (SQL views, stored procedures) to improve what goes into the catalog.

## Scenario

```
Catalog entries
  → identify broken links / sparse descriptions / stale metadata
  → inspect related SQL Server views and stored procedures in the repo
  → infer lineage, transformations, caveats, and owner questions
  → draft catalog-ready documentation (to a local file)
  → flag uncertain items for review
  → propose safe catalog updates (diff first)
```

## Files for this lab

- `demos/alation-cleanup/catalog-entry-before.md` — a sparse/stale entry.
- `demos/alation-cleanup/related-view-definition.sql` — repo evidence.
- `demos/alation-cleanup/catalog-entry-after.md` — the remediated entry.
- Skill: `.agents/skills/alation-doc-cleanup/`
- Template: `templates/catalog-remediation-template.md`

## The agentic stack (what each piece does)

- **`AGENTS.md`** — repo expectations, safe-write rules, documentation standard. The key rule: *never mutate catalog entries without a proposed diff first.*
- **Skill** — `alation-doc-cleanup` packages this task so it is repeatable.
- **MCP** — catalog read/search/update tools (and optionally filesystem/Git tools).
- **Hooks** — block secrets in prompts, validate generated documentation, run a link checker, and **stop if proposed catalog updates lack source evidence**.
- **Rules / permissions** — allow read-only catalog search freely; require approval for catalog writes; block destructive operations.

## The safety mechanism (important)

The catalog write tool is the riskiest action in the whole workshop. The safe pattern, enforced by `AGENTS.md` and the `.codex/` hooks:

1. The assistant reads the catalog entry and the related SQL **read-only**.
2. It drafts the proposed new description to a **local file** (`outputs/catalog-remediation.md`) as a diff.
3. A human reviews the diff against the cited evidence.
4. Only after approval does anyone invoke the MCP catalog **write** tool.

We never rely on a catalog "dry-run" feature; the local-diff-first step is the dry run.

## Optional subagent demo

Spawn three focused reviewers, then consolidate:

1. Broken-link auditor
2. Sparse-documentation reviewer
3. SQL-definition evidence gatherer

→ Consolidate findings into one catalog cleanup plan.

## Watch

The facilitator runs the prompt below on `catalog-entry-before.md` + `related-view-definition.sql`, then shows the drafted diff and the evidence gate.

## Try — prompt pattern

> Review this catalog object and the related SQL files.
>
> Return:
> 1. What documentation is missing or stale
> 2. Evidence from the SQL/view/stored procedure
> 3. Suggested catalog description
> 4. Lineage summary
> 5. Caveats
> 6. Owner questions
> 7. Whether this is safe to update

## Verify

- Every suggested description line is backed by a cited SQL/view reference.
- Uncertain items are flagged as owner questions, not guessed.
- The proposed change exists as a local diff before any write tool is considered.

## Document — deliverable

Fill in `templates/catalog-remediation-template.md` and save to `outputs/catalog-remediation.md`:

```
## Catalog Remediation Note

Object:
Current documentation issue:
Repo evidence reviewed:
Suggested description:
Lineage summary:
Known caveats:
Owner questions:
Safe to update? yes/no/needs review
```
