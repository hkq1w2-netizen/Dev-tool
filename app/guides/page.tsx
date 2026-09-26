import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { ALL_GUIDES } from "@/lib/guides/registry";

export const metadata = generateSeoMetadata({
  title: "Developer Guides & References",
  description: "Comprehensive guides, cheat sheets, and tutorials on JSON formatting, Regular Expressions, Base64 encoding, and Unix timestamps.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Developer Guides & Technical References
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Technical deep-dives, cheat sheets, specification standards, and best practices.
        </p>
      </div>

      <div className="space-y-6">
        {ALL_GUIDES.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500/50 hover:shadow-lg transition-all space-y-3 group"
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-brand-600 dark:text-brand-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{guide.category}</span>
              <span>•</span>
              <span>{guide.readTime}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {guide.title}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {guide.excerpt}
            </p>
            <div className="pt-2 flex items-center space-x-1 text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
              <span>Read Full Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

