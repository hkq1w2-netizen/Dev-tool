import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "Privacy Policy",
  description: "DevKitLab Privacy Policy explaining client-side browser processing and data handling commitments.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-xs text-gray-500 font-mono">Last Updated: September 14, 2026</p>

      <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">1. Client-Side Browser Processing</h2>
        <p>
          DevKitLab is designed to prioritize your privacy. All developer tool operations (including JSON formatting, Base64 encoding/decoding, Regular Expression testing, UUID generation, HTML/CSS formatting, and timestamp conversions) are processed 100% locally inside your Web browser.
        </p>
        <p>
          Your input strings, files, JSON payloads, and outputs are never transmitted to, saved on, or analyzed by our backend servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">2. User Account Data</h2>
        <p>
          When you register a free or Pro account, we store your name, email address, password hash (encrypted using bcrypt with cost factor 12), and subscription status securely in our database. We do not sell or rent your user account information to third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">3. Analytics & AdSense</h2>
        <p>
          We use privacy-friendly product analytics to track aggregated page views and tool usage frequencies. We do not include any user tool contents or input text in analytics logs.
        </p>
      </section>
    </div>
  );
}
