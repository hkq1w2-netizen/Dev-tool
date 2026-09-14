import { notFound } from "next/navigation";
import Link from "next/link";
import { getToolBySlug, ALL_TOOLS } from "@/lib/tools/registry";
import ToolShell from "@/components/tools/ToolShell";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { generateToolJsonLd } from "@/lib/seo/schema";
import { ArrowRight, CheckCircle2, ShieldCheck, HelpCircle, FileText } from "lucide-react";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  return generateSeoMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const { webAppSchema, breadcrumbSchema, faqSchema } = generateToolJsonLd(tool);
  const relatedTools = ALL_TOOLS.filter((t) => tool.relatedToolSlugs?.includes(t.slug));

  return (
    <>
      {/* Inject JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="space-y-12 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:underline">Tools</Link>
          <span>/</span>
          <Link href={`/categories/${tool.category}`} className="hover:underline">{tool.categoryName}</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-semibold">{tool.name}</span>
        </nav>

        {/* Header Title & Intro */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            {tool.shortDescription}
          </p>
        </div>

        {/* PRIMARY INTERACTIVE TOOL WORKSPACE */}
        <section className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
          <ToolShell tool={tool} />
        </section>

        {/* SEO / AEO / GEO ANSWER-FIRST CONTENT SECTION */}
        <article className="max-w-4xl space-y-10 pt-4 border-t border-gray-200 dark:border-gray-800">
          {/* Answer Engine Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              What is {tool.name}?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {tool.longDescription}
            </p>
          </section>

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Key Features & Capabilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tool.features.map((feat, i) => (
                  <div key={i} className="flex items-start space-x-2.5 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Step-by-Step How To Use */}
          {tool.howTo && tool.howTo.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                How to Use {tool.name}
              </h2>
              <ol className="space-y-2">
                {tool.howTo.map((step, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs text-gray-600 dark:text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Privacy Explanation */}
          <section className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-sm text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Data Privacy & Security Guarantee</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
              When you use {tool.name}, all input processing is executed completely inside your Web browser memory via client-side JavaScript. Your text and files are never stored, logged, or sent to backend databases.
            </p>
          </section>

          {/* Related Tools Cluster */}
          {relatedTools.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Related Utilities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/tools/${rel.slug}`}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-brand-500 transition-colors space-y-1 block"
                  >
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{rel.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{rel.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* FAQ Accordion Section */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-brand-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
