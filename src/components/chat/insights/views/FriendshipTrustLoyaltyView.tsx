"use client";

import { FriendshipTrustLoyaltyContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Shield, CheckCircle2, AlertTriangle, Users, Star, XCircle } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FriendshipTrustLoyaltyContent;
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

export default function FriendshipTrustLoyaltyView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.trust_status}
      />

      {/* Reliability Patterns */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Reliability</h4>
        </div>
        <p className="text-xs md:text-sm text-gray-600 mb-4 italic">{content.reliability_patterns.assessment}</p>
        <div className="space-y-4">
          {content.reliability_patterns.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700`}>{p.reliability_rating}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && <EvidenceBlock evidence={p.evidence} />}
            </div>
          ))}
        </div>
      </div>

      {/* Showing Up */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Showing Up When It Counts</h4>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-2">{content.showing_up.analysis}</p>
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-3">
          <p className="text-xs font-medium text-blue-700 mb-1">Who Initiates Care</p>
          <p className="text-sm text-gray-900">{content.showing_up.initiator}</p>
        </div>
        {content.showing_up.evidence.length > 0 && <EvidenceBlock evidence={content.showing_up.evidence} />}
      </div>

      {/* Consistency */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Star className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Consistency & Effort</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-1">Consistency Rating</p>
            <p className="text-sm text-gray-900">{content.consistency.rating}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Initiation Balance</p>
            <p className="text-sm text-gray-900">{content.consistency.initiator_balance}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700">{content.consistency.description}</p>
      </div>

      {/* Loyalty Signals */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          {content.loyalty_signals.present ? (
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
          )}
          <h4 className="font-bold text-base md:text-lg text-gray-900">Loyalty Signals</h4>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.loyalty_signals.description}</p>
        {content.loyalty_signals.evidence && content.loyalty_signals.evidence.length > 0 && (
          <EvidenceBlock evidence={content.loyalty_signals.evidence} />
        )}
      </div>

      {/* Trust Gaps */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          {content.trust_gaps.present ? (
            <XCircle className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          )}
          <h4 className="font-bold text-base md:text-lg text-gray-900">
            {content.trust_gaps.present ? "Trust Gaps" : "Solid Foundation"}
          </h4>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mb-3">{content.trust_gaps.assessment}</p>
        {content.trust_gaps.gaps && content.trust_gaps.gaps.map((gap, i) => (
          <div key={i} className="mb-3">
            <p className="font-semibold text-sm text-gray-900 mb-1">{gap.gap_type}</p>
            <p className="text-xs md:text-sm text-gray-700 mb-2">{gap.description}</p>
            {gap.evidence && gap.evidence.length > 0 && <EvidenceBlock evidence={gap.evidence} />}
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Strengthen the Trust</span>
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
