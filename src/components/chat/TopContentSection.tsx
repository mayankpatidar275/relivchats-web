"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { Hash, Smile } from "lucide-react";

interface TopContentSectionProps {
  metadata: ChatMetadata;
}

export default function TopContentSection({ metadata }: TopContentSectionProps) {
  // Always show aggregate data
  const topWords = metadata.top_words.slice(0, 20);
  const topEmojis = metadata.top_emojis.slice(0, 15);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      {/* Top Words Section */}
      <div className="mb-6">
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Hash className="w-4 h-4 text-blue-600" />
          Most Used Words
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {topWords.map((word, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-100 min-w-[90px]"
            >
              <div className="text-lg font-bold text-gray-900 mb-0.5 truncate">
                {word.word}
              </div>
              <div className="text-xs text-gray-600">{word.count}×</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Emojis Section */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Smile className="w-4 h-4 text-yellow-600" />
          Top Emojis
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {topEmojis.map((emoji, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-100 flex flex-col items-center min-w-[75px]"
            >
              <div className="text-3xl mb-1">{emoji.emoji}</div>
              <div className="text-xs font-semibold text-gray-600">
                {emoji.count}×
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
