"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Gift, ArrowRight, X } from "lucide-react";
import confetti from "canvas-confetti";

export default function WelcomeModal() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // initialize from search params instead of setting state inside useEffect
  const initialOpen = searchParams?.get("welcome") === "true";
  const [isOpen, setIsOpen] = useState<boolean>(!!initialOpen);

  useEffect(() => {
    if (!isOpen) return;

    // Trigger confetti
    const t = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 300);

    // Remove welcome param from URL (side-effect only)
    const url = new URL(window.location.href);
    url.searchParams.delete("welcome");
    window.history.replaceState({}, "", url.toString());

    return () => clearTimeout(t);
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);
  const handleGetStarted = () => {
    setIsOpen(false);
    router.push("/#home-upload");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header with animation */}
        <div className="relative p-8 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent-pink/10" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-linear-to-br from-primary to-accent-pink rounded-full blur-2xl opacity-40 animate-pulse" />
              <div className="relative w-24 h-24 bg-linear-to-br from-primary to-accent-pink rounded-full flex items-center justify-center shadow-2xl">
                <Gift className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Welcome to Reliv Chats! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your journey to deeper connections starts now
            </p>

            {/* Coin Badge */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                50
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-amber-900">
                  Free Coins!
                </div>
                <div className="text-sm text-amber-700">
                  Added to your account
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-6">
          {/* What you can do */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-lg">
              What you can do now:
            </h3>

            {[
              {
                icon: "📤",
                title: "Upload Your First Chat",
                description: "Get instant free statistics",
              },
              {
                icon: "🎯",
                title: "Choose a Category",
                description: "Romantic, Friendship, Family, or Work",
              },
              {
                icon: "✨",
                title: "Unlock AI Insights",
                description: "Use your 50 coins for deep analysis",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-3xl shrink-0">{item.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              onClick={handleGetStarted}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary to-primary-hover text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Upload Your First Chat
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleClose}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              I&apos;ll do it later
            </button>
          </div>

          {/* Reminder */}
          {/* <div className="text-center text-sm text-gray-500">
            💡 Tip: 50 coins = 1 complete Friendship or Family analysis
          </div> */}
        </div>
      </div>
    </div>
  );
}
