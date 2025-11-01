"use client";

import { useCategories } from "@/src/features/categories/api";
import { useAssignCategory } from "@/src/features/chats/api";
import { getCategoryTheme } from "@/src/lib/theme";
import { Check } from "lucide-react";
import { useState } from "react";

interface CategorySelectorProps {
  chatId: string;
}

export default function CategorySelector({ chatId }: CategorySelectorProps) {
  const { data: categories } = useCategories();
  const assignCategoryMutation = useAssignCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleSelectCategory = async (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    try {
      await assignCategoryMutation.mutateAsync({
        chat_id: chatId,
        category_id: categoryId,
      });
    } catch (error) {
      console.error("Failed to assign category:", error);
      setSelectedCategoryId(null);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Relationship Type
            </h2>
            <p className="text-xl text-gray-600">
              Select a category to unlock AI-powered insights tailored to your
              relationship
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories?.map((category) => {
              const theme = getCategoryTheme(category.name);
              const isSelected = selectedCategoryId === category.id;
              const isLoading = assignCategoryMutation.isPending && isSelected;

              return (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  disabled={isLoading}
                  className={`relative group text-left rounded-3xl border-2 ${
                    isSelected
                      ? theme.border.replace("border-", "border-")
                      : theme.border
                  } ${
                    theme.bg
                  } p-8 transition-all duration-300 hover:shadow-xl disabled:opacity-50`}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${theme.gradientFrom}15, ${theme.gradientTo}15)`
                      : undefined,
                  }}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientTo})`,
                      }}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-6xl mb-6">{category.icon}</div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className={`text-3xl font-bold ${theme.text}`}>
                      {category.display_name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center gap-2 pt-4">
                      <span className="text-sm text-gray-600">
                        Unlock all insights for
                      </span>
                      <span className={`text-2xl font-bold ${theme.text}`}>
                        {category.base_cost}
                      </span>
                      <span className="text-sm text-gray-600">coins</span>
                    </div>
                  </div>

                  {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
