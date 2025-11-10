"use client";

import { CommunicationBasicsContent } from "@/src/features/insights/types";
import HealthScoreGauge from "../HealthScoreGauge";
import ParticipantComparisonTable from "../ParticipantComparisonTable";
import EvidencePanel from "../EvidencePanel";
import RecommendationCard from "../RecommendationCard";
import { useCategoryTheme } from "@/src/lib/theme";
import { MessageCircle, Zap, BarChart3, Sparkles } from "lucide-react";

interface CommunicationBasicsViewProps {
  content: CommunicationBasicsContent;
  categorySlug?: string;
}

export default function CommunicationBasicsView({
  content,
  categorySlug,
}: CommunicationBasicsViewProps) {
  const theme = useCategoryTheme(categorySlug);

  const formatSeconds = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  return (
    <div className="space-y-6">
      {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 md:p-6 border border-blue-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
            💬
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1">
              Why This Matters
            </h4>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              Balanced communication is the #1 predictor of relationship
              satisfaction. Understanding who initiates, responds, and
              contributes helps you both feel equally heard and valued.
            </p>
          </div>
        </div>
      </div> */}
      {/* 1. Hero: Overall Health Assessment */}
      <div className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 border-2 border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <HealthScoreGauge
            score={content.overall_health_assessment.score}
            rating={content.overall_health_assessment.rating}
            label="Overall Communication Health"
          />
        </div>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          {content.overall_health_assessment.summary}
        </p>
      </div>

      {/* 2. Initiation Balance */}
      <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className={`w-5 h-5 ${theme.text}`} />
          <h4 className="font-bold text-lg md:text-xl text-gray-900">
            Who Starts Conversations?
          </h4>
        </div>

        <ParticipantComparisonTable
          participants={content.initiation_balance.participants}
          columns={[
            { key: "name", label: "Participant" },
            {
              key: "initiation_count",
              label: "Times Started",
              format: (v) => v.toLocaleString(),
            },
            {
              key: "percentage",
              label: "% of Total",
              format: (v) => `${v.toFixed(1)}%`,
            },
          ]}
          highlightMetric="percentage"
          categorySlug={categorySlug}
        />

        {/* Balance assessment */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2">
            <span className="text-lg">
              {content.initiation_balance.balance_assessment.rating ===
              "balanced"
                ? "✅"
                : content.initiation_balance.balance_assessment.rating ===
                  "slightly_imbalanced"
                ? "⚖️"
                : "⚠️"}
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-700 uppercase mb-1">
                {content.initiation_balance.balance_assessment.rating.replace(
                  /_/g,
                  " "
                )}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {content.initiation_balance.balance_assessment.interpretation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Response Patterns - UPDATED */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Zap className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Response Styles
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {content.response_patterns.participants.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm md:text-base font-bold shrink-0`}
              >
                {p.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm md:text-base text-gray-900 truncate">
                  {p.name}
                </p>
                <p className="text-xs text-gray-600">{p.response_style}</p>
                <p className="text-xs text-gray-500">
                  Avg: {formatSeconds(p.avg_response_seconds)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.response_patterns.compatibility_note}
          </p>
        </div>
      </div>

      {/* Engagement Indicators - UPDATED */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Engagement Patterns
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {content.engagement_indicators.participants.map((p) => (
            <div
              key={p.name}
              className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-sm md:text-base text-gray-900 mb-3 truncate">
                {p.name}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Questions Asked</span>
                  <span className="font-bold text-gray-900">
                    {p.questions_asked}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-gray-600">Double Texting</span>
                  <span className="font-bold text-gray-900">
                    {p.double_texting_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.engagement_indicators.engagement_insight}
          </p>
        </div>
      </div>

      {/* 4. Message Contribution */}
      <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className={`w-5 h-5 ${theme.text}`} />
          <h4 className="font-bold text-lg md:text-xl text-gray-900">
            Message Contribution
          </h4>
        </div>

        <ParticipantComparisonTable
          participants={content.message_contribution.participants}
          columns={[
            { key: "name", label: "Participant" },
            {
              key: "message_percentage",
              label: "Messages",
              format: (v) => `${v.toFixed(1)}%`,
            },
            {
              key: "word_percentage",
              label: "Words",
              format: (v) => `${v.toFixed(1)}%`,
            },
            {
              key: "avg_words_per_message",
              label: "Avg Words/Msg",
              format: (v) => v.toFixed(1),
            },
            { key: "style", label: "Style" },
          ]}
          categorySlug={categorySlug}
        />

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {content.message_contribution.balance_note}
          </p>
        </div>
      </div>

      {/* 5. Engagement Indicators */}
      <div className="bg-white rounded-xl p-5 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`w-5 h-5 ${theme.text}`} />
          <h4 className="font-bold text-lg md:text-xl text-gray-900">
            Engagement Patterns
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {content.engagement_indicators.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-sm md:text-base text-gray-900 mb-3">
                {p.name}
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Questions Asked</span>
                  <span className="font-bold text-gray-900">
                    {p.questions_asked}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Double Texting</span>
                  <span className="font-bold text-gray-900">
                    {p.double_texting_rate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            {content.engagement_indicators.engagement_insight}
          </p>
        </div>
      </div>

      {/* 6. Communication Strengths */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg md:text-xl text-gray-900 flex items-center gap-2">
          <span>✨</span>
          <span>Communication Strengths</span>
        </h4>

        {content.communication_strengths.map((strength, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-5 md:p-6 border-2 border-gray-100"
          >
            <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
              {strength.strength_title}
            </h5>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              {strength.description}
            </p>
            <EvidencePanel
              evidence={strength.evidence}
              categorySlug={categorySlug}
              defaultExpanded={idx === 0} // Expand first one by default
            />
          </div>
        ))}
      </div>

      {/* 7. Recommendations */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg md:text-xl text-gray-900 flex items-center gap-2">
          <span>💡</span>
          <span>Ways to Improve</span>
        </h4>

        <div className="space-y-3">
          {content.balance_recommendations.map((rec, idx) => (
            <RecommendationCard
              key={idx}
              recommendation={rec}
              categorySlug={categorySlug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
