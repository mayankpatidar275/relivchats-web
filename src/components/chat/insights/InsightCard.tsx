"use client";

import { useState } from "react";
import { useCategoryTheme } from "@/src/lib/theme";
import { ChevronDown } from "lucide-react";
// import InsightStatusBadge from "./InsightStatusBadge";
// import ShareInsightButton from "./ShareInsightButton";

interface InsightCardProps {
  icon: string | undefined;
  title: string;
  description?: string;
  status: "generating" | "completed" | "failed" | "pending";
  errorMessage?: string;
  children: React.ReactNode;
  categorySlug?: string;
  defaultExpanded?: boolean;
}

export default function InsightCard({
  icon,
  title,
  description,
  status,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errorMessage,
  children,
  categorySlug,
  defaultExpanded = false,
}: InsightCardProps) {
  const theme = useCategoryTheme(categorySlug);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 hover:shadow-xl transition-all duration-300 min-w-0">
      {/* Clickable Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-3 md:gap-4 p-4 md:p-6 lg:p-8 text-left hover:bg-gray-50 transition-colors rounded-t-2xl min-w-0"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse ${title}` : `Expand ${title}`}
      >
        <div
          className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-linear-to-br ${theme.gradient} flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shrink-0`}
        >
          {icon || "💡"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2 wrap-break-word">
            {title}
          </h3>
          {description && (
            <p className="text-xs md:text-sm lg:text-base text-gray-600 wrap-break-word">
              {description}
            </p>
          )}
          {!isExpanded && (
            <p className="text-xs md:text-sm text-blue-600 font-medium mt-2">
              Click to view detailed analysis →
            </p>
          )}
        </div>
        {/* Chevron indicator */}
        <ChevronDown
          className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 shrink-0 transition-transform duration-300 mt-1 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Collapsible Content */}
      {isExpanded && status === "completed" && (
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-2 min-w-0">
          {/* Divider */}
          <div className="border-t border-gray-200 mb-6" />
          <div className="min-w-0">{children}</div>
        </div>
      )}

      {/* Expand/Collapse footer hint (only when collapsed) */}
      {/* {!isExpanded && (
        <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 border-t border-gray-100 pt-4">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs font-medium">Tap to expand</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
      )} */}
    </div>
  );
}
