"use client";

import { useState } from "react";
import { RefreshCw, Loader2 } from "lucide-react";

interface RetryInsightButtonProps {
  insightId: string;
  onRetry: (insightId: string) => Promise<void>;
}

export default function RetryInsightButton({
  insightId,
  onRetry,
}: RetryInsightButtonProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await onRetry(insightId);
    } catch (error) {
      console.error("Retry failed:", error);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <button
      onClick={handleRetry}
      disabled={isRetrying}
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {isRetrying ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Retrying...</span>
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4" />
          <span>Retry Generation</span>
        </>
      )}
    </button>
  );
}
