"use client";

import { FriendshipVitalityContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Zap, Laugh, Star, Calendar, TrendingUp } from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";

interface Props {
  content: FriendshipVitalityContent;
  categorySlug?: string;
}

function Exchange({ exchange }: { exchange: Array<{ speaker: string; message: string; timestamp: string }> }) {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1">
      {exchange.map((msg, i) => (
        <div key={i} className="text-xs md:text-sm">
          <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
          <span className="text-gray-700">{msg.message}</span>
        </div>
      ))}
    </div>
  );
}

export default function FriendshipVitalityView({ content, categorySlug }: Props) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.overall.friendship_status}
      />

      {/* Energy Level */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Zap className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Friendship Energy</h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium mb-3 inline-block">
          {content.energy_level.rating}
        </span>
        <p className="text-xs md:text-sm text-gray-700 mt-2">{content.energy_level.assessment}</p>
      </div>

      {/* Humor & Banter */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Laugh className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Humor & Banter</h4>
        </div>
        <p className="text-xs text-gray-500 mb-3">Humor initiator: <strong>{content.humor_banter.initiator}</strong></p>
        <div className="space-y-4">
          {content.humor_banter.participants.map((p) => (
            <div key={p.name}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {p.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-sm text-gray-900">{p.name}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">{p.humor_style}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{p.description}</p>
              {p.evidence && p.evidence.length > 0 && (
                <div className="space-y-1">
                  {p.evidence.map((ev, i) => (
                    <div key={i} className="p-2 bg-white rounded-lg border border-gray-200 text-xs md:text-sm">
                      <span className="font-semibold text-gray-900">{ev.speaker}:</span>{" "}
                      <span className="text-gray-700">{ev.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inside References */}
      {content.inside_references.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
            <span>🤫</span>
            <span>Your Own Language</span>
          </h4>
          <div className="space-y-3">
            {content.inside_references.map((ref, i) => (
              <div key={i} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{ref.reference}</p>
                <p className="text-xs text-gray-600 italic mb-2">{ref.context}</p>
                {ref.evidence && ref.evidence.map((ev, j) => (
                  <div key={j} className="text-xs md:text-sm">
                    <span className="font-semibold text-gray-900">{ev.speaker}:</span>{" "}
                    <span className="text-gray-700">{ev.message}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plans & Activities */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Plans & Shared Activities</h4>
        </div>
        {content.shared_activities.discussed ? (
          <>
            <div className="flex flex-wrap gap-2 mb-3">
              {content.shared_activities.activity_types.map((a, i) => (
                <span key={i} className="text-xs px-2 py-1 bg-green-50 rounded-full text-green-700 border border-green-200">{a}</span>
              ))}
            </div>
            <p className="text-xs md:text-sm text-gray-700">{content.shared_activities.follow_through_assessment}</p>
          </>
        ) : (
          <p className="text-xs md:text-sm text-gray-500 italic">No shared activity planning found in this chat.</p>
        )}
      </div>

      {/* Initiation Balance */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg text-gray-900">Who Keeps Things Going</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">Balance Rating</p>
            <p className="text-sm text-gray-900">{content.initiation_balance.rating}</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-1">Primary Initiator</p>
            <p className="text-sm text-gray-900">{content.initiation_balance.primary_initiator}</p>
          </div>
        </div>
        <p className="text-xs md:text-sm text-gray-700 mt-3">{content.initiation_balance.description}</p>
      </div>

      {/* Best Moments */}
      {content.best_moments.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Star className={`w-4 h-4 md:w-5 md:h-5 text-yellow-500`} />
            <h4 className="font-bold text-base md:text-lg text-gray-900">Best Moments</h4>
          </div>
          <div className="space-y-4">
            {content.best_moments.map((m, i) => (
              <div key={i}>
                <p className="font-semibold text-sm text-gray-900 mb-1">{m.moment_title}</p>
                <p className="text-xs text-gray-500 italic mb-2">{m.why_special}</p>
                <Exchange exchange={m.exchange} />
                {i < content.best_moments.length - 1 && <div className="border-t border-gray-100 mt-3" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vitality Gaps */}
      {content.vitality_gaps.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4">Ways to Boost the Energy</h4>
          <div className="space-y-3">
            {content.vitality_gaps.map((g, i) => (
              <div key={i} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="font-semibold text-sm text-gray-900 mb-1">{g.gap}</p>
                <p className="text-xs md:text-sm text-gray-700">{g.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Keep It Alive</span>
        </h4>
        <div className="space-y-4">
          {content.recommendations.map((rec, i) => (
            <div key={i}>
              <h5 className="font-semibold text-sm md:text-base text-gray-900 mb-1">{rec.title}</h5>
              <p className="text-xs md:text-sm text-gray-700 mb-2">{rec.suggestion}</p>
              {rec.examples.length > 0 && (
                <div className="pl-4 border-l-2 border-blue-200 space-y-1">
                  {rec.examples.map((ex, j) => (
                    <p key={j} className="text-xs md:text-sm italic text-gray-600">{ex}</p>
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
