# Stakeholder Update — monthly_net_revenue migration check

- **From:** Finance Analytics (workshop participant)  **Date:** 2026-06-17
- **Audience:** Finance reporting owners
- **Confidence:** medium

## Answer

The metric reconciles for 5 of 6 months. September 2025 net revenue is $7,600 lower on the new ERP platform and needs an owner decision before we cut over.

## What changed and why

We compared the legacy extract (`old_source_sample.csv`) against the new ERP extract (`new_source_sample.csv`) at `cohort_month` grain. Customer counts match for every month. Revenue matches within 0.5% for every month except 2025-09 ($128,900 → $121,300, a -5.9% difference).

## Evidence

- Spec: `validation_spec.json` (row_count, sum_tolerance 0.5%, per_dimension_tolerance on cohort_month).
- Results: `reconciliation_results.csv`; failure isolated in `failed_checks.csv` to 2025-09.
- Total revenue delta: -$7,600 (-0.9%), entirely attributable to September.

## Caveats

- Samples are small and sanitized; rerun on the full extracts before cutover.
- Root cause not yet confirmed — likely late-posted or excluded September orders in the new source.

## Next action

Finance reporting owner to confirm whether September completed-order logic differs on the new platform. Owner: needs owner review.
