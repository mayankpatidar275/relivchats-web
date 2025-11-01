"use client";

import { useCategories } from "@/src/features/categories/api";
import { useChat, useUnlockInsights } from "@/src/features/chats/api";
import { Lock, Sparkles, Check, Zap } from "lucide-react";
import { useState } from "react";

interface UnlockInsightsSectionProps {
  chatId: string;
}

export default function UnlockInsightsSection({
  chatId,
}: UnlockInsightsSectionProps) {
  const { data: chat } = useChat(chatId);
  const unlockMutation = useUnlockInsights();
  const [isUnlocking, setIsUnlocking] = useState(false);
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

  if (!chat) {
    return null;
  }
  // Don't show if insights unlocked or no category selected
  if (chat.insights_unlocked) {
    return null;
  }
  if (!chat.category_id) {
    return null;
  }

  const category = categories?.find((cat) => cat.name === chat.category_slug);

  if (!category) {
    return null;
  }

  const insights = category?.insight_types ?? [];

  // Color mapping (same as before)
  const colorMap: Record<
    string,
    {
      gradient: string;
      text: string;
      bg: string;
    }
  > = {
    romantic: {
      gradient: "from-romantic-from to-romantic-to",
      text: "text-pink-600",
      bg: "bg-pink-50",
    },
    friendship: {
      gradient: "from-friendship-from to-friendship-to",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    family: {
      gradient: "from-family-from to-family-to",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    work: {
      gradient: "from-work-from to-work-to",
      text: "text-purple-600",
      bg: "bg-purple-50",
    },
  };

  const colors = colorMap[category.name];

  const handleUnlock = async () => {
    setIsUnlocking(true);
    try {
      await unlockMutation.mutateAsync({
        chat_id: chatId,
        category_id: chat.category_id!,
      });
      // Success - insights will be displayed
    } catch (error) {
      console.error("Failed to unlock insights:", error);
      alert("Failed to unlock insights. Please try again.");
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main unlock card */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 p-8 md:p-12">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-primary to-accent-pink rounded-full blur-3xl opacity-10" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-full mb-6">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">
                    Unlock Required
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Ready for Deeper Insights?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Unlock all {insights.length} AI-powered{" "}
                  {category.name.toLowerCase()} insights and discover hidden
                  patterns in your conversations.
                </p>
              </div>

              {/* Features preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {insights.slice(0, 3).map((insight, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 p-4 text-center"
                  >
                    <div className="text-3xl mb-2">{insight.icon}</div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                      {insight.name}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* What you'll get */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className={colors.text} />
                  What You&apos;ll Get:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "All " + insights.length + " AI-powered insights",
                    "Deep emotional analysis",
                    "Communication patterns",
                    "Visual reports & charts",
                    "Actionable recommendations",
                    "Lifetime access to results",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className={`w-5 h-5 ${colors.text} shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div
                className={`bg-linear-to-br ${colors.gradient} rounded-2xl p-8 text-white text-center`}
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div>
                    <div className="text-6xl font-bold">
                      {category.base_cost}
                    </div>
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
                  💳 You have enough coins to unlock this analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
