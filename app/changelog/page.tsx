import { Sparkles, CheckCircle2 } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "Platform Changelog",
  description: "DevKitLab product updates, new tool releases, and platform enhancements.",
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Platform Changelog
        </h1>
        <p className="text-xs text-gray-500 mt-1">Continuous updates and new developer utilities.</p>
      </div>

      <div className="border-l-2 border-brand-500 pl-6 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-mono font-bold text-xs">v1.0.0</span>
            <span className="text-xs text-gray-400">September 14, 2026</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Initial DevKitLab Release</h2>
          <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
            <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Launched 15 Phase-1 client-side developer utilities</span></li>
            <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Secure MongoDB Atlas auth & private user dashboard</span></li>
            <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>SEO, AEO, and GEO content structure + dynamic XML sitemap</span></li>
            <li className="flex items-center space-x-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /><span>Command Palette (⌘K) quick tool search</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
