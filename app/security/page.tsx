import { ShieldCheck, Lock, Key, Server } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "Security Architecture",
  description: "DevTools.online security measures, encrypted cookie sessions, and browser-isolation strategy.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Security Architecture
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          How we protect your developer data, credentials, and session integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <Lock className="w-6 h-6 text-brand-500" />
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Encrypted Session Storage</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            All user authentication tokens are issued in HTTP-only, SameSite=Lax encrypted cookies to prevent XSS session hijacking.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
          <Key className="w-6 h-6 text-emerald-500" />
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">bcrypt Password Hashing</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Passwords are hashed using bcrypt salted algorithms with zero plain-text data retention anywhere in memory or logs.
          </p>
        </div>
      </div>
    </div>
  );
}
