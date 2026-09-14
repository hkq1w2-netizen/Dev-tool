"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, Command, ArrowRight, ShieldCheck } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tools/registry";
import { ToolMetadata } from "@/types/tool";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolMetadata[]>(ALL_TOOLS.slice(0, 6));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(ALL_TOOLS.slice(0, 6));
      return;
    }
    const q = query.toLowerCase();
    const filtered = ALL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.categoryName.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name or command... (e.g. JSON, Base64, UUID)"
            className="w-full bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none text-base font-sans"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800/50">
          {results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No developer tools found matching &quot;{query}&quot;.
            </div>
          ) : (
            results.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                    <Command className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {tool.name}
                      </span>
                      {tool.processingMode === "CLIENT" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                          <ShieldCheck className="w-3 h-3" /> Browser Local
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {tool.shortDescription}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Navigate with mouse or keyboard</span>
          <span className="font-mono bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">ESC to close</span>
        </div>
      </div>
    </div>
  );
}
