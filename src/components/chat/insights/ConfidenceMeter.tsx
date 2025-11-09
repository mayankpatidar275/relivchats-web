"use client";

interface ConfidenceMeterProps {
  confidence: string;
  label?: string;
}

export default function ConfidenceMeter({
  confidence,
  label = "Confidence",
}: ConfidenceMeterProps) {
  const normalizedConfidence = confidence.toLowerCase();

  const getPercentage = () => {
    if (normalizedConfidence.includes("high")) return 85;
    if (
      normalizedConfidence.includes("medium") ||
      normalizedConfidence.includes("moderate")
    )
      return 60;
    if (normalizedConfidence.includes("low")) return 35;
    return 50;
  };

  const percentage = getPercentage();
  const color =
    percentage >= 70
      ? "bg-green-500"
      : percentage >= 50
      ? "bg-blue-500"
      : "bg-amber-500";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-semibold text-gray-900 capitalize">
          {confidence}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
