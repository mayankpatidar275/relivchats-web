"use client";

import { Category, INSIGHT_TYPES } from "@/src/types/category";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

interface InsightTypesSectionProps {
  category: Category;
}

export default function InsightTypesSection({
  category,
}: InsightTypesSectionProps) {
  const insights = INSIGHT_TYPES[category.slug] || [];
  const [selectedInsights, setSelectedInsights] = useState<string[]>([]);

  const totalCost = insights
    .filter((insight) => selectedInsights.includes(insight.id))
    .reduce((sum, insight) => sum + insight.cost, 0);

  const toggleInsight = (id: string) => {
    setSelectedInsights((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
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

  const colors = colorMap[category.slug] || colorMap.romantic;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} border ${colors.border} mb-6`}
          >
            <Sparkles className={`w-4 h-4 ${colors.text}`} />
            <span className={`text-sm font-semibold ${colors.text}`}>
              Available Insights
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{" "}
            <span className={`${colors.text}`}>{category.name}</span> Insights
          </h2>

          <p className="text-lg text-gray-600">
            Select the insights you want to unlock. Each insight provides deep
            analysis powered by advanced AI models.
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {insights.map((insight) => {
            const isSelected = selectedInsights.includes(insight.id);

            return (
              <div
                key={insight.id}
                onClick={() => toggleInsight(insight.id)}
                className={`relative group cursor-pointer rounded-2xl border-2 ${
                  isSelected
                    ? `${colors.border.split(" ")[0].replace("hover:", "")} ${
                        colors.bg
                      }`
                    : "border-gray-200 bg-white hover:border-gray-300"
                } p-6 transition-all duration-300 ${
                  isSelected ? "shadow-xl" : "hover:shadow-lg"
                }`}
              >
                {/* Selection indicator */}
                <div
                  className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? `${colors.border
                          .split(" ")[0]
                          .replace("hover:", "")} bg-linear-to-br ${
                          colors.gradient
                        }`
                      : "border-gray-300 bg-white group-hover:border-gray-400"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{insight.icon}</div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      {insight.name}
                    </h3>
                    <span className={`text-lg font-bold ${colors.text}`}>
                      {insight.cost} coins
                    </span>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {insight.description}
                  </p>

                  {/* Example */}
                  <div
                    className={`mt-4 p-3 rounded-xl ${colors.bg} border ${colors.border}`}
                  >
                    <p className={`text-sm font-medium ${colors.text} mb-1`}>
                      Example Result:
                    </p>
                    <p className="text-sm text-gray-700">
                      &quot;{insight.example}&quot;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection summary */}
        {selectedInsights.length > 0 && (
          <div
            className={`max-w-2xl mx-auto bg-linear-to-br ${colors.gradient} rounded-2xl p-8 text-center text-white shadow-2xl`}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                {selectedInsights.length} Insight
                {selectedInsights.length > 1 ? "s" : ""} Selected
              </h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-bold">{totalCost}</span>
                <span className="text-xl">coins total</span>
              </div>
              <p className="text-white/90 max-w-md mx-auto">
                Upload your chat below to get these insights. You&apos;ll only
                be charged when you unlock them.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
