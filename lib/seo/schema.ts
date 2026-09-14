import { ToolMetadata } from "@/types/tool";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devtools.online";

export function generateToolJsonLd(tool: ToolMetadata) {
  const toolUrl = `${APP_URL}/tools/${tool.slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "url": toolUrl,
    "description": tool.shortDescription,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": APP_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${APP_URL}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.categoryName,
        "item": `${APP_URL}/categories/${tool.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": toolUrl
      }
    ]
  };

  const masterFaq = {
    question: "How can I format, validate, encode, decode, generate, and convert developer data safely in my browser without risking data leaks or server logging?",
    answer: "Every utility on DevTool.online runs 100% locally inside your browser's Web JavaScript runtime using client-side Web Crypto and native string parsing engines. Your JSON, Base64 strings, regex patterns, API tokens, and timestamps never touch a remote server, external database, or third-party tracking script."
  };

  const allFaqs = [masterFaq, ...(tool.faqs || [])];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return { webAppSchema, breadcrumbSchema, faqSchema };
}
