---
name: analytics-kpi-validator
description: Use this skill when asked to validate a KPI, metric migration, dashboard source change, or old-vs-new query comparison. Produce a validation spec, deterministic check plan, thresholds, reconciliation summary, and review-ready report. Pairs an LLM-generated structured spec with deterministic Python checks so the verdict is reproducible.
---

# Analytics KPI validator

Prove a metric survived a source/platform change. The LLM proposes a structured validation spec; Python runs deterministic checks against it. Same inputs always produce the same verdict.

## When to use

- "Did this KPI survive the migration?"
- "Reconcile the old source vs the new source for this metric."
- "Validate this metric definition against two extracts."

## Procedure

1. **Read the metric definition.** Grain, filters, measure, and any business rules (for example, "net revenue excludes tax").
2. **Generate the validation spec.** Produce a `validation_spec.json` conforming to `assets/validation_spec.schema.json`: row-count tolerance, sum/aggregate checks, key-overlap checks, and per-dimension thresholds. An LLM API may draft it; it must validate against the schema.
3. **Run deterministic checks (Python/pandas).** Compare the old and new extracts against the spec. Each check returns pass/fail plus the offending rows/dimensions. No randomness, no LLM in the scoring path.
4. **Summarize.** Write a reconciliation summary, a failed-check inventory, and a verdict: reconciles within tolerance / needs owner review.
5. **Patch docs.** Emit a `catalog_doc_patch.md` describing the validated state for the catalog.

## Output

```
outputs/
  validation_spec.json
  reconciliation_results.csv
  failed_checks.csv
  validation_report.md     # from assets/validation_report_template.md
  validation_diagram.mmd
  catalog_doc_patch.md
```

## Determinism contract

- Thresholds live in the spec, not in prose.
- The check runner is pure Python over the spec + extracts.
- The LLM may draft the spec and narrate the report, but must never decide pass/fail.

See `references/reconciliation_patterns.md` for the check catalog and public patterns (dbt-audit-helper, Great Expectations, dbt-codegen).
