"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Card preview component
const CardPreview = ({ color, title }: { color: string; title: string }) => (
  <div
    className={`${color} rounded-lg p-3 text-white flex flex-col items-center justify-center aspect-[9/16] shadow-md`}
  >
    <div className="text-[8px] font-black mb-1 border-b border-white/40 pb-0.5 px-2">
      {title}
    </div>
  </div>
);

const STAT_SLIDES = [
  {
    id: "cards",
    component: (
      <div className="space-y-3">
        <div className="relative bg-white rounded-xl p-4 border border-gray-200">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">
            FREE
          </span>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-3">
            <CardPreview color="bg-purple-600" title="TOTAL MESSAGES" />
            <CardPreview color="bg-blue-600" title="PEAK HOUR" />
            <CardPreview color="bg-orange-600" title="TOP EMOJI" />
            <CardPreview color="bg-teal-600" title="FIRST MESSAGE" />
            <CardPreview color="bg-indigo-600" title="BALANCE" />
            <CardPreview color="bg-red-600" title="CONV. STARTER" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            <CardPreview color="bg-blue-500" title="TOP WEBSITE" />
            <CardPreview color="bg-pink-500" title="FAV EMOJIS" />
            <CardPreview color="bg-purple-500" title="ACTIVE DAY" />
            <CardPreview color="bg-amber-600" title="EARLY BIRD" />
            <CardPreview color="bg-cyan-600" title="SPEED TEXTER" />
            <CardPreview color="bg-green-600" title="QUESTION MASTER" />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "overview",
    component: (
      <div className="space-y-3">
        <div className="relative">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded z-10">
            FREE
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">Total Messages</div>
              <div className="text-3xl font-black mb-1">2,547</div>
              <div className="text-xs opacity-90">127 days</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">Total Words</div>
              <div className="text-3xl font-black mb-1">45.9K</div>
              <div className="text-xs opacity-90">361/day avg</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">Peak Hour</div>
              <div className="text-3xl font-black mb-1">9 PM</div>
              <div className="text-xs opacity-90">Most active</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <div className="text-xs opacity-80 mb-1">Busiest Day</div>
              <div className="text-3xl font-black mb-1">Friday</div>
              <div className="text-xs opacity-90">542 messages</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "participants",
    component: (
      <div className="space-y-3">
        <div className="relative space-y-3">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded z-10">
            FREE
          </span>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-base font-bold text-gray-900">Sarah</h4>
                <p className="text-xs text-gray-500">52% of conversation</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-purple-600">1,324</div>
                <div className="text-xs text-gray-500">messages</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                <div className="text-xs text-gray-600 mb-0.5">Words</div>
                <div className="text-sm font-bold text-purple-600">23.8K</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                <div className="text-xs text-gray-600 mb-0.5">Peak Hour</div>
                <div className="text-sm font-bold text-blue-600">9 PM</div>
              </div>
              <div className="bg-pink-50 rounded-lg p-2 border border-pink-100">
                <div className="text-xs text-gray-600 mb-0.5">Top Emoji</div>
                <div className="text-sm font-bold">😂 125×</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-base font-bold text-gray-900">Mike</h4>
                <p className="text-xs text-gray-500">48% of conversation</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-blue-600">1,223</div>
                <div className="text-xs text-gray-500">messages</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-purple-50 rounded-lg p-2 border border-purple-100">
                <div className="text-xs text-gray-600 mb-0.5">Words</div>
                <div className="text-sm font-bold text-purple-600">22.1K</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                <div className="text-xs text-gray-600 mb-0.5">Peak Hour</div>
                <div className="text-sm font-bold text-blue-600">8 PM</div>
              </div>
              <div className="bg-pink-50 rounded-lg p-2 border border-pink-100">
                <div className="text-xs text-gray-600 mb-0.5">Top Emoji</div>
                <div className="text-sm font-bold">❤️ 98×</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "activity",
    component: (
      <div className="space-y-3">
        <div className="relative bg-white rounded-xl p-4 border border-gray-200">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded z-10">
            FREE
          </span>
          <h4 className="text-sm font-bold text-gray-900 mb-3">Hourly Distribution</h4>
          <div className="space-y-2">
            {[
              { hour: "Morning (6AM-12PM)", percent: 15, color: "bg-blue-400" },
              { hour: "Afternoon (12PM-5PM)", percent: 25, color: "bg-purple-400" },
              { hour: "Evening (5PM-9PM)", percent: 45, color: "bg-pink-500" },
              { hour: "Night (9PM-12AM)", percent: 12, color: "bg-orange-400" },
              { hour: "Late Night (12AM-6AM)", percent: 3, color: "bg-gray-300" },
            ].map((slot, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{slot.hour}</span>
                  <span className="font-bold">{slot.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${slot.color} h-full rounded-full transition-all`}
                    style={{ width: `${slot.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "words_emojis",
    component: (
      <div className="space-y-3">
        <div className="relative bg-white rounded-xl p-4 border border-gray-200">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded z-10">
            FREE
          </span>
          <h4 className="text-sm font-bold text-gray-900 mb-3">Top Words</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { word: "love", size: "text-xl" },
              { word: "yeah", size: "text-lg" },
              { word: "today", size: "text-base" },
              { word: "work", size: "text-base" },
              { word: "really", size: "text-sm" },
              { word: "think", size: "text-sm" },
              { word: "good", size: "text-sm" },
              { word: "time", size: "text-xs" },
            ].map((item, idx) => (
              <span
                key={idx}
                className={`${item.size} font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200`}
              >
                {item.word}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <h4 className="text-sm font-bold text-gray-900 mb-3">Top Emojis</h4>
          <div className="grid grid-cols-5 gap-2">
            {[
              { emoji: "😂", count: 342 },
              { emoji: "❤️", count: 289 },
              { emoji: "😊", count: 234 },
              { emoji: "🤣", count: 198 },
              { emoji: "😍", count: 176 },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-purple-600">{item.count}×</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function StatsExamplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STAT_SLIDES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? STAT_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % STAT_SLIDES.length);
  };

  return (
    <div className="space-y-4">
      {/* Slides with Navigation */}
      <div className="relative">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg min-h-[400px]">
          <div className="transition-opacity duration-300">
            {STAT_SLIDES[activeIndex].component}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white border-2 border-gray-200 shadow-md transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white border-2 border-gray-200 shadow-md transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {STAT_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex
                ? "bg-purple-600 w-8"
                : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
