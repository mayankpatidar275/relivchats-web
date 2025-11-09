"use client";

interface LoveLanguageBadgeProps {
  language: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export default function LoveLanguageBadge({
  language,
  size = "md",
  showIcon = true,
}: LoveLanguageBadgeProps) {
  const normalizedLanguage = language.toLowerCase();

  const getConfig = () => {
    if (
      normalizedLanguage.includes("words") ||
      normalizedLanguage.includes("affirmation")
    ) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
        icon: "💬",
        label: "Words of Affirmation",
      };
    }
    if (
      normalizedLanguage.includes("acts") ||
      normalizedLanguage.includes("service")
    ) {
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-300",
        icon: "🤝",
        label: "Acts of Service",
      };
    }
    if (
      normalizedLanguage.includes("quality") ||
      normalizedLanguage.includes("time")
    ) {
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-300",
        icon: "⏰",
        label: "Quality Time",
      };
    }
    if (normalizedLanguage.includes("gift")) {
      return {
        bg: "bg-pink-100",
        text: "text-pink-700",
        border: "border-pink-300",
        icon: "🎁",
        label: "Receiving Gifts",
      };
    }
    if (
      normalizedLanguage.includes("physical") ||
      normalizedLanguage.includes("touch")
    ) {
      return {
        bg: "bg-rose-100",
        text: "text-rose-700",
        border: "border-rose-300",
        icon: "🤗",
        label: "Physical Touch",
      };
    }
    // Fallback
    return {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: "💝",
      label: language,
    };
  };

  const config = getConfig();

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.bg} ${config.text} ${config.border} ${sizeClasses[size]}`}
    >
      {showIcon && <span>{config.icon}</span>}
      <span>{config.label}</span>
    </span>
  );
}
