import { Category } from "@/src/types/category";

export interface CategoryUI extends Category {
  slug: string; // same as name
  color: string;
  gradient: string;
  id: string;
  name: string;
}

const colorMap: Record<string, { color: string; gradient: string }> = {
  romantic: {
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
  },
  friendship: {
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
  },
  family: {
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-50 to-emerald-50",
  },
  work: {
    color: "from-purple-500 to-indigo-500",
    gradient: "from-purple-50 to-indigo-50",
  },
};

export function toCategoryUI(category: Category): CategoryUI {
  const colors = colorMap[category.name] || colorMap.romantic;
  return {
    ...category,
    slug: category.name, // name IS the slug
    ...colors,
  };
}
