"use client";

import { useCategoryTheme } from "@/src/lib/theme";

interface Message {
  message: string;
  speaker: string;
  timestamp: string;
}

interface ConversationExchangeProps {
  context: string;
  exchange: Message[];
  categorySlug?: string;
}

export default function ConversationExchange({
  context,
  exchange,
  categorySlug,
}: ConversationExchangeProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 p-4 md:p-5">
      {/* Context header */}
      <div className="flex items-start gap-2 mb-4 pb-3 border-b border-gray-200">
        <span className="text-lg">💬</span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">
            Context
          </p>
          <p className="text-sm text-gray-800 font-medium">{context}</p>
        </div>
      </div>

      {/* Message exchange */}
      <div className="space-y-3">
        {exchange.map((msg, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* Speaker initial */}
            <div
              className={`w-8 h-8 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}
            >
              {msg.speaker[0]}
            </div>

            {/* Message bubble */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-900 truncate">
                  {msg.speaker}
                </span>
                <span className="text-xs text-gray-500 shrink-0">
                  {msg.timestamp}
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg rounded-tl-none p-3 border border-gray-200">
                <p className="text-sm text-gray-800 leading-relaxed wrap-break-word">
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
