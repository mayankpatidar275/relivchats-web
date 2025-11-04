"use client";

import { Sparkles, X } from "lucide-react";
import { useState } from "react";

interface UnlockBannerProps {
  onUnlockClick: () => void;
  insightCount?: number;
  cost?: number;
}

export default function UnlockBanner({
  onUnlockClick,
  insightCount = 12,
  cost = 100,
}: UnlockBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="sticky top-[110px] z-30 bg-linear-to-r from-primary to-pink-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-full shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">
                🔓 Unlock {insightCount} AI-Powered Insights
              </p>
              <p className="text-xs text-white/80 hidden sm:block">
                Deep analysis, patterns & recommendations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onUnlockClick}
              className="px-4 py-2 bg-white text-primary rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors"
            >
              <span className="hidden sm:inline">Unlock for </span>
              {cost} coins
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
