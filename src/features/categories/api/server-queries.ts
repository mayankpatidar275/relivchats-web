// src/features/categories/api/server-queries.ts
import type { Category, InsightType } from "../types";

export const categoriesApi = {
  // Public endpoint - no auth needed
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      {
        cache: "force-cache",
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  },

  // Client-side only - needs auth
  getCategoryInsights: async (categoryId: string): Promise<InsightType[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories/${categoryId}/insights`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch insights");
    }

    return response.json();
  },
};
// export const categoriesApi = {
//   getCategories: async (): Promise<Category[]> => {
//     return serverApi.get<Category[]>("categories");
//   },
//   getCategoryInsights: async (categoryId: string): Promise<InsightType[]> => {
//     return serverApi.get<InsightType[]>(`/categories/${categoryId}/insights`);
//   },
// };
