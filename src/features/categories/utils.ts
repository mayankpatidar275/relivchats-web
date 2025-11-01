import { Category } from "./types";

export interface CategoryUI extends Category {
  color: string;
  gradient: string;
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
    ...colors,
  };
}
