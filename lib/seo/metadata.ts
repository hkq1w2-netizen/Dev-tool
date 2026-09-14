import { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devtool.online";
const SITE_NAME = "DevTool.online";

export function generateSeoMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${APP_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      "devtool",
      "developer tools online",
      "free developer utilities",
      "browser devtools",
      "json formatter online",
      "base64 encoder decoder",
      "uuid generator v4",
      "regex tester javascript",
      "unix timestamp converter",
      "html css beautifier",
      ...keywords,
    ],
    authors: [{ name: "DevTool.online Team" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@devtool_online",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
