"use client";

import { useRouter } from "next/navigation";
import { CategoryUI } from "@/src/features/categories/utils";
import CategoryIcon from "./CategoryIcon";

interface CategoryButtonProps {
  category: CategoryUI;
  index: number;
}

export default function CategoryButton({ category }: CategoryButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/category/${category.name}`)}
      className={`w-full group flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all ${category.bg}`}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
      >
        <CategoryIcon
          iconName={category.iconName}
          className="w-6 h-6 text-white"
        />
      </div>
      <div className="flex-1 text-left">
        <div className="font-semibold text-gray-900">
          {category.display_name}
        </div>
        <div className="text-xs text-gray-600">Upload & analyze</div>
      </div>
      <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all">
        →
      </div>
    </button>
  );
}
