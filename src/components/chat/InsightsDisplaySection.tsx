"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useChat } from "@/src/features/chats/api";
import { useChatInsights } from "@/src/features/insights/api/hooks";
import {
  CommunicationBasicsContent,
  ConflictResolutionContent,
  EmotionalIntimacyContent,
  FuturePlanningContent,
  LoveLanguageContent,
  PlayfulnessRomanceContent,
} from "@/src/features/insights/types";
import InsightSkeleton from "./insights/InsightSkeleton";
import CommunicationBasicsView from "./insights/views/CommunicationBasicsView";
import ConflictResolutionView from "./insights/views/ConflictResolutionView";
import EmotionalIntimacyView from "./insights/views/EmotionalIntimacyView";
import FuturePlanningView from "./insights/views/FuturePlanningView";
import LoveLanguageView from "./insights/views/LoveLanguageView";
import PlayfulnessRomanceView from "./insights/views/PlayfulnessRomanceView";

interface InsightsDisplaySectionProps {
  chatId: string;
}

export default function InsightsDisplaySection({
  chatId,
}: InsightsDisplaySectionProps) {
  const { data: chat } = useChat(chatId);
  const { data: insightsData, isLoading } = useChatInsights(chatId);
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldShow =
    chat &&
    (chat.insights_unlocked ||
      (chat.insights_generation_status &&
        chat.insights_generation_status !== "not_started"));

  if (!shouldShow) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <InsightSkeleton />
        </div>
      </section>
    );
  }

  if (!insightsData || insightsData.insights.length === 0) {
    return null;
  }

  // Show all insights (not just completed)
  const allInsights = insightsData.insights;

  if (allInsights.length === 0) {
    return null;
  }

  const activeInsight = allInsights[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? allInsights.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === allInsights.length - 1 ? 0 : prev + 1
    );
  };

  // Get status indicator
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle2 className="w-3 h-3" />,
          color: "text-green-600 bg-green-50",
          label: "Completed",
        };
      case "generating":
        return {
          icon: <Loader2 className="w-3 h-3 animate-spin" />,
          color: "text-blue-600 bg-blue-50",
          label: "Generating...",
        };
      case "pending":
        return {
          icon: <Clock className="w-3 h-3" />,
          color: "text-yellow-600 bg-yellow-50",
          label: "Queued",
        };
      case "failed":
        return {
          icon: <AlertCircle className="w-3 h-3" />,
          color: "text-red-600 bg-red-50",
          label: "Failed",
        };
      default:
        return {
          icon: <Clock className="w-3 h-3" />,
          color: "text-gray-600 bg-gray-50",
          label: "Unknown",
        };
    }
  };

  // Render the active insight view
  const renderInsightView = () => {
    if (!activeInsight) return null;

    // Handle non-completed statuses
    if (activeInsight.status !== "completed") {
      const statusInfo = getStatusIndicator(activeInsight.status);

      return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className={`w-20 h-20 rounded-full ${statusInfo.color} flex items-center justify-center mb-6`}>
            <div className="text-4xl">
              {activeInsight.status === "generating" ? (
                <Loader2 className="w-10 h-10 animate-spin" />
              ) : activeInsight.status === "pending" ? (
                <Clock className="w-10 h-10" />
              ) : activeInsight.status === "failed" ? (
                <AlertCircle className="w-10 h-10" />
              ) : null}
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {activeInsight.status === "generating" && "Generating Insight..."}
            {activeInsight.status === "pending" && "Insight Queued"}
            {activeInsight.status === "failed" && "Generation Failed"}
          </h3>

          <p className="text-gray-600 max-w-md">
            {activeInsight.status === "generating" &&
              "Our AI is analyzing your conversation to generate personalized insights. This usually takes a few minutes."}
            {activeInsight.status === "pending" &&
              "This insight is in the queue and will be generated shortly. Please check back in a few minutes."}
            {activeInsight.status === "failed" &&
              "We encountered an issue generating this insight. Please try refreshing the page or contact support if the issue persists."}
          </p>

          {activeInsight.status === "generating" && (
            <div className="mt-8 flex gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          )}
        </div>
      );
    }

    // Render completed insight content
    switch (activeInsight.insight_type_name) {
      case "communication_basics":
        return (
          <CommunicationBasicsView
            content={activeInsight.content as CommunicationBasicsContent}
            categorySlug={chat.category_slug}
          />
        );
      case "emotional_intimacy":
        return (
          <EmotionalIntimacyView
            content={activeInsight.content as EmotionalIntimacyContent}
            categorySlug={chat.category_slug}
          />
        );
      case "love_language":
        return (
          <LoveLanguageView
            content={activeInsight.content as LoveLanguageContent}
            categorySlug={chat.category_slug}
          />
        );
      case "conflict_resolution":
        return (
          <ConflictResolutionView
            content={activeInsight.content as ConflictResolutionContent}
            categorySlug={chat.category_slug}
          />
        );
      case "future_planning":
        return (
          <FuturePlanningView
            content={activeInsight.content as FuturePlanningContent}
            categorySlug={chat.category_slug}
          />
        );
      case "playfulness_romance":
        return (
          <PlayfulnessRomanceView
            content={activeInsight.content as PlayfulnessRomanceContent}
            categorySlug={chat.category_slug}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-linear-to-b from-white to-gray-50/30">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {chat.category_name || "Relationship"} Insights
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            AI-powered analysis from your conversation
          </p>
        </div>

        {/* Insight Tabs */}
        <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid gap-3 min-w-max md:min-w-0" style={{ gridTemplateColumns: `repeat(${allInsights.length}, minmax(0, 1fr))` }}>
            {allInsights.map((insight, index) => {
              const statusInfo = getStatusIndicator(insight.status);
              return (
                <button
                  key={insight.id}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    shrink-0 md:shrink
                    px-4 py-3 rounded-xl border-2 transition-all
                    text-left min-w-0
                    ${
                      activeIndex === index
                        ? "border-purple-600 bg-purple-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl shrink-0">{insight.icon || "💡"}</span>
                    <span
                      className={`text-xs md:text-sm font-semibold wrap-break-word ${
                        activeIndex === index
                          ? "text-purple-900"
                          : "text-gray-700"
                      }`}
                    >
                      {insight.display_title}
                    </span>
                  </div>
                  {/* Status Badge */}
                  <div className={`flex items-center gap-1 mt-2 px-2 py-1 rounded-md text-xs font-medium ${statusInfo.color}`}>
                    {statusInfo.icon}
                    <span>{statusInfo.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Panel - Insight Info */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-100 lg:sticky lg:top-4 min-w-0">
              {/* Insight Header */}
              <div className="flex items-center gap-3 mb-4 min-w-0">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-2xl shrink-0">
                  {activeInsight.icon || "💡"}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 wrap-break-word">
                    {activeInsight.display_title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              {activeInsight.description && (
                <p className="text-sm text-gray-600 mb-6 leading-relaxed wrap-break-word">
                  {activeInsight.description}
                </p>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  aria-label="Previous insight"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-xs text-gray-500">
                  {activeIndex + 1} / {allInsights.length}
                </span>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  aria-label="Next insight"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Insight Content */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
              {/* Scrollable Content Area */}
              <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 bg-gray-50 min-w-0">
                {renderInsightView()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
