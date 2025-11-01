"use client";

import { useCategories } from "@/src/features/categories/api";
import { useAssignCategory } from "@/src/features/chats/api";
import { Check } from "lucide-react";
import { useState } from "react";

interface CategorySelectorProps {
  chatId: string;
}

export default function CategorySelector({ chatId }: CategorySelectorProps) {
  const assignCategoryMutation = useAssignCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
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

  // Color mapping
  const colorMap: Record<
    string,
    {
      gradient: string;
      border: string;
      bg: string;
      text: string;
    }
  > = {
    romantic: {
      gradient: "from-romantic-from to-romantic-to",
      border: "border-pink-200 hover:border-pink-400",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    friendship: {
      gradient: "from-friendship-from to-friendship-to",
      border: "border-blue-200 hover:border-blue-400",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    family: {
      gradient: "from-family-from to-family-to",
      border: "border-green-200 hover:border-green-400",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    work: {
      gradient: "from-work-from to-work-to",
      border: "border-purple-200 hover:border-purple-400",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
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
              relationship dynamics
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories?.map((category) => {
              const colors = colorMap[category.name];
              const isSelected = selectedCategoryId === category.id;
              const isLoading = assignCategoryMutation.isPending && isSelected;

              return (
                <button
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  disabled={isLoading}
                  className={`relative group text-left rounded-3xl border-2 ${
                    isSelected
                      ? colors.border.split(" ")[0].replace("hover:", "")
                      : colors.border
                  } bg-linear-to-br ${
                    colors.bg
                  } p-8 transition-all duration-300 hover:shadow-xl disabled:opacity-50`}
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <div
                      className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-linear-to-br ${colors.gradient} flex items-center justify-center`}
                    >
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="text-6xl mb-6">{category.icon}</div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className={`text-3xl font-bold ${colors.text}`}>
                      {category.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center gap-2 pt-4">
                      <span className="text-sm text-gray-600">
                        Unlock all insights for
                      </span>
                      <span className={`text-2xl font-bold ${colors.text}`}>
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
