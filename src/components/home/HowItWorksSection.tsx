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
        "Export your WhatsApp, Telegram, or Instagram chat and upload the file. Takes less than 30 seconds.",
      color: "from-blue-500 to-cyan-500",
      image: "📤",
    },
    {
      number: 2,
      icon: Sparkles,
      title: "Get Free Stats",
      description:
        "Instantly see message counts, participant activity, timelines, top words, emojis, and more - completely free!",
      color: "from-purple-500 to-pink-500",
      image: "📊",
    },
    {
      number: 3,
      icon: Zap,
      title: "Choose Category",
      description:
        "Select your relationship type (Romantic, Friendship, Family, or Work) to unlock tailored AI insights.",
      color: "from-amber-500 to-orange-500",
      image: "🎯",
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Unlock Insights",
      description:
        "Use coins to unlock deep AI analysis: emotional patterns, communication styles, and personalized recommendations.",
      color: "from-green-500 to-emerald-500",
      image: "✨",
    },
  ];

  return (
    <section id="home-how" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Simple Process
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How Reliv Chats Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From upload to insights in 4 easy steps. No technical knowledge
            required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-gray-300 to-transparent z-0" />
              )}

              {/* Card */}
              <div className="relative bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-linear-to-br from-primary to-primary-hover rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}
                  />
                  <div
                    className={`relative w-20 h-20 bg-linear-to-br ${step.color} rounded-2xl flex items-center justify-center text-5xl shadow-lg mx-auto group-hover:scale-110 transition-transform`}
                  >
                    {step.image}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-primary-hover text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Try It Now - It&apos;s Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-600 mt-4">
            No credit card required • 50 free coins on signup
          </p>
        </div>
      </div>
    </section>
  );
}
