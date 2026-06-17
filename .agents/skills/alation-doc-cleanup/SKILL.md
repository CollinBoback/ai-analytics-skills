---
name: alation-doc-cleanup
description: Use when a data catalog (Alation or similar) has broken links, sparse descriptions, stale metadata, or missing evidence and you need to draft evidence-backed remediation from repo SQL. Always drafts a proposed diff to a local file for human review before any catalog write tool runs; read-only catalog search is free, writes require approval.
---

# Alation catalog doc cleanup

Improve catalog entries using repo evidence (views, stored procedures, SQL), and prepare safe, reviewable updates. The catalog is a documentation surface, not the source of truth — the repo SQL is the evidence.

## When to use

- "Which catalog entries are broken/sparse/stale?"
- "Write a better description for this object."
- "Document this object's lineage and caveats from the SQL."

## The safety contract (non-negotiable)

1. **Read-only first.** Search/read the catalog and related SQL freely.
2. **Draft to a local file.** Write the proposed new description as a diff in `outputs/catalog-remediation.md`. This local diff is the dry run.
3. **Human review.** A person checks each suggested line against its cited evidence.
4. **Approved writes only.** Only after approval does anyone call the catalog MCP **write** tool. Never mutate an entry without a proposed diff first.

Destructive operations are blocked. Missing-evidence proposals are blocked (see the evidence hook in `.codex/hooks.json`).

## Procedure

1. **Audit.** Identify the issue type: broken link, sparse description, stale metadata, or missing evidence. Log broken links to `assets/broken_link_report_template.md`.
2. **Gather evidence.** Read the related view/procedure definitions; extract what the object actually contains, its transformations, and its grain.
3. **Draft.** Fill `assets/catalog_doc_template.md`: suggested description, lineage summary, caveats, owner questions.
4. **Score quality.** Rate the drafted entry against `references/catalog_quality_rubric.md`.
5. **Decide.** Mark `Safe to update? yes / no / needs review`. "Needs review" is the default when any line lacks evidence.

## Optional subagent split

- Broken-link auditor → produces the broken-link report.
- Sparse-documentation reviewer → ranks entries by missing fields.
- SQL-definition evidence gatherer → collects definitions for cited objects.

Consolidate into one catalog cleanup plan.

## Output

- `outputs/catalog-remediation.md` — the proposed diff (from `assets/catalog_doc_template.md`).
- `outputs/broken-links.md` — from `assets/broken_link_report_template.md`.
