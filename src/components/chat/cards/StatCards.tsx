import React, { forwardRef, useMemo } from "react";
import { ChatMetadata } from "@/src/features/chats/types";
import BaseCard from "./BaseCard";

// Total Messages Card
export const TotalMessagesCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  return (
    <div ref={ref}>
      <BaseCard pattern="dots" bgColor="bg-purple-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              TOTAL MESSAGES
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-black mb-1">
                {metadata.total_messages.toLocaleString()}
              </div>
              <p className="text-[10px] italic opacity-80">
                messages exchanged together
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Over {metadata.total_days} days of conversation
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

TotalMessagesCard.displayName = "TotalMessagesCard";

// Peak Hour Card
export const PeakHourCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const peakHour = formatHour(metadata.busiest_hour);
  const timeOfDay =
    metadata.busiest_hour >= 6 && metadata.busiest_hour < 12
      ? "Morning"
      : metadata.busiest_hour >= 12 && metadata.busiest_hour < 17
        ? "Afternoon"
        : metadata.busiest_hour >= 17 && metadata.busiest_hour < 21
          ? "Evening"
          : "Night";

  return (
    <div ref={ref}>
      <BaseCard pattern="waves" bgColor="bg-blue-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              PEAK CHATTING HOUR
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-black mb-1">{peakHour}</div>
              <p className="text-[10px] italic opacity-80">
                you&apos;re most active then
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              {timeOfDay} chatters
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

PeakHourCard.displayName = "PeakHourCard";

// Top Emoji Card
export const TopEmojiCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  const topEmoji = metadata.top_emojis[0];

  return (
    <div ref={ref}>
      <BaseCard pattern="circles" bgColor="bg-orange-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              MOST USED EMOJI
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">{topEmoji.emoji}</div>
              <p className="text-[10px] italic opacity-80">
                used {topEmoji.count} times
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Your signature emoji
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

TopEmojiCard.displayName = "TopEmojiCard";

// First Message Card
export const FirstMessageCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  const startDate = useMemo(
    () => new Date(metadata.date_range.start),
    [metadata.date_range.start],
  );
  const daysSince = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/purity
      Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)),
    [startDate],
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div ref={ref}>
      <BaseCard pattern="grid" bgColor="bg-teal-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              FIRST MESSAGE
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-lg font-black mb-2 leading-tight">
                {formatDate(startDate)}
              </div>
              <p className="text-[10px] italic opacity-80">
                {daysSince} days ago
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              {metadata.total_days} days of memories
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

FirstMessageCard.displayName = "FirstMessageCard";

// Balance Card
export const BalanceCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  const participantData = participants.map((participant) => {
    const stats = metadata.user_stats[participant];
    const percentage = (
      (stats.message_count / metadata.total_messages) *
      100
    ).toFixed(1);
    return {
      name: participant,
      percentage: parseFloat(percentage),
      count: stats.message_count,
    };
  });

  // Sort by percentage descending
  participantData.sort((a, b) => b.percentage - a.percentage);
  const topContributor = participantData[0];

  return (
    <div ref={ref}>
      <BaseCard pattern="diagonal" bgColor="bg-indigo-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              CONVERSATION BALANCE
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topContributor.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80">
                sent {topContributor.percentage}% of messages
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium">
              {topContributor.count.toLocaleString()} out of{" "}
              {metadata.total_messages.toLocaleString()} total
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

BalanceCard.displayName = "BalanceCard";

// Longest Streak Card
export const LongestStreakCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  // Calculate longest streak (most consecutive messages by one person)
  // This is a simplified version - you might want to calculate this in the backend
  const streakData = participants.map((participant) => {
    const stats = metadata.user_stats[participant];
    // Using conversation_initiations as proxy for streak
    return {
      name: participant,
      streak: stats.conversation_initiations,
    };
  });

  const topStreak = streakData.sort((a, b) => b.streak - a.streak)[0];

  return (
    <div ref={ref}>
      <BaseCard pattern="waves" bgColor="bg-red-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              CONVERSATION STARTER
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topStreak.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80">
                started {topStreak.streak} conversations
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Always breaking the ice
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

LongestStreakCard.displayName = "LongestStreakCard";

// FREE AWARD CARDS (based on metadata, no insights needed)

// Early Bird / Night Owl Award
export const TimeOfDayAwardCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  // Find who's most active in morning vs night
  const participantPeakHours = participants.map((p) => {
    const stats = metadata.user_stats[p];
    return {
      name: p,
      peakHour: stats.busiest_hour,
      isEarlyBird: stats.busiest_hour >= 6 && stats.busiest_hour < 12,
      isNightOwl: stats.busiest_hour >= 21 || stats.busiest_hour < 6,
    };
  });

  const earlyBird = participantPeakHours.find((p) => p.isEarlyBird);
  const nightOwl = participantPeakHours.find((p) => p.isNightOwl);

  const winner = earlyBird || nightOwl || participantPeakHours[0];
  const award = winner.isEarlyBird
    ? "EARLY BIRD"
    : winner.isNightOwl
      ? "NIGHT OWL"
      : "DAY CHATTER";
  const description = winner.isEarlyBird
    ? "rises with the sun"
    : winner.isNightOwl
      ? "burns the midnight oil"
      : "peaks during the day";

  return (
    <div ref={ref}>
      <BaseCard pattern="dots" bgColor="bg-amber-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              {award}
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {winner.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80 line-clamp-2">
                {description}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Peak at {winner.peakHour % 12 || 12}
              {winner.peakHour >= 12 ? "PM" : "AM"}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

TimeOfDayAwardCard.displayName = "TimeOfDayAwardCard";

// Speed Texter Award (fastest responder)
export const SpeedTexterCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  const fastest = participants
    .map((p) => ({
      name: p,
      responseTime: metadata.user_stats[p].avg_response_time_seconds,
    }))
    .sort((a, b) => a.responseTime - b.responseTime)[0];

  const minutes = Math.floor(fastest.responseTime / 60);

  return (
    <div ref={ref}>
      <BaseCard pattern="diagonal" bgColor="bg-cyan-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              SPEED TEXTER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {fastest.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80 line-clamp-2">
                replies lightning fast
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              {minutes < 1 ? "<1" : minutes} min average response
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

SpeedTexterCard.displayName = "SpeedTexterCard";

// Question Master Award (asks most questions)
export const QuestionMasterCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  const topQuestioner = participants
    .map((p) => ({
      name: p,
      questions: metadata.user_stats[p].questions_asked,
    }))
    .sort((a, b) => b.questions - a.questions)[0];

  return (
    <div ref={ref}>
      <BaseCard pattern="circles" bgColor="bg-green-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              QUESTION MASTER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topQuestioner.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80 line-clamp-2">
                keeps the conversation going
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Asked {topQuestioner.questions} questions
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

QuestionMasterCard.displayName = "QuestionMasterCard";

// Most Shared Website Card
export const MostSharedWebsiteCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  // Get most shared website from links
  const topWebsite = useMemo(() => {
    if (!metadata.links || metadata.links.length === 0) {
      return null;
    }
    // Count domains
    const domainCounts: Record<string, number> = {};
    metadata.links.forEach((link) => {
      try {
        const url = new URL(link.url);
        const domain = url.hostname.replace("www.", "");
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
      } catch {
        // Invalid URL, skip
      }
    });

    // Find most common domain
    let maxDomain = "";
    let maxCount = 0;
    Object.entries(domainCounts).forEach(([domain, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxDomain = domain;
      }
    });

    if (!maxDomain) return null;

    return {
      domain: maxDomain,
      count: maxCount,
    };
  }, [metadata.links]);

  if (!topWebsite) {
    return (
      <div ref={ref}>
        <BaseCard pattern="waves" bgColor="bg-blue-500">
          <div className="flex-1 flex flex-col justify-between py-2">
            <div className="text-center">
              <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
                MOST SHARED WEBSITE
              </h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[10px] italic opacity-75">No links shared</p>
            </div>
          </div>
        </BaseCard>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <BaseCard pattern="waves" bgColor="bg-blue-500">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              MOST SHARED WEBSITE
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-base font-black mb-2 leading-tight break-words overflow-hidden">
                {topWebsite.domain.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80">
                shared {topWebsite.count} times
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">Your go-to link</p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

MostSharedWebsiteCard.displayName = "MostSharedWebsiteCard";

// Favorite Emojis (All Participants) Card
export const FavoriteEmojisCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata; participants: string[] }
>(({ metadata, participants }, ref) => {
  const participantEmojis = useMemo(() => {
    return participants.map((p) => {
      const stats = metadata.user_stats[p];
      const topEmoji = stats.top_emojis?.[0];
      return {
        name: p,
        emoji: topEmoji?.emoji || "😊",
        count: topEmoji?.count || 0,
      };
    });
  }, [metadata.user_stats, participants]);

  return (
    <div ref={ref}>
      <BaseCard pattern="dots" bgColor="bg-pink-500">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              FAVORITE EMOJIS
            </h3>
          </div>

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full px-4 space-y-2">
              {participantEmojis.slice(0, 3).map((p, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-[9px] font-bold truncate max-w-[80px]">
                    {p.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="text-[9px] font-bold">{p.count}×</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Everyone&apos;s signature style
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

FavoriteEmojisCard.displayName = "FavoriteEmojisCard";

// Most Active Day Card
export const MostActiveDayCard = forwardRef<
  HTMLDivElement,
  { metadata: ChatMetadata }
>(({ metadata }, ref) => {
  const busiestDay = useMemo(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayData = metadata.daily_distribution || {};
    let maxDay = 0;
    let maxCount = 0;

    Object.entries(dayData).forEach(([day, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxDay = parseInt(day);
      }
    });

    return {
      name: days[maxDay] || "Unknown",
      count: maxCount,
    };
  }, [metadata.daily_distribution]);

  return (
    <div ref={ref}>
      <BaseCard pattern="grid" bgColor="bg-purple-500">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              MOST ACTIVE DAY
            </h3>
          </div>

          {/* Main stat */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-black mb-2 leading-tight">
                {busiestDay.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-80">
                {busiestDay.count} messages
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center">
            <p className="text-[9px] opacity-75 font-medium">
              Your chattiest day
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

MostActiveDayCard.displayName = "MostActiveDayCard";
