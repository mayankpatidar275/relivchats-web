"use client";

import { Target, Users, MessageCircle, Sparkles } from "lucide-react";
import { useCategoryTheme } from "@/src/lib/theme";

interface GrowthOpportunityCardProps {
  opportunity: {
    opportunity_title: string;
    target_participants: string[];
    suggestion: string;
    why_it_helps: string;
    conversation_starter: string;
  };
  categorySlug?: string;
}

export default function GrowthOpportunityCard({
  opportunity,
  categorySlug,
}: GrowthOpportunityCardProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div
      className={`p-4 md:p-5 rounded-xl border-2 ${
        theme.bg
      } ${theme.text.replace("text-", "border-")} bg-opacity-10`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${theme.bg} flex items-center justify-center shrink-0`}
        >
          <Target className={`w-5 h-5 md:w-6 md:h-6 ${theme.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
            {opportunity.opportunity_title}
          </h5>
          {/* Target participants */}
          <div className="flex items-center gap-2 flex-wrap">
            <Users className="w-3 h-3 text-gray-500" />
            {opportunity.target_participants.map((participant, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-700 border border-gray-200"
              >
                {participant}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-4">
        {/* Suggestion */}
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-gray-700 uppercase">
              Suggestion
            </p>
          </div>
          <p className="text-sm text-gray-800 leading-relaxed">
            {opportunity.suggestion}
          </p>
        </div>

        {/* Why it helps */}
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
            💡 Why This Helps
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {opportunity.why_it_helps}
          </p>
        </div>

        {/* Conversation starter */}
        <div className="p-4 bg-linear-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
          <div className="flex items-start gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-pink-700 uppercase">
              Try Saying
            </p>
          </div>
          <p className="text-sm italic text-gray-800 leading-relaxed">
            &quot;{opportunity.conversation_starter}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
