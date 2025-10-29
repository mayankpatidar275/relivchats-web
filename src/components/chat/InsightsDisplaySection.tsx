"use client";

import { useChat } from "@/src/features/chats/api";
import { INSIGHT_TYPES } from "@/src/types/category";
import { Sparkles, TrendingUp } from "lucide-react";

interface InsightsDisplaySectionProps {
  chatId: string;
}

export default function InsightsDisplaySection({
  chatId,
}: InsightsDisplaySectionProps) {
  const { data: chat } = useChat(chatId);

  // Only show if insights are unlocked
  if (!chat || !chat.insights_unlocked) {
    return null;
  }

  const insights = chat.category_slug ? INSIGHT_TYPES[chat.category_slug] : [];

  // Color mapping
  const colorMap: Record<
    string,
    {
      gradient: string;
      text: string;
      bg: string;
    }
  > = {
    romantic: {
      gradient: "from-[--color-romantic-from] to-[--color-romantic-to]",
      text: "text-pink-600",
      bg: "bg-pink-50",
    },
    friendship: {
      gradient: "from-[--color-friendship-from] to-[--color-friendship-to]",
      text: "text-blue-600",
      bg: "bg-blue-50",
    },
    family: {
      gradient: "from-[--color-family-from] to-[--color-family-to]",
      text: "text-green-600",
      bg: "bg-green-50",
    },
    work: {
      gradient: "from-[--color-work-from] to-[--color-work-to]",
      text: "text-purple-600",
      bg: "bg-purple-50",
    },
  };

  const colors = chat.category_slug
    ? colorMap[chat.category_slug]
    : {
        gradient: "from-gray-400 to-gray-600",
        text: "text-gray-600",
        bg: "bg-gray-50",
      };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              colors.bg
            } border-2 ${colors.text.replace("text-", "border-")} mb-6`}
          >
            <Sparkles className={`w-4 h-4 ${colors.text}`} />
            <span className={`text-sm font-semibold ${colors.text}`}>
              AI Insights Unlocked
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your {chat.category_name} Analysis
          </h2>
          <p className="text-lg text-gray-600">
            Deep insights powered by advanced AI analysis of your conversations
          </p>
        </div>

        {/* Insights grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-2xl bg-linear-to-br ${colors.gradient} flex items-center justify-center text-3xl flex-shrink-0`}
                >
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {insight.name}
                  </h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </div>

              {/* Mock insight data - replace with real data from API */}
              <div
                className={`${
                  colors.bg
                } rounded-2xl p-6 border-2 ${colors.text.replace(
                  "text-",
                  "border-"
                )}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className={`w-5 h-5 ${colors.text}`} />
                  <span className={`font-semibold ${colors.text}`}>
                    Key Finding:
                  </span>
                </div>
                <p className="text-gray-800 leading-relaxed mb-4">
                  {insight.example}
                </p>

                {/* Mock score/metric */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">
                    Confidence Score
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-linear-to-r ${colors.gradient}`}
                        style={{ width: "85%" }}
                      />
                    </div>
                    <span className={`font-bold ${colors.text}`}>85%</span>
                  </div>
                </div>
              </div>

              {/* Recommendations section */}
              <div className="mt-6 space-y-2">
                <h4 className="font-semibold text-gray-900 text-sm">
                  💡 Recommendations:
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className={`${colors.text} font-bold`}>•</span>
                    <span>
                      Continue expressing emotions openly to maintain connection
                      depth
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className={`${colors.text} font-bold`}>•</span>
                    <span>
                      Schedule regular quality time for deeper conversations
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
