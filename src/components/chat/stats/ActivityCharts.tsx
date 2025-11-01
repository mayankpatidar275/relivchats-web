"use client";

import { ChatMetadata } from "@/src/features/chats/types";
import { BarChart, Clock } from "lucide-react";

interface ActivityChartsProps {
  stats: ChatMetadata;
}

export default function ActivityCharts({ stats }: ActivityChartsProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const maxHourlyMessages = Math.max(...stats.hourly_distribution);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const maxDailyMessages = Math.max(...Object.values(stats.daily_distribution));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Hourly Distribution */}
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold text-gray-900">Activity by Hour</h3>
        </div>

        <div className="space-y-2">
          {hours.map((hour) => {
            const count = stats.hourly_distribution[hour];
            const percentage = (count / maxHourlyMessages) * 100;
            const isBusiest = hour === stats.busiest_hour;

            return (
              <div key={hour} className="flex items-center gap-3">
                <div className="w-12 text-sm text-gray-600 font-medium text-right">
                  {hour.toString().padStart(2, "0")}:00
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isBusiest
                        ? "bg-linear-to-r from-primary to-accent-pink"
                        : "bg-linear-to-r from-blue-400 to-blue-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                  {count > 0 && (
                    <span className="absolute inset-0 flex items-center px-3 text-xs font-semibold text-gray-700">
                      {count} messages
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Distribution */}
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-6">
          <BarChart className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold text-gray-900">Activity by Day</h3>
        </div>

        <div className="space-y-3">
          {days.map((day) => {
            const count = stats.daily_distribution[day];
            const percentage = (count / maxDailyMessages) * 100;
            const isBusiest = day === stats.busiest_day;

            return (
              <div key={day} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      isBusiest ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {day}
                  </span>
                  <span className="text-sm font-semibold text-gray-600">
                    {count} messages
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isBusiest
                        ? "bg-linear-to-r from-primary to-accent-pink"
                        : "bg-linear-to-r from-green-400 to-green-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
