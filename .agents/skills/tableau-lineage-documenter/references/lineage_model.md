# Lineage model and edge vocabulary

A small, consistent model keeps lineage docs comparable across dashboards.

## Node types

- **dashboard** — the Tableau view/workbook the user starts from.
- **datasource** — a workbook connection (named connection or extract).
- **customSql** — an embedded custom SQL relation inside the workbook.
- **view** — a SQL Server view definition.
- **proc** — a stored procedure.
- **table** — a base table or mart object.
- **external** — a linked-server / legacy ERP / reporting-mart object not present in the workspace.

## Edge types

- **confirmed** (`-->`) — you read both endpoints' definitions in the workspace.
- **inferred** (`-.->`) — the dependency is named (in SQL text or a connection) but you could not read the target definition.

## Confidence rules

1. An edge is **confirmed** only when the target object's definition is present and you read it.
2. A name appearing in SQL text without a readable definition is **inferred** and becomes an open question.
3. Linked-server / three-part / four-part names (`server.db.schema.object`) are almost always **external**; record them but do not invent their internals.

## Migration-impact lens

When the scenario involves a source/platform migration, annotate each external node with: does the new platform expose an equivalent object? If unknown, that is an owner question, not an assumption.
