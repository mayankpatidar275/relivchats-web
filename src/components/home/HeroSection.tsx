"use client";

import Button from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
// import { useAuth } from "@clerk/nextjs";

export default function HeroSection() {
  const router = useRouter();
  // const { isSignedIn } = useAuth();

  const handleGetStarted = () => {
    // if (isSignedIn) {
    //   router.push("/dashboard");
    // } else {
    //   router.push("/signup");
    // }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[--color-brand-50] via-white to-[--color-lavender-100] py-20 md:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[--color-brand-200] rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[--color-blush-300] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative mx-auto px-6 max-w-7xl">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[--color-brand-200] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--color-primary] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[--color-primary]"></span>
            </span>
            <span className="text-sm font-medium text-[--color-gray-700]">
              AI-Powered Chat Analysis
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[--color-brand-700] via-[--color-brand-500] to-[--color-blush-500] bg-clip-text text-transparent">
              Relive Your Chats
            </span>
            <br />
            <span className="text-[--color-gray-900]">
              Discover Deeper Connections
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-[--color-gray-600] leading-relaxed max-w-3xl mx-auto">
            Upload your WhatsApp, Telegram, or Instagram chats and unlock
            AI-powered insights about your relationships, emotions, and
            communication patterns.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={handleGetStarted}>
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("#categories")}
            >
              Explore Categories
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-[--color-brand-600]">
                50+
              </div>
              <div className="text-[--color-gray-600]">
                Free Coins on Signup
              </div>
            </div>
            <div className="h-12 w-px bg-[--color-border]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[--color-brand-600]">
                4
              </div>
              <div className="text-[--color-gray-600]">
                Relationship Categories
              </div>
            </div>
            <div className="h-12 w-px bg-[--color-border]" />
            <div className="text-center">
              <div className="text-3xl font-bold text-[--color-brand-600]">
                25+
              </div>
              <div className="text-[--color-gray-600]">AI-Powered Insights</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
