"use client";

interface FrequencyIndicatorProps {
  frequency: string;
  // | "very_frequent"
  // | "frequent"
  // | "moderate"
  // | "occasional"
  // | "rare"
  // | "absent";
  label?: string;
}

export default function FrequencyIndicator({
  frequency,
  label = "Frequency",
}: FrequencyIndicatorProps) {
  //   const configs = {
  //     very_frequent: { bars: 5, color: "bg-green-500", text: "Very Frequent" },
  //     frequent: { bars: 4, color: "bg-green-400", text: "Frequent" },
  //     moderate: { bars: 3, color: "bg-blue-400", text: "Moderate" },
  //     occasional: { bars: 2, color: "bg-amber-400", text: "Occasional" },
  //     rare: { bars: 1, color: "bg-orange-400", text: "Rare" },
  //     absent: { bars: 0, color: "bg-gray-300", text: "Absent" },
  //   };

  //   const config = configs[frequency];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-600">{label}</span>
        <span className="text-xs font-semibold text-gray-900">{frequency}</span>
      </div>
      {/* <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((bar) => (
          <div
            key={bar}
            className={`h-2 flex-1 rounded-full ${
              bar <= config.bars ? config.color : "bg-gray-200"
            } transition-all duration-300`}
          />
        ))}
      </div> */}
    </div>
  );
}
