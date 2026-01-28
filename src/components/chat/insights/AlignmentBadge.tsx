"use client";

interface AlignmentBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export default function AlignmentBadge({
  status,
  size = "md",
}: AlignmentBadgeProps) {
  if (!status) {
    return null;
  }
  const normalized = status?.toLowerCase().replace(/_/g, " ");

  const getConfig = () => {
    if (
      normalized.includes("strongly aligned") ||
      normalized.includes("fully")
    ) {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        icon: "🎯",
      };
    }
    if (normalized.includes("mostly aligned") || normalized.includes("well")) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        icon: "✓",
      };
    }
    if (normalized.includes("somewhat") || normalized.includes("partial")) {
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-300",
        icon: "⚡",
      };
    }
    return {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: "❓",
    };
  };

  const config = getConfig();
  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";

  // Format display text: replace underscores with spaces and capitalize
  const displayText = status.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
    >
      <span>{config.icon}</span>
      <span className="capitalize">{displayText}</span>
    </span>
  );
}
