"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export interface SearchToolItem { slug: string; name: string; description: string; category: string; terms: string[] }

export default function ToolSearch({ tools }: { tools: SearchToolItem[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return tools.filter((tool) => {
      const haystack = [tool.name, tool.description, tool.category, ...tool.terms].join(" ").toLowerCase();
      return words.every((word) => haystack.includes(word));
    }).slice(0, 6);
  }, [query, tools]);

  return (
    <div className="relative mx-auto w-full max-w-2xl text-left">
      <Search className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tools…" aria-label="Search tools" className="h-13 w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-base text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white" />
      {query.trim() && <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">{results.length ? results.map((tool) => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="flex items-center justify-between rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-800"><div><div className="text-sm font-semibold text-slate-950 dark:text-white">{tool.name}</div><div className="mt-0.5 text-xs text-slate-500">{tool.category} · {tool.description}</div></div><ArrowRight className="h-4 w-4 shrink-0 text-slate-400" /></Link>) : <div className="p-5 text-center text-sm text-slate-500">No matching tools yet. Try PDF, image, JSON, encode, or convert.</div>}</div>}
    </div>
  );
}
