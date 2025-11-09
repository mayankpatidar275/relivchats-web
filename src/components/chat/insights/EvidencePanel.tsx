"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import MessageQuote from "./MessageQuote";
import { EvidenceItem } from "@/src/features/insights/types";

interface EvidencePanelProps {
  evidence: EvidenceItem[];
  categorySlug?: string;
  defaultExpanded?: boolean;
}

export default function EvidencePanel({
  evidence,
  categorySlug,
  defaultExpanded = false,
}: EvidencePanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!evidence || evidence.length === 0) return null;

  return (
    <div className="mt-4">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-3"
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        <span>
          {isExpanded ? "Hide" : "Show"} Evidence ({evidence.length} messages)
        </span>
      </button>

      {/* Evidence grid */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in duration-300">
          {evidence.map((item, idx) => (
            <MessageQuote
              key={idx}
              message={item.message}
              speaker={item.speaker}
              timestamp={item.timestamp}
              context={item.context}
              categorySlug={categorySlug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
