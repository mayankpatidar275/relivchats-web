"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { Clock, MessageCircle, TrendingUp } from "lucide-react";

interface ParticipantBreakdownProps {
  stats: ChatMetadata;
}

export default function ParticipantBreakdown({
  stats,
}: ParticipantBreakdownProps) {
  const participants = Object.entries(stats.user_stats);
  const totalMessages = stats.total_messages;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-linear-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-100 p-6">
          <MessageCircle className="w-8 h-8 text-blue-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {participants.length}
          </div>
          <div className="text-sm text-gray-600">Active Participants</div>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-100 p-6">
          <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {(totalMessages / participants.length).toFixed(0)}
          </div>
          <div className="text-sm text-gray-600">Avg Messages per Person</div>
        </div>

        <div className="bg-linear-to-br from-green-50 to-white rounded-2xl border-2 border-green-100 p-6">
          <Clock className="w-8 h-8 text-green-600 mb-3" />
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.busiest_hour}:00
          </div>
          <div className="text-sm text-gray-600">Peak Activity Hour</div>
        </div>
      </div>

      {/* Detailed Participant Stats */}
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Participant Activity
        </h3>
        <div className="space-y-6">
          {participants.map(([name, userStats], index) => {
            const percentage = (userStats.message_count / totalMessages) * 100;
            const avgResponseTime = Math.round(
              userStats.avg_response_time_seconds / 60
            );

            return (
              <div key={index} className="space-y-3">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent-pink flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 text-lg truncate">
                        {name}
                      </h4>
                      <span className="text-sm font-semibold text-gray-600 ml-2 shrink-0">
                        {userStats.message_count.toLocaleString()} messages
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-3">
                      <div
                        className="h-full bg-linear-to-r from-primary to-accent-pink rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">
                          Contribution
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">
                          Avg Response
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {avgResponseTime}m
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">
                          Initiated
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {userStats.conversation_initiations}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1">
                          Questions
                        </div>
                        <div className="text-lg font-bold text-gray-900">
                          {userStats.questions_asked}
                        </div>
                      </div>
                    </div>

                    {/* Top words */}
                    {userStats.top_words.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {userStats.top_words.slice(0, 5).map((word, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {word.word} ({word.count})
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Top emojis */}
                    {userStats.top_emojis.length > 0 && (
                      <div className="mt-2 flex gap-1">
                        {userStats.top_emojis.slice(0, 5).map((emoji, idx) => (
                          <span
                            key={idx}
                            className="text-2xl"
                            title={`Used ${emoji.count} times`}
                          >
                            {emoji.emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
