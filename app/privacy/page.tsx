import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({ title: "Privacy Policy", description: "How DevKitLab handles tool inputs, files, local storage, analytics, and external services.", path: "/privacy" });

export default function PrivacyPage() {
  return <article className="mx-auto max-w-3xl space-y-6 py-6 text-sm leading-7 text-slate-700 dark:text-slate-300">
    <div><h1 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">Privacy Policy</h1><p className="mt-2 text-xs text-slate-500">Last updated: September 26, 2026</p></div>
    <PolicySection title="Tool inputs and files"><p>Tools labeled as local process their inputs in your browser. DevKitLab does not upload those inputs or files to its servers. Browser memory and device limits still apply, so avoid opening files larger than the limit shown by a tool.</p></PolicySection>
    <PolicySection title="Accounts and payments"><p>DevKitLab does not offer user accounts, subscriptions, cloud history, or saved projects. Normal tool use does not require registration.</p></PolicySection>
    <PolicySection title="Local preferences"><p>The site may store a theme preference in your browser&apos;s local storage. This preference stays on your device and can be cleared through your browser settings.</p></PolicySection>
    <PolicySection title="Analytics and advertising"><p>No analytics or advertising service is currently configured in this application. If either is introduced, this policy will be updated before data collection begins. Tool inputs and file contents will not be included in product analytics.</p></PolicySection>
    <PolicySection title="External links and downloads"><p>Links to third-party websites are governed by their own policies. Files created by a local tool are downloaded directly from browser memory to your device.</p></PolicySection>
    <PolicySection title="Contact"><p>Questions about this policy can be sent to <a className="font-semibold text-brand-700 hover:underline dark:text-brand-400" href="mailto:support@devkitlab.online">support@devkitlab.online</a>.</p></PolicySection>
  </article>;
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border-t border-slate-200 pt-5 dark:border-slate-800"><h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2><div className="mt-2">{children}</div></section>; }
