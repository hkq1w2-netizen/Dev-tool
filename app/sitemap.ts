import { MetadataRoute } from "next";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools/registry";
import { ALL_GUIDES } from "@/lib/guides/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/tools",
    "/guides",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/security",
    "/changelog",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const toolPages = ALL_TOOLS.filter((tool) => tool.indexable !== false).map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const categoryPages = TOOL_CATEGORIES.filter((category) => category.indexable).map((cat) => ({
    url: `${SITE_URL}/categories/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const guidePages = ALL_GUIDES.map((guide) => ({
    url: `${SITE_URL}/guides/${guide.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...guidePages];
}
