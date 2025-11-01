"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Reliv Chats work?",
    answer:
      "Upload your WhatsApp, Telegram, or Instagram chat export file. We instantly analyze it and provide free basic statistics like message counts, participant activity, and timeline. For deeper insights, unlock AI-powered analysis with coins.",
  },
  {
    question: "Is my chat data secure and private?",
    answer:
      "Absolutely! Your chats are encrypted and stored securely. We never share your data with third parties. Message content is only used for AI analysis and remains completely private. You can delete your data anytime.",
  },
  {
    question: "What are coins and how do they work?",
    answer:
      "Coins are our credit system. You get 50 free coins on signup. Use coins to unlock AI insights for your chats. Friendship/Family insights cost 50 coins, while Romantic/Work insights cost 100 coins. You can buy more coins anytime.",
  },
  {
    question: "What's included in the free stats?",
    answer:
      "Free stats include: total messages & words, participant activity breakdown, date range & duration, busiest hours & days, top words & emojis, response times, conversation patterns, and media/link counts. No coins required!",
  },
  {
    question: "What AI insights can I unlock?",
    answer:
      "Depending on your category (Romantic, Friendship, Family, Work), you get 6-8 specialized insights like emotional depth analysis, communication patterns, conflict resolution, support patterns, team dynamics, and personalized recommendations.",
  },
  {
    question: "Which chat platforms are supported?",
    answer:
      "We support WhatsApp (.txt export), Telegram (.zip export), and Instagram (.json export). Simply export your chat from the app and upload the file. We handle the rest!",
  },
  {
    question: "Can I analyze multiple chats?",
    answer:
      "Yes! Upload as many chats as you want. Each chat is analyzed separately. Free stats are always available. You only spend coins when you unlock deeper insights for a specific chat.",
  },
  {
    question: "How do I export my WhatsApp chat?",
    answer:
      "Open WhatsApp → Select chat → Tap menu (⋮) → More → Export chat → Without Media. This creates a .txt file you can upload to Reliv Chats.",
  },
  {
    question: "Do insights expire?",
    answer:
      "No! Once you unlock insights for a chat, you have lifetime access. Your stats and insights remain available in your dashboard forever (unless you delete the chat).",
  },
  {
    question: "Can I share my chat stats?",
    answer:
      "Yes! You can share your basic statistics publicly via a shareable link. Only stats are shared - message content remains private. Perfect for showing friends your chat activity!",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Got Questions?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Reliv Chats
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span
                    className={`font-semibold text-lg pr-4 ${
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
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:support@relivchats.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
