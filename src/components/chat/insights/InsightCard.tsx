"use client";

import { useCategoryTheme } from "@/src/lib/theme";
import InsightStatusBadge from "./InsightStatusBadge";
// import ShareInsightButton from "./ShareInsightButton";

interface InsightCardProps {
  icon: string | undefined;
  title: string;
  description?: string;
  status: "generating" | "completed" | "failed" | "pending";
  errorMessage?: string;
  children: React.ReactNode;
  categorySlug?: string;
}

export default function InsightCard({
  icon,
  title,
  description,
  status,
  errorMessage,
  children,
  categorySlug,
}: InsightCardProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 md:p-6 lg:p-8 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
        <div
          className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-linear-to-br ${theme.gradient} flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shrink-0`}
        >
          {icon || "💡"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-xs md:text-sm lg:text-base text-gray-600 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        {/* {status === "completed" && (
          <ShareInsightButton
            insightTitle={title}
            chatId={chatId} // Pass as prop
          />
        )} */}
      </div>

      {/* Status badge */}
      <InsightStatusBadge status={status} errorMessage={errorMessage} />

      {/* Content */}
      {status === "completed" && <div className="mt-6">{children}</div>}
    </div>
  );
}
