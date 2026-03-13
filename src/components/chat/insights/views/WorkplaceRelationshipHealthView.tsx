"use client";

import { WorkplaceRelationshipHealthContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Leaf, Shield, Star, AlertTriangle, CheckCircle2, Users } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: WorkplaceRelationshipHealthContent;
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

export default function WorkplaceRelationshipHealthView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.health_status}
      />

      {/* Overall Quality */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Leaf className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Overall Relationship Quality</h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium mb-3 inline-block">
          {content.overall_quality.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mt-2">{content.overall_quality.assessment}</p>
      </div>

      {/* Mutual Respect */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Mutual Respect</h4>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
          <p className="text-xs font-medium text-blue-700 mb-1">Rating</p>
          <p className="text-sm text-gray-900">{content.mutual_respect.rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.mutual_respect.analysis}</p>
        {content.mutual_respect.evidence && content.mutual_respect.evidence.length > 0 && (
          <EvidenceBlock evidence={content.mutual_respect.evidence} />
        )}
      </div>

      {/* Psychological Safety */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield className={`w-4 h-4 md:w-5 md:h-5 text-green-600`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Psychological Safety</h4>
        </div>
        <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
          <p className="text-xs font-medium text-green-700 mb-1">Rating</p>
          <p className="text-sm text-gray-900">{content.psychological_safety.rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.psychological_safety.analysis}</p>
        {content.psychological_safety.evidence && content.psychological_safety.evidence.length > 0 && (
          <EvidenceBlock evidence={content.psychological_safety.evidence} />
        )}
      </div>

      {/* Power Dynamics */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Power Dynamics</h4>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-3">
          <p className="text-xs font-medium text-gray-600 mb-1">Assessment</p>
          <p className="text-sm text-gray-900">{content.power_dynamics.assessment}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.power_dynamics.description}</p>
      </div>

      {/* Positive Reinforcement */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Star className={`w-4 h-4 md:w-5 md:h-5 text-yellow-500`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Recognition & Appreciation</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs font-medium text-yellow-700 mb-1">Frequency</p>
            <p className="text-sm text-gray-900">{content.positive_reinforcement.level}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Who Appreciates More</p>
            <p className="text-sm text-gray-900">{content.positive_reinforcement.primary_giver}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.positive_reinforcement.description}</p>
        {content.positive_reinforcement.evidence && content.positive_reinforcement.evidence.length > 0 && (
          <EvidenceBlock evidence={content.positive_reinforcement.evidence} />
        )}
      </div>

      {/* Stress Signals */}
      {content.stress_signals.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Stress Signals</h4>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{content.stress_signals.description}</p>
          {content.stress_signals.signals && content.stress_signals.signals.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.stress_signals.signals.map((s, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-orange-50 rounded-full text-orange-700 border border-orange-200">{s}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interpersonal Rapport */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-3 flex items-center gap-2">
          <span>🤝</span> Personal Rapport
        </h4>
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium mb-3 inline-block">
          {content.interpersonal_rapport.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mb-3 mt-2">{content.interpersonal_rapport.description}</p>
        {content.interpersonal_rapport.evidence && content.interpersonal_rapport.evidence.length > 0 && (
          <EvidenceBlock evidence={content.interpersonal_rapport.evidence} />
        )}
      </div>

      {/* Relationship Strengths */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          <h4 className="font-bold text-base md:text-lg text-gray-900">What Makes This Working Relationship Good</h4>
        </div>
        <div className="space-y-3">
          {content.relationship_strengths.map((s, i) => (
            <div key={i}>
              <div className="flex items-start gap-2 mb-1">
                <span>✅</span>
                <p className="font-semibold text-sm text-gray-900">{s.strength}</p>
              </div>
              <p className="text-xs md:text-sm text-gray-700 ml-6">{s.description}</p>
              {s.evidence && s.evidence.length > 0 && <div className="ml-6 mt-2"><EvidenceBlock evidence={s.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Areas to Strengthen */}
      {content.areas_to_strengthen.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4">Room to Improve</h4>
          <div className="space-y-3">
            {content.areas_to_strengthen.map((a, i) => (
              <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{a.area}</p>
                <p className="text-xs md:text-sm text-gray-700">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Strengthen the Working Relationship</span>
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
                <div className="pl-4 border-l-2 border-purple-200 space-y-1">
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
