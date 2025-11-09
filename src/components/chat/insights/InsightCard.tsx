"use client";

import { useCategoryTheme } from "@/src/lib/theme";
import InsightStatusBadge from "./InsightStatusBadge";

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
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-linear-to-br ${theme.gradient} flex items-center justify-center text-3xl md:text-4xl shrink-0`}
        >
          {icon || "💡"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm md:text-base text-gray-600">{description}</p>
          )}
        </div>
      </div>

      {/* Status badge */}
      <InsightStatusBadge status={status} errorMessage={errorMessage} />

      {/* Content */}
      {status === "completed" && <div className="mt-6">{children}</div>}
    </div>
  );
}
