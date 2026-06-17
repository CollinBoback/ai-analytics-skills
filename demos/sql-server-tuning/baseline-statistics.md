# Baseline statistics — slow-dashboard-query.sql

Captured with `SET STATISTICS IO, TIME ON;` on a sanitized sample (~2.1M rows in `marts.fct_orders`, ~85k in `dbo.dim_customer`). Numbers are illustrative.

| Metric | Value |
| --- | --- |
| Duration | 8,420 ms |
| CPU | 7,950 ms |
| Logical reads (fct_orders) | 412,300 |
| Logical reads (dim_customer) | 1,150 |
| Rows returned | 1,043,778 |

## Plan observations

- **Clustered index scan** on `marts.fct_orders` (no seek). The date predicates are non-sargable.
- `CONVERT(varchar(7), f.order_date, 120)` and `YEAR(f.order_date)` both wrap the indexed `order_date` column, defeating any index on it.
- `SELECT DISTINCT *` sorts the entire wide result set to deduplicate.
- The join is on `dim_customer.customer_id` (the primary key), so it is 1:1 — `DISTINCT` is not removing real duplicates here.
- `SELECT *` pulls every column from both tables into the Tableau extract, most unused by the tile.

## What to collect before changing anything

- Confirm `dim_customer.customer_id` is the PK (so the join cannot fan out).
- Confirm the tile only needs: order grain + customer name/region + revenue.
- Row count and `SUM(revenue)` for the 12-month window (for equivalence validation).
