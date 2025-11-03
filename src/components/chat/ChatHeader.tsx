"use client";

import { useChat } from "@/src/features/chats/api";
import { ArrowLeft, Share2, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  chatId: string;
}

export default function ChatHeader({ chatId }: ChatHeaderProps) {
  const { data: chat } = useChat(chatId);
  const router = useRouter();

  if (!chat) return null;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[60px]">
          {/* Left: Back button + Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                {chat.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Users className="w-3 h-3" />
                <span>{chat.participants.length} participants</span>
              </div>
            </div>
          </div>

          {/* Right: Share button */}
          <button
            onClick={() => router.push(`/share/${chatId}`)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
