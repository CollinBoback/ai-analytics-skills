# Lab 02 — Trace Tableau lineage with workspace context (Find it)

**Primary question:** What does this Tableau dashboard depend on?

**Tool posture:** AI coding assistant working inside the BI workspace.

**Core deliverable:** a standardized lineage doc, a Mermaid data-flow diagram, and a source-object inventory.

## Why this is beyond a chatbot

A chatbot struggles here unless you paste a huge amount of Tableau XML, SQL, stored procedure definitions, and documentation. An assistant in the workspace reads those files directly and traces the dependencies for you — then shows its evidence.

## Scenario

```
Tableau dashboard
  → .twb / .twbx XML
  → datasources and custom SQL
  → SQL Server views or stored procedures
  → linked-server / legacy ERP reporting-mart references
  → source objects
  → standardized lineage doc
  → Mermaid diagram
```

The demo models a finance dashboard moving through a legacy ERP / reporting mart toward a new ERP platform — the kind of reporting-continuity question that matters during a platform migration.

## Files for this lab

- `demos/tableau-lineage/sample-dashboard.twb` — the workbook XML.
- `demos/tableau-lineage/extracted-custom-sql.sql` — custom SQL pulled from the workbook.
- `demos/tableau-lineage/sql-server-objects/` — the view and stored procedure definitions.
- `demos/tableau-lineage/expected-output.md` — what a good answer looks like.
- Skill: `.agents/skills/tableau-lineage-documenter/`
- Template: `templates/dashboard-lineage-template.md` and `templates/mermaid-data-flow-standard.md`

## AI capabilities shown

- Selected file / context use
- Tableau XML inspection
- SQL parsing
- Stored procedure / view tracing
- Confirmed vs inferred lineage
- Mermaid generation
- Standardized documentation
- Human review

## Watch

The facilitator opens the workbook XML and one view definition, then runs the prompt below and walks through the evidence the assistant cites.

## Try — prompt pattern

> Using the Tableau workbook XML and the SQL Server stored procedure/view definitions in this workspace, trace each custom SQL block to its source objects.
>
> Return:
> 1. Dashboard data sources
> 2. Custom SQL blocks
> 3. Referenced views/stored procedures
> 4. Upstream tables or linked-server references
> 5. Confirmed lineage vs inferred lineage
> 6. Unknowns requiring owner review
> 7. Mermaid data-flow diagram

## Verify

Compare against `demos/tableau-lineage/expected-output.md`:

- Every custom SQL block is traced to at least one source object, or explicitly listed as an unknown.
- Confirmed lineage is separated from inferred lineage.
- The Mermaid diagram matches the standard in `templates/mermaid-data-flow-standard.md`.

## Document — deliverables

Produce these in `outputs/`:

```
outputs/
  dashboard-lineage.md          # from templates/dashboard-lineage-template.md
  dashboard-data-flow.mmd
  source-object-inventory.csv
  migration-impact-notes.md     # reporting continuity during the platform move
  open-questions.md
```

## Public-safe note

Keep examples generic: Tableau dashboard (not an internal program name), legacy ERP / reporting mart (not real mart names), new ERP platform (not a vendor/version), enterprise AI coding assistant (not an internal tool name). Never use real server, database, linked-server, table, or owner names.
