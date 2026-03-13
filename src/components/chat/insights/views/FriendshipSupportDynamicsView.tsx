"use client";

import { FriendshipSupportDynamicsContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Heart, Users, ArrowLeftRight, CheckCircle2, TrendingUp } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FriendshipSupportDynamicsContent;
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

export default function FriendshipSupportDynamicsView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.bond_status}
      />

      {/* Support Presence */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Support in This Friendship</h4>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium bg-blue-50 text-blue-700`}>
            {content.support_presence.level}
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.support_presence.assessment}</p>
      </div>

      {/* Support Styles */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">How Each Person Supports</h4>
        </div>
        <div className="space-y-4">
          {content.support_styles.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">{p.style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <EvidenceBlock evidence={p.evidence} />}
            </div>
          ))}
        </div>
      </div>

      {/* Reciprocity */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <ArrowLeftRight className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Is It Mutual?</h4>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
          <p className="text-xs font-medium text-blue-700 mb-1">Balance Rating</p>
          <p className="text-sm text-gray-900">{content.reciprocity.balance_rating}</p>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.reciprocity.analysis}</p>
        {content.reciprocity.evidence && content.reciprocity.evidence.length > 0 && (
          <EvidenceBlock evidence={content.reciprocity.evidence} />
        )}
      </div>

      {/* Checking In */}
      {content.checking_in.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Checking In Proactively</h4>
          </div>
          <p className="text-xs md:text-sm text-gray-700 mb-2">{content.checking_in.description}</p>
          <p className="text-xs text-gray-500 mb-3">Primarily initiated by: <strong>{content.checking_in.initiator}</strong></p>
          {content.checking_in.evidence && content.checking_in.evidence.length > 0 && (
            <EvidenceBlock evidence={content.checking_in.evidence} />
          )}
        </div>
      )}

      {/* Hard Times Moments */}
      {content.hard_times_moments.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>💙</span>
            <span>During Hard Times</span>
          </h4>
          <div className="space-y-4">
            {content.hard_times_moments.map((m, i) => (
              <div key={i}>
                <p className="font-semibold text-sm text-gray-900 mb-1">{m.situation}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full mb-2 inline-block ${
                  m.response_quality.toLowerCase().includes("excellent") || m.response_quality.toLowerCase().includes("good")
                    ? "bg-green-100 text-green-700"
                    : m.response_quality.toLowerCase().includes("average") || m.response_quality.toLowerCase().includes("moderate")
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}>{m.response_quality}</span>
                <div className="p-3 bg-white rounded-lg border border-gray-200 mt-2">
                  {m.exchange.map((msg, j) => (
                    <div key={j} className="text-xs md:text-sm">
                      <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
                      <span className="text-gray-700">{msg.message}</span>
                    </div>
                  ))}
                </div>
                {i < content.hard_times_moments.length - 1 && <div className="border-t border-gray-100 mt-3" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          <h4 className="font-bold text-base md:text-lg text-gray-900">What This Friendship Does Well</h4>
        </div>
        <div className="space-y-4">
          {content.friendship_strengths.map((s, i) => (
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

      {/* Growth Areas */}
      {content.growth_areas.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4">Room to Grow</h4>
          <div className="space-y-3">
            {content.growth_areas.map((g, i) => (
              <div key={i} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{g.area}</p>
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
          <span>Deepen the Bond</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">{rec.title}</h5>
                <div className="flex gap-1 shrink-0">
                  {rec.target.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-700 border border-blue-200">{t}</span>
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
