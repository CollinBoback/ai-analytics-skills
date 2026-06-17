# Troubleshooting

Fast fixes when the workshop stalls.

## Assistant / tooling

- **Assistant ignores the rules:** explicitly ask it to read `AGENTS.md` and restate the rules before continuing.
- **Wrong files in the answer:** scope context tightly — open the file, select the range, or reference it by name. Remove unrelated open files.
- **Assistant wants to edit a shared system:** that should require approval. Decline and ask it to draft a local diff to `outputs/` instead.
- **Not sure what the assistant can see:** ask it to list every file and assumption it is relying on.

## Lab-specific

- **Lineage looks too confident:** ask it to separate confirmed from inferred and to list the unknowns. The linked-server actuals source must be inferred.
- **Tuning rewrite has no proof:** require the validation query and the before/after row count + totals before accepting it.
- **Catalog write blocked:** that is the evidence hook working. Produce `outputs/catalog-remediation.md` with cited evidence first.
- **KPI verdict changes between runs:** the scoring path is not deterministic. Move all thresholds into `validation_spec.json` and score with Python only.

## Optional app

- **`npm run dev` fails:** run `npm install` first; Node 18+.
- **Type errors:** run `npm run lint` (`tsc --noEmit`) and read the first error.
- **Repository tab is empty:** the browser reads real files via Vite's raw glob; confirm `labs/`, `demos/`, etc. exist and restart the dev server.
