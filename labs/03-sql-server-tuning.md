# Lab 03 — Triage SQL Server performance safely (Tune it)

**Primary question:** Why is this query/dashboard slow, and what is the smallest safe improvement?

**Tool posture:** AI coding assistant in repo context.

**Core deliverable:** a SQL performance review note with before/after validation.

## Why this matters

Slow Tableau dashboards, slow extracts, expensive joins, old stored procedures, scary legacy SQL, bad filters, unnecessary `DISTINCT`s, and non-sargable predicates are daily BI problems. This is **AI-assisted performance triage for BI analysts — not "become a DBA."**

You can: inspect query logic, identify likely risks, propose safe rewrites, measure before/after, validate equivalence, and document escalation.
You should not: casually create production indexes or make unreviewed changes to shared stored procedures.

## Scenario

```
Slow Tableau dashboard
  → underlying SQL query / view / stored procedure
  → AI performance triage
  → baseline evidence collection
  → likely bottleneck identification
  → smallest safe rewrite proposal
  → row-count / totals / grain validation
  → DBA or data-engineering follow-up note
```

## Files for this lab

- `demos/sql-server-tuning/slow-dashboard-query.sql`
- `demos/sql-server-tuning/baseline-statistics.md`
- `demos/sql-server-tuning/tuned-query.sql`
- `demos/sql-server-tuning/performance-review.md` — worked example of the deliverable.
- Skill: `.agents/skills/sql-server-performance-triage/`
- Template: `templates/sql-performance-review-template.md`

## Guardrails

- Do not change business logic.
- Do not change output grain.
- Do not add indexes directly.
- Do not optimize without before/after evidence.
- Do not ship a rewrite without row-count and metric validation.

## Watch

The facilitator runs phase 1 (diagnose, do not rewrite), then phase 2 (smallest safe rewrite), and shows the validation query that proves equivalence.

## Try — prompt pattern, phase 1 (diagnose)

> Review this SQL Server query as a BI performance triage.
>
> Do not rewrite it yet.
>
> Return:
> 1. What the query is trying to do
> 2. The likely performance risks
> 3. Which risks are safe for a BI analyst to fix
> 4. Which risks require DBA / data engineering review
> 5. What evidence I should collect before changing anything

## Try — prompt pattern, phase 2 (rewrite)

> Based on the query and the baseline statistics, propose the smallest safe rewrite.
>
> Constraints:
> - Preserve the output grain
> - Preserve row counts and totals
> - Do not change business logic
> - Do not add indexes directly
> - Explain why each change should reduce reads or CPU
> - Include a validation query

## Verify

- The rewrite preserves grain and totals (run the validation query).
- Each change is explained in terms of reads, joins, filters, or row counts.
- Anything risky is routed to a DBA / data-engineering follow-up rather than applied.

## Document — deliverable

Fill in `templates/sql-performance-review-template.md` and save to `outputs/sql-performance-review.md`:

```
# SQL Server Performance Review

Query/object:
Dashboard:
Business owner:

Baseline:
- Duration:
- CPU:
- Logical reads:
- Row count:

Suspected bottleneck:
Evidence:
Proposed change:
Why it is safe:
Validation performed:
Before/after comparison:
Remaining risk:
DBA / data engineering follow-up:
```
