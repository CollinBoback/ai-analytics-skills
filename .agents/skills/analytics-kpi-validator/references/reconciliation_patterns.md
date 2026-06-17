# Reconciliation patterns and check catalog

## Check catalog (map to `validation_spec.schema.json`)

- **row_count** — old and new have the same number of rows at the metric grain (within `tolerance_abs`).
- **sum_tolerance** — `SUM(measure)` matches within `tolerance_abs` or `tolerance_pct`.
- **key_overlap** — the set of grain keys matches; report keys present in only one source.
- **per_dimension_tolerance** — for each value of `dimension`, the measure matches within tolerance (catches offsetting errors that net to zero overall).
- **null_rate** — null fraction of a column stays under `max_null_rate`.

## Why per-dimension matters

A total can reconcile while segments are wrong in offsetting directions. Always include at least one `per_dimension_tolerance` check on a meaningful dimension (region, product, channel).

## Determinism

The LLM may draft the spec and write the narrative. The pass/fail decision must come only from Python evaluating the spec against the extracts. If a verdict could change on a re-run with the same inputs, the design is wrong.

## Public patterns to borrow

- **dbt-audit-helper** — `compare_relations` / `compare_queries` is the canonical old-vs-new reconciliation pattern.
- **Great Expectations (GX)** — expectation → validation → data-docs report structure.
- **dbt-codegen** — generate source/model YAML documentation to seed catalog patches.
- **dbt-expectations** — optional inspiration for expression-level expectations; not a required dependency.

## Tolerance guidance

- Prefer relative tolerance (`tolerance_pct`) for revenue-like measures; absolute for counts.
- Start strict (0.1–0.5%); loosen only with a documented business reason.
- Record the chosen tolerance and its rationale in the report.
