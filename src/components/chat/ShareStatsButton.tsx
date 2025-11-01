"use client";

import { useState } from "react";
import { Share2, Copy, Check, Download, X } from "lucide-react";
import { Chat } from "@/src/features/chats/types";

interface ShareStatsButtonProps {
  chat: Chat;
}

export default function ShareStatsButton({ chat }: ShareStatsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/share/${chat.chat_id}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${chat.filename} - Chat Stats`,
          text: `Check out my chat statistics: ${chat.chat_metadata.total_messages} messages over ${chat.chat_metadata.total_days} days!`,
          url: shareUrl,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      setIsOpen(true);
    }
  };

  const handleDownloadImage = async () => {
    // TODO: Implement screenshot functionality using html2canvas
    alert("Download as image feature coming soon!");
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-primary hover:text-primary transition-all"
      >
        <Share2 className="w-4 h-4" />
        Share Stats
      </button>

      {/* Share Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Share Your Stats
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Stats Preview */}
            <div className="bg-linear-to-br from-primary/10 to-accent-pink/10 rounded-2xl p-6 mb-6 text-center border border-primary/20">
              <div className="text-5xl mb-2">💬</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {chat.chat_metadata.total_messages.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mb-3">
                messages analyzed
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>{chat.participants.length} participants</span>
                <span>•</span>
                <span>{chat.chat_metadata.total_days} days</span>
              </div>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {copied ? "Copied!" : "Copy Link"}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {shareUrl}
                    </div>
                  </div>
                </div>
              </button>

              {/* Download as Image */}
              <button
                onClick={handleDownloadImage}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600 group-hover:text-primary" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      Download as Image
                    </div>
                    <div className="text-xs text-gray-500">
                      Share on social media
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* Privacy Note */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                🔒 <strong>Privacy:</strong> Only basic statistics are shared.
                Message content remains private.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
