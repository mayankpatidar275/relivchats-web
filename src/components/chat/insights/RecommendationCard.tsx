"use client";

import { Lightbulb, Users } from "lucide-react";
import { RecommendationItem } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";

interface RecommendationCardProps {
  recommendation: RecommendationItem;
  categorySlug?: string;
}

export default function RecommendationCard({
  recommendation,
  categorySlug,
}: RecommendationCardProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div
      className={`p-5 rounded-xl border-2 ${theme.bg} ${theme.text.replace(
        "text-",
        "border-"
      )} bg-opacity-10`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg ${theme.bg} flex items-center justify-center shrink-0`}
        >
          <Lightbulb className={`w-5 h-5 ${theme.text}`} />
        </div>
        <div className="flex-1">
          <h5 className="font-bold text-gray-900 mb-1">
            {recommendation.recommendation_title}
          </h5>
          {/* Target participants */}
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="w-3 h-3 text-gray-500" />
            {recommendation.target_participants.map((participant, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-700 border border-gray-200"
              >
                {participant}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Suggestion */}
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">
            💬 Suggestion:
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {recommendation.suggestion}
          </p>
        </div>

        {/* Why it helps */}
        <div>
          <p className="text-sm font-medium text-gray-900 mb-1">✨ Why:</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            {recommendation.why_it_helps}
          </p>
        </div>

        {/* Example if present */}
        {recommendation.example && (
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-700 mb-1">
              Try saying:
            </p>
            <p className="text-sm italic text-gray-600 bg-white p-2 rounded-lg">
              &quot;{recommendation.example}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
