"use client";

import { useChat } from "@/src/features/chats/api";
import { useChatInsights } from "@/src/features/insights/api/hooks";
import { useCategoryTheme } from "@/src/lib/theme";
import { Sparkles, TrendingUp, Loader2 } from "lucide-react";

interface InsightsDisplaySectionProps {
  chatId: string;
}

export default function InsightsDisplaySection({
  chatId,
}: InsightsDisplaySectionProps) {
  const { data: chat } = useChat(chatId);
  const { data: insights, isLoading } = useChatInsights(chatId);
  const theme = useCategoryTheme(chat?.category_slug);

  // Only show if insights are unlocked
  if (!chat || !chat.insights_unlocked) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <p className="text-gray-600">Loading insights...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!insights || insights.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              theme.bg
            } border-2 ${theme.text.replace("text-", "border-")} mb-6`}
          >
            <Sparkles className={`w-4 h-4 ${theme.text}`} />
            <span className={`text-sm font-semibold ${theme.text}`}>
              AI Insights Unlocked
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your {chat.category_name} Analysis
          </h2>
          <p className="text-lg text-gray-600">
            Deep insights powered by advanced AI analysis of your conversations
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-linear-to-br ${theme.gradient} flex items-center justify-center text-3xl shrink-0`}
                >
                  {insight.icon || "💡"}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {insight.display_title}
                  </h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </div>

              {/* Status badge */}
              {insight.status === "generating" && (
                <div className="mb-6 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    Generating insight...
                  </span>
                </div>
              )}

              {insight.status === "failed" && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <span className="text-sm font-medium text-red-700">
                    Failed to generate this insight. Please try again.
                  </span>
                </div>
              )}

              {/* Insight content - only show if completed */}
              {insight.status === "completed" && insight.content && (
                <div
                  className={`${
                    theme.bg
                  } rounded-2xl p-6 border-2 ${theme.text.replace(
                    "text-",
                    "border-"
                  )}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className={`w-5 h-5 ${theme.text}`} />
                    <span className={`font-semibold ${theme.text}`}>
                      Key Finding:
                    </span>
                  </div>

                  {/* Render insight content dynamically based on structure */}
                  <div className="text-gray-800 leading-relaxed mb-4">
                    {typeof insight.content === "string"
                      ? insight.content
                      : JSON.stringify(insight.content, null, 2)}
                  </div>

                  {/* Confidence/metrics if available */}
                  {insight.content.confidence && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">
                        Confidence Score
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${theme.gradient}`}
                            style={{ width: `${insight.content.confidence}%` }}
                          />
                        </div>
                        <span className={`font-bold ${theme.text}`}>
                          {insight.content.confidence}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Recommendations if available */}
              {insight.status === "completed" &&
                insight.content?.recommendations && (
                  <div className="mt-6 space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      💡 Recommendations:
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {insight.content.recommendations.map(
                        (rec: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className={`${theme.text} font-bold`}>•</span>
                            <span>{rec}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
