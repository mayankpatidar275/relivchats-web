"use client";

import { useCategoryTheme } from "@/src/lib/theme";

interface MessageQuoteProps {
  message: string;
  speaker: string;
  timestamp: string;
  context?: string;
  categorySlug?: string;
}

export default function MessageQuote({
  message,
  speaker,
  timestamp,
  context,
  categorySlug,
}: MessageQuoteProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
      {/* Header with speaker and time */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-semibold ${theme.bg} ${theme.text}`}
        >
          {speaker}
        </span>
        <span className="text-xs text-gray-500 shrink-0">{timestamp}</span>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-800 leading-relaxed mb-2 wrap-break-word">
        {message}
      </p>

      {/* Context tag if present */}
      {context && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="opacity-50">💡</span>
          <span className="italic">{context}</span>
        </div>
      )}
    </div>
  );
}
