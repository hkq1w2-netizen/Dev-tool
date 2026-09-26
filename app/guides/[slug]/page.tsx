import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_GUIDES, getGuideBySlug } from "@/lib/guides/registry";
import { ALL_TOOLS } from "@/lib/tools/registry";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { generateGuideJsonLd } from "@/lib/seo/schema";
import { BookOpen, Calendar, Clock, ArrowRight, HelpCircle, Wrench } from "lucide-react";

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return generateSeoMetadata({
    title: guide.seoTitle,
    description: guide.seoDescription,
    path: `/guides/${guide.slug}`,
    keywords: [guide.category, `${guide.category} guide`, `${guide.category} cheat sheet`, "developer guide"],
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { techArticleSchema, breadcrumbSchema } = generateGuideJsonLd(guide);
  const relatedTools = ALL_TOOLS.filter((t) => guide.relatedToolSlugs.includes(t.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-4xl mx-auto space-y-10 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/guides" className="hover:underline">Guides</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 font-semibold">{guide.category}</span>
        </nav>

        {/* Title Header */}
        <div className="space-y-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="flex items-center space-x-3 text-xs font-mono text-brand-600 dark:text-brand-400">
            <span className="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-900/50 font-bold">
              {guide.category}
            </span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>{guide.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{guide.readTime}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            {guide.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
            {guide.excerpt}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-6">
          {guide.contentMarkdown.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl font-bold text-gray-900 dark:text-white pt-4">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="space-y-1 list-disc pl-5">
                  {paragraph.split("\n").map((li, idx) => (
                    <li key={idx}>{li.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{paragraph}</p>;
          })}
        </div>

        {/* Recommended Tools Cluster */}
        {relatedTools.length > 0 && (
          <section className="p-6 rounded-2xl border border-brand-200 dark:border-brand-900/50 bg-brand-50/50 dark:bg-gray-900/60 space-y-4">
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-brand-500" />
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                Interactive Tools for This Guide
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.slug}`}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-brand-500 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      {t.shortDescription}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-500 shrink-0 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {guide.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
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
    </>
  );
}
