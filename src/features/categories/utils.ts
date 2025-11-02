import { Category } from "./types";

export interface CategoryUI extends Category {
  color: string;
  gradient: string;
  bg: string;
  iconName: string;
  textColor: string;
  borderColor: string;
}

const colorMap: Record<
  string,
  {
    color: string;
    gradient: string;
    bg: string;
    iconName: string;
    textColor: string;
    borderColor: string;
  }
> = {
  romantic: {
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
    bg: "bg-pink-50",
    iconName: "Heart",
    textColor: "text-pink-600",
    borderColor: "border-pink-600",
  },
  friendship: {
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
    bg: "bg-blue-50",
    iconName: "Users",
    textColor: "text-blue-600",
    borderColor: "border-blue-600",
  },
  family: {
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-50 to-emerald-50",
    bg: "bg-green-50",
    iconName: "Home",
    textColor: "text-green-600",
    borderColor: "border-green-600",
  },
  work: {
    color: "from-purple-500 to-indigo-500",
    gradient: "from-purple-50 to-indigo-50",
    bg: "bg-purple-50",
    iconName: "Briefcase",
    textColor: "text-purple-600",
    borderColor: "border-purple-600",
  },
};

export function toCategoryUI(category: Category): CategoryUI {
  const colors = colorMap[category.name] || colorMap.romantic;
  return {
    ...category,
    ...colors,
  };
}
