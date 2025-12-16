"use client";

import { useEffect, useRef } from "react";
import { Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import confetti from "canvas-confetti";

interface InsightProgressItem {
  id: string;
  display_title: string;
  icon?: string;
  status: "pending" | "generating" | "completed" | "failed";
}

interface InsightGenerationProgressProps {
  insights: InsightProgressItem[];
  totalRequested: number;
  totalCompleted: number;
  totalFailed: number;
  generationStatus: "queued" | "generating" | "completed" | "failed";
  completedAt?: string;
}

export default function InsightGenerationProgress({
  insights,
  totalRequested,
  totalCompleted,
  totalFailed,
  generationStatus,
  completedAt,
}: InsightGenerationProgressProps) {
  const percentage = (totalCompleted / totalRequested) * 100;
  const inProgress = totalRequested - totalCompleted - totalFailed;
  const prevCompletedRef = useRef(totalCompleted);

  // Determine overall state
  const isGenerating = generationStatus === "generating" || generationStatus === "queued";
  const isCompleted = generationStatus === "completed";
  const isFailed = generationStatus === "failed";

  // Fire confetti when all insights complete
  useEffect(() => {
    if (
      totalCompleted === totalRequested &&
      totalCompleted > 0 &&
      prevCompletedRef.current < totalCompleted &&
      isCompleted
    ) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    prevCompletedRef.current = totalCompleted;
  }, [totalCompleted, totalRequested, isCompleted]);

  return (
    <div className={`rounded-2xl p-6 md:p-8 border-2 ${
      isFailed
        ? "bg-linear-to-br from-red-50 to-orange-50 border-red-200"
        : isCompleted
        ? "bg-linear-to-br from-green-50 to-emerald-50 border-green-200"
        : "bg-linear-to-br from-blue-50 to-purple-50 border-blue-200"
    }`}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-3">
          {isGenerating && <Loader2 className="w-6 h-6 animate-spin text-blue-600" />}
          {isCompleted && <CheckCircle2 className="w-6 h-6 text-green-600" />}
          {isFailed && <XCircle className="w-6 h-6 text-red-600" />}
          <h3 className="text-xl md:text-2xl font-bold text-gray-900">
            {isGenerating && "Analyzing Your Relationship..."}
            {isCompleted && "Analysis Complete!"}
            {isFailed && "Generation Encountered Issues"}
          </h3>
        </div>
        <p className="text-sm text-gray-600">
          {isGenerating && "Our AI is diving deep into your conversations. This usually takes 1-2 minutes."}
          {isCompleted && completedAt && `Completed on ${new Date(completedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
          {isFailed && "Some insights could not be generated. See details below."}
        </p>
      </div>

      {/* Progress bar (only show when generating) */}
      {isGenerating && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              {totalCompleted} of {totalRequested} insights complete
            </span>
            <span className="text-sm font-bold text-blue-600">
              {Math.round(percentage)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-gray-600">
              Completed
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600">{totalCompleted}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-gray-600">
              In Progress
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
        </div>

        <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs font-semibold text-gray-600">Failed</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{totalFailed}</p>
        </div>
      </div>

      {/* Insight list */}
      <div className="space-y-2">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
              insight.status === "completed"
                ? "bg-green-50 border-green-200"
                : insight.status === "failed"
                ? "bg-red-50 border-red-200"
                : insight.status === "generating"
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xl shrink-0">
              {insight.icon}
            </div>

            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {insight.display_title}
              </p>
            </div>

            {/* Status */}
            {insight.status === "completed" && (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            )}
            {insight.status === "failed" && (
              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            {insight.status === "generating" && (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600 shrink-0" />
            )}
            {insight.status === "pending" && (
              <Clock className="w-5 h-5 text-gray-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Tips while waiting (only when generating) */}
      {isGenerating && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
          <p className="text-xs font-semibold text-purple-700 uppercase mb-2">
            💡 While You Wait
          </p>
          <p className="text-sm text-gray-700">
            Our AI is analyzing conversation patterns, emotional depth,
            communication styles, and relationship dynamics. We&apos;re reading
            between the lines to give you insights you&apos;ve never seen before!
          </p>
        </div>
      )}

      {/* Error message and support info (only when failed) */}
      {isFailed && totalFailed > 0 && (
        <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-300">
          <p className="text-sm font-semibold text-red-900 mb-2">
            ⚠️ What happened?
          </p>
          <p className="text-sm text-red-800">
            {totalFailed} insight{totalFailed > 1 ? "s" : ""} failed to generate due to a technical issue.
            {totalCompleted > 0 && ` However, ${totalCompleted} insight${totalCompleted > 1 ? "s" : ""} completed successfully and are available below.`}
            {" "}Please contact support if this issue persists.
          </p>
        </div>
      )}

      {/* Success message (only when completed) */}
      {isCompleted && totalCompleted > 0 && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-300">
          <p className="text-sm font-semibold text-green-900 mb-2">
            ✅ Success!
          </p>
          <p className="text-sm text-green-800">
            All {totalCompleted} insights have been generated successfully. Scroll down to explore your personalized relationship analysis.
          </p>
        </div>
      )}
    </div>
  );
}
