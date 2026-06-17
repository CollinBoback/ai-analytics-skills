# Next steps — make this a habit

Turn today's moves into a repeatable analytics practice.

## Adopt the loop

For any analytics request, run:

```
Open context → ask with constraints → inspect evidence → propose → validate → communicate caveats
```

## Bring the skills into your own repo

Copy the `.agents/skills/` packages into your analytics repo and adapt them:

- `tableau-lineage-documenter` — for dashboard dependency questions.
- `sql-server-performance-triage` — for "why is this slow?" with safe rewrites.
- `alation-doc-cleanup` — for evidence-backed catalog remediation.
- `analytics-kpi-validator` — for metric/migration reconciliation.

Add a root `AGENTS.md` so the rules travel with the repo.

## Keep it safe by default

- Read-only by default; writes to shared systems require approval.
- Draft catalog/database changes as a local diff first.
- Never expose PII, secrets, or production extracts.

## Level up

- Wire the `.codex/hooks.json` checks to real scripts (secret scan, link check, evidence gate).
- Turn the `evals/*.jsonl` cases into a CI check so your skills do not regress.
- Extend the templates to match your team's review standards.

## Where to go in this repo

- Re-run any lab from `labs/`.
- Use the verification checklist (`labs/06-verification-checklist.md`) on real work.
- Share `docs/facilitator-guide.md` with the next person who runs the session.
