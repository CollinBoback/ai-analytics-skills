import React from "react";
import { cn } from "../utils/cn";

export type SlideData = {
  id: number;
  title?: string;
  subtitle?: string;
  badge?: string;
  content: React.ReactNode;
};

// Reusable UI components for slides
export const CodeBlock = ({ code, language = "sql", className }: { code: string, language?: string, className?: string }) => (
  <pre className={cn("p-4 rounded-md bg-[#0f172a] text-slate-50 text-sm font-mono overflow-auto", className)}>
    <code>{code}</code>
  </pre>
);

export const StepBox = ({ number, title, children }: { number: number | string, title: string, children: React.ReactNode }) => (
  <div className="flex gap-4 mb-6">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
      {number}
    </div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <div className="text-slate-600">{children}</div>
    </div>
  </div>
);

export const slides: SlideData[] = [
  {
    id: 1,
    content: (
      <div className="flex h-full w-full">
        <div className="w-1/2 flex flex-col justify-center pr-12">
          <div className="inline-block px-4 py-2 bg-blue-500 text-white font-bold rounded-full text-sm mb-12 self-start w-auto">WORKSHOP</div>
          <h1 className="text-5xl font-bold mb-6 text-slate-900 leading-tight">Codex in VS Code<br/>for BI analysis</h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Install the extension, attach useful context, ask better analytics questions, and verify every answer before it reaches a dashboard.
          </p>
          <p className="text-lg font-semibold text-blue-200 uppercase tracking-widest">For BI analysts and analytics engineers</p>
          
          <div className="mt-auto text-xs text-slate-400">Sources: OpenAI Codex IDE docs and Visual Studio Marketplace, accessed Jun 17, 2026</div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-8 bg-slate-50 relative">
          <div className="absolute top-4 right-4 flex gap-2">
           <div className="px-4 py-1 bg-slate-900 text-white rounded-full text-xs">Install</div>
           <div className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs">Orient</div>
           <div className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs">Ask</div>
           <div className="px-4 py-1 bg-white border border-slate-200 rounded-full text-xs">Verify</div>
          </div>
          <div className="absolute top-12 right-4 bg-slate-100 text-slate-500 text-xs px-4 py-1 rounded-full w-64 text-center">Kickoff | labs/00-kickoff.md</div>
          
          <div className="w-full max-w-sm bg-[#0f172a] rounded-lg shadow-2xl overflow-hidden text-sm">
             <div className="bg-[#1e293b] px-4 py-2 border-b border-[#334155] flex items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
               <div className="text-slate-400 ml-4 font-mono text-xs">analytics/revenue_retention.sql</div>
             </div>
             <div className="p-4 flex">
                <div className="w-1/2 text-emerald-300 font-mono text-xs leading-relaxed">
                  select cohort_month,<br/>
                  &nbsp;&nbsp;sum(revenue) as revenue,<br/>
                  &nbsp;&nbsp;count(distinct customer_id)<br/>
                  as customers<br/>
                  from marts.fct_revenue<br/>
                  <br/>
                  where date_week &gt;= current_date -<br/>
                  84<br/>
                  group by 1<br/>
                </div>
                <div className="w-1/2 border-l border-slate-700 pl-4 ml-4">
                  <div className="text-white font-bold mb-4">Codex</div>
                  <div className="bg-white text-slate-800 p-3 rounded-md mb-4 text-xs font-medium">
                    Why did net revenue drop last week? Use @revenue_retention.sql and show the validation query.
                  </div>
                  <div className="bg-blue-50 text-blue-900 p-3 rounded-md text-xs">
                    Draft plan<br/>
                    1. Trace metric definition<br/>
                    2. Segment by cohort<br/>
                    3. Check exclusions<br/>
                    4. Run validation
                  </div>
                </div>
             </div>
          </div>
          <div className="absolute bottom-16 left-8 right-8 text-slate-600 border-t-2 border-blue-400 pt-4 font-medium text-lg text-center">
            Outcome: each analyst leaves with one installed tool and six reusable prompt patterns.
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    badge: "WORKSHOP MAP",
    title: "From install to verified insight",
    subtitle: "A 75-90 minute path for analysts who already know the data domain.",
    content: (
      <div className="flex flex-col h-full mt-8">
        <div className="flex gap-4 mb-20 justify-center">
           {[
             { num: "01", title: "Install", desc: "Marketplace, sign-in, sidebar, workspace" },
             { num: "02", title: "Orient", desc: "Files, context, modes, commands" },
             { num: "03", title: "Ask", desc: "Metric, SQL, variance, dashboard prompts" },
             { num: "04", title: "Verify", desc: "Queries, assumptions, safeguards, next steps" },
           ].map((step, i) => (
             <React.Fragment key={i}>
                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex justify-center items-center font-bold mb-4">{step.num}</div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm text-center">{step.desc}</p>
                </div>
                {i < 3 && <div className="flex-1 flex justify-center items-center text-slate-300">-&gt;</div>}
             </React.Fragment>
           ))}
        </div>
        
        <div className="bg-slate-50 p-6 rounded-lg mb-8">
           <div className="inline-block px-4 py-1 bg-blue-800 text-white rounded-full text-xs font-bold mb-4">GUIDED FLOW</div>
           <h2 className="text-2xl font-bold mb-2">Run the deck from the repo checkpoints</h2>
           <p className="text-slate-600 mb-6">Use one step at a time: show the move, let analysts try it, then verify before advancing.</p>
           
           <div className="grid grid-cols-4 gap-4">
             {[
               { num: "01", title: "Install", time: "10 min", lab: "labs/01-install.md", desc: "Checkpoint before the next section." },
               { num: "02", title: "Orient", time: "15 min", lab: "labs/02-workspace.md", desc: "Checkpoint before the next section." },
               { num: "03", title: "Ask", time: "30 min", lab: "labs/03-ask-patterns.md", desc: "Checkpoint before the next section." },
               { num: "04", title: "Verify", time: "20 min", lab: "labs/06-verification.md", desc: "Checkpoint before the next section." },
             ].map((box, i) => (
               <div key={i} className="border border-slate-200 p-4 rounded-lg bg-white relative shadow-sm">
                 <div className="absolute -top-3 left-4 bg-blue-900 text-white px-3 py-1 rounded-full text-xs">{box.num}</div>
                 <h4 className="font-bold mt-2 mb-2 text-lg">{box.title}</h4>
                 <div className="text-slate-600 text-sm leading-relaxed">
                   {box.time}<br/>
                   <span className="text-slate-400">{box.lab}</span><br/><br/>
                   {box.desc}
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg flex items-center gap-8">
          <div className="font-bold text-blue-900 w-1/4">Entry mode if the room is uneven</div>
          <div className="flex-1 flex gap-4">
            <div className="flex-1">
              <div className="bg-white border border-blue-200 rounded-full text-center py-1 text-xs text-blue-800 font-bold mb-2">1 Guided path</div>
              <p className="text-xs text-slate-600 text-center">Use the deck as written</p>
            </div>
            <div className="flex-1">
              <div className="bg-white border border-blue-200 rounded-full text-center py-1 text-xs text-blue-800 font-bold mb-2">2 Context dump</div>
              <p className="text-xs text-slate-600 text-center">Paste known setup/issues</p>
            </div>
            <div className="flex-1">
              <div className="bg-white border border-blue-200 rounded-full text-center py-1 text-xs text-blue-800 font-bold mb-2">3 Best guess</div>
              <p className="text-xs text-slate-600 text-center">Infer gaps and label assumptions</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    badge: "BI WORKFLOW FIT",
    title: "Codex works best near the evidence",
    subtitle: "Analytics questions improve when Codex can inspect definitions, SQL, docs, and selected context.",
    content: (
      <div className="mt-16 flex flex-col items-center">
        <div className="flex justify-between items-center w-full max-w-5xl mb-16 relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-800 -z-10 transform -translate-y-1/2"></div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8 w-64 shadow-md z-10">
            <h3 className="text-xl font-bold mb-4">Analytics repo</h3>
            <ul className="text-slate-600 space-y-2 text-lg">
              <li>dbt models</li>
              <li>metric YAML</li>
              <li>notebooks</li>
            </ul>
          </div>
          
          <div className="border bg-blue-900 text-white rounded-xl p-8 w-72 shadow-xl z-10 transform scale-105">
            <h3 className="text-2xl font-bold mb-4 text-white">Codex in VS Code</h3>
            <ul className="text-blue-100 space-y-2 text-lg">
              <li>open files</li>
              <li>selected ranges</li>
              <li>@file references</li>
            </ul>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl p-8 w-64 shadow-md z-10">
            <h3 className="text-xl font-bold mb-4">Verified answer</h3>
            <ul className="text-slate-600 space-y-2 text-lg">
              <li>SQL checks</li>
              <li>assumptions</li>
              <li>dashboard notes</li>
            </ul>
          </div>
        </div>
        
        <div className="w-full max-w-4xl border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm mt-8">
           <div className="h-2 bg-cyan-400 w-full"></div>
           <div className="p-6">
             <h4 className="font-bold text-lg mb-4">Typical BI question</h4>
             <CodeBlock 
               code={"Use @marts/revenue.sql and @metrics.yml to explain how net revenue is calculated. Then list \ntwo validation queries before changing the dashboard."} 
               className="bg-slate-50 text-slate-800 border border-slate-100" 
             />
           </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    badge: "INSTALL IN 5 MINUTES",
    title: "Download the Codex VS Code extension",
    subtitle: "Use the official Marketplace listing and sign in before the first exercise.",
    content: (
      <div className="flex mt-12">
        <div className="w-3/5 pr-12">
          <StepBox number={1} title="Open Extensions">
            In VS Code, open Extensions and search for "Codex - OpenAI's coding agent".
          </StepBox>
          <StepBox number={2} title="Install OpenAI">
            Confirm the publisher is OpenAI. The extension id is <code>openai.chatgpt</code>.
          </StepBox>
          <StepBox number={3} title="Restart if needed">
            Codex appears in the sidebar. Restart VS Code if the panel is missing.
          </StepBox>
          <StepBox number={4} title="Sign in">
            Use your ChatGPT account or API key, depending on your team setup.
          </StepBox>
        </div>
        <div className="w-2/5">
          <div className="border border-slate-200 rounded-xl p-6 shadow-sm bg-white">
            <h3 className="font-bold text-2xl mb-6">Marketplace locator</h3>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg text-slate-600 font-mono text-sm mb-8">
              marketplace.visualstudio.com
            </div>
            <div className="mb-2 text-sm text-blue-700 font-bold">Search</div>
            <div className="bg-blue-900 text-white font-bold p-4 rounded-lg mb-8 shadow-md">
              Codex - OpenAI's coding agent
            </div>
            
            <p className="text-slate-700 font-mono text-sm mb-2">Quick Open alternative: ext install openai.chatgpt</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    badge: "FIRST SETUP",
    title: "Open a BI-ready workspace",
    subtitle: "Codex can answer better questions when the repo tells it how analysis is built and verified.",
    content: (
      <div className="mt-8">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-8">
          <table className="w-full text-left bg-white">
            <thead className="bg-[#0047b3] text-white">
              <tr>
                <th className="p-4 font-bold text-lg w-1/3">Setup item</th>
                <th className="p-4 font-bold text-lg w-1/3">What to open</th>
                <th className="p-4 font-bold text-lg w-1/3">Why it matters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium text-slate-800">Repo or folder</td>
                <td className="p-4 text-slate-600 font-mono text-sm">analytics, dbt,<br/>notebooks, docs</td>
                <td className="p-4 text-slate-600">Gives Codex durable<br/>project context</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Key files</td>
                <td className="p-4 text-slate-600 font-mono text-sm">metrics.yml, schema.yml,<br/>model.sql</td>
                <td className="p-4 text-slate-600">Grounds definitions<br/>and lineage</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Guidance</td>
                <td className="p-4 text-slate-600 font-mono text-sm">AGENTS.md or README</td>
                <td className="p-4 text-slate-600">Names conventions,<br/>commands, review rules</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Validation path</td>
                <td className="p-4 text-slate-600">test query, dbt command,<br/>notebook cell</td>
                <td className="p-4 text-slate-600">Turns answers into<br/>checked work</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-800">Sample data</td>
                <td className="p-4 text-slate-600">masked CSV or dev<br/>warehouse</td>
                <td className="p-4 text-slate-600">Keeps sensitive production<br/>data out of prompts</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 select-all font-medium text-blue-900 shadow-sm mx-8 text-center text-lg">
          Workshop move: ask Codex, "Read the repo guidance and tell me which files define revenue, retention, and active customer metrics. Do not edit anything."
        </div>
      </div>
    )
  },
  {
    id: 6,
    badge: "CONTEXT",
    title: "Give Codex the right evidence",
    subtitle: "Short prompts work when the editor context is precise.",
    content: (
      <div className="flex mt-12 gap-8 items-center h-full">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex bg-white border border-slate-200 rounded-lg p-4 shadow-sm items-center h-16">
             <div className="w-1/3 font-bold text-blue-800">Open file</div>
             <div className="flex-1 font-mono text-slate-600">model.sql</div>
             <div className="w-16 h-0.5 bg-blue-800 -mr-12"></div>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-4 shadow-sm items-center h-16">
             <div className="w-1/3 font-bold text-blue-800">Selected range</div>
             <div className="flex-1 font-mono text-slate-600">failed query</div>
             <div className="w-16 h-0.5 bg-blue-800 -mr-12"></div>
          </div>
          <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-sm items-center h-16 z-10 transform scale-105 border-l-4 border-l-blue-600">
             <div className="w-1/3 font-bold text-blue-800">@file</div>
             <div className="flex-1 font-mono text-slate-800">@metrics.yml</div>
             <div className="w-24 h-2 bg-blue-800 -mr-28 relative"><div className="absolute right-0 -top-2 w-0 h-0 border-l-[16px] border-l-blue-800 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent"></div></div>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-4 shadow-sm items-center h-16">
             <div className="w-1/3 font-bold text-blue-800">Command</div>
             <div className="flex-1 font-mono text-slate-600">add file to thread</div>
             <div className="w-16 h-0.5 bg-blue-800 -mr-12"></div>
          </div>
          <div className="flex bg-white border border-slate-200 rounded-lg p-4 shadow-sm items-center h-16">
             <div className="w-1/3 font-bold text-blue-800">/auto-context</div>
             <div className="flex-1 font-mono text-slate-600">recent files</div>
             <div className="w-16 h-0.5 bg-blue-800 -mr-12"></div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col ml-8">
           <div className="bg-[#003399] rounded-xl p-8 text-white shadow-xl min-h-[350px]">
              <h3 className="text-2xl font-bold mb-6">Codex prompt composer</h3>
              <p className="font-mono text-blue-200 mb-6 text-sm">Ask with context, not memory:</p>
              <p className="font-mono text-lg leading-relaxed text-blue-50">
                Use @metrics.yml and the selected 
                SQL to explain why 
                active_customer_count excludes 
                trial accounts. Show the exact 
                line that defines it and a 
                validation query.
              </p>
           </div>
           <p className="font-bold text-lg mt-8 px-4 text-slate-800">Useful commands: add selected range, add file, new chat, open sidebar.</p>
        </div>
      </div>
    )
  },
  {
    id: 7,
    badge: "MODES",
    title: "Pick the smallest useful amount of autonomy",
    subtitle: "The right mode depends on whether you want an explanation, a local change, or a delegated job.",
    content: (
      <div className="mt-8 flex flex-col space-y-12">
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-left bg-white">
            <thead className="bg-[#0047b3] text-white">
              <tr>
                <th className="p-4 font-bold text-lg w-1/4">Mode</th>
                <th className="p-4 font-bold text-lg border-l border-blue-600 w-1/4">Use it for</th>
                <th className="p-4 font-bold text-lg border-l border-blue-600 w-1/4">Good BI examples</th>
                <th className="p-4 font-bold text-lg border-l border-blue-600 w-1/4">Guardrail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold text-slate-800 text-lg">Chat</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 leading-relaxed">Planning and<br/>questions</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 leading-relaxed">Explain metric lineage;<br/>compare SQL definitions</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 font-medium">No edits<br/>needed</td>
              </tr>
              <tr className="bg-blue-50/50">
                <td className="p-4 font-bold text-blue-900 border-l-4 border-l-blue-600 text-lg">Agent</td>
                <td className="p-4 text-slate-800 border-l border-slate-100 leading-relaxed">Local file reads,<br/>edits, commands</td>
                <td className="p-4 text-slate-800 border-l border-slate-100 leading-relaxed">Fix dbt model; run tests;<br/>update docs</td>
                <td className="p-4 text-slate-800 border-l border-slate-100 font-medium">Review command<br/>output and diffs</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-800 text-lg">Full Access</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 leading-relaxed">Network or broad<br/>access without prompts</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 leading-relaxed">Rare for<br/>workshops</td>
                <td className="p-4 text-slate-600 border-l border-slate-100 font-medium">Use only with explicit<br/>team approval</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-[#0f172a] text-white p-6 rounded-xl flex items-center justify-center font-bold text-lg shadow-xl cursor-default">
           Facilitator quick-select: ask the room for Chat, Agent, or Full Access, then proceed. 
           (Recommend: Agent)
        </div>
      </div>
    )
  },
  {
    id: 8,
    badge: "PROMPT PATTERN 1",
    title: "Explain a metric without hand-waving",
    subtitle: "Use this when a stakeholder asks what a KPI really means.",
    content: (
      <div className="flex mt-8 gap-8 items-start">
         <div className="w-1/2 border border-slate-200 shadow-sm rounded-xl overflow-hidden min-h-[350px]">
            <div className="bg-blue-800 h-2 w-full"></div>
            <div className="bg-white p-6 h-full">
              <h3 className="font-bold text-xl mb-6">Prompt starter</h3>
              <div className="font-mono text-slate-700 text-sm leading-relaxed p-4 bg-slate-50 rounded-lg border border-slate-100">
                Using @metrics.yml, @marts/fct_orders.sql, and the <br/>
                selected dashboard SQL, explain `net_revenue`.<br/>
                <br/>
                Return:<br/>
                1. Plain-English definition<br/>
                2. Source tables and joins<br/>
                3. Filters and exclusions<br/>
                4. Known caveats<br/>
                5. One validation query I can run
              </div>
            </div>
         </div>
         <div className="w-1/2 border border-slate-200 shadow-sm rounded-xl bg-white p-8 min-h-[350px]">
             <h3 className="font-bold text-3xl mb-8">What good output includes</h3>
             <ul className="space-y-4">
               {[
                 "Definition in business terms",
                 "Exact file references and lines",
                 "Assumptions called out explicitly",
                 "Validation query or test path",
                 "Caveats ready for dashboard notes"
               ].map((item, i) => (
                 <li key={i} className="flex items-center gap-4 text-lg text-slate-700">
                   <div className="w-2 h-2 rounded-full bg-blue-700"></div>
                   {item}
                 </li>
               ))}
             </ul>
         </div>
      </div>
    )
  },
  {
    id: 9,
    badge: "PROMPT PATTERN 2",
    title: "Debug SQL or dbt errors in place",
    subtitle: "Select the failing query or error first so Codex does not guess.",
    content: (
      <div className="flex mt-8 gap-10">
        <div className="w-1/2 bg-[#0f172a] p-8 rounded-xl text-white shadow-xl py-12">
          <div className="font-mono text-sm text-slate-300 leading-relaxed mb-12">
            dbt run --select mart_revenue<br/><br/>
            <span className="text-red-400">Database Error<br/>column "account_status" does not exist</span><br/><br/>
            select customer_id,<br/>
            &nbsp;&nbsp;account_status,<br/>
            &nbsp;&nbsp;sum(revenue) as revenue<br/>
            from stg_orders<br/>
            group by 1, 2
          </div>
          <div className="text-lg font-bold text-white border-t border-slate-700 pt-6">
            Ask Codex to isolate the cause, not just rewrite the query.
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-6 pt-4">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="border border-slate-200 rounded-lg p-6 flex gap-4 items-center bg-white shadow-sm">
              <span className="text-blue-800 text-3xl font-bold">1</span>
              <span className="font-bold text-lg">Read<br/>selected error</span>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 flex gap-4 items-center bg-white shadow-sm">
              <span className="text-blue-800 text-3xl font-bold">2</span>
              <span className="font-bold text-lg">Trace field<br/>lineage</span>
            </div>
            <div className="border border-blue-200 rounded-lg p-6 flex gap-4 items-center bg-blue-50 shadow-sm">
              <span className="text-blue-800 text-3xl font-bold">3</span>
              <span className="font-bold text-lg">Propose<br/>minimal fix</span>
            </div>
            <div className="border border-slate-200 rounded-lg p-6 flex gap-4 items-center bg-white shadow-sm">
              <span className="text-blue-800 text-3xl font-bold">4</span>
              <span className="font-bold text-lg">Run<br/>validation</span>
            </div>
          </div>
          
          <div className="border-t-4 border-red-800 rounded-lg shadow-sm border-x border-b border-slate-200 overflow-hidden bg-white">
             <div className="p-6">
               <h4 className="font-bold mb-4 text-lg">Prompt starter</h4>
               <p className="font-mono text-slate-700 text-sm">
                 I selected a failing SQL block and the error. Find the likely root cause, name the file that introduced it, propose the smallest fix, and tell me the exact validation command to run.
               </p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 10,
    badge: "PROMPT PATTERN 3",
    title: "Investigate a variance with a plan first",
    subtitle: "Ask Codex for hypotheses and tests before asking it to write final SQL.",
    content: (
      <div className="flex mt-8 gap-8 items-stretch h-[450px]">
        {/* Left Side: Chart Mockup */}
        <div className="w-1/2 border border-slate-200 rounded-xl p-8 bg-white shadow-sm flex flex-col">
          <h3 className="font-bold text-2xl mb-8">Illustrative weekly revenue</h3>
          <div className="flex-1 flex items-end justify-between relative pl-12 pb-8 pr-4">
             {/* Y-axis labels */}
             <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-slate-500 font-mono">
               <span>125</span>
               <span>120</span>
               <span>115</span>
               <span>110</span>
               <span>105</span>
               <span>100</span>
               <span>95</span>
               <span>90</span>
               <span>85</span>
               <span>80</span>
             </div>
             
             {/* Y-axis label vertical */}
             <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 -rotate-90 origin-center text-slate-800 font-bold text-xl tracking-wide whitespace-nowrap">
               Indexed revenue
             </div>

             {/* Grid lines */}
             <div className="absolute left-10 right-4 top-0 bottom-8 flex flex-col justify-between z-0">
               {[...Array(10)].map((_, i) => (
                 <div key={i} className="w-full border-t border-slate-200 h-0"></div>
               ))}
             </div>

             {/* Bars */}
             <div className="w-16 h-[50%] bg-[#003399] z-10 flex items-end justify-center"><span className="absolute -bottom-6 text-sm font-medium text-slate-600">W-5</span></div>
             <div className="w-16 h-[65%] bg-[#003399] z-10 flex items-end justify-center"><span className="absolute -bottom-6 text-sm font-medium text-slate-600">W-4</span></div>
             <div className="w-16 h-[60%] bg-[#003399] z-10 flex items-end justify-center"><span className="absolute -bottom-6 text-sm font-medium text-slate-600">W-3</span></div>
             <div className="w-16 h-[80%] bg-[#003399] z-10 flex items-end justify-center"><span className="absolute -bottom-6 text-sm font-medium text-slate-600">W-2</span></div>
             <div className="w-16 h-[40%] bg-[#003399] z-10 flex items-end justify-center"><span className="absolute -bottom-6 text-sm font-medium text-slate-600">W-1</span></div>
          </div>
        </div>

        {/* Right Side: Prompt */}
        <div className="w-1/2 flex flex-col justify-between">
          <div className="border border-slate-200 border-t-8 border-t-[#0047b3] rounded-xl bg-white shadow-sm p-8">
            <h3 className="font-bold text-xl mb-6">Prompt starter</h3>
            <div className="font-mono text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
{`Revenue dropped last week. Before writing 
SQL, propose an investigation plan using 
@metrics.yml and @revenue.sql.

Include:
- 5 hypotheses
- segmentation dimensions
- queries to confirm/refute
- what would make each result actionable`}
            </div>
          </div>
          
          <div className="p-6">
            <p className="font-bold text-xl text-slate-800 leading-relaxed">
              Good BI use: Codex drafts the analysis plan; you decide which hypothesis matches the business context.
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 11,
    badge: "VERIFICATION",
    title: "Review output like an analyst",
    subtitle: "Codex can accelerate the work, but the analyst remains accountable for the claim.",
    content: (
      <div className="mt-8 flex flex-col items-center h-full">
         <div className="flex-1 w-full flex relative my-12 py-12">
            <div className="absolute inset-0 flex items-center justify-center">
               {/* Center Diamond */}
               <div className="w-48 h-48 bg-[#003399] transform rotate-45 flex items-center justify-center shadow-xl z-20">
                 <span className="transform -rotate-45 text-white font-bold text-3xl">Answer</span>
               </div>
               
               {/* Surrounding Nodes */}
               <div className="absolute top-0 w-48 h-20 bg-[#002277] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10 transform -translate-y-8">Metric</div>
               <div className="absolute bottom-0 w-48 h-20 bg-[#00aadd] rounded-full flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg z-10 transform translate-y-8">SQL</div>
               <div className="absolute left-1/4 w-40 h-20 bg-[#003399] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">Story</div>
               <div className="absolute right-1/4 w-40 h-20 bg-[#003399] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg z-10">Data</div>
            </div>
         </div>
         
         <div className="w-full mt-auto">
            <div className="border border-slate-200 border-t-8 border-t-[#00aadd] bg-white rounded-xl shadow-sm p-6 flex gap-8 items-center">
              <div className="font-bold text-slate-800 w-1/4 text-center">Reviewer prompt</div>
              <div className="flex-1 text-slate-600 font-medium">
                Before I use this answer, list every assumption, source file, query, unresolved risk, and manual check.
              </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 12,
    badge: "HANDS-ON LAB",
    title: "Answer one analytics question end to end",
    subtitle: "The deck controls pacing; the GitLab repo holds the instructions, demo files, and evidence checklist.",
    content: (
      <div className="flex flex-col mt-12 gap-10">
        <div className="grid grid-cols-5 gap-4">
          {[
            { tag: "0-5", title: "Open workspace", desc: "Clone or open the repo and confirm Codex is signed in.", repo: "labs/01-install.md" },
            { tag: "5-15", title: "Ask for lineage", desc: "Attach SQL + metric docs; ask for fields, joins, and assumptions.", repo: "labs/03-explain-metric.md" },
            { tag: "15-30", title: "Debug SQL", desc: "Find the failing join/filter and propose a validation query.", repo: "demos/debug-sql.sql", focus: true },
            { tag: "30-40", title: "Review answer", desc: "Check metric, data, SQL, story, and caveats.", repo: "labs/06-verification.md" },
            { tag: "40-45", title: "Document", desc: "Write the stakeholder update with evidence and caveats.", repo: "labs/05-variance-review.md" }
          ].map((col, i) => (
             <div key={i} className={cn("border border-slate-200 rounded-xl p-6 flex flex-col bg-white shadow-sm h-full", col.focus && "bg-blue-50 border-blue-200")}>
               <div className="bg-[#002266] text-white text-xs font-bold w-16 text-center py-1 rounded-full mb-6">{col.tag}</div>
               <h4 className="font-bold text-lg mb-4">{col.title}</h4>
               <p className="text-sm text-slate-600 mb-8 flex-1 leading-relaxed">{col.desc}</p>
               <div className="text-[10px] text-blue-700 font-bold font-mono text-center mt-auto">{col.repo}</div>
             </div>
          ))}
        </div>
        
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl py-6 px-8 text-center shadow-sm mx-auto w-4/5 text-lg font-medium text-blue-900">
          Lab question: Why did weekly active customers change, and what evidence should go in the stakeholder update?
        </div>
      </div>
    )
  },
  {
    id: 13,
    badge: "PROMPT RECIPES",
    title: "Six reusable starters for BI work",
    subtitle: "Pick one, replace placeholders with repo evidence, and ask for verification steps before sharing.",
    content: (
      <div className="mt-8 flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-6">
          {[
            { num: "1", title: "Explain a KPI", desc: "Use @metric.md and @model.sql. Explain fields, joins, grain, assumptions, and caveats." },
            { num: "2", title: "Debug SQL", desc: "Find the likely failure, propose the smallest fix, and include a validation query.", active: true },
            { num: "3", title: "Review a change", desc: "Review this diff for metric risk, downstream dashboard impact, and missing tests." },
            { num: "4", title: "Document context", desc: "Draft a concise dashboard note with source tables, caveats, and owner follow-ups." },
            { num: "5", title: "Investigate variance", desc: "Plan the investigation first, list hypotheses, then test the top two with SQL.", active: true },
            { num: "6", title: "Stakeholder update", desc: "Summarize what changed, why it changed, evidence strength, and next action." }
          ].map((recipe, i) => (
             <div key={i} className={cn("border border-slate-200 bg-white rounded-xl p-6 shadow-sm", recipe.active && "bg-slate-50")}>
               <div className="bg-[#003399] text-white text-xs font-bold w-16 text-center py-1 rounded-full mb-4">{recipe.num}</div>
               <h4 className="font-bold text-lg mb-3">{recipe.title}</h4>
               <p className="text-sm text-slate-600 leading-relaxed min-h-[60px]">{recipe.desc}</p>
             </div>
          ))}
        </div>
        <div className="text-center font-bold text-blue-900 mt-4">
          Quick-select response: participants can answer with 1-6, then customize the starter in the repo lab.
        </div>
      </div>
    )
  },
  {
    id: 14,
    badge: "SAFEGUARDS",
    title: "Protect data and keep control of changes",
    subtitle: "A good analytics prompt is specific without exposing unnecessary sensitive data.",
    content: (
      <div className="flex mt-12 gap-12">
        <div className="w-1/2 flex flex-col gap-6">
           {[
             { title: "Use samples", desc: "Prefer masked examples, row counts, schemas, and summaries over raw sensitive records.", active: true },
             { title: "Review commands", desc: "Approve local commands only when you understand what will run and where." },
             { title: "Keep scope tight", desc: "Ask for the method or query pattern when production access is not needed." },
             { title: "Document uncertainty", desc: "Make caveats visible in dashboard notes, PRs, or stakeholder updates." }
           ].map((item, i) => (
             <div key={i} className={cn("border border-slate-200 rounded-xl p-4 px-6 flex items-center gap-6 shadow-sm", item.active ? "bg-blue-50" : "bg-white")}>
               <div className="font-bold text-blue-900 w-1/3 text-lg">{item.title}</div>
               <div className="text-sm text-slate-600 leading-relaxed flex-1">{item.desc}</div>
             </div>
           ))}
        </div>
        <div className="w-1/2 flex flex-col justify-between">
           <div className="bg-red-50/50 border border-red-100 rounded-2xl p-10 shadow-sm flex-1">
             <h3 className="text-3xl font-bold text-red-900 mb-8">Do not paste</h3>
             <ul className="space-y-6">
               {[
                 "Customer identifiers",
                 "Personal or regulated fields",
                 "Secrets or credentials",
                 "Unapproved production extracts",
                 "Data you would not put in a PR"
               ].map((item, i) => (
                 <li key={i} className="flex gap-4 items-center">
                   <div className="w-3 h-3 rounded-full bg-red-800 flex-shrink-0"></div>
                   <span className="text-xl text-red-900">{item}</span>
                 </li>
               ))}
             </ul>
           </div>
           
           <div className="mt-8 text-xl font-bold text-slate-900 leading-snug">
             Team guidance belongs in AGENTS.md, README files, or equivalent repo instructions so Codex sees it every time.
           </div>
        </div>
      </div>
    )
  },
  {
    id: 15,
    badge: "RECOVERY FLOW",
    title: "When the workshop stalls, recover predictably",
    subtitle: "Answer the interruption, restate the checkpoint, choose one fix, and continue.",
    content: (
      <div className="flex flex-col mt-12 gap-12">
        <div className="flex justify-between items-stretch gap-6 relative px-8">
           <div className="absolute top-1/2 left-8 right-8 h-1 bg-cyan-400 -z-10"></div>
           
           {[
             { num: "1", title: "Name the stuck state", desc: "Install, sign-in, context, prompt, result, or verification." },
             { num: "2", title: "Use one fast fix", desc: "Pair up, switch to web view, use observer mode, or reset the thread.", active: true },
             { num: "3", title: "Resume checkpoint", desc: "Return to the visible progress rail and continue the lab board." }
           ].map((step, i) => (
             <div key={i} className={cn("flex-1 bg-white border border-slate-200 rounded-xl p-8 shadow-sm flex flex-col", step.active && "bg-slate-50")}>
               <div className="bg-[#002266] text-white text-xs font-bold w-12 text-center py-1 rounded-full mb-6">{step.num}</div>
               <h4 className="font-bold text-xl mb-4">{step.title}</h4>
               <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
             </div>
           ))}
        </div>
        
        <div className="border border-slate-200 bg-white rounded-xl p-8 shadow-sm text-center mx-16 flex flex-col items-center justify-center">
          <p className="font-bold text-[#002266] text-xl mb-6">If the fix takes more than two minutes, switch that participant to observer mode and keep the room moving.</p>
          <p className="text-xs text-slate-400 max-w-3xl">Repo fallback: docs/troubleshooting.md | Checkpoint log: labs/checkpoints.md | Facilitator note: answer meta questions directly, then resume the pending lab step.</p>
        </div>
      </div>
    )
  },
  {
    id: 16,
    badge: "CLOSEOUT",
    title: "Make Codex useful by turning today's moves into a repeatable analytics habit.",
    content: (
      <div className="flex flex-col mt-16 h-full justify-between">
        
        <div className="grid grid-cols-4 gap-6 px-4">
           {[
             { title: "Install", desc: "Codex - OpenAI's coding agent", bg: "bg-cyan-500" },
             { title: "Attach", desc: "Open files, selected SQL, @file refs", bg: "bg-[#003399]" },
             { title: "Ask", desc: "Metric, debug, variance, review prompts", bg: "bg-[#002277]" },
             { title: "Verify", desc: "Run checks, name assumptions, document caveats", bg: "bg-[#001155]" }
           ].map((box, i) => (
             <div key={i} className={cn("rounded-xl p-8 text-white shadow-lg h-48 flex flex-col justify-center", box.bg)}>
               <h3 className="text-3xl font-bold mb-4">{box.title}</h3>
               <p className="text-lg opacity-90 leading-snug">{box.desc}</p>
             </div>
           ))}
        </div>
        
        <div className="bg-slate-50/50 rounded-xl p-8 mx-4 border border-slate-100 flex-1 mt-12 relative pb-16">
          <h3 className="text-2xl font-bold mb-6 text-slate-800">Sources used</h3>
          <ul className="space-y-4">
            {[
              "OpenAI Developers: Codex IDE extension - https://developers.openai.com/codex/ide",
              "OpenAI Developers: IDE features, commands, and slash commands",
              "OpenAI Developers: Prompting and Customization",
              "Visual Studio Marketplace: Codex - OpenAI's coding agent - itemName=openai.chatgpt"
            ].map((src, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-600">
                <div className="w-2 h-2 rounded-full bg-[#003399]"></div>
                {src}
              </li>
            ))}
          </ul>
          
          <div className="absolute bottom-6 right-8 text-sm text-blue-300 font-bold">Jun 17, 2026</div>
          <div className="absolute bottom-6 left-8 text-xs text-slate-400">Facilitation structure: user-provided workshop-facilitation SKILL.md</div>
        </div>
      </div>
    )
  }
];
