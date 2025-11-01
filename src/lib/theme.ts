export interface CategoryTheme {
  name: string;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  text: string;
  bg: string;
  bgLight: string;
  border: string;
  borderHover: string;
  accent: string;
}

export const categoryThemes: Record<string, CategoryTheme> = {
  romantic: {
    name: "romantic",
    gradient: "from-pink-500 to-rose-500",
    gradientFrom: "#ec4899",
    gradientTo: "#f43f5e",
    text: "text-pink-600",
    bg: "bg-pink-50",
    bgLight: "bg-pink-100",
    border: "border-pink-200",
    borderHover: "hover:border-pink-400",
    accent: "#ec4899",
  },
  friendship: {
    name: "friendship",
    gradient: "from-blue-500 to-cyan-500",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
    text: "text-blue-600",
    bg: "bg-blue-50",
    bgLight: "bg-blue-100",
    border: "border-blue-200",
    borderHover: "hover:border-blue-400",
    accent: "#3b82f6",
  },
  family: {
    name: "family",
    gradient: "from-green-500 to-emerald-500",
    gradientFrom: "#22c55e",
    gradientTo: "#10b981",
    text: "text-green-600",
    bg: "bg-green-50",
    bgLight: "bg-green-100",
    border: "border-green-200",
    borderHover: "hover:border-green-400",
    accent: "#22c55e",
  },
  work: {
    name: "work",
    gradient: "from-purple-500 to-indigo-500",
    gradientFrom: "#a855f7",
    gradientTo: "#6366f1",
    text: "text-purple-600",
    bg: "bg-purple-50",
    bgLight: "bg-purple-100",
    border: "border-purple-200",
    borderHover: "hover:border-purple-400",
    accent: "#a855f7",
  },
  default: {
    name: "default",
    gradient: "from-gray-500 to-gray-600",
    gradientFrom: "#6b7280",
    gradientTo: "#4b5563",
    text: "text-gray-600",
    bg: "bg-gray-50",
    bgLight: "bg-gray-100",
    border: "border-gray-200",
    borderHover: "hover:border-gray-400",
    accent: "#6b7280",
  },
};

export function getCategoryTheme(categorySlug?: string | null): CategoryTheme {
  if (!categorySlug) return categoryThemes.default;
  return categoryThemes[categorySlug] || categoryThemes.default;
}

// Hook to get theme colors
export function useCategoryTheme(categorySlug?: string | null) {
  return getCategoryTheme(categorySlug);
}
