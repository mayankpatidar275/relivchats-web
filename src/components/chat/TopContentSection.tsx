"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { ParticipantMode } from "./ParticipantFilter";
import { Hash, Smile } from "lucide-react";

interface TopContentSectionProps {
  metadata: ChatMetadata;
  selectedMode: ParticipantMode;
}

export default function TopContentSection({
  metadata,
  selectedMode,
}: TopContentSectionProps) {
  const getTopWords = () => {
    if (selectedMode === "all" || selectedMode === "compare") {
      return metadata.top_words.slice(0, 8);
    }

    const userStats = metadata.user_stats[selectedMode];
    return userStats?.top_words.slice(0, 8) || [];
  };

  const getTopEmojis = () => {
    if (selectedMode === "all" || selectedMode === "compare") {
      return metadata.top_emojis.slice(0, 8);
    }

    const userStats = metadata.user_stats[selectedMode];
    return userStats?.top_emojis.slice(0, 8) || [];
  };

  const topWords = getTopWords();
  const topEmojis = getTopEmojis();

  return (
    <div className="space-y-4">
      {/* Top Words */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          Most Used Words
        </h3>

        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
          {topWords.map((word, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100 min-w-[120px] md:min-w-0"
            >
              <div className="text-xs text-gray-600 mb-1">#{idx + 1}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1 truncate">
                {word.word}
              </div>
              <div className="text-sm text-gray-600">{word.count}×</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Emojis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Smile className="w-5 h-5 text-yellow-600" />
          Top Emojis
        </h3>

        {/* Mobile: Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
          {topEmojis.map((emoji, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-linear-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100 flex flex-col items-center min-w-[100px] md:min-w-0"
            >
              <div className="text-xs text-gray-600 mb-2">#{idx + 1}</div>
              <div className="text-5xl mb-2">{emoji.emoji}</div>
              <div className="text-sm font-semibold text-gray-900">
                {emoji.count}×
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
