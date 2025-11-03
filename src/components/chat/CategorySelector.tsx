"use client";

import { useCategories } from "@/src/features/categories/api";
import { getCategoryColors } from "@/src/features/categories/utils";
import { Check } from "lucide-react";

interface CategorySelectorProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export default function CategorySelector({
  selectedCategoryId,
  onSelectCategory,
}: CategorySelectorProps) {
  const { data: categories } = useCategories();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Relationship Type
            </h2>
            <p className="text-xl text-gray-600">
              Select a category to see tailored AI-powered insights
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories?.map((category) => {
              const colors = getCategoryColors(category.name);
              const isSelected = selectedCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`relative group text-left rounded-3xl border-2 transition-all duration-300 hover:shadow-xl ${
                    isSelected
                      ? `${colors.borderColor} bg-linear-to-br ${colors.gradient} to-white`
                      : `${colors.lightBorder} bg-white hover:${colors.borderColor}`
                  } p-8`}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-linear-to-br ${colors.color} flex items-center justify-center shadow-lg`}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className={`text-3xl font-bold ${colors.textColor}`}>
                      {category.display_name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-600">
                          {category.insights_count} insights
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`font-bold ${colors.textColor}`}>
                          {category.base_cost} coins
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
