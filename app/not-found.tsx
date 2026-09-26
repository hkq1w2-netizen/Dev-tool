import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import { ALL_TOOLS } from "@/lib/tools/registry";

export default function NotFound() {
  const suggestedTools = ALL_TOOLS.slice(0, 3);

  return (
    <div className="max-w-xl mx-auto py-16 text-center space-y-8">
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-500 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
          404 Page Not Found
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Tool or page not found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          The developer tool or resource you were looking for doesn&apos;t exist or has moved.
        </p>
      </div>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-left space-y-4">
        <h2 className="text-xs font-semibold uppercase font-mono text-gray-400">
          Try one of these popular tools instead:
        </h2>
        <div className="space-y-2">
          {suggestedTools.map((t) => (
            <Link
              key={t.id}
              href={`/tools/${t.slug}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{t.name}</span>
              <ArrowRight className="w-4 h-4 text-brand-500" />
            </Link>
          ))}
        </div>
      </div>

      <Link
        href="/tools"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all"
      >
        <Wrench className="w-4 h-4" />
        <span>Browse All Developer Tools</span>
      </Link>
    </div>
  );
}
