import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Image as ImageIcon, ShieldCheck, Wrench } from "lucide-react";
import ToolSearch from "@/components/home/ToolSearch";
import { ALL_TOOLS } from "@/lib/tools/registry";
import { TOOL_CATEGORIES } from "@/lib/categories/registry";

const FEATURED_SLUGS = ["image-compressor", "pdf-merger", "json-formatter", "image-resizer", "pdf-compressor", "base64-encoder"];

export default function HomePage() {
  const featured = FEATURED_SLUGS.map((slug) => ALL_TOOLS.find((tool) => tool.slug === slug)).filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));
  const searchTools = ALL_TOOLS.map((tool) => ({ slug: tool.slug, name: tool.name, description: tool.shortDescription, category: tool.categoryName, terms: [...tool.keywords, ...(tool.aliases || [])] }));

  return (
    <div className="space-y-20 pb-6 pt-4">
      <section className="mx-auto max-w-4xl py-10 text-center sm:py-16">
        <p className="mb-4 text-sm font-semibold text-brand-700 dark:text-brand-400">Fast, useful, and free to use</p>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl dark:text-white">Free online tools for everyday work</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">Useful tools for developers, creators, businesses, students, and everyday tasks. Start immediately without creating an account.</p>
        <div className="mt-8"><ToolSearch tools={searchTools} /></div>
        <div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/tools" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"><Wrench className="h-4 w-4" />Explore all tools</Link><Link href="#categories" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white">Browse categories<ArrowRight className="h-4 w-4" /></Link></div>
      </section>

      <section aria-labelledby="featured-tools-heading" className="space-y-6"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-brand-700 dark:text-brand-400">Start here</p><h2 id="featured-tools-heading" className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl dark:text-white">Frequently useful tools</h2></div><Link href="/tools" className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:underline sm:flex dark:text-brand-400">View all <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{featured.map((tool) => <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"><div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{tool.category === "pdf" ? <FileText className="h-5 w-5" /> : tool.category === "images" ? <ImageIcon className="h-5 w-5" /> : <Wrench className="h-5 w-5" />}</span>{tool.processingMode === "CLIENT" && <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"><ShieldCheck className="h-3.5 w-3.5" />Runs locally</span>}</div><h3 className="mt-4 text-lg font-bold text-slate-950 group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-400">{tool.name}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600 dark:text-slate-400">{tool.shortDescription}</p></Link>)}</div></section>

      <section id="categories" aria-labelledby="categories-heading" className="scroll-mt-24 space-y-6"><div><p className="text-sm font-semibold text-brand-700 dark:text-brand-400">Find your workflow</p><h2 id="categories-heading" className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl dark:text-white">Browse categories</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{TOOL_CATEGORIES.map((category) => { const count = ALL_TOOLS.filter((tool) => tool.category === category.slug).length; return <Link key={category.slug} href={`/categories/${category.slug}`} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-300 hover:bg-brand-50/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-900 dark:hover:bg-brand-950/20"><div><h3 className="font-bold text-slate-950 dark:text-white">{category.name}</h3><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{category.shortDescription}</p></div><span className="ml-4 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{count}</span></Link>; })}</div></section>

      <section className="grid gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60"><TrustPoint title="No unnecessary signup" text="Open a tool and start working immediately." /><TrustPoint title="Clear processing details" text="Every tool explains whether work stays local." /><TrustPoint title="Practical outputs" text="Copy or download results in formats you can use." /></section>
    </div>
  );
}

function TrustPoint({ title, text }: { title: string; text: string }) { return <div className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><div><h2 className="font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div></div>; }
