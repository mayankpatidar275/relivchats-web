"use client";

import { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";

export default function PricingComparison() {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      category: "Basic Features",
      items: [
        {
          name: "Free chat statistics",
          starter: true,
          popular: true,
          pro: true,
        },
        {
          name: "Message counts & timelines",
          starter: true,
          popular: true,
          pro: true,
        },
        {
          name: "Participant analysis",
          starter: true,
          popular: true,
          pro: true,
        },
        { name: "Top words & emojis", starter: true, popular: true, pro: true },
      ],
    },
    {
      category: "AI Insights",
      items: [
        {
          name: "Friendship/Family insights",
          starter: "4 chats",
          popular: "10 chats",
          pro: "30 chats",
        },
        {
          name: "Romantic/Work insights",
          starter: "2 chats",
          popular: "5 chats",
          pro: "15 chats",
        },
        {
          name: "Custom recommendations",
          starter: true,
          popular: true,
          pro: true,
        },
        { name: "Sentiment analysis", starter: true, popular: true, pro: true },
      ],
    },
    {
      category: "Support & Access",
      items: [
        { name: "Email support", starter: true, popular: true, pro: true },
        { name: "Priority support", starter: false, popular: true, pro: true },
        {
          name: "Early feature access",
          starter: false,
          popular: false,
          pro: true,
        },
        { name: "Lifetime access", starter: true, popular: true, pro: true },
      ],
    },
  ];

  // Show only first category when collapsed
  const displayFeatures = isExpanded ? features : features.slice(0, 1);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Compare Plans
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600">
            See what&apos;s included in each package
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-gray-100 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-gray-900 text-sm sm:text-base">
                    Features
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-900 text-sm sm:text-base">
                    Starter
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-primary bg-primary/5 text-sm sm:text-base">
                    Popular
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-gray-900 text-sm sm:text-base">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayFeatures.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <tr key={categoryIndex} className="bg-gray-50">
                      <td
                        colSpan={4}
                        className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold text-gray-900"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={itemIndex}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-xs sm:text-sm">
                          {item.name}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700 text-xs sm:text-sm">
                              {item.starter}
                            </span>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center bg-primary/5">
                          {typeof item.popular === "boolean" ? (
                            item.popular ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto" />
                            ) : (
                              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-primary font-semibold text-xs sm:text-sm">
                              {item.popular}
                            </span>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 mx-auto" />
                            )
                          ) : (
                            <span className="text-gray-700 text-xs sm:text-sm">
                              {item.pro}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-4 border-t border-gray-200 flex items-center justify-center gap-2 text-primary hover:bg-gray-50 transition-colors text-sm sm:text-base font-semibold"
          >
            {isExpanded ? "Show Less" : "Show All Features"}
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
