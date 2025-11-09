"use client";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";

interface InsightStatusBadgeProps {
  status: "generating" | "completed" | "failed" | "pending";
  errorMessage?: string;
}

export default function InsightStatusBadge({
  status,
  errorMessage,
}: InsightStatusBadgeProps) {
  if (status === "generating") {
    return (
      <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-xl mb-6">
        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          Generating insight...
        </span>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-6">
        <div className="flex items-center gap-2 mb-2">
          <XCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm font-semibold text-red-700">
            Generation Failed
          </span>
        </div>
        {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}
        <button className="mt-3 text-xs font-medium text-red-700 hover:text-red-800 underline">
          Retry Generation
        </button>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-6">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-green-700">
          Analysis Complete
        </span>
      </div>
    );
  }

  return null;
}
