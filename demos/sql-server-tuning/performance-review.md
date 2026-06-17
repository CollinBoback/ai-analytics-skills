# SQL Server Performance Review

- **Query/object:** `slow-dashboard-query.sql` (Active Customers tile)
- **Dashboard:** Finance Overview
- **Business owner:** Finance Analytics
- **Reviewed by:** workshop participant  **Date:** 2026-06-17

## Baseline

- Duration: 8,420 ms
- CPU: 7,950 ms
- Logical reads: 413,450 (both tables)
- Row count: 1,043,778

## Suspected bottleneck

Non-sargable date predicates force a full clustered index scan of `marts.fct_orders`, and `SELECT DISTINCT *` adds a large sort over a wide row.

## Evidence

`STATISTICS IO` shows 412,300 logical reads on `fct_orders` with a clustered index scan in the plan. `CONVERT(varchar(7), order_date, 120)` and `YEAR(order_date)` wrap the indexed column. The join is on `dim_customer.customer_id` (PK), so it is 1:1.

## Proposed change

Make the date predicate sargable, drop the unnecessary `DISTINCT`, project only needed columns, and remove the redundant `YEAR()` filter. See `tuned-query.sql`.

## Why it is safe

- Output grain preserved: still one row per order.
- Row counts / totals preserved: validated below.
- Business logic unchanged: same 12-month window and `is_active = 1` filter.

## Validation performed

```sql
-- Equivalence check: counts and revenue total must match
SELECT COUNT(*) AS row_count, SUM(revenue) AS total_revenue
FROM ( /* original query, columns reduced to revenue */ ) AS original;

SELECT COUNT(*) AS row_count, SUM(revenue) AS total_revenue
FROM ( /* tuned query */ ) AS tuned;
-- Result: row_count and total_revenue identical.
```

## Before/after comparison

| Metric | Before | After |
| --- | --- | --- |
| Duration | 8,420 ms | 640 ms |
| CPU | 7,950 ms | 520 ms |
| Logical reads | 413,450 | 12,900 |
| Row count | 1,043,778 | 1,043,778 |

## Remaining risk

The speedup assumes an index on `marts.fct_orders(order_date)` exists or is justified. Confirm before relying on the seek.

## DBA / data engineering follow-up

- Consider an index on `marts.fct_orders(order_date)` (include `customer_id, revenue, order_status`). **Do not create it here** — propose it to the DBA with these numbers.
