---
name: tableau-lineage-documenter
description: Use when asked to trace a Tableau dashboard's data lineage, map a .twb/.twbx workbook to its SQL Server views, stored procedures, and upstream tables, or document dashboard dependencies during a source/platform migration. Produces a standardized lineage doc, a Mermaid data-flow diagram, and a source-object inventory.
---

# Tableau lineage documenter

Trace a Tableau dashboard from its workbook XML down to source database objects, separating confirmed lineage from inferred lineage, and produce a reviewable lineage package.

## When to use

- "What does this dashboard depend on?"
- "Trace this .twb/.twbx to its source tables."
- "What breaks in this dashboard if we migrate the source?"

## Inputs you need

- The workbook XML (`.twb`, or the `.twb` extracted from a `.twbx`).
- Any custom SQL the workbook embeds.
- The referenced SQL Server view and stored procedure definitions in the workspace.

## Procedure

1. **Inventory data sources.** Parse the workbook XML for `<datasource>` elements, named connections, and relations. List each connection (without credentials) and the tables/custom SQL it references.
2. **Extract custom SQL.** Pull every `<relation type='text'>` / custom-SQL block. Record the exact block and where it appears.
3. **Resolve referenced objects.** For each custom SQL block, find the views and stored procedures it references in the workspace and read their definitions.
4. **Walk upstream.** From each view/procedure, follow `FROM`/`JOIN`/linked-server references to upstream tables or reporting-mart objects. Stop at objects not present in the workspace and record them as unknowns.
5. **Classify each edge.** Mark every dependency as **confirmed** (you read the definition) or **inferred** (named but not present). Never present inferred lineage as confirmed.
6. **Emit the package.** Fill `assets/lineage_report_template.md`, draw the diagram from `assets/lineage_diagram_template.mmd`, and write a source-object inventory CSV.

## Output

- `dashboard-lineage.md` — from `assets/lineage_report_template.md`.
- `dashboard-data-flow.mmd` — from `assets/lineage_diagram_template.mmd`.
- `source-object-inventory.csv` — columns: `object,type,referenced_by,confirmed,notes`.
- `open-questions.md` — unknowns requiring owner review.

## Rules

- Evidence-first: cite the file and, where possible, the line for each dependency.
- Separate confirmed from inferred. Unknowns are owner questions, not guesses.
- Public-safe: never emit real server, database, linked-server, table, or owner names.
- See `references/lineage_model.md` for the dependency model and edge vocabulary.
