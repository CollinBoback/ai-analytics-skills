-- Repo evidence for the catalog remediation. This is the authoritative definition.
CREATE VIEW dbo.vw_revenue_retention AS
SELECT
    f.cohort_month,
    SUM(f.revenue)                AS revenue,
    COUNT(DISTINCT f.customer_id) AS customers
FROM marts.fct_orders AS f
WHERE f.order_status = 'completed'   -- only completed orders count toward retention revenue
GROUP BY f.cohort_month;
