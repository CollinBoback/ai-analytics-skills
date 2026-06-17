# Lab 06 — Verification checklist

Review output like an analyst. The AI accelerates the work, but **the analyst remains accountable for the claim** that reaches a dashboard, catalog page, or stakeholder.

Apply this to every artifact you produced in Labs 02–05 before you use it.

## The verification diamond

- **Metric** — Are the definitions accurate to the business? Does the answer match `metrics.yml` / the metric definition?
- **Data** — Is the time grain and scope correct? Right date range, right filters, right population?
- **SQL** — Are joins fanning out? Are filters applied? Is the grain preserved?
- **Story** — Is the narrative supported strictly by the evidence, with caveats stated?

## The reviewer prompt

> Before I use this answer, list every assumption, source file, query, unresolved risk, and manual check you relied on. Separate what you confirmed from what you inferred.

## Per-lab checks

**Lab 02 — Lineage**
- [ ] Every custom SQL block traced to a source object or listed as unknown.
- [ ] Confirmed vs inferred lineage separated.
- [ ] Mermaid diagram follows the standard.

**Lab 03 — SQL tuning**
- [ ] Output grain and totals preserved (validation query run).
- [ ] Each change explained via reads / joins / filters / row counts.
- [ ] Risky changes routed to DBA / data engineering, not applied.

**Lab 04 — Catalog remediation**
- [ ] Every suggested description line backed by cited SQL evidence.
- [ ] Owner questions flagged, not guessed.
- [ ] Proposed change exists as a local diff before any write tool.

**Lab 05 — KPI reconciliation (optional)**
- [ ] Checks are deterministic and reference spec thresholds.
- [ ] Failed checks name the rows/dimensions involved.
- [ ] Report separates "reconciles" from "needs owner review."

## Data-safety check (all labs)

- [ ] No PII, credentials, secrets, or production extracts in any prompt or artifact.
- [ ] No real server, database, linked-server, table, owner, or proprietary names.
- [ ] Samples are masked; summaries and row counts used where possible.

## Sign-off

For each artifact, record: **reviewer**, **date**, **confirmed facts**, **open questions**, and **review status** (ready / needs owner review / blocked). Then continue to [`docs/next-steps.md`](../docs/next-steps.md).
