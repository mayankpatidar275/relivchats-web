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
      {/* 1. Overall Maturity Score with Frequency */}
      <MaturityScoreCard
        score={content.overall.score}
        summary={content.overall.summary}
        frequency={content.conflict_presence.frequency}
      />

      {/* 2. What Sparks Tension */}
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
              <div key={idx} className="space-y-3">
                <div className="flex items-start gap-2">
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
                  <div className="ml-6 space-y-2">
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

      {/* 3. How You Each Handle Conflict */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Users className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            How You Each Handle Conflict
          </h4>
        </div>

        <div className="space-y-4">
          {content.individual_styles.participants.map((p) => (
            <div key={p.name} className="space-y-3">
              <div className="flex items-start justify-between gap-3">
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

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                {p.description}
              </p>

              {p.evidence && p.evidence.length > 0 && (
                <div className="ml-12 space-y-2">
                  {p.evidence.map((ev, exIdx) => (
                    <EvidenceItem key={exIdx} evidence={ev} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Communication Under Stress */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Communication Under Stress
          </h4>
        </div>

        <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
          {content.stress_communication.pattern_description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-1">
              Who Initiates?
            </p>
            <p className="text-sm text-gray-900">
              {content.stress_communication.initiator}
            </p>
          </div>

          {content.stress_communication.changes.length > 0 && (
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-xs font-medium text-purple-700 mb-2">
                Observed Changes
              </p>
              <div className="flex flex-wrap gap-1">
                {content.stress_communication.changes.slice(0, 3).map((change, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-700 border border-purple-200"
                  >
                    {change}
                  </span>
                ))}
                {content.stress_communication.changes.length > 3 && (
                  <span className="text-xs px-2 py-0.5 text-gray-500">
                    +{content.stress_communication.changes.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Making Up & Moving Forward */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Making Up & Moving Forward
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-xs font-medium text-green-700 mb-2">
              Repair Strategies
            </p>
            <div className="space-y-1">
              {content.repair_recovery.strategies.slice(0, 3).map((strategy, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="text-green-600 text-xs mt-0.5">✓</span>
                  <span className="text-xs text-gray-800">{strategy}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-xs font-medium text-purple-700 mb-2">
              Who Reaches Out
            </p>
            <p className="text-sm text-gray-900">
              {content.repair_recovery.initiator}
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-700 mb-2">
              Timeframe
            </p>
            <p className="text-sm text-gray-900">
              {content.repair_recovery.timeframe}
            </p>
          </div>
        </div>

        <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
          {content.repair_recovery.effectiveness}
        </p>

        {content.repair_recovery.evidence &&
          content.repair_recovery.evidence.length > 0 && (
            <div className="space-y-2">
              {content.repair_recovery.evidence.map((ev, idx) => (
                <EvidenceItem key={idx} evidence={ev} />
              ))}
            </div>
          )}
      </div>

      {/* 6. What You Do Well */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 text-green-600`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            What You Do Well
          </h4>
        </div>

        <div className="space-y-4">
          {content.positive_behaviors.map((behavior, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-start gap-2">
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
                <div className="ml-6 space-y-2">
                  {behavior.evidence.map((ev, exIdx) => (
                    <EvidenceItem key={exIdx} evidence={ev} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. Patterns to Watch */}
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

        <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
          {content.destructive_patterns.assessment}
        </p>

        {content.destructive_patterns.patterns &&
          content.destructive_patterns.patterns.length > 0 && (
            <div className="space-y-4">
              {content.destructive_patterns.patterns.map((pattern, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-sm md:text-base text-gray-900">
                      {pattern.pattern_type}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${
                        pattern.severity.toLowerCase().includes("high")
                          ? "bg-red-100 text-red-800"
                          : pattern.severity.toLowerCase().includes("moderate")
                            ? "bg-orange-100 text-orange-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {pattern.severity}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {pattern.description}
                  </p>

                  {pattern.evidence && pattern.evidence.length > 0 && (
                    <div className="space-y-2">
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

      {/* 8. Supporting Each Other Through Stress */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Supporting Each Other Through Stress
          </h4>
        </div>

        <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
          {content.stress_support.analysis}
        </p>

        {content.stress_support.evidence.length > 0 && (
          <div className="space-y-2">
            {content.stress_support.evidence.map((ev, idx) => (
              <EvidenceItem key={idx} evidence={ev} />
            ))}
          </div>
        )}
      </div>

      {/* 9. Recommendations */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 mb-4 flex items-center gap-2">
          <span>🎯</span>
          <span>Fight Fairer, Love Stronger</span>
        </h4>

        <div className="space-y-4">
          {content.recommendations.map((rec, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h5 className="font-semibold text-sm md:text-base text-gray-900">
                  {rec.title}
                </h5>
                <div className="flex items-center gap-1 shrink-0">
                  {rec.target.map((participant, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-700 border border-blue-200"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                {rec.suggestion}
              </p>

              {rec.example_phrases.length > 0 && (
                <div className="pl-4 border-l-2 border-green-200 space-y-1">
                  {rec.example_phrases.map((phrase, phIdx) => (
                    <p
                      key={phIdx}
                      className="text-xs md:text-sm italic text-gray-600"
                    >
                      &quot;{phrase}&quot;
                    </p>
                  ))}
                </div>
              )}

              {idx < content.recommendations.length - 1 && (
                <div className="border-t border-gray-200 pt-3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
