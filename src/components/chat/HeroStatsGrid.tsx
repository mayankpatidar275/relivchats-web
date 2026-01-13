"use client";

import { MessageSquare, Calendar, TrendingUp, Clock } from "lucide-react";
import { ParticipantMode } from "./ParticipantFilter";
import { ChatMetadata } from "@/src/features/chats/types";

interface HeroStatsGridProps {
  metadata: ChatMetadata;
  selectedMode: ParticipantMode;
}

export default function HeroStatsGrid({
  metadata,
  selectedMode,
}: HeroStatsGridProps) {
  const getStatsForMode = () => {
    if (selectedMode === "all" || selectedMode === "compare") {
      return {
        messages: metadata.total_messages,
        days: metadata.total_days,
        avgPerDay: metadata.messages_per_day_avg,
        peakHour: metadata.busiest_hour,
      };
    }

    // Individual participant
    const userStats = metadata.user_stats[selectedMode];
    if (!userStats) return null;

    return {
      messages: userStats.message_count,
      days: metadata.total_days,
      avgPerDay: (userStats.message_count / metadata.total_days).toFixed(2),
      peakHour: userStats.busiest_hour,
    };
  };

  const stats = getStatsForMode();
  if (!stats) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Total Messages */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-gray-600 text-xs mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Messages</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {stats.messages.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">
          {metadata.media_shared_count > 0 &&
            `+${metadata.media_shared_count} media`}
        </div>
      </div>

      {/* Total Days */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-gray-600 text-xs mb-2">
          <Calendar className="w-4 h-4" />
          <span>Duration</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {stats.days}
        </div>
        <div className="text-xs text-gray-500">
          {formatDate(metadata.date_range.start)} -{" "}
          {formatDate(metadata.date_range.end)}
        </div>
      </div>

      {/* Messages per day */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-gray-600 text-xs mb-2">
          <TrendingUp className="w-4 h-4" />
          <span>Daily Avg</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {typeof stats.avgPerDay === "number"
            ? stats.avgPerDay.toFixed(1)
            : stats.avgPerDay}
        </div>
        <div className="text-xs text-gray-500">messages/day</div>
      </div>

      {/* Peak Hour */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-gray-600 text-xs mb-2">
          <Clock className="w-4 h-4" />
          <span>Peak Hour</span>
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {formatHour(stats.peakHour)}
        </div>
        <div className="text-xs text-gray-500">Most active</div>
      </div>
    </div>
  );
}
