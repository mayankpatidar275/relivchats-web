import { useQuery } from "@tanstack/react-query";
import { categoriesClientApi } from "./client-queries";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesClientApi.getCategories,
    staleTime: 1000 * 60 * 60,
  });
};

export const useCategoryInsights = (categoryId: string) => {
  return useQuery({
    queryKey: ["categories", categoryId, "insights"],
    queryFn: () => categoriesClientApi.getCategoryInsights(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 60,
  });
};
