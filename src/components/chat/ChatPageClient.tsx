// src/components/chat/ChatPageClient.tsx
"use client";

import React, { useRef } from "react";
import { useChat } from "@/src/features/chats/api";
import ChatHeader from "@/src/components/chat/ChatHeader";
import UnlockBanner from "@/src/components/chat/UnlockBanner";
import HeroStatsGrid from "@/src/components/chat/HeroStatsGrid";
import CardsPreviewSection from "@/src/components/chat/CardsPreviewSection";
import ParticipantBreakdown from "@/src/components/chat/ParticipantBreakdown";
import ParticipantComparison from "@/src/components/chat/ParticipantComparison";
import ActivityCharts from "@/src/components/chat/ActivityCharts";
import TopContentSection from "@/src/components/chat/TopContentSection";
import HeadToHeadComparison from "@/src/components/chat/HeadToHeadComparison";
import LinksSection from "@/src/components/chat/LinksSection";
import LongestMessagesSection from "@/src/components/chat/LongestMessagesSection";
import UnlockInsightsSection from "@/src/components/chat/UnlockInsightsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";

interface Props {
  chatId: string;
}

export default function ChatPageClient({ chatId }: Props) {
  const unlockSectionRef = useRef<HTMLDivElement | null>(null);

  // useChat now gets a stable chatId prop directly
  const { data: chat, isLoading } = useChat(chatId);

  const scrollToUnlock = () => {
    unlockSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  if (isLoading || !chat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <ChatHeader chatId={chatId} />

      {/* Unlock Banner (only if insights not started) */}
      {(!chat.insights_generation_status ||
        chat.insights_generation_status === "not_started") && (
        <UnlockBanner
          onUnlockClick={scrollToUnlock}
          insightCount={12}
          cost={100}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        <HeroStatsGrid metadata={chat.chat_metadata} />

        <CardsPreviewSection chatId={chatId} metadata={chat.chat_metadata} />

        <ParticipantBreakdown
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />

        <ParticipantComparison
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />

        <ActivityCharts metadata={chat.chat_metadata} />

        <TopContentSection metadata={chat.chat_metadata} />

        <HeadToHeadComparison
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />

        <LinksSection metadata={chat.chat_metadata} />

        <LongestMessagesSection
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      </main>

      {/* Show unlock section only if generation hasn't started */}
      {!chat.insights_generation_status ||
      chat.insights_generation_status === "not_started" ? (
        <div ref={unlockSectionRef}>
          <UnlockInsightsSection
            chatId={chatId}
            onUnlockSuccess={() => {
              // No-op - mutation handles cache invalidation and polling starts automatically
            }}
          />
        </div>
      ) : (
        // Show insights section if generation has started (generating, completed, etc.)
        <InsightsDisplaySection chatId={chatId} />
      )}
    </div>
  );
}
