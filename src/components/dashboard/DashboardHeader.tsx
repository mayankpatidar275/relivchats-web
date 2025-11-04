"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { useChats } from "@/src/features/chats/api";

export default function DashboardHeader() {
  const { user } = useUser();
  const { data: chats } = useChats();

  const totalChats = chats?.length || 0;
  const unlockedChats = chats?.filter((c) => c.insights_unlocked).length || 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-linear-to-br from-purple-50 via-pink-50 to-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col gap-4">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
              {getGreeting()}, {user?.firstName || "there"}! 👋
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Manage your chats and unlock deeper insights
            </p>
          </div>

          {/* Stats Cards - Mobile responsive */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Total Chats */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="text-xs text-gray-600 mb-1">Total Chats</div>
              <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                {totalChats}
              </div>
            </div>

            {/* Unlocked Insights */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
              <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Insights Unlocked
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                {unlockedChats}
              </div>
            </div>

            {/* Total Messages */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow col-span-2 md:col-span-1">
              <div className="text-xs text-gray-600 mb-1">Total Messages</div>
              <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                {chats
                  ?.reduce(
                    (sum, chat) => sum + chat.chat_metadata.total_messages,
                    0
                  )
                  .toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
