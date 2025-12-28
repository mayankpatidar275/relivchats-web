"use client";

import { EmotionalIntimacyContent } from "@/src/features/insights/types";
import { useCategoryTheme } from "@/src/lib/theme";
import {
  Heart,
  Shield,
  Palette,
  TrendingUp,
  MessageCircleHeart,
} from "lucide-react";
import IntimacyScoreCard from "../IntimacyScoreCard";
import VulnerabilityLevelBadge from "../VulnerabilityLevelBadge";
import FrequencyIndicator from "../FrequencyIndicator";
import ConversationExchange from "../ConversationExchange";
import EvidencePanel from "../EvidencePanel";
import GrowthOpportunityCard from "../GrowthOpportunityCard";

interface EmotionalIntimacyViewProps {
  content: EmotionalIntimacyContent;
  categorySlug?: string;
}

export default function EmotionalIntimacyView({
  content,
  categorySlug,
}: EmotionalIntimacyViewProps) {
  const theme = useCategoryTheme(categorySlug);

  return (
    <div className="space-y-6">
      {/* 1. Overall Intimacy Score - Hero */}
      <IntimacyScoreCard
        score={content.overall.score}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rating={content.overall.rating as any}
        summary={content.overall.summary}
      />

      {/* 2. Vulnerability Expression */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Shield className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Emotional Openness
          </h4>
        </div>

        <div className="space-y-4 mb-4">
          {content.vuln.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="font-semibold text-sm md:text-base text-gray-900">
                  {p.name}
                </span>
                <VulnerabilityLevelBadge
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  level={p.vulnerability_level as any}
                  size="sm"
                />
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

        <div className="p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.vuln.balance_note}
          </p>
        </div>
      </div>

      {/* 3. Emotional Support Patterns */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            How You Support Each Other
          </h4>
        </div>

        {/* Support styles */}
        <div className="grid grid-cols-1 gap-3 mb-4">
          {content.support.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-full bg-linear-to-br ${theme.gradient} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                >
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm md:text-base text-gray-900 truncate">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Style:{" "}
                    <span className="font-medium">{p.support_style}</span>
                  </p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Reciprocity assessment */}
        <div className="p-3 md:p-4 bg-pink-50 rounded-lg border border-pink-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.support.reciprocity_assessment}
          </p>
        </div>

        {/* Evidence exchanges */}
        {content.support.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Real Examples of Support
            </p>
            {content.support.evidence.map((ev, idx) => (
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

      {/* 4. Affection Expression */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircleHeart
            className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`}
          />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            How You Show Love
          </h4>
        </div>

        <div className="space-y-4 mb-4">
          {content.affection.participants.map((p) => (
            <div
              key={p.name}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-sm md:text-base text-gray-900 mb-3">
                {p.name}
              </p>

              <FrequencyIndicator
                frequency={p.frequency}
                label="Affection Frequency"
              />

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-600 mb-2">
                  Expression Styles:
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.styles.map((style, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white rounded-full text-gray-700 border border-gray-200"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs md:text-sm text-gray-700 leading-relaxed mt-3">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 md:p-4 bg-pink-50 rounded-lg border border-pink-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.affection.comparison}
          </p>
        </div>

        {/* Affection evidence */}
        {content.affection.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Sweet Moments
            </p>
            {content.affection.evidence.map((ev, idx) => (
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

      {/* 5. Emotional Check-ins */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <Palette className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Checking In on Feelings
          </h4>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
          <FrequencyIndicator
            frequency={content.checkins.frequency}
            label="Check-in Frequency"
          />

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Who Initiates More?
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {content.checkins.initiator_balance}
            </p>
          </div>
        </div>

        <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.checkins.description}
          </p>
        </div>

        {content.checkins.evidence && content.checkins.evidence.length > 0 && (
          <EvidencePanel
            evidence={content.checkins.evidence}
            categorySlug={categorySlug}
          />
        )}
      </div>

      {/* 6. Conflict & Repair */}
      <div className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-4 h-4 md:w-5 md:h-5 ${theme.text}`} />
          <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900">
            Handling Disagreements
          </h4>
        </div>

        <div
          className={`p-4 rounded-lg border-2 mb-4 ${
            content.conflict.conflict_present
              ? "bg-amber-50 border-amber-200"
              : "bg-green-50 border-green-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">
              {content.conflict.conflict_present ? "⚠️" : "✅"}
            </span>
            <p className="text-xs font-semibold text-gray-700 uppercase">
              {content.conflict.conflict_present
                ? "Conflict Detected"
                : "Smooth Sailing"}
            </p>
          </div>
          <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
            {content.conflict.description}
          </p>
        </div>

        {content.conflict.repair_patterns &&
          content.conflict.repair_patterns.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">
                Repair Strategies
              </p>
              <div className="flex flex-wrap gap-2">
                {content.conflict.repair_patterns.map((pattern, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-300 font-medium"
                  >
                    {pattern}
                  </span>
                ))}
              </div>
            </div>
          )}

        {content.conflict.evidence && content.conflict.evidence.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-600 uppercase">
              Example Exchanges
            </p>
            {content.conflict.evidence.map((ev, idx) => (
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

      {/* 7. Intimacy Strengths */}
      <div className="space-y-4">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
          <span>✨</span>
          <span>Your Intimacy Superpowers</span>
        </h4>

        {content.strengths.map((strength, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 md:p-6 border-2 border-gray-100"
          >
            <h5 className="font-bold text-base md:text-lg text-gray-900 mb-2">
              {strength.title}
            </h5>
            <p className="text-xs md:text-sm text-gray-700 leading-relaxed mb-4">
              {strength.description}
            </p>
            <EvidencePanel
              evidence={strength.evidence}
              categorySlug={categorySlug}
              defaultExpanded={idx === 0}
            />
          </div>
        ))}
      </div>

      {/* 8. Growth Opportunities */}
      <div className="space-y-4">
        <h4 className="font-bold text-base md:text-lg lg:text-xl text-gray-900 flex items-center gap-2">
          <span>🎯</span>
          <span>Deepen Your Connection</span>
        </h4>

        <div className="space-y-3">
          {content.growth.map((opp, idx) => (
            <GrowthOpportunityCard
              key={idx}
              opportunity={{
                opportunity_title: opp.title,
                target_participants: opp.target,
                suggestion: opp.suggestion,
                why_it_helps: opp.why,
                conversation_starter: opp.starter,
              }}
              categorySlug={categorySlug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
