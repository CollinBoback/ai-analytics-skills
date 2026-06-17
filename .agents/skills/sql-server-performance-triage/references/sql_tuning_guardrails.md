# SQL tuning guardrails — safe vs. escalate

The goal is the **smallest safe improvement** a BI analyst can make and validate, with everything riskier routed to a DBA / data engineering.

## Safe for a BI analyst (with validation)

- Make predicates **sargable** (avoid wrapping indexed columns in functions; compare to a literal/range instead of `WHERE CAST(col ...) = ...`).
- Remove unnecessary `DISTINCT` once you confirm the join does not fan out.
- Replace `SELECT *` with the columns actually used by the dashboard.
- Add a missing `WHERE` filter the dashboard already implies (date range, status).
- Push filters before joins / aggregations when it does not change results.
- Replace a correlated subquery with a join when the grain is preserved.

## Escalate to DBA / data engineering

- Creating or altering **indexes**.
- Updating **statistics** or changing isolation levels.
- Editing a **shared stored procedure** other dashboards depend on.
- Schema changes, partitioning, or materialized/indexed views.
- Anything that changes data, grain, or business logic.

## Common bottleneck signatures

| Signature | Why it hurts | Safe move |
| --- | --- | --- |
| Non-sargable predicate | Forces a scan, ignores indexes | Rewrite to a sargable form |
| Implicit conversion | Silent scans, type mismatch | Match types explicitly |
| Fan-out join + `DISTINCT` | Inflates then dedupes rows | Fix the join grain |
| Scalar UDF in `SELECT`/`WHERE` | Row-by-row execution | Inline the logic or escalate |
| `SELECT *` into Tableau extract | Moves unused columns | Project only needed columns |

## Always

Capture baseline before, validate after, and never present an unvalidated rewrite as "faster."
