import { generateSeoMetadata } from "@/lib/seo/metadata";

export const metadata = generateSeoMetadata({
  title: "Terms of Service",
  description: "DevTools.online Terms of Service for using free developer utilities and Pro subscriptions.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Terms of Service</h1>
      <p className="text-xs text-gray-500 font-mono">Effective Date: September 14, 2026</p>

      <section className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing or using DevTools.online, you agree to comply with and be bound by these Terms of Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">2. Permitted Use</h2>
        <p>
          Our developer tools are provided for lawful development, debugging, and productivity purposes. You agree not to use the platform for malicious data processing or attempting unauthorized system access.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">3. Subscriptions & Billing</h2>
        <p>
          Pro subscriptions provide ad-free access, cloud synchronization, and saved projects. Subscriptions renew automatically unless canceled prior to the next billing cycle.
        </p>
      </section>
    </div>
  );
}
