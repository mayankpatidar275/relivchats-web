"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import EvidencePanel from "./EvidencePanel";
import { EvidenceItem } from "@/src/features/insights/types";

interface CategoryDiscussionCardProps {
  category: string;
  discussed: boolean;
  summary: string;
  evidence?: EvidenceItem[];
  categorySlug?: string;
}

export default function CategoryDiscussionCard({
  category,
  discussed,
  summary,
  evidence,
  categorySlug,
}: CategoryDiscussionCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        discussed
          ? "bg-green-50 border-green-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3 mb-2">
        {discussed ? (
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        )}
        <div className="flex-1 min-w-0">
          <h5 className="font-semibold text-sm md:text-base text-gray-900 mb-1">
            {category}
          </h5>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {summary}
          </p>
        </div>
      </div>

      {evidence && evidence.length > 0 && (
        <div className="mt-3">
          <EvidencePanel evidence={evidence} categorySlug={categorySlug} />
        </div>
      )}
    </div>
  );
}
