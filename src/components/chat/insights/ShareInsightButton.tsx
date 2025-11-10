"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareInsightButtonProps {
  insightTitle: string;
  chatId: string;
}

export default function ShareInsightButton({
  insightTitle,
  chatId,
}: ShareInsightButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/share/${chatId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${insightTitle} - RelivChats`,
          text: "Check out my relationship insights!",
          url: shareUrl,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share Insight</span>
        </>
      )}
    </button>
  );
}
