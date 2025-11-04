"use client";

import { CategoryUI } from "@/src/features/categories/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface CategoryHeroProps {
  category: CategoryUI;
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const router = useRouter();

  return (
    <section
      className={`relative py-8 sm:py-12 bg-linear-to-br ${category.bg} to-white`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors group text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back</span>
        </button>

        {/* Compact header */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Icon */}
          <div className="relative shrink-0">
            <div
              className={`absolute inset-0 bg-linear-to-br ${category.color} rounded-2xl blur-xl opacity-50`}
            />
            <div className="relative text-5xl sm:text-6xl md:text-7xl">
              {category.icon}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
              {category.display_name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 sm:mb-4">
              {category.description}
            </p>

            {/* Compact stats */}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-primary text-base sm:text-lg">
                  {category.insights_count}
                </span>
                <span className="text-gray-600">AI Insights</span>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-primary text-base sm:text-lg">
                  {category.base_cost}
                </span>
                <span className="text-gray-600">Coins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
