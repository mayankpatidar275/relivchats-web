"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import confetti from "canvas-confetti";
import { Sparkles, Gift, ArrowRight, X, Loader2 } from "lucide-react";
import { useStoreUserMutation } from "@/src/features/users/api";

export default function WelcomeModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { mutate: storeUser, isPending } = useStoreUserMutation();
  const syncedUserIds = useRef(new Set<string>());

  const [isOpen, setIsOpen] = useState(searchParams?.get("welcome") === "true");
  const [showSuccess, setShowSuccess] = useState(false);

  // Store user once when modal opens & signed in
  useEffect(() => {
    if (user && isSignedIn && isOpen && !syncedUserIds.current.has(user.id)) {
      syncedUserIds.current.add(user.id);

      const primaryEmail = user.emailAddresses?.[0]?.emailAddress;
      const userData = {
        user_id: user.id,
        email: primaryEmail,
        first_name: user.firstName || undefined,
        last_name: user.lastName || undefined,
      };

      storeUser(userData, {
        onSuccess: () => {
          console.log("✅ User stored successfully");
          setShowSuccess(true);
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

          // Remove welcome param from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("welcome");
          window.history.replaceState({}, "", url.toString());
        },
        onError: (err) => {
          console.error("Error storing user:", err);
        },
      });
    }
  }, [user, isSignedIn, isOpen, storeUser]);

  const handleClose = () => setIsOpen(false);
  const handleGetStarted = () => {
    setIsOpen(false);
    router.push("/#home-upload");
  };

  if (!isOpen) return null;

  if (!showSuccess)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading...
          </h3>
          <p className="text-gray-600 text-sm">
            Getting everything ready for you...
          </p>
        </div>
      </div>
    );

  // Show loading state only during initial sync
  if (isPending && !showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Setting up your account
          </h3>
          <p className="text-gray-600 text-sm">
            Getting everything ready for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md sm:max-w-lg shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        {/* Scrollable container for small screens */}
        <div className="overflow-y-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="relative p-6 sm:p-8 text-center">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent-pink/10" />
            <div className="relative z-10">
              {/* Success animation */}
              {/* {showSuccess && (
                <div className="absolute -top-4 -right-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping" />
                    <div className="relative w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                </div>
              )} */}

              {/* Icon */}
              <div className="relative inline-block mb-4 sm:mb-6">
                <div className="absolute inset-0 bg-linear-to-br from-primary to-accent-pink rounded-full blur-2xl opacity-40" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-primary to-accent-pink rounded-full flex items-center justify-center shadow-2xl">
                  <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Welcome to Reliv Chats! 🎉
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6">
                Your journey to deeper connections starts now
              </p>

              {/* Coin Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-linear-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-2xl shadow-lg">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold shadow-lg">
                  50
                </div>
                <div className="text-left">
                  <div className="text-lg sm:text-2xl font-bold text-amber-900">
                    Free Coins!
                  </div>
                  <div className="text-xs sm:text-sm text-amber-700">
                    Added to your account
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 sm:px-8 pb-6 sm:pb-8 space-y-5 sm:space-y-6">
            {/* <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
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
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">
                      {item.title}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-3 sm:pt-4">
              <button
                onClick={handleGetStarted}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-5 py-3 sm:px-6 sm:py-4 bg-linear-to-r from-primary to-primary-hover text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    Upload Your First Chat
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>

              <button
                onClick={handleClose}
                className="w-full px-5 py-2.5 sm:px-6 sm:py-3 text-gray-600 hover:text-gray-900 font-medium text-sm sm:text-base transition-colors disabled:opacity-50"
                disabled={isPending}
              >
                I&apos;ll do it later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
