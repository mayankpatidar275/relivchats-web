"use client";

import { useCategoryInsights } from "@/src/features/categories/api";
import { useChat, useUnlockInsights } from "@/src/features/chats/api";
import { getCategoryColors } from "@/src/features/categories/utils";
import { Lock, Sparkles, Check, Zap, AlertCircle } from "lucide-react";
import { useState } from "react";

interface UnlockInsightsSectionProps {
  chatId: string;
  selectedCategoryId: string | null;
}

export default function UnlockInsightsSection({
  chatId,
  selectedCategoryId,
}: UnlockInsightsSectionProps) {
  const { data: chat } = useChat(chatId);
  const { data: insights } = useCategoryInsights(selectedCategoryId || "");
  const unlockMutation = useUnlockInsights();
  const [isUnlocking, setIsUnlocking] = useState(false);

  // Don't show if already unlocked or if chat already has a category
  if (!chat || chat.insights_unlocked || chat.category_id) {
    return null;
  }

  // Don't show if no category selected
  if (!selectedCategoryId) {
    return null;
  }

  const colors = getCategoryColors(insights?.[0]?.category_slug || "romantic");

  const handleUnlock = async () => {
    if (!selectedCategoryId) {
      alert("Please select a category first");
      return;
    }

    setIsUnlocking(true);
    try {
      await unlockMutation.mutateAsync({
        chat_id: chatId,
        category_id: selectedCategoryId,
      });
    } catch (error) {
      console.error("Failed to unlock insights:", error);
      alert("Failed to unlock insights. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const totalCost = insights?.reduce((sum, i) => sum + i.credit_cost, 0) || 0;
  const insightCount = insights?.length || 0;
  const categoryName =
    insights?.[0]?.category_name || chat.category_name || "relationship";

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-8 md:p-12">
            {/* Background decoration */}
            <div
              className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colors.color} rounded-full blur-3xl opacity-10`}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 ${colors.lightBg} border ${colors.lightBorder} rounded-full mb-6`}
                >
                  <Lock className={`w-4 h-4 ${colors.textColor}`} />
                  <span className={`text-sm font-semibold ${colors.textColor}`}>
                    Unlock Required
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Ready for Deeper Insights?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Unlock all {insightCount} AI-powered {categoryName} insights
                  and discover hidden patterns.
                </p>
              </div>

              {/* Insights preview */}
              {insights && insights.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {insights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className="bg-white rounded-2xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow"
                    >
                      <div className="text-3xl mb-2">
                        {insight.icon || "💡"}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        {insight.display_title}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* What you'll get */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className={colors.textColor} />
                  What You&apos;ll Get:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    `All ${insightCount} AI-powered insights`,
                    "Deep emotional analysis",
                    "Communication patterns",
                    "Visual reports & charts",
                    "Actionable recommendations",
                    "Lifetime access to results",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check
                        className={`w-5 h-5 ${colors.textColor} shrink-0`}
                      />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className={`rounded-2xl p-8 text-white text-center bg-gradient-to-br ${colors.color}`}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div>
                    <div className="text-6xl font-bold">{totalCost}</div>
                    <div className="text-sm text-white/80">coins</div>
                  </div>
                  <div className="text-left">
                    <div className="text-xl font-semibold">One-time unlock</div>
                    <div className="text-sm text-white/80">
                      All insights included
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUnlock}
                  disabled={isUnlocking}
                  className="group w-full md:w-auto px-12 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
                >
                  {isUnlocking ? (
                    <>
                      <div className="w-5 h-5 border-3 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Unlock All Insights Now
                    </>
                  )}
                </button>

                <p className="text-sm text-white/80 mt-4">
                  <AlertCircle className="w-4 h-4 inline mr-1" />
                  This will also assign the selected category to your chat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
