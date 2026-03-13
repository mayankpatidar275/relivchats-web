"use client";

import { FamilyConflictPatternsContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Flame, Users, AlertCircle, CheckCircle2, MessageSquare } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FamilyConflictPatternsContent;
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

export default function FamilyConflictPatternsView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.conflict_health}
      />

      {/* Conflict Presence */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Flame className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Tension in This Family Chat</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-xs font-medium text-orange-700 mb-1">Tension Level</p>
            <p className="text-sm text-gray-900">{content.conflict_presence.level}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Expression Style</p>
            <p className="text-sm text-gray-900">{content.conflict_presence.expression_style}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.conflict_presence.assessment}</p>
      </div>

      {/* Family-Specific Patterns */}
      {content.family_specific_patterns.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 text-orange-500`} />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Family Conflict Patterns</h4>
          </div>
          <div className="space-y-4">
            {content.family_specific_patterns.map((p, i) => (
              <div key={i}>
                <div className="flex items-start gap-2 mb-1">
                  <span className="text-base">⚡</span>
                  <p className="font-semibold text-sm text-gray-900">{p.pattern_name}</p>
                </div>
                <p className="text-xs md:text-sm text-gray-700 mb-2 ml-6">{p.description}</p>
                {p.evidence && p.evidence.length > 0 && <div className="ml-6"><EvidenceBlock evidence={p.evidence} /></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Individual Styles */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">How Each Person Handles Tension</h4>
        </div>
        <div className="space-y-4">
          {content.individual_styles.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700">{p.style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Tension Topics */}
      {content.tension_topics.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Topics That Create Friction</h4>
          </div>
          <div className="space-y-4">
            {content.tension_topics.map((t, i) => (
              <div key={i}>
                <p className="font-semibold text-sm text-gray-900 mb-1">⚡ {t.topic}</p>
                <p className="text-xs md:text-sm text-gray-700 mb-2 ml-5">{t.description}</p>
                {t.evidence && t.evidence.length > 0 && <div className="ml-5"><EvidenceBlock evidence={t.evidence} /></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How Conflict Resolves */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🤝</span>
          <span>How Things Get Resolved</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-1">Approach</p>
            <p className="text-sm text-gray-900">{content.conflict_resolution.approach}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Effectiveness</p>
            <p className="text-sm text-gray-900">{content.conflict_resolution.effectiveness}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.conflict_resolution.description}</p>
      </div>

      {/* Positive Behaviors */}
      {content.positive_conflict_behaviors.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            <h4 className="font-bold text-base md:text-lg text-gray-900">What This Family Does Well</h4>
          </div>
          <div className="space-y-4">
            {content.positive_conflict_behaviors.map((b, i) => (
              <div key={i}>
                <div className="flex items-start gap-2 mb-1">
                  <span>✨</span>
                  <p className="font-semibold text-sm text-gray-900">{b.behavior}</p>
                </div>
                <p className="text-xs md:text-sm text-gray-700 mb-2 ml-6">{b.description}</p>
                {b.evidence && b.evidence.length > 0 && <div className="ml-6"><EvidenceBlock evidence={b.evidence} /></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Patterns to Address */}
      {content.patterns_to_address.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>🪞</span>
            <span>Worth Addressing</span>
          </h4>
          <div className="space-y-3">
            {content.patterns_to_address.map((p, i) => (
              <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{p.pattern}</p>
                <p className="text-xs md:text-sm text-gray-700 mb-2">{p.description}</p>
                <p className="text-xs text-purple-700 italic">💭 {p.reflection_prompt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Navigate Tension Better</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">{rec.title}</h5>
                <div className="flex gap-1 shrink-0">
                  {rec.target.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-orange-50 rounded-full text-orange-700 border border-orange-200">{t}</span>
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
