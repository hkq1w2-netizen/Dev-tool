import Link from "next/link";
import { ArrowRight, CircleCheck, ShieldCheck, Sparkles } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({ title: "About DevKitLab", description: "Why DevKitLab builds fast, practical online tools without unnecessary accounts or inflated claims.", path: "/about" });

export default function AboutPage() {
  return <div className="mx-auto max-w-4xl space-y-12 py-6">
    <header className="max-w-3xl"><p className="text-sm font-semibold text-brand-700 dark:text-brand-400">About DevKitLab</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-white">Useful tools should get out of your way</h1><p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">DevKitLab is a growing collection of free browser tools for developers, creators, businesses, students, and everyday tasks.</p></header>
    <section className="grid gap-5 md:grid-cols-3"><Value icon={<Sparkles />} title="Immediate utility" text="Open a tool and use it. No account, upgrade screen, or invented workflow is required." /><Value icon={<ShieldCheck />} title="Clear privacy" text="Tools identify how processing works. Local tools keep inputs and files in browser memory." /><Value icon={<CircleCheck />} title="Honest limits" text="Supported formats, file limits, and lossy behavior are stated where they matter." /></section>
    <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800"><h2 className="text-2xl font-bold text-slate-950 dark:text-white">How the product is built</h2><p className="leading-7 text-slate-600 dark:text-slate-300">The platform favors focused tools, compact interfaces, standards-based browser APIs, and task-based links between related utilities. New pages are added only when they represent a useful, distinct task—not simply another keyword variation.</p><p className="leading-7 text-slate-600 dark:text-slate-300">DevKitLab is still developing. If a result is incorrect or a workflow is confusing, that is useful feedback rather than something to hide.</p></section>
    <div className="flex flex-wrap gap-3"><Link href="/tools" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-slate-950">Explore tools <ArrowRight className="h-4 w-4" /></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 dark:border-slate-700 dark:text-white">Send feedback</Link></div>
  </div>;
}

function Value({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"><div className="text-brand-600">{icon}</div><h2 className="mt-4 font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{text}</p></div>; }
