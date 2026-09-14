import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  slug: string;
  name: string;
  description: string;
  icon: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
  order: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Folder" },
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
