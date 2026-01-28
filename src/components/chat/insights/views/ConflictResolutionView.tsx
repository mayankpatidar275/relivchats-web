"use client";

import {
  ConflictResolutionContent,
  ConflictEvidence,
} from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import {
  Shield,
  AlertTriangle,
  Users,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import MaturityScoreCard from "../MaturityScoreCard";
import ConflictStyleBadge from "../ConflictStyleBadge";

interface ConflictResolutionViewProps {
  content: ConflictResolutionContent;
  categorySlug?: string;
}

// Helper component to render evidence items
function EvidenceItem({ evidence }: { evidence: ConflictEvidence }) {
  return (
    <div className="p-3 bg-white rounded-lg border border-gray-200">
      {evidence.context && (
        <p className="text-xs text-gray-600 mb-2 italic">{evidence.context}</p>
      )}
      <div className="space-y-1">
        {evidence.exchange.map((msg, idx) => (
          <div key={idx} className="text-xs md:text-sm">
            <span className="font-semibold text-gray-900">{msg.speaker}:</span>{" "}
            <span className="text-gray-700">{msg.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConflictResolutionView({
  content,
  categorySlug,
}: ConflictResolutionViewProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      {/* 1. Overall Maturity Score */}
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
      />

      {/* 2. Conflict Presence */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Conflict Overview
          </h4>
        </div>

        <div
          className={`p-4 rounded-lg border-2 ${
            content.conflict_presence.visible_conflicts
              ? "bg-amber-50 border-amber-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            {content.conflict_presence.visible_conflicts ? (
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {content.conflict_presence.visible_conflicts
                  ? "Conflicts Detected"
                  : "Harmonious Communication"}
              </p>
              <p className="text-xs text-gray-600">
                Frequency:{" "}
                <span className="font-medium">
                  {content.conflict_presence.frequency}
                </span>
              </p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.conflict_presence.assessment}
          </p>
        </div>
      </div>

      {/* 3. Conflict Triggers */}
      {content.conflict_triggers.length > 0 && (
        <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
            <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
              What Sparks Tension
            </h4>
          </div>

          <div className="space-y-4">
            {content.conflict_triggers.map((trigger, idx) => (
              <div
                key={idx}
                className="p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-base">⚡</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                      {trigger.trigger_type}
                    </p>
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                      {trigger.description}
                    </p>
                  </div>
                </div>

                {trigger.evidence && trigger.evidence.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs font-semibold text-orange-700 uppercase mb-2">
                      Evidence
                    </p>
                    {trigger.evidence.map((ev, exIdx) => (
                      <EvidenceItem key={exIdx} evidence={ev} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Individual Conflict Styles */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            How You Each Handle Conflict
          </h4>
        </div>

        <div className="space-y-4">
          {content.individual_styles.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                  >
                    {p.name[0]}
                  </div>
                  <span className="font-semibold text-sm md:text-base text-gray-900">
                    {p.name}
                  </span>
                </div>
                <ConflictStyleBadge
                  style={p.style}
                  intensity={p.intensity}
                  size="sm"
                />
              </div>

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
                {p.description}
              </p>

              {p.evidence && p.evidence.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase">
                    Evidence
                  </p>
                  {p.evidence.map((ev, exIdx) => (
                    <EvidenceItem key={exIdx} evidence={ev} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Stress Communication */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Communication Under Stress
          </h4>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
            {content.stress_communication.pattern_description}
          </p>
          <div className="pt-3 border-t border-blue-300">
            <p className="text-xs font-medium text-blue-700 mb-2">
              Who Initiates Difficult Conversations?
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {content.stress_communication.initiator}
            </p>
          </div>
        </div>

        {content.stress_communication.changes.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
              Observed Changes
            </p>
            <div className="flex flex-wrap gap-2">
              {content.stress_communication.changes.map((change, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 bg-white rounded-full text-gray-700 border border-gray-300"
                >
                  {change}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 6. Repair & Recovery */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Making Up & Moving Forward
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {/* Strategies */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-semibold text-green-700 uppercase mb-2">
              Repair Strategies
            </p>
            <div className="space-y-1">
              {content.repair_recovery.strategies.map((strategy, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-green-600 text-xs mt-0.5">✓</span>
                  <span className="text-sm text-gray-800">{strategy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Initiator */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-semibold text-purple-700 uppercase mb-2">
              Who Reaches Out
            </p>
            <p className="text-sm font-medium text-gray-900">
              {content.repair_recovery.initiator}
            </p>
          </div>

          {/* Timeframe */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-700 uppercase mb-2">
              Timeframe
            </p>
            <p className="text-sm font-medium text-gray-900">
              {content.repair_recovery.timeframe}
            </p>
          </div>
        </div>

        {/* Effectiveness */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
          <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
            📊 Effectiveness
          </p>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.repair_recovery.effectiveness}
          </p>
        </div>

        {/* Evidence */}
        {content.repair_recovery.evidence &&
          content.repair_recovery.evidence.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-600 uppercase">
                Repair in Action
              </p>
              {content.repair_recovery.evidence.map((ev, idx) => (
                <EvidenceItem key={idx} evidence={ev} />
              ))}
            </div>
          )}
      </div>

      {/* 7. Positive Behaviors */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 text-green-600`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            What You Do Well
          </h4>
        </div>

        <div className="space-y-4">
          {content.positive_behaviors.map((behavior, idx) => (
            <div
              key={idx}
              className="p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-lg">✨</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm md:text-base text-gray-900 mb-1">
                    {behavior.behavior}
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {behavior.description}
                  </p>
                </div>
              </div>

              {behavior.evidence && behavior.evidence.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-green-700 uppercase">
                    Evidence
                  </p>
                  {behavior.evidence.map((ev, exIdx) => (
                    <EvidenceItem key={exIdx} evidence={ev} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 8. Destructive Patterns (if any) */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          {content.destructive_patterns.present ? (
            <XCircle className={`w-4 h-4 md:w-5 md:h-5 text-red-600`} />
          ) : (
            <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 text-green-600`} />
          )}
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            {content.destructive_patterns.present
              ? "Patterns to Watch"
              : "Healthy Conflict Habits"}
          </h4>
        </div>

        <div
          className={`p-4 rounded-lg border-2 mb-4 ${
            content.destructive_patterns.present
              ? "bg-red-50 border-red-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.destructive_patterns.assessment}
          </p>
        </div>

        {content.destructive_patterns.patterns &&
          content.destructive_patterns.patterns.length > 0 && (
            <div className="space-y-3">
              {content.destructive_patterns.patterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    pattern.severity.toLowerCase().includes("high")
                      ? "bg-red-100 border-red-300"
                      : pattern.severity.toLowerCase().includes("moderate")
                        ? "bg-orange-100 border-orange-300"
                        : "bg-yellow-100 border-yellow-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-sm md:text-base text-gray-900">
                      {pattern.pattern_type}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        pattern.severity.toLowerCase().includes("high")
                          ? "bg-red-200 text-red-800"
                          : pattern.severity.toLowerCase().includes("moderate")
                            ? "bg-orange-200 text-orange-800"
                            : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {pattern.severity}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3">
                    {pattern.description}
                  </p>

                  {pattern.evidence && pattern.evidence.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-700 uppercase">
                        Evidence
                      </p>
                      {pattern.evidence.map((ev, exIdx) => (
                        <EvidenceItem key={exIdx} evidence={ev} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
      </div>

      {/* 9. Stress Support */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Supporting Each Other Through Stress
          </h4>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.stress_support.analysis}
          </p>
        </div>

        {content.stress_support.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Support Evidence
            </p>
            {content.stress_support.evidence.map((ev, idx) => (
              <EvidenceItem key={idx} evidence={ev} />
            ))}
          </div>
        )}
      </div>

      {/* 10. Recommendations */}
      <div className="space-y-4">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
          <span>🎯</span>
          <span>Fight Fairer, Love Stronger</span>
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
                  <Shield className={`w-5 h-5 md:w-6 md:h-6 ${theme.text}`} />
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
                    💡 Suggestion
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {rec.suggestion}
                  </p>
                </div>

                {/* Example phrases */}
                {rec.example_phrases.length > 0 && (
                  <div className="p-4 bg-linear-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200 min-w-0">
                    <p className="text-xs font-semibold text-green-700 uppercase mb-3">
                      💬 Try These Phrases
                    </p>
                    <div className="space-y-2 min-w-0">
                      {rec.example_phrases.map((phrase, phIdx) => (
                        <div
                          key={phIdx}
                          className="p-3 bg-white rounded-lg border border-green-200 min-w-0"
                        >
                          <p className="text-sm italic text-gray-800 leading-relaxed wrap-break-word">
                            &quot;{phrase}&quot;
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
