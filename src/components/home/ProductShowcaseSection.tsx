"use client";

import {
  BarChart3,
  Heart,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function ProductShowcaseSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        {/* <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 rounded-full border border-purple-200 mb-4 md:mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-purple-600">
              AI-Powered Analysis
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Discover Your Relationship Dynamics
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your chat and unlock comprehensive insights powered by AI
          </p>
        </div> */}

        {/* Desktop: Phone mockup with floating cards */}
        <div className="relative w-full h-[600px] hidden lg:flex items-center justify-center">
          {/* Central phone mockup */}
          <div className="relative z-10">
            <div className="relative w-[280px] bg-white rounded-[2.5rem] shadow-2xl border-[8px] border-gray-800 overflow-hidden">
              {/* Status bar */}
              <div className="bg-gray-800 h-6 flex items-center justify-center">
                <div className="w-20 h-1 bg-gray-700 rounded-full" />
              </div>

              {/* WhatsApp header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-300" />
                <div>
                  <div className="text-white font-semibold text-sm">Sarah</div>
                  <div className="text-white/70 text-xs">online</div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="bg-[#ECE5DD] h-[480px] p-4 space-y-3 overflow-hidden">
                <div className="bg-white rounded-lg rounded-tl-sm p-3 max-w-[180px] shadow-sm">
                  <p className="text-sm text-gray-700">
                    Hey! How was your day? 😊
                  </p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm p-3 max-w-[180px] ml-auto shadow-sm">
                  <p className="text-sm text-gray-700">Amazing! Miss you ❤️</p>
                </div>
                <div className="bg-white rounded-lg rounded-tl-sm p-3 max-w-[180px] shadow-sm">
                  <p className="text-sm text-gray-700">
                    Can&apos;t wait to see you tonight! 💕
                  </p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm p-3 max-w-[180px] ml-auto shadow-sm">
                  <p className="text-sm text-gray-700">Me too! 🥰</p>
                </div>
                <div className="bg-white rounded-lg rounded-tl-sm p-3 max-w-[180px] shadow-sm">
                  <p className="text-sm text-gray-700">
                    Love talking to you 💕
                  </p>
                </div>
                <div className="bg-[#DCF8C6] rounded-lg rounded-tr-sm p-3 max-w-[180px] ml-auto shadow-sm">
                  <p className="text-sm text-gray-700">Same here! ❤️😊</p>
                </div>
              </div>
            </div>

            {/* Phone glow */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-[2.5rem] blur-2xl" />
            </div>
          </div>

          {/* Floating card 1 - Top Left (Message Balance) - Slight overlap */}
          <div className="absolute top-[15%] left-[18%] animate-float z-20 -rotate-6">
            <div className="w-56 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Message Balance
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">You</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "52%" }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      52%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Sarah</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "48%" }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      48%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card 2 - Top Right (Emotional Intimacy Score) - Floating nearby */}
          <div
            className="absolute top-[8%] right-[8%] animate-float z-20 rotate-6"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-48 bg-gradient-to-br from-primary to-accent-pink rounded-xl shadow-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-xs font-semibold text-white">
                  Emotional Intimacy
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">8/10</div>
              <div className="text-white/90 text-xs">Deeply Connected</div>
            </div>
          </div>

          {/* Floating card 3 - Bottom Left (Activity Chart) - Floating nearby */}
          <div
            className="absolute bottom-[8%] left-[8%] animate-float z-20 -rotate-3"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="w-52 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Peak Hours
                </span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[30, 50, 40, 70, 90, 60, 45].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Most active: 8-10 PM
              </div>
            </div>
          </div>

          {/* Floating card 4 - Bottom Right (Love Language) - Slight overlap */}
          <div
            className="absolute bottom-[15%] right-[18%] animate-float z-20 rotate-3"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-52 bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Love Language
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                  <span className="text-xs text-gray-700">
                    Words of Affirmation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-xs text-gray-700">Quality Time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating card 5 - Middle Right (Stats Summary) - Floating nearby */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-[5%] animate-float z-20"
            style={{ animationDelay: "0.75s" }}
          >
            <div className="w-44 bg-white rounded-xl shadow-2xl border border-gray-100 p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-semibold text-gray-900">
                  Quick Stats
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold text-gray-900">8 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg/day</span>
                  <span className="font-semibold text-gray-900">42 msgs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response</span>
                  <span className="font-semibold text-green-600">Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10" />
          </div>
        </div>

        {/* Mobile: Phone as background with cards overlay */}
        <div className="relative lg:hidden px-4">
          <div className="relative h-[700px] flex items-center justify-center">
            {/* Phone mockup as background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-sm">
              <div className="w-[240px] bg-white rounded-[2rem] shadow-xl border-[6px] border-gray-800 overflow-hidden">
                <div className="bg-gray-800 h-5 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-700 rounded-full" />
                </div>
                <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-300" />
                  <div>
                    <div className="text-white font-semibold text-xs">
                      Sarah
                    </div>
                    <div className="text-white/70 text-[10px]">online</div>
                  </div>
                </div>
                <div className="bg-[#ECE5DD] h-[400px] p-3 space-y-2">
                  <div className="bg-white rounded-lg p-2 max-w-[140px] shadow-sm">
                    <p className="text-xs text-gray-700">Hey! 😊</p>
                  </div>
                  <div className="bg-[#DCF8C6] rounded-lg p-2 max-w-[140px] ml-auto shadow-sm">
                    <p className="text-xs text-gray-700">Hi! ❤️</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards grid overlaying the phone */}
            <div className="relative z-10 w-full max-w-sm grid grid-cols-2 gap-3">
              {/* Card 1 - Message Balance */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">
                    Balance
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "52%" }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold">52%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "48%" }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold">48%</span>
                  </div>
                </div>
              </div>

              {/* Card 2 - Emotional Intimacy */}
              <div className="bg-gradient-to-br from-primary to-accent-pink rounded-xl shadow-lg p-3">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Heart className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-semibold text-white">
                    Intimacy
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-0.5">8/10</div>
                <div className="text-white/90 text-[10px]">
                  Deeply Connected
                </div>
              </div>

              {/* Card 3 - Peak Hours */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">
                    Peak Hours
                  </span>
                </div>
                <div className="flex items-end gap-0.5 h-10">
                  {[30, 50, 40, 70, 90, 60, 45].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-linear-to-t from-green-500 to-emerald-400 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Card 4 - Love Language */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  </div>
                  <span className="text-xs font-semibold text-gray-900">
                    Love Language
                  </span>
                </div>
                <div className="space-y-1.5 text-[10px] text-gray-700">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span>Words of Affirmation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Quality Time</span>
                  </div>
                </div>
              </div>

              {/* Card 5 - Quick Stats (full width) */}
              <div className="col-span-2 bg-white rounded-xl shadow-lg border border-gray-100 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-semibold text-gray-900">
                    Quick Stats
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-[10px]">
                  <div>
                    <div className="text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">8 months</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Avg/day</div>
                    <div className="font-semibold text-gray-900">42 msgs</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Response</div>
                    <div className="font-semibold text-green-600">Fast</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
