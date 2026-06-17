## Catalog Remediation Note — dbo.vw_revenue_retention

- **Object:** `dbo.vw_revenue_retention`
- **Catalog reference:** finance/views/vw_revenue_retention (sanitized)
- **Reviewed by:** workshop participant  **Date:** 2026-06-17

### Current documentation issue

Description is boilerplate, no lineage recorded, steward unassigned, referenced wiki link is broken (404), metadata ~3 years stale.

### Repo evidence reviewed

| Evidence file | What it tells us |
| --- | --- |
| `demos/alation-cleanup/related-view-definition.sql` | Aggregates `marts.fct_orders` to monthly grain; filters `order_status = 'completed'`; measures = `revenue` (SUM) and `customers` (COUNT DISTINCT). |

### Suggested description

Monthly revenue and distinct customer counts by cohort month, restricted to completed orders. Grain: one row per `cohort_month`. Source: `marts.fct_orders`. Use for revenue-retention reporting; not a tax-inclusive revenue figure.

### Lineage summary

`marts.fct_orders` → `dbo.vw_revenue_retention` (confirmed). `marts.fct_orders` is built by `dbo.usp_finance_rollup` (confirmed) which also reads a legacy ERP actuals source over a linked server (inferred / external).

### Known caveats

- `revenue` excludes anything not flagged `order_status = 'completed'`.
- Upstream `UNION ALL` in `usp_finance_rollup` could double-count if staging and legacy actuals overlap (open question).

### Owner questions

- Who is the data steward for finance marts?
- Should retention revenue include refunds/adjustments? Currently it does not.

### Proposed change (diff)

```diff
- Description: revenue view
+ Description: Monthly revenue and distinct customer counts by cohort month (completed orders only).
+ Grain: one row per cohort_month. Source: marts.fct_orders. Excludes tax and non-completed orders.
- Lineage: (none recorded)
+ Lineage: marts.fct_orders -> dbo.vw_revenue_retention (confirmed)
- Steward: (unassigned)
+ Steward: needs owner review
```

### Safe to update?

`needs review` — the description and lineage are evidence-backed and safe to propose, but steward assignment and the double-count question need an owner before any catalog write.
