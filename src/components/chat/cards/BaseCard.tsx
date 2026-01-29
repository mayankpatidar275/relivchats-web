import React from "react";

interface BaseCardProps {
  children: React.ReactNode;
  pattern?: "dots" | "grid" | "waves" | "diagonal" | "circles";
  bgColor?: string;
  textColor?: string;
}

export default function BaseCard({
  children,
  pattern = "dots",
  bgColor = "bg-purple-600",
  textColor = "text-white",
}: BaseCardProps) {
  // Pattern SVG definitions
  const patterns = {
    dots: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    ),
    grid: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern
            id="grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    ),
    waves: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern
            id="waves"
            x="0"
            y="0"
            width="40"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 10 Q10 0, 20 10 T40 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)" />
      </svg>
    ),
    diagonal: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern
            id="diagonal"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 0 20 L 20 0" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonal)" />
      </svg>
    ),
    circles: (
      <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
        <defs>
          <pattern
            id="circles"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="15"
              cy="15"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    ),
  };

  return (
    <div
      className={`relative w-full aspect-9/16 rounded-2xl overflow-hidden ${bgColor} ${textColor} shadow-lg`}
      style={{
        width: "100%",
        maxWidth: "200px",
      }}
    >
      {/* Background pattern */}
      {patterns[pattern]}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-4">{children}</div>

      {/* Watermark */}
      <div className="absolute bottom-2 left-0 right-0 text-center z-20">
        <p className="text-white/50 text-[7px] font-medium tracking-wide">
          RELIVCHATS.COM
        </p>
      </div>
    </div>
  );
}
