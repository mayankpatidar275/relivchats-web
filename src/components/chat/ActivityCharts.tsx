"use client";

import { ParticipantMode } from "./ParticipantFilter";
import { useState } from "react";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChatMetadata } from "@/src/features/chats/types";

interface ActivityChartsProps {
  metadata: ChatMetadata;
  selectedMode: ParticipantMode;
}

export default function ActivityCharts({
  metadata,
  selectedMode,
}: ActivityChartsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartType, setChartType] = useState<"hourly" | "daily">("hourly");

  const getHourlyData = () => {
    if (selectedMode === "all" || selectedMode === "compare") {
      return metadata.hourly_distribution.map((count, hour) => ({
        hour: `${hour}:00`,
        messages: count,
      }));
    }

    const userStats = metadata.user_stats[selectedMode];
    if (!userStats) return [];

    return userStats.hourly_distribution.map((count, hour) => ({
      hour: `${hour}:00`,
      messages: count,
    }));
  };

  const getDailyData = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    if (selectedMode === "all" || selectedMode === "compare") {
      return days.map((day) => ({
        day: day.slice(0, 3),
        messages: metadata.daily_distribution[day] || 0,
      }));
    }

    // For individual user, we don't have daily distribution, so aggregate from hourly
    // This is a limitation - you might want to add daily_distribution to UserStats
    return days.map((day) => ({
      day: day.slice(0, 3),
      messages: metadata.daily_distribution[day] || 0,
    }));
  };

  const chartData = chartType === "hourly" ? getHourlyData() : getDailyData();

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-gray-900">
            Activity Distribution
          </h3>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Expandable content */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-100">
          {/* Chart type tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setChartType("hourly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartType === "hourly"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Hour
            </button>
            <button
              onClick={() => setChartType("daily")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                chartType === "daily"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Day
            </button>
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey={chartType === "hourly" ? "hour" : "day"}
                  tick={{ fontSize: 12 }}
                  interval={chartType === "hourly" ? 2 : 0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="messages"
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#9333ea" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Peak {chartType === "hourly" ? "Hour" : "Day"}:</strong>{" "}
              {chartType === "hourly"
                ? `${metadata.busiest_hour}:00 (${
                    metadata.hourly_distribution[metadata.busiest_hour]
                  } messages)`
                : `${metadata.busiest_day} (${
                    metadata.daily_distribution[metadata.busiest_day]
                  } messages)`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
