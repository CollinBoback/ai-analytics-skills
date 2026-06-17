# SQL Server Performance Review

- **Query/object:** <schema.object or file>
- **Dashboard:** <name>
- **Business owner:** <name/role>
- **Reviewed by:** <name>  **Date:** <yyyy-mm-dd>

## Baseline

- Duration: <ms>
- CPU: <ms>
- Logical reads: <count>
- Row count: <count>

## Suspected bottleneck

<what and why>

## Evidence

<STATISTICS IO/TIME output, plan operators, or measured numbers>

## Proposed change

<the smallest safe rewrite, summarized>

## Why it is safe

- Output grain preserved: <how>
- Row counts / totals preserved: <validation>
- Business logic unchanged: <confirmation>

## Validation performed

```sql
<validation query and results>
```

## Before/after comparison

| Metric | Before | After |
| --- | --- | --- |
| Duration | | |
| CPU | | |
| Logical reads | | |
| Row count | | |

## Remaining risk

<anything still uncertain>

## DBA / data engineering follow-up

<indexes, statistics, schema, or shared-proc items to escalate>
