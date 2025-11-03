"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { ParticipantMode } from "./ParticipantFilter";
import {
  MessageSquare,
  Clock,
  MessageCircle,
  HelpCircle,
  Sunrise,
  Trophy,
} from "lucide-react";

interface ParticipantBreakdownProps {
  metadata: ChatMetadata;
  participants: string[];
  selectedMode: ParticipantMode;
  onSwitchToCompare: () => void;
}

export default function ParticipantBreakdown({
  metadata,
  participants,
  selectedMode,
  onSwitchToCompare,
}: ParticipantBreakdownProps) {
  const formatResponseTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (minutes === 0) return `${secs}s`;
    return `${minutes}m ${secs}s`;
  };

  // Mode: All - Show balance bars
  if (selectedMode === "all") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-600" />
          Conversation Balance
        </h3>

        <div className="space-y-3 mb-4">
          {participants.map((participant) => {
            const stats = metadata.user_stats[participant];
            if (!stats) return null;

            const percentage = (
              (stats.message_count / metadata.total_messages) *
              100
            ).toFixed(1);

            return (
              <div key={participant}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">
                    {participant}
                  </span>
                  <span className="text-gray-600">
                    {percentage}% ({stats.message_count} msgs)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {participants.length === 2 && (
          <button
            onClick={onSwitchToCompare}
            className="w-full py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            Switch to Compare View →
          </button>
        )}
      </div>
    );
  }

  // Mode: Single Participant
  if (selectedMode !== "compare") {
    const stats = metadata.user_stats[selectedMode];
    if (!stats) return null;

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          {selectedMode}&apos;s Activity
        </h3>

        {/* Quick stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {stats.message_count}
            </div>
            <div className="text-xs text-gray-600">Messages Sent</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {stats.avg_words_per_message.toFixed(1)}
            </div>
            <div className="text-xs text-gray-600">Words/Message</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {formatResponseTime(stats.avg_response_time_seconds)}
            </div>
            <div className="text-xs text-gray-600">Avg Response</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              {stats.double_texting_rate.toFixed(0)}%
            </div>
            <div className="text-xs text-gray-600">Double Text</div>
          </div>
        </div>

        {/* Top words */}
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Top Words:
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.top_words.slice(0, 5).map((word) => (
              <span
                key={word.word}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
              >
                {word.word} ({word.count})
              </span>
            ))}
          </div>
        </div>

        {/* Top emojis */}
        <div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Top Emojis:
          </div>
          <div className="flex gap-2">
            {stats.top_emojis.slice(0, 5).map((emoji, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 px-3 py-2 bg-gray-50 rounded-lg"
              >
                <span className="text-2xl">{emoji.emoji}</span>
                <span className="text-xs text-gray-600">({emoji.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mode: Compare (2 participants)
  if (participants.length !== 2) return null;

  const [user1, user2] = participants;
  const stats1 = metadata.user_stats[user1];
  const stats2 = metadata.user_stats[user2];

  if (!stats1 || !stats2) return null;

  const compareMetrics = [
    {
      label: "Messages Sent",
      icon: MessageSquare,
      value1: stats1.message_count,
      value2: stats2.message_count,
      format: (v: number) => v.toString(),
      higher: "better",
    },
    {
      label: "Words/Message",
      icon: MessageCircle,
      value1: stats1.avg_words_per_message,
      value2: stats2.avg_words_per_message,
      format: (v: number) => v.toFixed(1),
      higher: "better",
    },
    {
      label: "Response Time",
      icon: Clock,
      value1: stats1.avg_response_time_seconds,
      value2: stats2.avg_response_time_seconds,
      format: formatResponseTime,
      higher: "worse",
    },
    {
      label: "Double-Texting",
      icon: MessageCircle,
      value1: stats1.double_texting_rate,
      value2: stats2.double_texting_rate,
      format: (v: number) => `${v.toFixed(0)}%`,
      higher: "neutral",
    },
    {
      label: "Questions Asked",
      icon: HelpCircle,
      value1: stats1.questions_asked,
      value2: stats2.questions_asked,
      format: (v: number) => v.toString(),
      higher: "better",
    },
    {
      label: "Convos Started",
      icon: Sunrise,
      value1: stats1.conversation_initiations,
      value2: stats2.conversation_initiations,
      format: (v: number) => v.toString(),
      higher: "better",
    },
  ];

  const getWinner = (
    v1: number,
    v2: number,
    // TODO: remove the string from below
    higher: "better" | "worse" | "neutral" | string
  ) => {
    if (higher === "neutral") return null;
    if (higher === "worse") return v1 < v2 ? "left" : v2 < v1 ? "right" : null;
    return v1 > v2 ? "left" : v2 > v1 ? "right" : null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Head-to-Head Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User 1 */}
        <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
              {user1
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h4 className="font-bold text-gray-900">{user1}</h4>
          </div>

          <div className="space-y-3">
            {compareMetrics.map((metric, idx) => {
              const winner = getWinner(
                metric.value1,
                metric.value2,
                metric.higher
              );
              const isWinner = winner === "left";

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <metric.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900">
                      {metric.format(metric.value1)}
                    </span>
                    {isWinner && <Trophy className="w-4 h-4 text-yellow-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* User 2 */}
        <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
              {user2
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <h4 className="font-bold text-gray-900">{user2}</h4>
          </div>

          <div className="space-y-3">
            {compareMetrics.map((metric, idx) => {
              const winner = getWinner(
                metric.value1,
                metric.value2,
                metric.higher
              );
              const isWinner = winner === "right";

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <metric.icon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-900">
                      {metric.format(metric.value2)}
                    </span>
                    {isWinner && <Trophy className="w-4 h-4 text-yellow-500" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
