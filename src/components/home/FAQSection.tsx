"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

// Curated top FAQs - most important only
const faqs: FAQItem[] = [
  {
    question: "How does Reliv Chats work?",
    answer:
      "Upload your WhatsApp chat export file (.txt or .zip). We instantly analyze it and provide free basic statistics like message counts, activity patterns, and timelines. For deeper insights, unlock AI-powered analysis with coins.",
  },
  {
    question: "Is my chat data private and secure?",
    answer:
      "Yes! Your chats are encrypted and stored securely. We never share your data with third parties. Message content is only used for AI analysis and remains completely private. You can delete your data anytime.",
  },
  {
    question: "What's included in the free stats?",
    answer:
      "Free stats include: total messages & words, participant activity breakdown, date range & duration, busiest hours & days, top words & emojis, response times, and conversation patterns. No coins required!",
  },
  {
    question: "What are coins and how do they work?",
    answer:
      "Coins are our credit system. You get 50 free coins on signup. Use coins to unlock category-specific AI insights (50-100 coins per chat depending on the category). Buy more coins anytime via flexible packages.",
  },
  {
    question: "How do I export my WhatsApp chat?",
    answer:
      "Open WhatsApp → Select chat → Tap menu (⋮) → More → Export chat → Without Media. This creates a .txt file you can upload to Reliv Chats.",
  },
  {
    question: "Can I analyze multiple chats?",
    answer:
      "Yes! Upload as many chats as you want. Each chat is analyzed separately. Free stats are always available. You only spend coins when you unlock deeper AI insights for a specific chat.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-semibold text-primary">
              Got Questions?
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            FAQ
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Quick answers to common questions
          </p>
        </div>

        {/* FAQ Items - Compact */}
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-xl md:rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 md:p-5 text-left"
                >
                  <span
                    className={`font-semibold text-sm md:text-base lg:text-lg pr-4 ${
                      isOpen ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@relivchats.com"
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all text-sm md:text-base"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
