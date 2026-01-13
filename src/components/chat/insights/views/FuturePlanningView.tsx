"use client";

import { FuturePlanningContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import {
  Compass,
  Target,
  Users,
  Clock,
  Sparkles,
  AlertCircle,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import VisionScoreCard from "../VisionScoreCard";
import CategoryDiscussionCard from "../CategoryDiscussionCard";
import AlignmentBadge from "../AlignmentBadge";
import EvidencePanel from "../EvidencePanel";
import ConversationExchange from "../ConversationExchange";
import FrequencyIndicator from "../FrequencyIndicator";

interface FuturePlanningViewProps {
  content: FuturePlanningContent;
  categorySlug?: string;
}

export default function FuturePlanningView({
  content,
  categorySlug,
}: FuturePlanningViewProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      {/* 1. Overall Vision Score */}
      {content.overall && (
        <VisionScoreCard
          score={content.overall.score}
          visionStatus={content.overall.vision_status}
          summary={content.overall.summary}
        />
      )}

      {/* 2. Future Discussion Frequency */}
      {content.frequency && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              How Often You Talk About the Future
            </h4>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <FrequencyIndicator
              frequency={content.frequency.level}
              label="Future Discussion Frequency"
            />
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mt-4">
              {content.frequency.assessment}
            </p>
          </div>
        </div>
      )}

      {/* 3. Life Goal Categories */}
      {content.categories && content.categories.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Target className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              What You Dream About Together
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {content.categories.map((cat, idx) => (
              <CategoryDiscussionCard
                key={idx}
                category={cat.category}
                discussed={cat.discussed}
                summary={cat.summary}
                evidence={cat.evidence}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. Alignment Assessment */}
      {content.alignment && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Compass className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Are You on the Same Page?
            </h4>
          </div>

          <div className="flex items-center justify-center mb-4">
            <AlignmentBadge
              status={content.alignment.overall_level}
              size="md"
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content.alignment.analysis}
            </p>
          </div>

          {/* Category-wise alignment */}
          {content.alignment.category_alignment &&
            content.alignment.category_alignment.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                  Alignment by Category
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.alignment.category_alignment.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {cat.category}
                      </span>
                      <AlignmentBadge status={cat.alignment_status} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}

      {/* 5. Planning Styles */}
      {content.planning_styles && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Planner vs Dreamer
            </h4>
          </div>

          {content.planning_styles.participants &&
            content.planning_styles.participants.length > 0 && (
              <div className="space-y-4 mb-4">
                {content.planning_styles.participants.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                      >
                        {p.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm md:text-base text-gray-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Style:{" "}
                          <span className="font-medium capitalize">
                            {p.style}
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
                      {p.description}
                    </p>

                    {p.evidence && p.evidence.length > 0 && (
                      <EvidencePanel
                        evidence={p.evidence}
                        categorySlug={categorySlug}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs font-semibold text-purple-700 uppercase mb-2">
                Compatibility
              </p>
              <p className="text-sm text-gray-800">
                {content.planning_styles.compatibility || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
                Who Initiates More
              </p>
              <p className="text-sm font-medium text-gray-900">
                {content.planning_styles.initiator || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Timelines */}
      {content.timelines && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              When Will It Happen?
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs font-semibold text-green-700 uppercase mb-2">
                Timeline Clarity
              </p>
              <p className="text-sm text-gray-800">
                {content.timelines.concrete_vs_vague || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
                Timeline Alignment
              </p>
              <p className="text-sm text-gray-800">
                {content.timelines.alignment || "N/A"}
              </p>
            </div>
          </div>

          {content.timelines.evidence &&
            content.timelines.evidence.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-600 uppercase mb-3">
                  Timeline Examples
                </p>
                <EvidencePanel
                  evidence={content.timelines.evidence}
                  categorySlug={categorySlug}
                />
              </div>
            )}
        </div>
      )}

      {/* 7. Enthusiasm */}
      {content.enthusiasm && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Excitement About the Future
            </h4>
          </div>

          {content.enthusiasm.participants &&
            content.enthusiasm.participants.length > 0 && (
              <div className="grid grid-cols-1 gap-3 mb-4">
                {content.enthusiasm.participants.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm md:text-base text-gray-900">
                        {p.name}
                      </span>
                      <span className="text-xs px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full font-medium capitalize">
                        {p.level} enthusiasm
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          {content.enthusiasm.evidence &&
            content.enthusiasm.evidence.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Enthusiasm in Action
                </p>
                {content.enthusiasm.evidence.map((ev, idx) => (
                  <ConversationExchange
                    key={idx}
                    context={ev.context}
                    exchange={ev.exchange}
                    categorySlug={categorySlug}
                  />
                ))}
              </div>
            )}
        </div>
      )}

      {/* 8. Shared Dreams */}
      {content.shared_dreams && content.shared_dreams.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
            <span>✨</span>
            <span>Your Shared Dreams</span>
          </h4>

          {content.shared_dreams.map((dream, idx) => (
            <div
              key={idx}
              className="bg-linear-to-br from-purple-50 via-blue-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-purple-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                    {dream.dream_title}
                  </h5>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
                    {dream.description}
                  </p>
                </div>
              </div>

              {/* Exchange */}
              {dream.exchange && dream.exchange.length > 0 && (
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {dream.exchange.map((msg, msgIdx) => (
                    <div key={msgIdx} className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {msg.speaker[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-900 truncate">
                            {msg.speaker}
                          </span>
                          <span className="text-xs text-gray-500 shrink-0">
                            {msg.timestamp}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg rounded-tl-none p-3 border border-gray-200">
                          <p className="text-sm text-gray-800 leading-relaxed wrap-break-word">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 9. Missing Conversations */}
      {content.missing_conversations &&
        content.missing_conversations.length > 0 && (
          <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
              <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
                Topics Worth Discussing
              </h4>
            </div>

            <div className="space-y-3">
              {content.missing_conversations.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-amber-50 rounded-lg border border-amber-200"
                >
                  <p className="font-semibold text-sm md:text-base text-gray-900 mb-2">
                    {topic.topic}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {topic.why_important}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* 10. Recommendations */}
      {content.recommendations && content.recommendations.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
            <span>🎯</span>
            <span>Build Your Future Together</span>
          </h4>

          <div className="space-y-3">
            {content.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className={`p-4 md:p-5 rounded-xl border-2 ${
                  theme.bg
                } ${theme.text.replace("text-", "border-")} bg-opacity-10`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${theme.bg} flex items-center justify-center shrink-0`}
                  >
                    <TrendingUp
                      className={`w-5 h-5 md:w-6 md:h-6 ${theme.text}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                      {rec.title}
                    </h5>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {rec.suggestion}
                    </p>
                  </div>
                </div>

                {/* Conversation starters */}
                {rec.conversation_starters &&
                  rec.conversation_starters.length > 0 && (
                    <div className="p-4 bg-linear-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                      <p className="text-xs font-semibold text-purple-700 uppercase mb-3">
                        💬 Conversation Starters
                      </p>
                      <div className="space-y-2">
                        {rec.conversation_starters.map((starter, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3 bg-white rounded-lg border border-purple-200"
                          >
                            <p className="text-sm italic text-gray-800 leading-relaxed">
                              &quot;{starter}&quot;
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
