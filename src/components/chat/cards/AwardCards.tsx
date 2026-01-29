import React, { forwardRef } from "react";
import BaseCard from "./BaseCard";
import type {
  EmotionalIntimacyContent,
  ConflictResolutionContent,
  FuturePlanningContent,
  PlayfulnessRomanceContent,
  LoveLanguageContent,
} from "@/src/features/insights/types";

// Emotional Supporter Award
export const EmotionalSupporterCard = forwardRef<
  HTMLDivElement,
  { content: EmotionalIntimacyContent }
>(({ content }, ref) => {
  // Null check for content structure
  if (!content?.support?.participants || content.support.participants.length === 0) {
    return (
      <div ref={ref}>
        <BaseCard pattern="circles" bgColor="bg-pink-600">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-xs opacity-75">Data not available</p>
          </div>
        </BaseCard>
      </div>
    );
  }

  // Find the participant with highest support level
  const topSupporter = content.support.participants.reduce((prev, curr) => {
    return curr.description.length > prev.description.length ? curr : prev;
  });

  return (
    <div ref={ref}>
      <BaseCard pattern="circles" bgColor="bg-pink-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              THE EMOTIONAL SUPPORTER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topSupporter.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-90 leading-relaxed line-clamp-2">
                {topSupporter.support_style}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium line-clamp-3">
              {topSupporter.description}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

EmotionalSupporterCard.displayName = "EmotionalSupporterCard";

// Conflict Resolver Award
export const ConflictResolverCard = forwardRef<
  HTMLDivElement,
  { content: ConflictResolutionContent }
>(({ content }, ref) => {
  // Null check for content structure
  if (!content?.individual_styles?.participants || content.individual_styles.participants.length === 0) {
    return (
      <div ref={ref}>
        <BaseCard pattern="diagonal" bgColor="bg-indigo-600">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-xs opacity-75">Data not available</p>
          </div>
        </BaseCard>
      </div>
    );
  }

  // Find participant with best conflict style
  const topResolver = content.individual_styles.participants.reduce(
    (prev, curr) => {
      const constructiveStyles = [
        "collaborative",
        "constructive",
        "diplomatic",
        "mature",
      ];
      const prevScore = constructiveStyles.some((s) =>
        prev.style.toLowerCase().includes(s)
      )
        ? 1
        : 0;
      const currScore = constructiveStyles.some((s) =>
        curr.style.toLowerCase().includes(s)
      )
        ? 1
        : 0;
      return currScore > prevScore ? curr : prev;
    }
  );

  return (
    <div ref={ref}>
      <BaseCard pattern="diagonal" bgColor="bg-indigo-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              THE CONFLICT RESOLVER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topResolver.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-90 leading-relaxed capitalize line-clamp-2">
                {topResolver.style}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium line-clamp-3">
              {topResolver.description}
            </p>
            {content.overall && (
              <p className="text-[9px] font-bold mt-1">
                Score: {content.overall.score}/10
              </p>
            )}
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

ConflictResolverCard.displayName = "ConflictResolverCard";

// Future Planner Award
export const FuturePlannerCard = forwardRef<
  HTMLDivElement,
  { content: FuturePlanningContent }
>(({ content }, ref) => {
  // Null check
  if (!content?.planning_styles?.participants || content.planning_styles.participants.length === 0) {
    return (
      <div ref={ref}>
        <BaseCard pattern="grid" bgColor="bg-emerald-600">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-xs opacity-75">Data not available</p>
          </div>
        </BaseCard>
      </div>
    );
  }

  // Find the initiator of planning (most active planner)
  const topPlanner = content.planning_styles.participants[0];

  return (
    <div ref={ref}>
      <BaseCard pattern="grid" bgColor="bg-emerald-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              THE FUTURE PLANNER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topPlanner.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-90 leading-relaxed line-clamp-2">
                {topPlanner.style}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium line-clamp-3">
              {topPlanner.description}
            </p>
            <p className="text-[9px] font-bold mt-1">
              Score: {content.overall?.score || 0}/10
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

FuturePlannerCard.displayName = "FuturePlannerCard";

// Romantic Spark Award
export const RomanticSparkCard = forwardRef<
  HTMLDivElement,
  { content: PlayfulnessRomanceContent }
>(({ content }, ref) => {
  // Null check
  if (!content?.flirtation?.participants || content.flirtation.participants.length === 0) {
    return (
      <div ref={ref}>
        <BaseCard pattern="waves" bgColor="bg-fuchsia-600">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-xs opacity-75">Data not available</p>
          </div>
        </BaseCard>
      </div>
    );
  }

  const sparkScore = content.overall?.score || 0;
  // Find the most frequent flirter
  const topPlayful = content.flirtation.participants.reduce((prev, curr) => {
    const freqOrder = ["very_frequent", "frequent", "moderate", "occasional", "rare"];
    const prevIndex = freqOrder.indexOf(prev.frequency);
    const currIndex = freqOrder.indexOf(curr.frequency);
    return currIndex < prevIndex ? curr : prev;
  });

  return (
    <div ref={ref}>
      <BaseCard pattern="waves" bgColor="bg-fuchsia-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              THE ROMANTIC SPARK
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topPlayful.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-90 leading-relaxed capitalize line-clamp-2">
                {topPlayful.style}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium line-clamp-3">
              {content.overall?.spark_status || "Keeps the romance alive"}
            </p>
            <p className="text-[9px] font-bold mt-1">
              Score: {sparkScore}/10
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

RomanticSparkCard.displayName = "RomanticSparkCard";

// Love Language Master Award
export const LoveLanguageMasterCard = forwardRef<
  HTMLDivElement,
  { content: LoveLanguageContent }
>(({ content }, ref) => {
  // Null check
  if (!content?.primary_languages?.participants || content.primary_languages.participants.length === 0) {
    return (
      <div ref={ref}>
        <BaseCard pattern="dots" bgColor="bg-violet-600">
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-xs opacity-75">Data not available</p>
          </div>
        </BaseCard>
      </div>
    );
  }

  // Find participant with highest confidence
  const topLover = content.primary_languages.participants.reduce((prev, curr) => {
    const confidenceLevels = ["very_high", "high", "moderate", "low"];
    const prevIndex = confidenceLevels.indexOf(prev.confidence);
    const currIndex = confidenceLevels.indexOf(curr.confidence);
    return currIndex < prevIndex ? curr : prev;
  });

  return (
    <div ref={ref}>
      <BaseCard pattern="dots" bgColor="bg-violet-600">
        <div className="flex-1 flex flex-col justify-between py-2">
          {/* Title */}
          <div className="text-center">
            <h3 className="text-xs font-black tracking-wider mb-0.5 border-b border-white/40 pb-0.5 inline-block">
              LOVE LANGUAGE MASTER
            </h3>
          </div>

          {/* Winner name */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="text-xl font-black mb-2 leading-tight break-words hyphens-auto" style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                {topLover.name.toUpperCase()}
              </div>
              <p className="text-[10px] italic opacity-90 leading-relaxed capitalize line-clamp-2">
                {topLover.language.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          {/* Supporting stat */}
          <div className="text-center px-4">
            <p className="text-[8px] opacity-75 font-medium line-clamp-3">
              {topLover.description}
            </p>
            <p className="text-[9px] font-bold mt-1">
              Score: {content.overall?.score || 0}/10
            </p>
          </div>
        </div>
      </BaseCard>
    </div>
  );
});

LoveLanguageMasterCard.displayName = "LoveLanguageMasterCard";
