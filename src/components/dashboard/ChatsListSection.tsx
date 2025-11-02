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
  Eye,
  Lock,
  CheckCircle,
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
          <p className="text-sm">
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

  const handleChooseAndUpload = () => {
    router.push("/#home-upload");
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
            onClick={handleChooseAndUpload}
            className="px-8 py-3 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Choose Category & Upload
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const colors = chat.category_slug
              ? getCategoryColors(chat.category_slug)
              : {
                  textColor: "text-gray-600",
                  lightBg: "bg-gray-50",
                  color: "from-gray-400 to-gray-600",
                  borderColor: "border-gray-600",
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
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.lightBg} border ${colors.borderColor} mb-3`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-linear-to-r ${colors.color}`}
                        />
                        <span
                          className={`text-xs font-semibold ${colors.textColor}`}
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
                      {chat.status === "completed" && (
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
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(chat.chat_id, chat.filename)}
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all"
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
