import React, { useState } from "react";
import { CheckCircle, Clock, Users, MessageSquare, AlertTriangle, ArrowRight, ArrowLeft, PlayCircle } from "lucide-react";
import { cn } from "../utils/cn";

const WORKSHOP_STEPS = [
  {
    id: "entry",
    phase: "Kickoff",
    progressLabel: "Setup 1/1",
    title: "Establish Entry Mode",
    script: "Quick heads-up: this should take about 75-90 minutes and guide us through 4 main phases. How do we want to run this today?",
    options: ["1. Guided Mode (Step-by-step)", "2. Context Dump (Fast track)", "3. Best Guess (Assumptions)"],
    fallback: "If the room is mixed, default to Guided Mode (1)."
  },
  {
    id: "install_1",
    phase: "Install",
    progressLabel: "Install Q1/2",
    title: "Verify Marketplace Access",
    script: "Has everyone successfully found and installed 'Codex - OpenAI\\'s coding agent' from the VS Code Marketplace?",
    options: ["1. All good", "2. Blocked by firewall", "3. Need more time"],
    fallback: "If stalled for >2 mins, switch blocked users to Observer Mode (pairing)."
  },
  {
    id: "install_2",
    phase: "Install",
    progressLabel: "Install Q2/2",
    title: "Authentication Check",
    script: "Are we all signed in and seeing the Codex sidebar panel?",
    options: ["1. Ready to go", "2. Auth errors", "3. Panel missing"],
    fallback: "Sidebar missing? Have them restart VS Code."
  },
  {
    id: "orient_1",
    phase: "Orient",
    progressLabel: "Context Q1/1",
    title: "Set Autonomy Mode",
    script: "Open the BI workspace. What level of autonomy should we give Codex for this lab?",
    options: ["1. Chat (Planning only)", "2. Agent (Local edits)", "3. Full Access"],
    decision: true,
    fallback: "Strongly recommend Agent mode (2) for this exercise."
  },
  {
    id: "ask_decision",
    phase: "Ask Patterns",
    progressLabel: "Decision Point",
    title: "Select First Prompt Recipe",
    script: "We have 6 BI prompt patterns. Which one represents your most common daily challenge? We'll run this one first.",
    options: ["1. Explain a KPI", "2. Debug SQL", "3. Investigate Variance", "Other (specify)"],
    decision: true,
    fallback: "If no consensus, pick 'Debug SQL' (2) as it's the most universally applicable."
  },
  {
    id: "verify_1",
    phase: "Verify",
    progressLabel: "Verification Q1/1",
    title: "Run the Safeguard Checks",
    script: "Review Codex's output. What is your primary check?",
    options: ["1. Metric accuracy", "2. No PII exposed", "3. Logic/Join correctness"],
    fallback: "Remind the room: The analyst remains accountable for the dashboard claim, not Codex."
  }
];

export function FacilitatorMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});

  const step = WORKSHOP_STEPS[currentIndex];
  const phases = Array.from(new Set(WORKSHOP_STEPS.map(s => s.phase)));

  const handleNext = () => setCurrentIndex(i => Math.min(WORKSHOP_STEPS.length - 1, i + 1));
  const handlePrev = () => setCurrentIndex(i => Math.max(0, i - 1));

  const percentComplete = Math.round(((currentIndex + 1) / WORKSHOP_STEPS.length) * 100);

  return (
    <div className="flex h-full w-full bg-[#F8FAFC] text-slate-800 overflow-hidden">
      {/* Sidebar - Workshop Progress */}
      <div className="w-72 bg-slate-100 border-r border-slate-200 flex flex-col p-6 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> Session Progress
        </div>
        
        <div className="space-y-6 flex-1">
          {phases.map((phase, pIdx) => {
            const phaseSteps = WORKSHOP_STEPS.filter(s => s.phase === phase);
            const isCurrentPhase = step.phase === phase;
            
            return (
              <div key={phase} className={cn("relative transition-opacity", !isCurrentPhase && currentIndex > 0 ? "opacity-60" : "opacity-100")}>
                <div className={cn("font-bold text-sm mb-3", isCurrentPhase ? "text-blue-700" : "text-slate-700")}>
                  {pIdx + 1}. {phase}
                </div>
                <div className="space-y-3 relative before:absolute before:inset-0 before:ml-[7px] before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
                  {phaseSteps.map((s) => {
                    const sIdx = WORKSHOP_STEPS.findIndex(x => x.id === s.id);
                    const isActive = sIdx === currentIndex;
                    const isCompleted = sIdx < currentIndex;
                    
                    return (
                      <div key={s.id} className="relative flex items-center gap-3">
                        <div className={cn(
                          "flex items-center justify-center w-4 h-4 rounded-full bg-white border z-10 transition-colors",
                          isCompleted ? "border-blue-600 bg-blue-600" :
                          isActive ? "border-blue-600 border-4" :
                          "border-slate-300 ring-4 ring-slate-100"
                        )}>
                          {isCompleted && <CheckCircle className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div className={cn("text-xs font-medium transition-colors", isActive ? "text-blue-700" : "text-slate-500")}>
                          {s.title}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-slate-500">Total Completion</span>
            <span className="text-xs font-mono text-blue-600 font-bold">{percentComplete}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
             <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${percentComplete}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Facilitator Board */}
      <div className="flex-1 flex flex-col p-8 bg-white overflow-y-auto">
        
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col pt-4">
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 shadow-sm">
              <PlayCircle className="w-4 h-4" /> {step.progressLabel}
            </div>
            {step.decision && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200 shadow-sm">
                 Decision Point
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">{step.title}</h2>

          <div className="bg-[#1F2937] text-white p-6 rounded-xl shadow-lg border border-slate-700 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
            <div className="flex items-center gap-2 text-blue-300 mb-3 text-xs font-bold uppercase tracking-widest">
               <MessageSquare className="w-4 h-4" /> Facilitator Script
            </div>
            <p className="text-xl leading-relaxed font-medium">"{step.script}"</p>
          </div>

          <div className="mb-8">
            <div className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" /> Room Response (Quick Select)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {step.options.map((opt, i) => {
                const isSelected = selections[step.id] === opt;
                return (
                  <button 
                    key={i}
                    onClick={() => setSelections({...selections, [step.id]: opt})}
                    className={cn(
                      "text-left px-5 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                      isSelected 
                        ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm ring-1 ring-blue-600/20" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600"
                    )}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-5 rounded-lg flex gap-4 mt-auto">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Interruption Fallback</div>
              <p className="text-sm text-amber-700 font-medium">{step.fallback}</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-slate-100">
            <button 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Step
            </button>
            <button 
              onClick={handleNext}
              disabled={currentIndex === WORKSHOP_STEPS.length - 1}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-md hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 transition-all duration-200"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
