"use client";

import { WorkplaceCommunicationContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Briefcase, MessageSquare, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: WorkplaceCommunicationContent;
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

export default function WorkplaceCommunicationView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.effectiveness_status}
      />

      {/* Overall Quality */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Overall Communication Quality</h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium mb-3 inline-block">
          {content.overall_quality.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mt-2">{content.overall_quality.assessment}</p>
      </div>

      {/* Clarity & Directness */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Clarity & Directness</h4>
        </div>
        <div className="space-y-4">
          {content.clarity_directness.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{p.clarity_rating}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-12">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-12"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Tone & Professionalism */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Tone & Professionalism</h4>
        </div>
        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 mb-3">
          <p className="text-xs font-medium text-indigo-700 mb-1">Overall Tone</p>
          <p className="text-sm text-gray-900">{content.tone_professionalism.overall_tone}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-4">{content.tone_professionalism.assessment}</p>
        <div className="space-y-3">
          {content.tone_professionalism.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-1">
                <div className={`w-8 h-8 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <span className="font-semibold text-sm text-gray-900">{p.name}</span>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2 ml-11">{p.tone_description}</p>
              {p.evidence && p.evidence.length > 0 && <div className="ml-11"><EvidenceBlock evidence={p.evidence} /></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Responsiveness */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-3 flex items-center gap-2">
          <span>⚡</span> Responsiveness
        </h4>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
          <p className="text-xs font-medium text-blue-700 mb-1">Rating</p>
          <p className="text-sm text-gray-900">{content.responsiveness.rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.responsiveness.analysis}</p>
        {content.responsiveness.evidence && content.responsiveness.evidence.length > 0 && (
          <EvidenceBlock evidence={content.responsiveness.evidence} />
        )}
      </div>

      {/* Information Flow */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4">Information Flow</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-1">Flow Style</p>
            <p className="text-sm text-gray-900">{content.information_flow.style}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">More Proactive</p>
            <p className="text-sm text-gray-900">{content.information_flow.proactive_participant}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.information_flow.analysis}</p>
      </div>

      {/* Strengths */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Communication Strengths</h4>
        </div>
        <div className="space-y-3">
          {content.communication_strengths.map((s, i) => (
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

      {/* Gaps */}
      {content.communication_gaps.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Communication Gaps</h4>
          </div>
          <div className="space-y-3">
            {content.communication_gaps.map((g, i) => (
              <div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{g.gap}</p>
                <p className="text-xs md:text-sm text-gray-700 mb-1">{g.description}</p>
                <p className="text-xs text-orange-600 italic">Impact: {g.impact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Communicate More Effectively</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">{rec.title}</h5>
                <div className="flex gap-1 shrink-0">
                  {rec.target.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-purple-50 rounded-full text-purple-700 border border-purple-200">{t}</span>
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
