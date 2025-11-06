import { clientApi } from "@/src/lib/api/client-api";
import type { Category, InsightType } from "../types";

export const categoriesClientApi = {
  getCategories: async (): Promise<Category[]> => {
    return clientApi.get<Category[]>("categories");
  },
  getCategoryInsights: async (categoryId: string): Promise<InsightType[]> => {
    return clientApi.get<InsightType[]>(`categories/${categoryId}/insights`);
  },
};
