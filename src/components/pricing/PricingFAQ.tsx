"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do coins work?",
    answer:
      "Coins are used to unlock AI insights. Friendship/Family insights cost 50 coins per chat, while Romantic/Work insights cost 100 coins. Coins never expire and you can use them anytime.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No! We have no subscriptions. You simply buy coins once and use them whenever you want. Pay only for what you need.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and digital wallets through our secure payment processor.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes! If you're not satisfied, contact us within 7 days of purchase for a full refund. No questions asked.",
  },
  {
    question: "Do coins expire?",
    answer:
      "No, your coins never expire. Buy them once and use them whenever you want, even years later.",
  },
  {
    question: "Can I share coins with friends?",
    answer:
      "Coins are tied to your account and cannot be transferred. However, you can gift coin packages to friends!",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Pricing Questions?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our pricing
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-2xl transition-all ${
                  isOpen
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span
                    className={`font-semibold text-lg ${
                      isOpen ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180 text-primary" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-700">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
