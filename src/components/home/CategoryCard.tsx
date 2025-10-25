"use client";

import { useRouter } from "next/navigation";
import Card from "@/src/components/ui/Card";
import Badge from "@/src/components/ui/Badge";
import { Category } from "@/src/types/category";
import { cn } from "@/src/lib/utils";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  return (
    <Card
      hover
      className={cn(
        "group relative overflow-hidden bg-gradient-to-br",
        category.gradient,
        "border-2 hover:border-[--color-primary] transition-all duration-300"
      )}
      onClick={() => router.push(`/category/${category.slug}`)}
    >
      {/* Icon */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-5xl transition-transform duration-300 group-hover:scale-110">
          {category.icon}
        </div>
        <Badge variant="primary" size="sm">
          {category.insights_count} insights
        </Badge>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-[--color-gray-900] group-hover:text-[--color-primary] transition-colors">
          {category.name}
        </h3>
        <p className="text-[--color-gray-600] text-sm leading-relaxed line-clamp-2">
          {category.description}
        </p>

        {/* Cost indicator */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-[--color-gray-500]">Starting from</span>
          <span className="font-semibold text-[--color-primary]">
            {category.base_cost} coins
          </span>
        </div>
      </div>

      {/* Hover effect gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none",
          category.color
        )}
      />
    </Card>
  );
}
