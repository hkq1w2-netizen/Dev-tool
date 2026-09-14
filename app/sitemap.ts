import { MetadataRoute } from "next";
import { ALL_TOOLS, TOOL_CATEGORIES } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://devkitlab.com";

  const staticPages = [
    "",
    "/tools",
    "/pricing",
    "/guides",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/security",
    "/changelog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const toolPages = ALL_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const categoryPages = TOOL_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...categoryPages];
}
