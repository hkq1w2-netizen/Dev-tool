export type ProcessingMode = "CLIENT" | "SERVER" | "HYBRID";

export type ToolCategorySlug =
  | "json"
  | "encoding"
  | "generators"
  | "time"
  | "regex"
  | "hash"
  | "html"
  | "css"
  | "javascript"
  | "sql"
  | "colors"
  | "markdown"
  | "yaml-xml"
  | "api";

export interface ToolFAQItem {
  question: string;
  answer: string;
}

export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ToolCategorySlug;
  categoryName: string;
  icon: string;
  status: "active" | "beta" | "deprecated";
  isFree: boolean;
  isPremium: boolean;
  processingMode: ProcessingMode;
  supportedInputs: string[];
  supportedOutputs: string[];
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  faqs: ToolFAQItem[];
  howTo: string[];
  features: string[];
  limitations: string[];
  relatedToolSlugs: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ToolExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  metadata?: Record<string, unknown>;
}
