"use client";

import {
  useCategories,
  useCategoryInsights,
} from "@/src/features/categories/api";
import { getCategoryColors } from "@/src/features/categories/utils";
import { useUnlockInsights } from "@/src/features/chats/api";
import { Check, Lock, Sparkles, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UnlockInsightsSectionProps {
  chatId: string;
  onUnlockSuccess?: () => void;
}

export default function UnlockInsightsSection({
  chatId,
  onUnlockSuccess,
}: UnlockInsightsSectionProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [isUnlocking, setIsUnlocking] = useState(false);
  const unlockMutation = useUnlockInsights();

  const { data: categories } = useCategories();
  const { data: insights } = useCategoryInsights(selectedCategoryId || "");

  const unlockSectionRef = useRef<HTMLDivElement>(null);

  const handleUnlock = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a category first");
      return;
    }

    setIsUnlocking(true);
    try {
      await unlockMutation.mutateAsync({
        chat_id: chatId,
        category_id: selectedCategoryId,
      });
      toast.success("Insights unlocked! Analysis starting...");
      onUnlockSuccess?.();
    } catch (error) {
      console.error("Failed to unlock insights:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to unlock insights. Please try again.";
      toast.error(message);
    } finally {
      setIsUnlocking(false);
    }
  };

  // const scrollToUnlock = () => {
  //   unlockSectionRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: "center",
  //   });
  // };

  // const totalCost = insights?.reduce((sum, i) => sum + i.credit_cost, 0) || 0;
  const insightCount = insights?.length || 0;
  const selectedCategory = categories?.find((c) => c.id === selectedCategoryId);
  const colors = selectedCategory
    ? getCategoryColors(selectedCategory.name)
    : getCategoryColors("romantic");

  return (
    <section
      ref={unlockSectionRef}
      className="py-12 bg-linear-to-br from-purple-50 to-pink-50"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-purple-200 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              AI-Powered Insights
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Unlock Deeper Understanding
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose your relationship type and get personalized AI insights
          </p>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Choose Analysis Type
          </h3>

          {/* Mobile: Horizontal scroll */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-3">
              {categories?.map((category) => {
                const catColors = getCategoryColors(category.name);
                const isSelected = selectedCategoryId === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`shrink-0 w-[140px] p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? `${catColors.borderColor} bg-white shadow-lg`
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div
                      className={`text-sm font-bold mb-1 ${
                        isSelected ? catColors.textColor : "text-gray-900"
                      }`}
                    >
                      {category.display_name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {category.base_cost} coins
                    </div>
                    {isSelected && (
                      <div className="mt-2">
                        <Check
                          className={`w-4 h-4 ${catColors.textColor} mx-auto`}
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories?.map((category) => {
              const catColors = getCategoryColors(category.name);
              const isSelected = selectedCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? `${catColors.borderColor} bg-white shadow-lg`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <div
                    className={`text-base font-bold mb-2 ${
                      isSelected ? catColors.textColor : "text-gray-900"
                    }`}
                  >
                    {category.display_name}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {category.insights_count} insights
                  </div>
                  <div className={`text-sm font-bold ${catColors.textColor}`}>
                    {category.base_cost} coins
                  </div>
                  {isSelected && (
                    <div className="mt-3">
                      <Check className={`w-5 h-5 ${catColors.textColor}`} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview Insights */}
        {selectedCategoryId && insights && insights.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              What You&apos;ll Get
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.slice(0, 3).map((insight) => (
                <div
                  key={insight.id}
                  className="relative bg-white rounded-xl border-2 border-gray-200 p-4 overflow-hidden"
                >
                  <div className="text-3xl mb-2">{insight.icon || "💡"}</div>
                  <h4 className="font-bold text-sm mb-1 text-gray-900">
                    {insight.display_title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {insight.description}
                  </p>

                  {/* Blur overlay */}
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <div className="text-xs font-medium text-gray-600">
                        Locked
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlock CTA */}
        {selectedCategoryId ? (
          <div
            className={`bg-white rounded-2xl border-2 ${colors.borderColor} p-6 md:p-8 shadow-xl`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <span className="text-3xl">{selectedCategory?.icon}</span>
                  <div>
                    <div className="text-xs text-gray-600">
                      Selected Category
                    </div>
                    <div className="font-bold text-gray-900">
                      {selectedCategory?.display_name}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Unlock {insightCount} AI Insights
                </h3>
                <p className="text-sm text-gray-600">
                  Deep analysis • Communication patterns • Actionable
                  recommendations
                </p>
              </div>

              <div className="shrink-0 text-center">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-900">
                    {selectedCategory?.base_cost}
                  </div>
                  <div className="text-sm text-gray-600">coins</div>
                </div>
                <button
                  onClick={handleUnlock}
                  disabled={isUnlocking}
                  className={`group w-full md:w-auto px-8 py-4 bg-linear-to-r ${colors.color} text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {isUnlocking ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Unlock Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
            <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Select a Category to Continue
            </h3>
            <p className="text-gray-600">
              Choose your relationship type above to see available insights
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// Export helper function for external button clicks
export { UnlockInsightsSection };
