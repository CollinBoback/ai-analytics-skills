import React from "react";
import { cn } from "../utils/cn";

export type SlideData = {
  id: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  full?: boolean; // full-bleed slides (title, closing) skip the standard header/footer
  content: React.ReactNode;
};

// Reusable UI components for slides
export const CodeBlock = ({ code, className }: { code: string; className?: string }) => (
  <pre className={cn("p-4 rounded-md bg-[#0f172a] text-slate-50 text-xs font-mono overflow-auto leading-relaxed", className)}>
    <code>{code}</code>
  </pre>
);

export const StepBox = ({ number, title, children }: { number: number | string; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4 mb-5">
    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="font-bold text-base mb-1">{title}</h3>
      <div className="text-slate-600 text-sm">{children}</div>
    </div>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
    {children}
  </span>
);

export const slides: SlideData[] = [
  {
    id: 1,
    full: true,
    content: (
      <div className="flex h-full w-full">
        <div className="w-1/2 flex flex-col justify-center pr-12 pl-12 py-12">
          <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm mb-10 self-start">WORKSHOP</div>
          <h1 className="text-5xl font-bold mb-6 text-slate-900 leading-tight">AI Analytics Skills<br />for BI Analysts</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Trace lineage, tune SQL, repair catalog context, and verify every AI-assisted answer before it reaches a dashboard.
          </p>
          <p className="text-sm font-semibold text-blue-700 uppercase tracking-widest">For BI analysts, analytics engineers, and dashboard owners</p>
          <div className="mt-auto text-xs text-slate-400">Repo-centered workshop · the repository is the product</div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center p-12 bg-slate-50 gap-4">
          {[
            { k: "Find it", v: "Tableau lineage" },
            { k: "Tune it", v: "SQL Server triage" },
            { k: "Govern it", v: "Alation remediation" },
            { k: "Prove it", v: "KPI reconciliation (optional)" },
          ].map((s, i) => (
            <div key={s.k} className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-slate-200 px-5 py-4 flex items-center gap-4">
              <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{i + 1}</div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{s.k}</div>
                <div className="text-slate-500 text-xs">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 2,
    badge: "Positioning",
    title: "This is not prompt training",
    subtitle: "A chatbot answers from what you paste. A workspace assistant reasons across your project.",
    content: (
      <div className="grid grid-cols-1 gap-6 mt-2">
        <p className="text-lg text-slate-700 leading-relaxed">
          We are not teaching people to prompt a chatbot. We are teaching people to package repeatable analytics work as
          <span className="font-semibold text-slate-900"> context-aware, tool-using, reviewable AI workflows.</span>
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
          <p className="text-slate-800 text-base">
            An assistant inside a BI workspace can read Tableau XML, SQL files, stored procedures, view definitions, metric
            definitions, catalog docs, templates, and validation artifacts — and cite the evidence it used.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Pill>Multi-file context</Pill>
          <Pill>Repo-aware reasoning</Pill>
          <Pill>Tool/catalog access</Pill>
          <Pill>Evidence-backed artifacts</Pill>
          <Pill>Reviewable output</Pill>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    badge: "Framing",
    title: "Chatbot vs BI workspace assistant",
    content: (
      <div className="grid grid-cols-2 gap-6 mt-2 text-sm">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700">Chatbot</div>
          <ul className="p-4 space-y-2 text-slate-600">
            <li>Context = only what you paste</li>
            <li>You supply evidence manually</li>
            <li>No tools</li>
            <li>Output is text</li>
            <li>Safety is up to you</li>
          </ul>
        </div>
        <div className="border-2 border-blue-300 rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-4 py-2 font-bold text-white">Workspace assistant</div>
          <ul className="p-4 space-y-2 text-slate-700">
            <li>Context = the actual repo files</li>
            <li>Cites files and lines it read</li>
            <li>Catalog / search / filesystem via MCP</li>
            <li>Output is reviewable artifacts</li>
            <li>Safety enforced by AGENTS.md + hooks</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    badge: "Mindset",
    title: "The AI analytics engineer mindset",
    subtitle: "Every lab repeats the same loop.",
    content: (
      <div className="mt-2">
        <CodeBlock
          className="mb-6"
          code={`Open context
  → ask with constraints
  → inspect evidence
  → propose a change or artifact
  → validate
  → communicate caveats`}
        />
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg">
          <p className="text-slate-800">
            AI is not valuable because it writes more content. It is valuable because it helps you
            <span className="font-semibold"> structure the work, inspect evidence, reduce blind spots, and create artifacts a human can review.</span>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    badge: "Safety",
    title: "Data safety and approved context",
    subtitle: "One public-safe repo for both internal and external runs.",
    content: (
      <div className="grid grid-cols-2 gap-6 mt-2 text-sm">
        <div className="border border-red-200 rounded-lg p-4 bg-red-50/50">
          <div className="font-bold text-red-700 mb-3">Never include</div>
          <ul className="space-y-2 text-slate-700">
            <li>PII, credentials, secrets</li>
            <li>Production extracts</li>
            <li>Real server / DB / table / owner names</li>
            <li>Real catalog URLs or proprietary terms</li>
          </ul>
        </div>
        <div className="border border-green-200 rounded-lg p-4 bg-green-50/50">
          <div className="font-bold text-green-700 mb-3">Prefer instead</div>
          <ul className="space-y-2 text-slate-700">
            <li>Masked / invented samples</li>
            <li>Schemas, row counts, summaries</li>
            <li>Generic finance domain names</li>
            <li>Legacy ERP / new ERP platform (generic)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    badge: "Orientation",
    title: "Repo tour",
    subtitle: "The repository is the durable product; the app is an optional wrapper.",
    content: (
      <div className="mt-2">
        <CodeBlock
          code={`ai-analytics-skills/
  AGENTS.md          # rules your assistant follows
  labs/              # the workshop labs (start at 00-kickoff.md)
  demos/             # sanitized demo files for each lab
  templates/         # output templates + Mermaid standard
  .agents/skills/    # reusable skill packages (portable)
  .codex/            # Codex config, hooks, rules
  evals/             # eval cases for the skills
  docs/              # facilitator guide, data handling
  src/               # optional React app (this deck + repo browser)`}
        />
      </div>
    ),
  },
  {
    id: 7,
    badge: "Lab 1 · Find it",
    title: "Trace Tableau lineage",
    subtitle: "What does this dashboard depend on?",
    content: (
      <div className="mt-2 grid grid-cols-2 gap-6">
        <div>
          <StepBox number="?" title="Primary question">What does this Tableau dashboard depend on?</StepBox>
          <StepBox number="✓" title="Deliverable">Lineage doc + Mermaid diagram + source inventory</StepBox>
          <StepBox number="!" title="Key discipline">Separate confirmed lineage from inferred; unknowns become owner questions.</StepBox>
        </div>
        <CodeBlock
          code={`Trace each custom SQL block to its
source objects. Return:
1. Data sources
2. Custom SQL blocks
3. Referenced views/procs
4. Upstream tables / linked servers
5. Confirmed vs inferred lineage
6. Unknowns for owner review
7. Mermaid data-flow diagram`}
        />
      </div>
    ),
  },
  {
    id: 8,
    badge: "Lab 2 · Tune it",
    title: "Triage SQL Server performance safely",
    subtitle: "Why is this slow, and what is the smallest safe fix?",
    content: (
      <div className="mt-2 grid grid-cols-2 gap-6">
        <div>
          <div className="font-bold text-slate-800 mb-2 text-sm">Guardrails</div>
          <ul className="text-sm text-slate-600 space-y-1.5 mb-4">
            <li>Don't change business logic or grain</li>
            <li>Don't add indexes directly</li>
            <li>No rewrite without before/after evidence</li>
            <li>Validate row counts and totals</li>
          </ul>
          <div className="font-bold text-slate-800 mb-1 text-sm">Two phases</div>
          <p className="text-sm text-slate-600">1. Diagnose (do not rewrite). 2. Smallest safe rewrite + validation query.</p>
        </div>
        <CodeBlock
          code={`-- Phase 1: diagnose
1. What the query does
2. Likely performance risks
3. Safe-for-analyst fixes
4. DBA / data-eng review items
5. Baseline to collect first

-- Phase 2: smallest safe rewrite
Preserve grain, rows, totals.
Explain reads/joins/filters.
Include a validation query.`}
        />
      </div>
    ),
  },
  {
    id: 9,
    badge: "Lab 3 · Govern it",
    title: "Repair catalog context with AI",
    subtitle: "The full agentic stack — with a safe-write contract.",
    content: (
      <div className="mt-2 grid grid-cols-2 gap-6">
        <div>
          <div className="font-bold text-slate-800 mb-2 text-sm">The stack</div>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li><span className="font-mono">AGENTS.md</span> — safe-write rules</li>
            <li>Skill — <span className="font-mono">alation-doc-cleanup</span></li>
            <li>MCP — catalog read/search/update</li>
            <li>Hooks — secrets, links, evidence gate</li>
            <li>Rules — read free, writes need approval</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
          <div className="font-bold text-blue-800 mb-2">Safe-write contract</div>
          <ol className="list-decimal ml-4 space-y-1 text-slate-700">
            <li>Read catalog + SQL read-only</li>
            <li>Draft the change to a local diff</li>
            <li>Human reviews against evidence</li>
            <li>Only then call the write tool</li>
          </ol>
          <p className="mt-2 text-blue-900 font-medium">The local diff is the dry run.</p>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    badge: "Lab 4 · Prove it (optional)",
    title: "Prove the KPI still reconciles",
    subtitle: "Did the metric survive a source/platform change?",
    content: (
      <div className="mt-2 grid grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-sm text-slate-600 mb-4">
            An enterprise LLM API drafts a structured validation spec; Python runs deterministic checks. Same inputs,
            same verdict — every time.
          </p>
          <div className="font-bold text-slate-800 mb-2 text-sm">Determinism contract</div>
          <ul className="text-sm text-slate-600 space-y-1.5">
            <li>Thresholds live in the spec</li>
            <li>Scoring is pure Python</li>
            <li>LLM never decides pass/fail</li>
          </ul>
        </div>
        <CodeBlock
          code={`outputs/
  validation_spec.json
  reconciliation_results.csv
  failed_checks.csv
  validation_report.md
  catalog_doc_patch.md

# borrow: dbt-audit-helper,
# Great Expectations, dbt-codegen`}
        />
      </div>
    ),
  },
  {
    id: 11,
    badge: "Verify",
    title: "Verification checklist",
    subtitle: "The analyst remains accountable for the claim.",
    content: (
      <div className="mt-2">
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { k: "Metric", v: "Accurate to the business?" },
            { k: "Data", v: "Right grain and scope?" },
            { k: "SQL", v: "Joins fan out? Filters applied?" },
            { k: "Story", v: "Supported strictly by evidence?" },
          ].map((d) => (
            <div key={d.k} className="border border-slate-200 rounded-lg p-3 text-center">
              <div className="font-bold text-blue-700 text-sm mb-1">{d.k}</div>
              <div className="text-xs text-slate-500">{d.v}</div>
            </div>
          ))}
        </div>
        <CodeBlock
          code={`"Before I use this answer, list every assumption,
source file, query, unresolved risk, and manual check.
Separate what you confirmed from what you inferred."`}
        />
      </div>
    ),
  },
  {
    id: 12,
    full: true,
    content: (
      <div className="flex flex-col h-full w-full items-center justify-center text-center p-16 bg-slate-900 text-white">
        <div className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-full text-sm mb-8">CONTINUE</div>
        <h2 className="text-4xl font-bold mb-6">Make it a habit</h2>
        <p className="text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
          Copy the skills into your own repo, add a root AGENTS.md, keep writes gated behind approval, and run the
          verification checklist on real work.
        </p>
        <div className="flex gap-4 flex-wrap justify-center text-sm">
          <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Adopt the loop</span>
          <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Reuse the skills</span>
          <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Safe by default</span>
          <span className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700">Eval in CI</span>
        </div>
        <div className="mt-12 text-xs text-slate-500">docs/next-steps.md · labs/06-verification-checklist.md</div>
      </div>
    ),
  },
];
