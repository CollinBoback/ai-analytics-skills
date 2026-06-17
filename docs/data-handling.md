# Data handling and the public/internal split

This repository is **public-safe**. Everything in it uses sanitized, structurally realistic data.

## Never include

- Credentials, secrets, API keys, or connection strings.
- PII or regulated fields (customer names, emails, IDs, account numbers).
- Production data extracts.
- Real server names, database names, linked servers, table names, program names, or platform/product names.
- Real catalog URLs or real data-owner names.

## Prefer instead

- Masked or invented samples (`user_123`, `foo@example.com`).
- Schemas, row counts, and summaries over raw records.
- Generic domain names: `finance_dashboard`, `revenue_retention.sql`, `legacy_finance.actuals`, `modern_finance.actuals`, `marts.fct_orders`, `metrics.yml`, `catalog_object.md`.

## Public vs internal runs (one repo)

We maintain **one** sanitized repository and use it for both public and internal workshops. There is no second internal repo to keep in sync.

When running internally, you may *speak to* approved internal context out loud (sanitized migration stories, internal tool names) without committing any of it to the repo. The files stay public-safe.

## Translation guide (internal story → public-safe files)

| Internal concept | Public-safe term used here |
| --- | --- |
| Internal dashboard/program name | Tableau dashboard / finance_overview |
| A named legacy ERP / reporting mart | legacy ERP / reporting mart |
| A named new ERP target product/version | new ERP platform |
| Internal AI coding assistant | enterprise AI coding assistant |
| Internal LLM API | enterprise LLM API |

## If you spot a leak

Stop, remove it, and replace with a sanitized equivalent before committing. The `.codex/` secret hook is a backstop, not a substitute for judgment.
