# Where an AI coding assistant fits in analytics

Analytics answers improve when the assistant can inspect definitions, SQL, docs, and selected context — not just the text you paste.

```
BI workspace (repo)  ->  AI coding assistant  ->  Verified artifact
```

- **Workspace:** Tableau XML, SQL views/procs, metric YAML, catalog notes, templates.
- **Assistant:** reads open files, selected ranges, and `@file` references; uses tools (catalog MCP, filesystem) under the rules in `.codex/rules/workshop.rules`.
- **Verify:** validation queries, named assumptions, confirmed-vs-inferred separation, reviewable artifacts.

## Chatbot vs workspace assistant

| | Chatbot | Workspace assistant |
| --- | --- | --- |
| Context | Only what you paste | The actual repo files |
| Evidence | You supply it manually | Cites files/lines it read |
| Tools | None | Catalog/search/filesystem via MCP |
| Output | Text | Reviewable artifacts in `outputs/` |
| Safety | Up to you | Enforced by AGENTS.md + hooks/rules |

## The mindset shift

AI is not valuable because it writes more. It is valuable because it helps you **structure the work, inspect evidence, reduce blind spots, and produce artifacts a human can review.** Every lab is an instance of the same loop:

```
Open context → ask with constraints → inspect evidence → propose → validate → communicate caveats
```
