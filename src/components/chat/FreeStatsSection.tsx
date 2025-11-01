"use client";

import StatsOverview from "./stats/StatsOverview";
import ParticipantBreakdown from "./stats/ParticipantBreakdown";
import ActivityCharts from "./stats/ActivityCharts";
import TopContentSection from "./stats/TopContentSection";
import { useChat } from "@/src/features/chats/api";

interface FreeStatsSectionProps {
  chatId: string;
}

export default function FreeStatsSection({ chatId }: FreeStatsSectionProps) {
  const { data: chat, isLoading } = useChat(chatId);

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!chat || !chat.chat_metadata) {
    return null;
  }

  const stats = chat.chat_metadata;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl space-y-12">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Free Basic Statistics
            </h2>
            <p className="text-gray-600">
              Instant insights about your chat, no coins required
            </p>
          </div>
          <div className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
            ✓ Free
          </div>
        </div>

        {/* Stats Overview */}
        <StatsOverview
          stats={stats}
          participantCount={chat.participants.length}
        />

        {/* Activity Charts */}
        <ActivityCharts stats={stats} />

        {/* Top Content */}
        <TopContentSection stats={stats} />

        {/* Participant Breakdown */}
        <ParticipantBreakdown stats={stats} />
      </div>
    </section>
  );
}
