"use client";

import { Upload, Brain, Sparkles, TrendingUp } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Chat",
      description:
        "Export and upload your WhatsApp, Telegram, or Instagram chat file",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description:
        "Our advanced AI models process and analyze your conversations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: "Choose Insights",
      description:
        "Select which specific insights you want to unlock with coins",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Get Results",
      description: "Receive detailed analysis with actionable recommendations",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get AI-powered insights in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-gray-300 to-transparent" />
              )}

              <div className="text-center space-y-4">
                {/* Number badge */}
                <div className="relative inline-block">
                  <div
                    className={`absolute inset-0 bg-linear-to-br ${step.color} rounded-2xl blur-xl opacity-30`}
                  />
                  <div
                    className={`relative w-16 h-16 mx-auto bg-linear-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
