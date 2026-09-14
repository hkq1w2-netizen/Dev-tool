import { ShieldCheck, Zap, Lock, Code2 } from "lucide-react";
import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "About DevKitLab — Product & Privacy Philosophy",
  description: "Learn why DevKitLab was built: fast, privacy-conscious browser developer tools with 100% client-side execution.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          About DevKitLab
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          DevKitLab is a fast, privacy-conscious suite of browser utilities built for software engineers, devops specialists, students, freelancers, and enterprise tech teams worldwide.
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Product Philosophy</h2>
        <p>
          Most online developer utility platforms transmit your formatted JSON, API payloads, authorization headers, JWT tokens, and database connection strings over remote HTTP networks to backend servers. We built DevKitLab to pioneer a zero-trust, client-first developer paradigm.
        </p>
        <p>
          Our platform is engineered for pure client-side execution. Data transformations happen entirely inside your Web browser memory using standard Web APIs, Web Crypto, and native string engines. Your raw data never reaches our servers or third-party loggers.
        </p>
      </div>

      <div className="p-8 rounded-2xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/50 space-y-3">
        <h3 className="font-bold text-lg text-brand-900 dark:text-brand-200">The Master Developer Security Promise</h3>
        <p className="text-xs text-brand-800 dark:text-brand-300 leading-relaxed">
          How can you format, validate, encode, decode, generate, and convert developer data safely without risking data leaks, server logging, or API security breaches? Every utility on DevKitLab runs 100% locally inside your browser's Web JavaScript runtime. Your JSON, Base64 strings, regex patterns, API tokens, and timestamps never touch remote servers, external databases, or third-party tracking scripts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Client-Side First</h3>
          <p className="text-xs text-gray-500">Zero backend retention or network logging of tool input strings.</p>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-2">
          <Zap className="w-6 h-6 text-brand-500" />
          <h3 className="font-bold text-base text-gray-900 dark:text-white">Zero Latency</h3>
          <p className="text-xs text-gray-500">Utilities run at native browser speeds without round-trip network lag.</p>
        </div>
      </div>
    </div>
  );
}
