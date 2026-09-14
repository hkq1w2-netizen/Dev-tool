import { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devkitlab.com";
const SITE_NAME = "DevKitLab";

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
      "DevKitLab",
      "DevKitLab developer tools",
      "free browser developer tools",
      "privacy-first developer utilities",
      "online json formatter validator",
      "base64 encoder decoder browser",
      "client side uuid generator",
      "regex tester debugger online",
      "epoch unix timestamp converter",
      "jwt token decoder validator",
      "html css javascript beautifier minifier",
      "cron expression parser online",
      "markdown previewer editor",
      "diff checker code comparison",
      "color code hex rgb converter",
      "hash generator md5 sha256",
      ...keywords,
    ],
    authors: [{ name: "DevKitLab Engineering Team" }],
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
      creator: "@devkitlab",
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
