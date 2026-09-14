import mongoose, { Schema, Document, Model } from "mongoose";
import { ProcessingMode } from "@/types/tool";

export interface ITool extends Document {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  icon: string;
  status: "active" | "beta" | "deprecated";
  processingMode: ProcessingMode;
  isFree: boolean;
  isPremium: boolean;
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  canonicalUrl?: string;
  features: string[];
  limitations: string[];
  howTo: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedToolSlugs: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema = new Schema<ITool>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    category: { type: String, required: true, index: true },
    icon: { type: String, default: "Wrench" },
    status: { type: String, enum: ["active", "beta", "deprecated"], default: "active" },
    processingMode: { type: String, enum: ["CLIENT", "SERVER", "HYBRID"], default: "CLIENT" },
    isFree: { type: Boolean, default: true },
    isPremium: { type: Boolean, default: false },
    keywords: [{ type: String }],
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    canonicalUrl: { type: String },
    features: [{ type: String }],
    limitations: [{ type: String }],
    howTo: [{ type: String }],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    relatedToolSlugs: [{ type: String }],
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Tool: Model<ITool> = mongoose.models.Tool || mongoose.model<ITool>("Tool", ToolSchema);
