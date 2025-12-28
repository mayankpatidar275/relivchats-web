"use client";

import { LoveLanguageContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import { Heart, Award, Sparkles, Users, AlertCircle, Star } from "lucide-react";
import LoveLanguageBadge from "../LoveLanguageBadge";
import ConfidenceMeter from "../ConfidenceMeter";
import EvidencePanel from "../EvidencePanel";
import ConversationExchange from "../ConversationExchange";

interface LoveLanguageViewProps {
  content: LoveLanguageContent;
  categorySlug?: string;
}

export default function LoveLanguageView({
  content,
  categorySlug,
}: LoveLanguageViewProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      {/* 1. Overall Score Hero */}
      <div className="bg-linear-to-br from-white via-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 border-2 border-pink-100">
        <div className="flex flex-col items-center">
          <div className="text-5xl md:text-6xl mb-4">💝</div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Love Language Score
          </h3>
          <div className="text-5xl md:text-6xl font-bold text-pink-600 mb-4">
            {content.overall.score}/10
          </div>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed text-center max-w-2xl">
            {content.overall.summary}
          </p>
        </div>
      </div>

      {/* 2. Primary Love Languages */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Primary Love Languages
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {content.primary_languages.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 md:p-5 bg-linear-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200"
            >
              {/* Header with name and badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm md:text-base font-bold shrink-0`}
                  >
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-base md:text-lg text-gray-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-600">Primary Language</p>
                  </div>
                </div>
                <LoveLanguageBadge language={p.language} size="md" />
              </div>

              {/* Confidence meter */}
              <div className="mb-4">
                <ConfidenceMeter confidence={p.confidence} />
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
                {p.description}
              </p>

              {/* Evidence */}
              <EvidencePanel
                evidence={p.evidence}
                categorySlug={categorySlug}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Secondary Love Languages */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Secondary Love Languages
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {content.secondary_languages.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="font-semibold text-sm md:text-base text-gray-900">
                  {p.name}
                </span>
                <LoveLanguageBadge language={p.language} size="sm" />
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
                {p.description}
              </p>
              <EvidencePanel
                evidence={p.evidence}
                categorySlug={categorySlug}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Appreciation Expression */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Award className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            How You Show Appreciation
          </h4>
        </div>

        <div className="grid grid-cols-1 gap-3 mb-4">
          {content.appreciation.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="font-semibold text-sm md:text-base text-gray-900">
                  {p.name}
                </p>
                <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-700 border border-gray-300 shrink-0">
                  {p.frequency}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                Style:{" "}
                <span className="font-medium text-gray-900">
                  {p.expression_style}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.appreciation.frequency_comparison}
          </p>
        </div>

        {/* Appreciation evidence */}
        {content.appreciation.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Examples of Appreciation
            </p>
            {content.appreciation.evidence.map((ev, idx) => (
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

      {/* 5. Recognition of Effort */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Recognizing Each Other&apos;s Efforts
          </h4>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
            {content.recognition.analysis}
          </p>
          <p className="text-xs font-medium text-purple-700">
            Balance: {content.recognition.balance}
          </p>
        </div>

        {content.recognition.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Recognition Examples
            </p>
            {content.recognition.evidence.map((ev, idx) => (
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

      {/* 6. Language Compatibility */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Love Language Compatibility
          </h4>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg border-2 border-pink-200 mb-3">
          <p className="text-xs font-semibold text-pink-700 uppercase mb-2">
            {content.compatibility.match_type}
          </p>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.compatibility.analysis}
          </p>
        </div>

        {content.compatibility.adaptation_evidence && (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              💜 Signs of Adaptation
            </p>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
              {content.compatibility.adaptation_evidence}
            </p>
          </div>
        )}
      </div>

      {/* 7. Missing Love Languages */}
      {content.missing_languages.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              Opportunities for Growth
            </h4>
          </div>

          <div className="space-y-3">
            {content.missing_languages.map((lang, idx) => (
              <div
                key={idx}
                className="p-4 bg-amber-50 rounded-lg border border-amber-200"
              >
                <div className="flex items-start gap-2 mb-2">
                  <LoveLanguageBadge language={lang.language} size="sm" />
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {lang.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. Beautiful Moments */}
      <div className="space-y-4">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
          <span>✨</span>
          <span>Perfect Love Language Moments</span>
        </h4>

        {content.beautiful_moments.map((moment, idx) => (
          <div
            key={idx}
            className="bg-linear-to-br from-pink-50 via-purple-50 to-pink-50 rounded-xl p-4 md:p-6 border-2 border-pink-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white shrink-0">
                <Star className="w-5 h-5 fill-white" />
              </div>
              <div className="flex-1">
                <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                  {moment.moment_title}
                </h5>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
                  {moment.description}
                </p>
              </div>
            </div>

            {/* Exchange */}
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
          </div>
        ))}
      </div>

      {/* 9. Recommendations */}
      <div className="space-y-4">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
          <span>💡</span>
          <span>Speak Their Love Language Better</span>
        </h4>

        <div className="space-y-3">
          {content.recommendations.map((rec, idx) => (
            <div
              key={idx}
              className={`p-4 md:p-5 rounded-xl border-2 ${
                theme.bg
              } ${theme.text.replace("text-", "border-")} bg-opacity-10`}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${theme.bg} flex items-center justify-center shrink-0`}
                >
                  <Heart className={`w-5 h-5 md:w-6 md:h-6 ${theme.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
                    {rec.title}
                  </h5>
                  {/* Target participants */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Users className="w-3 h-3 text-gray-500" />
                    {rec.target.map((participant, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-700 border border-gray-200"
                      >
                        {participant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Suggestion */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                    💬 Suggestion
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {rec.suggestion}
                  </p>
                </div>

                {/* Why it helps */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                    ✨ Why This Works
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {rec.why}
                  </p>
                </div>

                {/* Example messages */}
                {rec.example_messages.length > 0 && (
                  <div className="p-4 bg-linear-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200">
                    <p className="text-xs font-semibold text-pink-700 uppercase mb-3">
                      💝 Try Saying
                    </p>
                    <div className="space-y-2">
                      {rec.example_messages.map((example, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3 bg-white rounded-lg border border-pink-200"
                        >
                          <p className="text-sm italic text-gray-800 leading-relaxed">
                            &quot;{example}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
