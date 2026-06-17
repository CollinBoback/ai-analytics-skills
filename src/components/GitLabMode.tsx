import React, { useState } from "react";
import Markdown from "react-markdown";
import { ChevronRight, ChevronDown, File, Folder, GitBranch, Search, Link as LinkIcon, Book } from "lucide-react";
import { cn } from "../utils/cn";
import { FileNode, repoFiles, buildFileTree } from "../data/repo";

const fileTree = buildFileTree(repoFiles);

export function GitLabMode() {
  const [activeFile, setActiveFile] = useState<FileNode | null>(() => {
    const find = (nodes: FileNode[], path: string): FileNode | null => {
      for (const n of nodes) {
        if (n.path === path) return n;
        if (n.children) {
          const found = find(n.children, path);
          if (found) return found;
        }
      }
      return null;
    };
    return find(fileTree, "labs/00-kickoff.md") || find(fileTree, "AGENTS.md");
  });

  return (
    <div className="flex h-full w-full bg-white text-slate-800">
      {/* Sidebar */}
      <div className="w-64 bg-slate-100 border-r border-slate-200 flex flex-col overflow-hidden">
        {/* Repo Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Repository Index</div>
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm mb-1">
            <Book className="w-4 h-4 text-purple-600" />
            <span>analytics-workshop</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono ml-6">Codex for BI Analysts</div>
        </div>

        {/* Action row */}
        <div className="p-3 border-b border-slate-200 flex gap-2">
          <button className="flex-1 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50">
            <GitBranch className="w-3 h-3" /> main
          </button>
          <button className="flex-1 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50">
            <Search className="w-3 h-3" /> Find File
          </button>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto py-2">
          {fileTree.map((node) => (
            <TreeNode
              key={node.path}
              node={node}
              level={0}
              activeFile={activeFile}
              onSelect={setActiveFile}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        {/* File Header */}
        {activeFile && (
          <div className="h-14 border-b border-slate-200 flex items-center px-4 justify-between bg-white text-sm">
            <div className="flex items-center gap-2 font-mono text-slate-600">
              <span className="font-bold text-slate-800">{activeFile.name}</span>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs border border-slate-200 rounded text-slate-600 hover:bg-slate-50 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" /> Copy Path
              </button>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
                Open in Web IDE
              </button>
            </div>
          </div>
        )}

        {/* File Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          {activeFile ? (
            <div className="max-w-4xl mx-auto border border-slate-200 rounded-lg shadow-sm">
               <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-mono text-xs text-slate-600 flex justify-between items-center">
                 {activeFile.name}
                 <span className="text-slate-400">{activeFile.content?.split('\\n').length || 0} Lines</span>
               </div>
               
               {activeFile.name.endsWith('.md') ? (
                 <div className="p-8 prose prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600">
                   <Markdown>{activeFile.content}</Markdown>
                 </div>
               ) : (
                 <pre className="p-6 bg-white text-slate-800 font-mono text-sm overflow-x-auto leading-relaxed">
                   <code>{activeFile.content}</code>
                 </pre>
               )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TreeNode({
  node,
  level,
  activeFile,
  onSelect,
}: {
  node: FileNode;
  level: number;
  activeFile: FileNode | null;
  onSelect: (node: FileNode) => void;
}) {
  const [isOpen, setIsOpen] = useState(level === 0 || node.name === "labs" || node.name === "docs");
  const isDir = node.type === "directory";
  const isActive = activeFile?.path === node.path;

  return (
    <div>
      <div
        className={cn(
          "flex items-center px-4 py-1.5 cursor-pointer text-sm gap-1.5 hover:bg-slate-200",
          isActive && "bg-blue-50 text-blue-700 font-medium",
          !isActive && "text-slate-600"
        )}
        style={{ 
          paddingLeft: `${level * 16 + 12}px`,
          borderLeft: isActive ? "4px solid #2563eb" : "4px solid transparent"
        }}
        onClick={() => {
          if (isDir) {
            setIsOpen(!isOpen);
          } else {
            onSelect(node);
          }
        }}
      >
        <div className="w-4 h-4 flex items-center justify-center opacity-60">
          {isDir ? (
            isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />
          ) : null}
        </div>
        
        {isDir ? (
           <Folder className={cn("w-4 h-4", isOpen ? "fill-blue-200 text-blue-600" : "fill-slate-200 text-slate-400")} />
        ) : (
           <File className="w-4 h-4 text-slate-400" />
        )}
        
        <span className="truncate">{node.name}</span>
      </div>

      {isDir && isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              level={level + 1}
              activeFile={activeFile}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
