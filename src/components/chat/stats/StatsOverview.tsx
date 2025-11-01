"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import {
  Calendar,
  Clock,
  Image,
  Link as LinkIcon,
  MessageCircle,
  Users,
} from "lucide-react";

interface StatsOverviewProps {
  stats: ChatMetadata;
  participantCount: number;
}

export default function StatsOverview({
  stats,
  participantCount,
}: StatsOverviewProps) {
  const daysDiff = Math.ceil(
    (new Date(stats.date_range.end).getTime() -
      new Date(stats.date_range.start).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const totalMedia = Object.values(stats.media_shared_count || {}).reduce(
    (a, b) => a + b,
    0
  );

  const statCards = [
    {
      icon: MessageCircle,
      label: "Total Messages",
      value: stats.total_messages.toLocaleString(),
      subValue: `${stats.total_words.toLocaleString()} words`,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-50",
    },
    {
      icon: Users,
      label: "Participants",
      value: participantCount,
      subValue: "Active members",
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
    },
    {
      icon: Calendar,
      label: "Duration",
      value: `${daysDiff} days`,
      subValue: `${stats.messages_per_day_avg.toFixed(1)} msgs/day`,
      color: "from-green-500 to-emerald-500",
      bg: "bg-green-50",
    },
    {
      icon: Clock,
      label: "Busiest Time",
      value: `${stats.busiest_hour}:00`,
      subValue: stats.busiest_day,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
    },
    {
      icon: Image,
      label: "Media Shared",
      value: totalMedia.toLocaleString(),
      subValue: "Photos & videos",
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-50",
    },
    {
      icon: LinkIcon,
      label: "Links Shared",
      value: stats.links_shared_count.toLocaleString(),
      subValue: "URLs exchanged",
      color: "from-indigo-500 to-blue-500",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="group relative rounded-2xl border-2 border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300"
        >
          {/* Gradient background on hover */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}
          />

          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subValue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
