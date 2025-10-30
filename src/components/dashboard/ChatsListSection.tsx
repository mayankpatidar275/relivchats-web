"use client";

import { useChats, useDeleteChat } from "@/src/features/chats/api";
import { formatDate } from "@/src/lib/utils";
import {
  MessageCircle,
  Calendar,
  Users,
  Trash2,
  Eye,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatsListSection() {
  const router = useRouter();
  const { data: chats, isLoading } = useChats();
  const deleteMutation = useDeleteChat();

  const handleDelete = async (chatId: string, filename: string) => {
    if (confirm(`Are you sure you want to delete "${filename}"?`)) {
      try {
        await deleteMutation.mutateAsync(chatId);
      } catch {
        alert("Failed to delete chat");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Category color mapping
  const colorMap: Record<
    string,
    { text: string; bg: string; gradient: string }
  > = {
    romantic: {
      text: "text-pink-600",
      bg: "bg-pink-50",
      gradient: "from-pink-500 to-rose-500",
    },
    friendship: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      gradient: "from-blue-500 to-cyan-500",
    },
    family: {
      text: "text-green-600",
      bg: "bg-green-50",
      gradient: "from-green-500 to-emerald-500",
    },
    work: {
      text: "text-purple-600",
      bg: "bg-purple-50",
      gradient: "from-purple-500 to-indigo-500",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Your Chats</h2>
          <p className="text-gray-600 mt-1">
            {chats?.length || 0} chat{chats?.length !== 1 ? "s" : ""} analyzed
          </p>
        </div>
      </div>

      {/* Chats list */}
      {!chats || chats.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-gray-100 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No chats yet
          </h3>
          <p className="text-gray-600 mb-6">
            Upload your first chat to get started with AI-powered insights
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-3 bg-linear-to-r from-primary to-[--color-primary-hover] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Choose Category & Upload
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const colors = chat.category_slug
              ? colorMap[chat.category_slug]
              : {
                  text: "text-gray-600",
                  bg: "bg-gray-50",
                  gradient: "from-gray-400 to-gray-600",
                };

            return (
              <div
                key={chat.user_id}
                className="bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all p-6 group"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Chat info */}
                  <div className="flex-1 min-w-0">
                    {/* Category badge */}
                    {chat.category_name && (
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                          colors.bg
                        } border ${colors.text.replace(
                          "text-",
                          "border-"
                        )} mb-3`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-linear-to-r ${colors.gradient}`}
                        />
                        <span
                          className={`text-xs font-semibold ${colors.text}`}
                        >
                          {chat.category_name}
                        </span>
                      </div>
                    )}

                    {/* Filename */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 truncate">
                      {chat.filename}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 flex-wrap text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(chat.created_at)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>{chat.participants.length} participants</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        <span>
                          {chat.chat_metadata.total_messages.toLocaleString()}{" "}
                          messages
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2 mt-3">
                      {chat.status === "processed" && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Processed
                        </span>
                      )}
                      {chat.insights_unlocked ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Insights Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                          <Lock className="w-3 h-3" />
                          Free Stats Only
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => router.push(`/chat/${chat.chat_id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-[--color-primary-hover] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(chat.chat_id, chat.filename)}
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
