"use client";

import { useCategories } from "@/src/features/categories/api";
import { getCategoryColors } from "@/src/features/categories/utils";
import { Upload, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActionsSection() {
  const router = useRouter();
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="animate-pulse space-y-3">
          <div className="h-5 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-linear-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
          <Upload className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Quick Upload</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Choose a category to start analyzing
      </p>

      {/* Category buttons - Compact */}
      <div className="space-y-2">
        {categories?.map((category) => {
          const colors = getCategoryColors(category.name);

          return (
            <button
              key={category.id}
              onClick={() => router.push(`/category/${category.name}`)}
              className="w-full group flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`text-2xl shrink-0 group-hover:scale-110 transition-transform`}
                >
                  {category.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`text-sm font-bold ${colors.textColor}`}>
                    {category.display_name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {category.insights_count} insights • {category.base_cost}{" "}
                    coins
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Or Upload Directly */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => router.push("/#home-upload")}
          className="w-full py-2.5 text-sm font-medium text-primary hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Without Category
        </button>
      </div>
    </div>
  );
}
