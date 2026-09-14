import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/tools/registry";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { Wrench, ArrowRight } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return TOOL_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const cat = TOOL_CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return {};

  return generateSeoMetadata({
    title: `${cat.name} — Online Developer Utilities`,
    description: cat.description,
    path: `/categories/${cat.slug}`,
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = TOOL_CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const tools = getToolsByCategory(category.slug);

  return (
    <div className="space-y-8 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 font-mono">
        <Link href="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link href="/tools" className="hover:underline">Categories</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-semibold">{category.name}</span>
      </nav>

      <div className="space-y-3 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {category.name}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {tool.shortDescription}
                </p>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs text-brand-600 dark:text-brand-400 font-semibold">
              <span>Open Tool</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
