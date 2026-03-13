"use client";

import { FamilyEmotionalClimateContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Heart, Thermometer, Eye, CheckCircle2 } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FamilyEmotionalClimateContent;
  categorySlug?: string;
}

function EvidenceBlock({ evidence }: { evidence: Array<{ context: string; exchange: Array<{ speaker: string; message: string; timestamp: string }> }> }) {
  return (
    <div className="space-y-2">
      {evidence.map((ev, i) => (
        <div key={i} className="p-3 bg-white rounded-lg border border-gray-200">
          {ev.context && <p className="text-xs text-gray-500 italic mb-2">{ev.context}</p>}
          <div className="space-y-1">
            {ev.exchange.map((msg, j) => (
              <div key={j} className="text-xs md:text-sm">
                <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
                <span className="text-gray-700">{msg.message}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FamilyEmotionalClimateView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  const warmthColorMap: Record<string, string> = {
    "very warm": "bg-red-50 text-red-700 border-red-200",
    warm: "bg-orange-50 text-orange-700 border-orange-200",
    neutral: "bg-gray-100 text-gray-700 border-gray-200",
    cool: "bg-blue-50 text-blue-700 border-blue-200",
    mixed: "bg-purple-50 text-purple-700 border-purple-200",
  };
  const warmthClass = warmthColorMap[content.overall_warmth.rating.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.climate_status}
      />

      {/* Overall Warmth */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Thermometer className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Emotional Temperature</h4>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-medium border mb-3 inline-block ${warmthClass}`}>
          {content.overall_warmth.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mt-2">{content.overall_warmth.assessment}</p>
      </div>

      {/* Affection Expression */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">How Care Is Expressed</h4>
        </div>
        <div className="space-y-4">
          {content.affection_expression.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700">{p.expression_style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Emotional Openness */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Eye className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">How Openly Feelings Are Shared</h4>
        </div>
        <div className="space-y-4">
          {content.emotional_openness.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{p.openness_style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerability Moments */}
      {content.vulnerability_moments.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>💙</span>
            <span>Vulnerable Moments</span>
          </h4>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
            <p className="text-xs font-medium text-blue-700 mb-1">Response Quality</p>
            <p className="text-sm text-gray-900">{content.vulnerability_moments.response_quality}</p>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{content.vulnerability_moments.description}</p>
          {content.vulnerability_moments.moments && content.vulnerability_moments.moments.length > 0 && (
            <EvidenceBlock evidence={content.vulnerability_moments.moments} />
          )}
        </div>
      )}

      {/* Warmth & Appreciation */}
      {content.warmth_appreciation.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Appreciation & Recognition</h4>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{content.warmth_appreciation.description}</p>
          {content.warmth_appreciation.evidence && content.warmth_appreciation.evidence.length > 0 && (
            <EvidenceBlock evidence={content.warmth_appreciation.evidence} />
          )}
        </div>
      )}

      {/* Emotional Avoidance */}
      {content.emotional_avoidance.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-3">What Tends to Stay Unsaid</h4>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{content.emotional_avoidance.description}</p>
          {content.emotional_avoidance.avoided_areas && content.emotional_avoidance.avoided_areas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.emotional_avoidance.avoided_areas.map((a, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{a}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Positive Moments */}
      {content.positive_emotional_moments.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>🌟</span>
            <span>Warm Moments</span>
          </h4>
          <div className="space-y-4">
            {content.positive_emotional_moments.map((m, i) => (
              <div key={i}>
                <p className="font-semibold text-sm text-gray-900 mb-1">{m.moment_title}</p>
                <p className="text-xs text-gray-500 italic mb-2">{m.why_meaningful}</p>
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  {m.exchange.map((msg, j) => (
                    <div key={j} className="text-xs md:text-sm">
                      <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
                      <span className="text-gray-700">{msg.message}</span>
                    </div>
                  ))}
                </div>
                {i < content.positive_emotional_moments.length - 1 && <div className="border-t border-gray-100 mt-3" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Growth Opportunities */}
      {content.growth_opportunities.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4">Room to Grow</h4>
          <div className="space-y-3">
            {content.growth_opportunities.map((g, i) => (
              <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{g.opportunity}</p>
                <p className="text-xs md:text-sm text-gray-700">{g.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Nurture Emotional Connection</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">{rec.title}</h5>
                <div className="flex gap-1 shrink-0">
                  {rec.target.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-green-50 rounded-full text-green-700 border border-green-200">{t}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{rec.suggestion}</p>
              {rec.example_phrases.length > 0 && (
                <div className="pl-4 border-l-2 border-green-200 space-y-1">
                  {rec.example_phrases.map((ph, j) => (
                    <p key={j} className="text-xs md:text-sm italic text-gray-600">&quot;{ph}&quot;</p>
                  ))}
                </div>
              )}
              {i < content.recommendations.length - 1 && <div className="border-t border-gray-100 mt-3" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
