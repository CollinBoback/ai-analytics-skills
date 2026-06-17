/// <reference types="vite/client" />

export type FileNode = {
  name: string;
  type: "file" | "directory";
  path: string;
  content?: string;
  children?: FileNode[];
};

// Load the REAL workshop files from disk (raw text) so the repo browser reflects
// the actual repository, not a hand-maintained copy. Vite globs are root-relative.
// Note: dot-directories (.agents, .codex) are intentionally excluded — Vite's glob
// does not match dotfiles, and those are tooling/config rather than lab content.
const rawModules = import.meta.glob(
  [
    "/AGENTS.md",
    "/README.md",
    "/labs/**/*.md",
    "/demos/**/*",
    "/templates/**/*",
    "/docs/**/*.md",
    "/evals/**/*.jsonl",
    "/slides/**/*.md",
  ],
  { query: "?raw", import: "default", eager: true }
) as Record<string, string>;

export const repoFiles: { path: string; content: string }[] = Object.entries(rawModules)
  .map(([path, content]) => ({ path: path.replace(/^\//, ""), content }))
  .sort((a, b) => a.path.localeCompare(b.path));

export function buildFileTree(files: { path: string; content?: string }[]): FileNode[] {
  const root: FileNode[] = [];

  for (const file of files) {
    const parts = file.path.split("/");
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      let node = currentLevel.find((n) => n.name === part);

      if (!node) {
        node = {
          name: part,
          type: isFile ? "file" : "directory",
          path: parts.slice(0, i + 1).join("/"),
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
      return a.type === "directory" ? -1 : 1;
    });
    nodes.forEach((n) => n.children && sortNodes(n.children));
  };

  sortNodes(root);
  return root;
}
