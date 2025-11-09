"use client";

export default function InsightSkeleton() {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 md:p-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-32 bg-gray-100 rounded-xl" />
        <div className="h-24 bg-gray-100 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-20 bg-gray-100 rounded-xl" />
          <div className="h-20 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
