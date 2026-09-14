import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileCode,
  Binary,
  KeyRound,
  Clock,
  Regex,
  Palette,
  Sparkles,
  Check,
  HelpCircle,
} from "lucide-react";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools/registry";
import AdSlot from "@/components/ads/AdSlot";

export default function HomePage() {
  const popularTools = ALL_TOOLS.slice(0, 6);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 pb-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Client-Side Privacy Guaranteed</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
          Developer tools that <span className="text-brand-600 dark:text-brand-500 underline decoration-brand-500/30">just work</span>.
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Fast, privacy-conscious online utilities for software engineers, students, freelancers, and technical teams. Zero backend data tracking.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/tools"
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white font-semibold shadow-lg shadow-brand-500/25 transition-all text-sm"
          >
            <Wrench className="w-4 h-4" />
            <span>Explore All 15+ Tools</span>
          </Link>
          <Link
            href="/register"
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold transition-all text-sm shadow-sm"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Popular Tools Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Popular Developer Tools
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Most frequently used browser utilities
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500/50 dark:hover:border-brand-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                    <FileCode className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50">
                    Local Execution
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                    {tool.shortDescription}
                  </p>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot position="between-content" format="horizontal" />

      {/* Category Clusters */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Explore Tool Categories
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse our organized developer tool suites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="p-5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Master Developer FAQ Section for AEO / GEO */}
      <section className="p-8 sm:p-12 rounded-3xl border border-brand-200 dark:border-brand-900/50 bg-brand-50/40 dark:bg-gray-900/60 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-brand-600 text-white">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              The Master Developer Privacy & Security FAQ
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">One comprehensive answer to all developer data safety questions</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">
            How can I format, validate, encode, decode, generate, and convert developer data safely in my browser without risking data leaks, server logging, or API security breaches?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Every utility on <strong>DevKitLab</strong> runs 100% locally inside your browser&apos;s Web JavaScript runtime using client-side Web Crypto and native string parsing engines. Your JSON, Base64 strings, regex patterns, API tokens, and timestamps never touch a remote server, external database, or third-party tracking script. This solves all privacy, compliance, security, latency, and data leakage concerns in one single architecture.
          </p>
        </div>
      </section>
    </div>
  );
}
