# Dashboard Lineage — <dashboard name>

- **Workbook:** <file.twb/.twbx>
- **Reviewed by:** <name>
- **Date:** <yyyy-mm-dd>
- **Review status:** ready / needs owner review / blocked

## 1. Dashboard data sources

| Connection | Type | References |
| --- | --- | --- |
| <name> | <custom SQL / table / extract> | <objects> |

## 2. Custom SQL blocks

```sql
-- block 1 (location in workbook)
<sql>
```

## 3. Referenced views / stored procedures

| Object | Type | Definition found? | Notes |
| --- | --- | --- | --- |
| <schema.object> | view / proc | yes / no | |

## 4. Upstream tables / linked-server references

| Upstream object | Reached via | Confirmed? |
| --- | --- | --- |
| <object> | <view/proc> | confirmed / inferred |

## 5. Confirmed lineage vs inferred lineage

- **Confirmed:** <list>
- **Inferred:** <list>

## 6. Unknowns requiring owner review

- <question>

## 7. Data-flow diagram

See `dashboard-data-flow.mmd`.
