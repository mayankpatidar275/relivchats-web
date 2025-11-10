"use client";

interface MaturityScoreCardProps {
  score: number;
  maturityLevel: string;
  summary: string;
}

export default function MaturityScoreCard({
  score,
  maturityLevel,
  summary,
}: MaturityScoreCardProps) {
  const percentage = (score / 10) * 100;
  const normalizedLevel = maturityLevel.toLowerCase();

  const getConfig = () => {
    if (
      normalizedLevel.includes("high") ||
      normalizedLevel.includes("mature")
    ) {
      return {
        color: "text-green-600",
        gradient: "from-green-500 to-emerald-500",
        icon: "🌟",
        label: "Highly Mature",
      };
    }
    if (
      normalizedLevel.includes("developing") ||
      normalizedLevel.includes("growing")
    ) {
      return {
        color: "text-blue-600",
        gradient: "from-blue-500 to-cyan-500",
        icon: "🌱",
        label: "Developing",
      };
    }
    return {
      color: "text-amber-600",
      gradient: "from-amber-500 to-orange-500",
      icon: "⚡",
      label: "Needs Work",
    };
  };

  const config = getConfig();

  return (
    <div className="bg-linear-to-br from-white via-green-50 to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-green-100">
      <div className="flex flex-col items-center">
        {/* Score circle */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <defs>
              <linearGradient
                id="maturity-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  className="text-green-500"
                  style={{ stopColor: "currentColor" }}
                />
                <stop
                  offset="100%"
                  className="text-blue-500"
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
              className="text-gray-200"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="url(#maturity-gradient)"
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

        {/* Label */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-600 mb-2">Conflict Maturity Level</p>
          <span className="text-lg font-bold text-gray-900">
            {config.label}
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
