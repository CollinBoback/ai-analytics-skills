---
name: sql-server-performance-triage
description: Use when a SQL Server query, view, stored procedure, or the dashboard it powers is slow and a BI analyst needs to diagnose likely bottlenecks and propose the smallest safe rewrite with before/after validation. Two-phase: diagnose without rewriting, then rewrite within strict guardrails. Not for creating production indexes or editing shared procedures unreviewed.
---

# SQL Server performance triage

Help a BI analyst triage a slow query safely: explain the logic, identify likely performance risks, propose the smallest safe rewrite, and prove equivalence — without acting like a DBA.

## When to use

- "Why is this dashboard/query slow?"
- "Can you make this safe to speed up?"
- "What's the smallest change that reduces reads here?"

## Hard guardrails

- Do not change business logic.
- Do not change output grain.
- Do not add indexes directly.
- Do not optimize without before/after evidence.
- Do not ship a rewrite without row-count and metric validation.

See `references/sql_tuning_guardrails.md` for the safe-vs-escalate catalog.

## Phase 1 — diagnose (do not rewrite)

Return:
1. What the query is trying to do (in business terms).
2. Likely performance risks (non-sargable predicates, implicit conversions, fan-out joins, unnecessary `DISTINCT`, `SELECT *`, scalar UDFs, missing filters).
3. Which risks are safe for a BI analyst to fix.
4. Which risks require DBA / data-engineering review (indexes, statistics, schema changes, shared-proc edits).
5. What baseline evidence to collect before changing anything (duration, CPU, logical reads, row count; capture from `SET STATISTICS IO, TIME ON` or the execution plan).

## Phase 2 — rewrite (smallest safe change)

Given the query and baseline:
- Propose the smallest rewrite that preserves grain, row counts, and totals.
- Explain each change in terms of reads, joins, filters, or row counts.
- Include a validation query that proves equivalence.

## Output

Fill `assets/performance_review_template.md` → `outputs/sql-performance-review.md`, including a before/after comparison and a DBA/data-engineering follow-up section.

## Validation pattern

Prove equivalence, do not assume it:

```sql
-- Row count + key aggregates must match between original and rewrite
SELECT COUNT(*) AS row_count, SUM(revenue) AS total_revenue
FROM (<original query>) AS original;

SELECT COUNT(*) AS row_count, SUM(revenue) AS total_revenue
FROM (<rewritten query>) AS rewritten;
```
