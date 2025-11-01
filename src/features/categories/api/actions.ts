"use server";

import { serverApi } from "@/src/lib/api/server-api";
import { Category, InsightType } from "../types";

export async function getCategoriesAction(): Promise<Category[]> {
  return serverApi.get<Category[]>("categories");
}

export async function getCategoryInsightsAction(
  categoryId: string
): Promise<InsightType[]> {
  return serverApi.get<InsightType[]>(`/categories/${categoryId}/insights`);
}
