-- Powers the "Active Customers (last 12 months)" tile on the Finance Overview dashboard.
-- Reported as slow. Do NOT rewrite in phase 1 — diagnose first.

SELECT DISTINCT *
FROM marts.fct_orders AS f
JOIN dbo.dim_customer AS c
  ON c.customer_id = f.customer_id
WHERE CONVERT(varchar(7), f.order_date, 120) >= CONVERT(varchar(7), DATEADD(MONTH, -12, GETDATE()), 120)
  AND YEAR(f.order_date) >= 2024
  AND c.is_active = 1;
