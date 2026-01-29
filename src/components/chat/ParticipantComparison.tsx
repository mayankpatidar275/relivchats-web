"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import {
  MessageSquare,
  Clock,
  MessageCircle,
  HelpCircle,
  Sunrise,
  Trophy,
} from "lucide-react";

interface ParticipantComparisonProps {
  metadata: ChatMetadata;
  participants: string[];
}

export default function ParticipantComparison({
  metadata,
  participants,
}: ParticipantComparisonProps) {
  // Only show for 2 participants
  if (participants.length !== 2) {
    return null;
  }

  const formatResponseTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (minutes === 0) return `${secs}s`;
    return `${minutes}m ${secs}s`;
  };

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
    higher: "better" | "worse" | "neutral" | string
  ) => {
    if (higher === "neutral") return null;
    if (higher === "worse") return v1 < v2 ? "left" : v2 < v1 ? "right" : null;
    return v1 > v2 ? "left" : v2 > v1 ? "right" : null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        Side-by-Side Comparison
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
