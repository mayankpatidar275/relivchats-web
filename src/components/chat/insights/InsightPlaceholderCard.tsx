"use client";

import { useCategoryTheme } from "@/src/lib/theme";
import { Loader2, Clock, AlertCircle } from "lucide-react";

interface InsightPlaceholderCardProps {
  icon: string | undefined;
  title: string;
  description?: string;
  status: "generating" | "pending" | "failed";
  categorySlug?: string;
}

export default function InsightPlaceholderCard({
  icon,
  title,
  description,
  status,
  categorySlug,
}: InsightPlaceholderCardProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className={`bg-white rounded-2xl border-2 ${status === "failed" ? "border-red-200" : "border-blue-200"} p-4 md:p-6 lg:p-8 relative overflow-hidden`}>
      {/* Animated gradient background */}
      {status !== "failed" && (
        <div className="absolute inset-0 bg-linear-to-r from-blue-50 via-purple-50 to-blue-50 opacity-50 animate-pulse" />
      )}

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          <div
            className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-linear-to-br ${theme.gradient} flex items-center justify-center text-2xl md:text-3xl lg:text-4xl shrink-0 ${status === "failed" ? "opacity-30" : "opacity-50"}`}
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
        </div>

        {/* Status indicator */}
        <div className={`flex items-center gap-3 p-4 rounded-xl ${
          status === "failed"
            ? "bg-red-50 border-2 border-red-200"
            : "bg-blue-50 border-2 border-blue-200"
        }`}>
          {status === "generating" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-blue-900">
                  Generating insights...
                </p>
                <p className="text-xs text-blue-700">
                  Our AI is analyzing your conversation patterns
                </p>
              </div>
            </>
          ) : status === "pending" ? (
            <>
              <Clock className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Queued for analysis
                </p>
                <p className="text-xs text-gray-600">
                  This insight will start generating shortly
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900">
                  Generation failed
                </p>
                <p className="text-xs text-red-700">
                  This insight could not be generated. Please contact support.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Skeleton content preview (only for generating/pending) */}
        {status !== "failed" && (
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="h-24 bg-gray-100 rounded-xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-20 bg-gray-100 rounded-xl" />
              <div className="h-20 bg-gray-100 rounded-xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
