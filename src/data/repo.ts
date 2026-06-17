export type FileNode = {
  name: string;
  type: "file" | "directory";
  path: string;
  content?: string;
  children?: FileNode[];
};

export const repoFiles = [
  {
    path: "analytics/revenue_retention.sql",
    content: `-- SQL Query: Revenue Retention Cohorts
select 
  cohort_month,
  sum(revenue) as revenue,
  count(distinct customer_id) as customers
from marts.fct_revenue
where date_week >= current_date - 84
group by 1
order by 1 desc;
`
  },
  {
    path: "labs/00-kickoff.md",
    content: `# Workshop Kickoff

Welcome to the Codex for BI Analysts workshop. 

**Outcome:** each analyst leaves with one installed tool and six reusable prompt patterns to ask better analytics questions and verify every answer before it reaches a dashboard.

## Agenda
1. **Install** - Get the Codex VS Code extension running.
2. **Orient** - Learn how to give Codex the right context (dbt models, metric YAML).
3. **Ask** - Practice the 6 core prompt recipes.
4. **Verify** - Ensure answers are correct using SQL and data validation.
`
  },
  {
    path: "labs/01-install.md",
    content: `# Lab 01: Install the Codex Extension

1. **Open Extensions** in VS Code.
2. **Search** for "Codex - OpenAI's coding agent" (\`openai.chatgpt\`).
3. **Install** the extension authored by OpenAI.
4. **Restart** VS Code if the Codex sidebar panel does not appear.
5. **Sign in** using your ChatGPT account or API key credentials.

If you are stuck, please switch to observer mode by pairing with a neighbor!
`
  },
  {
    path: "labs/02-workspace.md",
    content: `# Lab 02: Open a BI-ready Workspace

Codex can answer better questions when the repository provides clear evidence of how analysis is built.

### What to open:
*   **Repo or folder:** \`analytics\`, \`dbt\`, \`notebooks\`, \`docs\` (gives durable project context).
*   **Key files:** \`metrics.yml\`, \`schema.yml\`, \`model.sql\` (grounds definitions).
*   **Guidance:** \`AGENTS.md\` or \`README.md\` (naming conventions, command rules).
*   **Sample data:** Masked CSVs (keeps sensitive data out of prompts).

### Workshop Move
Ask Codex in the Chat panel:
> "Read the repo guidance and tell me which files define revenue, retention, and active customer metrics. Do not edit anything."
`
  },
  {
    path: "labs/03-ask-patterns.md",
    content: `# Lab 03: Ask Patterns

We rely on 6 prompt recipes to reduce hallucination and ground Codex in data logic.

### 1. Explain a KPI
Use \`@metrics.yml\` and the selected SQL. Explain definition, lineage, filters, caveats, and one validation query.

### 2. Debug SQL
Find the root cause of this error, propose the smallest fix, and show the validation command/query.

### 3. Review a Change
Review this diff for metric risk, downstream dashboard impact, and missing tests.

### 4. Document Context
Draft a concise dashboard note with source tables, caveats, and owner follow-ups.

### 5. Investigate Variance
Plan the investigation first, list hypotheses, then test the top two with SQL.

### 6. Stakeholder Update
Summarize what changed, why it changed, evidence strength, and next action.
`
  },
  {
    path: "labs/04-hands-on.md",
    content: `# Lab 04: Hands-On Exercise

### Lab Question:
*Why did weekly active customers change, and what evidence should go in the stakeholder update?*

**Steps to complete:**
1. **0-5 min: Open workspace.** Find metric docs and source SQL.
2. **5-15 min: Ask for lineage.** Attach SQL + metric docs; ask for fields, joins, assumptions.
3. **15-30 min: Debug SQL.** Find the failing join/filter and propose a validation query.
4. **30-40 min: Review answer.** Check metric, data, SQL, story, and caveats.
5. **40-45 min: Document.** Write the stakeholder update with evidence and caveats.
`
  },
  {
    path: "labs/05-variance-review.md",
    content: `# Lab 05: Variance Review

Once you have investigated the variance using the prompts from Lab 03, document your findings.

**Drafting your update:**
Make sure you include:
1. The **Answer**
2. The **Evidence** (SQL tested)
3. The **Caveats** 
4. The **Next Action**
`
  },
  {
    path: "labs/06-verification.md",
    content: `# Lab 06: Verification

Review output like an analyst. Codex accelerates work, but the analyst remains accountable for the claim.

### The Verification Diamond
*   **Metric:** Are the definitions accurate to the business?
*   **Data:** Is the time grain and scope correct?
*   **SQL:** Are joins fanning out? Are filters applied?
*   **Story:** Is the narrative supported strictly by the data?

### Reviewer Prompt
> "Before I use this answer, list every assumption, source file, query, unresolved risk, and manual check."
`
  },
  {
    path: "demos/context-pack.md",
    content: `# Demo: Giving Codex the Right Evidence

Short prompts work when the editor context is precise.

1. **Open File:** \`model.sql\`
2. **Selected Range:** highlight the failed query
3. **@file reference:** \`@metrics.yml\`
4. **Command:** "Add file to thread"

### Composer example:
> Use @metrics.yml and the selected SQL to explain why active_customer_count excludes trial accounts. Show the exact line that defines it and a validation query.
`
  },
  {
    path: "demos/debug-sql.sql",
    content: `-- Demo: Debugging SQL Errors In Place

-- dbt run --select mart_revenue
-- Database Error: column "account_status" does not exist

select 
  customer_id,
  account_status,
  sum(revenue) as revenue
from stg_orders
group by 1, 2;
`
  },
  {
    path: "demos/variance-review.sql",
    content: `-- Demo: Investigate a Variance

-- Prompt starter:
-- Revenue dropped last week. Before writing SQL, propose an investigation plan using @metrics.yml and @revenue.sql.
-- Include: 5 hypotheses, segmentation dimensions, queries to confirm/refute, and what would make each result actionable.

select 
  date_trunc('week', order_date) as date_week,
  sum(order_amount) as revenue
from fct_orders
group by 1
order by 1 desc;
`
  },
  {
    path: "docs/workflow-fit.md",
    content: `# Codex Workflow Fit

Analytics questions improve when Codex can inspect definitions, SQL, docs, and selected context.

**Analytics Repo** -> **Codex in VS Code** -> **Verified Answer**

*   **Repo:** dbt models, metric YAML, notebooks
*   **Codex:** open files, selected ranges, @file references
*   **Verify:** SQL checks, assumptions, dashboard notes
`
  },
  {
    path: "docs/data-handling.md",
    content: `# Safeguards: Protect Data

A good analytics prompt is specific without exposing unnecessary sensitive data.

### Use Samples
Prefer masked examples, row counts, schemas, and summaries over raw sensitive records.

### Do NOT Paste:
*   Customer identifiers (PII)
*   Personal or regulated fields
*   Secrets or credentials
*   Unapproved production extracts
`
  },
  {
    path: "docs/troubleshooting.md",
    content: `# Troubleshooting

Fast fixes when the workshop stalls.

*   **No Codex panel:** Restart VS Code; open Command Palette -> Codex.
*   **Wrong files in answer:** Use \`@file\`, select text, or use "add file to thread".
*   **Need local work:** Use Agent mode.
*   **Not sure what Codex sees:** Use \`/status\` and ask it to list assumptions.
`
  },
  {
    path: "docs/next-steps.md",
    content: `# Next Steps

Make Codex useful by turning today's moves into a repeatable analytics habit.

1. **Install** - Codex OpenAI's coding agent.
2. **Attach** - Open files, selected SQL, @file refs.
3. **Ask** - Metric, debug, variance, review prompts.
4. **Verify** - Run checks, name assumptions, document caveats.

*Sources:* OpenAI Developers Docs (IDE extension, Prompts).
`
  },
  {
    path: "AGENTS.md",
    content: `# AI Agent Instructions for BI Workspace

This file is automatically read by the Codex extension via /auto-context or explicit @AGENTS.md references.

## Core Rules for Analytics Code
1. Always use \`snake_case\` for SQL field names and aliases.
2. When answering KPI questions, always refer to \`metrics.yml\` for the source of truth on definitions before looking at SQL files.
3. In SQL generation, ensure week begins on Monday and always explicitly cast dates.
4. Never assume "net_revenue" includes tax. Our BI definition excludes tax.
5. All validation queries must limit to 100 rows unless aggregating.

## Safeguards
* Do not return any mock customer emails or IDs in examples. Use \`foo@example.com\` or \`user_123\`.
* If a query fails, do not rewrite the entire CTE chain; only fix the isolated line that caused the failure.
`
  }
];

export function buildFileTree(files: { path: string; content?: string }[]): FileNode[] {
  const root: FileNode[] = [];

  for (const file of files) {
    const parts = file.path.split('/');
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      let node = currentLevel.find((n) => n.name === part);

      if (!node) {
        node = {
          name: part,
          type: isFile ? 'file' : 'directory',
          path: parts.slice(0, i + 1).join('/'),
          ...(isFile ? { content: file.content } : { children: [] }),
        };
        currentLevel.push(node);
      }

      if (!isFile) {
        currentLevel = node.children!;
      }
    }
  }

  // Sort: directories first, then files
  const sortNodes = (nodes: FileNode[]) => {
    nodes.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'directory' ? -1 : 1;
    });
    nodes.forEach((n) => n.children && sortNodes(n.children));
  };
  
  sortNodes(root);
  return root;
}
