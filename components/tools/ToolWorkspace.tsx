"use client";

import dynamic from "next/dynamic";
import ToolShell from "@/components/tools/ToolShell";
import { ToolMetadata } from "@/types/tool";

const ImageToolShell = dynamic(() => import("@/components/tools/ImageToolShell"), { ssr: false, loading: ToolLoading });
const PdfToolShell = dynamic(() => import("@/components/tools/PdfToolShell"), { ssr: false, loading: ToolLoading });

export default function ToolWorkspace({ tool }: { tool: ToolMetadata }) {
  if (tool.category === "images") return <ImageToolShell tool={tool} />;
  if (tool.category === "pdf") return <PdfToolShell tool={tool} />;
  return <ToolShell tool={tool} />;
}

function ToolLoading() {
  return <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900" role="status">Loading tool workspace…</div>;
}
