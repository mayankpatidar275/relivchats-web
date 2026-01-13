"use client";

import { PlayfulnessRomanceContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import {
  Laugh,
  Heart,
  Sparkles,
  Zap,
  MessageCircle,
  AlertCircle,
  Star,
  Smile,
} from "lucide-react";
import SparkScoreCard from "../SparkScoreCard";
import EvidencePanel from "../EvidencePanel";
import ConversationExchange from "../ConversationExchange";

interface PlayfulnessRomanceViewProps {
  content: PlayfulnessRomanceContent;
  categorySlug?: string;
}

export default function PlayfulnessRomanceView({
  content,
  categorySlug,
}: PlayfulnessRomanceViewProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      {/* 1. Overall Spark Score */}
      {content.overall && (
        <SparkScoreCard
          score={content.overall.score}
          sparkStatus={content.overall.spark_status}
          summary={content.overall.summary}
        />
      )}

      {/* 2. Overall Playfulness */}
      {content.overall_playfulness && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Smile className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Your Playfulness Level
            </h4>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">😄</span>
              <div>
                <p className="text-xs font-semibold text-yellow-700 uppercase">
                  Playfulness Level
                </p>
                <p className="text-lg font-bold text-gray-900 capitalize">
                  {content.overall_playfulness.level}
                </p>
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content.overall_playfulness.assessment}
            </p>
          </div>
        </div>
      )}

      {/* 3. Humor Styles */}
      {content.humor_styles && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Laugh className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              What Makes You Laugh
            </h4>
          </div>

          {content.humor_styles.participants &&
            content.humor_styles.participants.length > 0 && (
              <div className="space-y-4 mb-4">
                {content.humor_styles.participants.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg border border-orange-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                      >
                        {p.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                          {p.name}
                        </p>
                        {p.humor_types && p.humor_types.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {p.humor_types.map((type, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-700 border border-orange-300"
                              >
                                {type}
                              </span>
                            ))}
                          </div>
                        )}
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

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-2">
              Who&apos;&apos;s Funnier?
            </p>
            <p className="text-sm text-gray-800">
              {content.humor_styles.initiator || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* 4. Inside Jokes */}
      {content.inside_jokes && content.inside_jokes.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Your Inside Jokes
            </h4>
          </div>

          <div className="space-y-4">
            {content.inside_jokes.map((joke, idx) => (
              <div
                key={idx}
                className="p-4 bg-pink-50 rounded-lg border border-pink-200"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg">😉</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                      {joke.joke_or_reference}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
                      {joke.context}
                    </p>
                  </div>
                </div>

                {joke.evidence && joke.evidence.length > 0 && (
                  <EvidencePanel
                    evidence={joke.evidence}
                    categorySlug={categorySlug}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Flirtation */}
      {content.flirtation && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Keeping It Flirty
            </h4>
          </div>

          {content.flirtation.participants &&
            content.flirtation.participants.length > 0 && (
              <div className="grid grid-cols-1 gap-3 mb-4">
                {content.flirtation.participants.map((p) => (
                  <div
                    key={p.name}
                    className="p-4 bg-pink-50 rounded-lg border border-pink-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm md:text-base text-gray-900">
                        {p.name}
                      </span>
                      <span className="text-xs px-3 py-1 bg-pink-200 text-pink-800 rounded-full font-medium capitalize">
                        {p.frequency}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      Style: <span className="font-medium">{p.style}</span>
                    </p>
                  </div>
                ))}
              </div>
            )}

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-4">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-2">
              Balance Assessment
            </p>
            <p className="text-sm text-gray-800">
              {content.flirtation.balance || "N/A"}
            </p>
          </div>

          {content.flirtation.evidence &&
            content.flirtation.evidence.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Flirty Moments
                </p>
                {content.flirtation.evidence.map((ev, idx) => (
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

      {/* 6. Teasing & Banter */}
      {content.teasing_banter && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Zap className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Playful Teasing
            </h4>
          </div>

          <div
            className={`p-4 rounded-lg border-2 mb-4 ${
              content.teasing_banter.present
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {content.teasing_banter.present ? "😜" : "😐"}
              </span>
              <p className="text-xs font-semibold text-gray-700 uppercase">
                {content.teasing_banter.present
                  ? "Banter Present"
                  : "No Teasing"}
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">
              {content.teasing_banter.assessment}
            </p>
            <p className="text-xs text-gray-600">
              Balance:{" "}
              <span className="font-medium">
                {content.teasing_banter.balance || "N/A"}
              </span>
            </p>
          </div>

          {content.teasing_banter.evidence &&
            content.teasing_banter.evidence.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Banter Examples
                </p>
                {content.teasing_banter.evidence.map((ev, idx) => (
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

      {/* 7. Spontaneity */}
      {content.spontaneity && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Spontaneous Moments
            </h4>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">
                {content.spontaneity.present ? "⚡" : "📅"}
              </span>
              <p className="text-xs font-semibold text-blue-700 uppercase">
                {content.spontaneity.present ? "Spontaneous" : "More Planned"}
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-2">
              {content.spontaneity.description}
            </p>
            <p className="text-xs text-gray-600">
              Initiator:{" "}
              <span className="font-medium">
                {content.spontaneity.initiator || "N/A"}
              </span>
            </p>
          </div>

          {content.spontaneity.evidence &&
            content.spontaneity.evidence.length > 0 && (
              <EvidencePanel
                evidence={content.spontaneity.evidence}
                categorySlug={categorySlug}
              />
            )}
        </div>
      )}

      {/* 8. Emoji Usage */}
      {content.emoji_usage && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Emoji Energy
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs font-semibold text-yellow-700 uppercase mb-2">
                Emoji Usage
              </p>
              <p className="text-sm text-gray-800">
                {content.emoji_usage.description || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <p className="text-xs font-semibold text-pink-700 uppercase mb-2">
                Energy Match
              </p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {content.emoji_usage.match_level || "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 9. Fun Activities */}
      {content.fun_activities && content.fun_activities.discussed && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Fun Things You Plan Together
            </h4>
          </div>

          {content.fun_activities.types &&
            content.fun_activities.types.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {content.fun_activities.types.map((type, idx) => (
                  <span
                    key={idx}
                    className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-300 font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}

          {content.fun_activities.evidence &&
            content.fun_activities.evidence.length > 0 && (
              <EvidencePanel
                evidence={content.fun_activities.evidence}
                categorySlug={categorySlug}
              />
            )}
        </div>
      )}

      {/* 10. Mood Lifting */}
      {content.mood_lifting && content.mood_lifting.present && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Cheering Each Other Up
            </h4>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content.mood_lifting.description}
            </p>
          </div>

          {content.mood_lifting.evidence &&
            content.mood_lifting.evidence.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  Examples
                </p>
                {content.mood_lifting.evidence.map((ev, idx) => (
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

      {/* 11. Romance Maintenance */}
      {content.romance_maintenance && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Daily Romance
            </h4>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg border-2 border-pink-200 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💕</span>
              <p className="text-xs font-semibold text-pink-700 uppercase">
                Romance Level:{" "}
                <span className="capitalize">
                  {content.romance_maintenance.rating || "N/A"}
                </span>
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content.romance_maintenance.description}
            </p>
          </div>

          {content.romance_maintenance.evidence &&
            content.romance_maintenance.evidence.length > 0 && (
              <EvidencePanel
                evidence={content.romance_maintenance.evidence}
                categorySlug={categorySlug}
              />
            )}
        </div>
      )}

      {/* 12. Playfulness Gaps */}
      {content.playfulness_gaps && content.playfulness_gaps.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Ways to Add More Fun
            </h4>
          </div>

          <div className="space-y-3">
            {content.playfulness_gaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <p className="font-semibold text-sm md:text-base text-gray-900 mb-2">
                  {gap.gap}
                </p>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {gap.suggestion}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 13. Best Playful Moments */}
      {content.best_moments && content.best_moments.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
            <span>✨</span>
            <span>Your Best Playful Moments</span>
          </h4>

          {content.best_moments.map((moment, idx) => (
            <div
              key={idx}
              className="bg-linear-to-br from-yellow-50 via-pink-50 to-purple-50 rounded-xl p-4 md:p-6 border-2 border-yellow-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-pink-400 flex items-center justify-center text-white shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                    {moment.moment_title}
                  </h5>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
                    {moment.why_special}
                  </p>
                </div>
              </div>

              {/* Exchange */}
              {moment.exchange && moment.exchange.length > 0 && (
                <div className="bg-white rounded-lg p-4 space-y-3">
                  {moment.exchange.map((msg, msgIdx) => (
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

      {/* 14. Recommendations */}
      {content.recommendations && content.recommendations.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
            <span>🎯</span>
            <span>Keep the Spark Alive</span>
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
                    <Sparkles
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

                {/* Examples */}
                {rec.examples && rec.examples.length > 0 && (
                  <div className="p-4 bg-linear-to-br from-yellow-50 to-pink-50 rounded-lg border-2 border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-700 uppercase mb-3">
                      😄 Try These
                    </p>
                    <div className="space-y-2">
                      {rec.examples.map((example, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3 bg-white rounded-lg border border-yellow-200"
                        >
                          <p className="text-sm italic text-gray-800 leading-relaxed">
                            {example}
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
