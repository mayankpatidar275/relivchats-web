"use client";

import { useChat } from "@/src/features/chats/api";
import {
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Zap,
  Clock,
} from "lucide-react";

interface FreeStatsSectionProps {
  chatId: string;
}

export default function FreeStatsSection({ chatId }: FreeStatsSectionProps) {
  const { data: chat, isLoading } = useChat(chatId);

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!chat || !chat.chat_metadata) {
    return null;
  }

  const stats = chat.chat_metadata;

  // Calculate days duration
  const startDate = new Date(stats.date_range.start);
  const endDate = new Date(stats.date_range.end);
  const daysDiff = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Get most active participant
  const participants = Object.entries(stats.user_stats);
  const mostActive = participants.reduce(
    (max, [name, userStats]) =>
      userStats.message_count > max.count
        ? { name, count: userStats.message_count }
        : max,
    { name: "", count: 0 }
  );

  const statCards = [
    {
      icon: MessageCircle,
      label: "Total Messages",
      value: stats.total_messages.toLocaleString(),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      label: "Participants",
      value: chat.participants.length,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      label: "Chat Duration",
      value: `${daysDiff} days`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      label: "Avg Messages/Day",
      value: stats.messages_per_day_avg.toFixed(1),
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Clock,
      label: "Busiest Hour",
      value: `${stats.busiest_hour}:00`,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Zap,
      label: "Most Active",
      value: mostActive.name,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Free Basic Statistics
            </h2>
            <p className="text-gray-600">
              Instant insights about your chat, no coins required
            </p>
          </div>
          <div className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold border border-green-200">
            ✓ Free
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="relative group rounded-2xl border-2 border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 truncate">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Participants breakdown */}
        <div className="bg-linear-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Participant Activity
          </h3>
          <div className="space-y-4">
            {participants.map(([name, userStats], index) => {
              const percentage =
                (userStats.message_count / stats.total_messages) * 100;

              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-[--color-accent-pink] flex items-center justify-center text-white font-bold shrink-0">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 truncate">
                        {name}
                      </span>
                      <span className="text-sm text-gray-600 ml-2 shrink-0">
                        {userStats.message_count.toLocaleString()} messages (
                        {percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-primary to-[--color-accent-pink] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
