# Catalog quality rubric

Score each catalog entry 0–2 on every dimension. An entry is **ready** only when no dimension scores 0 and total ≥ 8/10.

| Dimension | 0 | 1 | 2 |
| --- | --- | --- | --- |
| **Description** | Missing or boilerplate | Vague, no business meaning | Clear business meaning + grain |
| **Evidence** | No source cited | Source named, not verified | Every claim traces to read SQL |
| **Lineage** | None | Partial / inferred only | Confirmed upstream + downstream |
| **Caveats** | None | Generic | Specific, actionable caveats |
| **Ownership** | Unknown | Role only | Owner + open questions captured |

## Decision

- **ready** — total ≥ 8 and no zeros: safe to propose as a diff for approval.
- **needs review** — any zero, or total 5–7: draft the diff but mark `needs review` and surface owner questions.
- **blocked** — total ≤ 4: gather more evidence before drafting.

## Reminder

A high score never authorizes a direct write. The local diff + human approval step always applies.
