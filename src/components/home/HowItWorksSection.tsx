"use client";

import { Upload, Sparkles, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowItWorksSection() {
  const router = useRouter();

  const steps = [
    {
      number: 1,
      icon: Upload,
      title: "Upload Your Chat",
      description:
        "Export your WhatsApp chat and upload. Takes less than 30 seconds.",
      color: "from-blue-500 to-cyan-500",
      image: "📤",
    },
    {
      number: 2,
      icon: Sparkles,
      title: "Get Free Stats",
      description:
        "Message counts, participant activity, timelines, top words, emojis, and more",
      color: "from-purple-500 to-pink-500",
      image: "📊",
    },
    {
      number: 3,
      icon: Zap,
      title: "Choose Category",
      description:
        "Select (Romantic, Friendship, Family, or Work) to unlock tailored AI insights.",
      color: "from-amber-500 to-orange-500",
      image: "🎯",
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Unlock Insights",
      description:
        "Deep AI analysis: emotional patterns, communication styles, and recommendations.",
      color: "from-green-500 to-emerald-500",
      image: "✨",
    },
  ];

  return (
    <section id="home-how" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-50 rounded-full border border-purple-200 mb-4 md:mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-purple-600">
              Simple Process
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            How It Works
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            From upload to insights in 4 easy steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8 md:mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector - Desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-gray-300 to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative bg-white rounded-2xl border-2 border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-linear-to-br from-primary to-primary-hover rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="text-center mb-4">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}
                  />
                  <div
                    className={`w-16 h-16 mx-auto bg-linear-to-br ${step.color} rounded-xl flex items-center justify-center text-4xl shadow-md mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {step.image}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => router.push("#home-upload")}
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Try It Now - It&apos;s Free
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs md:text-sm text-gray-600 mt-3 md:mt-4">
            No credit card required • 50 free coins on signup
          </p>
        </div>
      </div>
    </section>
  );
}
