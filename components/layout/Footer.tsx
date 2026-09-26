import Link from "next/link";
import { ShieldCheck, Wrench } from "lucide-react";
import { TOOL_CATEGORIES } from "@/lib/categories/registry";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950"><Wrench className="h-4 w-4" /></span><span className="font-extrabold text-slate-950 dark:text-white">DevKitLab</span></Link>
          <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">Free online tools for developers, creators, businesses, students, and everyday work. Fast, practical, and ready without signup.</p>
          <p className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" />Local processing is identified on each supported tool.</p>
        </div>
        <FooterGroup title="Explore" links={[["All tools", "/tools"], ["Guides", "/guides"], ["About", "/about"], ["Contact", "/contact"]]} />
        <FooterGroup title="Categories" links={TOOL_CATEGORIES.slice(0, 5).map((category) => [category.name, `/categories/${category.slug}`])} />
        <FooterGroup title="Trust" links={[["Privacy", "/privacy"], ["Terms", "/terms"], ["Security", "/security"], ["Changelog", "/changelog"]]} />
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><span>© {new Date().getFullYear()} DevKitLab</span><span>Useful tools. No unnecessary account.</span></div></div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return <div><h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">{title}</h2><ul className="space-y-2.5">{links.map(([label, href]) => <li key={href}><Link href={href} className="text-sm text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">{label}</Link></li>)}</ul></div>;
}
