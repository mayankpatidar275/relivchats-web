"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { FileText, Trophy, Medal, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface LongestMessagesSectionProps {
  metadata: ChatMetadata;
  participants: string[];
}

export default function LongestMessagesSection({
  metadata,
  participants,
}: LongestMessagesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const longestMessages = participants
    .map((participant) => {
      const stats = metadata.user_stats[participant];
      if (!stats) return null;

      return {
        participant,
        ...stats.longest_message,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b?.word_count || 0) - (a?.word_count || 0));

  if (longestMessages.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-900">Longest Messages</h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100">
          <div className="space-y-3">
            {longestMessages.map((message, idx) => {
              if (!message) return null;

              const Icon = idx === 0 ? Trophy : Medal;
              const iconColor = idx === 0 ? "text-yellow-500" : "text-gray-400";
              const bgColor = idx === 0 ? "bg-yellow-50" : "bg-gray-50";

              return (
                <div
                  key={idx}
                  className={`${bgColor} rounded-lg p-3 border ${
                    idx === 0 ? "border-yellow-200" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`w-6 h-6 ${iconColor} shrink-0 mt-1`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">
                        {message.participant}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
                        <span>
                          <strong>{message.word_count}</strong> words
                        </span>
                        <span>•</span>
                        <span>
                          <strong>{message.char_count.toLocaleString()}</strong>{" "}
                          characters
                        </span>
                      </div>

                      {message.message && (
                        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200 min-w-0">
                          <p className="text-sm text-gray-700 leading-relaxed italic wrap-break-word">
                            &quot;{message.message}&quot;
                          </p>
                        </div>
                      )}

                      <div className="text-xs text-gray-500 mt-2">
                        Sent on {formatDate(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
