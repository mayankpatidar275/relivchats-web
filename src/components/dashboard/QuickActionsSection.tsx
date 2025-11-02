"use client";

import { useCategories } from "@/src/features/categories/api";
import { toCategoryUI } from "@/src/features/categories/utils";
import { Upload } from "lucide-react";
import CategoryButton from "../category/CategoryButton";

export default function QuickActionsSection() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <section
        id="categories"
        className="relative py-24 bg-white overflow-hidden"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-3xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Upload className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-gray-900">Upload New Chat</h3>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Choose a category to analyze your chat
      </p>

      {/* Category buttons */}
      <div className="space-y-3">
        {categories?.map((category, index) => (
          <CategoryButton
            key={category.id}
            category={toCategoryUI(category)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
