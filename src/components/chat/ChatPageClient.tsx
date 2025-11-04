// src/components/chat/ChatPageClient.tsx
"use client";

import React, { useState, useRef } from "react";
import { useChat } from "@/src/features/chats/api";
import ChatHeader from "@/src/components/chat/ChatHeader";
import ParticipantFilter, {
  ParticipantMode,
} from "@/src/components/chat/ParticipantFilter";
import UnlockBanner from "@/src/components/chat/UnlockBanner";
import HeroStatsGrid from "@/src/components/chat/HeroStatsGrid";
import ParticipantBreakdown from "@/src/components/chat/ParticipantBreakdown";
import ActivityCharts from "@/src/components/chat/ActivityCharts";
import TopContentSection from "@/src/components/chat/TopContentSection";
import LinksSection from "@/src/components/chat/LinksSection";
import LongestMessagesSection from "@/src/components/chat/LongestMessagesSection";
import UnlockInsightsSection from "@/src/components/chat/UnlockInsightsSection";
import InsightsDisplaySection from "@/src/components/chat/InsightsDisplaySection";

interface Props {
  chatId: string;
}

export default function ChatPageClient({ chatId }: Props) {
  const [selectedMode, setSelectedMode] = useState<ParticipantMode>("all");
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

      {/* Sticky Participant Filter */}
      <ParticipantFilter
        participants={chat.participants}
        selectedMode={selectedMode}
        onModeChange={setSelectedMode}
      />

      {/* Unlock Banner (only if not unlocked) */}
      {!chat.insights_unlocked && (
        <UnlockBanner
          onUnlockClick={scrollToUnlock}
          insightCount={12}
          cost={100}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
        <HeroStatsGrid
          metadata={chat.chat_metadata}
          selectedMode={selectedMode}
        />

        <ParticipantBreakdown
          metadata={chat.chat_metadata}
          participants={chat.participants}
          selectedMode={selectedMode}
          onSwitchToCompare={() => setSelectedMode("compare")}
        />

        <ActivityCharts
          metadata={chat.chat_metadata}
          selectedMode={selectedMode}
        />

        <TopContentSection
          metadata={chat.chat_metadata}
          selectedMode={selectedMode}
        />

        <LinksSection metadata={chat.chat_metadata} />

        <LongestMessagesSection
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      </main>

      {/* Unlock Section (if not unlocked) */}
      {!chat.insights_unlocked ? (
        <div ref={unlockSectionRef}>
          <UnlockInsightsSection
            chatId={chatId}
            onUnlockSuccess={() => {
              // keep it simple — refetching could be implemented with your query client
              window.location.reload();
            }}
          />
        </div>
      ) : (
        <InsightsDisplaySection chatId={chatId} />
      )}
    </div>
  );
}
