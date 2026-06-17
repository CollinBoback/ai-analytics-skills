-- Stored procedure that builds marts.fct_orders.
-- Reads staging (confirmed) and a legacy ERP actuals table over a linked server (external/inferred).
CREATE PROCEDURE dbo.usp_finance_rollup AS
BEGIN
    SET NOCOUNT ON;

    TRUNCATE TABLE marts.fct_orders;

    INSERT INTO marts.fct_orders (order_id, customer_id, cohort_month, revenue, order_status)
    SELECT
        o.order_id,
        o.customer_id,
        DATEFROMPARTS(YEAR(o.order_date), MONTH(o.order_date), 1) AS cohort_month,
        o.order_amount AS revenue,
        o.status       AS order_status
    FROM stg.orders AS o

    UNION ALL

    -- Linked server to the legacy ERP / reporting mart. Definition not in this workspace (external).
    SELECT
        a.doc_id        AS order_id,
        a.account_id    AS customer_id,
        a.period_month  AS cohort_month,
        a.amount        AS revenue,
        'completed'     AS order_status
    FROM [LEGACYERP].legacy_finance.dbo.actuals AS a;
END;
