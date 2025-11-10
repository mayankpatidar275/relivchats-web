"use client";

import { useCategoryTheme } from "@/src/lib/theme";

interface InsightSummary {
  id: string;
  icon?: string;
  title: string;
  score?: number;
  keyFinding: string;
  status: "completed" | "generating" | "failed";
}

interface InsightSummaryGridProps {
  insights: InsightSummary[];
  categorySlug?: string;
  onInsightClick: (insightId: string) => void;
}

export default function InsightSummaryGrid({
  insights,
  categorySlug,
  onInsightClick,
}: InsightSummaryGridProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        📊 Your Relationship at a Glance
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <button
            key={insight.id}
            onClick={() => onInsightClick(insight.id)}
            disabled={insight.status !== "completed"}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              insight.status === "completed"
                ? `${theme.bg} ${theme.text.replace(
                    "text-",
                    "border-"
                  )} bg-opacity-10 hover:bg-opacity-20 cursor-pointer`
                : "bg-gray-50 border-gray-200 cursor-not-allowed opacity-50"
            }`}
          >
            {/* Icon and score */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{insight.icon}</span>
              {insight.score !== undefined &&
                insight.status === "completed" && (
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${theme.text}`}>
                      {insight.score}
                    </div>
                    <div className="text-xs text-gray-500">/ 10</div>
                  </div>
                )}
            </div>

            {/* Title */}
            <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-2">
              {insight.title}
            </h4>

            {/* Key finding or status */}
            {insight.status === "completed" ? (
              <p className="text-xs text-gray-600 line-clamp-2">
                {insight.keyFinding}
              </p>
            ) : insight.status === "generating" ? (
              <p className="text-xs text-blue-600 font-medium">Generating...</p>
            ) : (
              <p className="text-xs text-red-600 font-medium">Failed</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
