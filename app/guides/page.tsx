import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "Developer Guides & References",
  description: "Comprehensive guides, cheat sheets, and tutorials on JSON formatting, Regular Expressions, Base64 encoding, and Unix timestamps.",
  path: "/guides",
});

const GUIDES = [
  {
    slug: "json-formatting-guide",
    title: "Complete JSON Formatting & Syntax Guide for Developers",
    excerpt: "Learn standard JSON specifications, escape characters, trailing comma rules, and common formatting pitfalls.",
    category: "JSON",
    date: "2026-09-14",
  },
  {
    slug: "regex-cheat-sheet",
    title: "JavaScript Regular Expressions Cheat Sheet & Matcher Guide",
    excerpt: "Master character classes, lookaheads, capture groups, and regex performance optimization.",
    category: "Regex",
    date: "2026-09-14",
  },
  {
    slug: "unix-timestamp-guide",
    title: "Understanding Unix Epoch Timestamps & Timezones",
    excerpt: "Demystifying 10-digit epoch seconds vs 13-digit milliseconds, ISO 8601 UTC strings, and leap seconds.",
    category: "Time",
    date: "2026-09-14",
  },
];

export default function GuidesPage() {
  return (
    <div className="space-y-8 py-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Developer Guides & Resources
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Technical deep-dives, cheat sheets, and best practices.
        </p>
      </div>

      <div className="space-y-6">
        {GUIDES.map((guide) => (
          <div key={guide.slug} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-brand-600 dark:text-brand-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{guide.category}</span>
              <span>•</span>
              <span>{guide.date}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {guide.title}
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {guide.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
