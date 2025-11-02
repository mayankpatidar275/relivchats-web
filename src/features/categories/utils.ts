import { Category } from "./types";

export interface CategoryUI extends Category {
  color: string;
  gradient: string;
  bg: string;
  iconName: string;
  textColor: string;
  borderColor: string;
  lightBorder: string; // Add this for border-pink-200 etc
  lightBg: string; // Add this for lighter backgrounds
  badgeBg: string; // Add this
  badgeText: string; // Add this
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
    lightBorder: string;
    lightBg: string;
    badgeBg: string; // Add this
    badgeText: string; // Add this
  }
> = {
  romantic: {
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
    bg: "bg-pink-50",
    iconName: "Heart",
    textColor: "text-pink-600",
    borderColor: "border-pink-600",
    lightBorder: "border-pink-200",
    lightBg: "bg-pink-50",
    badgeBg: "bg-pink-100",
    badgeText: "text-pink-700",
  },
  friendship: {
    color: "from-blue-500 to-cyan-500",
    gradient: "from-blue-50 to-cyan-50",
    bg: "bg-blue-50",
    iconName: "Users",
    textColor: "text-blue-600",
    borderColor: "border-blue-600",
    lightBorder: "border-blue-200",
    lightBg: "bg-blue-50",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
  },
  family: {
    color: "from-green-500 to-emerald-500",
    gradient: "from-green-50 to-emerald-50",
    bg: "bg-green-50",
    iconName: "Home",
    textColor: "text-green-600",
    borderColor: "border-green-600",
    lightBorder: "border-green-200",
    lightBg: "bg-green-50",
    badgeBg: "bg-green-100",
    badgeText: "text-green-700",
  },
  work: {
    color: "from-purple-500 to-indigo-500",
    gradient: "from-purple-50 to-indigo-50",
    bg: "bg-purple-50",
    iconName: "Briefcase",
    textColor: "text-purple-600",
    borderColor: "border-purple-600",
    lightBorder: "border-purple-200",
    lightBg: "bg-purple-50",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-700",
  },
};

export function toCategoryUI(category: Category): CategoryUI {
  const colors = colorMap[category.name] || colorMap.romantic;
  return {
    ...category,
    ...colors,
  };
}

export function getCategoryColors(categorySlug: string) {
  const colors = colorMap[categorySlug] || colorMap.romantic;
  return colors;
}
