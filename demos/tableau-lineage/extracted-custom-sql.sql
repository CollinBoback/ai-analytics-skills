-- Custom SQL extracted from sample-dashboard.twb
-- Datasource: "Revenue Retention"  (connection: reporting_dw on REPORTING_SQL_HOST)

SELECT cohort_month, revenue, customers
FROM dbo.vw_revenue_retention
WHERE cohort_month >= DATEADD(MONTH, -12, CAST(GETDATE() AS date));
