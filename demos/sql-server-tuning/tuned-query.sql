-- Smallest safe rewrite of slow-dashboard-query.sql.
-- Preserves grain (one row per order) and the 12-month window. Validate before shipping.

SELECT
    f.order_id,
    f.customer_id,
    f.cohort_month,
    f.revenue,
    f.order_status,
    c.customer_name,
    c.region
FROM marts.fct_orders AS f
JOIN dbo.dim_customer AS c
  ON c.customer_id = f.customer_id
WHERE f.order_date >= DATEADD(MONTH, -12, CAST(GETDATE() AS date))  -- sargable: index on order_date can seek
  AND c.is_active = 1;

-- Changes and why:
-- 1. Sargable date predicate: removed CONVERT()/YEAR() wrappers so an index on order_date can seek
--    instead of scanning. (Reduces logical reads.)
-- 2. Dropped DISTINCT: join is 1:1 on dim_customer.customer_id (PK), so no real duplicates exist.
--    (Removes a full sort.) Validate row count to confirm.
-- 3. Projected only the columns the tile uses instead of SELECT *. (Less data into the extract.)
-- 4. Removed the redundant YEAR(order_date) >= 2024 filter; the 12-month window already bounds it.
-- Business logic, grain, and totals unchanged.
