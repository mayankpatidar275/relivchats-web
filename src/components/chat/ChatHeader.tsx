"use client";

import {
  ArrowLeft,
  Calendar,
  Users,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/src/lib/utils";
import { useChat } from "@/src/features/chats/api";

interface ChatHeaderProps {
  chatId: string;
}

export default function ChatHeader({ chatId }: ChatHeaderProps) {
  const router = useRouter();
  //TODO: should i have a ui for error also?
  const { data: chat, isLoading } = useChat(chatId);

  console.log("data: ", chat);

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!chat) {
    return null;
  }

  // Category color mapping
  const colorMap: Record<
    string,
    { text: string; bg: string; gradient: string }
  > = {
    romantic: {
      text: "text-pink-600",
      bg: "bg-pink-50",
      gradient: "from-[--color-romantic-from] to-[--color-romantic-to]",
    },
    friendship: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-[--color-friendship-from] to-[--color-friendship-to]",
    },
    family: {
      text: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-[--color-family-from] to-[--color-family-to]",
    },
    work: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-[--color-work-from] to-[--color-work-to]",
    },
  };

  const colors = chat.category_slug
    ? colorMap[chat.category_slug]
    : {
        text: "text-gray-600",
        bg: "bg-gray-50",
        gradient: "from-gray-400 to-gray-600",
      };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="flex items-start justify-between gap-6 flex-wrap">
          {/* Left: Chat info */}
          <div className="space-y-4 flex-1 min-w-0">
            {/* Category badge */}
            {chat.category_name && (
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  colors.bg
                } border-2 ${colors.text.replace("text-", "border-")}`}
              >
                <div
                  className={`w-2 h-2 rounded-full bg-linear-to-r ${colors.gradient}`}
                />
                <span className={`text-sm font-semibold ${colors.text}`}>
                  {chat.category_name}
                </span>
              </div>
            )}

            {/* Filename */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 wrap-break-word">
              {chat.filename}
            </h1>

            {/* Quick stats */}
            <div className="flex items-center gap-6 flex-wrap text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Uploaded {formatDate(chat.created_at)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{chat.participants.length} participants</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>
                  {chat.chat_metadata.total_messages.toLocaleString()} messages
                </span>
              </div>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-3">
              {chat.status === "processed" && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Processed
                </span>
              )}
              {chat.insights_unlocked && (
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Insights Unlocked
                </span>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this chat?")) {
                  // Handle delete
                }
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
