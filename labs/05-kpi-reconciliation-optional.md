# Lab 05 — Prove the KPI still reconciles (Prove it, optional)

**Primary question:** Did the metric survive a migration / source change?

**Tool posture:** a notebook + an enterprise LLM API + structured outputs + deterministic Python checks.

**Core deliverable:** a validation packet — reconciliation report and a catalog/doc patch.

This lab is optional. It preserves the best parts of an API/notebook/evals workflow without turning the session into a generic data-science notebook detour.

## Scenario

```
Old-source KPI extract
+ new-source KPI extract
  → AI-generated structured validation plan
  → Python deterministic checks
  → reconciliation summary
  → failed-check inventory
  → review-ready validation packet
  → catalog/doc patch
```

The flow: use an **enterprise LLM API** (any structured-outputs-capable API — substitute your own) to generate a structured validation plan, then use Python to run deterministic checks. It showcases API usage from a notebook, structured outputs, data-quality checks, a reusable validation skill, eval-style assertions, and deterministic evidence.

## Files for this lab

- `demos/kpi-reconciliation/metric-definition.yml`
- `demos/kpi-reconciliation/old_source_sample.csv`
- `demos/kpi-reconciliation/new_source_sample.csv`
- `demos/kpi-reconciliation/stakeholder-update.md`
- Skill: `.agents/skills/analytics-kpi-validator/`
- Template: `templates/validation-report-template.md`
- Spec schema: `.agents/skills/analytics-kpi-validator/assets/validation_spec.schema.json`

## Watch

The facilitator generates a `validation_spec.json` from the metric definition, then runs deterministic checks against the two sample extracts and shows the failed-check inventory.

## Try

1. **Generate a validation spec.** Ask the assistant (or the LLM API) to produce a `validation_spec.json` that conforms to the schema: row-count tolerance, sum/grain checks, key-overlap checks, and per-dimension thresholds.
2. **Run deterministic checks.** Use Python (pandas) to compare `old_source_sample.csv` and `new_source_sample.csv` against the spec. The checks must be deterministic — same inputs, same verdict.
3. **Summarize.** Produce a reconciliation summary and a failed-check inventory.

## Skill trigger

> Use this skill when asked to validate a KPI, metric migration, dashboard source change, or old-vs-new query comparison. Produce a validation spec, deterministic check plan, thresholds, reconciliation summary, and review-ready report.

## Verify

- Checks are deterministic and reference the spec thresholds.
- Every failed check names the dimension/rows involved.
- The report separates "reconciles within tolerance" from "needs owner review."

## Document — deliverables

```
outputs/
  validation_spec.json
  reconciliation_results.csv
  failed_checks.csv
  validation_report.md          # from templates/validation-report-template.md
  validation_diagram.mmd
  catalog_doc_patch.md
```

## Public patterns to borrow

- **dbt-audit-helper** — old-vs-new reconciliation pattern.
- **Great Expectations (GX)** — expectation / check / report pattern.
- **dbt-codegen** — generated source/model documentation pattern.
- **dbt-expectations** — optional inspiration only, not a core dependency.
