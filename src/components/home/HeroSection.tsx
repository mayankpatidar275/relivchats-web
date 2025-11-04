"use client";

import {
  ArrowRight,
  Brain,
  Heart,
  MessageCircle,
  Sparkles,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  const handleGetStarted = () => {
    const element = document.getElementById("home-upload");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHow = () => {
    const element = document.getElementById("home-how");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-primary-light via-white to-accent-pink-light">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div
          className="absolute top-40 -right-20 w-72 h-72 bg-accent-pink rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-20 left-1/2 w-72 h-72 bg-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Floating icons decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-1/4 left-[10%] w-8 h-8 text-accent-pink opacity-20 animate-float" />
        <MessageCircle
          className="absolute top-1/3 right-[15%] w-10 h-10 text-primary opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <Sparkles
          className="absolute bottom-1/4 left-[20%] w-6 h-6 text-primary opacity-20 animate-float"
          style={{ animationDelay: "3s" }}
        />
        <Brain
          className="absolute top-1/2 right-[10%] w-7 h-7 text-accent-pink opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative mx-auto px-6 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary/20 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-xs md:text-sm font-semibold bg-linear-to-r from-primary to-accent-pink bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              <span className="block text-gray-900">Understand Your</span>
              <span className="block mt-2 bg-linear-to-r from-primary-deep via-primary to-accent-pink bg-clip-text text-transparent animate-gradient">
                {/* Relationships Deeper */}
                <span className="text-[#25D366]">WhatsApp </span>
                <span> Chats</span>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Upload, analyze, and discover hidden patterns in your
              conversations with AI-powered insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGetStarted}
                className="group relative px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* <div className="absolute inset-0 bg-linear-to-r from-primary-hover to-primary-deep opacity-0 group-hover:opacity-100 transition-opacity" /> */}
              </button>

              <button
                onClick={handleHow}
                className="px-6 md:px-8 py-3 md:py-4 bg-white text-gray-900 rounded-xl md:rounded-2xl font-semibold text-base md:text-lg border-2 border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                See How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 pt-2 md:pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">
                    50
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    Free Coins
                  </div>
                </div>
              </div>

              <div className="h-8 md:h-12 w-px bg-gray-200" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-pink-100 flex items-center justify-center">
                  <span className="text-lg md:text-xl">💡</span>
                </div>
                <div className="text-left">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">
                    25+
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">
                    AI Insights
                  </div>
                </div>
              </div>

              <div className="h-8 md:h-12 w-px bg-gray-200" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-blue-100 flex items-center justify-center">
                  <span className="text-lg md:text-xl">📊</span>
                </div>
                <div className="text-left">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">
                    Free
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Stats</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual - Chat bubbles mockup */}
          <div className="relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              {/* Chat bubble 1 */}
              <div className="absolute top-0 right-20 max-w-xs animate-float">
                <div className="bg-white rounded-3xl rounded-tr-sm p-6 shadow-2xl border border-gray-100">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent-pink" />
                    <div>
                      <div className="font-semibold text-gray-900">Sarah</div>
                      <div className="text-xs text-gray-500">2:34 PM</div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Can&apos;t wait to see you tonight! 💕
                  </p>
                </div>
              </div>

              {/* Chat bubble 2 */}
              <div
                className="absolute top-32 left-0 max-w-xs animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="bg-linear-to-br from-primary to-primary-hover rounded-3xl rounded-tl-sm p-6 shadow-2xl">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white" />
                    <div>
                      <div className="font-semibold text-white">You</div>
                      <div className="text-xs text-white/70">2:35 PM</div>
                    </div>
                  </div>
                  <p className="text-white">
                    Me too! Planning something special ✨
                  </p>
                </div>
              </div>

              {/* AI Insight card */}
              <div
                className="absolute bottom-0 right-0 max-w-sm animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="bg-linear-to-br from-white to-primary-light rounded-3xl p-6 shadow-2xl border border-primary/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-900">
                      AI Insight
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your conversations show{" "}
                    <span className="font-semibold text-primary">
                      high emotional connection
                    </span>{" "}
                    with frequent use of positive emojis and future planning.
                  </p>
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 h-2 bg-primary rounded-full" />
                    <div className="flex-1 h-2 bg-primary/50 rounded-full" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating sparkles */}
              <Sparkles className="absolute top-10 left-20 w-6 h-6 text-primary animate-pulse-glow" />
              <Sparkles
                className="absolute bottom-20 right-40 w-5 h-5 text-accent-pink animate-pulse-glow"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
