"use client";

import { useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  const { user } = useUser();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Left: Greeting */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || "there"}! 👋
            </h1>
            <p className="text-lg text-gray-600">
              Manage your chats and unlock deeper insights
            </p>
          </div>

          {/* Right: Quick stats */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
                0
              </div>
              <div className="text-sm text-gray-600">Chats</div>
            </div>
            <div className="h-12 w-px bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
                0
              </div>
              <div className="text-sm text-gray-600">Insights</div>
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
