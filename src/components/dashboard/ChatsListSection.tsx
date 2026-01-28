"use client";

import { useChats, useDeleteChat } from "@/src/features/chats/api";
import { useConfirm } from "@/src/hooks/useConfirm";
import { formatDate } from "@/src/lib/utils";
import { getCategoryColors } from "@/src/features/categories/utils";
import {
  MessageCircle,
  Calendar,
  Users,
  Trash2,
  Lock,
  CheckCircle,
  // Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChatsListSection() {
  const router = useRouter();
  const { data: chats, isLoading } = useChats();
  const deleteMutation = useDeleteChat();
  const { confirm } = useConfirm();

  const handleDelete = async (chatId: string, filename: string) => {
    await confirm({
      title: "Delete Chat?",
      description: (
        <div className="space-y-2">
          <p>
            Are you sure you want to delete{" "}
            <strong>&quot;{filename}&quot;</strong>?
          </p>
          <p className="text-sm text-gray-600">
            This action cannot be undone. All messages and insights will be
            permanently deleted.
          </p>
        </div>
      ),
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: async () => {
        await deleteMutation.mutateAsync(chatId);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 animate-pulse"
          >
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Your Chats
          </h2>
          <p className="text-sm text-gray-600 mt-0.5">
            {chats?.length || 0} chat{chats?.length !== 1 ? "s" : ""} analyzed
          </p>
        </div>

        {/* Upload button - Mobile friendly */}
        {/* <button
          onClick={() => router.push("/#home-upload")}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-linear-to-r from-primary to-pink-600 text-white rounded-lg md:rounded-xl font-medium hover:shadow-lg transition-all text-sm md:text-base"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </button> */}
      </div>

      {/* Empty State */}
      {!chats || chats.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-linear-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            No chats yet
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6 max-w-md mx-auto">
            Upload your first chat to get started with AI-powered insights and
            free stats
          </p>
          <button
            onClick={() => router.push("/#home-upload")}
            className="px-6 md:px-8 py-3 bg-linear-to-r from-primary to-accent-pink text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Upload Your First Chat
          </button>
        </div>
      ) : (
        /* Chats List */
        <div className="space-y-3">
          {chats.map((chat) => {
            const colors = chat.category_slug
              ? getCategoryColors(chat.category_slug)
              : {
                  textColor: "text-gray-600",
                  lightBg: "bg-gray-50",
                  color: "from-gray-400 to-gray-600",
                  borderColor: "border-gray-300",
                };

            return (
              <div
                key={chat.chat_id}
                onClick={() => router.push(`/chat/${chat.chat_id}`)}
                className="bg-white rounded-xl md:rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all p-4 md:p-6 cursor-pointer"
              >
                {/* Mobile Layout */}
                <div className="flex flex-col gap-3">
                  {/* Top Row: Category & Actions */}
                  <div className="flex items-start justify-between gap-2">
                    {/* Category badge */}
                    {chat.category_name ? (
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${colors.lightBg} border ${colors.borderColor}`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${colors.color}`}
                        />
                        <span
                          className={`text-xs font-semibold ${colors.textColor}`}
                        >
                          {chat.category_name}
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        <span className="text-xs font-semibold text-gray-600">
                          No Category
                        </span>
                      </div>
                    )}

                    {/* Action Button - Delete only */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(chat.chat_id, chat.filename);
                      }}
                      disabled={deleteMutation.isPending}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                      aria-label="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Filename */}
                  <h3 className="text-base md:text-lg font-bold text-gray-900 truncate">
                    {chat.filename}
                  </h3>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{formatDate(chat.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{chat.participants.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>
                        {chat.chat_metadata.total_messages.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {chat.insights_unlocked ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-linear-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700 rounded-full text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Insights Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-medium">
                        <Lock className="w-3 h-3" />
                        Free Stats Only
                      </span>
                    )}
                  </div>
                </div>

                {/* Desktop Action Buttons - Hidden on mobile */}
                {/* <div className="hidden md:flex absolute top-6 right-6 gap-2">
                  <button
                    onClick={() => router.push(`/chat/${chat.chat_id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
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
                </div> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
