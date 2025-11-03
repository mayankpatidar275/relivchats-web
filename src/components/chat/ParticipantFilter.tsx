"use client";

import { Users, Scale } from "lucide-react";

export type ParticipantMode = "all" | "compare" | string; // string for participant names

interface ParticipantFilterProps {
  participants: string[];
  selectedMode: ParticipantMode;
  onModeChange: (mode: ParticipantMode) => void;
}

export default function ParticipantFilter({
  participants,
  selectedMode,
  onModeChange,
}: ParticipantFilterProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (mode: ParticipantMode) => selectedMode === mode;

  return (
    <div className="sticky top-[60px] z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
          {/* All button */}
          <button
            onClick={() => onModeChange("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
              isActive("all")
                ? "bg-purple-100 text-purple-700 border-2 border-purple-300"
                : "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
            }`}
          >
            <Users className="w-4 h-4" />
            All
          </button>

          {/* Individual participants */}
          {participants.map((participant) => (
            <button
              key={participant}
              onClick={() => onModeChange(participant)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                isActive(participant)
                  ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
              }`}
            >
              <div className="w-5 h-5 bg-linear-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                {getInitials(participant)}
              </div>
              <span className="max-w-[120px] truncate">{participant}</span>
            </button>
          ))}

          {/* Compare button (only show if 2 participants) */}
          {participants.length === 2 && (
            <button
              onClick={() => onModeChange("compare")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                isActive("compare")
                  ? "bg-green-100 text-green-700 border-2 border-green-300"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300"
              }`}
            >
              <Scale className="w-4 h-4" />
              Compare
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
