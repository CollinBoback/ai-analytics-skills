-- View referenced by the dashboard's custom SQL.
-- Confirmed upstream: marts.fct_orders (built by dbo.usp_finance_rollup).
CREATE VIEW dbo.vw_revenue_retention AS
SELECT
    f.cohort_month,
    SUM(f.revenue)                AS revenue,
    COUNT(DISTINCT f.customer_id) AS customers
FROM marts.fct_orders AS f
WHERE f.order_status = 'completed'
GROUP BY f.cohort_month;
