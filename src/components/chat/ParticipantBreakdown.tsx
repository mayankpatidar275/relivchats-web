"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { useState } from "react";
import {
  MessageSquare,
  Clock,
  MessageCircle,
  HelpCircle,
  Sunrise,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface ParticipantBreakdownProps {
  metadata: ChatMetadata;
  participants: string[];
}

export default function ParticipantBreakdown({
  metadata,
  participants,
}: ParticipantBreakdownProps) {
  // Track which participants are expanded
  const [expandedParticipants, setExpandedParticipants] = useState<Set<string>>(
    new Set()
  );

  const toggleParticipant = (participant: string) => {
    const newExpanded = new Set(expandedParticipants);
    if (newExpanded.has(participant)) {
      newExpanded.delete(participant);
    } else {
      newExpanded.add(participant);
    }
    setExpandedParticipants(newExpanded);
  };

  const formatResponseTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    if (minutes === 0) return `${secs}s`;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Participant Breakdown
        </h3>
        <p className="text-xs text-gray-500 italic">
          Click to expand details
        </p>
      </div>

      <div className="space-y-3">
        {participants.map((participant) => {
          const stats = metadata.user_stats[participant];
          if (!stats) return null;

          const percentage = (
            (stats.message_count / metadata.total_messages) *
            100
          ).toFixed(1);
          const isExpanded = expandedParticipants.has(participant);

          return (
            <div key={participant} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Summary bar (always visible) */}
              <button
                onClick={() => toggleParticipant(participant)}
                className="w-full p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-900">
                    {participant}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      {percentage}% ({stats.message_count} msgs)
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-4 pt-0 bg-gray-50 border-t border-gray-200">
                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.message_count}
                      </div>
                      <div className="text-xs text-gray-600">Messages Sent</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.avg_words_per_message.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-600">Words/Message</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatResponseTime(stats.avg_response_time_seconds)}
                      </div>
                      <div className="text-xs text-gray-600">Avg Response</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {stats.double_texting_rate.toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-600">Double Text</div>
                    </div>
                  </div>

                  {/* Additional stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <HelpCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Questions:</span>
                      <span className="font-bold text-gray-900">
                        {stats.questions_asked}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Sunrise className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Convos Started:</span>
                      <span className="font-bold text-gray-900">
                        {stats.conversation_initiations}
                      </span>
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
                    <div className="flex gap-2 flex-wrap">
                      {stats.top_emojis.slice(0, 5).map((emoji, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 px-3 py-2 bg-white rounded-lg"
                        >
                          <span className="text-2xl">{emoji.emoji}</span>
                          <span className="text-xs text-gray-600">
                            ({emoji.count})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
