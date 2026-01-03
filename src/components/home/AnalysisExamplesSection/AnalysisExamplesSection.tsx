"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import CommunicationBasicsView from "@/src/components/chat/insights/views/CommunicationBasicsView";
import EmotionalIntimacyView from "@/src/components/chat/insights/views/EmotionalIntimacyView";
import ConflictResolutionView from "@/src/components/chat/insights/views/ConflictResolutionView";
import LoveLanguageView from "@/src/components/chat/insights/views/LoveLanguageView";
import FuturePlanningView from "@/src/components/chat/insights/views/FuturePlanningView";
import PlayfulnessRomanceView from "@/src/components/chat/insights/views/PlayfulnessRomanceView";
import {
  dummyCommunicationBasics,
  dummyEmotionalIntimacy,
  dummyConflictResolution,
  dummyLoveLanguage,
  dummyFuturePlanning,
  dummyPlayfulnessRomance,
} from "./dummyData";

const INSIGHT_CATEGORIES = [
  {
    id: "conflict_resolution",
    name: "Conflict & Communication",
    icon: "⚖️",
    description:
      "Understand how you handle disagreements, stress, and difficult conversations - and learn to fight fair.",
    tags: ["Conflict Styles", "Repair Patterns", "Stress Response"],
    component: (
      <ConflictResolutionView
        content={dummyConflictResolution}
        categorySlug="romantic"
      />
    ),
  },
  {
    id: "future_planning",
    name: "Future Planning",
    icon: "🗓️",
    description:
      "Explore shared dreams, life goals, and how aligned you are on the path forward together.",
    tags: ["Shared Vision", "Planning Styles", "Life Goals"],
    component: (
      <FuturePlanningView
        content={dummyFuturePlanning}
        categorySlug="romantic"
      />
    ),
  },
  {
    id: "playfulness_romance",
    name: "Playfulness & Romance",
    icon: "✨",
    description:
      "Discover your humor styles, inside jokes, and how you keep the spark alive in everyday moments.",
    tags: ["Humor Styles", "Flirtation", "Inside Jokes"],
    component: (
      <PlayfulnessRomanceView
        content={dummyPlayfulnessRomance}
        categorySlug="romantic"
      />
    ),
  },
];

export default function AnalysisExamplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? INSIGHT_CATEGORIES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === INSIGHT_CATEGORIES.length - 1 ? 0 : prev + 1
    );
  };

  const activeCategory = INSIGHT_CATEGORIES[activeIndex];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50/30 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 rounded-full border border-purple-200 mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-purple-600">
              Sample Insights
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            See What You&apos;ll Discover
          </h2>
          {/* <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Real examples of AI-powered insights from romantic relationship
            analysis
          </p> */}
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-3 gap-3 min-w-max md:min-w-0">
            {INSIGHT_CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveIndex(index)}
                className={`
                  flex-shrink-0 md:flex-shrink
                  px-4 py-3 rounded-lg border-2 transition-all
                  text-left
                  ${
                    activeIndex === index
                      ? "border-purple-600 bg-purple-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{category.icon}</span>
                  <span
                    className={`text-xs md:text-sm font-semibold ${
                      activeIndex === index
                        ? "text-purple-900"
                        : "text-gray-700"
                    }`}
                  >
                    {category.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Panel - Category Info (Shows on top on mobile) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-2 border-gray-100 lg:sticky lg:top-4">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-pink flex items-center justify-center text-2xl">
                  {activeCategory.icon}
                </div> */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {activeCategory.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {activeCategory.description}
              </p>

              {/* Tags */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                  What You&apos;ll Discover
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeCategory.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  aria-label="Previous category"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-xs text-gray-500">
                  {activeIndex + 1} / {INSIGHT_CATEGORIES.length}
                </span>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  aria-label="Next category"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-8 xl:col-span-9 min-w-0">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
              {/* Scrollable Content Area */}
              <div className="max-h-[600px] overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-gray-50">
                {/* Render actual view component */}
                {activeCategory.component}
              </div>

              {/* Bottom CTA */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 md:px-6 py-4 border-t-2 border-gray-100">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Want insights like this for your relationship?
                    </p>
                    <p className="text-xs text-gray-600">
                      Upload your chat and unlock detailed romantic insights
                    </p>
                  </div>
                  <a
                    href="/pricing"
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-primary to-accent-pink text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-shadow text-center whitespace-nowrap"
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
