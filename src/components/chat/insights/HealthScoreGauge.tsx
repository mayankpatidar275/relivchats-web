"use client";

interface HealthScoreGaugeProps {
  score: number; // 0-10
  rating: "excellent" | "good" | "needs_improvement";
  label?: string;
}

export default function HealthScoreGauge({
  score,
  rating,
  label = "Communication Health",
}: HealthScoreGaugeProps) {
  const percentage = (score / 10) * 100;

  const getRatingConfig = () => {
    switch (rating) {
      case "excellent":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          borderColor: "border-green-500",
          gradient: "from-green-500 to-emerald-500",
        };
      case "good":
        return {
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          borderColor: "border-blue-500",
          gradient: "from-blue-500 to-cyan-500",
        };
      case "needs_improvement":
        return {
          color: "text-amber-600",
          bgColor: "bg-amber-100",
          borderColor: "border-amber-500",
          gradient: "from-amber-500 to-orange-500",
        };
    }
  };

  const config = getRatingConfig();

  return (
    <div className="flex flex-col items-center">
      {/* Circular gauge */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
        {/* Background circle */}
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <defs>
            <linearGradient
              id={`gradient-${rating}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                className={
                  rating === "excellent"
                    ? "text-green-500"
                    : rating === "good"
                    ? "text-blue-500"
                    : "text-amber-500"
                }
                style={{ stopColor: "currentColor" }}
              />
              <stop
                offset="100%"
                className={
                  rating === "excellent"
                    ? "text-emerald-500"
                    : rating === "good"
                    ? "text-cyan-500"
                    : "text-orange-500"
                }
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
            stroke={`url(#gradient-${rating})`}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.83} 283`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl md:text-5xl font-bold ${config.color}`}>
            {score}
          </span>
          <span className="text-xs text-gray-500">out of 10</span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">{label}</p>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.color} border ${config.borderColor}`}
        >
          {rating.replace("_", " ").toUpperCase()}
        </span>
      </div>
    </div>
  );
}
