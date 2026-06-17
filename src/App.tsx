/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PresentationMode } from "./components/PresentationMode";
import { GitLabMode } from "./components/GitLabMode";
import { Layout, Presentation, GitMerge } from "lucide-react";
import { cn } from "./utils/cn";

export default function App() {
  const [activeTab, setActiveTab] = useState<"presentation" | "gitlab">("presentation");

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden font-sans">
      {/* Top Application Bar */}
      <header className="h-12 bg-[#1F2937] flex items-center px-4 justify-between border-b border-slate-700 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded flex items-center justify-center font-bold text-xs">CX</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-60">Workshops</span>
              <span className="opacity-60">/</span>
              <span className="font-medium">BI-Codex-Mastery</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800 p-1 rounded border border-slate-700">
          <button
            onClick={() => setActiveTab("presentation")}
            className={cn(
              "flex items-center gap-2 px-4 py-1 rounded-sm text-xs font-medium transition-colors",
              activeTab === "presentation" 
                ? "bg-slate-700 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            )}
          >
            <Presentation className="w-3.5 h-3.5" />
            Presentation Slide Deck
          </button>
          <button
            onClick={() => setActiveTab("gitlab")}
            className={cn(
              "flex items-center gap-2 px-4 py-1 rounded-sm text-xs font-medium transition-colors",
              activeTab === "gitlab" 
                ? "bg-slate-700 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            )}
          >
            <GitMerge className="w-3.5 h-3.5" />
            GitLab Repository
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs bg-slate-700 px-3 py-1 rounded-full border border-slate-600">Codex Ext Demo</div>
          <div className="h-6 w-6 rounded-full bg-slate-400"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === "presentation" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none")}>
          <PresentationMode />
        </div>
        <div className={cn("absolute inset-0 transition-opacity duration-300", activeTab === "gitlab" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none")}>
          <GitLabMode />
        </div>
      </main>
    </div>
  );
}
