import { generateSeoMetadata } from "@/lib/seo/metadata";
import ToolsDirectoryClient from "@/components/tools/ToolsDirectoryClient";

export const metadata = generateSeoMetadata({
  title: "All Free Online Tools & Utilities",
  description: "Browse free browser-based tools for PDFs, images, developers, text, conversions, calculators, and everyday tasks.",
  path: "/tools",
  keywords: [
    "free online tools",
    "online utilities",
    "browser tools",
    "developer and productivity tools",
  ],
});

export default function ToolsDirectoryPage() {
  return <ToolsDirectoryClient />;
}
