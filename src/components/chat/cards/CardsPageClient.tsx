"use client";

import React, { useRef, useState } from "react";
import { useChat } from "@/src/features/chats/api";
import { useChatInsights } from "@/src/features/insights/api/hooks";
import { ArrowLeft, Download, Share2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { downloadCard, shareCard } from "@/src/utils/downloadCard";
import { toast } from "sonner";
import {
  TotalMessagesCard,
  PeakHourCard,
  TopEmojiCard,
  FirstMessageCard,
  BalanceCard,
  LongestStreakCard,
  TimeOfDayAwardCard,
  SpeedTexterCard,
  QuestionMasterCard,
  MostSharedWebsiteCard,
  FavoriteEmojisCard,
  MostActiveDayCard,
} from "./StatCards";
import {
  EmotionalSupporterCard,
  ConflictResolverCard,
  FuturePlannerCard,
  RomanticSparkCard,
  LoveLanguageMasterCard,
} from "./AwardCards";
import type {
  EmotionalIntimacyContent,
  ConflictResolutionContent,
  FuturePlanningContent,
  PlayfulnessRomanceContent,
  LoveLanguageContent,
} from "@/src/features/insights/types";

interface Props {
  chatId: string;
}

export default function CardsPageClient({ chatId }: Props) {
  const router = useRouter();
  const { data: chat, isLoading: chatLoading } = useChat(chatId);
  const { data: insightsData, isLoading: insightsLoading } =
    useChatInsights(chatId);

  // Refs for each card
  const totalMessagesRef = useRef<HTMLDivElement>(null);
  const peakHourRef = useRef<HTMLDivElement>(null);
  const topEmojiRef = useRef<HTMLDivElement>(null);
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const balanceRef = useRef<HTMLDivElement>(null);
  const longestStreakRef = useRef<HTMLDivElement>(null);

  // Free award cards refs
  const timeOfDayRef = useRef<HTMLDivElement>(null);
  const speedTexterRef = useRef<HTMLDivElement>(null);
  const questionMasterRef = useRef<HTMLDivElement>(null);

  // Paid award cards refs
  const emotionalSupporterRef = useRef<HTMLDivElement>(null);
  const conflictResolverRef = useRef<HTMLDivElement>(null);
  const futurePlannerRef = useRef<HTMLDivElement>(null);
  const romanticSparkRef = useRef<HTMLDivElement>(null);
  const loveLanguageMasterRef = useRef<HTMLDivElement>(null);

  // Refs for new cards
  const mostSharedWebsiteRef = useRef<HTMLDivElement>(null);
  const favoriteEmojisRef = useRef<HTMLDivElement>(null);
  const mostActiveDayRef = useRef<HTMLDivElement>(null);

  const [downloadingCard, setDownloadingCard] = useState<string | null>(null);

  if (chatLoading || !chat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading cards...</p>
        </div>
      </div>
    );
  }

  const handleDownload = async (
    ref: React.RefObject<HTMLDivElement | null>,
    name: string
  ) => {
    setDownloadingCard(name);
    try {
      await downloadCard(ref.current, `reliv-chats-${name}`);
      toast.success("Card downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download card");
      console.error(error);
    } finally {
      setDownloadingCard(null);
    }
  };

  const handleShare = async (
    ref: React.RefObject<HTMLDivElement | null>,
    name: string
  ) => {
    setDownloadingCard(name);
    try {
      await shareCard(ref.current, `Reliv Chats - ${name}`);
      toast.success("Card shared successfully!");
    } catch (error) {
      // Check if user canceled the share (expected behavior)
      if (error instanceof Error && error.name === "AbortError") {
        // User canceled - don't show error
        return;
      }
      toast.error("Failed to share card");
      console.error(error);
    } finally {
      setDownloadingCard(null);
    }
  };

  const freeCards: Array<{
    name: string;
    title: string;
    ref: React.RefObject<HTMLDivElement | null>;
    component: React.ReactNode;
  }> = [
    {
      name: "total-messages",
      title: "Total Messages",
      ref: totalMessagesRef,
      component: <TotalMessagesCard ref={totalMessagesRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "peak-hour",
      title: "Peak Hour",
      ref: peakHourRef,
      component: <PeakHourCard ref={peakHourRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "top-emoji",
      title: "Top Emoji",
      ref: topEmojiRef,
      component: <TopEmojiCard ref={topEmojiRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "first-message",
      title: "First Message",
      ref: firstMessageRef,
      component: <FirstMessageCard ref={firstMessageRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "balance",
      title: "Conversation Balance",
      ref: balanceRef,
      component: (
        <BalanceCard
          ref={balanceRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
    {
      name: "conversation-starter",
      title: "Conversation Starter",
      ref: longestStreakRef,
      component: (
        <LongestStreakCard
          ref={longestStreakRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
    {
      name: "most-shared-website",
      title: "Most Shared Website",
      ref: mostSharedWebsiteRef,
      component: <MostSharedWebsiteCard ref={mostSharedWebsiteRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "favorite-emojis",
      title: "Favorite Emojis",
      ref: favoriteEmojisRef,
      component: (
        <FavoriteEmojisCard
          ref={favoriteEmojisRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
    {
      name: "most-active-day",
      title: "Most Active Day",
      ref: mostActiveDayRef,
      component: <MostActiveDayCard ref={mostActiveDayRef} metadata={chat.chat_metadata} />,
    },
    {
      name: "time-of-day",
      title: "Time of Day Award",
      ref: timeOfDayRef,
      component: (
        <TimeOfDayAwardCard
          ref={timeOfDayRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
    {
      name: "speed-texter",
      title: "Speed Texter",
      ref: speedTexterRef,
      component: (
        <SpeedTexterCard
          ref={speedTexterRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
    {
      name: "question-master",
      title: "Question Master",
      ref: questionMasterRef,
      component: (
        <QuestionMasterCard
          ref={questionMasterRef}
          metadata={chat.chat_metadata}
          participants={chat.participants}
        />
      ),
    },
  ];

  // Premium award cards (only if insights unlocked)
  const awardCards: Array<{
    name: string;
    title: string;
    ref: React.RefObject<HTMLDivElement | null>;
    component: React.ReactNode;
    insightType: string;
  }> = [];

  if (chat.insights_unlocked && insightsData?.insights) {
    const insights = insightsData.insights.filter(
      (i) => i.status === "completed"
    );

    insights.forEach((insight) => {
      if (insight.insight_type_name === "emotional_intimacy") {
        awardCards.push({
          name: "emotional-supporter",
          title: "Emotional Supporter",
          ref: emotionalSupporterRef,
          component: (
            <EmotionalSupporterCard
              ref={emotionalSupporterRef}
              content={insight.content as EmotionalIntimacyContent}
            />
          ),
          insightType: insight.insight_type_name,
        });
      } else if (insight.insight_type_name === "conflict_resolution") {
        awardCards.push({
          name: "conflict-resolver",
          title: "Conflict Resolver",
          ref: conflictResolverRef,
          component: (
            <ConflictResolverCard
              ref={conflictResolverRef}
              content={insight.content as ConflictResolutionContent}
            />
          ),
          insightType: insight.insight_type_name,
        });
      } else if (insight.insight_type_name === "future_planning") {
        awardCards.push({
          name: "future-planner",
          title: "Future Planner",
          ref: futurePlannerRef,
          component: (
            <FuturePlannerCard
              ref={futurePlannerRef}
              content={insight.content as FuturePlanningContent}
            />
          ),
          insightType: insight.insight_type_name,
        });
      } else if (insight.insight_type_name === "playfulness_romance") {
        awardCards.push({
          name: "romantic-spark",
          title: "Romantic Spark",
          ref: romanticSparkRef,
          component: (
            <RomanticSparkCard
              ref={romanticSparkRef}
              content={insight.content as PlayfulnessRomanceContent}
            />
          ),
          insightType: insight.insight_type_name,
        });
      } else if (insight.insight_type_name === "love_language") {
        awardCards.push({
          name: "love-language-master",
          title: "Love Language Master",
          ref: loveLanguageMasterRef,
          component: (
            <LoveLanguageMasterCard
              ref={loveLanguageMasterRef}
              content={insight.content as LoveLanguageContent}
            />
          ),
          insightType: insight.insight_type_name,
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Chat</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎁 Your Gift Cards
          </h1>
          <p className="text-gray-600">
            Download and share your chat stats on social media
          </p>
        </div>

        {/* Free Cards Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">🎁</span>
            Your Gift Cards
            <span className="text-sm font-normal text-white bg-green-500 px-3 py-1 rounded-full">
              FREE
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
            {freeCards.map((card) => (
              <div key={card.name} className="relative group w-full max-w-[200px]">
                {card.component}

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
                  <button
                    onClick={() => handleDownload(card.ref, card.name)}
                    disabled={downloadingCard === card.name}
                    className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-lg"
                    title="Download"
                    aria-label="Download card"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare(card.ref, card.name)}
                    disabled={downloadingCard === card.name}
                    className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-lg"
                    title="Share"
                    aria-label="Share card"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Award Cards Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="text-3xl">💎</span>
            Premium Award Cards
            {!chat.insights_unlocked && (
              <span className="text-sm font-normal text-white bg-purple-500 px-3 py-1 rounded-full flex items-center gap-1">
                <Lock className="w-3 h-3" />
                UNLOCK WITH INSIGHTS
              </span>
            )}
          </h2>

          {!chat.insights_unlocked ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-300">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Award Cards Locked
              </h3>
              <p className="text-gray-600 mb-6">
                Unlock AI insights to generate personalized award cards
              </p>
              <button
                onClick={() => router.push(`/chat/${chatId}`)}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Unlock Insights
              </button>
            </div>
          ) : insightsLoading ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 border-4 border-purple-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Generating award cards...</p>
            </div>
          ) : awardCards.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-gray-200">
              <p className="text-gray-600">
                No award cards available yet. Check back when insights are complete.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
              {awardCards.map((card) => (
                <div key={card.name} className="relative group w-full max-w-[200px]">
                  {card.component}

                  {/* Hover overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex flex-col items-center justify-center gap-3 z-30">
                    <button
                      onClick={() => handleDownload(card.ref, card.name)}
                      disabled={downloadingCard === card.name}
                      className="p-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 shadow-lg"
                      title="Download"
                      aria-label="Download card"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare(card.ref, card.name)}
                      disabled={downloadingCard === card.name}
                      className="p-3 bg-primary text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-lg"
                      title="Share"
                      aria-label="Share card"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
