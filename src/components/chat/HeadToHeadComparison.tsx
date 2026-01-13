"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { Hash, Smile } from "lucide-react";
import { useState } from "react";

interface HeadToHeadComparisonProps {
  metadata: ChatMetadata;
  participants: string[];
}

export default function HeadToHeadComparison({
  metadata,
  participants,
}: HeadToHeadComparisonProps) {
  const [showWords, setShowWords] = useState(false);

  // Only show for 2 participants
  if (participants.length !== 2) {
    return null;
  }

  const [participant1, participant2] = participants;
  const user1Stats = metadata.user_stats[participant1];
  const user2Stats = metadata.user_stats[participant2];

  if (!user1Stats || !user2Stats) {
    return null;
  }

  // Get combined top items from both users
  const getCombinedTopItems = (type: "words" | "emojis") => {
    const user1Items =
      type === "words" ? user1Stats.top_words : user1Stats.top_emojis;
    const user2Items =
      type === "words" ? user2Stats.top_words : user2Stats.top_emojis;

    // Create a map of all items with counts from both users
    const itemMap = new Map<
      string,
      { user1Count: number; user2Count: number }
    >();

    user1Items.forEach((item) => {
      const key = "word" in item ? item.word : item.emoji;
      itemMap.set(key, {
        user1Count: item.count,
        user2Count: 0,
      });
    });

    user2Items.forEach((item) => {
      const key = "word" in item ? item.word : item.emoji;
      const existing = itemMap.get(key);
      if (existing) {
        existing.user2Count = item.count;
      } else {
        itemMap.set(key, {
          user1Count: 0,
          user2Count: item.count,
        });
      }
    });

    // Convert to array and sort by total usage
    const items = Array.from(itemMap.entries())
      .map(([key, counts]) => ({
        key,
        user1Count: counts.user1Count,
        user2Count: counts.user2Count,
        total: counts.user1Count + counts.user2Count,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Show top 10

    return items;
  };

  const items = getCombinedTopItems(showWords ? "words" : "emojis");

  // Calculate global max count for normalizing all progress bars
  const globalMaxCount = Math.max(
    ...items.flatMap((item) => [item.user1Count, item.user2Count]),
    1 // Avoid division by zero
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          {showWords ? (
            <>
              <Hash className="w-4 h-4 text-blue-600" />
              Head-to-Head: Words
            </>
          ) : (
            <>
              <Smile className="w-4 h-4 text-yellow-600" />
              Head-to-Head: Emojis
            </>
          )}
        </h3>
        <div className="flex gap-1.5">
          <button
            onClick={() => setShowWords(false)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              !showWords
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Emojis
          </button>
          <button
            onClick={() => setShowWords(true)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              showWords
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Words
          </button>
        </div>
      </div>

      {/* Participant labels */}
      <div className="flex items-center justify-between mb-3 text-xs font-semibold">
        <div className="text-purple-700 truncate max-w-[35%]">
          {participant1}
        </div>
        <div className="text-gray-400 text-[10px]">Usage</div>
        <div className="text-pink-700 truncate max-w-[35%] text-right">
          {participant2}
        </div>
      </div>

      {/* Comparison bars */}
      <div className="space-y-2">
        {items.map((item) => {
          // Normalize to global max instead of per-item max
          const user1Percentage = (item.user1Count / globalMaxCount) * 100;
          const user2Percentage = (item.user2Count / globalMaxCount) * 100;

          return (
            <div key={item.key} className="flex items-center gap-2">
              {/* Left bar (participant 1) */}
              <div className="flex-1 flex items-center justify-end gap-1.5">
                <span className="text-[10px] text-gray-600 min-w-6 text-right">
                  {item.user1Count}×
                </span>
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex justify-end">
                  <div
                    className="h-full bg-linear-to-l from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${user1Percentage}%` }}
                  />
                </div>
              </div>

              {/* Center item label */}
              <div className="min-w-15 text-center">
                {showWords ? (
                  <span className="text-xs font-semibold text-gray-900">
                    {item.key}
                  </span>
                ) : (
                  <span className="text-lg leading-none">{item.key}</span>
                )}
              </div>

              {/* Right bar (participant 2) */}
              <div className="flex-1 flex items-center gap-1.5">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-300"
                    style={{ width: `${user2Percentage}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-600 min-w-6 text-left">
                  {item.user2Count}×
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex justify-around text-center">
        <div>
          <div className="text-xl font-bold text-purple-700">
            {showWords
              ? user1Stats.top_words
                  .slice(0, 10)
                  .reduce((sum, w) => sum + w.count, 0)
              : user1Stats.top_emojis
                  .slice(0, 10)
                  .reduce((sum, e) => sum + e.count, 0)}
          </div>
          <div className="text-[10px] text-gray-600">
            {participant1}&apos;s total
          </div>
        </div>
        <div>
          <div className="text-xl font-bold text-pink-700">
            {showWords
              ? user2Stats.top_words
                  .slice(0, 10)
                  .reduce((sum, w) => sum + w.count, 0)
              : user2Stats.top_emojis
                  .slice(0, 10)
                  .reduce((sum, e) => sum + e.count, 0)}
          </div>
          <div className="text-[10px] text-gray-600">
            {participant2}&apos;s total
          </div>
        </div>
      </div>
    </div>
  );
}
