"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Download, Share2 } from "lucide-react";
import { ChatMetadata } from "@/src/features/chats/types";
import {
  TotalMessagesCard,
  PeakHourCard,
  TopEmojiCard,
  MostActiveDayCard,
  TimeOfDayAwardCard,
  FavoriteEmojisCard,
} from "./cards/StatCards";
import { downloadCard, shareCard } from "@/src/utils/downloadCard";
import { toast } from "sonner";

interface Props {
  chatId: string;
  metadata: ChatMetadata;
}

export default function CardsPreviewSection({ chatId, metadata }: Props) {
  const totalMessagesRef = useRef<HTMLDivElement>(null);
  const peakHourRef = useRef<HTMLDivElement>(null);
  const topEmojiRef = useRef<HTMLDivElement>(null);
  const mostActiveDayRef = useRef<HTMLDivElement>(null);
  const timeOfDayRef = useRef<HTMLDivElement>(null);
  const favoriteEmojisRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (
    ref: React.RefObject<HTMLDivElement | null>,
    name: string
  ) => {
    try {
      await downloadCard(ref.current, `reliv-chats-${name}`);
      toast.success("Card downloaded!");
    } catch (error) {
      toast.error("Failed to download card");
      console.error(error);
    }
  };

  const handleShare = async (
    ref: React.RefObject<HTMLDivElement | null>,
    name: string
  ) => {
    try {
      await shareCard(ref.current, `Reliv Chats - ${name}`);
    } catch (error) {
      // Check if user canceled the share (expected behavior)
      if (error instanceof Error && error.name === "AbortError") {
        // User canceled - don't show error
        return;
      }
      toast.error("Failed to share card");
      console.error(error);
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-2xl border border-purple-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            Shareable Gift Cards
          </h2>
          <p className="text-sm text-gray-600">
            Download and share on social media
          </p>
        </div>
        <Link
          href={`/chat/${chatId}/cards`}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors shrink-0"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Cards Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
        {/* Card 1: Total Messages */}
        <div className="relative group w-full max-w-[200px]">
          <TotalMessagesCard ref={totalMessagesRef} metadata={metadata} />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(totalMessagesRef, "total-messages")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(totalMessagesRef, "total-messages")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 2: Peak Hour */}
        <div className="relative group w-full max-w-[200px]">
          <PeakHourCard ref={peakHourRef} metadata={metadata} />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(peakHourRef, "peak-hour")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(peakHourRef, "peak-hour")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 3: Top Emoji */}
        <div className="relative group w-full max-w-[200px]">
          <TopEmojiCard ref={topEmojiRef} metadata={metadata} />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(topEmojiRef, "top-emoji")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(topEmojiRef, "top-emoji")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 4: Most Active Day */}
        <div className="relative group w-full max-w-[200px]">
          <MostActiveDayCard ref={mostActiveDayRef} metadata={metadata} />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(mostActiveDayRef, "most-active-day")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(mostActiveDayRef, "most-active-day")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 5: Time of Day Award */}
        <div className="relative group w-full max-w-[200px]">
          <TimeOfDayAwardCard
            ref={timeOfDayRef}
            metadata={metadata}
            participants={metadata.user_stats ? Object.keys(metadata.user_stats) : []}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(timeOfDayRef, "time-of-day")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(timeOfDayRef, "time-of-day")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Card 6: Favorite Emojis */}
        <div className="relative group w-full max-w-[200px]">
          <FavoriteEmojisCard
            ref={favoriteEmojisRef}
            metadata={metadata}
            participants={metadata.user_stats ? Object.keys(metadata.user_stats) : []}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
            <button
              onClick={() => handleDownload(favoriteEmojisRef, "favorite-emojis")}
              className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare(favoriteEmojisRef, "favorite-emojis")}
              className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          💡 <strong>12 free cards</strong> • Unlock insights for <strong>5 premium award cards</strong>
        </p>
      </div>
    </section>
  );
}
