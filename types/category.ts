import { ToolCategorySlug } from "@/types/tool";

export interface CategoryDefinition {
  slug: ToolCategorySlug;
  name: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  relatedCategories: ToolCategorySlug[];
  seoTitle: string;
  seoDescription: string;
  indexable: boolean;
}
