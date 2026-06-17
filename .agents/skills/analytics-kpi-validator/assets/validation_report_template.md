# KPI Validation Report — <metric>

- **Metric:** <name>
- **Grain:** <columns>
- **Old source:** <file/extract>  **New source:** <file/extract>
- **Reviewed by:** <name>  **Date:** <yyyy-mm-dd>
- **Verdict:** reconciles within tolerance / needs owner review

## Summary

<one paragraph: did it reconcile, and what is the headline difference?>

## Checks run

| Check ID | Type | Column/Dimension | Threshold | Result |
| --- | --- | --- | --- | --- |
| <id> | <type> | <col> | <tolerance> | pass / fail |

## Failed checks

| Check ID | Rows / dimensions affected | Old | New | Delta |
| --- | --- | --- | --- | --- |
| <id> | <keys> | | | |

## Evidence

- Spec: `validation_spec.json`
- Results: `reconciliation_results.csv`
- Failures: `failed_checks.csv`

## Caveats and owner questions

- <caveat / question>

## Recommended catalog/doc patch

See `catalog_doc_patch.md`.
