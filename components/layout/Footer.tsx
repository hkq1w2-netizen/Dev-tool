import Link from "next/link";
import { Wrench, ShieldCheck, Lock, Zap } from "lucide-react";
import { TOOL_CATEGORIES } from "@/lib/tools/registry";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 text-sm transition-colors">
      <div className="border-b border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Client-Side Processing
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your data is processed locally in your browser. Zero backend data retention.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-500">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Instant Execution
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No latency, no queue time, no bloated dependencies.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Security-First Design
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Encrypted sessions, strict authorization, and zero sensitive log tracking.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white font-mono">
              DevKit<span className="text-brand-600">Lab</span>
            </span>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            Developer tools that just work. Fast, privacy-conscious browser utilities for engineers, students, freelancers, and technical teams worldwide.
          </p>
          <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
            <span>© {new Date().getFullYear()} DevKitLab</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">Systems Operational</span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider font-mono">
            Popular Tools
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/tools/json-formatter" className="hover:text-brand-500 transition-colors">JSON Formatter</Link></li>
            <li><Link href="/tools/json-validator" className="hover:text-brand-500 transition-colors">JSON Validator</Link></li>
            <li><Link href="/tools/base64-encoder" className="hover:text-brand-500 transition-colors">Base64 Encoder</Link></li>
            <li><Link href="/tools/uuid-generator" className="hover:text-brand-500 transition-colors">UUID Generator</Link></li>
            <li><Link href="/tools/regex-tester" className="hover:text-brand-500 transition-colors">Regex Tester</Link></li>
            <li><Link href="/tools/timestamp-converter" className="hover:text-brand-500 transition-colors">Timestamp Converter</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider font-mono">
            Categories
          </h3>
          <ul className="space-y-2 text-xs">
            {TOOL_CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/categories/${cat.slug}`} className="hover:text-brand-500 transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-xs uppercase tracking-wider font-mono">
            Company & Trust
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
            <li><Link href="/pricing" className="hover:text-brand-500 transition-colors">Pricing & Pro</Link></li>
            <li><Link href="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link></li>
            <li><Link href="/security" className="hover:text-brand-500 transition-colors">Security Overview</Link></li>
            <li><Link href="/contact" className="hover:text-brand-500 transition-colors">Contact Support</Link></li>
            <li><Link href="/changelog" className="hover:text-brand-500 transition-colors">Changelog</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
