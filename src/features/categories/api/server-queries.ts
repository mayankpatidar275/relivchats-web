// src/features/categories/api/server-queries.ts
import type { Category } from "../types";

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
};
