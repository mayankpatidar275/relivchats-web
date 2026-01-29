"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChatMetadata } from "@/src/features/chats/types";

interface ActivityChartsProps {
  metadata: ChatMetadata;
}

export default function ActivityCharts({ metadata }: ActivityChartsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartType, setChartType] = useState<"hourly" | "daily" | "timeline">(
    "hourly"
  );

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  // Always show aggregate data
  const getHourlyData = () => {
    return metadata.hourly_distribution.map((count, hour) => ({
      hour: formatHour(hour),
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

    return days.map((day) => ({
      day: day.slice(0, 3),
      messages: metadata.daily_distribution[day] || 0,
    }));
  };

  const getTimelineData = () => {
    // Use actual per-day message counts from backend
    const messagesByDate = metadata.messages_by_date || {};
    const dates = Object.keys(messagesByDate).sort();

    if (dates.length === 0) {
      return [];
    }

    const totalDays = metadata.total_days;
    const useWeeklyAggregation = totalDays > 90;

    if (useWeeklyAggregation) {
      // Aggregate into weeks
      const weeklyData: Record<string, number> = {};

      dates.forEach((dateStr) => {
        const date = new Date(dateStr);
        // Get the Monday of this week
        const dayOfWeek = date.getDay();
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        const weekKey = monday.toISOString().split("T")[0];

        weeklyData[weekKey] = (weeklyData[weekKey] || 0) + messagesByDate[dateStr];
      });

      return Object.keys(weeklyData)
        .sort()
        .map((weekStart) => ({
          date: new Date(weekStart).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          messages: weeklyData[weekStart],
        }));
    } else {
      // Show daily data
      return dates.map((dateStr) => ({
        date: new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        messages: messagesByDate[dateStr],
      }));
    }
  };

  const chartData =
    chartType === "hourly"
      ? getHourlyData()
      : chartType === "daily"
        ? getDailyData()
        : getTimelineData();

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
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button
              onClick={() => setChartType("hourly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                chartType === "hourly"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Hour
            </button>
            <button
              onClick={() => setChartType("daily")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                chartType === "daily"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              By Day
            </button>
            <button
              onClick={() => setChartType("timeline")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                chartType === "timeline"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Timeline
            </button>
          </div>

          {/* Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "timeline" ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#9333ea"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#9333ea"
                    strokeWidth={2}
                    fill="url(#colorGradient)"
                  />
                </AreaChart>
              ) : (
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
                      <stop
                        offset="0%"
                        stopColor="#9333ea"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ec4899"
                        stopOpacity={0.8}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Insights */}
          <div className="mt-4 p-3 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">
              {chartType === "timeline" ? (
                <>
                  <strong>Chat Duration:</strong> {metadata.total_days} days
                  with an average of{" "}
                  {metadata.messages_per_day_avg.toFixed(1)} messages per day
                </>
              ) : (
                <>
                  <strong>
                    Peak {chartType === "hourly" ? "Hour" : "Day"}:
                  </strong>{" "}
                  {chartType === "hourly"
                    ? `${formatHour(metadata.busiest_hour)} (${
                        metadata.hourly_distribution[metadata.busiest_hour]
                      } messages)`
                    : `${metadata.busiest_day} (${
                        metadata.daily_distribution[metadata.busiest_day]
                      } messages)`}
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
