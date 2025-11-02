"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { CategoryUI } from "@/src/features/categories/utils";

interface CategoryCardProps {
  category: CategoryUI;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/category/${category.name}`)}
      className={`group relative overflow-hidden rounded-3xl border-2 ${category.lightBorder} hover:${category.borderColor} bg-linear-to-br ${category.gradient} to-white p-8 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Hover gradient overlay */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-shimmer" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon & Badge Row */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon with glow */}
          <div className="relative">
            <div
              className={`absolute inset-0 bg-linear-to-br ${category.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
            />
            <div className="relative text-6xl transform group-hover:scale-110 transition-transform duration-500">
              {category.icon}
            </div>
          </div>

          {/* Insights count badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${category.badgeBg} ${category.badgeText} ${category.lightBorder} text-sm font-semibold`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {category.insights_count}
          </div>
        </div>

        {/* Category name */}
        <h3
          className={`text-3xl font-bold mb-3 ${category.textColor} group-hover:scale-105 transition-transform duration-300 origin-left`}
        >
          {category.display_name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-700 transition-colors">
          {category.description}
        </p>

        {/* Bottom section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Pricing */}
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-4 h-4 ${category.textColor}`} />
            <span className="text-sm text-gray-500">From</span>
            <span className={`text-lg font-bold ${category.textColor}`}>
              {category.base_cost}
            </span>
            <span className="text-sm text-gray-500">coins</span>
          </div>

          {/* Arrow */}
          <div
            className={`w-10 h-10 rounded-full bg-linear-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110`}
          >
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Corner decoration */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${category.color} opacity-10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`}
      />
    </div>
  );
}
