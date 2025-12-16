"use client";

import { useChat } from "@/src/features/chats/api";
import { useChatInsights } from "@/src/features/insights/api/hooks";
import { useCategoryTheme } from "@/src/lib/theme";
import { Sparkles } from "lucide-react";
import InsightCard from "./insights/InsightCard";
import CommunicationBasicsView from "./insights/views/CommunicationBasicsView";
import {
  CommunicationBasicsContent,
  ConflictResolutionContent,
  EmotionalIntimacyContent,
  FuturePlanningContent,
  LoveLanguageContent,
  PlayfulnessRomanceContent,
} from "@/src/features/insights/types";
import InsightSkeleton from "./insights/InsightSkeleton";
import EmotionalIntimacyView from "./insights/views/EmotionalIntimacyView";
import LoveLanguageView from "./insights/views/LoveLanguageView";
import ConflictResolutionView from "./insights/views/ConflictResolutionView";
import FuturePlanningView from "./insights/views/FuturePlanningView";
import PlayfulnessRomanceView from "./insights/views/PlayfulnessRomanceView";
import InsightGenerationProgress from "./insights/InsightGenerationProgress";
import InsightPlaceholderCard from "./insights/InsightPlaceholderCard";
// import InsightSummaryGrid from "./insights/InsightSummaryGrid";

interface InsightsDisplaySectionProps {
  chatId: string;
}

export default function InsightsDisplaySection({
  chatId,
}: InsightsDisplaySectionProps) {
  const { data: chat } = useChat(chatId);
  const { data: insightsData, isLoading } = useChatInsights(chatId);
  const theme = useCategoryTheme(chat?.category_slug);

  console.log("[InsightsDisplaySection] Render check:", {
    hasChat: !!chat,
    insights_unlocked: chat?.insights_unlocked,
    insights_generation_status: chat?.insights_generation_status,
    hasInsightsData: !!insightsData,
    isLoading,
  });

  // Only show if insights are unlocked OR generation has started
  // (generation starting means they paid for it, even if backend didn't update the flag)
  const shouldShow =
    chat &&
    (chat.insights_unlocked ||
      (chat.insights_generation_status &&
        chat.insights_generation_status !== "not_started"));

  if (!shouldShow) {
    console.log(
      "[InsightsDisplaySection] Returning null - insights not unlocked or generation not started"
    );
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

          {/* Unified progress/status indicator for all states */}
          {insightsData.generation_status !== "not_started" && (
            <div className="mb-8">
              <InsightGenerationProgress
                insights={insightsData.insights.map((i) => ({
                  id: i.id,
                  display_title: i.display_title,
                  icon: i.icon,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  status: i.status as any,
                }))}
                totalRequested={insightsData.total_requested}
                totalCompleted={insightsData.total_completed}
                totalFailed={insightsData.total_failed}
                generationStatus={insightsData.generation_status as "queued" | "generating" | "completed" | "failed"}
                completedAt={insightsData.unlocked_at}
              />
            </div>
          )}
        </div>
        {/* {insightsData.generation_status === "completed" && (
          <InsightSummaryGrid
            insights={insightsData.insights.map((i) => ({
              id: i.id,
              icon: i.icon,
              title: i.display_title,
              score: i.content?.overall?.score,
              keyFinding: extractKeyFinding(i), // Helper function
              status: i.status as any,
            }))}
            categorySlug={chat.category_slug}
            onInsightClick={(id) => {
              // Scroll to insight
              document.getElementById(`insight-${id}`)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          />
        )} */}
        {/* Insights grid */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {insightsData.insights.map((insight) => {
            // Completed insights: Show full card with content
            if (insight.status === "completed") {
              return (
                <InsightCard
                  key={insight.id}
                  icon={insight.icon}
                  title={insight.display_title}
                  description={insight.description}
                  status={insight.status}
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
                  {/* Inside the InsightCard children section, add after
              conflict_resolution: */}
                  {insight.insight_type_name === "future_planning" && (
                    <FuturePlanningView
                      content={insight.content as FuturePlanningContent}
                      categorySlug={chat.category_slug}
                    />
                  )}
                  {insight.insight_type_name === "playfulness_romance" && (
                    <PlayfulnessRomanceView
                      content={insight.content as PlayfulnessRomanceContent}
                      categorySlug={chat.category_slug}
                    />
                  )}
                </InsightCard>
              );
            }

            // Pending/Generating/Failed insights: Show placeholder card
            return (
              <InsightPlaceholderCard
                key={insight.id}
                icon={insight.icon}
                title={insight.display_title}
                description={insight.description}
                status={insight.status as "generating" | "pending" | "failed"}
                categorySlug={chat.category_slug}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
