"use client";

import { useChat } from "@/src/features/chats/api";
import { useChatInsights } from "@/src/features/insights/api/hooks";
import { useCategoryTheme } from "@/src/lib/theme";
import { Sparkles, Loader2 } from "lucide-react";
import InsightCard from "./insights/InsightCard";
import CommunicationBasicsView from "./insights/views/CommunicationBasicsView";
import {
  CommunicationBasicsContent,
  ConflictResolutionContent,
  EmotionalIntimacyContent,
  LoveLanguageContent,
} from "@/src/features/insights/types";
import InsightSkeleton from "./insights/InsightSkeleton";
import EmotionalIntimacyView from "./insights/views/EmotionalIntimacyView";
import LoveLanguageView from "./insights/views/LoveLanguageView";
import ConflictResolutionView from "./insights/views/ConflictResolutionView";

interface InsightsDisplaySectionProps {
  chatId: string;
}

export default function InsightsDisplaySection({
  chatId,
}: InsightsDisplaySectionProps) {
  const { data: chat } = useChat(chatId);
  const { data: insightsData, isLoading } = useChatInsights(chatId);
  const theme = useCategoryTheme(chat?.category_slug);

  // Only show if insights are unlocked
  if (!chat || !chat.insights_unlocked) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="space-y-6 md:space-y-8">
            <InsightSkeleton />
          </div>
        </div>
      </section>
    );
  }

  if (!insightsData || insightsData.insights.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full ${
              theme.bg
            } border-2 ${theme.text.replace("text-", "border-")} mb-4 md:mb-6`}
          >
            <Sparkles className={`w-4 h-4 ${theme.text}`} />
            <span className={`text-xs md:text-sm font-semibold ${theme.text}`}>
              AI Insights Unlocked
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Your {chat.category_name || "Relationship"} Analysis
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Deep insights powered by advanced AI analysis of your conversations
          </p>

          {/* Progress indicator if generating */}
          {insightsData.generation_status === "generating" && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">
                  Generating insights...
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${
                      (insightsData.total_completed /
                        insightsData.total_requested) *
                      100
                    }%`,
                  }}
                />
              </div>
              <p className="text-xs text-blue-600 mt-2">
                {insightsData.total_completed} of {insightsData.total_requested}{" "}
                complete
              </p>
            </div>
          )}
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {insightsData.insights.map((insight) => (
            <InsightCard
              key={insight.id}
              icon={insight.icon}
              title={insight.display_title}
              description={insight.description}
              status={insight.status}
              // errorMessage={insight.error_message || undefined}
              errorMessage={"something went wrong"}
              categorySlug={chat.category_slug}
            >
              {/* Render insight type specific views */}
              {insight.insight_type_name === "communication_basics" && (
                <CommunicationBasicsView
                  content={insight.content as CommunicationBasicsContent}
                  categorySlug={chat.category_slug}
                />
              )}
              {/* Inside the InsightCard children section, add after
              communication_basics: */}
              {insight.insight_type_name === "emotional_intimacy" && (
                <EmotionalIntimacyView
                  content={insight.content as EmotionalIntimacyContent}
                  categorySlug={chat.category_slug}
                />
              )}
              {/* Inside the InsightCard children section, add after
              emotional_intimacy: */}
              {insight.insight_type_name === "love_language" && (
                <LoveLanguageView
                  content={insight.content as LoveLanguageContent}
                  categorySlug={chat.category_slug}
                />
              )}
              {/* Inside the InsightCard children section, add after
              love_language: */}
              {insight.insight_type_name === "conflict_resolution" && (
                <ConflictResolutionView
                  content={insight.content as ConflictResolutionContent}
                  categorySlug={chat.category_slug}
                />
              )}
            </InsightCard>
          ))}
        </div>

        {/* Generation metadata footer (optional) */}
        {insightsData.generation_status === "completed" && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Analysis completed on{" "}
              {insightsData.unlocked_at &&
                new Date(insightsData.unlocked_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
