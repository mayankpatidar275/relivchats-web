"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { Hash, Smile } from "lucide-react";

interface TopContentSectionProps {
  stats: ChatMetadata;
}

export default function TopContentSection({ stats }: TopContentSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Top Words */}
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Hash className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-900">Most Used Words</h3>
        </div>

        <div className="space-y-3">
          {stats.top_words.slice(0, 10).map((word, index) => {
            const maxCount = stats.top_words[0].count;
            const percentage = (word.count / maxCount) * 100;

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    #{index + 1} {word.word}
                  </span>
                  <span className="text-sm text-gray-600">
                    {word.count} times
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Emojis */}
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Smile className="w-6 h-6 text-amber-600" />
          <h3 className="text-2xl font-bold text-gray-900">Most Used Emojis</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.top_emojis.slice(0, 8).map((emoji, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-5xl mb-2">{emoji.emoji}</div>
              <div className="text-2xl font-bold text-gray-900">
                {emoji.count}
              </div>
              <div className="text-xs text-gray-600">times</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
