export type ProcessingMode = "CLIENT" | "SERVER" | "HYBRID";
export type PrivacyMode = "LOCAL" | "REMOTE" | "HYBRID";

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
  | "api"
  | "text"
  | "converters"
  | "calculators"
  | "security"
  | "images"
  | "pdf";

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
  processingMode: ProcessingMode;
  supportedInputs: string[];
  supportedOutputs: string[];
  keywords: string[];
  aliases?: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  faqs: ToolFAQItem[];
  howTo: string[];
  features: string[];
  limitations: string[];
  relatedToolSlugs: string[];
  privacyMode?: PrivacyMode;
  indexable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ToolExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  metadata?: Record<string, unknown>;
}
