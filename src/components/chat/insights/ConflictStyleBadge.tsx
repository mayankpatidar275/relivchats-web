"use client";

interface ConflictStyleBadgeProps {
  style: string;
  intensity: string;
  size?: "sm" | "md";
}

export default function ConflictStyleBadge({
  style,
  intensity,
  size = "md",
}: ConflictStyleBadgeProps) {
  const normalizedStyle = style.toLowerCase();

  const getConfig = () => {
    if (
      normalizedStyle.includes("collaborative") ||
      normalizedStyle.includes("cooperat")
    ) {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        icon: "🤝",
        label: "Collaborative",
      };
    }
    if (
      normalizedStyle.includes("accommodat") ||
      normalizedStyle.includes("peace")
    ) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        icon: "🕊️",
        label: "Accommodating",
      };
    }
    if (
      normalizedStyle.includes("avoidant") ||
      normalizedStyle.includes("withdraw")
    ) {
      return {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-300",
        icon: "🚪",
        label: "Avoidant",
      };
    }
    if (
      normalizedStyle.includes("competitive") ||
      normalizedStyle.includes("defensive")
    ) {
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300",
        icon: "⚔️",
        label: "Competitive",
      };
    }
    if (
      normalizedStyle.includes("passive") ||
      normalizedStyle.includes("indirect")
    ) {
      return {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-300",
        icon: "😶",
        label: "Passive-Aggressive",
      };
    }
    return {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-300",
      icon: "💭",
      label: style,
    };
  };

  const config = getConfig();
  const sizeClasses =
    size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5";

  // Intensity indicator
  const intensityColor = intensity.toLowerCase().includes("high")
    ? "bg-red-400"
    : intensity.toLowerCase().includes("moderate")
    ? "bg-yellow-400"
    : "bg-green-400";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </span>
      <div className="flex items-center gap-1">
        <div className={`w-2 h-2 rounded-full ${intensityColor}`} />
        <span className="text-xs text-gray-600 capitalize">{intensity}</span>
      </div>
    </div>
  );
}
