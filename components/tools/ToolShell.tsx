"use client";

import { useState } from "react";
import {
  Copy,
  Download,
  Trash2,
  Play,
  Check,
  ShieldCheck,
  Save,
  AlertTriangle,
  Sparkles,
  FileCode,
} from "lucide-react";
import { ToolMetadata, ToolExecutionResult } from "@/types/tool";
import { executeToolClient } from "@/lib/tools/registry";
import AdSlot from "@/components/ads/AdSlot";

interface ToolShellProps {
  tool: ToolMetadata;
  initialInput?: string;
}

export default function ToolShell({ tool, initialInput = "" }: ToolShellProps) {
  const [input, setInput] = useState(initialInput);
  const [result, setResult] = useState<ToolExecutionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [options, setOptions] = useState<Record<string, unknown>>({ indent: 2, count: 5 });

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const res = executeToolClient(tool.slug, input, options);
      setResult(res);
      setIsProcessing(false);

      // Log privacy-safe history if user logged in
      fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolSlug: tool.slug, action: "execute" }),
      }).catch(() => {});
    }, 50);
  };

  const handleCopy = async () => {
    if (!result?.output) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result?.output) return;
    const blob = new Blob([result.output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.slug}-result.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveProject = async () => {
    if (!input && !result?.output) return;
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: tool.slug,
          name: `${tool.name} Result`,
          input,
          output: result?.output || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert(data.error?.message || "Please sign in to save projects to your account.");
      }
    } catch {
      alert("Failed to save project.");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const loadSampleInput = () => {
    switch (tool.slug) {
      case "json-formatter":
      case "json-validator":
      case "json-minifier":
      case "json-viewer":
        setInput('{\n  "name": "DevKitLab",\n  "type": "SaaS",\n  "features": ["Privacy", "Fast", "SEO"],\n  "active": true\n}');
        break;
      case "base64-encoder":
        setInput("Hello World! Welcome to DevKitLab");
        break;
      case "base64-decoder":
        setInput("SGVsbG8gV29ybGQhIFdlbGNvbWUgdG8gRGV2S2l0TGFi");
        break;
      case "url-encoder":
        setInput("https://devkitlab.com/search?q=JSON Formatter & Validator");
        break;
      case "url-decoder":
        setInput("https%3A%2F%2Fdevkitlab.com%2Fsearch%3Fq%3DJSON%20Formatter%20%26%20Validator");
        break;
      case "uuid-generator":
        setInput("");
        break;
      case "timestamp-converter":
        setInput("1735689600");
        break;
      case "regex-tester":
        setInput("Contact support@devkitlab.com or info@example.org for help.");
        break;
      case "hex-to-rgb":
        setInput("#3b82f6");
        break;
      case "html-formatter":
        setInput('<div class="container"><h1>DevKitLab</h1><p>Online Utilities</p></div>');
        break;
      case "css-formatter":
        setInput("body{margin:0;padding:0;background:#000;color:#fff}h1{font-size:24px}");
        break;
      case "markdown-editor":
        setInput("# DevKitLab\n\n- Fast\n- Privacy-first\n- Client-side processing\n\n```js\nconsole.log('Ready!');\n```");
        break;
      default:
        setInput("Sample input text");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Tool Privacy Badge & Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
            <ShieldCheck className="w-4 h-4" />
            100% Client-Side Browser Execution
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={loadSampleInput}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Load Sample Input
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUT PANE */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-brand-500" /> Input Data
            </label>

            {/* Custom Tool Options (e.g. UUID Count / Indentation) */}
            {tool.slug === "json-formatter" && (
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400">Spaces:</span>
                <select
                  value={Number(options.indent)}
                  onChange={(e) => setOptions({ ...options, indent: Number(e.target.value) })}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-xs"
                >
                  <option value={2}>2 Spaces</option>
                  <option value={4}>4 Spaces</option>
                </select>
              </div>
            )}

            {tool.slug === "uuid-generator" && (
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-gray-400">Count:</span>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={Number(options.count)}
                  onChange={(e) => setOptions({ ...options, count: Number(e.target.value) })}
                  className="w-16 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-xs text-center"
                />
              </div>
            )}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter or paste your ${tool.supportedInputs.join(", ") || "data"} here...`}
            rows={12}
            className="w-full p-4 font-mono text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-y transition-all shadow-inner"
          />

          <button
            onClick={handleExecute}
            disabled={isProcessing}
            className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-semibold shadow-md shadow-brand-500/20 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isProcessing ? "Processing..." : `Run ${tool.name}`}</span>
          </button>
        </div>

        {/* OUTPUT PANE */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 font-mono flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Result Output
            </label>

            {result?.success && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveProject}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs transition-colors"
                >
                  {saved ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Save className="w-3.5 h-3.5" />}
                  <span>{saved ? "Saved!" : "Save Result"}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 text-xs font-semibold transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="relative w-full h-full min-h-[300px] flex flex-col">
            {result?.error ? (
              <div className="w-full p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-mono text-sm space-y-2">
                <div className="flex items-center space-x-2 font-bold text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Execution Error</span>
                </div>
                <p>{result.error}</p>
              </div>
            ) : (
              <textarea
                readOnly
                value={result?.output || ""}
                placeholder="Result output will appear here automatically..."
                rows={12}
                className="w-full h-full p-4 font-mono text-sm rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 outline-none resize-y"
              />
            )}
          </div>
        </div>
      </div>

      {/* AdSense Slot below Tool Workspace */}
      <AdSlot position="tool-bottom" format="auto" />
    </div>
  );
}
