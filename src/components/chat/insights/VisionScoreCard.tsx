"use client";

interface VisionScoreCardProps {
  score: number;
  visionStatus: string;
  summary: string;
}

export default function VisionScoreCard({
  score,
  visionStatus,
  summary,
}: VisionScoreCardProps) {
  const percentage = (score / 10) * 100;

  return (
    <div className="bg-linear-to-br from-white via-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 border-2 border-purple-100">
      <div className="flex flex-col items-center">
        {/* Score circle */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            <defs>
              <linearGradient
                id="vision-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  className="text-purple-500"
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
              className="text-purple-200"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="url(#vision-gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl mb-1">🌟</span>
            <span className="text-4xl md:text-5xl font-bold text-purple-600">
              {score}
            </span>
            <span className="text-xs text-gray-500">out of 10</span>
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-4">
          <p className="text-xs text-gray-600 mb-2">Shared Vision Alignment</p>
          <span className="text-lg font-bold text-gray-900 capitalize">
            {visionStatus}
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
