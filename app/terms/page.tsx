import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({ title: "Terms of Use", description: "Terms for using DevKitLab's free browser-based utilities.", path: "/terms" });

export default function TermsPage() {
  return <article className="mx-auto max-w-3xl space-y-6 py-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
    <div><h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">Terms of Use</h1><p className="mt-2 text-xs text-slate-500">Effective: September 26, 2026</p></div>
    <Term title="Using DevKitLab">DevKitLab provides free utilities for lawful personal and business use. You are responsible for the files, text, and results you process and for confirming that outputs are appropriate for your purpose.</Term>
    <Term title="No professional advice">Outputs are informational utilities, not legal, financial, medical, security, or compliance advice. Review important results independently before relying on them.</Term>
    <Term title="Availability and changes">Tools may change as browsers, standards, and dependencies evolve. We aim to keep released tools functional but do not promise uninterrupted availability or suitability for every workflow.</Term>
    <Term title="Acceptable use">Do not use DevKitLab to violate laws, infringe rights, attack systems, distribute malware, or process material you are not authorized to use.</Term>
    <Term title="Contact">Questions can be sent to <a className="font-semibold text-brand-700 hover:underline dark:text-brand-400" href="mailto:support@devkitlab.online">support@devkitlab.online</a>.</Term>
  </article>;
}

function Term({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border-t border-slate-200 pt-5 dark:border-slate-800"><h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2><p className="mt-2">{children}</p></section>; }
