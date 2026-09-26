import { ToolMetadata } from "@/types/tool";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function generateSiteJsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Free online tools for developers, creators, businesses, students, and everyday work."
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL
  };

  return { websiteSchema, organizationSchema };
}

export function generateToolJsonLd(tool: ToolMetadata) {
  const toolUrl = `${SITE_URL}/tools/${tool.slug}`;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${tool.name} — DevKitLab`,
    "url": toolUrl,
    "description": tool.shortDescription,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "featureList": tool.features || [
      "100% Client-side browser execution",
      "Zero server data retention",
      "Instant processing speed"
    ],
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
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
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tools",
        "item": `${SITE_URL}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.categoryName,
        "item": `${SITE_URL}/categories/${tool.category}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": tool.name,
        "item": toolUrl
      }
    ]
  };

  return { webAppSchema, breadcrumbSchema };
}

export function generateCategoryJsonLd(categoryName: string, categorySlug: string, categoryDescription: string) {
  const categoryUrl = `${SITE_URL}/categories/${categorySlug}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} — DevKitLab`,
    "url": categoryUrl,
    "description": categoryDescription,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
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
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": `${SITE_URL}/tools`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": categoryName,
        "item": categoryUrl
      }
    ]
  };

  return { collectionSchema, breadcrumbSchema };
}

export function generateGuideJsonLd(guide: {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const guideUrl = `${SITE_URL}/guides/${guide.slug}`;

  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": guide.title,
    "description": guide.excerpt,
    "url": guideUrl,
    "datePublished": guide.date,
    "dateModified": guide.date,
    "author": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
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
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Guides",
        "item": `${SITE_URL}/guides`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": guide.title,
        "item": guideUrl
      }
    ]
  };

  return { techArticleSchema, breadcrumbSchema };
}
