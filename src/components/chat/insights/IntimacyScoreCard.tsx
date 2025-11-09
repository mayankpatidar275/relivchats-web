"use client";

interface IntimacyScoreCardProps {
  score: number;
  rating: string; // Changed from strict enum
  summary: string;
}

export default function IntimacyScoreCard({
  score,
  rating,
  summary,
}: IntimacyScoreCardProps) {
  const percentage = (score / 10) * 100;

  const normalizedRating = rating.toLowerCase().replace(/[_\s]/g, "");

  const getRatingConfig = () => {
    if (
      normalizedRating.includes("deeply") ||
      normalizedRating.includes("deep")
    ) {
      return {
        color: "text-pink-600",
        bgColor: "bg-pink-100",
        borderColor: "border-pink-500",
        gradient: "from-pink-500 to-rose-500",
        icon: "💕",
        label: "Deeply Connected",
      };
    }
    if (
      normalizedRating.includes("well") ||
      normalizedRating.includes("strong")
    ) {
      return {
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-500",
        gradient: "from-purple-500 to-pink-500",
        icon: "💜",
        label: "Well Connected",
      };
    }
    if (
      normalizedRating.includes("developing") ||
      normalizedRating.includes("growing")
    ) {
      return {
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-500",
        gradient: "from-blue-500 to-cyan-500",
        icon: "💙",
        label: "Developing",
      };
    }
    // Default to surface level
    return {
      color: "text-gray-600",
      bgColor: "bg-gray-100",
      borderColor: "border-gray-500",
      gradient: "from-gray-500 to-gray-400",
      icon: "🤍",
      label: "Surface Level",
    };
  };

  const config = getRatingConfig();

  return (
    <div className="bg-linear-to-br from-white via-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 border-2 border-pink-100">
      <div className="flex flex-col items-center">
        {/* Score circle - keep as is */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <defs>
              <linearGradient
                id="intimacy-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  className="text-pink-500"
                  style={{ stopColor: "currentColor" }}
                />
                <stop
                  offset="100%"
                  className="text-purple-500"
                  style={{ stopColor: "currentColor" }}
                />
              </linearGradient>
            </defs>
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-pink-200"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="url(#intimacy-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">{config.icon}</span>
            <span className={`text-4xl md:text-5xl font-bold ${config.color}`}>
              {score}
            </span>
            <span className="text-xs text-gray-500">out of 10</span>
          </div>
        </div>

        {/* Rating badge */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-600 mb-2">Emotional Intimacy Level</p>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${config.bgColor} ${config.color} border-2 ${config.borderColor}`}
          >
            <span>{config.icon}</span>
            <span>{config.label}</span>
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center">
          {summary}
        </p>
      </div>
    </div>
  );
}
