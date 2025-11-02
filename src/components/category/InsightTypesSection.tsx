"use client";

import { CategoryUI } from "@/src/features/categories/utils";
import { Sparkles, Check } from "lucide-react";

interface InsightTypesSectionProps {
  category: CategoryUI;
}

export default function InsightTypesSection({
  category,
}: InsightTypesSectionProps) {
  const insights = category.insight_types; // Use insights from API

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
      border: "border-pink-200",
      bg: "bg-pink-50",
      text: "text-pink-600",
    },
    friendship: {
      gradient: "from-friendship-from to-friendship-to",
      border: "border-blue-200",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    family: {
      gradient: "from-family-from to-family-to",
      border: "border-green-200",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    work: {
      gradient: "from-work-from to-work-to",
      border: "border-purple-200",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  };

  const colors = colorMap[category.name] || colorMap.romantic;

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
              What You&apos;ll Get
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Complete{" "}
            <span className={colors.text}>{category.display_name}</span>{" "}
            Analysis
          </h2>

          <p className="text-lg text-gray-600">
            Unlock all {category.insights_count} AI-powered insights with deep
            analysis of your {category.display_name.toLowerCase()}{" "}
            conversations.
          </p>
        </div>

        {/* Insights grid - Preview only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={`relative rounded-2xl border-2 ${colors.border} bg-white p-6 hover:shadow-lg transition-all duration-300`}
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{insight.icon || "💡"}</div>
                <div
                  className={`w-6 h-6 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}
                >
                  <Check className={`w-4 h-4 ${colors.text}`} />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {insight.display_title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {insight.description || "AI-powered insight analysis"}
                </p>

                {/* Cost badge */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Cost:</span>
                  <span className={`text-sm font-bold ${colors.text}`}>
                    {insight.credit_cost} coins
                  </span>
                  {insight.credit_cost && (
                    <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-semibold">
                      Premium
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing card */}
        <div
          className={`max-w-2xl mx-auto bg-linear-to-br ${colors.gradient} rounded-3xl p-8 text-center text-white shadow-2xl`}
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Complete Package</span>
            </div>

            <h3 className="text-3xl font-bold">
              Unlock All {category.display_name} Insights
            </h3>

            <div className="flex items-center justify-center gap-3">
              <span className="text-6xl font-bold">{category.base_cost}</span>
              <div className="text-left">
                <div className="text-xl font-semibold">coins</div>
                <div className="text-sm text-white/80">one-time</div>
              </div>
            </div>

            <div className="pt-4 space-y-2 text-white/90">
              <p className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                All {category.insights_count} AI-powered insights
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Deep analysis & patterns
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Actionable recommendations
              </p>
              <p className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                Visual reports & charts
              </p>
            </div>

            <p className="text-sm text-white/80 max-w-md mx-auto pt-4">
              Upload your chat below. You&apos;ll get free basic stats
              immediately, and can unlock these insights anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
