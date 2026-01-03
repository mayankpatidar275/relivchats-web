"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do coins work?",
    answer:
      "Coins are used to unlock AI insights. Friendship/Family insights cost 50 coins per chat, while Romantic/Work insights cost 100 coins. Coins never expire and you can use them anytime.",
  },
  // {
  //   question: "Do I need a subscription?",
  //   answer:
  //     "No! We have no subscriptions. You simply buy coins once and use them whenever you want. Pay only for what you need.",
  // },
  {
    question: "Do coins expire?",
    answer:
      "No, your coins never expire. Buy them once and use them whenever you want, even years later. Once you unlock insights for a chat, you have lifetime access.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and digital wallets through our secure payment processor. All transactions are encrypted and protected.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full border border-primary/20 mb-4 sm:mb-6">
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">
              Common Questions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Pricing FAQ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            Quick answers about our pricing
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border-2 rounded-xl sm:rounded-2xl transition-all ${
                  isOpen
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
                >
                  <span
                    className={`font-semibold text-sm sm:text-base md:text-lg pr-4 ${
                      isOpen ? "text-primary" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-primary" : "text-gray-400"
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
            Have more questions?
          </p>
          <a
            href="mailto:support@relivchats.com"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold text-sm sm:text-base transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
