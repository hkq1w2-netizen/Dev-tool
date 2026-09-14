import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/layout/CommandPalette";

export const metadata: Metadata = {
  title: "DevTool.online — Fast, Privacy-Conscious Developer Utilities",
  description: "Developer tools that just work. Format JSON, validate schemas, encode Base64, generate UUIDs, test Regex, and convert timestamps instantly in your browser.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://devtools.online"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-brand-500 selection:text-white">
        <Header />
        <CommandPalette />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
