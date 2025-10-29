"use client";

import { useChatStats } from "@/src/features/chats/api";
import {
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Image,
  File,
} from "lucide-react";

interface FreeStatsSectionProps {
  chatId: string;
}

export default function FreeStatsSection({ chatId }: FreeStatsSectionProps) {
  const { data: stats, isLoading } = useChatStats(chatId);

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

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      icon: MessageCircle,
      label: "Total Messages",
      value: stats.total_messages.toLocaleString(),
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Participants",
      value: stats.participants.length,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
    },
    {
      icon: Calendar,
      label: "Chat Duration",
      value: `${Math.ceil(
        (new Date(stats.date_range.end).getTime() -
          new Date(stats.date_range.start).getTime()) /
          (1000 * 60 * 60 * 24)
      )} days`,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
    },
    {
      icon: TrendingUp,
      label: "Avg Message Length",
      value: `${stats.avg_message_length} chars`,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
    },
    {
      icon: Image,
      label: "Media Shared",
      value: (
        stats.media_count.images + stats.media_count.videos
      ).toLocaleString(),
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
    },
    {
      icon: File,
      label: "Most Active",
      value: stats.most_active_participant,
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50",
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
              className={`relative group rounded-2xl border-2 border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300`}
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
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
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
            {stats.participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-[--color-accent-pink] flex items-center justify-center text-white font-bold">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {participant.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      {participant.message_count.toLocaleString()} messages (
                      {participant.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-[--color-accent-pink] rounded-full transition-all duration-500"
                      style={{ width: `${participant.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
