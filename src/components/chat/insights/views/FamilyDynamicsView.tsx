"use client";

import { FamilyDynamicsContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Home, Users, Crown, CheckCircle2, AlertTriangle } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FamilyDynamicsContent;
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

export default function FamilyDynamicsView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.dynamics_status}
      />

      {/* Visible Roles */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">The Roles Each Person Plays</h4>
        </div>
        <div className="space-y-4">
          {content.visible_roles.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 mb-1">{p.name}</p>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {p.roles.map((r, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-green-50 rounded-full text-green-700 border border-green-200">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Decision Making */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Crown className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">How Decisions Get Made</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Decision Style</p>
            <p className="text-sm text-gray-900">{content.decision_making.style}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Who Tends to Lead</p>
            <p className="text-sm text-gray-900">{content.decision_making.primary_decision_maker}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.decision_making.analysis}</p>
        {content.decision_making.evidence && content.decision_making.evidence.length > 0 && (
          <EvidenceBlock evidence={content.decision_making.evidence} />
        )}
      </div>

      {/* Communication Hierarchy */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Home className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Communication Structure</h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium mb-3 inline-block">
          {content.communication_hierarchy.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mt-2">{content.communication_hierarchy.analysis}</p>
      </div>

      {/* Expectation Patterns */}
      {content.expectation_patterns.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className={`w-4 h-4 md:w-5 md:h-5 text-orange-500`} />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Expectations & Obligations</h4>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-3">{content.expectation_patterns.description}</p>
          {content.expectation_patterns.expectations && (
            <div className="space-y-3">
              {content.expectation_patterns.expectations.map((exp, i) => (
                <div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900">{exp.expectation_type}</p>
                    <span className="text-xs text-gray-500">→ {exp.directed_at}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 mb-2">{exp.description}</p>
                  {exp.evidence && exp.evidence.length > 0 && <EvidenceBlock evidence={exp.evidence} />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Family Strengths */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          <h4 className="font-bold text-base md:text-lg text-gray-900">What Works Well</h4>
        </div>
        <div className="space-y-4">
          {content.family_strengths.map((s, i) => (
            <div key={i}>
              <div className="flex items-start gap-2 mb-1">
                <span>✨</span>
                <p className="font-semibold text-sm text-gray-900">{s.strength}</p>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-6">{s.description}</p>
              {s.evidence && s.evidence.length > 0 && <div className="ml-6"><EvidenceBlock evidence={s.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Patterns to Reflect */}
      {content.patterns_to_reflect.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>🪞</span>
            <span>Worth Reflecting On</span>
          </h4>
          <div className="space-y-3">
            {content.patterns_to_reflect.map((p, i) => (
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
          <span>Strengthen Family Connection</span>
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
